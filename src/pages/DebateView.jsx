import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import DebateMessage from '../components/debate/DebateMessage'
import { useAuth } from '../context/AuthContext'
import API_BASE_URL from '../config';

const DebateView = () => {
  const { id } = useParams()
  const { token } = useAuth()
  const [debate, setDebate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [voted, setVoted] = useState(false)
  const [voting, setVoting] = useState(false)

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/debate/${id}`)
      .then(res => setDebate(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))

    // Check if already voted
    const votedDebates = JSON.parse(localStorage.getItem('votedDebates') || '[]')
    if (votedDebates.includes(id)) setVoted(true)
  }, [id])

  const handleVote = async (vote) => {
    if (!token) { toast.error('Please login to vote'); return }
    if (voted) { toast.error('You have already voted!'); return }
    setVoting(true)
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/debate/vote/${id}`,
        { vote },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setDebate(prev => ({
        ...prev,
        forVotes: res.data.forVotes,
        againstVotes: res.data.againstVotes
      }))
      setVoted(true)
      // Save voted debate to localStorage
      const votedDebates = JSON.parse(localStorage.getItem('votedDebates') || '[]')
      localStorage.setItem('votedDebates', JSON.stringify([...votedDebates, id]))
      toast.success('Vote recorded!')
    } catch {
      toast.error('Could not record vote')
    } finally {
      setVoting(false)
    }
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '80px', color: '#94a3b8' }}>Loading debate...</div>
  if (!debate) return <div style={{ textAlign: 'center', padding: '80px', color: '#ef4444' }}>Debate not found</div>

  const total = debate.forVotes + debate.againstVotes
  const forPct = total ? Math.round((debate.forVotes / total) * 100) : 50
  const againstPct = 100 - forPct
  const winner = debate.forVotes > debate.againstVotes ? 'FOR' : debate.againstVotes > debate.forVotes ? 'AGAINST' : 'TIE'

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: '900px' }}>

        {/* Header */}
        <div className="card" style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>"{debate.topic}"</h1>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className={`badge badge-${debate.tone}`}>{debate.tone}</span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>by {debate.createdBy?.username}</span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>{new Date(debate.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Vote bar */}
          {total > 0 && (
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#22c55e', fontWeight: 600, fontSize: '14px' }}>✅ FOR {forPct}%</span>
                <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '14px' }}>❌ AGAINST {againstPct}%</span>
              </div>
              <div style={{ height: '10px', borderRadius: '5px', background: '#1e3a5f', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${forPct}%`, background: 'linear-gradient(90deg, #22c55e, #16a34a)', transition: 'width 0.8s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{debate.forVotes} votes</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{total} total</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{debate.againstVotes} votes</span>
              </div>
            </div>
          )}
        </div>

        {/* AI Verdict if exists */}
        {debate.verdict && (
          <div style={{
            background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.3)',
            borderRadius: '12px', padding: '20px 24px', marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '20px' }}>⚖️</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                AI Verdict
              </span>
            </div>
            <p style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: 1.7 }}>{debate.verdict}</p>
          </div>
        )}

        {/* Two column debate */}
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

        {/* Vote Section */}
        <div className="card" style={{ marginBottom: '24px', textAlign: 'center' }}>
          {voted ? (
            <div>
              <p style={{ color: '#22c55e', fontWeight: 500, marginBottom: '8px' }}>✅ You have already voted on this debate</p>
              <p style={{ fontSize: '13px', color: '#64748b' }}>
                Current winner: <span style={{ color: winner === 'FOR' ? '#22c55e' : winner === 'AGAINST' ? '#ef4444' : '#94a3b8', fontWeight: 600 }}>
                  {winner === 'TIE' ? "It's a Tie!" : `${winner} side`}
                </span>
              </p>
            </div>
          ) : (
            <div>
              <p style={{ fontWeight: 500, marginBottom: '16px', fontSize: '15px' }}>Which side convinced you more?</p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button
                  onClick={() => handleVote('for')}
                  disabled={voting}
                  className="btn btn-for"
                  style={{ padding: '12px 32px', fontSize: '15px', opacity: voting ? 0.7 : 1 }}
                >
                  ✅ Vote FOR
                </button>
                <button
                  onClick={() => handleVote('against')}
                  disabled={voting}
                  className="btn btn-against"
                  style={{ padding: '12px 32px', fontSize: '15px', opacity: voting ? 0.7 : 1 }}
                >
                  ❌ Vote AGAINST
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/debate/new" className="btn btn-primary">⚔️ Start New Debate</Link>
          <Link to="/leaderboard" className="btn btn-outline">🏆 Leaderboard</Link>
          <Link to="/history" className="btn btn-outline">📜 My History</Link>
        </div>
      </div>
    </div>
  )
}

export default DebateView