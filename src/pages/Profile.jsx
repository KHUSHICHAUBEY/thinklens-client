import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { user, logout } = useAuth()

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: '560px' }}>
        <h1 className="page-title">👤 My Profile</h1>

        <div className="card" style={{ marginBottom: '24px', textAlign: 'center' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', margin: '0 auto 16px'
          }}>
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>{user?.username}</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>{user?.email}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Debates Created', value: user?.debatesCreated || 0, icon: '⚔️' },
            { label: 'Votes Given', value: user?.votesGiven || 0, icon: '🗳️' },
          ].map((stat) => (
            <div key={stat.label} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#6c63ff' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/history" className="btn btn-outline" style={{ justifyContent: 'center', padding: '12px' }}>📜 View My Debates</Link>
          <Link to="/debate/new" className="btn btn-primary" style={{ justifyContent: 'center', padding: '12px' }}>⚔️ Start New Debate</Link>
          <button onClick={logout} className="btn btn-outline" style={{ justifyContent: 'center', padding: '12px', borderColor: '#ef4444', color: '#ef4444' }}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile