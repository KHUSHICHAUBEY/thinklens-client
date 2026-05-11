import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
    setMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav style={{
      background: 'rgba(13,17,23,0.98)',
      borderBottom: '1px solid #21262d',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(12px)'
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: '60px'
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '30px', height: '30px',
            background: '#2dd4bf',
            borderRadius: '8px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: '700',
            color: '#0d1117', flexShrink: 0
          }}>
            TL
          </div>
          <span style={{ fontWeight: 600, fontSize: '16px', color: '#e6edf3', whiteSpace: 'nowrap' }}>
            Think<span style={{ color: '#2dd4bf' }}>Lens</span>
          </span>
        </Link>

        {/* Center links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {[
            { to: '/leaderboard', label: '🏆 Leaderboard' },
            { to: '/reality-check', label: '⚖️ Reality Check' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                padding: '6px 14px', borderRadius: '8px',
                fontSize: '13px', fontWeight: 500,
                color: isActive(link.to) ? '#2dd4bf' : '#8b949e',
                background: isActive(link.to) ? 'rgba(45,212,191,0.1)' : 'transparent',
                transition: 'all 0.15s'
              }}
              onMouseEnter={e => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.color = '#e6edf3'
                  e.currentTarget.style.background = '#21262d'
                }
              }}
              onMouseLeave={e => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.color = '#8b949e'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {user ? (
            <>
              <Link to="/debate/new"
                className="btn btn-primary"
                style={{ padding: '7px 16px', fontSize: '13px' }}>
                + New Debate
              </Link>

              <div style={{ position: 'relative' }}>
                <div
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '5px 10px', borderRadius: '8px',
                    border: '1px solid #30363d', cursor: 'pointer',
                    background: menuOpen ? '#21262d' : 'transparent',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: '#2dd4bf',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 700, color: '#0d1117'
                  }}>
                    {user.username?.[0]?.toUpperCase()}
                  </div>
                  <span style={{ fontSize: '13px', color: '#8b949e' }}>
                    {user.username}
                  </span>
                  <span style={{ fontSize: '10px', color: '#656d76' }}>
                    {menuOpen ? '▲' : '▼'}
                  </span>
                </div>

                {menuOpen && (
                  <div style={{
                    position: 'absolute', top: '44px', right: 0,
                    background: '#161b22',
                    border: '1px solid #30363d',
                    borderRadius: '10px', minWidth: '190px',
                    overflow: 'hidden', zIndex: 200,
                    boxShadow: '0 8px 24px rgba(1,4,9,0.8)'
                  }}>
                    <div style={{
                      padding: '10px 14px',
                      borderBottom: '1px solid #21262d',
                      fontSize: '12px', color: '#656d76'
                    }}>
                      Signed in as <span style={{ color: '#e6edf3', fontWeight: 500 }}>{user.username}</span>
                    </div>
                    {[
                      { to: '/dashboard', label: '📊 Dashboard' },
                      { to: '/history', label: '📜 My Debates' },
                      { to: '/reality-history', label: '📋 Reality History' },
                      { to: '/profile', label: '👤 Profile' },
                    ].map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: 'block', padding: '10px 14px',
                          fontSize: '13px', color: '#8b949e',
                          borderBottom: '1px solid #21262d',
                          transition: 'all 0.15s'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#21262d'
                          e.currentTarget.style.color = '#e6edf3'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = '#8b949e'
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      style={{
                        display: 'block', width: '100%',
                        padding: '10px 14px', fontSize: '13px',
                        color: '#f85149', background: 'transparent',
                        border: 'none', textAlign: 'left',
                        cursor: 'pointer', transition: 'all 0.15s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#21262d'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      🚪 Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline"
                style={{ padding: '7px 16px', fontSize: '13px' }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary"
                style={{ padding: '7px 16px', fontSize: '13px' }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar