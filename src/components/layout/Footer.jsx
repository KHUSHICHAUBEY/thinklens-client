const Footer = () => (
  <footer style={{
    borderTop: '1px solid #21262d',
    padding: '24px',
    textAlign: 'center',
    background: '#0d1117'
  }}>
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', gap: '8px', marginBottom: '8px'
    }}>
      <div style={{
        width: '22px', height: '22px',
        background: '#2dd4bf', borderRadius: '6px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '10px',
        fontWeight: 700, color: '#0d1117'
      }}>
        TL
      </div>
      <span style={{ fontWeight: 600, fontSize: '14px', color: '#e6edf3' }}>
        Think<span style={{ color: '#2dd4bf' }}>Lens</span>
      </span>
    </div>
    <p style={{ fontSize: '13px', color: '#8b949e', marginBottom: '4px', fontStyle: 'italic' }}>
      "A clearer lens for every argument and decision."
    </p>
    <p style={{ fontSize: '12px', color: '#656d76', marginTop: '8px' }}>
      Built with MongoDB · Express · React · Node.js · Groq AI
    </p>
  </footer>
)

export default Footer