import React from 'react';

const ComponentNote = ({ status, feedback, targetPages }) => {
  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - showcase-cost-transparency
      </div>
      <p className="component-note__text">{feedback}</p>
      {targetPages && (
        <p className="component-note__text" style={{ marginTop: '0.5rem' }}>
          Target pages: {targetPages.join(', ')}
        </p>
      )}
    </div>
  );
};

const CostTransparency = ({ showNote = true }) => {
  const costs = [
    { item: 'Flight Training (45-60 hours)', range: '£15,000 - £22,000' },
    { item: 'Ground School (9 exams)', included: true },
    { item: 'Study Materials', included: true },
    { item: 'CAA Exam Fees', range: '~£500' },
    { item: 'Medical Certificate', range: '~£150' },
    { item: 'Skills Test', range: '~£350' },
    { item: 'License Issue Fee', range: '~£80' }
  ];

  return (
    <>
      <section style={{ padding: '4rem 2rem', background: 'var(--hq-background)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div className="hq-section-header">
            <span className="hq-overline hq-overline--accent">Transparent Pricing</span>
            <h2 className="hq-section-title">What It Really Costs</h2>
            <p className="hq-section-subtitle">No hidden fees. No surprises. Complete breakdown.</p>
          </div>

          <div style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-light)'
          }}>
            {costs.map((cost, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 1.5rem',
                borderBottom: index < costs.length - 1 ? '1px solid var(--hq-border)' : 'none'
              }}>
                <span style={{ fontSize: '0.95rem' }}>{cost.item}</span>
                {cost.included ? (
                  <span style={{
                    background: 'rgba(34,197,94,0.1)',
                    color: '#22C55E',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>INCLUDED</span>
                ) : (
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600
                  }}>{cost.range}</span>
                )}
              </div>
            ))}
          </div>

          <div style={{
            background: 'var(--hq-primary)',
            color: '#fff',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total Investment</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.5rem',
              fontWeight: 700
            }}>£17,000 - £24,000</span>
          </div>

          <p style={{
            textAlign: 'center',
            color: 'var(--hq-muted)',
            fontSize: '0.85rem',
            marginTop: '1.5rem'
          }}>
            Finance options available. Spread the cost over 12-36 months.
          </p>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="approved"
          feedback="Pricing page is important. Include pricing into PPL page and CPL page"
          targetPages={['training/ppl', 'training/cpl']}
        />
      )}
    </>
  );
};

export default CostTransparency;
