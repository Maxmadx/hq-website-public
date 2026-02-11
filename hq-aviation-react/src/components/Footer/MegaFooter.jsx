import React from 'react';

const ComponentNote = ({ status, feedback }) => {
  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - footer-mega (HIGH PRIORITY)
      </div>
      <p className="component-note__text">{feedback}</p>
    </div>
  );
};

const MegaFooter = ({ showNote = true }) => {
  const footerLinks = {
    aircraft: ['R22 Beta II', 'R44 Raven II', 'R66 Turbine', 'R88', 'Pre-Owned'],
    training: ['Trial Flights', 'PPL(H)', 'CPL(H)', 'Type Ratings', 'Night Rating'],
    services: ['Maintenance', 'Parts', 'Hangarage', 'Management', 'Charter'],
    company: ['About Us', 'Our Team', 'News', 'Careers', 'Contact']
  };

  return (
    <>
      <footer style={{ background: '#0a0a0a', padding: '4rem 2rem 2rem', color: '#fff' }}>
        <div className="hq-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr repeat(4, 1fr)',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* Brand Column */}
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>HQ Aviation</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>UK's Premier Robinson Helicopter Dealer</p>
              <a href="tel:+441895833373" style={{
                display: 'block',
                color: 'var(--hq-accent)',
                fontSize: '1.25rem',
                marginBottom: '0.5rem',
                textDecoration: 'none'
              }}>01895 833 373</a>
              <a href="mailto:info@hqaviation.com" style={{
                color: '#888',
                textDecoration: 'none'
              }}>info@hqaviation.com</a>
            </div>

            {/* Aircraft Column */}
            <div>
              <h4 style={{
                marginBottom: '1rem',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#888'
              }}>Aircraft</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {footerLinks.aircraft.map((link, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <a href="#" style={{
                      color: '#666',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s'
                    }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Training Column */}
            <div>
              <h4 style={{
                marginBottom: '1rem',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#888'
              }}>Training</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {footerLinks.training.map((link, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <a href="#" style={{
                      color: '#666',
                      textDecoration: 'none',
                      fontSize: '0.9rem'
                    }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h4 style={{
                marginBottom: '1rem',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#888'
              }}>Services</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {footerLinks.services.map((link, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <a href="#" style={{
                      color: '#666',
                      textDecoration: 'none',
                      fontSize: '0.9rem'
                    }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 style={{
                marginBottom: '1rem',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#888'
              }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {footerLinks.company.map((link, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    <a href="#" style={{
                      color: '#666',
                      textDecoration: 'none',
                      fontSize: '0.9rem'
                    }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{
            borderTop: '1px solid #222',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>
              © 2025 HQ Aviation Ltd. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: '#666', fontSize: '1.25rem' }}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" style={{ color: '#666', fontSize: '1.25rem' }}>
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" style={{ color: '#666', fontSize: '1.25rem' }}>
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" style={{ color: '#666', fontSize: '1.25rem' }}>
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
      {showNote && (
        <ComponentNote
          status="needs-work"
          feedback="Yes we need a cool footer. We need a good footer"
        />
      )}
    </>
  );
};

export default MegaFooter;
