import React from 'react';

const ComponentNote = ({ status, feedback, actionRequired }) => {
  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-026
      </div>
      <p className="component-note__text">{feedback}</p>
      {actionRequired && (
        <p className="component-note__text" style={{ marginTop: '0.5rem', fontWeight: 600 }}>
          Action Required: {actionRequired}
        </p>
      )}
    </div>
  );
};

const TeamPreview = ({ showNote = true }) => {
  const team = [
    {
      name: 'Quentin Smith',
      role: 'FOUNDER & MD',
      image: '/assets/images/team/quentin-smith-world-record-holder-helicopter-aerobatics.webp'
    },
    {
      name: 'Mackie Alcantara',
      role: 'CHIEF INSTRUCTOR',
      image: '/assets/images/team/british-helicopter-team.webp'
    },
    {
      name: 'David Cross',
      role: 'CHIEF ENGINEER',
      icon: 'fa-wrench'
    },
    {
      name: 'Alex & Nicola',
      role: 'OPERATIONS',
      icon: 'fa-headset'
    }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: 'var(--hq-hover-bg)' }}>
        <div className="hq-container">
          <div className="hq-section-header">
            <span className="hq-overline">Our Team</span>
            <h2 className="hq-section-title">Meet the Experts</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem'
          }}>
            {team.map((member, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 1rem',
                  border: '3px solid #fff',
                  boxShadow: 'var(--shadow-light)',
                  background: member.image ? 'transparent' : 'var(--hq-background)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <i className={`fas ${member.icon}`} style={{
                      fontSize: '2rem',
                      color: 'var(--hq-muted)'
                    }}></i>
                  )}
                </div>
                <h3 style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  marginBottom: '0.25rem'
                }}>{member.name}</h3>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  color: 'var(--hq-subtle)'
                }}>{member.role}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="#" className="hq-btn hq-btn--outline">Meet the Full Team</a>
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="needs-work"
          feedback="We need to take a team photograph as well - have helicopters lined up and have all the employees in uniform lined up on multiple rows to also showcase how big our workforce is. Then we need the 'Our Team' component but this component is really ugly so we need to make some variations of this that look better"
          actionRequired="Take team photograph with helicopters and uniformed employees"
        />
      )}
    </>
  );
};

export default TeamPreview;
