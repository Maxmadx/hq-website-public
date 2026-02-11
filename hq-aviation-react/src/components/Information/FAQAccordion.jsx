import React, { useState } from 'react';

const ComponentNote = ({ status, feedback, note }) => {
  return (
    <div className={`component-note component-note--${status}`}>
      <div className="component-note__label">
        {status === 'approved' ? 'Approved' : 'Needs Work'} - comp-011
      </div>
      <p className="component-note__text">{feedback}</p>
      {note && (
        <p className="component-note__text" style={{ marginTop: '0.5rem', fontWeight: 600, color: '#856404' }}>
          Note: {note}
        </p>
      )}
    </div>
  );
};

const FAQAccordion = ({ showNote = true, faqs = null }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const defaultFaqs = [
    {
      question: 'How long does it take to get a helicopter license?',
      answer: 'Most students complete their PPL(H) in 3-6 months, training 1-2 times per week. Intensive courses are available for faster completion. The minimum requirement is 45 flight hours.'
    },
    {
      question: 'Do I need any prior experience to start?',
      answer: 'No prior experience is required. Our training is designed for complete beginners. We\'ll teach you everything from the ground up.'
    },
    {
      question: 'What\'s included in a trial flight?',
      answer: 'Your trial flight includes a pre-flight briefing, 30 minutes of hands-on flight time with an instructor, and a post-flight debrief. You\'ll take the controls yourself!'
    },
    {
      question: 'How much does a helicopter cost to buy?',
      answer: 'New Robinson helicopters range from $340,000 for an R22 to $2.85M for an R88. Pre-owned options are also available at lower price points.'
    }
  ];

  const questions = faqs || defaultFaqs;

  return (
    <>
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div className="hq-section-header">
            <span className="hq-overline">FAQ</span>
            <h2 className="hq-section-title">Common Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {questions.map((faq, index) => (
              <div key={index} style={{
                background: '#fff',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-light)'
              }}>
                <div
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  style={{
                    padding: '1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  <span>{faq.question}</span>
                  <i className={`fas fa-${openIndex === index ? 'minus' : 'plus'}`} style={{
                    color: 'var(--hq-accent)'
                  }}></i>
                </div>
                {openIndex === index && (
                  <div style={{
                    padding: '0 1.25rem 1.25rem',
                    color: 'var(--hq-body)',
                    fontSize: '0.9rem',
                    lineHeight: 1.7
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {showNote && (
        <ComponentNote
          status="needs-work"
          feedback="We've got to include common questions but they have to be specific to where you have navigated to. This UI is not very good though - I prefer one that I had developed. When it comes to it just ask me or add a note for me to give you the details about the UI I like"
          note="ASK USER for preferred UI design details"
        />
      )}
    </>
  );
};

export default FAQAccordion;
