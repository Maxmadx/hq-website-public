import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-048
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const GroundSchoolPreview = ({ showNote = true }) => {
  const modules = [
    { icon: 'fa-cloud', title: 'Meteorology', description: 'Understanding weather patterns for safe flight decisions' },
    { icon: 'fa-plane', title: 'Principles of Flight', description: 'How helicopters generate lift and maintain control' },
    { icon: 'fa-compass', title: 'Navigation', description: 'Map reading, flight planning, and GPS systems' },
    { icon: 'fa-broadcast-tower', title: 'Radio Communications', description: 'Proper RT procedures and phraseology' },
    { icon: 'fa-gavel', title: 'Air Law', description: 'Regulations, airspace, and licensing requirements' },
    { icon: 'fa-user-md', title: 'Human Performance', description: 'Physiology, psychology, and decision making' }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: 'var(--hq-background)' }}>
        <div className="hq-container">
          <div className="hq-section-header">
            <span className="hq-overline hq-overline--accent">Ground School</span>
            <h2 className="hq-section-title">What You'll Learn</h2>
            <p className="hq-section-subtitle">9 exams covering all aspects of helicopter theory</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {modules.map((module, index) => (
              <div key={index} style={{
                background: '#fff',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-light)',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(224,74,47,0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <i className={`fas ${module.icon}`} style={{
                    fontSize: '1.25rem',
                    color: 'var(--hq-accent)'
                  }}></i>
                </div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>{module.title}</h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--hq-body)',
                  lineHeight: 1.6,
                  margin: 0
                }}>{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="approved"
          feedback="Explanatory page - how getting your PPL works. Very good component"
        />
      )}
    </>
  );
};

export default GroundSchoolPreview;
