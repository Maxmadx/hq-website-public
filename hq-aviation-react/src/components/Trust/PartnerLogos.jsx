import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-022
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const PartnerLogos = ({ showNote = true }) => {
  const partners = [
    { name: 'Robinson', icon: 'fa-helicopter' },
    { name: 'Rolls-Royce', icon: 'fa-cog' },
    { name: 'Hayward Aviation', icon: 'fa-shield-alt' },
    { name: 'Helipaddy', icon: 'fa-map-marked-alt' },
    { name: 'Denham Aerodrome', icon: 'fa-plane' }
  ];

  return (
    <>
      <section style={{
        padding: '3rem 2rem',
        borderTop: '1px solid var(--hq-border)',
        borderBottom: '1px solid var(--hq-border)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span className="hq-overline">Trusted Partners</span>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4rem',
            marginTop: '1.5rem',
            flexWrap: 'wrap'
          }}>
            {partners.map((partner, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <i className={`fas ${partner.icon}`} style={{
                  fontSize: '2rem',
                  color: 'var(--hq-muted)'
                }}></i>
                <span style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  marginTop: '0.5rem'
                }}>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="needs-work"
          feedback="Needs better icons but yes having our partners is cool, include Denham Aerodrome"
        />
      )}
    </>
  );
};

export default PartnerLogos;
