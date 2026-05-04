import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const DebateResult = () => {
  const { id } = useParams()
  const { token } = useAuth()
  const navigate = useNavigate()
  const [debate, setDebate] = useState(null)
  const [voted, setVoted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDebate = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/debate/${id}`)
        setDebate(res.data)
      } catch { toast.error('Debate not found') }
      finally { setLoading(false) }
    }
    fetchDebate()
  }, [id])

  const handleVote = async (vote) => {
    if (voted) return
    try {
      const res = await axios.post(
        `http://localhost:5000/api/debate/vote/${id}`,
        { vote },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setDebate(prev => ({ ...prev, forVotes: res.data.forVotes, againstVotes: res.data.againstVotes }))
      setVoted(true)
      toast.success('Vote recorded!')
    } catch { toast.error('Could not record vote') }
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '80px', color: '#94a3b8' }}>Loading...</div>
  if (!debate) return null

  const total = debate.forVotes + debate.againstVotes
  const forPct = total ? Math.round((debate.forVotes / total) * 100) : 50
  const againstPct = total ? Math.round((debate.againstVotes / total) * 100) : 50
  const winner = debate.forVotes > debate.againstVotes ? 'FOR' : debate.againstVotes > debate.forVotes ? 'AGAINST' : 'TIE'

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: '680px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>
            {winner === 'FOR' ? '✅' : winner === 'AGAINST' ? '❌' : '🤝'}
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
            {winner === 'TIE' ? "It's a Tie!" : `${winner} wins!`}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>"{debate.topic}"</p>
        </div>

        {/* Vote Bar */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#22c55e', fontWeight: 600, fontSize: '14px' }}>✅ FOR {forPct}%</span>
            <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '14px' }}>❌ AGAINST {againstPct}%</span>
          </div>
          <div style={{ height: '12px', borderRadius: '6px', background: '#2a2a4a', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${forPct}%`, background: 'linear-gradient(90deg, #22c55e, #16a34a)', transition: 'width 0.8s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>{debate.forVotes} votes</span>
            <span style={{ fontSize: '12px', color: '#64748b' }}>{debate.againstVotes} votes</span>
          </div>
        </div>

        {/* Vote Buttons */}
        {!voted ? (
          <div className="card" style={{ marginBottom: '24px', textAlign: 'center' }}>
            <p style={{ fontWeight: 500, marginBottom: '20px' }}>Which side convinced you?</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button onClick={() => handleVote('for')} className="btn btn-for" style={{ padding: '12px 32px', fontSize: '15px' }}>
                ✅ Vote FOR
              </button>
              <button onClick={() => handleVote('against')} className="btn btn-against" style={{ padding: '12px 32px', fontSize: '15px' }}>
                ❌ Vote AGAINST
              </button>
            </div>
          </div>
        ) : (
          <div className="card" style={{ marginBottom: '24px', textAlign: 'center', borderColor: '#6c63ff' }}>
            <p style={{ color: '#6c63ff', fontWeight: 500 }}>✅ Your vote has been recorded!</p>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to={`/debate/${id}/view`} className="btn btn-outline">📖 View Full Debate</Link>
          <Link to="/debate/new" className="btn btn-primary">⚔️ New Debate</Link>
          <Link to="/leaderboard" className="btn btn-outline">🏆 Leaderboard</Link>
        </div>
      </div>
    </div>
  )
}

export default DebateResult