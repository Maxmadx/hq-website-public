import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-032
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const WorldRecordTimeline = ({ showNote = true }) => {
  const records = [
    { year: '1998', title: 'Around the World', description: 'First solo helicopter circumnavigation via both poles' },
    { year: '2003', title: 'Polar Record', description: 'Fastest helicopter flight to the South Pole' },
    { year: '2007', title: 'Aerobatic Champion', description: 'World Helicopter Aerobatic Championship winner' },
    { year: '2012', title: 'Atlantic Crossing', description: 'Solo transatlantic helicopter flight in R66' },
    { year: '2016', title: 'Arctic Expedition', description: 'First R66 to land at the North Pole' },
    { year: '2019', title: 'Speed Record', description: 'London to Monaco in record time' },
    { year: '2023', title: 'Education Award', description: 'Lifetime achievement in helicopter training' }
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
            }}>Captain Q's Journey</span>
            <h2 className="hq-section-title" style={{ color: '#fff' }}>World Records & Achievements</h2>
          </div>

          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'rgba(255,255,255,0.2)',
              transform: 'translateX(-50%)'
            }}></div>

            {records.map((record, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                position: 'relative',
                marginBottom: '2rem'
              }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '16px',
                  height: '16px',
                  background: 'var(--hq-accent)',
                  borderRadius: '50%',
                  border: '3px solid #fff',
                  zIndex: 1
                }}></div>

                {/* Content */}
                <div style={{
                  width: 'calc(50% - 40px)',
                  background: 'rgba(255,255,255,0.05)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  textAlign: index % 2 === 0 ? 'right' : 'left'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--hq-accent)',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>{record.year}</span>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>{record.title}</h3>
                  <p style={{
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    margin: 0
                  }}>{record.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="approved"
          feedback="This timeline will be great to have"
        />
      )}
    </>
  );
};

export default WorldRecordTimeline;
