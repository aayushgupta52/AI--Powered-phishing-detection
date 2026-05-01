import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-glow"></div>
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="logo-icon">🛡️</span>
                            <span className="logo-text">CYBER<span className="logo-accent">SHIELD</span></span>
                        </div>
                        <p className="footer-tagline">
                            Protecting businesses and individuals from cyber threats with AI-powered security solutions.
                        </p>
                        <div className="footer-social">
                            <a href="https://x.com/cybershield" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link">𝕏</a>
                            <a href="https://linkedin.com/company/cybershield" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">in</a>
                            <a href="https://github.com/cybershield" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link">⌨</a>
                            <a href="https://instagram.com/cybershield" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">📷</a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Platform</h4>
                        <ul>
                            <li><Link to="/tools">Security Tools</Link></li>
                            <li><Link to="/education">Learn Security</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/login">Sign In</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Services</h4>
                        <ul>
                            <li><a href="#">URL Scanning</a></li>
                            <li><a href="#">Phishing Analysis</a></li>
                            <li><a href="#">Incident Response</a></li>
                            <li><a href="#">Threat Intelligence</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Contact</h4>
                        <ul className="footer-contact-list">
                            <li>
                                <span className="contact-icon">📍</span>
                                <span>Andheri West, Mumbai, MH, India</span>
                            </li>
                            <li>
                                <span className="contact-icon">📞</span>
                                <span>+91 98765 43210</span>
                            </li>
                            <li>
                                <span className="contact-icon">✉️</span>
                                <a href="mailto:info@cybershield.com">info@cybershield.com</a>
                            </li>
                            <li>
                                <span className="contact-icon">🕐</span>
                                <span>Mon-Sat: 9AM - 6PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>&copy; 2026 CyberShield. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
