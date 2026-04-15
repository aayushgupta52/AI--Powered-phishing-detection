import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()
    const isLoggedIn = localStorage.getItem('cyberUser')

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMobileOpen(false)
        document.body.style.overflow = 'auto'
    }, [location])

    const toggleMobile = () => {
        setMobileOpen(prev => !prev)
        document.body.style.overflow = mobileOpen ? 'auto' : 'hidden'
    }

    const handleLogout = () => {
        localStorage.removeItem('cyberUser')
        window.location.href = '/'
    }

    return (
        <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <nav className="navbar">
                    <Link to="/" className="nav-logo">
                        <span className="logo-icon">🛡️</span>
                        <span className="logo-text">CYBER<span className="logo-accent">SHIELD</span></span>
                    </Link>

                    <ul className={`nav-links ${mobileOpen ? 'active' : ''}`}>
                        <li><Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>Home</Link></li>
                        <li><Link to="/tools" className={location.pathname === '/tools' ? 'active-link' : ''}>Security Tools</Link></li>
                        <li><Link to="/education" className={location.pathname === '/education' ? 'active-link' : ''}>Learn</Link></li>

                        {isLoggedIn && (
                            <li><Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active-link' : ''}>Dashboard</Link></li>
                        )}
                    </ul>

                    <div className="nav-actions">
                        {isLoggedIn ? (
                            <>
                                <Link to="/dashboard" className="nav-user-btn">
                                    <span className="user-avatar">👤</span>
                                    <span className="user-name">{JSON.parse(isLoggedIn).name}</span>
                                </Link>
                                <button onClick={handleLogout} className="btn btn-sm btn-ghost nav-logout-btn">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-sm btn-ghost">Sign In</Link>
                                <Link to="/signup" className="btn btn-sm btn-primary">Get Started</Link>
                            </>
                        )}
                    </div>

                    <button className={`mobile-toggle ${mobileOpen ? 'open' : ''}`} onClick={toggleMobile} aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
