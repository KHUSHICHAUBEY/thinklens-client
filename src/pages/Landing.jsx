import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const topics = [
  "AI will replace human jobs",
  "Social media does more harm than good",
  "Remote work is better than office work",
  "Cryptocurrency is the future of money",
  "Space exploration is worth the cost",
  "Online education is better than traditional"
]

const Landing = () => {
  const { user } = useAuth()

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(160deg, #0a1628 0%, #0f2044 60%, #0a1e38 100%)',
        padding: '80px 24px',
        textAlign: 'center',
        borderBottom: '1px solid #1e3a5f'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)',
            borderRadius: '20px', padding: '5px 14px',
            fontSize: '12px', color: '#38bdf8', fontWeight: 500, marginBottom: '24px'
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0ea5e9' }} />
            Built with MERN Stack + Groq AI
          </div>
          <h1 style={{
            fontSize: '52px', fontWeight: 800,
            color: '#f1f5f9',
            marginBottom: '20px', lineHeight: 1.2
          }}>
            See Both Sides.<br />
            <span style={{ color: '#0ea5e9' }}>Decide with Clarity.</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '36px', lineHeight: 1.7 }}>
            Enter any topic. Watch two AI personas debate it in real-time.
            Vote for the winner. Save and share epic debates.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {user ? (
            <>
                <Link to="/debate/new" className="btn btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
                ⚔️ Start a Debate
                </Link>
                <Link to="/reality-check"
                style={{
                    fontSize: '16px', padding: '14px 32px',
                    borderRadius: '8px', fontWeight: 500,
                    border: '1px solid rgba(167,139,250,0.4)',
                    color: '#a78bfa', background: 'rgba(167,139,250,0.08)',
                    transition: 'all 0.2s', textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: '8px'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.18)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.08)' }}
                >
                ⚖️ Reality Check
                </Link>
            </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-outline" style={{ fontSize: '16px', padding: '14px 32px' }}>
                  Login
                </Link>
              </>
            )}
            <Link to="/leaderboard" className="btn btn-outline" style={{ fontSize: '16px', padding: '14px 32px' }}>
              🏆 Leaderboard
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        borderBottom: '1px solid #1e3a5f', background: '#061220'
      }}>
        {[
          { num: '3', label: 'Debate rounds' },
          { num: '3', label: 'Tone styles' },
          { num: '100%', label: 'Free to use' },
        ].map(s => (
          <div key={s.label} style={{ padding: '20px', textAlign: 'center', borderRight: '1px solid #1e3a5f' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0ea5e9' }}>{s.num}</div>
            <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Two Core Features Section */}
      <div style={{ background: '#061220', padding: '72px 24px', borderBottom: '1px solid #1e3a5f' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px', color: '#e2e8f0' }}>
              What KlarityAI does
            </h2>
            <p style={{ color: '#64748b', fontSize: '15px' }}>
              Built to help you think clearer — whether it's a debate or a life decision
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

            {/* Debate Arena Card */}
            <div style={{
              background: '#0a1628', border: '1px solid #1e3a5f',
              borderRadius: '16px', padding: '32px', position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '3px', background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)'
              }} />
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', marginBottom: '20px'
              }}>⚔️</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#e2e8f0', marginBottom: '12px' }}>
               KlarityAI
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, marginBottom: '24px' }}>
                Enter any topic and watch two AI personas battle it out in real-time.
                FOR vs AGAINST — 3 rounds each, streamed word by word.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {[
                  'Real-time streaming arguments',
                  'Formal, Casual or Savage tone',
                  '3 rounds per side',
                  'Vote + share results',
                ].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%',
                      background: 'rgba(14,165,233,0.15)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0ea5e9' }} />
                    </div>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link
                to={user ? '/debate/new' : '/register'}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', boxSizing: 'border-box' }}
              >
                Start a Debate →
              </Link>
            </div>

            {/* Reality Checker Card */}
            <div style={{
              background: '#0a1628', border: '1px solid #1e3a5f',
              borderRadius: '16px', padding: '32px', position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '3px', background: 'linear-gradient(90deg, #a78bfa, #7c3aed)'
              }} />
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', marginBottom: '20px'
              }}>⚖️</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#e2e8f0', marginBottom: '12px' }}>
                AI Reality Checker
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, marginBottom: '24px' }}>
                Overthinking a big decision? Get a calm, completely unbiased AI
                breakdown — pros, cons, risks and honest advice. No fluff.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {[
                  'Pros & cons breakdown',
                  'Hidden risks you may have missed',
                  'Neutral advice — no bias',
                  'Final verdict to guide your decision',
                ].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%',
                      background: 'rgba(167,139,250,0.15)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a78bfa' }} />
                    </div>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link
                to={user ? '/reality-check' : '/register'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '12px', borderRadius: '8px', fontSize: '14px',
                  fontWeight: 500, border: '1px solid rgba(167,139,250,0.4)',
                  color: '#a78bfa', background: 'rgba(167,139,250,0.08)',
                  transition: 'all 0.2s', textDecoration: 'none',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.08)' }}
              >
                Check a Situation →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: '72px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 700, marginBottom: '48px', color: '#e2e8f0' }}>
          How it works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {[
            { icon: '✏️', step: '01', title: 'Enter a Topic', desc: 'Type any debate topic. Choose tone — Formal, Casual, or Savage.' },
            { icon: '🤖', step: '02', title: 'AI Debates Live', desc: 'Two AI personas argue FOR and AGAINST in real-time, word by word.' },
            { icon: '🗳️', step: '03', title: 'Vote & Share', desc: 'Vote for the side that convinced you. Share the debate link.' },
            { icon: '🏆', step: '04', title: 'Leaderboard', desc: 'Most voted debates appear on the leaderboard for everyone to see.' },
          ].map((item) => (
            <div key={item.step} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
              <div style={{ fontSize: '11px', color: '#0ea5e9', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '8px' }}>
                STEP {item.step}
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '10px', color: '#e2e8f0' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Debate Tones */}
      <div style={{ background: '#0d1f38', padding: '72px 24px', borderTop: '1px solid #1e3a5f', borderBottom: '1px solid #1e3a5f' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 700, marginBottom: '12px', color: '#e2e8f0' }}>
            Choose your battle tone
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '48px' }}>
            The same topic debates very differently depending on the tone
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { tone: 'Formal', emoji: '🎩', badge: 'badge-formal', desc: 'Professional, structured arguments with strong logical reasoning. Best for academic or serious topics.' },
              { tone: 'Casual', emoji: '😎', badge: 'badge-casual', desc: 'Friendly, easy-to-understand language. Like debating with a smart friend over coffee.' },
              { tone: 'Savage', emoji: '🔥', badge: 'badge-savage', desc: 'Sharp, witty, brutal comebacks. No holds barred. The most entertaining debates live here.' },
            ].map((item) => (
              <div key={item.tone} className="card">
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.emoji}</div>
                <span className={`badge ${item.badge}`} style={{ marginBottom: '12px', display: 'inline-block' }}>{item.tone}</span>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sample Topics */}
      <div style={{ padding: '72px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 700, marginBottom: '12px', color: '#e2e8f0' }}>
          Popular debate topics
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px' }}>
          Click any topic to start debating
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          {topics.map((topic) => (
            <Link
              key={topic}
              to={user ? '/debate/new' : '/register'}
              style={{
                padding: '10px 20px', borderRadius: '25px',
                border: '1px solid #1e3a5f', fontSize: '14px',
                color: '#94a3b8', transition: 'all 0.2s',
                background: '#0d1f38'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#0ea5e9'; e.currentTarget.style.color = '#0ea5e9' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e3a5f'; e.currentTarget.style.color = '#94a3b8' }}
            >
              {topic}
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      {!user && (
        <div style={{
          background: 'rgba(14,165,233,0.05)',
          border: '1px solid rgba(14,165,233,0.2)',
          margin: '0 24px 72px',
          borderRadius: '16px',
          padding: '56px 24px',
          textAlign: 'center',
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#e2e8f0' }}>
            Ready to think clearer?
          </h2>
          <p style={{ color: '#64748b', marginBottom: '28px', fontSize: '16px' }}>
            Free to use. No credit card. Just great debates.
          </p>
          <Link to="/register" className="btn btn-primary" style={{ fontSize: '16px', padding: '14px 36px' }}>
            Create Free Account
          </Link>
        </div>
      )}
    </div>
  )
}

export default Landing