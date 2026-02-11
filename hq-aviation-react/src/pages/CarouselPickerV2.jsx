/**
 * CAROUSEL PICKER V2 - 20 Variations based on V14
 * Varying: image size, shadows, animations, number placement
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Picker from '../components/Picker';

const slides = [
  {
    id: 0,
    title: 'Discovery Flight',
    image: '/assets/images/used-aircraft/r66/chris-r66-alps.jpg',
    description: 'Flying is the ultimate dream pursued by mankind. Should you want to live it for real, the discovery flight will certainly fulfil your expectations.',
    cta: 'Learn More',
    link: '/training/trial-lessons'
  },
  {
    id: 1,
    title: 'Private Pilot Licence',
    image: '/assets/images/used-aircraft/r66/gold-on-pad.jpg',
    description: 'The obtention of a PPL(H) requires a minimum of 45 hrs of flight training, including 10 hrs of solo. The duration varies depending on commitment.',
    cta: 'Learn More',
    link: '/training/ppl'
  },
  {
    id: 2,
    title: 'Commercial Pilot Licence',
    image: '/assets/images/used-aircraft/r66/r66s-italy.jpg',
    description: 'Holding a Commercial Pilot Licence, CPL(H) gives you the status of professional helicopter pilot. 155 hrs of flying time post licence is required.',
    cta: 'Learn More',
    link: '/training'
  },
  {
    id: 3,
    title: 'Type Rating',
    image: '/assets/images/used-aircraft/r66/ghver.jpg',
    description: 'Having achieved your PPL(H), you may wish to fly different types of helicopter. A type specific ground training course followed by flight training.',
    cta: 'Learn More',
    link: '/training'
  },
  {
    id: 4,
    title: 'Night Rating',
    image: '/assets/images/used-aircraft/r66/r66-turbine-n7021z.jpg',
    description: 'Holding a night rating gives you the most flexibility, as sunset will no longer prevent you from flying. 100 hrs of flying time post licence is required.',
    cta: 'Learn More',
    link: '/training'
  },
  {
    id: 5,
    title: 'Self-Fly Hire',
    image: '/assets/images/used-aircraft/r66/hkcc.jpg',
    description: 'With an impressive fleet of over 30 helicopters, HQ will certainly be able to facilitate your flying requirements on a short or long term basis.',
    cta: 'Learn More',
    link: '/services'
  }
];

// ============================================
// V1: BASE (Original V14)
// ============================================
function Carousel1({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--1">
      <div className="carousel__left">
        <div className="carousel__images">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <div className="carousel__counter"><span className="carousel__current">{String(activeSlide + 1).padStart(2, '0')}</span></div>
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--1 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--1 .carousel__left { position: relative; }
        .carousel--1 .carousel__images { position: absolute; inset: 0; }
        .carousel--1 .carousel__images img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.6s ease; }
        .carousel--1 .carousel__images img.active { opacity: 1; }
        .carousel--1 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--1 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--1 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--1 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--1 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--1 .carousel__content { flex: 1; }
        .carousel--1 .carousel__counter { font-family: 'Share Tech Mono', monospace; margin-bottom: 1rem; }
        .carousel--1 .carousel__current { font-size: 4rem; font-weight: 700; color: rgba(255,255,255,0.6); line-height: 1; }
        .carousel--1 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--1 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--1 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--1 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--1 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--1 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V2: GIANT NUMBER OVERLAY
// ============================================
function Carousel2({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--2">
      <div className="carousel__left">
        <div className="carousel__images">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
        </div>
        <div className="carousel__number-overlay">
          <span key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span>
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--2 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--2 .carousel__left { position: relative; }
        .carousel--2 .carousel__images { position: absolute; inset: 0; }
        .carousel--2 .carousel__images img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.6s ease; }
        .carousel--2 .carousel__images img.active { opacity: 1; }
        .carousel--2 .carousel__number-overlay { position: absolute; bottom: 2rem; left: 2rem; font-family: 'Share Tech Mono', monospace; font-size: 8rem; font-weight: 700; color: rgba(255,255,255,0.15); line-height: 1; z-index: 10; }
        .carousel--2 .carousel__number-overlay span { display: block; animation: slideUp2 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        @keyframes slideUp2 { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        .carousel--2 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--2 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--2 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--2 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--2 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--2 .carousel__content { flex: 1; }
        .carousel--2 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--2 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--2 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--2 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--2 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--2 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V3: INSET IMAGE WITH SHADOW
// ============================================
function Carousel3({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--3">
      <div className="carousel__left">
        <div className="carousel__image-frame">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <div className="carousel__counter"><span className="carousel__current">{String(activeSlide + 1).padStart(2, '0')}</span></div>
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--3 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--3 .carousel__left { position: relative; display: flex; align-items: center; justify-content: center; padding: 2.5rem; }
        .carousel--3 .carousel__image-frame { position: relative; width: 100%; height: 100%; border-radius: 8px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1); }
        .carousel--3 .carousel__image-frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); transform: scale(1.05); }
        .carousel--3 .carousel__image-frame img.active { opacity: 1; transform: scale(1); }
        .carousel--3 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--3 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--3 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--3 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--3 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--3 .carousel__content { flex: 1; }
        .carousel--3 .carousel__counter { font-family: 'Share Tech Mono', monospace; margin-bottom: 1rem; }
        .carousel--3 .carousel__current { font-size: 4rem; font-weight: 700; color: rgba(255,255,255,0.6); line-height: 1; }
        .carousel--3 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--3 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--3 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--3 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--3 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--3 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V4: NUMBER BESIDE TITLE
// ============================================
function Carousel4({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--4">
      <div className="carousel__left">
        <div className="carousel__images">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <div className="carousel__title-row">
            <span className="carousel__current" key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span>
            <h3>{slides[activeSlide].title}</h3>
          </div>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--4 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--4 .carousel__left { position: relative; }
        .carousel--4 .carousel__images { position: absolute; inset: 0; }
        .carousel--4 .carousel__images img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.6s ease; }
        .carousel--4 .carousel__images img.active { opacity: 1; }
        .carousel--4 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--4 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--4 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--4 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--4 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--4 .carousel__content { flex: 1; }
        .carousel--4 .carousel__title-row { display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1rem; }
        .carousel--4 .carousel__current { font-family: 'Share Tech Mono', monospace; font-size: 3rem; font-weight: 700; color: rgba(255,255,255,0.3); line-height: 1; animation: fadeNum4 0.4s ease; }
        @keyframes fadeNum4 { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .carousel--4 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0; text-transform: uppercase; }
        .carousel--4 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--4 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--4 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--4 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--4 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V5: SLIDE ANIMATION + FLOATING NUMBER
// ============================================
function Carousel5({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--5">
      <div className="carousel__left">
        <div className="carousel__images">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
        </div>
      </div>
      <div className="carousel__floating-number" key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--5 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; position: relative; }
        .carousel--5 .carousel__left { position: relative; overflow: hidden; }
        .carousel--5 .carousel__images { position: absolute; inset: 0; }
        .carousel--5 .carousel__images img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transform: translateX(-30px); transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1); }
        .carousel--5 .carousel__images img.active { opacity: 1; transform: translateX(0); }
        .carousel--5 .carousel__floating-number { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: 'Share Tech Mono', monospace; font-size: 12rem; font-weight: 700; color: rgba(255,255,255,0.08); z-index: 5; pointer-events: none; animation: pulseNum5 0.6s ease; }
        @keyframes pulseNum5 { 0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
        .carousel--5 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; position: relative; z-index: 10; }
        .carousel--5 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--5 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--5 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--5 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--5 .carousel__content { flex: 1; }
        .carousel--5 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--5 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--5 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--5 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--5 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--5 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V6: SMALLER IMAGE WITH GLOW
// ============================================
function Carousel6({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--6">
      <div className="carousel__left">
        <div className="carousel__image-glow">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__counter"><span className="carousel__current" key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span></div>
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--6 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--6 .carousel__left { position: relative; display: flex; align-items: center; justify-content: center; padding: 3rem; }
        .carousel--6 .carousel__image-glow { position: relative; width: 85%; aspect-ratio: 4/3; border-radius: 12px; overflow: hidden; box-shadow: 0 0 60px rgba(255,255,255,0.1), 0 0 100px rgba(255,255,255,0.05); }
        .carousel--6 .carousel__image-glow img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.5s ease; }
        .carousel--6 .carousel__image-glow img.active { opacity: 1; }
        .carousel--6 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--6 .carousel__counter { font-family: 'Share Tech Mono', monospace; margin-bottom: 1.5rem; overflow: hidden; }
        .carousel--6 .carousel__current { font-size: 5rem; font-weight: 700; color: rgba(255,255,255,0.15); line-height: 1; display: block; animation: dropIn6 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        @keyframes dropIn6 { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .carousel--6 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--6 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--6 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--6 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--6 .carousel__content { flex: 1; }
        .carousel--6 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--6 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--6 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--6 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--6 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--6 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V7: VERTICAL NUMBER + ZOOM IMAGE
// ============================================
function Carousel7({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--7">
      <div className="carousel__number-bar">
        <span key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span>
      </div>
      <div className="carousel__left">
        <div className="carousel__images">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--7 { display: grid; grid-template-columns: 60px 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--7 .carousel__number-bar { background: #111; display: flex; align-items: center; justify-content: center; border-right: 1px solid rgba(255,255,255,0.1); }
        .carousel--7 .carousel__number-bar span { font-family: 'Share Tech Mono', monospace; font-size: 1.5rem; font-weight: 700; color: rgba(255,255,255,0.5); writing-mode: vertical-rl; text-orientation: mixed; animation: fadeIn7 0.3s ease; }
        @keyframes fadeIn7 { from { opacity: 0; } to { opacity: 1; } }
        .carousel--7 .carousel__left { position: relative; overflow: hidden; }
        .carousel--7 .carousel__images { position: absolute; inset: 0; }
        .carousel--7 .carousel__images img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transform: scale(1.1); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .carousel--7 .carousel__images img.active { opacity: 1; transform: scale(1); }
        .carousel--7 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--7 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--7 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--7 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--7 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--7 .carousel__content { flex: 1; }
        .carousel--7 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--7 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--7 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--7 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--7 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--7 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V8: GRADIENT OVERLAY + BOTTOM NUMBER
// ============================================
function Carousel8({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--8">
      <div className="carousel__left">
        <div className="carousel__images">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
        </div>
        <div className="carousel__gradient"></div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__bottom">
          <div className="carousel__sticks">
            {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
          </div>
          <div className="carousel__counter"><span key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span></div>
        </div>
      </div>
      <style>{`
        .carousel--8 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--8 .carousel__left { position: relative; }
        .carousel--8 .carousel__images { position: absolute; inset: 0; }
        .carousel--8 .carousel__images img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.6s ease; }
        .carousel--8 .carousel__images img.active { opacity: 1; }
        .carousel--8 .carousel__gradient { position: absolute; inset: 0; background: linear-gradient(135deg, transparent 50%, rgba(26,26,26,0.9) 100%); pointer-events: none; }
        .carousel--8 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--8 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--8 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--8 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--8 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--8 .carousel__content { flex: 1; }
        .carousel--8 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--8 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--8 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--8 .carousel__bottom { display: flex; align-items: center; gap: 2rem; margin-top: auto; }
        .carousel--8 .carousel__sticks { display: flex; gap: 0.5rem; flex: 1; }
        .carousel--8 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--8 .carousel__stick.active { background: #fff; }
        .carousel--8 .carousel__counter span { font-family: 'Share Tech Mono', monospace; font-size: 2rem; font-weight: 700; color: rgba(255,255,255,0.4); animation: count8 0.3s ease; }
        @keyframes count8 { from { opacity: 0; transform: scale(1.5); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}

// ============================================
// V9: CIRCLE NUMBER BADGE
// ============================================
function Carousel9({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--9">
      <div className="carousel__left">
        <div className="carousel__images">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
        </div>
        <div className="carousel__badge" key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--9 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--9 .carousel__left { position: relative; }
        .carousel--9 .carousel__images { position: absolute; inset: 0; }
        .carousel--9 .carousel__images img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.6s ease; }
        .carousel--9 .carousel__images img.active { opacity: 1; }
        .carousel--9 .carousel__badge { position: absolute; top: 2rem; right: 2rem; width: 70px; height: 70px; border-radius: 50%; background: rgba(255,255,255,0.95); display: flex; align-items: center; justify-content: center; font-family: 'Share Tech Mono', monospace; font-size: 1.5rem; font-weight: 700; color: #1a1a1a; box-shadow: 0 10px 40px rgba(0,0,0,0.3); animation: popIn9 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes popIn9 { from { transform: scale(0); } to { transform: scale(1); } }
        .carousel--9 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--9 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--9 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--9 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--9 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--9 .carousel__content { flex: 1; }
        .carousel--9 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--9 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--9 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--9 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--9 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--9 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V10: CROSSFADE + OUTLINE NUMBER
// ============================================
function Carousel10({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--10">
      <div className="carousel__left">
        <div className="carousel__images">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <div className="carousel__counter"><span className="carousel__current" key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span></div>
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--10 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--10 .carousel__left { position: relative; }
        .carousel--10 .carousel__images { position: absolute; inset: 0; }
        .carousel--10 .carousel__images img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; filter: grayscale(100%); transition: all 0.8s ease; }
        .carousel--10 .carousel__images img.active { opacity: 1; filter: grayscale(0%); }
        .carousel--10 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--10 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--10 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--10 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--10 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--10 .carousel__content { flex: 1; }
        .carousel--10 .carousel__counter { font-family: 'Share Tech Mono', monospace; margin-bottom: 1rem; }
        .carousel--10 .carousel__current { font-size: 5rem; font-weight: 700; line-height: 1; color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.3); animation: stroke10 0.5s ease; }
        @keyframes stroke10 { from { opacity: 0; -webkit-text-stroke-width: 0px; } to { opacity: 1; -webkit-text-stroke-width: 2px; } }
        .carousel--10 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--10 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--10 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--10 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--10 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--10 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V11: SPLIT DIAGONAL + NUMBER
// ============================================
function Carousel11({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--11">
      <div className="carousel__left">
        <div className="carousel__images">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
        </div>
        <div className="carousel__diagonal"></div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <div className="carousel__counter"><span key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span></div>
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--11 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--11 .carousel__left { position: relative; }
        .carousel--11 .carousel__images { position: absolute; inset: 0; }
        .carousel--11 .carousel__images img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.6s ease; }
        .carousel--11 .carousel__images img.active { opacity: 1; }
        .carousel--11 .carousel__diagonal { position: absolute; top: 0; right: -50px; bottom: 0; width: 100px; background: #1a1a1a; transform: skewX(-5deg); }
        .carousel--11 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--11 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--11 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--11 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--11 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--11 .carousel__content { flex: 1; }
        .carousel--11 .carousel__counter { font-family: 'Share Tech Mono', monospace; margin-bottom: 1rem; }
        .carousel--11 .carousel__counter span { font-size: 4rem; font-weight: 700; color: rgba(255,255,255,0.6); line-height: 1; display: block; animation: slideRight11 0.4s ease; }
        @keyframes slideRight11 { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        .carousel--11 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--11 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--11 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--11 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--11 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--11 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V12: WIDER IMAGE + COMPACT TEXT
// ============================================
function Carousel12({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--12">
      <div className="carousel__left">
        <div className="carousel__images">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__counter"><span key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span></div>
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--12 { display: grid; grid-template-columns: 1.4fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--12 .carousel__left { position: relative; }
        .carousel--12 .carousel__images { position: absolute; inset: 0; }
        .carousel--12 .carousel__images img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: all 0.5s ease; }
        .carousel--12 .carousel__images img.active { opacity: 1; }
        .carousel--12 .carousel__right { padding: 2rem 2.5rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--12 .carousel__counter { font-family: 'Share Tech Mono', monospace; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; }
        .carousel--12 .carousel__counter span { font-size: 6rem; font-weight: 700; color: rgba(255,255,255,0.1); line-height: 1; animation: fade12 0.4s ease; }
        @keyframes fade12 { from { opacity: 0; } to { opacity: 1; } }
        .carousel--12 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
        .carousel--12 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.6rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--12 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--12 .carousel__tab.active { color: #fff; background: rgba(255,255,255,0.1); border-radius: 4px; }
        .carousel--12 .carousel__content { flex: 1; }
        .carousel--12 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--12 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 1.5rem; font-size: 0.9rem; }
        .carousel--12 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--12 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--12 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--12 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V13: IMAGE BLUR TRANSITION
// ============================================
function Carousel13({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--13">
      <div className="carousel__left">
        <div className="carousel__images">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <div className="carousel__counter"><span key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span></div>
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--13 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--13 .carousel__left { position: relative; }
        .carousel--13 .carousel__images { position: absolute; inset: 0; }
        .carousel--13 .carousel__images img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; filter: blur(10px); transform: scale(1.1); transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1); }
        .carousel--13 .carousel__images img.active { opacity: 1; filter: blur(0); transform: scale(1); }
        .carousel--13 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--13 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--13 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--13 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--13 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--13 .carousel__content { flex: 1; }
        .carousel--13 .carousel__counter { font-family: 'Share Tech Mono', monospace; margin-bottom: 1rem; }
        .carousel--13 .carousel__counter span { font-size: 4rem; font-weight: 700; color: rgba(255,255,255,0.6); line-height: 1; display: block; animation: blur13 0.5s ease; }
        @keyframes blur13 { from { filter: blur(10px); opacity: 0; } to { filter: blur(0); opacity: 1; } }
        .carousel--13 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--13 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--13 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--13 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--13 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--13 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V14: STACKED CARDS EFFECT
// ============================================
function Carousel14({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--14">
      <div className="carousel__left">
        <div className="carousel__stack">
          {slides.map((slide, idx) => (
            <div key={idx} className={`carousel__card ${idx === activeSlide ? 'active' : ''} ${idx < activeSlide ? 'passed' : ''}`}>
              <img src={slide.image} alt={slide.title} />
            </div>
          ))}
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <div className="carousel__counter"><span key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span></div>
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--14 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--14 .carousel__left { position: relative; display: flex; align-items: center; justify-content: center; padding: 3rem; }
        .carousel--14 .carousel__stack { position: relative; width: 85%; aspect-ratio: 4/3; }
        .carousel--14 .carousel__card { position: absolute; inset: 0; border-radius: 8px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4); transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); transform: translateY(20px) scale(0.9); opacity: 0.3; }
        .carousel--14 .carousel__card.active { transform: translateY(0) scale(1); opacity: 1; z-index: 10; }
        .carousel--14 .carousel__card.passed { transform: translateY(-20px) scale(0.95); opacity: 0; z-index: 5; }
        .carousel--14 .carousel__card img { width: 100%; height: 100%; object-fit: cover; }
        .carousel--14 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--14 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--14 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--14 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--14 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--14 .carousel__content { flex: 1; }
        .carousel--14 .carousel__counter { font-family: 'Share Tech Mono', monospace; margin-bottom: 1rem; }
        .carousel--14 .carousel__counter span { font-size: 4rem; font-weight: 700; color: rgba(255,255,255,0.6); line-height: 1; display: block; animation: flip14 0.4s ease; }
        @keyframes flip14 { from { transform: rotateX(90deg); opacity: 0; } to { transform: rotateX(0); opacity: 1; } }
        .carousel--14 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--14 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--14 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--14 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--14 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--14 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V15: SPLIT IMAGE REVEAL
// ============================================
function Carousel15({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--15">
      <div className="carousel__left">
        <div className="carousel__reveal" key={activeSlide}>
          <img src={slides[activeSlide].image} alt={slides[activeSlide].title} />
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <div className="carousel__counter"><span key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span></div>
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--15 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--15 .carousel__left { position: relative; overflow: hidden; }
        .carousel--15 .carousel__reveal { position: absolute; inset: 0; animation: reveal15 0.7s cubic-bezier(0.4, 0, 0.2, 1); }
        @keyframes reveal15 { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
        .carousel--15 .carousel__reveal img { width: 100%; height: 100%; object-fit: cover; }
        .carousel--15 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--15 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--15 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--15 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--15 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--15 .carousel__content { flex: 1; }
        .carousel--15 .carousel__counter { font-family: 'Share Tech Mono', monospace; margin-bottom: 1rem; overflow: hidden; }
        .carousel--15 .carousel__counter span { font-size: 4rem; font-weight: 700; color: rgba(255,255,255,0.6); line-height: 1; display: block; animation: slideUp15 0.5s ease; }
        @keyframes slideUp15 { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .carousel--15 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--15 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--15 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--15 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--15 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--15 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V16: POLAROID STYLE
// ============================================
function Carousel16({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--16">
      <div className="carousel__left">
        <div className="carousel__polaroid" key={activeSlide}>
          <img src={slides[activeSlide].image} alt={slides[activeSlide].title} />
          <div className="carousel__polaroid-number">{String(activeSlide + 1).padStart(2, '0')}</div>
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--16 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--16 .carousel__left { position: relative; display: flex; align-items: center; justify-content: center; padding: 3rem; background: #111; }
        .carousel--16 .carousel__polaroid { background: #fff; padding: 12px 12px 50px 12px; border-radius: 4px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); animation: drop16 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); transform-origin: center; }
        @keyframes drop16 { from { transform: scale(0.8) rotate(-5deg); opacity: 0; } to { transform: scale(1) rotate(0deg); opacity: 1; } }
        .carousel--16 .carousel__polaroid img { width: 280px; aspect-ratio: 4/3; object-fit: cover; display: block; }
        .carousel--16 .carousel__polaroid-number { font-family: 'Share Tech Mono', monospace; font-size: 1.2rem; color: #999; text-align: center; margin-top: 12px; }
        .carousel--16 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--16 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--16 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--16 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--16 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--16 .carousel__content { flex: 1; }
        .carousel--16 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--16 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--16 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--16 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--16 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--16 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V17: CINEMA BARS + BIG NUMBER
// ============================================
function Carousel17({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--17">
      <div className="carousel__left">
        <div className="carousel__cinema">
          <div className="carousel__bar-top"></div>
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
          <div className="carousel__bar-bottom"></div>
          <div className="carousel__cinema-number" key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</div>
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--17 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--17 .carousel__left { position: relative; }
        .carousel--17 .carousel__cinema { position: absolute; inset: 0; }
        .carousel--17 .carousel__cinema img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.6s ease; }
        .carousel--17 .carousel__cinema img.active { opacity: 1; }
        .carousel--17 .carousel__bar-top, .carousel--17 .carousel__bar-bottom { position: absolute; left: 0; right: 0; height: 40px; background: #000; z-index: 5; }
        .carousel--17 .carousel__bar-top { top: 0; }
        .carousel--17 .carousel__bar-bottom { bottom: 0; }
        .carousel--17 .carousel__cinema-number { position: absolute; bottom: 50px; right: 20px; font-family: 'Share Tech Mono', monospace; font-size: 5rem; font-weight: 700; color: rgba(255,255,255,0.2); z-index: 10; animation: fade17 0.4s ease; }
        @keyframes fade17 { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .carousel--17 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--17 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--17 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--17 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--17 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--17 .carousel__content { flex: 1; }
        .carousel--17 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--17 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--17 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--17 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--17 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--17 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V18: MINIMAL + OFFSET IMAGE
// ============================================
function Carousel18({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--18">
      <div className="carousel__left">
        <div className="carousel__offset-wrap">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__counter"><span key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span></div>
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--18 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: visible; position: relative; }
        .carousel--18 .carousel__left { position: relative; display: flex; align-items: center; padding: 2rem; }
        .carousel--18 .carousel__offset-wrap { position: relative; width: calc(100% + 60px); aspect-ratio: 4/3; margin-left: -30px; border-radius: 8px; overflow: hidden; box-shadow: 30px 30px 60px rgba(0,0,0,0.4); }
        .carousel--18 .carousel__offset-wrap img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: all 0.5s ease; }
        .carousel--18 .carousel__offset-wrap img.active { opacity: 1; }
        .carousel--18 .carousel__right { padding: 3rem 3rem 3rem 4rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--18 .carousel__counter { font-family: 'Share Tech Mono', monospace; margin-bottom: 2rem; }
        .carousel--18 .carousel__counter span { font-size: 7rem; font-weight: 700; color: rgba(255,255,255,0.08); line-height: 1; display: block; animation: scale18 0.4s ease; }
        @keyframes scale18 { from { transform: scale(1.2); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .carousel--18 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
        .carousel--18 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--18 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--18 .carousel__tab.active { color: #fff; background: rgba(255,255,255,0.1); border-radius: 4px; }
        .carousel--18 .carousel__content { flex: 1; }
        .carousel--18 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--18 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--18 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--18 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--18 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--18 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V19: ROTATING NUMBER
// ============================================
function Carousel19({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--19">
      <div className="carousel__left">
        <div className="carousel__images">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <div className="carousel__counter"><span key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span></div>
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--19 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--19 .carousel__left { position: relative; }
        .carousel--19 .carousel__images { position: absolute; inset: 0; }
        .carousel--19 .carousel__images img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: all 0.6s ease; transform: rotate(-2deg) scale(1.1); }
        .carousel--19 .carousel__images img.active { opacity: 1; transform: rotate(0deg) scale(1); }
        .carousel--19 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--19 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--19 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--19 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--19 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--19 .carousel__content { flex: 1; }
        .carousel--19 .carousel__counter { font-family: 'Share Tech Mono', monospace; margin-bottom: 1rem; perspective: 500px; }
        .carousel--19 .carousel__counter span { font-size: 4rem; font-weight: 700; color: rgba(255,255,255,0.6); line-height: 1; display: block; animation: rotate19 0.5s ease; transform-origin: left center; }
        @keyframes rotate19 { from { transform: rotateY(-90deg); opacity: 0; } to { transform: rotateY(0); opacity: 1; } }
        .carousel--19 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--19 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--19 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--19 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--19 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--19 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V20: BORDER FRAME + TYPING NUMBER
// ============================================
function Carousel20({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--20">
      <div className="carousel__left">
        <div className="carousel__frame">
          {slides.map((slide, idx) => (
            <img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />
          ))}
          <div className="carousel__frame-border"></div>
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>
          ))}
        </div>
        <div className="carousel__content">
          <div className="carousel__counter"><span key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span></div>
          <h3>{slides[activeSlide].title}</h3>
          <p>{slides[activeSlide].description}</p>
          <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta} →</Link>
        </div>
        <div className="carousel__sticks">
          {slides.map((_, idx) => (<div key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} />))}
        </div>
      </div>
      <style>{`
        .carousel--20 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; min-height: 500px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--20 .carousel__left { position: relative; display: flex; align-items: center; justify-content: center; padding: 2.5rem; }
        .carousel--20 .carousel__frame { position: relative; width: 100%; height: 100%; }
        .carousel--20 .carousel__frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.5s ease; border-radius: 4px; }
        .carousel--20 .carousel__frame img.active { opacity: 1; }
        .carousel--20 .carousel__frame-border { position: absolute; inset: -8px; border: 2px solid rgba(255,255,255,0.2); border-radius: 8px; pointer-events: none; }
        .carousel--20 .carousel__right { padding: 3rem; display: flex; flex-direction: column; color: #fff; }
        .carousel--20 .carousel__tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 1rem; }
        .carousel--20 .carousel__tab { padding: 0.4rem 0.75rem; background: none; border: none; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s; }
        .carousel--20 .carousel__tab:hover { color: rgba(255,255,255,0.8); }
        .carousel--20 .carousel__tab.active { color: #fff; border-bottom: 2px solid #fff; margin-bottom: -1rem; padding-bottom: calc(0.4rem + 1rem - 2px); }
        .carousel--20 .carousel__content { flex: 1; }
        .carousel--20 .carousel__counter { font-family: 'Share Tech Mono', monospace; margin-bottom: 1rem; }
        .carousel--20 .carousel__counter span { font-size: 4rem; font-weight: 700; color: rgba(255,255,255,0.6); line-height: 1; display: inline-block; animation: type20 0.3s steps(2); }
        @keyframes type20 { from { width: 0; opacity: 0; } to { width: auto; opacity: 1; } }
        .carousel--20 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--20 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--20 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--20 .carousel__sticks { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--20 .carousel__stick { flex: 1; height: 3px; background: rgba(255,255,255,0.2); transition: background 0.3s; }
        .carousel--20 .carousel__stick.active { background: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V21: FADE (Original Carousel 1)
// ============================================
function Carousel21({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--21">
      <div className="carousel__slides">
        {slides.map((slide, idx) => (
          <div key={idx} className={`carousel__slide ${idx === activeSlide ? 'active' : ''}`}>
            <div className="carousel__image"><img src={slide.image} alt={slide.title} /></div>
            <div className="carousel__content">
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
              <Link to={slide.link} className="carousel__btn">{slide.cta}</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel__nav">
        <button onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)}>←</button>
        <div className="carousel__dots">
          {slides.map((_, idx) => (<button key={idx} className={`carousel__dot ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)} />))}
        </div>
        <button onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}>→</button>
      </div>
      <style>{`
        .carousel--21 { position: relative; max-width: 900px; margin: 0 auto; }
        .carousel--21 .carousel__slides { position: relative; height: 500px; }
        .carousel--21 .carousel__slide { position: absolute; inset: 0; display: flex; gap: 3rem; align-items: center; opacity: 0; transition: opacity 0.6s ease; pointer-events: none; }
        .carousel--21 .carousel__slide.active { opacity: 1; pointer-events: auto; }
        .carousel--21 .carousel__image { flex: 1; height: 100%; }
        .carousel--21 .carousel__image img { width: 100%; height: 100%; object-fit: cover; border-radius: 8px; }
        .carousel--21 .carousel__content { flex: 1; padding: 2rem; }
        .carousel--21 .carousel__content h3 { font-size: 2rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--21 .carousel__content p { color: #666; line-height: 1.8; margin: 0 0 2rem; }
        .carousel--21 .carousel__btn { display: inline-block; padding: 1rem 2rem; background: #1a1a1a; color: #fff; text-decoration: none; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.1em; transition: background 0.3s; }
        .carousel--21 .carousel__btn:hover { background: #333; }
        .carousel--21 .carousel__nav { display: flex; justify-content: center; align-items: center; gap: 2rem; margin-top: 2rem; }
        .carousel--21 .carousel__nav button { width: 40px; height: 40px; border: 1px solid #ddd; background: #fff; cursor: pointer; font-size: 1.2rem; transition: all 0.3s; }
        .carousel--21 .carousel__nav button:hover { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
        .carousel--21 .carousel__dots { display: flex; gap: 0.5rem; }
        .carousel--21 .carousel__dot { width: 10px; height: 10px; border-radius: 50%; border: 1px solid #ccc; background: transparent; cursor: pointer; padding: 0; transition: all 0.3s; }
        .carousel--21 .carousel__dot.active { background: #1a1a1a; border-color: #1a1a1a; }
      `}</style>
    </div>
  );
}

// ============================================
// V22: HORIZONTAL SLIDE (Original Carousel 2)
// ============================================
function Carousel22({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--22">
      <div className="carousel__track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
        {slides.map((slide, idx) => (
          <div key={idx} className="carousel__slide">
            <div className="carousel__image"><img src={slide.image} alt={slide.title} /></div>
            <div className="carousel__content">
              <span className="carousel__num">{String(idx + 1).padStart(2, '0')}</span>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
              <Link to={slide.link} className="carousel__btn">{slide.cta} →</Link>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel__arrow carousel__arrow--prev" onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)}>‹</button>
      <button className="carousel__arrow carousel__arrow--next" onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}>›</button>
      <style>{`
        .carousel--22 { position: relative; max-width: 1000px; margin: 0 auto; overflow: hidden; }
        .carousel--22 .carousel__track { display: flex; transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .carousel--22 .carousel__slide { flex: 0 0 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; padding: 2rem; box-sizing: border-box; }
        .carousel--22 .carousel__image { aspect-ratio: 4/3; overflow: hidden; border-radius: 12px; }
        .carousel--22 .carousel__image img { width: 100%; height: 100%; object-fit: cover; }
        .carousel--22 .carousel__content { display: flex; flex-direction: column; justify-content: center; }
        .carousel--22 .carousel__num { font-size: 4rem; font-weight: 100; color: #e0e0e0; line-height: 1; margin-bottom: 1rem; }
        .carousel--22 .carousel__content h3 { font-size: 1.75rem; font-weight: 600; margin: 0 0 1rem; }
        .carousel--22 .carousel__content p { color: #666; line-height: 1.7; margin: 0 0 2rem; }
        .carousel--22 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #1a1a1a; text-decoration: none; font-weight: 500; border-bottom: 2px solid #1a1a1a; padding-bottom: 0.25rem; width: fit-content; transition: gap 0.3s; }
        .carousel--22 .carousel__btn:hover { gap: 1rem; }
        .carousel--22 .carousel__arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 50px; height: 50px; border: none; background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-radius: 50%; font-size: 2rem; cursor: pointer; z-index: 10; transition: all 0.3s; }
        .carousel--22 .carousel__arrow:hover { background: #1a1a1a; color: #fff; }
        .carousel--22 .carousel__arrow--prev { left: 1rem; }
        .carousel--22 .carousel__arrow--next { right: 1rem; }
      `}</style>
    </div>
  );
}

// ============================================
// V23: COVER FLOW 3D (Original Carousel 3)
// ============================================
function Carousel23({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--23">
      <div className="carousel__stage">
        {slides.map((slide, idx) => {
          const offset = idx - activeSlide;
          const isActive = idx === activeSlide;
          const translateX = offset * 200;
          const translateZ = isActive ? 100 : -100;
          const rotateY = offset * -25;
          const opacity = Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.3;
          const scale = isActive ? 1 : 0.8;
          return (
            <div key={idx} className={`carousel__card ${isActive ? 'active' : ''}`} style={{ transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`, opacity, zIndex: 10 - Math.abs(offset) }} onClick={() => setActiveSlide(idx)}>
              <img src={slide.image} alt={slide.title} />
              <div className="carousel__card-info"><h3>{slide.title}</h3></div>
            </div>
          );
        })}
      </div>
      <div className="carousel__info">
        <h3>{slides[activeSlide].title}</h3>
        <p>{slides[activeSlide].description}</p>
        <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta}</Link>
      </div>
      <div className="carousel__controls">
        <button onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)}>←</button>
        <span>{activeSlide + 1} / {slides.length}</span>
        <button onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}>→</button>
      </div>
      <style>{`
        .carousel--23 { max-width: 1200px; margin: 0 auto; text-align: center; }
        .carousel--23 .carousel__stage { height: 350px; perspective: 1000px; display: flex; align-items: center; justify-content: center; position: relative; }
        .carousel--23 .carousel__card { position: absolute; width: 300px; height: 280px; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.2); transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; }
        .carousel--23 .carousel__card img { width: 100%; height: 100%; object-fit: cover; }
        .carousel--23 .carousel__card-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 1.5rem; background: linear-gradient(transparent, rgba(0,0,0,0.8)); color: #fff; }
        .carousel--23 .carousel__card-info h3 { margin: 0; font-size: 1rem; font-weight: 600; }
        .carousel--23 .carousel__card.active { cursor: default; }
        .carousel--23 .carousel__info { margin-top: 2rem; max-width: 500px; margin-left: auto; margin-right: auto; }
        .carousel--23 .carousel__info h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--23 .carousel__info p { color: #666; line-height: 1.7; margin: 0 0 1.5rem; }
        .carousel--23 .carousel__btn { display: inline-block; padding: 0.75rem 2rem; background: #1a1a1a; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; }
        .carousel--23 .carousel__controls { display: flex; justify-content: center; align-items: center; gap: 2rem; margin-top: 2rem; }
        .carousel--23 .carousel__controls button { width: 40px; height: 40px; border: 2px solid #1a1a1a; background: transparent; cursor: pointer; font-size: 1rem; transition: all 0.3s; }
        .carousel--23 .carousel__controls button:hover { background: #1a1a1a; color: #fff; }
        .carousel--23 .carousel__controls span { font-size: 0.9rem; color: #999; }
      `}</style>
    </div>
  );
}

// ============================================
// V24: CARD STACK (Original Carousel 4)
// ============================================
function Carousel24({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--24">
      <div className="carousel__deck">
        {slides.map((slide, idx) => {
          const offset = idx - activeSlide;
          const isActive = idx === activeSlide;
          const isPast = offset < 0;
          return (
            <div key={idx} className={`carousel__card ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`} style={{ transform: isPast ? `translateX(-120%) rotate(-5deg)` : `translateY(${offset * 15}px) scale(${1 - offset * 0.05})`, opacity: isPast ? 0 : Math.max(0, 1 - offset * 0.2), zIndex: slides.length - Math.abs(offset) }}>
              <div className="carousel__card-inner">
                <div className="carousel__image"><img src={slide.image} alt={slide.title} /></div>
                <div className="carousel__content">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                  {isActive && <Link to={slide.link} className="carousel__btn">{slide.cta}</Link>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="carousel__nav">
        <button onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)} disabled={activeSlide === 0}>Previous</button>
        <button onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}>Next →</button>
      </div>
      <style>{`
        .carousel--24 { max-width: 800px; margin: 0 auto; padding: 2rem; }
        .carousel--24 .carousel__deck { position: relative; height: 450px; }
        .carousel--24 .carousel__card { position: absolute; top: 0; left: 50%; width: 90%; max-width: 600px; transform: translateX(-50%); transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        .carousel--24 .carousel__card.past { pointer-events: none; }
        .carousel--24 .carousel__card-inner { background: #fff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.15); overflow: hidden; }
        .carousel--24 .carousel__image { height: 250px; overflow: hidden; }
        .carousel--24 .carousel__image img { width: 100%; height: 100%; object-fit: cover; }
        .carousel--24 .carousel__content { padding: 2rem; }
        .carousel--24 .carousel__content h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1rem; }
        .carousel--24 .carousel__content p { color: #666; line-height: 1.6; margin: 0 0 1.5rem; font-size: 0.95rem; }
        .carousel--24 .carousel__btn { display: inline-block; padding: 0.75rem 1.5rem; background: #1a1a1a; color: #fff; text-decoration: none; font-size: 0.8rem; border-radius: 4px; }
        .carousel--24 .carousel__nav { display: flex; justify-content: center; gap: 1rem; margin-top: 2rem; }
        .carousel--24 .carousel__nav button { padding: 0.75rem 2rem; background: transparent; border: 2px solid #1a1a1a; cursor: pointer; font-size: 0.85rem; font-weight: 500; transition: all 0.3s; }
        .carousel--24 .carousel__nav button:hover:not(:disabled) { background: #1a1a1a; color: #fff; }
        .carousel--24 .carousel__nav button:disabled { opacity: 0.3; cursor: not-allowed; }
      `}</style>
    </div>
  );
}

// ============================================
// V25: TABS + CENTER FOCUS (Original Carousel 5)
// ============================================
function Carousel25({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--25">
      <div className="carousel__tabs">
        {slides.map((slide, idx) => (<button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>{slide.title}</button>))}
      </div>
      <div className="carousel__body">
        <button className="carousel__arrow carousel__arrow--prev" onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)}>‹</button>
        <div className="carousel__viewport">
          {slides.map((slide, idx) => {
            const offset = idx - activeSlide;
            const isActive = idx === activeSlide;
            const isPrev = offset === -1 || (activeSlide === 0 && idx === slides.length - 1);
            const isNext = offset === 1 || (activeSlide === slides.length - 1 && idx === 0);
            let translateX = '0%'; let scale = 0.7; let opacity = 0;
            if (isActive) { translateX = '0%'; scale = 1; opacity = 1; }
            else if (isPrev) { translateX = '-85%'; scale = 0.85; opacity = 0.5; }
            else if (isNext) { translateX = '85%'; scale = 0.85; opacity = 0.5; }
            return (
              <div key={idx} className={`carousel__slide ${isActive ? 'active' : ''}`} style={{ transform: `translateX(${translateX}) scale(${scale})`, opacity, zIndex: isActive ? 10 : 5 }} onClick={() => !isActive && setActiveSlide(idx)}>
                <img src={slide.image} alt={slide.title} />
                <div className="carousel__overlay"><h3>{slide.title}</h3></div>
              </div>
            );
          })}
        </div>
        <button className="carousel__arrow carousel__arrow--next" onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}>›</button>
      </div>
      <div className="carousel__info">
        <p>{slides[activeSlide].description}</p>
        <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta}</Link>
      </div>
      <style>{`
        .carousel--25 { max-width: 1100px; margin: 0 auto; }
        .carousel--25 .carousel__tabs { display: flex; justify-content: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 1px solid #e0e0e0; padding-bottom: 1rem; }
        .carousel--25 .carousel__tab { padding: 0.5rem 1rem; background: none; border: none; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #999; cursor: pointer; transition: color 0.3s; }
        .carousel--25 .carousel__tab:hover { color: #333; }
        .carousel--25 .carousel__tab.active { color: #1a1a1a; border-bottom: 2px solid #1a1a1a; margin-bottom: -1rem; padding-bottom: calc(0.5rem + 1rem - 2px); }
        .carousel--25 .carousel__body { position: relative; display: flex; align-items: center; justify-content: center; }
        .carousel--25 .carousel__viewport { position: relative; width: 100%; height: 400px; overflow: hidden; }
        .carousel--25 .carousel__slide { position: absolute; top: 0; left: 50%; width: 55%; height: 100%; margin-left: -27.5%; border-radius: 8px; overflow: hidden; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; }
        .carousel--25 .carousel__slide.active { cursor: default; }
        .carousel--25 .carousel__slide img { width: 100%; height: 100%; object-fit: cover; }
        .carousel--25 .carousel__overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; background: linear-gradient(transparent, rgba(0,0,0,0.7)); color: #fff; }
        .carousel--25 .carousel__overlay h3 { margin: 0; font-size: 1.25rem; }
        .carousel--25 .carousel__arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 45px; height: 45px; border: none; background: rgba(255,255,255,0.95); border-radius: 50%; font-size: 1.5rem; cursor: pointer; z-index: 20; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: all 0.3s; }
        .carousel--25 .carousel__arrow:hover { background: #1a1a1a; color: #fff; }
        .carousel--25 .carousel__arrow--prev { left: 1rem; }
        .carousel--25 .carousel__arrow--next { right: 1rem; }
        .carousel--25 .carousel__info { text-align: center; max-width: 600px; margin: 2rem auto 0; }
        .carousel--25 .carousel__info p { color: #666; line-height: 1.7; margin: 0 0 1.5rem; }
        .carousel--25 .carousel__btn { display: inline-block; padding: 1rem 2.5rem; background: transparent; color: #1a1a1a; text-decoration: none; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; border: 2px solid #1a1a1a; transition: all 0.3s; }
        .carousel--25 .carousel__btn:hover { background: #1a1a1a; color: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V26: VERTICAL SIDEBAR (Original Carousel 6)
// ============================================
function Carousel26({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--26">
      <div className="carousel__sidebar">
        {slides.map((slide, idx) => (
          <button key={idx} className={`carousel__sidebar-item ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>
            <span className="carousel__sidebar-num">{String(idx + 1).padStart(2, '0')}</span>
            <span className="carousel__sidebar-title">{slide.title}</span>
          </button>
        ))}
      </div>
      <div className="carousel__main">
        <div className="carousel__track" style={{ transform: `translateY(-${activeSlide * 100}%)` }}>
          {slides.map((slide, idx) => (
            <div key={idx} className="carousel__slide">
              <div className="carousel__image"><img src={slide.image} alt={slide.title} /></div>
              <div className="carousel__content">
                <span className="carousel__label">Training Course</span>
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
                <Link to={slide.link} className="carousel__btn">{slide.cta}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .carousel--26 { display: flex; max-width: 1100px; margin: 0 auto; height: 500px; gap: 2rem; }
        .carousel--26 .carousel__sidebar { width: 200px; display: flex; flex-direction: column; gap: 0.5rem; flex-shrink: 0; }
        .carousel--26 .carousel__sidebar-item { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: transparent; border: none; text-align: left; cursor: pointer; transition: all 0.3s; border-left: 3px solid transparent; }
        .carousel--26 .carousel__sidebar-item:hover { background: #f5f5f5; }
        .carousel--26 .carousel__sidebar-item.active { background: #f5f5f5; border-left-color: #1a1a1a; }
        .carousel--26 .carousel__sidebar-num { font-size: 0.75rem; color: #999; font-family: monospace; }
        .carousel--26 .carousel__sidebar-title { font-size: 0.85rem; font-weight: 500; }
        .carousel--26 .carousel__main { flex: 1; overflow: hidden; border-radius: 12px; }
        .carousel--26 .carousel__track { height: 100%; transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .carousel--26 .carousel__slide { height: 100%; display: grid; grid-template-columns: 1fr 1fr; }
        .carousel--26 .carousel__image { height: 100%; }
        .carousel--26 .carousel__image img { width: 100%; height: 100%; object-fit: cover; }
        .carousel--26 .carousel__content { padding: 3rem; display: flex; flex-direction: column; justify-content: center; background: #f9f9f9; }
        .carousel--26 .carousel__label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.2em; color: #999; margin-bottom: 1rem; }
        .carousel--26 .carousel__content h3 { font-size: 1.75rem; font-weight: 700; margin: 0 0 1rem; }
        .carousel--26 .carousel__content p { color: #666; line-height: 1.7; margin: 0 0 2rem; }
        .carousel--26 .carousel__btn { display: inline-block; padding: 0.75rem 1.5rem; background: #1a1a1a; color: #fff; text-decoration: none; font-size: 0.8rem; width: fit-content; }
      `}</style>
    </div>
  );
}

// ============================================
// V27: FILMSTRIP (Original Carousel 7)
// ============================================
function Carousel27({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--27">
      <div className="carousel__content">
        <span className="carousel__counter">{String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        <h3>{slides[activeSlide].title}</h3>
        <p>{slides[activeSlide].description}</p>
        <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta}</Link>
      </div>
      <div className="carousel__strip-container">
        <div className="carousel__strip" style={{ transform: `translateX(calc(-${activeSlide * 180}px + 50% - 90px))` }}>
          {slides.map((slide, idx) => (
            <div key={idx} className={`carousel__thumb ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>
              <img src={slide.image} alt={slide.title} />
              <div className="carousel__thumb-overlay"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel__nav">
        <button onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)}>← Previous</button>
        <button onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}>Next →</button>
      </div>
      <style>{`
        .carousel--27 { max-width: 1000px; margin: 0 auto; text-align: center; }
        .carousel--27 .carousel__content { margin-bottom: 3rem; }
        .carousel--27 .carousel__counter { font-family: monospace; font-size: 0.85rem; color: #999; margin-bottom: 1rem; display: block; }
        .carousel--27 .carousel__content h3 { font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--27 .carousel__content p { max-width: 500px; margin: 0 auto 2rem; color: #666; line-height: 1.7; }
        .carousel--27 .carousel__btn { display: inline-block; padding: 1rem 2rem; background: #1a1a1a; color: #fff; text-decoration: none; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em; }
        .carousel--27 .carousel__strip-container { overflow: hidden; padding: 1rem 0; }
        .carousel--27 .carousel__strip { display: flex; gap: 1rem; transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); width: fit-content; }
        .carousel--27 .carousel__thumb { width: 160px; height: 120px; flex-shrink: 0; border-radius: 8px; overflow: hidden; cursor: pointer; position: relative; transition: all 0.3s; }
        .carousel--27 .carousel__thumb img { width: 100%; height: 100%; object-fit: cover; }
        .carousel--27 .carousel__thumb-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); transition: opacity 0.3s; }
        .carousel--27 .carousel__thumb:hover .carousel__thumb-overlay { opacity: 0.6; }
        .carousel--27 .carousel__thumb.active { transform: scale(1.1); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .carousel--27 .carousel__thumb.active .carousel__thumb-overlay { opacity: 0; }
        .carousel--27 .carousel__nav { display: flex; justify-content: center; gap: 2rem; margin-top: 2rem; }
        .carousel--27 .carousel__nav button { padding: 0.75rem 1.5rem; background: transparent; border: 1px solid #ddd; cursor: pointer; font-size: 0.85rem; transition: all 0.3s; }
        .carousel--27 .carousel__nav button:hover { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
      `}</style>
    </div>
  );
}

// ============================================
// V28: SPLIT SCREEN DARK (Original Carousel 8)
// ============================================
function Carousel28({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--28">
      <div className="carousel__left">
        <div className="carousel__images">
          {slides.map((slide, idx) => (<div key={idx} className={`carousel__image ${idx === activeSlide ? 'active' : ''}`}><img src={slide.image} alt={slide.title} /></div>))}
        </div>
      </div>
      <div className="carousel__right">
        <div className="carousel__content-stack">
          {slides.map((slide, idx) => (
            <div key={idx} className={`carousel__content ${idx === activeSlide ? 'active' : ''}`}>
              <span className="carousel__num">{String(idx + 1).padStart(2, '0')}</span>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
              <Link to={slide.link} className="carousel__btn">{slide.cta} →</Link>
            </div>
          ))}
        </div>
        <div className="carousel__progress">
          {slides.map((_, idx) => (<button key={idx} className={`carousel__progress-item ${idx === activeSlide ? 'active' : ''} ${idx < activeSlide ? 'past' : ''}`} onClick={() => setActiveSlide(idx)} />))}
        </div>
        <div className="carousel__nav">
          <button onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)}>←</button>
          <button onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}>→</button>
        </div>
      </div>
      <style>{`
        .carousel--28 { display: grid; grid-template-columns: 1fr 1fr; max-width: 1200px; margin: 0 auto; min-height: 550px; background: #1a1a1a; border-radius: 12px; overflow: hidden; }
        .carousel--28 .carousel__left { position: relative; overflow: hidden; }
        .carousel--28 .carousel__images { height: 100%; }
        .carousel--28 .carousel__image { position: absolute; inset: 0; opacity: 0; transition: opacity 0.6s ease, transform 0.6s ease; transform: scale(1.1); }
        .carousel--28 .carousel__image.active { opacity: 1; transform: scale(1); }
        .carousel--28 .carousel__image img { width: 100%; height: 100%; object-fit: cover; }
        .carousel--28 .carousel__right { padding: 4rem; display: flex; flex-direction: column; justify-content: center; color: #fff; position: relative; }
        .carousel--28 .carousel__content-stack { position: relative; min-height: 300px; }
        .carousel--28 .carousel__content { position: absolute; top: 0; left: 0; right: 0; opacity: 0; transform: translateY(20px); transition: all 0.5s ease; pointer-events: none; }
        .carousel--28 .carousel__content.active { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .carousel--28 .carousel__num { display: block; font-size: 3rem; font-weight: 100; color: rgba(255,255,255,0.2); margin-bottom: 1rem; }
        .carousel--28 .carousel__content h3 { font-size: 2rem; font-weight: 700; margin: 0 0 1rem; text-transform: uppercase; }
        .carousel--28 .carousel__content p { color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 2rem; }
        .carousel--28 .carousel__btn { display: inline-flex; align-items: center; gap: 0.5rem; color: #fff; text-decoration: none; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 0.25rem; }
        .carousel--28 .carousel__btn:hover { border-color: #fff; }
        .carousel--28 .carousel__progress { display: flex; gap: 0.5rem; margin-top: auto; }
        .carousel--28 .carousel__progress-item { flex: 1; height: 3px; background: rgba(255,255,255,0.2); border: none; cursor: pointer; transition: background 0.3s; }
        .carousel--28 .carousel__progress-item.active, .carousel--28 .carousel__progress-item.past { background: #fff; }
        .carousel--28 .carousel__nav { position: absolute; bottom: 4rem; right: 4rem; display: flex; gap: 0.5rem; }
        .carousel--28 .carousel__nav button { width: 40px; height: 40px; border: 1px solid rgba(255,255,255,0.3); background: transparent; color: #fff; cursor: pointer; font-size: 1rem; transition: all 0.3s; }
        .carousel--28 .carousel__nav button:hover { background: #fff; color: #1a1a1a; border-color: #fff; }
      `}</style>
    </div>
  );
}

// ============================================
// V29: MINIMAL ARROWS (Original Carousel 9)
// ============================================
function Carousel29({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--29">
      <div className="carousel__container">
        {slides.map((slide, idx) => (
          <div key={idx} className={`carousel__slide ${idx === activeSlide ? 'active' : ''}`}>
            <div className="carousel__inner">
              <div className="carousel__image"><img src={slide.image} alt={slide.title} /></div>
              <div className="carousel__content">
                <div className="carousel__header">
                  <span className="carousel__index">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="carousel__divider"></span>
                  <span className="carousel__total">{String(slides.length).padStart(2, '0')}</span>
                </div>
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
                <Link to={slide.link} className="carousel__btn">{slide.cta}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel__arrow carousel__arrow--prev" onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)}>
        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <button className="carousel__arrow carousel__arrow--next" onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}>
        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
      </button>
      <style>{`
        .carousel--29 { position: relative; max-width: 1000px; margin: 0 auto; padding: 0 4rem; }
        .carousel--29 .carousel__container { position: relative; overflow: hidden; }
        .carousel--29 .carousel__slide { display: none; }
        .carousel--29 .carousel__slide.active { display: block; animation: minimalFadeIn29 0.4s ease; }
        @keyframes minimalFadeIn29 { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .carousel--29 .carousel__inner { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: center; }
        .carousel--29 .carousel__image { aspect-ratio: 4/3; border-radius: 4px; overflow: hidden; }
        .carousel--29 .carousel__image img { width: 100%; height: 100%; object-fit: cover; }
        .carousel--29 .carousel__header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; font-family: monospace; font-size: 0.9rem; color: #999; }
        .carousel--29 .carousel__divider { width: 30px; height: 1px; background: #ddd; }
        .carousel--29 .carousel__content h3 { font-size: 2rem; font-weight: 600; margin: 0 0 1.5rem; line-height: 1.2; }
        .carousel--29 .carousel__content p { color: #666; line-height: 1.8; margin: 0 0 2rem; }
        .carousel--29 .carousel__btn { display: inline-block; padding: 1rem 2rem; background: #1a1a1a; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; }
        .carousel--29 .carousel__arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border: 1px solid #e0e0e0; background: #fff; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s; z-index: 10; }
        .carousel--29 .carousel__arrow:hover { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
        .carousel--29 .carousel__arrow--prev { left: 0; }
        .carousel--29 .carousel__arrow--next { right: 0; }
      `}</style>
    </div>
  );
}

// ============================================
// V30: EDITORIAL MAGAZINE (Original Carousel 10)
// ============================================
function Carousel30({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--30">
      <div className="carousel__hero">
        <div className="carousel__hero-images">
          {slides.map((slide, idx) => (<div key={idx} className={`carousel__hero-image ${idx === activeSlide ? 'active' : ''}`}><img src={slide.image} alt={slide.title} /></div>))}
        </div>
        <div className="carousel__hero-overlay">
          <span className="carousel__category">Training</span>
          <h2 className="carousel__title">{slides[activeSlide].title}</h2>
        </div>
      </div>
      <div className="carousel__bar">
        <div className="carousel__counter">
          <span className="carousel__current">{String(activeSlide + 1).padStart(2, '0')}</span>
          <span className="carousel__separator">/</span>
          <span className="carousel__total">{String(slides.length).padStart(2, '0')}</span>
        </div>
        <div className="carousel__description"><p>{slides[activeSlide].description}</p></div>
        <div className="carousel__actions"><Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta}</Link></div>
        <div className="carousel__controls">
          <button onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)}>Prev</button>
          <button onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}>Next</button>
        </div>
      </div>
      <div className="carousel__thumbnails">
        {slides.map((slide, idx) => (<button key={idx} className={`carousel__thumb ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}><img src={slide.image} alt={slide.title} /><span>{slide.title}</span></button>))}
      </div>
      <style>{`
        .carousel--30 { max-width: 1200px; margin: 0 auto; }
        .carousel--30 .carousel__hero { position: relative; height: 450px; overflow: hidden; border-radius: 8px; }
        .carousel--30 .carousel__hero-images { height: 100%; }
        .carousel--30 .carousel__hero-image { position: absolute; inset: 0; opacity: 0; transform: scale(1.05); transition: all 0.8s ease; }
        .carousel--30 .carousel__hero-image.active { opacity: 1; transform: scale(1); }
        .carousel--30 .carousel__hero-image img { width: 100%; height: 100%; object-fit: cover; }
        .carousel--30 .carousel__hero-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 4rem; background: linear-gradient(transparent, rgba(0,0,0,0.8)); color: #fff; }
        .carousel--30 .carousel__category { display: inline-block; padding: 0.25rem 0.75rem; background: #fff; color: #1a1a1a; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 1rem; }
        .carousel--30 .carousel__title { font-size: 3rem; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: -0.02em; }
        .carousel--30 .carousel__bar { display: grid; grid-template-columns: auto 1fr auto auto; gap: 3rem; align-items: center; padding: 2rem 0; border-bottom: 1px solid #e0e0e0; }
        .carousel--30 .carousel__counter { font-family: monospace; font-size: 1.25rem; display: flex; align-items: baseline; gap: 0.25rem; }
        .carousel--30 .carousel__counter .carousel__current { font-weight: 700; }
        .carousel--30 .carousel__separator, .carousel--30 .carousel__counter .carousel__total { color: #999; }
        .carousel--30 .carousel__description p { margin: 0; color: #666; line-height: 1.6; max-width: 400px; }
        .carousel--30 .carousel__btn { display: inline-block; padding: 0.75rem 1.5rem; background: #1a1a1a; color: #fff; text-decoration: none; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; white-space: nowrap; }
        .carousel--30 .carousel__controls { display: flex; gap: 0.5rem; }
        .carousel--30 .carousel__controls button { padding: 0.75rem 1.25rem; background: transparent; border: 1px solid #ddd; cursor: pointer; font-size: 0.8rem; transition: all 0.3s; }
        .carousel--30 .carousel__controls button:hover { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
        .carousel--30 .carousel__thumbnails { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1rem; margin-top: 2rem; }
        .carousel--30 .carousel__thumb { background: none; border: none; cursor: pointer; text-align: left; padding: 0; opacity: 0.5; transition: opacity 0.3s; }
        .carousel--30 .carousel__thumb:hover, .carousel--30 .carousel__thumb.active { opacity: 1; }
        .carousel--30 .carousel__thumb img { width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 4px; margin-bottom: 0.5rem; }
        .carousel--30 .carousel__thumb span { font-size: 0.75rem; font-weight: 500; }
      `}</style>
    </div>
  );
}

// ============================================
// V31: ORIGINAL V11 LAYOUT (Image | Divider | Content)
// ============================================
function Carousel31({ activeSlide, setActiveSlide }) {
  return (
    <div className="carousel carousel--31">
      <div className="carousel__tabs-wrapper">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>
              <span className="carousel__tab-num">{String(idx + 1).padStart(2, '0')}</span>
              <span className="carousel__tab-title">{slide.title}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="carousel__body">
        <div className="carousel__main">
          <div className="carousel__image">
            {slides.map((slide, idx) => (<img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />))}
          </div>
          <div className="carousel__divider"></div>
          <div className="carousel__content">
            <div className="carousel__counter"><span className="carousel__current" key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span></div>
            <div className="carousel__text-content" key={`text-${activeSlide}`}>
              <h3>{slides[activeSlide].title}</h3>
              <p>{slides[activeSlide].description}</p>
              <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta}</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel__sticks">
        {slides.map((_, idx) => (<button key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)} />))}
      </div>
      <style>{`
        .carousel--31 { max-width: 1000px; margin: 0 auto; }
        .carousel--31 .carousel__tabs-wrapper { position: relative; }
        .carousel--31 .carousel__tabs-wrapper::before, .carousel--31 .carousel__tabs-wrapper::after { content: ''; position: absolute; top: 0; bottom: 0; width: 60px; pointer-events: none; z-index: 1; }
        .carousel--31 .carousel__tabs-wrapper::before { left: 0; background: linear-gradient(to right, #faf9f6 0%, transparent 100%); }
        .carousel--31 .carousel__tabs-wrapper::after { right: 0; background: linear-gradient(to left, #faf9f6 0%, transparent 100%); }
        .carousel--31 .carousel__tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; border-bottom: 1px solid #e0e0e0; padding-bottom: 0.75rem; overflow-x: auto; scrollbar-width: none; padding-left: 40px; padding-right: 40px; }
        .carousel--31 .carousel__tabs::-webkit-scrollbar { display: none; }
        .carousel--31 .carousel__tab { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; background: none; border: none; cursor: pointer; transition: all 0.3s; flex-shrink: 0; white-space: nowrap; }
        .carousel--31 .carousel__tab-num { font-family: 'Share Tech Mono', monospace; font-size: 0.6rem; color: #bbb; transition: color 0.3s; }
        .carousel--31 .carousel__tab-title { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #999; transition: color 0.3s; }
        .carousel--31 .carousel__tab:hover .carousel__tab-num { color: #999; }
        .carousel--31 .carousel__tab:hover .carousel__tab-title { color: #333; }
        .carousel--31 .carousel__tab.active { border-bottom: 2px solid #1a1a1a; margin-bottom: -0.75rem; padding-bottom: calc(0.5rem + 0.75rem - 2px); }
        .carousel--31 .carousel__tab.active .carousel__tab-num { color: #666; }
        .carousel--31 .carousel__tab.active .carousel__tab-title { color: #1a1a1a; }
        .carousel--31 .carousel__body { display: flex; align-items: center; gap: 1.5rem; }
        .carousel--31 .carousel__main { flex: 1; display: grid; grid-template-columns: 1fr auto 1fr; gap: 3rem; align-items: center; min-height: 350px; }
        .carousel--31 .carousel__image { position: relative; aspect-ratio: 4/3; border-radius: 8px; overflow: hidden; }
        .carousel--31 .carousel__image img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transform: scale(1.02); transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .carousel--31 .carousel__image img.active { opacity: 1; transform: scale(1); }
        .carousel--31 .carousel__divider { width: 1px; height: 180px; background: linear-gradient(to bottom, transparent, #ddd, transparent); }
        .carousel--31 .carousel__content { padding: 1.5rem 0; }
        .carousel--31 .carousel__counter { display: flex; align-items: baseline; gap: 0.25rem; font-family: 'Share Tech Mono', monospace; margin-bottom: 1.5rem; overflow: hidden; }
        .carousel--31 .carousel__current { font-size: 4rem; font-weight: 700; color: #999; line-height: 1; display: inline-block; animation: slideUp31 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        @keyframes slideUp31 { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
        .carousel--31 .carousel__text-content { animation: fadeIn31 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; animation-delay: 0.1s; opacity: 0; }
        @keyframes fadeIn31 { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .carousel--31 .carousel__content h3 { font-size: 1.25rem; font-weight: 700; margin: 0 0 0.75rem; text-transform: uppercase; }
        .carousel--31 .carousel__content p { color: #666; line-height: 1.7; margin: 0 0 1.5rem; font-size: 0.95rem; }
        .carousel--31 .carousel__btn { display: inline-block; padding: 0.75rem 1.5rem; background: #1a1a1a; color: #fff; text-decoration: none; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; }
        .carousel--31 .carousel__sticks { display: flex; justify-content: center; gap: 0.5rem; margin-top: 2rem; }
        .carousel--31 .carousel__stick { width: 40px; height: 3px; background: #e0e0e0; border: none; cursor: pointer; transition: background 0.3s; }
        .carousel--31 .carousel__stick.active { background: #1a1a1a; }
      `}</style>
    </div>
  );
}

// ============================================
// V32: LONG ARROW THICK NAVIGATION
// ============================================
function Carousel32({ activeSlide, setActiveSlide }) {
  const prevSlide = () => setActiveSlide((activeSlide - 1 + slides.length) % slides.length);
  const nextSlide = () => setActiveSlide((activeSlide + 1) % slides.length);
  return (
    <div className="carousel carousel--32">
      <div className="carousel__tabs-wrapper">
        <div className="carousel__tabs">
          {slides.map((slide, idx) => (
            <button key={idx} className={`carousel__tab ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}>
              <span className="carousel__tab-num">{String(idx + 1).padStart(2, '0')}</span>
              <span className="carousel__tab-title">{slide.title}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="carousel__body">
        <button className="carousel__arrow carousel__arrow--prev" onClick={prevSlide}>
          <svg width="48" height="20" viewBox="0 0 48 20">
            <line x1="48" y1="10" x2="6" y2="10" stroke="currentColor" strokeWidth="2"/>
            <polyline points="14 3 6 10 14 17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="carousel__main">
          <div className="carousel__image">
            {slides.map((slide, idx) => (<img key={idx} src={slide.image} alt={slide.title} className={idx === activeSlide ? 'active' : ''} />))}
          </div>
          <div className="carousel__divider"></div>
          <div className="carousel__content">
            <div className="carousel__counter"><span className="carousel__current" key={activeSlide}>{String(activeSlide + 1).padStart(2, '0')}</span></div>
            <div className="carousel__text-content" key={`text-${activeSlide}`}>
              <h3>{slides[activeSlide].title}</h3>
              <p>{slides[activeSlide].description}</p>
              <Link to={slides[activeSlide].link} className="carousel__btn">{slides[activeSlide].cta}</Link>
            </div>
          </div>
        </div>
        <button className="carousel__arrow carousel__arrow--next" onClick={nextSlide}>
          <svg width="48" height="20" viewBox="0 0 48 20">
            <line x1="0" y1="10" x2="42" y2="10" stroke="currentColor" strokeWidth="2"/>
            <polyline points="34 3 42 10 34 17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="carousel__sticks">
        {slides.map((_, idx) => (<button key={idx} className={`carousel__stick ${idx <= activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)} />))}
      </div>
      <style>{`
        .carousel--32 { max-width: 1000px; margin: 0 auto; }
        .carousel--32 .carousel__tabs-wrapper { position: relative; }
        .carousel--32 .carousel__tabs-wrapper::before, .carousel--32 .carousel__tabs-wrapper::after { content: ''; position: absolute; top: 0; bottom: 0; width: 60px; pointer-events: none; z-index: 1; }
        .carousel--32 .carousel__tabs-wrapper::before { left: 0; background: linear-gradient(to right, #faf9f6 0%, transparent 100%); }
        .carousel--32 .carousel__tabs-wrapper::after { right: 0; background: linear-gradient(to left, #faf9f6 0%, transparent 100%); }
        .carousel--32 .carousel__tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; border-bottom: 1px solid #e0e0e0; padding-bottom: 0.75rem; overflow-x: auto; scrollbar-width: none; padding-left: 40px; padding-right: 40px; }
        .carousel--32 .carousel__tabs::-webkit-scrollbar { display: none; }
        .carousel--32 .carousel__tab { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; background: none; border: none; cursor: pointer; transition: all 0.3s; flex-shrink: 0; white-space: nowrap; }
        .carousel--32 .carousel__tab-num { font-family: 'Share Tech Mono', monospace; font-size: 0.6rem; color: #bbb; transition: color 0.3s; }
        .carousel--32 .carousel__tab-title { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #999; transition: color 0.3s; }
        .carousel--32 .carousel__tab:hover .carousel__tab-num { color: #999; }
        .carousel--32 .carousel__tab:hover .carousel__tab-title { color: #333; }
        .carousel--32 .carousel__tab.active { border-bottom: 2px solid #1a1a1a; margin-bottom: -0.75rem; padding-bottom: calc(0.5rem + 0.75rem - 2px); }
        .carousel--32 .carousel__tab.active .carousel__tab-num { color: #666; }
        .carousel--32 .carousel__tab.active .carousel__tab-title { color: #1a1a1a; }
        .carousel--32 .carousel__body { display: flex; align-items: center; gap: 1.5rem; }
        .carousel--32 .carousel__arrow { padding: 0.75rem; border: none; background: transparent; cursor: pointer; color: #bbb; display: flex; align-items: center; justify-content: center; transition: all 0.3s; flex-shrink: 0; }
        .carousel--32 .carousel__arrow:hover { color: #1a1a1a; }
        .carousel--32 .carousel__main { flex: 1; display: grid; grid-template-columns: 1fr auto 1fr; gap: 3rem; align-items: center; min-height: 350px; }
        .carousel--32 .carousel__image { position: relative; aspect-ratio: 4/3; border-radius: 8px; overflow: hidden; }
        .carousel--32 .carousel__image img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transform: scale(1.02); transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .carousel--32 .carousel__image img.active { opacity: 1; transform: scale(1); }
        .carousel--32 .carousel__divider { width: 1px; height: 180px; background: linear-gradient(to bottom, transparent, #ddd, transparent); }
        .carousel--32 .carousel__content { padding: 1.5rem 0; }
        .carousel--32 .carousel__counter { display: flex; align-items: baseline; gap: 0.25rem; font-family: 'Share Tech Mono', monospace; margin-bottom: 1.5rem; overflow: hidden; }
        .carousel--32 .carousel__current { font-size: 4rem; font-weight: 700; color: #999; line-height: 1; display: inline-block; animation: slideUp32 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        @keyframes slideUp32 { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
        .carousel--32 .carousel__text-content { animation: fadeIn32 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; animation-delay: 0.1s; opacity: 0; }
        @keyframes fadeIn32 { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .carousel--32 .carousel__content h3 { font-size: 1.25rem; font-weight: 700; margin: 0 0 0.75rem; text-transform: uppercase; }
        .carousel--32 .carousel__content p { color: #666; line-height: 1.7; margin: 0 0 1.5rem; font-size: 0.95rem; }
        .carousel--32 .carousel__btn { display: inline-block; padding: 0.75rem 1.5rem; background: #1a1a1a; color: #fff; text-decoration: none; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; }
        .carousel--32 .carousel__sticks { display: flex; justify-content: center; gap: 0.5rem; margin-top: 2rem; }
        .carousel--32 .carousel__stick { width: 40px; height: 3px; background: #e0e0e0; border: none; cursor: pointer; transition: background 0.3s; }
        .carousel--32 .carousel__stick.active { background: #1a1a1a; }
      `}</style>
    </div>
  );
}

// ============================================
// CAROUSEL VARIATIONS MAP
// ============================================

const carouselComponents = {
  'carousel-1': Carousel1,
  'carousel-2': Carousel2,
  'carousel-3': Carousel3,
  'carousel-4': Carousel4,
  'carousel-5': Carousel5,
  'carousel-6': Carousel6,
  'carousel-7': Carousel7,
  'carousel-8': Carousel8,
  'carousel-9': Carousel9,
  'carousel-10': Carousel10,
  'carousel-11': Carousel11,
  'carousel-12': Carousel12,
  'carousel-13': Carousel13,
  'carousel-14': Carousel14,
  'carousel-15': Carousel15,
  'carousel-16': Carousel16,
  'carousel-17': Carousel17,
  'carousel-18': Carousel18,
  'carousel-19': Carousel19,
  'carousel-20': Carousel20,
  'carousel-21': Carousel21,
  'carousel-22': Carousel22,
  'carousel-23': Carousel23,
  'carousel-24': Carousel24,
  'carousel-25': Carousel25,
  'carousel-26': Carousel26,
  'carousel-27': Carousel27,
  'carousel-28': Carousel28,
  'carousel-29': Carousel29,
  'carousel-30': Carousel30,
  'carousel-31': Carousel31,
  'carousel-32': Carousel32,
};

// ============================================
// PICKER SECTIONS
// ============================================

const sections = {
  carousels: [
    { id: 'carousel-1', name: 'Base (V14)', category: 'Base', desc: 'Original dark split layout' },
    { id: 'carousel-2', name: 'Giant Number Overlay', category: 'Number', desc: '8rem number overlaying the image' },
    { id: 'carousel-3', name: 'Inset + Shadow', category: 'Image', desc: 'Padded image with deep shadow' },
    { id: 'carousel-4', name: 'Number Beside Title', category: 'Number', desc: 'Number inline with heading' },
    { id: 'carousel-5', name: 'Floating Center', category: 'Number', desc: '12rem ghost number in center' },
    { id: 'carousel-6', name: 'Glow Effect', category: 'Image', desc: 'Smaller image with glow, drop-in number' },
    { id: 'carousel-7', name: 'Vertical Bar', category: 'Layout', desc: 'Vertical number bar + zoom image' },
    { id: 'carousel-8', name: 'Gradient + Bottom', category: 'Layout', desc: 'Corner gradient, number with sticks' },
    { id: 'carousel-9', name: 'Circle Badge', category: 'Number', desc: 'White circle badge with pop animation' },
    { id: 'carousel-10', name: 'Outline Number', category: 'Number', desc: 'Stroke-only number + grayscale transition' },
    { id: 'carousel-11', name: 'Diagonal Split', category: 'Layout', desc: 'Skewed divider between sections' },
    { id: 'carousel-12', name: 'Wider Image', category: 'Image', desc: '1.4:1 ratio image, giant faded number' },
    { id: 'carousel-13', name: 'Blur Transition', category: 'Animation', desc: 'Blur-to-sharp image + number reveal' },
    { id: 'carousel-14', name: 'Stacked Cards', category: 'Animation', desc: 'Card stack with flip number' },
    { id: 'carousel-15', name: 'Clip Reveal', category: 'Animation', desc: 'Horizontal reveal + slide-up number' },
    { id: 'carousel-16', name: 'Polaroid', category: 'Image', desc: 'Photo frame style with drop animation' },
    { id: 'carousel-17', name: 'Cinema Bars', category: 'Image', desc: 'Letterbox bars + corner number' },
    { id: 'carousel-18', name: 'Offset Image', category: 'Image', desc: 'Image breaking out of bounds' },
    { id: 'carousel-19', name: 'Rotate In', category: 'Animation', desc: 'Slight rotation + 3D number flip' },
    { id: 'carousel-20', name: 'Border Frame', category: 'Image', desc: 'Decorative border + typing effect' },
    // Original carousels from CarouselPicker.jsx
    { id: 'carousel-21', name: 'Fade', category: 'Classic', desc: 'Clean fade transition between slides' },
    { id: 'carousel-22', name: 'Horizontal Slide', category: 'Classic', desc: 'Traditional horizontal sliding with large numbers' },
    { id: 'carousel-23', name: 'Cover Flow 3D', category: '3D', desc: 'Apple-inspired 3D perspective rotation' },
    { id: 'carousel-24', name: 'Card Stack', category: 'Stack', desc: 'Cards stacked that slide away on navigate' },
    { id: 'carousel-25', name: 'Tabs + Center', category: 'Navigation', desc: 'Tab navigation with center-focused slides' },
    { id: 'carousel-26', name: 'Vertical Sidebar', category: 'Layout', desc: 'Sidebar navigation with vertical sliding' },
    { id: 'carousel-27', name: 'Filmstrip', category: 'Thumbnails', desc: 'Centered filmstrip with thumbnail navigation' },
    { id: 'carousel-28', name: 'Split Screen Dark', category: 'Editorial', desc: 'Dark split-screen with progress bar' },
    { id: 'carousel-29', name: 'Minimal Arrows', category: 'Minimal', desc: 'Clean minimal with large arrow buttons' },
    { id: 'carousel-30', name: 'Editorial Magazine', category: 'Magazine', desc: 'Magazine-style with hero image and thumbnails' },
    // Restored original V11 and V21 layouts
    { id: 'carousel-31', name: 'Original V11 Layout', category: 'Restored', desc: 'Image | divider | content with tabs and animations' },
    { id: 'carousel-32', name: 'Long Arrow Thick', category: 'Restored', desc: 'V11 layout with Long Arrow Thick SVG navigation' },
  ],
};

const tabs = [
  { key: 'carousels', label: 'Carousel Variations', color: 'blue' },
];

// ============================================
// MAIN COMPONENT
// ============================================

function CarouselPickerV2() {
  const [currentItem, setCurrentItem] = useState(sections.carousels[0]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setActiveSlide(0);
  }, [currentItem]);

  const CarouselComponent = carouselComponents[currentItem?.id];

  return (
    <div className="carousel-picker-v2">
      <div className="carousel-picker-v2__preview">
        <div className="carousel-picker-v2__header">
          <h1>Training Courses</h1>
          <p>Explore our comprehensive helicopter training programs</p>
        </div>

        <div className="carousel-picker-v2__carousel">
          {CarouselComponent && (
            <CarouselComponent
              activeSlide={activeSlide}
              setActiveSlide={setActiveSlide}
            />
          )}
        </div>
      </div>

      <Picker
        sections={sections}
        tabs={tabs}
        storageKey="hq-carousel-picker-v2-favorites"
        title="Carousel Picker V2"
        onItemSelect={setCurrentItem}
        initialIndex={0}
      />

      <style>{`
        .carousel-picker-v2 {
          min-height: 100vh;
          background: #faf9f6;
          font-family: 'Space Grotesk', -apple-system, sans-serif;
        }
        .carousel-picker-v2__preview {
          padding: 4rem 2rem 10rem;
        }
        .carousel-picker-v2__header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .carousel-picker-v2__header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          text-transform: uppercase;
          margin: 0 0 0.5rem;
          letter-spacing: -0.02em;
        }
        .carousel-picker-v2__header p {
          color: #666;
          margin: 0;
        }
        .carousel-picker-v2__carousel {
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

export default CarouselPickerV2;
