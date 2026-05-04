import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const suggestions = [
  "AI will replace human jobs",
  "Social media does more harm than good",
  "Remote work is better than office work",
  "Cryptocurrency is the future of money",
  "Climate change is the biggest threat",
  "Online education is better than traditional",
  "Space exploration is worth the cost",
  "Veganism is better for the planet"
]

const NewDebate = () => {
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('formal')
  const { token } = useAuth()
  const navigate = useNavigate()

  const handleStart = () => {
    if (!topic.trim()) return
    navigate('/debate/new/live', { state: { topic: topic.trim(), tone, token } })
  }

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: '680px' }}>
        <h1 className="page-title">⚔️ New Debate</h1>
        <p className="page-subtitle">Enter a topic and let the AI battle it out</p>

        <div className="card" style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#94a3b8', marginBottom: '10px' }}>
            DEBATE TOPIC
          </label>
          <input
            type="text"
            placeholder="e.g. Social media does more harm than good"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            style={{
              width: '100%', padding: '14px 16px',
              background: '#0f0f1a', border: '1px solid #2a2a4a',
              borderRadius: '10px', color: '#e2e8f0',
              fontSize: '15px', boxSizing: 'border-box',
              marginBottom: '24px'
            }}
          />

          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#94a3b8', marginBottom: '12px' }}>
            DEBATE TONE
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '28px' }}>
            {[
              { value: 'formal', emoji: '🎩', label: 'Formal', desc: 'Professional & structured' },
              { value: 'casual', emoji: '😎', label: 'Casual', desc: 'Friendly & relatable' },
              { value: 'savage', emoji: '🔥', label: 'Savage', desc: 'Sharp & brutal' },
            ].map((t) => (
              <div
                key={t.value}
                onClick={() => setTone(t.value)}
                style={{
                  padding: '16px 12px', borderRadius: '10px', textAlign: 'center',
                  border: `2px solid ${tone === t.value ? '#6c63ff' : '#2a2a4a'}`,
                  background: tone === t.value ? '#6c63ff11' : '#0f0f1a',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{t.emoji}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{t.label}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{t.desc}</div>
              </div>
            ))}
          </div>

          <button
            onClick={handleStart}
            disabled={!topic.trim()}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '15px', justifyContent: 'center', opacity: topic.trim() ? 1 : 0.5 }}
          >
            ⚔️ Start Debate
          </button>
        </div>

        {/* Suggestions */}
        <div>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>💡 Try one of these topics:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setTopic(s)}
                style={{
                  padding: '7px 14px', borderRadius: '20px', fontSize: '13px',
                  background: '#1a1a2e', border: '1px solid #2a2a4a',
                  color: '#94a3b8', cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.target.style.borderColor = '#6c63ff'; e.target.style.color = '#6c63ff' }}
                onMouseLeave={e => { e.target.style.borderColor = '#2a2a4a'; e.target.style.color = '#94a3b8' }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewDebate