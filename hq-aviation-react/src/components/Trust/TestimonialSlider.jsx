import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-009
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const TestimonialSlider = ({ showNote = true }) => {
  const testimonials = [
    {
      stars: 5,
      text: "Outstanding training school. The instructors are patient and professional. Couldn't recommend more highly.",
      initials: 'ST',
      name: 'Sarah T.',
      role: 'PPL Student'
    },
    {
      stars: 5,
      text: "Made buying my first helicopter an absolute pleasure. Transparent pricing, no pressure, and excellent aftercare.",
      initials: 'DK',
      name: 'David K.',
      role: 'R66 Owner'
    },
    {
      stars: 5,
      text: "The Alps expedition was life-changing. Captain Q and the team created an unforgettable experience.",
      initials: 'JH',
      name: 'James H.',
      role: 'Expedition Participant'
    }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: 'var(--hq-background)' }}>
        <div className="hq-container">
          <div className="hq-section-header">
            <span className="hq-overline">Testimonials</span>
            <h2 className="hq-section-title">What Our Clients Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{
                background: '#fff',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-light)'
              }}>
                <div style={{ color: '#fbbf24', marginBottom: '1rem' }}>
                  {'★'.repeat(testimonial.stars)}
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--hq-body)',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  marginBottom: '1.5rem'
                }}>"{testimonial.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'var(--hq-hover-bg)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600
                  }}>{testimonial.initials}</div>
                  <div>
                    <span style={{ fontWeight: 600, display: 'block' }}>{testimonial.name}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--hq-subtle)'
                    }}>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
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

export default TestimonialSlider;
