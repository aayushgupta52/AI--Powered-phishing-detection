import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
    const [user, setUser] = useState(null)
    const [history, setHistory] = useState([])
    const [activeTab, setActiveTab] = useState('overview')
    const navigate = useNavigate()

    useEffect(() => {
        const userData = localStorage.getItem('cyberUser')
        if (!userData) {
            navigate('/login')
            return
        }
        setUser(JSON.parse(userData))
        setHistory(JSON.parse(localStorage.getItem('cyberHistory') || '[]'))
    }, [navigate])

    if (!user) return null

    const getStatusBadge = (result) => {
        const cl = result?.toLowerCase()
        if (cl === 'safe' || cl === 'low risk') return 'badge-safe'
        if (cl === 'dangerous' || cl === 'high risk' || cl === 'fraud') return 'badge-danger'
        return 'badge-warn'
    }

    const totalScans = history.length
    const safeCount = history.filter(h => ['Safe', 'Low Risk'].includes(h.result)).length
    const dangerCount = history.filter(h => ['Dangerous', 'High Risk', 'Fraud'].includes(h.result)).length

    return (
        <div className="dashboard-page">
            <div className="dashboard-layout">
                {/* Sidebar */}
                <aside className="dash-sidebar">
                    <div className="dash-sidebar-header">
                        <div className="dash-user-info">
                            <div className="dash-avatar">👤</div>
                            <div>
                                <h4>{user.name}</h4>
                                <span>{user.email}</span>
                            </div>
                        </div>
                    </div>
                    <nav className="dash-nav">
                        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
                            📊 Overview
                        </button>
                        <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>
                            🕐 Scan History
                        </button>
                        <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
                            ⚙️ Profile
                        </button>
                    </nav>
                    <div className="dash-sidebar-footer">
                        <Link to="/tools" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                            🔍 New Scan
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="dash-main">
                    {activeTab === 'overview' && (
                        <div className="dash-content">
                            <h2>Security Overview</h2>
                            <p className="dash-greeting">Welcome back, {user.name}. Here's your security summary.</p>

                            <div className="dash-stats-grid">
                                <div className="dash-stat glass-card">
                                    <span className="ds-icon">🔍</span>
                                    <span className="ds-value">{totalScans}</span>
                                    <span className="ds-label">Total Scans</span>
                                </div>
                                <div className="dash-stat glass-card">
                                    <span className="ds-icon">✅</span>
                                    <span className="ds-value safe">{safeCount}</span>
                                    <span className="ds-label">Safe Results</span>
                                </div>
                                <div className="dash-stat glass-card">
                                    <span className="ds-icon">⚠️</span>
                                    <span className="ds-value danger">{dangerCount}</span>
                                    <span className="ds-label">Threats Found</span>
                                </div>
                                <div className="dash-stat glass-card">
                                    <span className="ds-icon">🛡️</span>
                                    <span className="ds-value">{totalScans > 0 ? Math.round((safeCount / totalScans) * 100) : 0}%</span>
                                    <span className="ds-label">Safety Rate</span>
                                </div>
                            </div>

                            <h3 className="mt-4 mb-2">Recent Activity</h3>
                            {history.length === 0 ? (
                                <div className="dash-empty glass-card">
                                    <span>🔍</span>
                                    <p>No scans yet. <Link to="/tools">Run your first security scan</Link></p>
                                </div>
                            ) : (
                                <div className="dash-table-wrap glass-card">
                                    <table className="dash-table">
                                        <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Target</th>
                                                <th>Result</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.slice(0, 5).map((item, i) => (
                                                <tr key={i}>
                                                    <td><span className="type-badge">{item.type}</span></td>
                                                    <td className="target-cell">{item.target}</td>
                                                    <td><span className={`status-badge ${getStatusBadge(item.result)}`}>{item.result}</span></td>
                                                    <td className="date-cell">{new Date(item.date).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="dash-content">
                            <h2>Scan History</h2>
                            <p className="text-gray mb-3">Complete log of all your security scans and analyses.</p>
                            {history.length === 0 ? (
                                <div className="dash-empty glass-card">
                                    <span>📋</span>
                                    <p>No history yet. <Link to="/tools">Start scanning now</Link></p>
                                </div>
                            ) : (
                                <div className="dash-table-wrap glass-card">
                                    <table className="dash-table">
                                        <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Target</th>
                                                <th>Result</th>
                                                <th>Score</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.map((item, i) => (
                                                <tr key={i}>
                                                    <td><span className="type-badge">{item.type}</span></td>
                                                    <td className="target-cell">{item.target}</td>
                                                    <td><span className={`status-badge ${getStatusBadge(item.result)}`}>{item.result}</span></td>
                                                    <td>{item.score}%</td>
                                                    <td className="date-cell">{new Date(item.date).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="dash-content">
                            <h2>Profile Settings</h2>
                            <p className="text-gray mb-3">Manage your account information.</p>
                            <div className="profile-card glass-card">
                                <div className="profile-header">
                                    <div className="profile-avatar">👤</div>
                                    <div>
                                        <h3>{user.name}</h3>
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                                <div className="profile-fields">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input type="text" className="input-field" defaultValue={user.name} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="input-field" defaultValue={user.email} disabled />
                                    </div>
                                    <button className="btn btn-primary mt-2">Save Changes</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
