import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  if (!feedback) return null;

  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-021 (HIGH PRIORITY)
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const RecentNews = ({ showNote = true }) => {
  const news = [
    {
      image: '/assets/images/new-aircraft/r66/blue-r66-palo-verde-front-v4.png',
      bgStyle: 'center/contain no-repeat',
      bgColor: 'var(--hq-hover-bg)',
      date: 'JAN 2025',
      category: 'AIRCRAFT',
      title: 'R66 NxG Series Now Available'
    },
    {
      image: '/assets/images/expeditions/helicopter-expeditions-quentin-smith.webp',
      bgStyle: 'center/cover',
      date: 'DEC 2024',
      category: 'EXPEDITION',
      title: 'Alps Expedition 2025 Dates Announced'
    },
    {
      image: '/assets/images/team/british-helicopter-team.webp',
      bgStyle: 'center/cover',
      date: 'DEC 2024',
      category: 'TRAINING',
      title: 'New Instructor Joins the Team'
    }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem' }}>
        <div className="hq-container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '2rem'
          }}>
            <div>
              <span className="hq-overline">Latest</span>
              <h2 className="hq-section-title" style={{ textAlign: 'left' }}>News & Updates</h2>
            </div>
            <a href="#" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              color: 'var(--hq-accent)',
              textDecoration: 'none'
            }}>VIEW ALL →</a>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {news.map((item, index) => (
              <a key={index} href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  height: '180px',
                  background: `url('${item.image}') ${item.bgStyle}`,
                  backgroundColor: item.bgColor || 'transparent',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1rem'
                }}></div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  color: 'var(--hq-subtle)'
                }}>{item.date} • {item.category}</span>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  margin: '0.5rem 0'
                }}>{item.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="approved"
          feedback="Important page"
        />
      )}
    </>
  );
};

export default RecentNews;
