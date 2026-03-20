/**
 * EDITORIAL GRID COMPONENT
 * Interactive Gallery — paginated, mixed content grid
 * Curated Commerce - Net-a-Porter, Sotheby's inspired
 */

import { Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Gallery Data ────────────────────────────────────────────── */

const GALLERY_PAGES = [
  // Page 1 — Hero / Intro
  [
    { type: 'image', src: '/assets/images/new-aircraft/r66/rhc-r66-nxg-pv-right-side-angle-shot-21826.jpg', alt: 'R66 NXG Palo Verde', description: 'The Robinson R66 NXG Palo Verde — redefining private rotorcraft', span: true },
    { type: 'nav', src: '/assets/images/facility/hq-0153.jpg', alt: 'Flight Training', category: 'Training', title: 'Flight Academy', link: '/training', linkText: 'Explore' },
    { type: 'quote', text: '"Excellence is not a destination but a continuous journey."', attribution: 'Captain Q' },
    { type: 'image', src: '/assets/images/new-aircraft/r66/rhc-r66-nxg-riviera-all-glass-cockpit-13338.jpg', alt: 'R66 NXG Riviera cockpit', description: 'All-glass cockpit with next-generation avionics' },
    { type: 'image', src: '/assets/images/facility/hq-0345.jpg', alt: 'HQ Aviation hangar', description: 'Our state-of-the-art hangar at Denham Aerodrome' },
    { type: 'image', src: '/assets/images/expeditions/helicopter-expeditions-quentin-smith.webp', alt: 'Helicopter expeditions', description: 'Expedition-ready aircraft for every adventure' },
  ],
  // Page 2 — Social & Facility Life
  [
    { type: 'image', src: '/assets/images/gallery/social/img-20241004-wa0005.jpg', alt: 'HQ Aviation social life', description: 'Community at the heart of everything we do', span: true },
    { type: 'nav', src: '/assets/images/facility/maintenance-.jpg', alt: 'Maintenance', category: 'Maintenance', title: 'Service Centre', link: '/maintenance', linkText: 'Learn More' },
    { type: 'quote', text: '"In aviation, preparation is the silent partner of every safe landing."', attribution: 'HQ Maintenance Team' },
    { type: 'image', src: '/assets/images/facility/busy-hangar.jpg', alt: 'Busy hangar day', description: 'A busy day in the HQ Aviation hangar' },
    { type: 'image', src: '/assets/images/gallery/social/img-20230425-wa0001.jpg', alt: 'Team gathering', description: 'The HQ Aviation family together' },
    { type: 'image', src: '/assets/images/facility/hq-0391.jpg', alt: 'Facility operations', description: 'Precision engineering, every single day' },
  ],
  // Page 3 — Aircraft Showcase
  [
    { type: 'image', src: '/assets/images/new-aircraft/r88/rhc-r88-3-spotlights-left-side-atmospheric-effect-21794_2.jpg', alt: 'Robinson R88', description: 'The all-new Robinson R88 — ten seats, turbine power', span: true },
    { type: 'nav', src: '/assets/images/facility/main-sales-pic.jpg', alt: 'Aircraft Sales', category: 'Aircraft Sales', title: 'New & Pre-Owned', link: '/aircraft', linkText: 'Browse Fleet' },
    { type: 'quote', text: '"Flying is the second greatest thrill known to man. Landing is the first."', attribution: 'Unknown Aviator' },
    { type: 'image', src: '/assets/images/new-aircraft/r66/rhc-r66-nxg-riviera-front-cockpit-wide-view-13425.jpg', alt: 'R66 NXG cockpit', description: 'The R66 NXG Riviera front cockpit in detail' },
    { type: 'image', src: '/assets/images/new-aircraft/r88/rhc-r88-wide-view-cockpit-ac-task-lighting-panel-13536.jpg', alt: 'R88 cockpit', description: 'R88 wide-view cockpit with AC and task lighting' },
    { type: 'image', src: '/assets/images/new-aircraft/r88/rhc-r88-seat-logo-emboss-angle-shot-13559.jpg', alt: 'R88 seat detail', description: 'Embossed Robinson logo — attention to every detail' },
  ],
  // Page 4 — Events & Community
  [
    { type: 'image', src: '/assets/images/gallery/events/img_2278.jpg', alt: 'HQ Aviation event', description: 'Celebrating milestones with our aviation community', span: true },
    { type: 'nav', src: '/assets/images/team/new-team-rx-racing-for-print.jpg', alt: 'Meet the team', category: 'Our People', title: 'Meet The Team', link: '/about', linkText: 'Discover' },
    { type: 'quote', text: '"The engine is the heart of an aeroplane, but the pilot is its soul."', attribution: 'Walter Raleigh' },
    { type: 'image', src: '/assets/images/gallery/events/img_1346.jpg', alt: 'Aviation gathering', description: 'Open days and fly-ins at Denham Aerodrome' },
    { type: 'image', src: '/assets/images/team/quentin-smith-world-record-holder-helicopter-aerobatics.webp', alt: 'Quentin Smith', description: 'World record holder Quentin Smith' },
    { type: 'image', src: '/assets/images/gallery/events/img_8733.jpg', alt: 'Community event', description: 'Aviation enthusiasts come together' },
  ],
  // Page 5 — Expeditions & Lifestyle
  [
    { type: 'image', src: '/assets/images/expeditions/north-pole.jpg', alt: 'North Pole expedition', description: 'To the North Pole by helicopter — the ultimate expedition', span: true },
    { type: 'nav', src: '/assets/images/expeditions/six-helis-in-North-Pole.jpg', alt: 'Expeditions', category: 'Expeditions', title: 'World Adventures', link: '/expeditions', linkText: 'Discover' },
    { type: 'quote', text: '"Adventure is worthwhile in itself."', attribution: 'Amelia Earhart' },
    { type: 'image', src: '/assets/images/lifestyle/superyacht-ops.jpg', alt: 'Superyacht operations', description: 'Superyacht helicopter operations worldwide' },
    { type: 'image', src: '/assets/images/expeditions/antartica.jpg', alt: 'Antarctica expedition', description: 'Antarctica — the final frontier of expedition flying' },
    { type: 'image', src: '/assets/images/lifestyle/london-battersea-heliport.jpg', alt: 'Battersea Heliport', description: 'London Battersea Heliport — city connections' },
  ],
  // Page 6 — Flying & Behind the Scenes
  [
    { type: 'image', src: '/assets/images/gallery/carousel/rotating1.jpg', alt: 'HQ Aviation carousel', description: 'Life at HQ Aviation — behind the scenes', span: true },
    { type: 'nav', src: '/assets/images/gallery/flying/james-shadow-night.jpg', alt: 'Night Rating', category: 'Training', title: 'Night Rating', link: '/training', linkText: 'Explore' },
    { type: 'quote', text: '"Once you have tasted flight, you will forever walk the earth with your eyes turned skyward."', attribution: 'Leonardo da Vinci' },
    { type: 'image', src: '/assets/images/gallery/flying/foggy-evening-flying.jpg', alt: 'Evening flying', description: 'A foggy evening departure from Denham' },
    { type: 'image', src: '/assets/images/gallery/carousel/rotating2.jpg', alt: 'HQ Aviation', description: 'Every day is different at HQ Aviation' },
    { type: 'image', src: '/assets/images/gallery/flying/flying--1.jpg', alt: 'Aerial view', description: 'The view from above — why we fly' },
  ],
];

const TOTAL_PAGES = GALLERY_PAGES.length;

/* ─── Animation Config ────────────────────────────────────────── */

const pageVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

const pageTransition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1],
};

