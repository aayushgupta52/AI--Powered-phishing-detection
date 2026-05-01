import express from 'express'
import cors from 'cors'
import { readFileSync } from 'fs'
import pkg from '@prisma/client'
const { PrismaClient } = pkg
import * as neonAdapterPkg from '@prisma/adapter-neon'
const { PrismaNeon } = neonAdapterPkg
import * as serverlessPkg from '@neondatabase/serverless'
const { Pool, neonConfig } = serverlessPkg
import ws from 'ws'
import * as dotenv from 'dotenv'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '..', '.env') })

console.log('DATABASE_URL loaded:', process.env.DATABASE_URL ? '✅ Yes' : '❌ No')

if (neonConfig && ws) neonConfig.webSocketConstructor = ws

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

const app = express()
app.use(cors())
app.use(express.json())

// Read API key from .env file manually (no dotenv dependency needed)
let API_KEY = ''
function getApiKey() {
    if (API_KEY) return API_KEY;
    try {
        const envContent = readFileSync('.env', 'utf-8')
        const match = envContent.match(/GROQ_API_KEY=(.*)/) || envContent.match(/GEMINI_API_KEY=(.*)/)
        if (match && match[1].trim() && match[1].trim() !== 'PASTE_YOUR_GEMINI_API_KEY_HERE') {
            API_KEY = match[1].trim()
        }
    } catch { }
    return API_KEY;
}
getApiKey(); // Initial read attempt
if (!API_KEY) {
    console.log('⚠️  No GROQ_API_KEY found in .env. Create one or replace PASTE_YOUR_API_KEY_HERE')
}

const SYSTEM_PROMPT = `You are CyberShield AI Assistant — a highly specialized chatbot focusing exclusively on phishing and URL safety. 

Your strictly enforced rules:
1. YOU MUST ONLY answer questions directly related to phishing, scams, malicious emails, URL safety, and the tools on this website. 
2. If the user asks ANY question that is NOT related to phishing or malicious URLs (including general chatting, coding, math, general IT support, or other general cybersecurity topics), YOU MUST reply EXACTLY with the phrase: "Sorry, I can't answer this. I can only help you with phishing and URL safety."
3. Never provide instructions for malicious activities.
4. Be concise and professional.`

async function callGroqAPI(messages) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getApiKey()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: messages,
            temperature: 0.3
        })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Groq API Error: ${err}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// Chat endpoint
app.post('/chat', async (req, res) => {
    const { message } = req.body
    if (!message) return res.status(400).json({ reply: 'No message provided.' })

    if (!getApiKey()) {
        return res.json({ reply: 'The AI assistant is not configured yet. Please add your GROQ_API_KEY to the .env file.' })
    }

    try {
        const reply = await callGroqAPI([
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: message }
        ]);
        res.json({ reply })
    } catch (error) {
        console.error('Groq Chat API error:', error)
        res.status(500).json({ reply: 'Error communicating with AI service. Please confirm your API key is correct.' })
    }
})

// Phishing analysis endpoint
app.post('/analyze-phishing', async (req, res) => {
    const { text } = req.body
    if (!text) return res.status(400).json({ error: 'No text provided.' })

    if (!getApiKey()) {
        return res.status(503).json({ error: 'AI service not configured.' })
    }

    const analysisPrompt = `You are a cybersecurity expert analyzing a potentially suspicious message for phishing indicators.

Analyze the following text and provide:
1. A risk score from 0-100 (0=safe, 100=definitely phishing)
2. A risk level: "Low Risk", "Medium Risk", or "High Risk"
3. A detailed analysis explaining what phishing tactics were found

Look for these indicators:
- Urgency language ("act now", "expires soon", "immediately")
- Requests for sensitive information (passwords, SSN, credit cards)
- Suspicious links or URLs
- Impersonation of known brands
- Grammar/spelling errors typical of phishing
- Threatening language
- Too-good-to-be-true offers

Respond ONLY in this exact JSON format. Do not include markdown code block formatting like \`\`\`json. Just output the raw JSON string:
{"riskScore": NUMBER, "riskLevel": "STRING", "analysis": "STRING with line breaks as \\n"}

Text to analyze:
"""
${text}
"""`

    try {
        const rawText = await callGroqAPI([{ role: 'user', content: analysisPrompt }]);

        // Parse JSON from response
        const jsonMatch = rawText.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0])
            res.json({
                riskScore: Math.min(100, Math.max(0, parsed.riskScore || 50)),
                riskLevel: parsed.riskLevel || 'Unknown',
                analysis: parsed.analysis || 'Analysis complete.'
            })
        } else {
            res.json({ riskScore: 50, riskLevel: 'Unknown', analysis: rawText || 'Could not parse analysis results.' })
        }
    } catch (error) {
        console.error('Groq Phishing analysis error:', error)
        res.status(500).json({ error: 'Analysis failed.' })
    }
})

