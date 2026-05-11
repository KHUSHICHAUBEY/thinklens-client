import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import API_BASE_URL from '../config';

const History = () => {
  const { token } = useAuth()
  const [debates, setDebates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/debate/history`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setDebates(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [token])

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">📜 My Debates</h1>
        <p className="page-subtitle">All your debates in one place</p>

        {loading ? (
          <p style={{ color: '#94a3b8' }}>Loading...</p>
        ) : debates.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '56px' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚔️</div>
            <p style={{ color: '#94a3b8', marginBottom: '20px' }}>No debates yet!</p>
            <Link to="/debate/new" className="btn btn-primary">Start Your First Debate</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '14px' }}>
            {debates.map((debate) => (
              <div key={debate._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, marginBottom: '8px', fontSize: '15px' }}>{debate.topic}</p>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className={`badge badge-${debate.tone}`}>{debate.tone}</span>
                    <span style={{ fontSize: '12px', color: '#22c55e' }}>✅ {debate.forVotes}</span>
                    <span style={{ fontSize: '12px', color: '#ef4444' }}>❌ {debate.againstVotes}</span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{new Date(debate.createdAt).toLocaleDateString()}</span>
                    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px', background: debate.status === 'completed' ? '#1a3a2a' : '#1e3a5f', color: debate.status === 'completed' ? '#4ade80' : '#60a5fa' }}>
                      {debate.status}
                    </span>
                  </div>
                </div>
                <Link to={`/debate/${debate._id}/view`} className="btn btn-outline" style={{ padding: '8px 18px', fontSize: '13px' }}>
                  View →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default History