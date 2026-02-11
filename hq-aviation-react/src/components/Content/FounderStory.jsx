import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-007 (HIGH PRIORITY)
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const FounderStory = ({ showNote = true }) => {
  const stats = [
    { value: '15,000+', label: 'FLIGHT HOURS' },
    { value: '7', label: 'WORLD RECORDS' },
    { value: '50+', label: 'COUNTRIES' }
  ];

  return (
    <>
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '500px'
      }}>
        <div style={{
          background: "url('/assets/images/team/helicopter-genius-quentin-smith-great-britain.webp') center/cover"
        }}></div>
        <div style={{
          background: 'var(--hq-primary)',
          color: '#fff',
          padding: '4rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'var(--hq-accent)',
            marginBottom: '1rem'
          }}>MEET THE FOUNDER</span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.1,
            marginBottom: '1.5rem'
          }}>Captain Quentin Smith</h2>
          <p style={{
            fontSize: '1rem',
            opacity: 0.8,
            lineHeight: 1.8,
            marginBottom: '1.5rem'
          }}>"In 1990, I turned my passion for flight into HQ Aviation. Today, we're the UK's leading Robinson specialist, but our mission remains the same: sharing the joy of helicopter flight with everyone who walks through our doors."</p>
          <div style={{
            display: 'flex',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {stats.map((stat, index) => (
              <div key={index}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  display: 'block'
                }}>{stat.value}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  opacity: 0.5
                }}>{stat.label}</span>
              </div>
            ))}
          </div>
          <a href="#" className="hq-btn hq-btn--accent" style={{ alignSelf: 'flex-start' }}>
            Read His Story
          </a>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="needs-work"
          feedback="We need a founder section but it has to be really good, creative and beautiful"
        />
      )}
    </>
  );
};

export default FounderStory;