// URL analysis endpoint
app.post('/analyze-url', async (req, res) => {
    const { url } = req.body
    if (!url) return res.status(400).json({ error: 'No URL provided.' })

    if (!getApiKey()) {
        return res.status(503).json({ error: 'AI service not configured.' })
    }

    const analysisPrompt = `You are a cybersecurity expert analyzing a URL for safety and potential threats.

Analyze the following URL:
URL to analyze: ${url}

Provide the following based ONLY on explicit malicious characteristics (like homoglyphs, phishing keywords combined with weird TLDs, etc.):
1. A safety score from 0-100 (100=perfectly safe, 0=definitely malicious)
2. A status string: "safe", "warning", or "danger"
3. A short label: "Safe", "Unknown", or "Dangerous"
4. A reassuring or warning message explaining the analysis

IMPORTANT RULES:
- Assume ordinary URLs like educational sites, regional domains (e.g., .in, .uk), or generic business domains without obvious malicious keywords are GENERALLY SAFE. Give them a score between 80-99 and a status of "safe".
- Do not mark a domain as "danger" just because it is a small or unknown site. Only use "danger" (score < 40) if there are explicit indicators of malicious activity (e.g., "login-update-paypal.xyz" or "paypa1.com" or "secure-auth-login").
- If it is completely unrecognizable but looks like a standard site without dangerous keywords, mark it as "safe" or "warning" with an appropriate message.

Respond ONLY in this exact JSON format. Do not include markdown code block formatting like \`\`\`json. Just output the raw JSON string:
{"score": NUMBER, "status": "STRING", "label": "STRING", "message": "STRING"}`

    try {
        const rawText = await callGroqAPI([{ role: 'user', content: analysisPrompt }]);

        // Parse JSON from response
        const jsonMatch = rawText.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0])
            res.json({
                score: Math.min(100, Math.max(0, parsed.score || 50)),
                status: parsed.status || 'warning',
                label: parsed.label || 'Unknown',
                message: parsed.message || 'Analysis complete.'
            })
        } else {
            res.json({ score: 50, status: 'warning', label: 'Unknown', message: 'Could not parse analysis results. ' + rawText })
        }
    } catch (error) {
        console.error('Groq URL analysis error:', error)
        res.status(500).json({ error: 'Analysis failed.' })
    }
})

// Database Endpoints for Person
app.get('/api/persons', async (req, res) => {
    try {
        const persons = await prisma.person.findMany({
            orderBy: { createdAt: 'desc' }
        })
        res.json(persons)
    } catch (error) {
        console.error('Fetch persons error:', error)
        res.status(500).json({ error: 'Failed to fetch persons from database.' })
    }
})

app.post('/api/persons', async (req, res) => {
    const { firstName, lastName, email, role, status } = req.body
    
    if (!firstName || !lastName || !email) {
        return res.status(400).json({ error: 'First name, last name, and email are required.' })
    }

    try {
        const newPerson = await prisma.person.create({
            data: {
                firstName,
                lastName,
                email,
                role: role || 'User',
                status: status || 'Active'
            }
        })
        res.status(201).json(newPerson)
    } catch (error) {
        console.error('Create person error:', error)
        // Check if it's a unique constraint error
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'A person with this email already exists.' })
        }
        res.status(500).json({ error: 'Failed to create person.' })
    }
})

// Serve static files from React build
app.use(express.static(join(__dirname, '../dist')))
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`\n🛡️  CyberShield API server running on http://localhost:${PORT}`)
    console.log(`   API Key: ${API_KEY ? '✅ Configured' : '❌ Not set (add GEMINI_API_KEY to .env)'}\n`)
})
