import React from 'react';

const ComponentNote = ({ status, feedback, note }) => {
  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-065
      </div>
      <p className="component-note__text">{feedback}</p>
      {note && (
        <p className="component-note__text" style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
          Note: {note}
        </p>
      )}
    </div>
  );
};

const TopGearMoment = ({ showNote = true }) => {
  return (
    <>
      <section style={{
        position: 'relative',
        minHeight: '500px',
        background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('/assets/images/lifestyle/helicopter-lands-on-a-car-2c-top-gear-2c-quentin-smith.webp') center/cover",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '700px', padding: '2rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            opacity: 0.7,
            display: 'block',
            marginBottom: '1rem'
          }}>AS SEEN ON</span>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.1,
            marginBottom: '1.5rem'
          }}>Top Gear</h2>
          <p style={{
            fontSize: '1.25rem',
            opacity: 0.9,
            marginBottom: '2rem',
            lineHeight: 1.7
          }}>Captain Q landed a helicopter on a moving car for BBC's Top Gear, showcasing the precision and skill that defines HQ Aviation.</p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            marginBottom: '2rem'
          }}>
            <div>
              <i className="fas fa-tv" style={{ fontSize: '2rem', color: 'var(--hq-accent)', marginBottom: '0.5rem' }}></i>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.7 }}>BBC TOP GEAR</p>
            </div>
            <div>
              <i className="fas fa-eye" style={{ fontSize: '2rem', color: 'var(--hq-accent)', marginBottom: '0.5rem' }}></i>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.7 }}>10M+ VIEWERS</p>
            </div>
            <div>
              <i className="fas fa-trophy" style={{ fontSize: '2rem', color: 'var(--hq-accent)', marginBottom: '0.5rem' }}></i>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.7 }}>ICONIC MOMENT</p>
            </div>
          </div>

          <a href="#" className="hq-btn hq-btn--accent hq-btn--lg">
            <i className="fas fa-play" style={{ marginRight: '0.75rem' }}></i>
            Watch the Video
          </a>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="approved"
          feedback="I don't know in which section this would fit but it's a good component"
          note="placement TBD"
        />
      )}
    </>
  );
};

export default TopGearMoment;
