import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-012
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const SocialProofWall = ({ showNote = true }) => {
  const images = [
    { type: 'icon' },
    { src: '/assets/images/facility/busy-hangar.jpg' },
    { src: '/assets/images/team/british-helicopter-team.webp' },
    { type: 'icon' },
    { src: '/assets/images/expeditions/helicopter-expeditions-quentin-smith.webp' },
    { src: '/assets/images/expeditions/north-pole.jpg' }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem' }}>
        <div className="hq-container">
          <div className="hq-section-header">
            <span className="hq-overline">@hqaviation</span>
            <h2 className="hq-section-title">Join Our Community</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '0.5rem'
          }}>
            {images.map((img, index) => (
              <div key={index} style={{
                aspectRatio: '1',
                background: img.type === 'icon'
                  ? 'linear-gradient(45deg, #f0f0f0, #e0e0e0)'
                  : `url('${img.src}') center/cover`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {img.type === 'icon' && (
                  <i className="fab fa-instagram" style={{
                    fontSize: '2rem',
                    color: 'var(--hq-muted)'
                  }}></i>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="#" className="hq-btn hq-btn--outline">
              <i className="fab fa-instagram" style={{ marginRight: '0.5rem' }}></i>
              Follow @hqaviation
            </a>
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="needs-work"
          feedback="We should have a 'Join Our Community' section with the Instagram, Facebook and YouTube socials"
        />
      )}
    </>
  );
};

export default SocialProofWall;
