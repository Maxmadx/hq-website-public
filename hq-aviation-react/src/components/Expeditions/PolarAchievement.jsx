import React from 'react';

const ComponentNote = ({ status, feedback, variants }) => {
  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-052
      </div>
      <p className="component-note__text">{feedback}</p>
      {variants && (
        <p className="component-note__text" style={{ marginTop: '0.5rem' }}>
          Variants to create: {variants.join(', ')}
        </p>
      )}
    </div>
  );
};

const PolarAchievement = ({ showNote = true, variant = 'polar' }) => {
  const achievements = {
    polar: {
      image: '/assets/images/expeditions/south-pole-by-helicopter-quentin-smith.webp',
      overline: 'HISTORIC ACHIEVEMENT',
      title: 'First to Both Poles',
      subtitle: 'by Helicopter',
      description: 'Captain Quentin Smith became the first pilot to fly a helicopter to both the North and South Poles, pushing the limits of aviation and human endurance.',
      stats: [
        { value: '2', label: 'Poles Reached' },
        { value: '38,000+', label: 'Miles Flown' },
        { value: '-50°C', label: 'Lowest Temp' }
      ]
    },
    world: {
      image: '/assets/images/expeditions/helicopter-expeditions-quentin-smith.webp',
      overline: 'CIRCUMNAVIGATION',
      title: 'Around the World',
      subtitle: 'Solo by Helicopter',
      description: 'A solo journey around the globe in a Robinson R44, crossing continents, oceans, and extreme weather conditions over 4 months.',
      stats: [
        { value: '37,000', label: 'Miles' },
        { value: '4', label: 'Months' },
        { value: '27', label: 'Countries' }
      ]
    },
    aerobatic: {
      image: '/assets/images/team/quentin-smith-world-record-holder-helicopter-aerobatics.webp',
      overline: 'WORLD CHAMPION',
      title: 'Aerobatic Excellence',
      subtitle: 'World Championship Winner',
      description: 'Multiple-time World Helicopter Aerobatic Champion, representing Great Britain on the international stage.',
      stats: [
        { value: '3', label: 'Titles' },
        { value: '15+', label: 'Competitions' },
        { value: '7', label: 'Gold Medals' }
      ]
    }
  };

  const content = achievements[variant];

  return (
    <>
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '500px'
      }}>
        <div style={{
          background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('${content.image}') center/cover`
        }}></div>
        <div style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
          color: '#fff',
          padding: '4rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'var(--hq-accent)',
            marginBottom: '1rem'
          }}>{content.overline}</span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.1,
            marginBottom: '0.5rem'
          }}>{content.title}</h2>
          <p style={{
            fontSize: '1.25rem',
            opacity: 0.7,
            marginBottom: '1.5rem'
          }}>{content.subtitle}</p>
          <p style={{
            fontSize: '1rem',
            opacity: 0.8,
            lineHeight: 1.8,
            marginBottom: '2rem'
          }}>{content.description}</p>

          <div style={{
            display: 'flex',
            gap: '2rem'
          }}>
            {content.stats.map((stat, index) => (
              <div key={index}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  display: 'block'
                }}>{stat.value}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  opacity: 0.5
                }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="needs-work"
          feedback="Pretty cool. Make one as well for Around the World and Aerobatic World Championships"
          variants={['Polar Achievement', 'Around the World', 'Aerobatic World Championships']}
        />
      )}
    </>
  );
};

export default PolarAchievement;
