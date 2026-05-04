import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import DebateMessage from '../components/debate/DebateMessage'

const DebateView = () => {
  const { id } = useParams()
  const [debate, setDebate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/debate/${id}`)
      .then(res => setDebate(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div style={{ textAlign: 'center', padding: '80px', color: '#94a3b8' }}>Loading debate...</div>
  if (!debate) return <div style={{ textAlign: 'center', padding: '80px', color: '#ef4444' }}>Debate not found</div>

  const total = debate.forVotes + debate.againstVotes
  const forPct = total ? Math.round((debate.forVotes / total) * 100) : 50

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="card" style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>"{debate.topic}"</h1>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className={`badge badge-${debate.tone}`}>{debate.tone}</span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>by {debate.createdBy?.username}</span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>{new Date(debate.createdAt).toLocaleDateString()}</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '16px' }}>
            <span style={{ color: '#22c55e', fontSize: '14px', fontWeight: 500 }}>✅ FOR: {debate.forVotes} votes ({forPct}%)</span>
            <span style={{ color: '#ef4444', fontSize: '14px', fontWeight: 500 }}>❌ AGAINST: {debate.againstVotes} votes ({100 - forPct}%)</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(34,197,94,0.1)', borderRadius: '8px', border: '1px solid rgba(34,197,94,0.2)' }}>
            <span style={{ color: '#22c55e', fontWeight: 600 }}>✅ FOR</span>
          </div>
          <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)' }}>
            <span style={{ color: '#ef4444', fontWeight: 600 }}>❌ AGAINST</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <div>{debate.messages.filter(m => m.side === 'FOR').map((msg, i) => <DebateMessage key={i} side={msg.side} round={msg.round} content={msg.content} />)}</div>
          <div>{debate.messages.filter(m => m.side === 'AGAINST').map((msg, i) => <DebateMessage key={i} side={msg.side} round={msg.round} content={msg.content} />)}</div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link to="/debate/new" className="btn btn-primary">⚔️ Start New Debate</Link>
          <Link to="/leaderboard" className="btn btn-outline">🏆 Leaderboard</Link>
        </div>
      </div>
    </div>
  )
}

export default DebateView