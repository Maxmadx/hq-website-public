import React from 'react';

const ComponentNote = ({ status, feedback, interactivity }) => {
  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-027
      </div>
      <p className="component-note__text">{feedback}</p>
      {interactivity && (
        <p className="component-note__text" style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
          Interactivity: {interactivity}
        </p>
      )}
    </div>
  );
};

const ProcessSteps = ({ showNote = true }) => {
  const steps = [
    {
      number: '01',
      title: 'Book Trial',
      description: '30-min hands-on experience. From £299.',
      active: true
    },
    {
      number: '02',
      title: 'Start Training',
      description: 'Flexible lessons around your schedule.',
      active: false
    },
    {
      number: '03',
      title: 'Pass Test',
      description: 'Skills test after 45+ hours.',
      active: false
    },
    {
      number: '04',
      title: 'Take Flight',
      description: 'License in hand. The sky is yours.',
      active: false
    }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem' }}>
        <div className="hq-container">
          <div className="hq-section-header">
            <span className="hq-overline">How It Works</span>
            <h2 className="hq-section-title">Start Flying in 4 Steps</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            position: 'relative'
          }}>
            {/* Connection line */}
            <div style={{
              position: 'absolute',
              top: '30px',
              left: '12.5%',
              right: '12.5%',
              height: '2px',
              background: 'var(--hq-border)'
            }}></div>

            {steps.map((step, index) => (
              <div key={index} style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: step.active ? 'var(--hq-accent)' : '#fff',
                  color: step.active ? '#fff' : (index === 1 ? 'var(--hq-accent)' : 'var(--hq-muted)'),
                  border: step.active ? 'none' : `2px solid ${index === 1 ? 'var(--hq-accent)' : 'var(--hq-border)'}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  position: 'relative',
                  zIndex: 1
                }}>{step.number}</div>
                <h3 style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem'
                }}>{step.title}</h3>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--hq-body)'
                }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="needs-work"
          feedback="Add this to the PPL(H) details page and as you scroll one of the dots will fill with colour and text will appear in the middle describing each step"
          interactivity="scroll-based animation with dot fill and text reveal"
        />
      )}
    </>
  );
};

export default ProcessSteps;
