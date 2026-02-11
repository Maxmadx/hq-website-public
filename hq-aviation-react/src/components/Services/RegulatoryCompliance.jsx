import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-086
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const RegulatoryCompliance = ({ showNote = true }) => {
  const certifications = [
    {
      logo: 'CAA',
      title: 'CAA Approved Training Organisation',
      number: 'ATO 123/456',
      description: 'Approved to deliver PPL(H), CPL(H), and instructor ratings'
    },
    {
      logo: 'EASA',
      title: 'EASA Part-145 Maintenance',
      number: 'UK.145.01234',
      description: 'Authorised for Robinson helicopter maintenance and overhauls'
    },
    {
      logo: 'RHC',
      title: 'Robinson Authorised Dealer',
      number: 'Since 1990',
      description: 'Official UK dealer for new Robinson helicopters'
    },
    {
      logo: 'FAA',
      title: 'FAA Approved',
      number: 'Repair Station',
      description: 'US-registered aircraft maintenance capability'
    }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: 'var(--hq-primary)', color: '#fff' }}>
        <div className="hq-container">
          <div className="hq-section-header">
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: 'var(--hq-accent)'
            }}>Certifications</span>
            <h2 className="hq-section-title" style={{ color: '#fff' }}>Fully Approved & Certified</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem'
          }}>
            {certifications.map((cert, index) => (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}>{cert.logo}</div>
                <h3 style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>{cert.title}</h3>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--hq-accent)',
                  display: 'block',
                  marginBottom: '0.75rem'
                }}>{cert.number}</span>
                <p style={{
                  fontSize: '0.8rem',
                  opacity: 0.7,
                  margin: 0
                }}>{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="approved"
          feedback={null}
        />
      )}
    </>
  );
};

export default RegulatoryCompliance;
