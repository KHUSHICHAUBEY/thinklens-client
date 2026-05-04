const Footer = () => (
  <footer style={{
    borderTop: '1px solid #1e3a5f',
    padding: '28px 24px',
    textAlign: 'center',
    background: '#061220'
  }}>
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', gap: '8px', marginBottom: '8px'
    }}>
      <div style={{
        width: '24px', height: '24px',
        background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
        borderRadius: '6px', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontSize: '11px', fontWeight: 700, color: 'white'
      }}>
        K
      </div>
      <span style={{ fontWeight: 600, fontSize: '14px', color: '#e2e8f0' }}>
        Klarity<span style={{ color: '#0ea5e9' }}>AI</span>
      </span>
    </div>
    <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px', fontStyle: 'italic' }}>
      "See both sides. Decide with clarity."
    </p>
    <p style={{ fontSize: '12px', color: '#475569', marginTop: '8px' }}>
      Built with MongoDB · Express · React · Node.js · Groq AI
    </p>
  </footer>
)

export default Footer