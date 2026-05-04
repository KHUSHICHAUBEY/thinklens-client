import { Link } from 'react-router-dom'

const NotFound = () => (
  <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px' }}>
    <div>
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚔️</div>
      <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#6c63ff', marginBottom: '12px' }}>404</h1>
      <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '32px' }}>This page left the arena.</p>
      <Link to="/" className="btn btn-primary" style={{ fontSize: '15px', padding: '12px 28px' }}>Back to Home</Link>
    </div>
  </div>
)

export default NotFound