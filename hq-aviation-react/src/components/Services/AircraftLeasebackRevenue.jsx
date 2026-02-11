import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-075
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const AircraftLeasebackRevenue = ({ showNote = true }) => {
  const benefits = [
    { title: 'Revenue Generation', description: 'Your aircraft earns while you\'re not flying' },
    { title: 'Reduced Fixed Costs', description: 'Offset hangarage, insurance, and maintenance' },
    { title: 'Priority Access', description: 'Your aircraft, your priority. Always available when you need it' },
    { title: 'Professional Care', description: 'Flown and maintained by our expert team' }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: 'var(--hq-primary)', color: '#fff' }}>
        <div className="hq-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: 'var(--hq-accent)'
              }}>LEASEBACK PROGRAMME</span>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                lineHeight: 1.1,
                margin: '1rem 0'
              }}>Make Your Aircraft Work For You</h2>
              <p style={{
                opacity: 0.8,
                lineHeight: 1.8,
                marginBottom: '2rem'
              }}>Put your helicopter in our training fleet and generate income when you're not flying. Our leaseback programme offers attractive returns while ensuring your aircraft receives the best care.</p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                {benefits.map((benefit, index) => (
                  <div key={index}>
                    <h4 style={{
                      fontSize: '0.95rem',
                      marginBottom: '0.25rem'
                    }}>{benefit.title}</h4>
                    <p style={{
                      fontSize: '0.85rem',
                      opacity: 0.7,
                      margin: 0
                    }}>{benefit.description}</p>
                  </div>
                ))}
              </div>

              <a href="#" className="hq-btn hq-btn--accent">Learn About Leaseback</a>
            </div>

            <div style={{
              background: '#fff',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              color: 'var(--hq-primary)'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>Potential Monthly Returns</h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: 'var(--hq-hover-bg)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <span>R22 Beta II</span>
                  <span style={{ fontWeight: 700 }}>£1,500 - £2,500/mo</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: 'var(--hq-hover-bg)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <span>R44 Raven II</span>
                  <span style={{ fontWeight: 700 }}>£2,000 - £3,500/mo</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: 'var(--hq-hover-bg)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <span>R66 Turbine</span>
                  <span style={{ fontWeight: 700 }}>£3,000 - £5,000/mo</span>
                </div>
              </div>
              <p style={{
                fontSize: '0.75rem',
                color: 'var(--hq-muted)',
                textAlign: 'center',
                marginTop: '1rem'
              }}>Returns vary based on utilisation and aircraft condition</p>
            </div>
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="approved"
          feedback="I like this, very cool in the leaseback page"
        />
      )}
    </>
  );
};

export default AircraftLeasebackRevenue;
