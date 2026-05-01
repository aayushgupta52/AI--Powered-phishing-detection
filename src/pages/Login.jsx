import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        const users = JSON.parse(localStorage.getItem('cyberUsers') || '[]')
        const user = users.find(u => u.email === email && u.password === password)

        if (user) {
            localStorage.setItem('cyberUser', JSON.stringify({ name: user.name, email: user.email }))
            navigate('/dashboard')
        } else {
            setError('Invalid email or password. Try signing up first.')
        }
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
                        <h2>Welcome Back,<br /><span className="highlight">Defender.</span></h2>
                        <p>Access your security dashboard and stay protected against cyber threats.</p>
                        <div className="auth-features">
                            <div className="af-item"><span>🔒</span> End-to-end encrypted</div>
                            <div className="af-item"><span>🧠</span> AI-powered protection</div>
                            <div className="af-item"><span>⚡</span> Real-time alerts</div>
                        </div>
                    </div>
                </div>

                {/* Right – Form */}
                <div className="auth-form-side">
                    <div className="auth-form-container">
                        <h2>Sign In</h2>
                        <p className="auth-subtitle">Enter your credentials to access your account</p>

                        {error && <div className="auth-error">{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                            </div>
                            <div className="form-row">
                                <label className="checkbox-label">
                                    <input type="checkbox" /> Remember me
                                </label>
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Sign In</button>
                        </form>



                        <p className="auth-switch">
                            Don't have an account? <Link to="/signup">Create account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