/* ─── GridCell Sub-Component ──────────────────────────────────── */

const GridCell = ({ cell, index }) => {
  if (cell.type === 'quote') {
    return (
      <div className="editorial-grid__cell editorial-grid__cell--quote">
        <blockquote>{cell.text}</blockquote>
        <cite>— {cell.attribution}</cite>
      </div>
    );
  }

  if (cell.type === 'nav') {
    return (
      <div className="editorial-grid__cell editorial-grid__cell--nav">
        <img src={cell.src} alt={cell.alt} loading="lazy" />
        <div className="editorial-grid__cell-content">
          <span className="editorial-grid__category">{cell.category}</span>
          <h3>{cell.title}</h3>
          <Link to={cell.link}>{cell.linkText}</Link>
        </div>
      </div>
    );
  }

  if (cell.type === 'video') {
    return (
      <div className={`editorial-grid__cell${cell.span ? ' editorial-grid__cell--feature' : ''}`}>
        <video muted autoPlay loop playsInline poster={cell.poster}>
          <source src={cell.src} />
        </video>
        <div className="editorial-grid__video-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
        </div>
        <div className="editorial-grid__hover-overlay">
          <p className="editorial-grid__hover-text">{cell.description}</p>
        </div>
      </div>
    );
  }

  // Default: image
  return (
    <div className={`editorial-grid__cell${cell.span ? ' editorial-grid__cell--feature' : ''}`}>
      <img src={cell.src} alt={cell.alt} loading="lazy" />
      <div className="editorial-grid__hover-overlay">
        <p className="editorial-grid__hover-text">{cell.description}</p>
      </div>
    </div>
  );
};

