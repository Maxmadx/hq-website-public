import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-053
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const SelfFlyHireRates = ({ showNote = true }) => {
  const rates = [
    {
      aircraft: 'R22 Beta II',
      image: '/assets/images/new-aircraft/r22/r22-red-volcano-front-alpha-v3.png',
      hourlyRate: '£280',
      seats: 2,
      type: 'Piston',
      requirements: '50+ hours PIC'
    },
    {
      aircraft: 'R44 Raven II',
      image: '/assets/images/new-aircraft/r44/raven-ii-front-alpha.png',
      hourlyRate: '£420',
      seats: 4,
      type: 'Piston',
      requirements: '100+ hours PIC, Type Rating'
    },
    {
      aircraft: 'R66 Turbine',
      image: '/assets/images/new-aircraft/r66/blue-r66-palo-verde-front-v4.png',
      hourlyRate: '£650',
      seats: 5,
      type: 'Turbine',
      requirements: '150+ hours PIC, Type Rating'
    }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: 'var(--hq-hover-bg)' }}>
        <div className="hq-container">
          <div className="hq-section-header">
            <span className="hq-overline hq-overline--accent">Self-Fly Hire</span>
            <h2 className="hq-section-title">Hire Rates</h2>
            <p className="hq-section-subtitle">Fly our fleet without the commitment of ownership</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {rates.map((rate, index) => (
              <div key={index} style={{
                background: '#fff',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-light)'
              }}>
                <div style={{
                  height: '150px',
                  background: 'var(--hq-background)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem'
                }}>
                  <img
                    src={rate.image}
                    alt={rate.aircraft}
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>{rate.aircraft}</h3>
                  <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      background: 'var(--hq-hover-bg)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem'
                    }}>{rate.seats} Seats</span>
                    <span style={{
                      background: 'var(--hq-hover-bg)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem'
                    }}>{rate.type}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: 'var(--hq-accent)'
                    }}>{rate.hourlyRate}</span>
                    <span style={{
                      fontSize: '0.85rem',
                      color: 'var(--hq-muted)'
                    }}>per hour</span>
                  </div>
                  <p style={{
                    fontSize: '0.8rem',
                    color: 'var(--hq-body)',
                    margin: 0
                  }}>
                    <i className="fas fa-info-circle" style={{ marginRight: '0.5rem' }}></i>
                    {rate.requirements}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="#" className="hq-btn hq-btn--primary">Check Availability</a>
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="approved"
          feedback="Yes include this in the self fly hire section"
        />
      )}
    </>
  );
};

export default SelfFlyHireRates;
