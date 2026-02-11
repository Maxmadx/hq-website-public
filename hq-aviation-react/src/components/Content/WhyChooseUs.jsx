import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-006
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const WhyChooseUs = ({ showNote = true }) => {
  const reasons = [
    { icon: 'fa-history', title: '30+ Years Experience', description: "Three decades as the UK's leading Robinson helicopter specialist. We've seen it all." },
    { icon: 'fa-certificate', title: 'Factory Authorized', description: 'Official Robinson dealer with factory-trained engineers. Genuine parts, guaranteed quality.' },
    { icon: 'fa-users', title: 'Family Business', description: 'A family business that treats you like family. Personal service, lasting relationships.' },
    { icon: 'fa-tools', title: 'One-Stop Shop', description: 'Sales, training, maintenance, parts, and management. Everything helicopter under one roof.' },
    { icon: 'fa-globe-europe', title: 'World Record Holders', description: 'Led by Captain Q with 7 world records. Learn from the very best in the industry.' },
    { icon: 'fa-map-marker-alt', title: 'Prime Location', description: '20 minutes from Central London at Denham Aerodrome. Easy access, free parking.' }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem' }}>
        <div className="hq-container">
          <div className="hq-section-header">
            <span className="hq-overline">The HQ Difference</span>
            <h2 className="hq-section-title">Why Choose Us?</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {reasons.map((reason, index) => (
              <div key={index} style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'var(--hq-hover-bg)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <i className={`fas ${reason.icon}`} style={{
                    fontSize: '1.5rem',
                    color: 'var(--hq-accent)'
                  }}></i>
                </div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem'
                }}>{reason.title}</h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--hq-body)',
                  lineHeight: 1.7
                }}>{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="needs-work"
          feedback="Not a pretty component but 'Why Choose Us' could be a valuable component"
        />
      )}
    </>
  );
};

export default WhyChooseUs;
