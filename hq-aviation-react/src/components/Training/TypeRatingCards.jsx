import React from 'react';

const ComponentNote = ({ status, feedback, aircraftTypes }) => {
  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-051
      </div>
      <p className="component-note__text">{feedback}</p>
      {aircraftTypes && (
        <p className="component-note__text" style={{ marginTop: '0.5rem' }}>
          Aircraft types: {aircraftTypes.join(', ')}
        </p>
      )}
    </div>
  );
};

const TypeRatingCards = ({ showNote = true }) => {
  const typeRatings = [
    { name: 'R44', category: 'Piston', duration: '3-5 hours', price: 'From £2,500' },
    { name: 'R66', category: 'Turbine', duration: '5-7 hours', price: 'From £4,500' },
    { name: 'H500', category: 'Turbine', duration: '6-8 hours', price: 'From £5,500' },
    { name: 'AS350', category: 'Turbine', duration: '8-10 hours', price: 'From £7,500' },
    { name: 'Bell 407', category: 'Turbine', duration: '8-10 hours', price: 'From £8,000' }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: 'var(--hq-hover-bg)' }}>
        <div className="hq-container">
          <div className="hq-section-header">
            <span className="hq-overline">Advanced Training</span>
            <h2 className="hq-section-title">Type Ratings</h2>
            <p className="hq-section-subtitle">Expand your flying privileges with additional aircraft types</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1rem'
          }}>
            {typeRatings.map((rating, index) => (
              <div key={index} style={{
                background: '#fff',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-light)'
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  color: 'var(--hq-accent)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>{rating.category}</span>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}>{rating.name}</h3>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'var(--hq-body)',
                  marginBottom: '0.5rem'
                }}>
                  <i className="fas fa-clock" style={{ marginRight: '0.5rem' }}></i>
                  {rating.duration}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--hq-primary)'
                }}>{rating.price}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="#" className="hq-btn hq-btn--primary">Enquire About Type Ratings</a>
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="needs-work"
          feedback="Have a type rating component for R44, R66, H500, AS350, Bell 407"
          aircraftTypes={['R44', 'R66', 'H500', 'AS350', 'Bell 407']}
        />
      )}
    </>
  );
};

export default TypeRatingCards;
