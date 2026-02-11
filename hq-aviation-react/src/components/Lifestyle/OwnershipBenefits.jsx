import React from 'react';

const ComponentNote = ({ status, feedback, mustInclude }) => {
  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - lifestyle-ownership-benefits
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

const OwnershipBenefits = ({ showNote = true }) => {
  const benefits = [
    {
      icon: 'fa-clock',
      title: 'Time Freedom',
      description: 'London to Edinburgh in 2.5 hours. Skip check-in queues, security lines, and delays.'
    },
    {
      icon: 'fa-map-marker-alt',
      title: 'Access Anywhere',
      description: 'Land at 2,000+ airfields across Europe. Remote estates, private helipads, events.'
    },
    {
      icon: 'fa-door-open',
      title: 'Door to Door',
      description: 'From your home to your destination. No taxis, no parking, no transfers.'
    },
    {
      icon: 'fa-heart',
      title: 'Pure Joy',
      description: "The view from 2,000 feet. The thrill of flight. Some things can't be measured in ROI."
    },
    {
      icon: 'fa-pound-sign',
      title: 'Business Asset',
      description: 'Tax-efficient ownership structures. Potential charter revenue. An asset that pays for itself.'
    }
  ];

  return (
    <>
      <section style={{ padding: '5rem 2rem', background: '#faf9f6' }}>
        <div className="hq-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="hq-overline hq-overline--accent">Helicopter Ownership</span>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                lineHeight: 1.1,
                margin: '0.5rem 0 2rem'
              }}>More Than Transport.<br />A Way of Life.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {benefits.map((benefit, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'rgba(224,74,47,0.1)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <i className={`fas ${benefit.icon}`} style={{ color: 'var(--hq-accent)' }}></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.25rem' }}>{benefit.title}</h3>
                      <p style={{
                        color: 'var(--hq-body)',
                        margin: 0,
                        fontSize: '0.9rem'
                      }}>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#" className="hq-btn hq-btn--primary" style={{ marginTop: '2rem' }}>
                Explore Ownership Options
              </a>
            </div>
            <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <img
                src="/assets/images/expeditions/helicopter-expeditions-quentin-smith.webp"
                alt="Helicopter ownership lifestyle"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="needs-work"
          feedback="I like the idea of having a benefit component. Make a complete list of the benefits - door to door etc."
          mustInclude={['door to door', 'complete benefits list']}
        />
      )}
    </>
  );
};

export default OwnershipBenefits;
