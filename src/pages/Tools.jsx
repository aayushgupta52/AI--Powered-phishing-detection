import { useState } from 'react'
import './Tools.css'

function Tools() {
    // URL Checker state
    const [url, setUrl] = useState('')
    const [urlResult, setUrlResult] = useState(null)
    const [urlLoading, setUrlLoading] = useState(false)

    // Phishing Analyzer state
    const [phishText, setPhishText] = useState('')
    const [phishResult, setPhishResult] = useState(null)
    const [phishLoading, setPhishLoading] = useState(false)

    const checkUrl = async (e) => {
        e.preventDefault()
        const trimmed = url.trim().toLowerCase()
        if (!trimmed) return

        setUrlLoading(true)
        setUrlResult(null)

        try {
            const response = await fetch('/analyze-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: trimmed })
            })
            const data = await response.json()

            if (data.error) {
                // Fallback or error display
                setUrlResult({ score: 0, status: 'warning', label: 'Error', message: data.error })
            } else {
                setUrlResult(data)

                // Save to history
                const userObj = JSON.parse(localStorage.getItem('cyberUser') || '{}')
                const historyKey = userObj.email ? `cyberHistory_${userObj.email}` : 'cyberHistory'
                const history = JSON.parse(localStorage.getItem(historyKey) || '[]')
                history.unshift({ type: 'URL Scan', target: trimmed, result: data.label, date: new Date().toISOString(), score: data.score })
                localStorage.setItem(historyKey, JSON.stringify(history.slice(0, 50)))
            }
        } catch (error) {
            setUrlResult({ score: 50, status: 'warning', label: 'Offline', message: 'Could not reach analysis server. Please ensure backend is running.' })
        } finally {
            setUrlLoading(false)
        }
    }

    const analyzePhishing = async (e) => {
        e.preventDefault()
        const text = phishText.trim()
        if (!text) return

        setPhishLoading(true)
        setPhishResult(null)

        try {
            const response = await fetch('/analyze-phishing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            })
            const data = await response.json()
            setPhishResult(data)

            // Save to history
            const userObj = JSON.parse(localStorage.getItem('cyberUser') || '{}')
            const historyKey = userObj.email ? `cyberHistory_${userObj.email}` : 'cyberHistory'
            const history = JSON.parse(localStorage.getItem(historyKey) || '[]')
            history.unshift({ type: 'Phishing Analysis', target: text.substring(0, 80) + '...', result: data.riskLevel, date: new Date().toISOString(), score: data.riskScore })
            localStorage.setItem(historyKey, JSON.stringify(history.slice(0, 50)))
        } catch {
            // Offline fallback
            const hasUrgency = /urgent|immediately|expire|suspend|verify now|act now|limited time/i.test(text)
            const hasLinks = /click here|http|www\.|\.com|\.net|\.xyz/i.test(text)
            const hasSuspicious = /password|ssn|credit card|bank account|social security|verify your/i.test(text)
            const indicators = [hasUrgency, hasLinks, hasSuspicious].filter(Boolean).length

            let riskScore, riskLevel
            if (indicators >= 2) { riskScore = 85; riskLevel = 'High Risk' }
            else if (indicators === 1) { riskScore = 55; riskLevel = 'Medium Risk' }
            else { riskScore = 20; riskLevel = 'Low Risk' }

            setPhishResult({
                riskScore,
                riskLevel,
                analysis: `Offline analysis detected ${indicators} phishing indicator(s):\n${hasUrgency ? '• Urgency language detected\n' : ''}${hasLinks ? '• Suspicious links detected\n' : ''}${hasSuspicious ? '• Requests for sensitive information\n' : ''}${indicators === 0 ? '• No obvious phishing indicators found. However, always verify the sender.\n' : ''}\nFor full AI-powered analysis, make sure the backend server is running.`
            })
        } finally {
            setPhishLoading(false)
        }
    }

    const getScoreColor = (score) => {
        if (score >= 70) return '#00e676'
        if (score >= 40) return '#ffc107'
        return '#e60000'
    }

    const getRiskColor = (score) => {
        if (score >= 70) return '#e60000'
        if (score >= 40) return '#ffc107'
        return '#00e676'
    }

    return (
        <div className="tools-page">
            {/* Header */}
            <section className="tools-hero">
                <div className="tools-hero-bg"></div>
                <div className="container">
                    <span className="section-label">Security Tools</span>
                    <h1 className="section-title">
                        AI-Powered <span className="highlight">Threat Detection</span>
                    </h1>
                    <p className="section-desc" style={{ margin: '0 auto' }}>
                        Scan URLs for threats and analyze suspicious messages for phishing attempts — all powered by advanced AI.
                    </p>
                </div>
            </section>

            {/* URL Checker */}
            <section className="tool-section">
                <div className="container">
                    <div className="tool-card glass-card">
                        <div className="tool-header">
                            <span className="tool-icon">🔍</span>
                            <div>
                                <h2>URL Safety Checker</h2>
                                <p>Paste any URL to check if it's safe or potentially malicious</p>
                            </div>
                        </div>

                        <form onSubmit={checkUrl} className="tool-form">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="input-field"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="Enter a URL (e.g., google.com or paypa1.com)"
                                />
                                <button type="submit" className="btn btn-primary" disabled={urlLoading}>
                                    {urlLoading ? 'Scanning...' : 'Scan URL'}
                                </button>
                            </div>
                        </form>

                        {urlLoading && (
                            <div className="tool-loading">
                                <div className="loading-spinner"></div>
                                <span>Analyzing URL safety...</span>
                            </div>
                        )}

                        {urlResult && (
                            <div className={`url-result ${urlResult.status}`}>
                                <div className="result-score-ring">
                                    <svg viewBox="0 0 120 120" className="score-svg">
                                        <circle cx="60" cy="60" r="50" className="score-bg" />
                                        <circle
                                            cx="60" cy="60" r="50"
                                            className="score-fill"
                                            style={{
                                                strokeDasharray: `${urlResult.score * 3.14} 314`,
                                                stroke: getScoreColor(urlResult.score)
                                            }}
                                        />
                                    </svg>
                                    <div className="score-text">
                                        <span className="score-num" style={{ color: getScoreColor(urlResult.score) }}>{urlResult.score}%</span>
                                        <span className="score-label">{urlResult.label}</span>
                                    </div>
                                </div>
                                <p className="result-message">{urlResult.message}</p>
                            </div>
                        )}

                        <p className="tool-disclaimer">*Demo checker — try URLs like google.com (safe) or paypa1.com (fraud)</p>
                    </div>
                </div>
            </section>

            {/* Phishing Analyzer */}
            <section className="tool-section">
                <div className="container">
                    <div className="tool-card glass-card">
                        <div className="tool-header">
                            <span className="tool-icon">🛡️</span>
                            <div>
                                <h2>Anti-Phishing Analyzer</h2>
                                <p>Paste a suspicious email or message to analyze for phishing tactics</p>
                            </div>
                        </div>

                        <form onSubmit={analyzePhishing} className="tool-form">
                            <textarea
                                className="textarea-field"
                                value={phishText}
                                onChange={(e) => setPhishText(e.target.value)}
                                placeholder="Paste the suspicious email or text message here..."
                                rows={6}
                            />
                            <button type="submit" className="btn btn-primary" disabled={phishLoading} style={{ marginTop: '16px' }}>
                                {phishLoading ? 'Analyzing...' : '🧠 Analyze with AI'}
                            </button>
                        </form>

                        {phishLoading && (
                            <div className="tool-loading">
                                <div className="loading-spinner"></div>
                                <span>AI is analyzing the text...</span>
                            </div>
                        )}

                        {phishResult && (
                            <div className="phish-result">
                                <div className="phish-score-bar">
                                    <div className="phish-score-header">
                                        <span>Risk Score</span>
                                        <span className="phish-level" style={{ color: getRiskColor(phishResult.riskScore) }}>
                                            {phishResult.riskLevel}
                                        </span>
                                    </div>
                                    <div className="phish-bar-track">
                                        <div
                                            className="phish-bar-fill"
                                            style={{
                                                width: `${phishResult.riskScore}%`,
                                                background: getRiskColor(phishResult.riskScore)
                                            }}
                                        ></div>
                                    </div>
                                    <span className="phish-score-num" style={{ color: getRiskColor(phishResult.riskScore) }}>
                                        {phishResult.riskScore}/100
                                    </span>
                                </div>
                                <div className="phish-analysis">
                                    <h4>Analysis Details</h4>
                                    <div className="analysis-text">
                                        {phishResult.analysis.split('\n').map((line, i) => (
                                            <p key={i}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Tools
