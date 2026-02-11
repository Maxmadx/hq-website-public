import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-059
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const AircraftManagement = ({ showNote = true }) => {
  const services = [
    { title: 'Maintenance Scheduling', description: 'We track all inspections, ADs, and service bulletins' },
    { title: 'Airworthiness', description: 'Keep your aircraft compliant and ready to fly' },
    { title: 'Insurance Handling', description: 'Annual renewals and claims management' },
    { title: 'Pilot Sourcing', description: 'Need a pilot? We provide qualified crew' },
    { title: 'Flight Planning', description: 'Routes, weather, and NOTAMs handled for you' },
    { title: 'Cost Reporting', description: 'Transparent monthly reports on all expenses' }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: '#fff' }}>
        <div className="hq-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div style={{
              background: "url('/assets/images/facility/busy-hangar.jpg') center/cover",
              borderRadius: 'var(--radius-lg)',
              minHeight: '400px'
            }}></div>
            <div>
              <span className="hq-overline hq-overline--accent">Aircraft Management</span>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '1.5rem'
              }}>We Handle Everything</h2>
              <p style={{
                color: 'var(--hq-body)',
                lineHeight: 1.8,
                marginBottom: '2rem'
              }}>Own a helicopter but don't want the hassle of managing it? Our comprehensive management service takes care of everything from maintenance to paperwork, so you can focus on flying.</p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {services.map((service, index) => (
                  <div key={index} style={{
                    padding: '1rem',
                    background: 'var(--hq-hover-bg)',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <h4 style={{
                      fontSize: '0.9rem',
                      margin: '0 0 0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <i className="fas fa-check" style={{ color: 'var(--hq-accent)', fontSize: '0.75rem' }}></i>
                      {service.title}
                    </h4>
                    <p style={{
                      fontSize: '0.8rem',
                      color: 'var(--hq-body)',
                      margin: 0
                    }}>{service.description}</p>
                  </div>
                ))}
              </div>

              <a href="#" className="hq-btn hq-btn--primary">Learn About Management</a>
            </div>
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

export default AircraftManagement;
