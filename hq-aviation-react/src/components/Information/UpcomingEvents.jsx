import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-025
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const UpcomingEvents = ({ showNote = true }) => {
  const events = [
    {
      day: '15',
      month: 'FEB',
      category: 'OPEN DAY',
      title: 'Spring Open Day',
      details: '10am - 4pm • Free Entry',
      cta: { text: 'Register', style: 'outline' }
    },
    {
      day: '01',
      month: 'MAR',
      category: 'EXPEDITION',
      title: 'Alps Adventure 2025',
      details: '7 days • Limited to 6 aircraft',
      cta: { text: 'Book', style: 'accent' }
    }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: 'var(--hq-hover-bg)' }}>
        <div className="hq-container">
          <div className="hq-section-header">
            <span className="hq-overline">Calendar</span>
            <h2 className="hq-section-title">Upcoming Events</h2>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {events.map((event, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                background: '#fff',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-light)'
              }}>
                <div style={{ textAlign: 'center', minWidth: '60px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    display: 'block'
                  }}>{event.day}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                    color: 'var(--hq-subtle)'
                  }}>{event.month}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                    color: 'var(--hq-accent)'
                  }}>{event.category}</span>
                  <h3 style={{
                    fontWeight: 600,
                    margin: '0.25rem 0'
                  }}>{event.title}</h3>
                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--hq-body)',
                    margin: 0
                  }}>{event.details}</p>
                </div>
                <a href="#" className={`hq-btn hq-btn--${event.cta.style}`}>
                  {event.cta.text}
                </a>
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

export default UpcomingEvents;
