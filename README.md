# 🛡️ CyberShield

CyberShield is an AI-powered cybersecurity platform designed to protect users from modern online threats. It offers intelligent tools to scan URLs for malicious activity, analyze suspicious emails or messages for phishing indicators, and provides a dedicated security dashboard for every user.

## ✨ Features

- **AI URL Safety Checker:** Paste any URL to instantly get a safety score and AI analysis on potential threats.
- **Anti-Phishing Analyzer:** Copy and paste suspicious emails or messages. The AI will detect urgency language, suspicious links, and attempts to steal sensitive information.
- **CyberShield Chat Assistant:** An intelligent chatbot strictly focused on answering questions related to phishing, URL safety, and cybersecurity awareness.
- **Personal Security Dashboard:** A private dashboard for each user to track their scan history, view safety rates, and monitor recent activity.
- **User Authentication:** Secure signup and login system integrated with a persistent database.

## 🛠️ Technology Stack

**Frontend:**
- React.js (v19)
- Vite
- React Router DOM
- Custom CSS with modern Glassmorphism UI

**Backend & Database:**
- Node.js & Express.js
- PostgreSQL (Hosted on Neon Serverless)
- Prisma ORM
- Groq API (LLaMA 3.1 8B Instant model) for AI analysis

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL Database (Neon DB recommended)
- Groq API Key (for AI features)

### 1. Clone & Install
```bash
# Install dependencies for both frontend and backend
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and add your keys:
```env
# AI API Key
GROQ_API_KEY=your_groq_api_key_here

# Database Connection
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

### 3. Database Setup (Prisma)
Initialize your database schema:
```bash
npx prisma generate
npx prisma db push
```

### 4. Run the Application
You can run the frontend and backend simultaneously:

**Terminal 1 (Backend):**
```bash
npm run server
```
*Runs on http://localhost:3001*

**Terminal 2 (Frontend):**
```bash
npm run dev
```
*Runs on http://localhost:5173*

---

## 🌍 Production Deployment

This project is configured for **Single-Platform Unified Deployment** (e.g., deploying both frontend and backend together on platforms like Render or Railway).

1. Push your code to GitHub.
2. Create a new Web Service on your hosting provider (like Render.com).
3. Connect your repository.
4. Set the following commands:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Add your `GROQ_API_KEY` and `DATABASE_URL` in the Environment Variables section.
6. Deploy! The Express server will automatically serve the built React static files and handle API routes simultaneously.

---

## 📄 License
This project is for educational and portfolio purposes. All rights reserved.
