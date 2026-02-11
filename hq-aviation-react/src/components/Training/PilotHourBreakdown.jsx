import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-087
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const PilotHourBreakdown = ({ showNote = true }) => {
  const breakdown = [
    { label: 'Dual Instruction', hours: 35, color: 'var(--hq-accent)' },
    { label: 'Solo Flight', hours: 10, color: '#3B82F6' },
    { label: 'Cross-Country', hours: 5, color: '#22C55E' },
    { label: 'Solo Cross-Country', hours: 5, color: '#8B5CF6' }
  ];

  const totalHours = breakdown.reduce((sum, item) => sum + item.hours, 0);

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="hq-section-header">
            <span className="hq-overline hq-overline--accent">PPL(H) Requirements</span>
            <h2 className="hq-section-title">Minimum {totalHours} Flight Hours</h2>
          </div>

          {/* Visual Bar */}
          <div style={{
            display: 'flex',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            marginBottom: '2rem'
          }}>
            {breakdown.map((item, index) => (
              <div key={index} style={{
                width: `${(item.hours / totalHours) * 100}%`,
                background: item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                {item.hours}h
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem'
          }}>
            {breakdown.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: 'var(--hq-hover-bg)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: item.color,
                  borderRadius: '4px',
                  flexShrink: 0
                }}></div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600 }}>{item.label}</span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  fontWeight: 700
                }}>{item.hours}h</span>
              </div>
            ))}
          </div>

          <p style={{
            textAlign: 'center',
            color: 'var(--hq-muted)',
            fontSize: '0.85rem',
            marginTop: '1.5rem'
          }}>
            Most students complete training in 50-60 hours on average
          </p>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="approved"
          feedback="Good graphic for the PPL explanation"
        />
      )}
    </>
  );
};

export default PilotHourBreakdown;
