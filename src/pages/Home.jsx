import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    const statsRef = useRef(null)

    useEffect(() => {
        // Animate stats on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, { threshold: 0.15 })

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const services = [
        { num: '01', title: 'Backup & Recovery', desc: 'Enterprise-grade data backup with instant recovery protocols to keep your business online 24/7.', icon: '🔄' },
        { num: '02', title: 'Network Security', desc: 'Advanced firewall management and intrusion detection systems to guard your network perimeter.', icon: '🌐' },
        { num: '03', title: 'Stability Fixes', desc: 'Proactive system monitoring and automated patching to prevent vulnerabilities before they strike.', icon: '🔧' },
        { num: '04', title: 'System Administration', desc: 'Full-stack system admin services ensuring optimal performance and security compliance.', icon: '💻' },
        { num: '05', title: 'Server Migration', desc: 'Zero-downtime server migration with end-to-end encryption and data integrity guarantees.', icon: '📦' },
        { num: '06', title: 'Threat Intelligence', desc: 'AI-powered threat analysis and real-time alerting to stay ahead of emerging cyber threats.', icon: '🧠' }
    ]

    const team = [
        { name: 'Prashant Chaurasia', role: 'Lead Security Analyst', emoji: '👨‍💻' },
        { name: 'Rahul Choudhary', role: 'Network Engineer', emoji: '🔒' },
        { name: 'Rajeev Chauhan', role: 'Threat Specialist', emoji: '🎯' },
        { name: 'Aayush Gupta', role: 'Incident Responder', emoji: '⚡' }
    ]

    const stats = [
        { value: '99.9%', label: 'Uptime Guarantee' },
        { value: '50K+', label: 'Threats Blocked' },
        { value: '2.5K+', label: 'Protected Clients' },
        { value: '24/7', label: 'Live Monitoring' }
    ]

    return (
        <div className="home-page">
            {/* ===== HERO ===== */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-grid-pattern"></div>
                    <div className="hero-glow hero-glow-1"></div>
                    <div className="hero-glow hero-glow-2"></div>
                    <div className="hero-scanline"></div>
                </div>
                <div className="container hero-content">
                    <div className="hero-badge animate-fade-in">
                        <span className="badge-dot"></span>
                        AI-Powered Cybersecurity Platform
                    </div>
                    <h1 className="hero-title animate-fade-in-up">
                        A Cyber Attack Can<br />
                        <span className="hero-highlight">Hit Any Company</span>
                    </h1>
                    <p className="hero-desc animate-fade-in-up delay-2">
                        Protect your digital assets with our enterprise-grade security platform.
                        AI-driven threat detection, real-time monitoring, and expert incident response —
                        all in one powerful dashboard.
                    </p>
                    <div className="hero-actions animate-fade-in-up delay-3">
                        <Link to="/tools" className="btn btn-primary btn-lg">
                            <span>🔍</span> Scan a URL Now
                        </Link>
                        <Link to="/education" className="btn btn-secondary btn-lg">
                            Learn More
                        </Link>
                    </div>
                    <div className="hero-trust animate-fade-in-up delay-4">
                        <span className="trust-label">Trusted by teams at</span>
                        <div className="trust-logos">
                            <span>Microsoft</span>
                            <span>Google</span>
                            <span>Amazon</span>
                            <span>Meta</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== STATS BAR ===== */}
            <section className="stats-bar" ref={statsRef}>
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, i) => (
                            <div key={i} className="stat-item animate-on-scroll">
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SERVICES ===== */}
            <section className="services-section" id="services">
                <div className="container">
                    <div className="section-header text-center animate-on-scroll">
                        <span className="section-label">What We Offer</span>
                        <h2 className="section-title">
                            Enterprise Security <span className="highlight">Solutions</span>
                        </h2>
                        <p className="section-desc" style={{ margin: '0 auto' }}>
                            Comprehensive protection for your business from every angle. Our six core services
                            cover every vector of attack.
                        </p>
                    </div>
                    <div className="services-grid">
                        {services.map((service, i) => (
                            <div key={i} className={`service-card glass-card animate-on-scroll delay-${(i % 3) + 1}`}>
                                <div className="service-icon">{service.icon}</div>
                                <div className="service-num">{service.num}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-desc">{service.desc}</p>
                                <div className="service-bar"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== MISSION ===== */}
            <section className="mission-section animate-on-scroll">
                <div className="container">
                    <div className="mission-grid">
                        <div className="mission-text">
                            <span className="section-label">Our Mission</span>
                            <h2 className="section-title">
                                We Tackle <span className="highlight">Complex Challenges</span> with
                                <br /><span className="highlight">Tailored Solutions</span>
                            </h2>
                            <p className="section-desc">
                                We combine cutting-edge AI technology with decades of security expertise
                                to deliver solutions unique to your business needs.
                            </p>
                            <div className="mission-features">
                                <div className="mission-feature">
                                    <span className="mf-icon">✓</span>
                                    <span>Real-time threat monitoring & alerts</span>
                                </div>
                                <div className="mission-feature">
                                    <span className="mf-icon">✓</span>
                                    <span>AI-powered phishing detection</span>
                                </div>
                                <div className="mission-feature">
                                    <span className="mf-icon">✓</span>
                                    <span>24/7 incident response team</span>
                                </div>
                                <div className="mission-feature">
                                    <span className="mf-icon">✓</span>
                                    <span>Enterprise compliance & auditing</span>
                                </div>
                            </div>
                            <Link to="/tools" className="btn btn-primary" style={{ marginTop: '32px' }}>
                                Try Our Tools →
                            </Link>
                        </div>
                        <div className="mission-visual">
                            <div className="mission-card glass-card">
                                <div className="mc-header">
                                    <span className="mc-dot safe"></span>
                                    <span>System Status</span>
                                </div>
                                <div className="mc-stat">
                                    <span className="mc-big">98.7%</span>
                                    <span className="mc-label">Threats Neutralized</span>
                                </div>
                                <div className="mc-bar-container">
                                    <div className="mc-bar" style={{ width: '98.7%' }}></div>
                                </div>
                            </div>
                            <div className="mission-card glass-card" style={{ marginTop: '16px' }}>
                                <div className="mc-header">
                                    <span className="mc-dot warning"></span>
                                    <span>Live Scan</span>
                                </div>
                                <div className="mc-stat">
                                    <span className="mc-big">1,247</span>
                                    <span className="mc-label">URLs Analyzed Today</span>
                                </div>
                                <div className="mc-bar-container">
                                    <div className="mc-bar red" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== TEAM ===== */}
            <section className="team-section" id="team">
                <div className="container">
                    <div className="section-header text-center animate-on-scroll">
                        <span className="section-label">Our Team</span>
                        <h2 className="section-title">
                            Meet the <span className="highlight">Experts</span>
                        </h2>
                        <p className="section-desc" style={{ margin: '0 auto' }}>
                            A hand-picked team of cybersecurity professionals dedicated to keeping you safe.
                        </p>
                    </div>
                    <div className="team-grid">
                        {team.map((member, i) => (
                            <div key={i} className={`team-card glass-card animate-on-scroll delay-${i + 1}`}>
                                <div className="team-avatar">{member.emoji}</div>
                                <h3 className="team-name">{member.name}</h3>
                                <p className="team-role">{member.role}</p>
                                <div className="team-socials">
                                    <a href="#" className="team-social-link">𝕏</a>
                                    <a href="#" className="team-social-link">in</a>
                                    <a href="#" className="team-social-link">⌨</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card animate-on-scroll">
                        <div className="cta-glow"></div>
                        <h2>Ready to Secure Your Business?</h2>
                        <p>Start with a free URL scan or talk to our AI assistant about your security needs.</p>
                        <div className="cta-actions">
                            <Link to="/tools" className="btn btn-primary btn-lg">Launch Security Tools</Link>
                            <Link to="/signup" className="btn btn-ghost btn-lg">Create Free Account</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
