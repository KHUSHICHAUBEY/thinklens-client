import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import API_BASE_URL from '../config'

const Dashboard = () => {
  const { user, token } = useAuth()
  const [debates, setDebates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/debate/history`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setDebates(res.data.slice(0, 3))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchDebates()
  }, [token])

  return (
    <div className="page">
      <div className="container">
        {/* Welcome */}
        <div style={{ marginBottom: '40px' }}>
          <h1 className="page-title">👋 Welcome back, {user?.username}!</h1>
          <p className="page-subtitle">Ready for today's debate?</p>
          <Link to="/debate/new" className="btn btn-primary" style={{ fontSize: '15px', padding: '12px 28px' }}>
            ⚔️ Start New Debate
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {[
            { label: 'Debates Created', value: user?.debatesCreated || 0, icon: '⚔️' },
            { label: 'Votes Given', value: user?.votesGiven || 0, icon: '🗳️' },
            { label: 'Total Debates', value: debates.length, icon: '📜' },
          ].map((stat) => (
            <div key={stat.label} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '32px', fontWeight: 700, color: '#6c63ff', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Debates */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Recent Debates</h2>
            <Link to="/history" style={{ color: '#6c63ff', fontSize: '14px' }}>View all →</Link>
          </div>

          {loading ? (
            <p style={{ color: '#94a3b8' }}>Loading...</p>
          ) : debates.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚔️</div>
              <p style={{ color: '#94a3b8', marginBottom: '20px' }}>No debates yet. Start your first one!</p>
              <Link to="/debate/new" className="btn btn-primary">Start Debating</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {debates.map((debate) => (
                <div key={debate._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 500, marginBottom: '6px' }}>{debate.topic}</p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span className={`badge badge-${debate.tone}`}>{debate.tone}</span>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>
                        {new Date(debate.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#22c55e' }}>✅ {debate.forVotes}</span>
                    <span style={{ fontSize: '13px', color: '#ef4444' }}>❌ {debate.againstVotes}</span>
                    <Link to={`/debate/${debate._id}/view`} className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '13px' }}>View</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
            Quick Access
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
            { to: '/debate/new', icon: '⚔️', label: 'New Debate', desc: 'Start an AI debate on any topic', color: '#0ea5e9' },
            { to: '/reality-check', icon: '⚖️', label: 'Reality Checker', desc: 'Get unbiased AI perspective', color: '#a78bfa' },
            { to: '/history', icon: '📜', label: 'My Debates', desc: 'View all your past debates', color: '#22c55e' },
            { to: '/leaderboard', icon: '🏆', label: 'Leaderboard', desc: 'Most voted debates', color: '#f59e0b' },
            { to: '/profile', icon: '👤', label: 'My Profile', desc: 'Your account and stats', color: '#64748b' },
            { to: '/reality-history', icon: '📋', label: 'Reality History', desc: 'View past situation analyses', color: '#a78bfa' },
            ].map((link) => (
            <Link
                key={link.to}
                to={link.to}
                style={{ display: 'block', textDecoration: 'none' }}
            >
                <div
                className="card"
                style={{ textAlign: 'center', transition: 'border-color 0.2s, transform 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => {
                    e.currentTarget.style.borderColor = link.color
                    e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#1e3a5f'
                    e.currentTarget.style.transform = 'translateY(0)'
                }}
                >
                <div style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: `${link.color}15`, border: `1px solid ${link.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', margin: '0 auto 12px'
                }}>
                    {link.icon}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>
                    {link.label}
                </div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
                    {link.desc}
                </div>
                </div>
            </Link>
            ))}
        </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard