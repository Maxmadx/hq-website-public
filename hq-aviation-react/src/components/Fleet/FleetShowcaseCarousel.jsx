import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-005
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const FleetShowcaseCarousel = ({ showNote = true }) => {
  const aircraft = [
    {
      image: '/assets/images/new-aircraft/r22/r22-red-volcano-front-alpha-v3.png',
      seats: '2 SEATS',
      name: 'R22 Beta II',
      price: 'From $340,000'
    },
    {
      image: '/assets/images/new-aircraft/r44/raven-ii-front-alpha.png',
      seats: '4 SEATS',
      name: 'R44 Raven II',
      price: 'From $565,000'
    },
    {
      image: '/assets/images/new-aircraft/r66/blue-r66-palo-verde-front-v4.png',
      seats: '5 SEATS • TURBINE',
      name: 'R66 Turbine',
      price: 'From $1,290,000'
    },
    {
      image: '/assets/images/new-aircraft/r88/r88-jellybean-left.png',
      seats: '10 SEATS • TWIN',
      name: 'R88',
      price: 'From $2,850,000'
    }
  ];

  return (
    <>
      <section style={{ padding: '4rem 0', background: 'var(--hq-hover-bg)' }}>
        <div className="hq-container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '2rem'
          }}>
            <div>
              <span className="hq-overline">Our Fleet</span>
              <h2 className="hq-section-title" style={{ textAlign: 'left' }}>Robinson Helicopters</h2>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{
                width: '40px',
                height: '40px',
                border: '1px solid var(--hq-border)',
                background: '#fff',
                borderRadius: '50%',
                cursor: 'pointer'
              }}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button style={{
                width: '40px',
                height: '40px',
                border: '1px solid var(--hq-border)',
                background: '#fff',
                borderRadius: '50%',
                cursor: 'pointer'
              }}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          padding: '0 2rem',
          overflowX: 'auto'
        }}>
          {aircraft.map((item, index) => (
            <div key={index} style={{
              flex: '0 0 300px',
              background: '#fff',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ height: '120px', marginBottom: '1rem' }}
              />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                color: 'var(--hq-subtle)'
              }}>{item.seats}</span>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                margin: '0.5rem 0'
              }}>{item.name}</h3>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--hq-accent)'
              }}>{item.price}</p>
            </div>
          ))}
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="needs-work"
          feedback="This is a nice component for the Robinson helicopters in the sale page, could use a little work but a good start. The R66 shouldn't appear in black with the word 'popular' - it should appear like any other"
        />
      )}
    </>
  );
};

export default FleetShowcaseCarousel;
