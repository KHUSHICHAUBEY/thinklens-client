import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <nav style={{
      background: 'rgba(10, 22, 40, 0.97)',
      borderBottom: '1px solid #1e3a5f',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(12px)'
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: '64px'
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
            borderRadius: '8px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: '700', color: 'white'
          }}>
            K
          </div>
          <span style={{ fontWeight: 700, fontSize: '17px', color: '#e2e8f0' }}>
            Klarity <span style={{ color: '#0ea5e9' }}>AI</span>
          </span>
        </Link>

        {/* Center nav links — always visible */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Link to="/leaderboard"
            style={{
              padding: '7px 14px', borderRadius: '8px', fontSize: '13px',
              color: '#94a3b8', transition: 'all 0.2s', fontWeight: 500
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.background = '#112347' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent' }}
          >
            🏆 Leaderboard
          </Link>
          <Link to="/reality-check"
            style={{
              padding: '7px 14px', borderRadius: '8px', fontSize: '13px',
              color: '#a78bfa', transition: 'all 0.2s', fontWeight: 500,
              border: '1px solid rgba(167,139,250,0.25)',
              background: 'rgba(167,139,250,0.08)'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.18)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.08)' }}
          >
            ⚖️ Reality Check
          </Link>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {user ? (
            <>
              <Link to="/debate/new" className="btn btn-primary"
                style={{ padding: '7px 16px', fontSize: '13px' }}>
                + New Debate
              </Link>

              <div style={{ position: 'relative' }}>
                <div
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '6px 12px', borderRadius: '8px',
                    border: '1px solid #1e3a5f', cursor: 'pointer',
                    background: menuOpen ? '#112347' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{
                    width: '26px', height: '26px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 700, color: 'white'
                  }}>
                    {user.username?.[0]?.toUpperCase()}
                  </div>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                    {user.username}
                  </span>
                  <span style={{ fontSize: '10px', color: '#475569' }}>
                    {menuOpen ? '▲' : '▼'}
                  </span>
                </div>

                {menuOpen && (
                  <div style={{
                    position: 'absolute', top: '44px', right: 0,
                    background: '#0d1f38', border: '1px solid #1e3a5f',
                    borderRadius: '10px', minWidth: '180px',
                    overflow: 'hidden', zIndex: 200,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                  }}>
                    {[
                      { to: '/dashboard', label: '📊 Dashboard' },
                      { to: '/history', label: '📜 My Debates' },
                      { to: '/profile', label: '👤 Profile' },
                    ].map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: 'block', padding: '11px 16px',
                          fontSize: '13px', color: '#94a3b8',
                          borderBottom: '1px solid #1e3a5f',
                          transition: 'all 0.15s'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#112347'
                          e.currentTarget.style.color = '#e2e8f0'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = '#94a3b8'
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      style={{
                        display: 'block', width: '100%', padding: '11px 16px',
                        fontSize: '13px', color: '#f87171', background: 'transparent',
                        border: 'none', textAlign: 'left', cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#2d0a0a'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      🚪 Logout
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