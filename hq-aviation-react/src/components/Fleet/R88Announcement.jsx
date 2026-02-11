import React from 'react';

const ComponentNote = ({ status, feedback, variants, imageStyle }) => {
  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-047
      </div>
      <p className="component-note__text">{feedback}</p>
      {variants && (
        <p className="component-note__text" style={{ marginTop: '0.5rem' }}>
          Variants needed: {variants.join(', ')}
        </p>
      )}
      {imageStyle && (
        <p className="component-note__text" style={{ marginTop: '0.25rem' }}>
          Image style: {imageStyle}
        </p>
      )}
    </div>
  );
};

const R88Announcement = ({ showNote = true, model = 'R88' }) => {
  const models = {
    R22: {
      name: 'Robinson R22',
      tagline: 'The World\'s Most Popular Training Helicopter',
      image: '/assets/images/new-aircraft/r22/r22-red-volcano-front-alpha-v3.png',
      specs: { seats: 2, engine: 'Piston', speed: '96 kts', price: 'From $340,000' }
    },
    R44: {
      name: 'Robinson R44',
      tagline: 'The Best-Selling Civil Helicopter',
      image: '/assets/images/new-aircraft/r44/raven-ii-front-alpha.png',
      specs: { seats: 4, engine: 'Piston', speed: '113 kts', price: 'From $565,000' }
    },
    R66: {
      name: 'Robinson R66',
      tagline: 'Turbine Performance. Robinson Reliability.',
      image: '/assets/images/new-aircraft/r66/blue-r66-palo-verde-left-v4.png',
      specs: { seats: 5, engine: 'Turbine', speed: '140 kts', price: 'From $1,290,000' }
    },
    R88: {
      name: 'Robinson R88',
      tagline: 'The Future of Personal Aviation',
      image: '/assets/images/new-aircraft/r88/r88-jellybean-left.png',
      specs: { seats: 10, engine: 'Twin Turbine', speed: '150 kts', price: 'From $2,850,000' }
    }
  };

  const current = models[model];

  return (
    <>
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '450px',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)'
      }}>
        {/* Image Side */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <img
            src={current.image}
            alt={current.name}
            style={{ maxWidth: '100%', maxHeight: '350px' }}
          />
        </div>

        {/* Content Side */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '4rem',
          color: '#fff'
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'var(--hq-accent)',
            marginBottom: '1rem'
          }}>NEW AIRCRAFT</span>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1,
            marginBottom: '0.75rem'
          }}>{current.name}</h2>
          <p style={{
            fontSize: '1.25rem',
            opacity: 0.8,
            marginBottom: '2rem'
          }}>{current.tagline}</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.5rem',
                fontWeight: 700,
                display: 'block'
              }}>{current.specs.seats}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                opacity: 0.5
              }}>SEATS</span>
            </div>
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                fontWeight: 700,
                display: 'block'
              }}>{current.specs.engine}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                opacity: 0.5
              }}>ENGINE</span>
            </div>
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                fontWeight: 700,
                display: 'block'
              }}>{current.specs.speed}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                opacity: 0.5
              }}>CRUISE</span>
            </div>
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                fontWeight: 700,
                display: 'block',
                color: 'var(--hq-accent)'
              }}>{current.specs.price}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                opacity: 0.5
              }}>PRICE</span>
            </div>
          </div>

          <div className="hq-btn-group">
            <a href="#" className="hq-btn hq-btn--accent">Configure Yours</a>
            <a href="#" className="hq-btn hq-btn--ghost">Full Specifications</a>
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="needs-work"
          feedback="Yes let's have a component like this for each type then, have the side profile though"
          variants={['R22', 'R44', 'R66', 'R88']}
          imageStyle="side profile"
        />
      )}
    </>
  );
};

export default R88Announcement;
