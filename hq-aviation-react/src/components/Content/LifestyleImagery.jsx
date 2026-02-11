import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-023
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const LifestyleImagery = ({ showNote = true }) => {
  const images = [
    {
      span: 2,
      image: '/assets/images/expeditions/helicopter-expeditions-quentin-smith.webp',
      label: 'EXPEDITION',
      title: 'Alpine Adventure'
    },
    {
      image: '/assets/images/team/helicopter-genius-quentin-smith-great-britain.webp',
      label: 'TRAINING'
    },
    {
      image: '/assets/images/new-aircraft/r66/blue-r66-palo-verde-front-v4.png',
      label: 'OWNERSHIP',
      bgColor: '#f5f5f2',
      contain: true
    },
    {
      image: '/assets/images/facility/busy-hangar.jpg',
      label: 'MAINTENANCE'
    },
    {
      image: '/assets/images/expeditions/north-pole.jpg',
      label: 'ADVENTURE'
    }
  ];

  return (
    <>
      <section style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gridTemplateRows: '250px 250px',
        gap: '0.5rem'
      }}>
        {images.map((item, index) => (
          <div
            key={index}
            style={{
              gridRow: item.span ? `span ${item.span}` : 'auto',
              background: item.contain
                ? `url('${item.image}') center/contain no-repeat`
                : `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url('${item.image}') center/cover`,
              backgroundColor: item.bgColor || 'transparent',
              display: 'flex',
              alignItems: 'flex-end',
              padding: item.span ? '2rem' : '1.5rem',
              color: '#fff'
            }}
          >
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                opacity: 0.8
              }}>{item.label}</span>
              {item.title && (
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}>{item.title}</h3>
              )}
            </div>
          </div>
        ))}
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

export default LifestyleImagery;
