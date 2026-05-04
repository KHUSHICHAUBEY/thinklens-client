import { useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const EXAMPLE_SITUATIONS = [
  "Should I quit my job and start my own business?",
  "Should I move to a new city for a better opportunity?",
  "Should I end a long-term relationship that feels stagnant?",
  "Should I take a loan to invest in cryptocurrency?",
  "Should I drop out of college to pursue my passion?",
  "Should I confront my manager about unfair treatment?",
]

const SECTIONS = ["PROS", "CONS", "RISKS", "NEUTRAL ADVICE", "VERDICT"]

const SECTION_CONFIG = {
  "PROS": { icon: "✅", color: "#22c55e", bg: "rgba(34,197,94,0.06)", border: "rgba(34,197,94,0.2)" },
  "CONS": { icon: "❌", color: "#ef4444", bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.2)" },
  "RISKS": { icon: "⚠️", color: "#f59e0b", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.2)" },
  "NEUTRAL ADVICE": { icon: "🧠", color: "#0ea5e9", bg: "rgba(14,165,233,0.06)", border: "rgba(14,165,233,0.2)" },
  "VERDICT": { icon: "⚖️", color: "#a78bfa", bg: "rgba(167,139,250,0.06)", border: "rgba(167,139,250,0.2)" },
}

const parseResponse = (text) => {
  const result = {}
  const lines = text.split('\n')
  let currentSection = null
  let currentContent = []

  for (const line of lines) {
    const trimmed = line.trim()
    const matchedSection = SECTIONS.find(s => trimmed.startsWith(s + ':') || trimmed === s + ':')
    if (matchedSection) {
      if (currentSection) result[currentSection] = currentContent.join('\n').trim()
      currentSection = matchedSection
      currentContent = []
      const inline = trimmed.replace(matchedSection + ':', '').trim()
      if (inline) currentContent.push(inline)
    } else if (currentSection && trimmed) {
      currentContent.push(trimmed)
    }
  }
  if (currentSection) result[currentSection] = currentContent.join('\n').trim()
  return result
}

const RealityChecker = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [situation, setSituation] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [rawText, setRawText] = useState('')
  const [done, setDone] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const bottomRef = useRef(null)

  const MAX_CHARS = 300

  const handleSituationChange = (e) => {
    const val = e.target.value
    if (val.length <= MAX_CHARS) {
      setSituation(val)
      setCharCount(val.length)
    }
  }

  const handleCheck = async () => {
    if (!situation.trim() || streaming) return
    setStreaming(true)
    setRawText('')
    setDone(false)

    try {
      const response = await fetch('http://localhost:5000/api/reality/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ situation })
      })

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done: streamDone, value } = await reader.read()
        if (streamDone) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '))

        for (const line of lines) {
          try {
            const data = JSON.parse(line.replace('data: ', ''))
            if (data.token) {
              setRawText(prev => {
                const updated = prev + data.token
                return updated
              })
              bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
            }
            if (data.done) setDone(true)
            if (data.error) setDone(true)
          } catch (e) { }
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setStreaming(false)
      setDone(true)
    }
  }

  const handleReset = () => {
    setSituation('')
    setRawText('')
    setDone(false)
    setCharCount(0)
  }

  const parsed = parseResponse(rawText)

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: '760px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)',
            borderRadius: '20px', padding: '5px 14px',
            fontSize: '12px', color: '#38bdf8', fontWeight: 500, marginBottom: '16px'
          }}>
            ⚖️ AI Reality Checker
          </div>
          <h1 className="page-title">Get an Objective View</h1>
          <p className="page-subtitle">
            Overthinking a decision? Write your situation and get a calm,
            unbiased AI analysis — pros, cons, risks, and honest advice.
          </p>
        </div>

        {/* Input Card */}
        {!streaming && !rawText && (
          <div className="card" style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block', fontSize: '12px', fontWeight: 500,
              color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Your Situation
            </label>
            <textarea
              placeholder="e.g. Should I quit my job and start my own business? I have 6 months of savings and a solid idea but no clients yet..."
              value={situation}
              onChange={handleSituationChange}
              rows={5}
              style={{
                width: '100%', padding: '14px 16px',
                background: '#061220', border: '1px solid #1e3a5f',
                borderRadius: '10px', color: '#e2e8f0', fontSize: '14px',
                boxSizing: 'border-box', resize: 'vertical',
                lineHeight: 1.6, marginBottom: '8px'
              }}
            />
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '20px'
            }}>
              <span style={{
                fontSize: '12px',
                color: charCount > MAX_CHARS * 0.85 ? '#f59e0b' : '#475569'
              }}>
                {charCount}/{MAX_CHARS} characters
              </span>
              <span style={{ fontSize: '12px', color: '#475569' }}>
                Be specific for better results
              </span>
            </div>

            <button
              onClick={handleCheck}
              disabled={!situation.trim()}
              className="btn btn-primary"
              style={{
                width: '100%', padding: '13px',
                fontSize: '15px', justifyContent: 'center',
                opacity: situation.trim() ? 1 : 0.5
              }}
            >
              ⚖️ Analyze My Situation
            </button>

            {/* Examples */}
            <div style={{ marginTop: '24px' }}>
              <p style={{ fontSize: '12px', color: '#475569', marginBottom: '10px' }}>
                Try an example:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {EXAMPLE_SITUATIONS.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => { setSituation(ex); setCharCount(ex.length) }}
                    style={{
                      padding: '6px 12px', borderRadius: '20px', fontSize: '12px',
                      background: '#0d1f38', border: '1px solid #1e3a5f',
                      color: '#94a3b8', cursor: 'pointer', transition: 'all 0.2s',
                      textAlign: 'left'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#0ea5e9'; e.currentTarget.style.color = '#0ea5e9' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e3a5f'; e.currentTarget.style.color = '#94a3b8' }}
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Streaming / Result */}
        {(streaming || rawText) && (
          <div>
            {/* Situation recap */}
            <div style={{
              background: 'rgba(14,165,233,0.06)',
              border: '1px solid rgba(14,165,233,0.2)',
              borderRadius: '10px', padding: '14px 18px',
              marginBottom: '20px'
            }}>
              <p style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 500, marginBottom: '4px' }}>
                ANALYZING
              </p>
              <p style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: 1.5 }}>
                "{situation}"
              </p>
            </div>

            {/* Streaming indicator */}
            {streaming && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '20px', color: '#94a3b8', fontSize: '13px'
              }}>
                <div style={{
                  display: 'flex', gap: '4px', alignItems: 'center'
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: '#0ea5e9',
                      animation: `pulse 1.2s ${i * 0.2}s infinite`
                    }} />
                  ))}
                </div>
                AI is analyzing your situation...
              </div>
            )}

            {/* Parsed sections */}
            {SECTIONS.map(section => {
              const config = SECTION_CONFIG[section]
              const content = parsed[section]
              if (!content) return null

              return (
                <div key={section} style={{
                  background: config.bg,
                  border: `1px solid ${config.border}`,
                  borderRadius: '12px', padding: '18px 20px',
                  marginBottom: '14px'
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    marginBottom: '12px'
                  }}>
                    <span style={{ fontSize: '16px' }}>{config.icon}</span>
                    <span style={{
                      fontSize: '12px', fontWeight: 600,
                      color: config.color, textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}>
                      {section}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: 1.7 }}>
                    {content.split('\n').map((line, i) => {
                      const cleaned = line.replace(/^[-•]\s*/, '').trim()
                      if (!cleaned) return null
                      const isBullet = line.trim().startsWith('-') || line.trim().startsWith('•')
                      return (
                        <div key={i} style={{
                          display: 'flex', gap: '10px',
                          marginBottom: '6px', alignItems: 'flex-start'
                        }}>
                          {isBullet && (
                            <span style={{
                              color: config.color, marginTop: '5px',
                              fontSize: '8px', flexShrink: 0
                            }}>●</span>
                          )}
                          <span>{cleaned}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Raw streaming text while not yet parsed into sections */}
            {streaming && Object.keys(parsed).length === 0 && (
              <div className="card">
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.7 }}>
                  {rawText}
                  <span style={{
                    display: 'inline-block', width: '2px', height: '14px',
                    background: '#0ea5e9', marginLeft: '2px',
                    verticalAlign: 'middle', animation: 'blink 1s infinite'
                  }} />
                </p>
              </div>
            )}

            <div ref={bottomRef} />

            {/* Actions after done */}
            {done && (
              <div style={{
                display: 'flex', gap: '12px', marginTop: '24px',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={handleReset}
                  className="btn btn-primary"
                  style={{ flex: 1, justifyContent: 'center', padding: '12px' }}
                >
                  ⚖️ Check Another Situation
                </button>
                <button
                  onClick={() => navigate('/debate/new')}
                  className="btn btn-outline"
                  style={{ flex: 1, justifyContent: 'center', padding: '12px' }}
                >
                  ⚔️ Start a Debate Instead
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default RealityChecker