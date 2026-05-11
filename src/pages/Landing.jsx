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

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, #0d1117 0%, #161b22 60%, #0d1117 100%)',
        padding: '90px 24px 80px',
        textAlign: 'center',
        borderBottom: '1px solid #21262d'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(45,212,191,0.08)',
            border: '1px solid rgba(45,212,191,0.2)',
            borderRadius: '20px', padding: '5px 14px',
            fontSize: '12px', color: '#2dd4bf',
            fontWeight: 500, marginBottom: '28px'
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2dd4bf' }} />
            Built with MERN Stack + Groq AI
          </div>

          <h1 style={{
            fontSize: '52px', fontWeight: 800,
            color: '#e6edf3', marginBottom: '20px',
            lineHeight: 1.15, letterSpacing: '-1px'
          }}>
            Think Clearer.<br />
            <span style={{ color: '#2dd4bf' }}>See Every Side.</span>
          </h1>

          <p style={{
            fontSize: '17px', color: '#8b949e',
            marginBottom: '16px', lineHeight: 1.7,
            maxWidth: '520px', margin: '0 auto 16px'
          }}>
            Most people form opinions without hearing both sides and make
            decisions without objective analysis. ThinkLens fixes that.
          </p>

          <p style={{
            fontSize: '14px', color: '#2dd4bf',
            marginBottom: '40px', fontStyle: 'italic'
          }}>
            "A clearer lens for every argument and decision."
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {user ? (
              <>
                <Link to="/debate/new" className="btn btn-primary"
                  style={{ fontSize: '15px', padding: '12px 28px' }}>
                  ⚔️ Start a Debate
                </Link>
                <Link to="/reality-check" style={{
                  fontSize: '15px', padding: '12px 28px',
                  borderRadius: '8px', fontWeight: 500,
                  border: '1px solid rgba(245,158,11,0.4)',
                  color: '#f59e0b', background: 'rgba(245,158,11,0.08)',
                  transition: 'all 0.2s', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: '8px'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,158,11,0.08)'}
                >
                  ⚖️ Reality Check
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary"
                  style={{ fontSize: '15px', padding: '12px 28px' }}>
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-outline"
                  style={{ fontSize: '15px', padding: '12px 28px' }}>
                  Login
                </Link>
              </>
            )}
            <Link to="/leaderboard" className="btn btn-outline"
              style={{ fontSize: '15px', padding: '12px 28px' }}>
              🏆 Leaderboard
            </Link>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div style={{
        background: '#010409',
        borderBottom: '1px solid #21262d',
        padding: '24px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '14px', color: '#8b949e', lineHeight: 1.8, maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ color: '#f85149', fontWeight: 500 }}>The problem: </span>
          Confirmation bias makes us seek only information that agrees with us.
          Emotional decisions cost us opportunities. We rarely hear the full picture.
          <span style={{ color: '#2dd4bf', fontWeight: 500 }}> ThinkLens changes that.</span>
        </p>
      </div>

      {/* Two Features Side by Side */}
      <div style={{ padding: '80px 24px', background: '#0d1117' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#e6edf3', marginBottom: '12px', letterSpacing: '-0.5px' }}>
              Two tools. One mission.
            </h2>
            <p style={{ color: '#656d76', fontSize: '15px', maxWidth: '460px', margin: '0 auto' }}>
              Whether it's a world topic or a personal decision — think before you conclude.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

            {/* Debate */}
            <div style={{
              background: '#161b22', border: '1px solid #30363d',
              borderRadius: '16px', padding: '36px 32px',
              position: 'relative', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              transition: 'border-color 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#2dd4bf'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#30363d'}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '3px', background: '#2dd4bf'
              }} />
              <div style={{
                width: '52px', height: '52px', borderRadius: '12px',
                background: 'rgba(45,212,191,0.1)',
                border: '1px solid rgba(45,212,191,0.2)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '24px',
                marginBottom: '20px'
              }}>⚔️</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#e6edf3', marginBottom: '6px' }}>
                AI Debate Arena
              </h3>
              <p style={{ fontSize: '12px', color: '#2dd4bf', fontWeight: 500, marginBottom: '14px' }}>
                for world topics & opinions
              </p>
              <p style={{ fontSize: '14px', color: '#656d76', lineHeight: 1.7, marginBottom: '24px', flex: 1 }}>
                Enter any topic — AI, climate, remote work. Watch two AI personas
                argue FOR and AGAINST in real time, word by word. AI judge gives
                a verdict. You vote.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
                {['Real-time SSE streaming', '3 tones — Formal · Casual · Savage', 'AI verdict after every debate', 'Vote + public leaderboard'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#2dd4bf', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: '#8b949e' }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to={user ? '/debate/new' : '/register'}
                className="btn btn-primary"
                style={{ justifyContent: 'center', padding: '12px', boxSizing: 'border-box' }}>
                Start a Debate →
              </Link>
            </div>

            {/* Reality */}
            <div style={{
              background: '#161b22', border: '1px solid #30363d',
              borderRadius: '16px', padding: '36px 32px',
              position: 'relative', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              transition: 'border-color 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#f59e0b'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#30363d'}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '3px', background: '#f59e0b'
              }} />
              <div style={{
                width: '52px', height: '52px', borderRadius: '12px',
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.2)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '24px',
                marginBottom: '20px'
              }}>⚖️</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#e6edf3', marginBottom: '6px' }}>
                AI Reality Checker
              </h3>
              <p style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 500, marginBottom: '14px' }}>
                for personal decisions & dilemmas
              </p>
              <p style={{ fontSize: '14px', color: '#656d76', lineHeight: 1.7, marginBottom: '24px', flex: 1 }}>
                Quit job? Move city? End relationship? Stop overthinking.
                Get a calm, completely unbiased AI breakdown — pros, cons,
                risks, neutral advice and a final verdict. Saved to history.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
                {['Pros & cons breakdown', 'Hidden risks analysis', 'Neutral advice — zero bias', 'Final verdict + saved history'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: '#8b949e' }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to={user ? '/reality-check' : '/register'} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '12px', borderRadius: '8px', fontSize: '14px',
                fontWeight: 500, border: '1px solid rgba(245,158,11,0.4)',
                color: '#f59e0b', background: 'rgba(245,158,11,0.08)',
                transition: 'all 0.2s', textDecoration: 'none',
                boxSizing: 'border-box'
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,158,11,0.08)'}
              >
                Check a Situation →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '1px solid #21262d', borderBottom: '1px solid #21262d',
        background: '#010409'
      }}>
        {[
          { num: '2', label: 'AI tools' },
          { num: '3', label: 'Debate tones' },
          { num: '5', label: 'Reality sections' },
          { num: '100%', label: 'Free to use' },
        ].map((s, i) => (
          <div key={s.label} style={{
            padding: '24px', textAlign: 'center',
            borderRight: i < 3 ? '1px solid #21262d' : 'none'
          }}>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#2dd4bf' }}>{s.num}</div>
            <div style={{ fontSize: '12px', color: '#656d76', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 700, marginBottom: '12px', color: '#e6edf3', letterSpacing: '-0.5px' }}>
          How it works
        </h2>
        <p style={{ textAlign: 'center', color: '#656d76', marginBottom: '48px', fontSize: '15px' }}>
          Simple to use. Powerful to experience.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {[
            { icon: '✏️', step: '01', title: 'Enter your topic', desc: 'Type any debate topic or describe a personal situation you need clarity on.' },
            { icon: '🤖', step: '02', title: 'AI works in real time', desc: 'Watch arguments stream word by word or get structured analysis instantly.' },
            { icon: '⚖️', step: '03', title: 'Get objective clarity', desc: 'AI verdict on debates. Pros, cons and risks for decisions.' },
            { icon: '💡', step: '04', title: 'Decide with confidence', desc: 'Walk away with a complete picture — not just one side of the story.' },
          ].map(item => (
            <div key={item.step} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.icon}</div>
              <div style={{ fontSize: '11px', color: '#2dd4bf', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '8px' }}>
                STEP {item.step}
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '10px', color: '#e6edf3' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', color: '#656d76', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Topics */}
      <div style={{ background: '#010409', padding: '64px 24px', borderTop: '1px solid #21262d', borderBottom: '1px solid #21262d' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '26px', fontWeight: 700, marginBottom: '10px', color: '#e6edf3' }}>
            Popular debate topics
          </h2>
          <p style={{ textAlign: 'center', color: '#656d76', marginBottom: '32px', fontSize: '14px' }}>
            Click any topic to start
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {topics.map(topic => (
              <Link key={topic} to={user ? '/debate/new' : '/register'}
                style={{
                  padding: '8px 18px', borderRadius: '20px',
                  border: '1px solid #30363d', fontSize: '13px',
                  color: '#8b949e', transition: 'all 0.2s', background: '#161b22'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#2dd4bf'; e.currentTarget.style.color = '#2dd4bf' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = '#8b949e' }}
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      {!user && (
        <div style={{ padding: '80px 24px', textAlign: 'center', background: '#0d1117' }}>
          <div style={{
            maxWidth: '560px', margin: '0 auto',
            background: 'rgba(45,212,191,0.04)',
            border: '1px solid rgba(45,212,191,0.15)',
            borderRadius: '16px', padding: '52px 32px'
          }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🔍</div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', color: '#e6edf3', letterSpacing: '-0.5px' }}>
              Ready to think clearer?
            </h2>
            <p style={{ color: '#656d76', marginBottom: '28px', fontSize: '15px', lineHeight: 1.7 }}>
              Free forever. No credit card. Two powerful AI tools waiting for you.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-primary"
                style={{ fontSize: '15px', padding: '12px 28px' }}>
                Get Started Free
              </Link>
              <Link to="/leaderboard" className="btn btn-outline"
                style={{ fontSize: '15px', padding: '12px 28px' }}>
                🏆 View Leaderboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Landing