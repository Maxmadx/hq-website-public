import React from 'react';

const ComponentNote = ({ status, feedback, details }) => {
  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-084
      </div>
      <p className="component-note__text">{feedback}</p>
      {details && (
        <p className="component-note__text" style={{ marginTop: '0.5rem' }}>
          Details: {details}
        </p>
      )}
    </div>
  );
};

const MountainFlyingHazards = ({ showNote = true }) => {
  const hazards = [
    { icon: 'fa-wind', title: 'Wind Shear', description: 'Understanding rotor dynamics in turbulent conditions' },
    { icon: 'fa-mountain', title: 'Downdrafts', description: 'Recognizing and escaping mountain wave effects' },
    { icon: 'fa-cloud', title: 'Weather Changes', description: 'Rapid weather deterioration and escape routes' },
    { icon: 'fa-compress-arrows-alt', title: 'Density Altitude', description: 'Performance calculations for high elevation' },
    { icon: 'fa-map-marked-alt', title: 'Navigation', description: 'GPS, map reading, and terrain awareness' },
    { icon: 'fa-helicopter', title: 'Landing Techniques', description: 'Pinnacle, confined area, and slope operations' }
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
              <span className="hq-overline hq-overline--accent">Mountain Flying Course</span>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '1.5rem'
              }}>Master Mountain Flying</h2>
              <p style={{
                color: 'var(--hq-body)',
                lineHeight: 1.8,
                marginBottom: '1rem'
              }}>Our 5-day intensive course in the Scottish Highlands teaches you to handle the unique challenges of mountain and high-altitude operations.</p>

              <div style={{
                background: 'rgba(224,74,47,0.1)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <i className="fas fa-calendar-alt" style={{ color: 'var(--hq-accent)', fontSize: '1.25rem' }}></i>
                <div>
                  <strong>5 Days in Scotland</strong>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--hq-body)' }}>Including ground school and practical flying</p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                {hazards.map((hazard, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start'
                  }}>
                    <i className={`fas ${hazard.icon}`} style={{
                      color: 'var(--hq-accent)',
                      marginTop: '0.25rem',
                      width: '20px'
                    }}></i>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', margin: '0 0 0.25rem' }}>{hazard.title}</h4>
                      <p style={{
                        fontSize: '0.75rem',
                        color: 'var(--hq-body)',
                        margin: 0
                      }}>{hazard.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#" className="hq-btn hq-btn--primary" style={{ marginTop: '2rem' }}>
                Book Mountain Course
              </a>
            </div>
            <div style={{
              background: "url('/assets/images/expeditions/helicopter-expeditions-quentin-smith.webp') center/cover",
              borderRadius: 'var(--radius-lg)',
              minHeight: '450px'
            }}></div>
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="approved"
          feedback="Nice. So a 5 day course in Scotland"
          details="5 day course in Scotland"
        />
      )}
    </>
  );
};

export default MountainFlyingHazards;
