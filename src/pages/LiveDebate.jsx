import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DebateMessage from '../components/debate/DebateMessage'

const LiveDebate = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { topic, tone, token } = location.state || {}
  const [messages, setMessages] = useState([])
  const [currentSide, setCurrentSide] = useState(null)
  const [currentRound, setCurrentRound] = useState(1)
  const [streamingText, setStreamingText] = useState('')
  const [debateId, setDebateId] = useState(null)
  const [status, setStatus] = useState('connecting')
  const bottomRef = useRef(null)
  const [verdict, setVerdict] = useState('')
  const [verdictDone, setVerdictDone] = useState(false)

  useEffect(() => {
    if (!topic || !token) { navigate('/debate/new'); return }
    startDebate()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  const startDebate = async () => {
    setStatus('streaming')
    try {
      const response = await fetch('http://localhost:5000/api/debate/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ topic, tone }),
      })

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let currentContent = ''
      let activeSide = null
      let activeRound = 1

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '))

        for (const line of lines) {
          try {
            const data = JSON.parse(line.replace('data: ', ''))

            if (data.type === 'debate_id') {
              setDebateId(data.debateId)
            }

            if (data.type === 'turn_start') {
              if (currentContent && activeSide) {
                setMessages(prev => [...prev, { side: activeSide, round: activeRound, content: currentContent }])
                currentContent = ''
                setStreamingText('')
              }
              activeSide = data.side
              activeRound = data.round
              setCurrentSide(data.side)
              setCurrentRound(data.round)
            }

            if (data.type === 'token') {
              currentContent += data.token
              setStreamingText(prev => prev + data.token)
            }

            if (data.type === 'turn_end') {
              setMessages(prev => [...prev, { side: activeSide, round: activeRound, content: currentContent }])
              currentContent = ''
              setStreamingText('')
            }

            if (data.type === 'debate_complete') {
              setStatus('complete')
              setTimeout(() => navigate(`/debate/${data.debateId}/result`), 1500)
            }

            if (data.type === 'verdict_start') {
            setStatus('verdict')
            }

            if (data.type === 'verdict_token') {
            setVerdict(prev => prev + data.token)
            }

            if (data.type === 'error') {
              setStatus('error')
            }
          } catch (e) { }
        }
      }
    } catch (err) {
      setStatus('error')
    }
  }

  const totalRounds = 3

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div className="card" style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>"{topic}"</h1>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
            <span className={`badge badge-${tone}`}>{tone}</span>
            {status === 'streaming' && (
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                Round {currentRound} of {totalRounds} — <span style={{ color: currentSide === 'FOR' ? '#22c55e' : '#ef4444' }}>{currentSide} is arguing</span>
              </span>
            )}
{status === 'verdict' && <span style={{ fontSize: '13px', color: '#a78bfa' }}>⚖️ AI is analyzing the debate...</span>}
{status === 'complete' && <span style={{ fontSize: '13px', color: '#22c55e' }}>✅ Debate Complete! Redirecting...</span>}          </div>

          {/* Progress */}
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '16px' }}>
            {Array.from({ length: totalRounds }).map((_, i) => (
              <div key={i} style={{
                height: '4px', width: '60px', borderRadius: '2px',
                background: i + 1 < currentRound ? '#6c63ff' : i + 1 === currentRound ? '#a78bfa' : '#2a2a4a'
              }} />
            ))}
          </div>
        </div>

        {/* Two Column Labels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(34,197,94,0.1)', borderRadius: '8px', border: '1px solid rgba(34,197,94,0.2)' }}>
            <span style={{ color: '#22c55e', fontWeight: 600, fontSize: '14px' }}>✅ FOR</span>
          </div>
          <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)' }}>
            <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '14px' }}>❌ AGAINST</span>
          </div>
        </div>

        {/* Messages */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            {messages.filter(m => m.side === 'FOR').map((msg, i) => (
              <DebateMessage key={i} side={msg.side} round={msg.round} content={msg.content} isStreaming={false} />
            ))}
            {currentSide === 'FOR' && streamingText && (
              <DebateMessage side="FOR" round={currentRound} content={streamingText} isStreaming={true} />
            )}
          </div>
          <div>
            {messages.filter(m => m.side === 'AGAINST').map((msg, i) => (
              <DebateMessage key={i} side={msg.side} round={msg.round} content={msg.content} isStreaming={false} />
            ))}
            {currentSide === 'AGAINST' && streamingText && (
              <DebateMessage side="AGAINST" round={currentRound} content={streamingText} isStreaming={true} />
            )}
          </div>
        </div>

        <div ref={bottomRef} />

        {/* AI Verdict */}
{(status === 'verdict' || verdict) && (
  <div style={{
    background: 'rgba(167,139,250,0.06)',
    border: '1px solid rgba(167,139,250,0.3)',
    borderRadius: '12px', padding: '20px 24px',
    marginTop: '24px'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
      <span style={{ fontSize: '20px' }}>⚖️</span>
      <span style={{ fontSize: '13px', fontWeight: 600, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        AI Verdict
      </span>
      {status === 'verdict' && (
        <span style={{ fontSize: '11px', color: '#64748b' }}>analyzing...</span>
      )}
    </div>
    <p style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: 1.7 }}>
      {verdict}
      {status === 'verdict' && (
        <span style={{ display: 'inline-block', width: '2px', height: '14px', background: '#a78bfa', marginLeft: '2px', verticalAlign: 'middle' }} />
      )}
    </p>
  </div>
)}

        {status === 'error' && (
          <div className="card" style={{ textAlign: 'center', borderColor: '#ef4444', marginTop: '24px' }}>
            <p style={{ color: '#ef4444', marginBottom: '16px' }}>Something went wrong. Please try again.</p>
            <button onClick={() => navigate('/debate/new')} className="btn btn-primary">Try Again</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LiveDebate