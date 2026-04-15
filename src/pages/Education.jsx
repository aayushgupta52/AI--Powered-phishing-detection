import { Link } from 'react-router-dom'
import './Education.css'

function Education() {
    const videos = [
        { title: 'What is Phishing?', desc: 'Learn to identify deceptive emails designed to steal your data.', videoId: 'ilRlaF3h9AU' },
        { title: 'How to Create Strong Passwords', desc: 'Why your password might be weaker than you think and how to fix it.', videoId: 'bFHODNafc-k' },
        { title: 'Social Engineering Attacks', desc: 'Understanding how hackers manipulate psychology to breach security.', videoId: 'XJv5AP2UZvg' },
        { title: 'Two-Factor Authentication Explained', desc: 'Why 2FA is critical for protecting all your online accounts.', videoId: 'bFHODNafc-k' },
        { title: 'The Dangers of Public Wi-Fi', desc: 'Why public hotspots are dangerous and how a VPN protects you.', videoId: 'Bvqyg51Czdk' },
        { title: 'What is Malware?', desc: 'Understanding viruses, ransomware, spyware, and how to stay safe.', videoId: 'Bvqyg51Czdk' },
    ]

    const helplines = [
        { icon: '🚨', title: 'National Cyber Crime Helpline', number: '1930', desc: 'Report cybercrime incidents 24/7' },
        { icon: '📞', title: 'Cyber Crime Cell', number: '+91-11-2431-0551', desc: 'Delhi Cyber Crime Investigation Cell' },
        { icon: '🌐', title: 'Online Complaint Portal', number: 'cybercrime.gov.in', desc: 'File complaints online at the national portal' },
        { icon: '📧', title: 'Email Support', number: 'support@cybershield.com', desc: 'Email us for non-urgent security queries' },
    ]

    return (
        <div className="education-page">
            {/* Hero */}
            <section className="edu-hero">
                <div className="edu-hero-bg"></div>
                <div className="container">
                    <span className="section-label">Learn & Protect</span>
                    <h1 className="section-title">
                        Cybersecurity <span className="highlight">Education Hub</span>
                    </h1>
                    <p className="section-desc" style={{ margin: '0 auto' }}>
                        Learn how to protect yourself from scams, phishing, and cyber attacks with our expert resources.
                    </p>
                </div>
            </section>

            {/* Helpline Section */}
            <section className="edu-section">
                <div className="container">
                    <div className="edu-section-header">
                        <div>
                            <span className="section-label">Cyber Helpline</span>
                            <h2 className="section-title">Need <span className="highlight">Immediate Help?</span></h2>
                            <p className="section-desc">If you've been scammed or are under attack, contact these emergency resources immediately.</p>
                        </div>
                    </div>

                    <div className="helpline-grid">
                        {helplines.map((h, i) => (
                            <div key={i} className="helpline-card glass-card">
                                <span className="helpline-icon">{h.icon}</span>
                                <h3>{h.title}</h3>
                                <span className="helpline-number">{h.number}</span>
                                <p>{h.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="report-banner glass-card">
                        <div className="report-content">
                            <span className="report-icon">🚨</span>
                            <div>
                                <h3>Are You Being Scammed Right Now?</h3>
                                <p>Don't panic. Stop all communication, do not share any more information, and report immediately.</p>
                            </div>
                        </div>
                        <Link to="/tools" className="btn btn-primary">Report & Analyze →</Link>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="edu-section edu-videos">
                <div className="container">
                    <div className="edu-section-header text-center">
                        <span className="section-label">Video Resources</span>
                        <h2 className="section-title">How to <span className="highlight">Overcome Scams</span></h2>
                        <p className="section-desc" style={{ margin: '0 auto' }}>Watch our expert-led video guides to strengthen your cybersecurity knowledge.</p>
                    </div>

                    <div className="video-grid">
                        {videos.map((v, i) => (
                            <div key={i} className="video-card glass-card">
                                <div className="video-iframe-wrapper">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${v.videoId}`}
                                        title={v.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="video-info">
                                    <h3>{v.title}</h3>
                                    <p>{v.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Tips */}
            <section className="edu-section tips-section">
                <div className="container">
                    <div className="tips-grid">
                        <div className="tip-card">
                            <span className="tip-num">01</span>
                            <h3>Verify Before You Click</h3>
                            <p>Always hover over links to check the actual URL before clicking. Look for misspellings in domain names.</p>
                        </div>
                        <div className="tip-card">
                            <span className="tip-num">02</span>
                            <h3>Use Unique Passwords</h3>
                            <p>Never reuse passwords. Use a password manager to generate and store strong, unique passwords for every account.</p>
                        </div>
                        <div className="tip-card">
                            <span className="tip-num">03</span>
                            <h3>Enable 2FA Everywhere</h3>
                            <p>Two-factor authentication adds an extra layer of protection even if your password is compromised.</p>
                        </div>
                        <div className="tip-card">
                            <span className="tip-num">04</span>
                            <h3>Keep Software Updated</h3>
                            <p>Software updates often include critical security patches. Enable automatic updates wherever possible.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Education