/* ─── Main Component ──────────────────────────────────────────── */

export const EditorialGrid = () => {
  // Ticker state (unchanged)
  const [mode, setMode] = useState('normal');
  const [navBottom, setNavBottom] = useState(120);
  const [tickerLeftOffset, setTickerLeftOffset] = useState(0);
  const placeholderRef = useRef(null);
  const tickerRef = useRef(null);
  const originalTopRef = useRef(null);
  const prevModeRef = useRef('normal');
  const STICKY_DURATION = 100;

  // Gallery state
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToPage = useCallback((i) => {
    setDirection(i > currentPage ? 1 : -1);
    setCurrentPage(i);
  }, [currentPage]);

  const nextPage = useCallback(() => {
    setDirection(1);
    setCurrentPage((p) => (p + 1) % TOTAL_PAGES);
  }, []);

  const prevPage = useCallback(() => {
    setDirection(-1);
    setCurrentPage((p) => (p - 1 + TOTAL_PAGES) % TOTAL_PAGES);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextPage, prevPage]);

  // Ticker scroll logic (unchanged except console.logs removed)
  useEffect(() => {
    const calculate = () => {
      const nav = document.querySelector('.fd-nav');
      if (nav) {
        const style = window.getComputedStyle(nav);
        const top = parseFloat(style.top) || 49;
        setNavBottom(top + nav.getBoundingClientRect().height);
      }

      if (placeholderRef.current) {
        const rect = placeholderRef.current.getBoundingClientRect();
        if (originalTopRef.current === null) {
          originalTopRef.current = rect.top + window.scrollY;
        }
        setTickerLeftOffset(rect.left);
      }

      if (originalTopRef.current === null) return;

      const scrollY = window.scrollY;
      const triggerPoint = originalTopRef.current - navBottom;
      const endPoint = triggerPoint + STICKY_DURATION;

      let newMode = 'normal';
      if (scrollY < triggerPoint) {
        newMode = 'normal';
      } else if (scrollY >= triggerPoint && scrollY < endPoint) {
        newMode = 'sticky';
      } else {
        newMode = 'hidden';
      }

      if (prevModeRef.current !== newMode) {
        prevModeRef.current = newMode;
      }

      setMode(newMode);
    };

    window.addEventListener('scroll', calculate, { passive: true });
    window.addEventListener('resize', calculate);
    calculate();

    return () => {
      window.removeEventListener('scroll', calculate);
      window.removeEventListener('resize', calculate);
    };
  }, [navBottom, tickerLeftOffset]);

  const padPage = (n) => String(n + 1).padStart(2, '0');

  return (
  <section className="editorial-grid">
    {/* Header */}
    <header className="editorial-grid__header">
      <div className="editorial-grid__logo">HQ</div>
      <div className="editorial-grid__tagline">The Aviation Edit</div>
      <div className="editorial-grid__header-right">
        <div className="editorial-grid__issue">Are you an HQ'er with some cool footage?</div>
        <a
          href="https://drive.google.com/drive/folders/placeholder"
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-grid__upload-btn"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload
        </a>
      </div>
    </header>

    {/* Gallery */}
    <div className="editorial-grid__gallery">
      <button className="editorial-grid__chevron editorial-grid__chevron--prev" onClick={prevPage} aria-label="Previous page">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentPage}
          className="editorial-grid__grid"
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
        >
          {GALLERY_PAGES[currentPage].map((cell, i) => (
            <GridCell key={`${currentPage}-${i}`} cell={cell} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      <button className="editorial-grid__chevron editorial-grid__chevron--next" onClick={nextPage} aria-label="Next page">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>

    {/* Pagination */}
    <div className="editorial-grid__pagination">
      <span className="editorial-grid__page-counter">
        {padPage(currentPage)} / {padPage(TOTAL_PAGES - 1)}
      </span>
      <div className="editorial-grid__dots">
        {GALLERY_PAGES.map((_, i) => (
          <button
            key={i}
            className={`editorial-grid__dot${i === currentPage ? ' editorial-grid__dot--active' : ''}`}
            onClick={() => goToPage(i)}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    </div>

    {/* Ticker (unchanged) */}
    <div
      ref={placeholderRef}
      className="editorial-grid__ticker-placeholder"
      style={{ height: mode !== 'normal' ? tickerRef.current?.offsetHeight || 48 : 'auto' }}
    >
      <div
        ref={tickerRef}
        className={`editorial-grid__ticker editorial-grid__ticker--${mode}`}
        style={mode !== 'normal' ? { top: navBottom, left: tickerLeftOffset } : undefined}
      >
        <div className="editorial-grid__ticker-content">
          <span>Robinson Approved Service Centre</span>
          <span>•</span>
          <span>15+ Years Experience</span>
          <span>•</span>
          <span>PPL to ATPL Training</span>
          <span>•</span>
          <span>Aircraft Sales & Acquisition</span>
          <span>•</span>
          <span>Worldwide Expeditions</span>
          <span>•</span>
        </div>
      </div>
    </div>

    <style>{`
      .editorial-grid {
        min-height: 100vh;
        background: #faf9f7;
        display: grid;
        grid-template-rows: auto 1fr auto auto;
      }

      .editorial-grid__header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e8e6e2;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .editorial-grid__logo {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.75rem;
        font-weight: 600;
        color: #1a1a1a;
      }

      .editorial-grid__tagline {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1rem;
        font-style: italic;
        color: #666;
      }

      .editorial-grid__header-right {
        display: flex;
        align-items: baseline;
        gap: 1.25rem;
      }

      .editorial-grid__issue {
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: #999;
      }

      .editorial-grid__upload-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #666;
        text-decoration: none;
        border: 1px solid #ccc;
        padding: 0.35rem 0.75rem;
        border-radius: 2px;
        transition: background 0.2s, color 0.2s;
        white-space: nowrap;
      }

      .editorial-grid__upload-btn:hover {
        background: #1a1a1a;
        color: #fff;
        border-color: #1a1a1a;
      }

      /* ── Gallery wrapper ────────────────────────── */

      .editorial-grid__gallery {
        position: relative;
        overflow: hidden;
      }

      /* ── Grid ───────────────────────────────────── */

      .editorial-grid__grid {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 1px;
        background: #e8e6e2;
        min-height: 520px;
      }

      /* ── Cells ──────────────────────────────────── */

      .editorial-grid__cell {
        position: relative;
        background: #fff;
        overflow: hidden;
      }

      .editorial-grid__cell img,
      .editorial-grid__cell video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.8s ease;
      }

      .editorial-grid__cell:hover img,
      .editorial-grid__cell:hover video {
        transform: scale(1.05);
      }

      .editorial-grid__cell--feature {
        grid-row: span 2;
      }

      /* ── Nav cell overlay (always visible) ──────── */

      .editorial-grid__cell-content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 2rem;
        background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
        color: #fff;
      }

      .editorial-grid__category {
        display: block;
        font-size: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: rgba(255,255,255,0.7);
        margin-bottom: 0.5rem;
      }

      .editorial-grid__cell-content h2 {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.75rem;
        font-weight: 400;
        margin: 0 0 0.5rem;
      }

      .editorial-grid__cell-content h3 {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.25rem;
        font-weight: 400;
        margin: 0 0 0.5rem;
      }

      .editorial-grid__cell-content p {
        font-size: 0.85rem;
        color: rgba(255,255,255,0.8);
        margin: 0 0 1rem;
      }

      .editorial-grid__cell-content a {
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #fff;
        text-decoration: none;
        border-bottom: 1px solid rgba(255,255,255,0.3);
        padding-bottom: 0.25rem;
        transition: border-color 0.3s ease;
      }

      .editorial-grid__cell-content a:hover {
        border-color: #fff;
      }

      /* ── Quote cell ─────────────────────────────── */

      .editorial-grid__cell--quote {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        background: #1a1a1a;
      }

      .editorial-grid__cell--quote blockquote {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.25rem;
        font-style: italic;
        color: #fff;
        text-align: center;
        line-height: 1.6;
        margin: 0 0 1rem;
      }

      .editorial-grid__cell--quote cite {
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: rgba(255,255,255,0.5);
      }

      /* ── Hover overlay (image cells) ────────────── */

      .editorial-grid__hover-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1.5rem;
        background: linear-gradient(to top, rgba(0,0,0,0.75), transparent);
        transform: translateY(100%);
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.4s ease;
        pointer-events: none;
      }

      .editorial-grid__cell:hover .editorial-grid__hover-overlay {
        transform: translateY(0);
        opacity: 1;
      }

      .editorial-grid__hover-text {
        font-family: 'Cormorant Garamond', serif;
        font-size: 0.95rem;
        font-style: italic;
        color: #fff;
        margin: 0;
        line-height: 1.5;
      }

      /* ── Video badge ────────────────────────────── */

      .editorial-grid__video-badge {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        width: 28px;
        height: 28px;
        background: rgba(0,0,0,0.5);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(4px);
      }

      /* ── Chevron navigation ─────────────────────── */

      .editorial-grid__chevron {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 1px solid rgba(0,0,0,0.15);
        background: rgba(255,255,255,0.9);
        backdrop-filter: blur(8px);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #1a1a1a;
        transition: background 0.2s, color 0.2s;
      }

      .editorial-grid__chevron:hover {
        background: #1a1a1a;
        color: #fff;
      }

      .editorial-grid__chevron--prev {
        left: 1rem;
      }

      .editorial-grid__chevron--next {
        right: 1rem;
      }

      /* ── Pagination ─────────────────────────────── */

      .editorial-grid__pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.25rem;
        padding: 1rem 2rem;
        border-top: 1px solid #e8e6e2;
      }

      .editorial-grid__page-counter {
        font-family: 'Share Tech Mono', monospace;
        font-size: 0.7rem;
        color: #999;
        letter-spacing: 0.1em;
      }

      .editorial-grid__dots {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .editorial-grid__dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid #ccc;
        background: transparent;
        padding: 0;
        cursor: pointer;
        transition: background 0.2s, border-color 0.2s;
      }

      .editorial-grid__dot:hover {
        border-color: #999;
      }

      .editorial-grid__dot--active {
        background: #1a1a1a;
        border-color: #1a1a1a;
      }

      /* ── Ticker (unchanged) ─────────────────────── */

      .editorial-grid__ticker-placeholder {
        position: relative;
        width: 100vw;
        margin-left: calc(-50vw + 50%);
      }

      .editorial-grid__ticker {
        padding: 1rem 0;
        border-top: 1px solid #e8e6e2;
        overflow: hidden;
        background: #faf9f7;
        width: 100vw;
      }

      .editorial-grid__ticker--normal { }

      .editorial-grid__ticker--sticky {
        position: fixed;
        z-index: 99;
        border-top: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
      }

      .editorial-grid__ticker--hidden {
        position: fixed;
        z-index: 99;
        border-top: 0;
        opacity: 0;
        transform: translateY(-100%);
        pointer-events: none;
        transition: opacity 0.3s ease, transform 0.3s ease;
      }

      .editorial-grid__ticker-content {
        display: flex;
        gap: 2rem;
        animation: tickerScroll 20s linear infinite;
        white-space: nowrap;
      }

      @keyframes tickerScroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      .editorial-grid__ticker-content span {
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #666;
      }

      /* ── Mobile ──────────────────────────────────── */

      @media (max-width: 768px) {
        .editorial-grid__header {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .editorial-grid__header-right {
          width: 100%;
          justify-content: space-between;
        }

        .editorial-grid__grid {
          grid-template-columns: 1fr;
          grid-template-rows: auto;
          min-height: auto;
        }

        .editorial-grid__cell--feature {
          grid-row: 1;
          min-height: 50vh;
        }

        .editorial-grid__cell {
          min-height: 200px;
        }

        .editorial-grid__chevron {
          width: 36px;
          height: 36px;
        }

        .editorial-grid__chevron--prev {
          left: 0.5rem;
        }

        .editorial-grid__chevron--next {
          right: 0.5rem;
        }
      }
    `}</style>
  </section>
  );
};

export default EditorialGrid;
