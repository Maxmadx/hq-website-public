import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - fleet-model-spotlight (HIGH PRIORITY)
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const ModelSpotlight = ({ showNote = true }) => {
  const specs = [
    { value: '5', label: 'Seats' },
    { value: '120', label: 'Knots' },
    { value: '350', label: 'NM Range' },
    { value: 'RR300', label: 'Engine' }
  ];

  return (
    <>
      <section style={{
        position: 'relative',
        minHeight: '550px',
        background: 'linear-gradient(135deg, #faf9f6 0%, #f0efe8 100%)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <img
          src="/assets/images/new-aircraft/r66/blue-r66-palo-verde-left-v4.png"
          alt="Robinson R66"
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '55%',
            opacity: 0.95
          }}
        />
        <div style={{
          position: 'relative',
          zIndex: 2,
          padding: '4rem',
          maxWidth: '550px'
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'var(--hq-accent)',
            display: 'block',
            marginBottom: '1rem'
          }}>NEW AIRCRAFT</span>
          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 0.9,
            margin: '0 0 0.5rem',
            color: 'var(--hq-primary)'
          }}>Robinson R66</h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--hq-body)',
            marginBottom: '2rem'
          }}>Turbine Performance. Robinson Reliability.</p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            {specs.map((spec, index) => (
              <span key={index} style={{
                background: 'rgba(26,26,26,0.08)',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                fontSize: '0.85rem',
                color: 'var(--hq-primary)'
              }}>
                <strong>{spec.value}</strong> {spec.label}
              </span>
            ))}
          </div>
          <div className="hq-btn-group">
            <a href="#" className="hq-btn hq-btn--accent hq-btn--lg">Configure Yours</a>
            <a href="#" className="hq-btn hq-btn--outline">Full Specifications</a>
          </div>
          <div style={{
            marginTop: '2rem',
            fontSize: '0.9rem',
            color: 'var(--hq-muted)'
          }}>
            From <strong style={{ color: 'var(--hq-primary)', fontSize: '1.5rem' }}>$1,290,000</strong> ex-factory
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="approved"
          feedback="This component looks absolutely beautiful. Beautiful."
        />
      )}
    </>
  );
};

export default ModelSpotlight;
