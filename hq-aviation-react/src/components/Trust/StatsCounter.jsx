import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-008
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const StatsCounter = ({ showNote = true }) => {
  const stats = [
    { value: '34', label: 'YEARS IN BUSINESS' },
    { value: '500+', label: 'AIRCRAFT SOLD' },
    { value: '1,200+', label: 'PILOTS TRAINED' },
    { value: '50+', label: 'COUNTRIES VISITED' }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: 'var(--hq-dark-bg)' }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          textAlign: 'center'
        }}>
          {stats.map((stat, index) => (
            <div key={index}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
                color: '#fff',
                display: 'block'
              }}>{stat.value}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.5)'
              }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="approved"
          feedback={null}
        />
      )}
    </>
  );
};

export default StatsCounter;
