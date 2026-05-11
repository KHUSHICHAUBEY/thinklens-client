import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../config';

const Leaderboard = () => {
  const [debates, setDebates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/debate/leaderboard`)
      .then(res => setDebates(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 className="page-title">🏆 Leaderboard</h1>
        <p className="page-subtitle">Most voted debates of all time</p>

        {loading ? (
          <p style={{ color: '#94a3b8' }}>Loading...</p>
        ) : debates.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '56px' }}>
            <p style={{ color: '#94a3b8', marginBottom: '20px' }}>No debates yet. Be the first!</p>
            <Link to="/debate/new" className="btn btn-primary">Start a Debate</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '14px' }}>
            {debates.map((debate, index) => {
              const total = debate.forVotes + debate.againstVotes
              const forPct = total ? Math.round((debate.forVotes / total) * 100) : 50
              const medals = ['🥇', '🥈', '🥉']
              return (
                <div key={debate._id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '20px' }}>{medals[index] || `#${index + 1}`}</span>
                        <p style={{ fontWeight: 600, fontSize: '15px' }}>{debate.topic}</p>
                      </div>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>by {debate.createdBy?.username} · {new Date(debate.createdAt).toLocaleDateString()}</span>
                    </div>
                    <Link to={`/debate/${debate._id}/view`} className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '13px', flexShrink: 0 }}>View</Link>
                  </div>
                  <div style={{ height: '8px', borderRadius: '4px', background: '#2a2a4a', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ height: '100%', width: `${forPct}%`, background: 'linear-gradient(90deg, #22c55e, #16a34a)' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#22c55e' }}>✅ FOR: {debate.forVotes} ({forPct}%)</span>
                    <span style={{ color: '#64748b' }}>{total} total votes</span>
                    <span style={{ color: '#ef4444' }}>❌ AGAINST: {debate.againstVotes} ({100 - forPct}%)</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard