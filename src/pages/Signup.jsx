import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (password !== confirm) {
            setError('Passwords do not match.')
            return
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.')
            return
        }

        const users = JSON.parse(localStorage.getItem('cyberUsers') || '[]')
        if (users.find(u => u.email === email)) {
            setError('An account with this email already exists.')
            return
        }

        users.push({ name, email, password })
        localStorage.setItem('cyberUsers', JSON.stringify(users))
        localStorage.setItem('cyberUser', JSON.stringify({ name, email }))

        // Clear previous user's scan history so new account starts fresh
        localStorage.removeItem('cyberHistory')

        // Also save user to Neon DB via backend API
        try {
            const nameParts = name.trim().split(' ')
            const firstName = nameParts[0] || name
            const lastName = nameParts.slice(1).join(' ') || '-'
            await fetch('http://localhost:3001/api/persons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, role: 'User', status: 'Active' })
            })
        } catch (err) {
            console.log('Could not save to database:', err)
        }

        navigate('/dashboard')
    }

    return (
        <div className="auth-page">
            <div className="auth-split">
                {/* Left – Branding */}
                <div className="auth-brand">
                    <div className="auth-brand-bg"></div>
                    <div className="auth-brand-content">
                        <Link to="/" className="auth-logo">
                            <span>🛡️</span>
                            <span className="logo-text">CYBER<span className="logo-accent">SHIELD</span></span>
                        </Link>
                        <h2>Join the<br /><span className="highlight">Fight Against Fraud.</span></h2>
                        <p>Create your free account and get access to powerful cybersecurity tools.</p>
                        <div className="auth-features">
                            <div className="af-item"><span>🔍</span> URL Safety Scanner</div>
                            <div className="af-item"><span>🛡️</span> Phishing Detection</div>
                            <div className="af-item"><span>📊</span> Security Dashboard</div>
                        </div>
                    </div>
                </div>

                {/* Right – Form */}
                <div className="auth-form-side">
                    <div className="auth-form-container">
                        <h2>Create Account</h2>
                        <p className="auth-subtitle">Get started with your free cybersecurity account</p>

                        {error && <div className="auth-error">{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" required />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" className="input-field" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }}>Create Account</button>
                        </form>

                        <div className="auth-divider">
                            <span>or sign up with</span>
                        </div>

                        <div className="oauth-buttons">
                            <button className="btn btn-ghost oauth-btn">
                                <span>G</span> Google
                            </button>
                            <button className="btn btn-ghost oauth-btn">
                                <span>⌨</span> GitHub
                            </button>
                        </div>

                        <p className="auth-switch">
                            Already have an account? <Link to="/login">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
