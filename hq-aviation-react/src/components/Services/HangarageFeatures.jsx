import React from 'react';

const ComponentNote = ({ status, feedback, mustInclude }) => {
  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-038
      </div>
      <p className="component-note__text">{feedback}</p>
      {mustInclude && (
        <p className="component-note__text" style={{ marginTop: '0.5rem' }}>
          Must include: {mustInclude.join(', ')}
        </p>
      )}
    </div>
  );
};

const HangarageFeatures = ({ showNote = true }) => {
  const features = [
    { icon: 'fa-city', title: 'Proximity to London', description: 'Just 20 minutes from Central London via M40' },
    { icon: 'fa-warehouse', title: 'Heated Hangar', description: 'Climate-controlled facility for your aircraft' },
    { icon: 'fa-shield-alt', title: '24/7 Security', description: 'CCTV monitoring and secure access' },
    { icon: 'fa-parking', title: 'On-Site Parking', description: 'Free parking for owners and guests' },
    { icon: 'fa-tools', title: 'Maintenance On-Site', description: 'Full Part-145 maintenance facility' },
    { icon: 'fa-gas-pump', title: 'Fuel Available', description: 'Avgas and Jet-A1 on the field' },
    { icon: 'fa-coffee', title: 'Pilot Lounge', description: 'Comfortable facilities for planning and rest' },
    { icon: 'fa-plane-departure', title: 'Easy Departures', description: 'Minimal start-up time, fly when ready' }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: 'var(--hq-hover-bg)' }}>
        <div className="hq-container">
          <div className="hq-section-header">
            <span className="hq-overline hq-overline--accent">Hangarage</span>
            <h2 className="hq-section-title">Premium Helicopter Storage</h2>
            <p className="hq-section-subtitle">Keep your aircraft safe, secure, and ready to fly at Denham Aerodrome</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                background: '#fff',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-light)'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(224,74,47,0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <i className={`fas ${feature.icon}`} style={{
                    fontSize: '1.25rem',
                    color: 'var(--hq-accent)'
                  }}></i>
                </div>
                <h3 style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>{feature.title}</h3>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--hq-body)',
                  margin: 0
                }}>{feature.description}</p>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '2rem'
          }}>
            <a href="#" className="hq-btn hq-btn--primary">Enquire About Hangarage</a>
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="needs-work"
          feedback="Yes hangarage is a good one to have like this. Make the full list of benefits, including proximity to Central London"
          mustInclude={['proximity to Central London', 'full benefits list']}
        />
      )}
    </>
  );
};

export default HangarageFeatures;
