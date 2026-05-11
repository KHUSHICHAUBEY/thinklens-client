import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const SECTION_CONFIG = {
  "PROS": { icon: "✅", color: "#22c55e", bg: "rgba(34,197,94,0.06)", border: "rgba(34,197,94,0.2)" },
  "CONS": { icon: "❌", color: "#ef4444", bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.2)" },
  "RISKS": { icon: "⚠️", color: "#f59e0b", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.2)" },
  "NEUTRAL ADVICE": { icon: "🧠", color: "#0ea5e9", bg: "rgba(14,165,233,0.06)", border: "rgba(14,165,233,0.2)" },
  "VERDICT": { icon: "⚖️", color: "#a78bfa", bg: "rgba(167,139,250,0.06)", border: "rgba(167,139,250,0.2)" },
}

const SECTIONS = ["PROS", "CONS", "RISKS", "NEUTRAL ADVICE", "VERDICT"]

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

const RealityHistory = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [loadingDetail, setLoadingDetail] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:5000/api/reality/history', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setHistory(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [token])

  const handleView = async (id) => {
    setLoadingDetail(true)
    try {
      const res = await axios.get(`http://localhost:5000/api/reality/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSelected(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingDetail(false)
    }
  }

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)',
            borderRadius: '20px', padding: '5px 14px',
            fontSize: '12px', color: '#a78bfa', fontWeight: 500, marginBottom: '16px'
          }}>
            ⚖️ Reality Check History
          </div>
          <h1 className="page-title">My Reality Checks</h1>
          <p className="page-subtitle">All your past situation analyses in one place</p>
          <Link to="/reality-check" className="btn btn-primary" style={{ padding: '10px 22px' }}>
            ⚖️ New Reality Check
          </Link>
        </div>

        {loading ? (
          <p style={{ color: '#94a3b8' }}>Loading...</p>
        ) : history.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '56px' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚖️</div>
            <p style={{ color: '#94a3b8', marginBottom: '20px' }}>No reality checks yet!</p>
            <Link to="/reality-check" className="btn btn-primary">Check a Situation</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.6fr' : '1fr', gap: '20px' }}>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {history.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleView(item._id)}
                  className="card"
                  style={{
                    cursor: 'pointer', transition: 'all 0.2s',
                    borderColor: selected?._id === item._id ? '#a78bfa' : '#1e3a5f',
                    background: selected?._id === item._id ? 'rgba(167,139,250,0.06)' : '#0d1f38'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#a78bfa'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = selected?._id === item._id ? '#a78bfa' : '#1e3a5f'}
                >
                  <p style={{ fontWeight: 500, fontSize: '14px', color: '#e2e8f0', marginBottom: '8px', lineHeight: 1.5 }}>
                    "{item.situation}"
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#475569' }}>
                      {new Date(item.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </span>
                    <span style={{ fontSize: '12px', color: '#a78bfa' }}>View →</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Detail View */}
            {selected && (
              <div>
                {loadingDetail ? (
                  <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                    <p style={{ color: '#94a3b8' }}>Loading analysis...</p>
                  </div>
                ) : (
                  <div>
                    <div style={{
                      background: 'rgba(167,139,250,0.06)',
                      border: '1px solid rgba(167,139,250,0.2)',
                      borderRadius: '10px', padding: '14px 18px', marginBottom: '16px'
                    }}>
                      <p style={{ fontSize: '12px', color: '#a78bfa', fontWeight: 500, marginBottom: '4px' }}>SITUATION</p>
                      <p style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: 1.5 }}>"{selected.situation}"</p>
                      <p style={{ fontSize: '11px', color: '#475569', marginTop: '8px' }}>
                        {new Date(selected.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </p>
                    </div>

                    {SECTIONS.map(section => {
                      const config = SECTION_CONFIG[section]
                      const parsed = parseResponse(selected.result)
                      const content = parsed[section]
                      if (!content) return null
                      return (
                        <div key={section} style={{
                          background: config.bg,
                          border: `1px solid ${config.border}`,
                          borderRadius: '10px', padding: '14px 18px',
                          marginBottom: '10px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span>{config.icon}</span>
                            <span style={{ fontSize: '11px', fontWeight: 600, color: config.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                              {section}
                            </span>
                          </div>
                          <div style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.7 }}>
                            {content.split('\n').map((line, i) => {
                              const cleaned = line.replace(/^[-•]\s*/, '').trim()
                              if (!cleaned) return null
                              const isBullet = line.trim().startsWith('-') || line.trim().startsWith('•')
                              return (
                                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '4px', alignItems: 'flex-start' }}>
                                  {isBullet && <span style={{ color: config.color, marginTop: '5px', fontSize: '8px', flexShrink: 0 }}>●</span>}
                                  <span>{cleaned}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}

                    <button
                      onClick={() => setSelected(null)}
                      className="btn btn-outline"
                      style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default RealityHistory