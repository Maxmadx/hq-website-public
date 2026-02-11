import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-077
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const FerryFlightServices = ({ showNote = true }) => {
  const features = [
    { icon: 'fa-globe-europe', title: 'Worldwide Delivery', description: 'We ferry helicopters to any destination globally' },
    { icon: 'fa-user-tie', title: 'Experienced Pilots', description: 'Ferry pilots with thousands of hours experience' },
    { icon: 'fa-file-alt', title: 'All Paperwork', description: 'We handle permits, customs, and documentation' },
    { icon: 'fa-shield-alt', title: 'Fully Insured', description: 'Comprehensive ferry flight insurance included' }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: 'var(--hq-background)' }}>
        <div className="hq-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="hq-overline hq-overline--accent">Delivery Services</span>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '1.5rem'
              }}>Ferry Flights Worldwide</h2>
              <p style={{
                color: 'var(--hq-body)',
                lineHeight: 1.8,
                marginBottom: '2rem'
              }}>Need your helicopter delivered? Our experienced ferry pilots have flown Robinson helicopters across continents, over oceans, and to some of the most remote locations on Earth.</p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {features.map((feature, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start'
                  }}>
                    <i className={`fas ${feature.icon}`} style={{
                      color: 'var(--hq-accent)',
                      marginTop: '0.25rem'
                    }}></i>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', margin: '0 0 0.25rem' }}>{feature.title}</h4>
                      <p style={{
                        fontSize: '0.8rem',
                        color: 'var(--hq-body)',
                        margin: 0
                      }}>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#" className="hq-btn hq-btn--primary">Get Ferry Quote</a>
            </div>
            <div style={{
              background: "url('/assets/images/expeditions/helicopter-expeditions-quentin-smith.webp') center/cover",
              borderRadius: 'var(--radius-lg)',
              minHeight: '400px'
            }}></div>
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="approved"
          feedback="Great component"
        />
      )}
    </>
  );
};

export default FerryFlightServices;
