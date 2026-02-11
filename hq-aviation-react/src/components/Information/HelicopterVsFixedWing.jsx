import React from 'react';

const ComponentNote = ({ status, feedback, note }) => {
  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-102
      </div>
      <p className="component-note__text">{feedback}</p>
      {note && (
        <p className="component-note__text" style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
          Note: {note}
        </p>
      )}
    </div>
  );
};

const HelicopterVsFixedWing = ({ showNote = true }) => {
  const comparisons = [
    { feature: 'Landing Sites', helicopter: '2,000+ heliports & fields', fixedWing: 'Limited to airports' },
    { feature: 'Door-to-Door', helicopter: 'Yes - land at destination', fixedWing: 'Requires ground transport' },
    { feature: 'Hover Capability', helicopter: 'Yes', fixedWing: 'No' },
    { feature: 'Runway Required', helicopter: 'No', fixedWing: 'Yes' },
    { feature: 'Low-Speed Flight', helicopter: 'Full control at any speed', fixedWing: 'Stall risk below Vmin' },
    { feature: 'Urban Access', helicopter: 'Central city heliports', fixedWing: 'Distant airports only' },
    { feature: 'Scenic Flight', helicopter: 'Slow, low, manoeuvrable', fixedWing: 'Limited view angles' },
    { feature: 'Range', helicopter: '200-400nm typical', fixedWing: '500-1000nm typical' },
    { feature: 'Speed', helicopter: '100-150 kts', fixedWing: '150-250 kts' },
    { feature: 'Operating Costs', helicopter: 'Higher per hour', fixedWing: 'Lower per hour' }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: 'var(--hq-background)' }}>
        <div className="hq-container">
          <div className="hq-section-header">
            <span className="hq-overline hq-overline--accent">Comparison</span>
            <h2 className="hq-section-title">Helicopter vs Fixed Wing</h2>
            <p className="hq-section-subtitle">Why choose a helicopter? Here's how they compare.</p>
          </div>

          <div style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-light)'
          }}>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              background: 'var(--hq-primary)',
              color: '#fff',
              padding: '1rem 1.5rem'
            }}>
              <span style={{ fontWeight: 600 }}>Feature</span>
              <span style={{ fontWeight: 600, textAlign: 'center' }}>
                <i className="fas fa-helicopter" style={{ marginRight: '0.5rem' }}></i>
                Helicopter
              </span>
              <span style={{ fontWeight: 600, textAlign: 'center' }}>
                <i className="fas fa-plane" style={{ marginRight: '0.5rem' }}></i>
                Fixed Wing
              </span>
            </div>

            {/* Rows */}
            {comparisons.map((row, index) => (
              <div key={index} style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                padding: '1rem 1.5rem',
                borderBottom: index < comparisons.length - 1 ? '1px solid var(--hq-border)' : 'none',
                background: index % 2 === 0 ? '#fff' : 'var(--hq-hover-bg)'
              }}>
                <span style={{ fontWeight: 500 }}>{row.feature}</span>
                <span style={{
                  textAlign: 'center',
                  color: row.helicopter.toLowerCase().includes('yes') ? '#22C55E' : 'var(--hq-body)'
                }}>{row.helicopter}</span>
                <span style={{
                  textAlign: 'center',
                  color: row.fixedWing.toLowerCase().includes('no') ? 'var(--hq-muted)' : 'var(--hq-body)'
                }}>{row.fixedWing}</span>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(224,74,47,0.1)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <p style={{ margin: '0 0 1rem', color: 'var(--hq-primary)' }}>
              <strong>The bottom line:</strong> If you value flexibility, accessibility, and the joy of flight over pure speed and range, a helicopter is the answer.
            </p>
            <a href="#" className="hq-btn hq-btn--accent">Explore Helicopters</a>
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="approved"
          feedback="I like it but not sure where we would put it. Don't make any omissions from the provided list"
          note="placement TBD - do not omit"
        />
      )}
    </>
  );
};

export default HelicopterVsFixedWing;
