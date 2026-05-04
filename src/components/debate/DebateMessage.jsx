const DebateMessage = ({ side, round, content, isStreaming }) => {
  const isFor = side === 'FOR'

  return (
    <div style={{
      background: isFor ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)',
      border: `1px solid ${isFor ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
      borderRadius: '10px',
      padding: '16px',
      marginBottom: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <span style={{ fontSize: '18px' }}>{isFor ? '✅' : '❌'}</span>
        <span style={{
          fontSize: '12px', fontWeight: 600,
          color: isFor ? '#22c55e' : '#ef4444',
          textTransform: 'uppercase', letterSpacing: '0.05em'
        }}>
          {side} — Round {round}
        </span>
        {isStreaming && (
          <span style={{
            fontSize: '11px', color: '#94a3b8',
            animation: 'pulse 1s infinite'
          }}>typing...</span>
        )}
      </div>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#e2e8f0' }}>
        {content}
        {isStreaming && <span style={{ color: '#6c63ff', fontWeight: 700 }}>|</span>}
      </p>
    </div>
  )
}

export default DebateMessage