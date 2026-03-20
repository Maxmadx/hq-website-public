/**
 * HQ AVIATION - FINAL DRAFT HERO
 *
 * Incorporates feedback from multiple hero variations:
 * - hero-80: Asymmetric layout with fixed side images
 * - hero-81: Progressive line/text animations
 * - hero-83: Horizontal accordion navigation
 * - hero-87: Monochrome typography
 * - hero-17: Scroll prompt
 * - hero-43: Mono Sans typography
 * - hero-66: Vertical dividers
 * - hero-69: Coordinates element
 * - hero-74: Varying font colors (luxury feel)
 */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// Import all styles - Header/Navigation styles included via main.css
import '../assets/css/main.css';
import '../assets/css/components.css';

// Scroll path animation component
import ScrollPathAnimation from '../components/ScrollPathAnimation';

// Footer component
import FooterMinimal from '../components/FooterMinimal';

// Union Jack component - black and white version
const UnionJack = ({ size = 20, className = '', id = '' }) => (
  <img
    src="/assets/images/icons/Union Jack.svg"
    alt="UK"
    className={`union-jack union-jack--${id} ${className}`}
    style={{
      width: size,
      height: 'auto',
      filter: 'grayscale(100%) contrast(1.2)',
      opacity: 0.7,
    }}
  />
);

// Awesome Components
import EditorialGrid from '../components/AwesomeComponents/EditorialGrid';
import { ScrollingStrips } from '../components';

// Blog Section
import BlogSection from '../components/BlogSection';
import ExpeditionBarcode from '../components/Expeditions/ExpeditionBarcode';


// ============================================
// Service Center Card — Cloud Frost (cert-114 style)
// ============================================
function ServiceSplitDots() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="cert-cloud">
      <div className={`cert-cloud__card ${expanded ? 'cert-cloud__card--expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
        <div className="cert-cloud__dots"></div>
        <div className="cert-cloud__split">
          <div className="cert-cloud__upper">
            <img src="/assets/images/robinson-assets/logos/rhc_authorized-service-center-logo-logo-yellow-rotor-black-type.svg" alt="Robinson Authorized Service Center" className="cert-cloud__logo" />
          </div>
          <div className="cert-cloud__lower">
            <span className="cert-cloud__guimbal-name">GUIMBAL</span>
            <span className="cert-cloud__guimbal-sub">Cabri G2</span>
          </div>
        </div>
        <span className="cert-cloud__hint">{expanded ? 'Click to collapse' : 'See details \u2192'}</span>
        {expanded && (
          <div className="cert-cloud__expanded">
            <div className="cert-cloud__body">
              <h3 className="cert-cloud__title">Authorized Dealer &amp; Service Center</h3>
              <p className="cert-cloud__desc">Factory distributor, authorised dealer, and designated service centre for the full Robinson range — R22, R44, R66.</p>
              <span className="cert-cloud__label-tag">The Robinson Specialists</span>
              <div className="cert-cloud__stats">
                <div className="cert-cloud__stat">
                  <span className="cert-cloud__stat-value">85+</span>
                  <span className="cert-cloud__stat-label">Aircraft</span>
                </div>
                <div className="cert-cloud__stat">
                  <span className="cert-cloud__stat-value">2,500+</span>
                  <span className="cert-cloud__stat-label">Services</span>
                </div>
                <div className="cert-cloud__stat">
                  <span className="cert-cloud__stat-value">Part 145</span>
                  <span className="cert-cloud__stat-label">EASA</span>
                </div>
              </div>
            </div>
            <div className="cert-cloud__footer">
              <span className="cert-cloud__footer-label">Certified for</span>
              <div className="cert-cloud__pills">
                <span className="cert-cloud__pill">Robinson R22</span>
                <span className="cert-cloud__pill">Robinson R44</span>
                <span className="cert-cloud__pill">Robinson R66</span>
                <span className="cert-cloud__pill">Guimbal Cabri G2</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Dealer Card — Cloud Frost (cert-114 style)
// ============================================
function DealerSplitDots() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="cert-cloud cert-cloud--dealer">
      <div className={`cert-cloud__card ${expanded ? 'cert-cloud__card--expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
        <div className="cert-cloud__dots"></div>
        <div className="cert-cloud__split">
          <div className="cert-cloud__upper">
            <img src="/assets/images/robinson-assets/logos/rhc-authorized-dealer-logo-logo-yellow-rotor-black-type.svg" alt="Robinson Authorized Dealer" className="cert-cloud__logo" />
          </div>
        </div>
        <span className="cert-cloud__hint">{expanded ? 'Click to collapse' : 'See details \u2192'}</span>
        {expanded && (
          <div className="cert-cloud__expanded">
            <div className="cert-cloud__body">
              <span className="cert-cloud__label-tag">Official</span>
              <h3 className="cert-cloud__title">Robinson Authorized Dealer</h3>
              <p className="cert-cloud__desc">The UK's premier Robinson dealership since 1990. Factory-direct pricing, full warranty support, and expert guidance from purchase to delivery.</p>
              <div className="cert-cloud__stats">
                <div className="cert-cloud__stat">
                  <span className="cert-cloud__stat-value">35+</span>
                  <span className="cert-cloud__stat-label">Years</span>
                </div>
                <div className="cert-cloud__stat">
                  <span className="cert-cloud__stat-value">500+</span>
                  <span className="cert-cloud__stat-label">Aircraft Sold</span>
                </div>
                <div className="cert-cloud__stat">
                  <span className="cert-cloud__stat-value">UK</span>
                  <span className="cert-cloud__stat-label">Exclusive</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Parallax Section Component
function ParallaxSection({ image, alt, children, className = '', waves = false }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect - image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section className={`parallax-section ${className}`} ref={sectionRef}>
      <div className="parallax-section__image-container">
        <motion.img
          src={image}
          alt={alt}
          className="parallax-section__image"
          style={{ y }}
        />
      </div>
      <div className="parallax-section__overlay"></div>
      <div className="parallax-section__content">
        {children}
      </div>
      {waves && (
        <>
          {/* Top waves - subtle */}
          <svg className="parallax-section__wave parallax-section__wave--top" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,0 L1440,0 L1440,20 Q1080,30 720,20 Q360,10 0,25 L0,0 Z" fill="rgba(255,255,255,0.1)"/>
          </svg>
          <svg className="parallax-section__wave parallax-section__wave--top" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,0 L1440,0 L1440,12 Q1080,18 720,12 Q360,6 0,15 L0,0 Z" fill="rgba(255,255,255,0.18)"/>
          </svg>
          {/* Bottom waves */}
          <svg className="parallax-section__wave parallax-section__wave--bottom" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,120 L1440,120 L1440,70 Q1080,55 720,70 Q360,85 0,60 L0,120 Z" fill="rgba(255,255,255,0.08)"/>
          </svg>
          <svg className="parallax-section__wave parallax-section__wave--bottom" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,120 L1440,120 L1440,85 Q1080,75 720,85 Q360,95 0,80 L0,120 Z" fill="rgba(255,255,255,0.18)"/>
          </svg>
          <svg className="parallax-section__wave parallax-section__wave--bottom" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,120 L1440,120 L1440,100 Q1080,95 720,100 Q360,105 0,98 L0,120 Z" fill="rgba(255,255,255,0.3)"/>
          </svg>
        </>
      )}
    </section>
  );
}

// Hero scroll path - Triple Wave (path-19) - centered
const HERO_PATHS_BOTTOM = [
  { d: 'M -50 100 L 2050 100', stroke: '#a0a0a0', width: 2, offset: 0 },
  { d: 'M -50 250 L 2050 250', stroke: '#b0b0b0', width: 1.5, offset: 0.03 },
  { d: 'M -50 400 L 2050 400', stroke: '#c0c0c0', width: 1, offset: 0.06 }
];

const HERO_PATHS_TOP = [
  { d: 'M -50 100 L 2050 100', stroke: '#c0c0c0', width: 1, offset: 0 },
  { d: 'M -50 250 L 2050 250', stroke: '#b0b0b0', width: 1.5, offset: 0.03 },
  { d: 'M -50 400 L 2050 400', stroke: '#a0a0a0', width: 2, offset: 0.06 }
];

function HeroScrollPath({ containerRef, hidden }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform scroll progress: start at 25%, end at 100%
  const pathProgress = useTransform(scrollYProgress, [0, 1], [0.20, 1]);

  return (
    <>
      {/* Top SVG */}
      <svg
        className={`fd-hero__path-svg fd-hero__path-svg--top ${hidden ? 'fd-hero__path-svg--hidden' : ''}`}
        viewBox="0 0 2000 500"
        preserveAspectRatio="none"
        fill="none"
      >
        {HERO_PATHS_TOP.map((path, idx) => (
          <g key={idx}>
            <path
              d={path.d}
              stroke="rgba(180, 180, 180, 0.15)"
              strokeWidth={path.width}
              strokeLinecap="round"
              strokeDasharray="6 10"
              fill="none"
            />
            <motion.path
              d={path.d}
              stroke={path.stroke}
              strokeWidth={path.width}
              strokeLinecap="round"
              fill="none"
              style={{
                opacity: 0.5,
                pathLength: useTransform(pathProgress, v => Math.min(1, v + path.offset))
              }}
            />
          </g>
        ))}
      </svg>

      {/* Bottom SVG */}
      <svg
        className={`fd-hero__path-svg fd-hero__path-svg--bottom ${hidden ? 'fd-hero__path-svg--hidden' : ''}`}
        viewBox="0 0 2000 500"
        preserveAspectRatio="none"
        fill="none"
      >
        {HERO_PATHS_BOTTOM.map((path, idx) => (
          <g key={idx}>
            <path
              d={path.d}
              stroke="rgba(180, 180, 180, 0.15)"
              strokeWidth={path.width}
              strokeLinecap="round"
              strokeDasharray="6 10"
              fill="none"
            />
            <motion.path
              d={path.d}
              stroke={path.stroke}
              strokeWidth={path.width}
              strokeLinecap="round"
              fill="none"
              style={{
                opacity: 0.5,
                pathLength: useTransform(pathProgress, v => Math.min(1, v + path.offset))
              }}
            />
          </g>
        ))}
      </svg>
    </>
  );
}

/**
 * CUSTOM HEADER COMPONENT FOR FINAL DRAFT
 * This header has the spotlight animation that works on this page
 * (The main Header component skips animations on non-home pages)
 */
function FinalDraftHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [colorDark, setColorDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [verticalProgress, setVerticalProgress] = useState(0);
  const [horizontalProgress, setHorizontalProgress] = useState(0);

  // Scroll handler for spotlight animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Vertical completes FIRST (0 to 1 over first 150px)
      const vProgress = Math.min(scrollY / 150, 1);
      setVerticalProgress(vProgress);

      // Horizontal completes SECOND (0 to 1 over full 300px)
      const hProgress = Math.min(scrollY / 300, 1);
      setHorizontalProgress(hProgress);

      // Color changes at 300px
      setColorDark(scrollY > 300);
      // Position/size changes at 300px
      setScrolled(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Spotlight dimensions
  const spotlightHeight = 95 + Math.round(verticalProgress * 405);
  const spotlightWidth = 214 + Math.round(horizontalProgress * 1786);

  return (
    <>
      {/* Menu Panel */}
      <div className={`hq-menu-panel ${menuOpen ? 'open' : ''}`}>
        <div className="hq-menu-grid">
          <div className="hq-menu-section">
            <h3>About</h3>
            <ul>
              <li><Link to="/" onClick={closeMenu}>Home</Link></li>
              <li><Link to="/about-us" onClick={closeMenu}>About Us</Link></li>
              <li><Link to="/about-us/team" onClick={closeMenu}>Meet The Team</Link></li>
              <li><Link to="/about-us/captain-q" onClick={closeMenu}>Quentin Smith</Link></li>
              <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Aircraft Sales</h3>
            <ul>
              <li><Link to="/aircraft-sales" onClick={closeMenu}>New Aircraft</Link></li>
              <li><Link to="/aircraft-sales/new/r88" onClick={closeMenu}>R88</Link></li>
              <li><Link to="/aircraft-sales/new/r66" onClick={closeMenu}>R66</Link></li>
              <li><Link to="/aircraft-sales/new/r44" onClick={closeMenu}>R44</Link></li>
              <li><Link to="/aircraft-sales/new/r22" onClick={closeMenu}>R22</Link></li>
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Flight Training</h3>
            <ul>
              <li><Link to="/training" onClick={closeMenu}>Training Overview</Link></li>
              <li><Link to="/training/trial-lessons" onClick={closeMenu}>Trial Lessons</Link></li>
              <li><Link to="/training/ppl" onClick={closeMenu}>Private Pilot License</Link></li>
              <li><Link to="/training/faq" onClick={closeMenu}>Training FAQ</Link></li>
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Services</h3>
            <ul>
              <li><Link to="/services" onClick={closeMenu}>Services Overview</Link></li>
              <li><Link to="/services/maintenance" onClick={closeMenu}>Maintenance</Link></li>
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Experiences</h3>
            <ul>
              <li><Link to="/expeditions" onClick={closeMenu}>Expeditions</Link></li>
              <li><Link to="/expeditions/calendar" onClick={closeMenu}>Calendar</Link></li>
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Contact</h3>
            <ul>
              <li><Link to="/contact" onClick={closeMenu}>Contact Us</Link></li>
              <li><Link to="/contact/careers" onClick={closeMenu}>Careers</Link></li>
              <li><Link to="/contact/pricing" onClick={closeMenu}>Pricing</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Menu Button */}
      <button
        className={`hq-menu-btn ${colorDark ? 'color-dark' : ''} ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Header with Spotlight */}
      <header
        className={`Header Header--top ${scrolled ? 'Header--scrolled' : ''}`}
        style={{
          '--spotlight-width': `${spotlightWidth}px`,
          '--spotlight-height': `${spotlightHeight}px`
        }}
      >
        <div className="Header-inner Header-inner--top" data-nc-group="top">
          <div data-nc-container="top-left"></div>
          <div data-nc-container="top-center">
            <Link to="/" className="Header-branding" data-nc-element="branding">
              <img
                src="/assets/images/logos/hq/hq-aviation-logo-black.png"
                alt="HQ Aviation"
                className="Header-branding-logo"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <nav className="Header-nav Header-nav--secondary" data-nc-element="secondary-nav">
              <div className="Header-nav-inner">
                <Link to="/flying" className="Header-nav-item">Flying</Link>
                <Link to="/training" className="Header-nav-item">Training</Link>
                <span className="Header-nav-item Header-nav-item--folder">
                  <Link to="/expeditions" className="Header-nav-folder-title">Exploration</Link>
                  <span className="Header-nav-folder">
                    <Link to="/expeditions" className="Header-nav-folder-item">Worldwide Expeditions</Link>
                    <Link to="/expeditions/calendar" className="Header-nav-folder-item">HQ Trips</Link>
                    <Link to="/services" className="Header-nav-folder-item">Ferry Flights</Link>
                  </span>
                </span>
              </div>
            </nav>
          </div>
          <div data-nc-container="top-right"></div>
        </div>
      </header>
    </>
  );
}

// Expedition images that cycle on scroll
const leftImages = [
  '/assets/images/expeditions/antartica.jpg',
  '/assets/images/expeditions/north-pole.jpg',
  '/assets/images/expeditions/channel.jpg',
  '/assets/images/expeditions/south-pole-by-helicopter-quentin-smith.webp',
];

const rightImages = [
  '/assets/images/expeditions/helicopter-expeditions-quentin-smith.webp',
  '/assets/images/expeditions/south-pole-by-helicopter-quentin-smith.webp',
  '/assets/images/expeditions/antartica.jpg',
  '/assets/images/expeditions/north-pole.jpg',
];

// About section image
const aboutImage = '/assets/images/facility/hangar-main.jpg';

// ============================================================
// SELF-FLY HIRE — Dark Map + Journey Timeline (from V41)
// ============================================================
const sfhUkPath = "M224.5 476.8 L199.8 492.6 L189.1 490.9 L176.2 478.9 L162.5 480.4 L168.2 474.2 L156.5 468.8 L136.2 476.6 L122.0 459.4 L165.9 429.1 L172.6 414.4 L168.6 410.0 L167.8 389.1 L144.9 396.6 L161.2 373.6 L194.4 360.3 L207.5 365.9 L204.8 356.7 L208.8 354.6 L221.3 362.4 L208.8 348.7 L214.3 333.7 L210.1 331.0 L210.4 322.1 L215.3 318.3 L216.6 303.6 L204.8 307.0 L188.0 277.4 L193.0 263.3 L209.9 251.0 L189.6 251.5 L173.5 262.8 L139.5 258.3 L135.8 268.9 L126.9 257.5 L125.5 248.9 L130.1 248.7 L145.0 214.0 L136.6 200.6 L139.2 184.9 L148.7 184.3 L138.5 176.7 L140.2 169.4 L123.8 187.6 L123.5 175.6 L132.3 164.3 L117.1 178.8 L110.3 221.5 L101.9 223.3 L112.3 193.5 L107.7 192.8 L111.1 163.2 L124.8 128.8 L106.4 144.1 L87.5 131.5 L103.4 122.3 L98.2 118.9 L110.1 96.6 L99.9 82.8 L109.3 75.3 L102.9 67.0 L108.3 52.7 L126.1 52.7 L116.0 39.9 L119.0 28.5 L131.9 26.8 L128.8 18.6 L133.2 5.3 L154.7 9.9 L209.2 1.6 L203.0 22.8 L172.2 47.4 L170.5 54.7 L177.5 56.9 L166.5 73.3 L199.7 64.2 L247.9 64.8 L256.2 70.9 L259.6 80.2 L231.1 137.0 L199.1 155.5 L215.9 153.2 L224.3 162.9 L197.1 178.2 L180.2 173.7 L209.5 183.4 L227.2 178.3 L245.1 186.7 L264.6 209.3 L281.3 268.0 L303.5 281.5 L326.7 307.6 L321.8 314.2 L334.6 342.2 L303.9 334.3 L318.4 336.6 L340.8 360.7 L344.0 372.6 L331.8 389.9 L341.0 396.4 L352.1 385.7 L380.3 388.6 L395.6 400.1 L399.0 412.0 L393.0 443.1 L378.8 453.1 L380.5 461.7 L359.7 469.5 L365.5 472.2 L365.2 480.2 L346.7 487.4 L386.0 494.3 L385.3 506.7 L367.9 524.0 L338.1 535.0 L298.9 534.9 L274.0 526.0 L277.3 531.1 L249.6 537.6 L252.4 544.2 L249.5 545.8 L211.4 538.2 L195.4 543.8 L184.4 570.4 L164.1 560.1 L143.0 567.0 L127.6 584.1 L106.4 581.5 L136.5 550.5 L148.7 534.1 L151.1 520.6 L160.1 517.1 L164.4 506.2 L205.9 505.0 L233.8 468.8 L224.5 476.8 Z";

const sfhAircraftRanges = {
  R22:          { label: 'R22',          cruise: '~100 kts', cruiseKts: 100, r30: 56, r60: 112, r120: 223 },
  R44:          { label: 'R44',          cruise: '~120 kts', cruiseKts: 120, r30: 67, r60: 134, r120: 268 },
  'R66 Turbine': { label: 'R66 Turbine', cruise: '~140 kts', cruiseKts: 140, r30: 78, r60: 156, r120: 312 },
};

const sfhFormatTime = (nm, kts) => {
  const mins = Math.round((nm / kts) * 60);
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}min`;
};

const sfhFleet = [
  { model: 'R22', seats: '2 Seats', rate: '£275/hr', img: '/assets/images/new-aircraft/r22/r22-red-volcano-front-alpha-v3.png' },
  { model: 'R44', seats: '4 Seats', rate: '£395/hr', img: '/assets/images/new-aircraft/r44/raven-ii-front-alpha.png' },
  { model: 'R66 Turbine', seats: '5 Seats', rate: '£595/hr', img: '/assets/images/new-aircraft/r66/blue-r66-palo-verde-left-v4.png' },
];

const sfhDestCoords = [
  { name: 'The Cotswolds', x: 265, y: 458, nm: 70, carTime: '1h 45min', desc: 'Fly over the rolling hills and honey-stone villages. Lunch at a country pub, back to Denham before dark.' },
  { name: 'Le Touquet', x: 355, y: 548, nm: 110, carTime: '3h 30min', desc: 'Cross the Channel in under an hour. Fresh seafood on the French coast, no passport queues, no ferry timetables.' },
  { name: 'Scottish Highlands', x: 210, y: 175, nm: 330, carTime: '8h+', desc: 'Glens, lochs and castles from the air. Two and a half hours to a landscape most people drive a full day to reach.' },
  { name: 'Cornwall', x: 145, y: 560, nm: 180, carTime: '4h 30min', desc: 'Skip the M5 entirely. Land near the coast for a weekend of surfing, cream teas and dramatic clifftop walks.' },
];

const SelfFlyHireSection = () => {
  const [hoveredDest, setHoveredDest] = useState(null);
  const [lockedDest, setLockedDest] = useState(null);
  const [selectedAircraft, setSelectedAircraft] = useState('R44');
  const activeDest = hoveredDest !== null ? hoveredDest : lockedDest;
  const denham = { x: 310, y: 480 };
  const range = sfhAircraftRanges[selectedAircraft];

  return (
    <section className="sfh-map" id="fleet">
      <style>{`
        .sfh-map { background: #0e0e0e; color: #fff; }
        .sfh-map__intro { max-width: 1200px; margin: 0 auto; padding: 4rem 2rem 0; }
        .sfh-map__pre-title { display: block; font-family: 'Share Tech Mono', monospace; font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.3em; color: #444; margin-bottom: 1.5rem; }
        .sfh-map__title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 700; text-transform: uppercase; line-height: 1.1; margin-bottom: 1.5rem; }
        .sfh-map__title-line { display: block; }
        .sfh-map__title-line--2 { color: #666; }
        .sfh-map__tagline { font-size: 0.9rem; color: #888; line-height: 1.7; max-width: 600px; }

        .sfh-map__layout { max-width: 1200px; margin: 0 auto; padding: 3rem 2rem 5rem; display: grid; grid-template-columns: 1fr 380px; gap: 3rem; align-items: start; }

        /* ── Map ── */
        .sfh-map__map-box { background: #0a0a0a; border: 1px solid #1e1e1e; padding: 1.5rem; }
        .sfh-map__map-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
        .sfh-map__map-header span { font-family: 'Share Tech Mono', monospace; font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.12em; color: #444; }
        .sfh-map__map-aircraft-label { display: block; font-family: 'Share Tech Mono', monospace; font-size: 0.55rem; text-transform: uppercase; letter-spacing: 0.1em; color: #333; margin-bottom: 1rem; }
        .sfh-map__map-aircraft-label strong { color: #888; }
        .sfh-map__map svg { width: 100%; height: auto; display: block; }
        .sfh-map__pin { cursor: pointer; }
        .sfh-map__pin text { font-family: 'Space Grotesk', sans-serif; font-size: 9px; font-weight: 600; fill: #555; text-transform: uppercase; pointer-events: none; transition: fill 0.2s; }
        .sfh-map__pin--active text { fill: #fff; }
        .sfh-map__rlabel { font-family: 'Share Tech Mono', monospace; font-size: 7px; fill: #333; }
        .sfh-map__range-ring { transition: r 0.4s ease, stroke 0.3s; }

        /* ── Journey Timeline ── */
        .sfh-map__journey { position: sticky; top: 2rem; }
        .sfh-map__journey-label { display: block; font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.3em; color: #444; margin-bottom: 2rem; font-family: 'Share Tech Mono', monospace; }

        .sfh-map__tl-step { display: grid; grid-template-columns: 36px 1fr; gap: 1rem; position: relative; }
        .sfh-map__tl-step::before { content: ''; position: absolute; left: 17px; top: 36px; bottom: 0; width: 1px; background: #222; }
        .sfh-map__tl-num { width: 36px; height: 36px; border-radius: 50%; border: 1px solid #444; display: flex; align-items: center; justify-content: center; font-family: 'Share Tech Mono', monospace; font-size: 0.65rem; color: #888; background: #0e0e0e; position: relative; z-index: 1; }
        .sfh-map__tl-step--active .sfh-map__tl-num { border-color: #fff; color: #fff; }
        .sfh-map__tl-title { font-family: 'Space Grotesk', sans-serif; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #888; padding-top: 0.5rem; }
        .sfh-map__tl-step--active .sfh-map__tl-title { color: #fff; }

        .sfh-map__dest-list { padding: 1rem 0 0 0; margin: 0; list-style: none; }
        .sfh-map__dest-item { display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0.75rem; cursor: pointer; transition: all 0.2s; border-left: 2px solid transparent; margin-bottom: 2px; }
        .sfh-map__dest-item:hover { background: rgba(255,255,255,0.03); }
        .sfh-map__dest-item--active { border-left-color: #fff; background: rgba(255,255,255,0.05); }
        .sfh-map__dest-name { font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; font-weight: 600; color: #666; transition: color 0.2s; }
        .sfh-map__dest-item--active .sfh-map__dest-name { color: #fff; }
        .sfh-map__dest-flight { font-family: 'Share Tech Mono', monospace; font-size: 0.7rem; color: #444; }
        .sfh-map__dest-item--active .sfh-map__dest-flight { color: #888; }

        .sfh-map__dest-detail-wrap { display: grid; margin-top: 0.75rem; border: 1px solid #1e1e1e; background: rgba(255,255,255,0.02); }
        .sfh-map__dest-detail-wrap > * { grid-area: 1 / 1; padding: 1.25rem; transition: opacity 0.25s; }
        .sfh-map__dest-detail { opacity: 0; pointer-events: none; }
        .sfh-map__dest-detail--active { opacity: 1; pointer-events: auto; }
        .sfh-map__dest-detail--empty { display: flex; align-items: center; justify-content: center; }
        .sfh-map__dest-detail-hint { font-size: 0.7rem; color: #333; font-family: 'Share Tech Mono', monospace; text-transform: uppercase; letter-spacing: 0.1em; }
        .sfh-map__dest-detail-endless { display: block; margin-top: 0.75rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; font-weight: 600; color: #666; }
        .sfh-map__dest-detail-time { font-family: 'Share Tech Mono', monospace; font-size: 1.8rem; color: #fff; margin-bottom: 0.15rem; }
        .sfh-map__dest-detail-car { font-size: 0.65rem; color: #555; margin-bottom: 0.75rem; }
        .sfh-map__dest-detail-desc { font-size: 0.85rem; color: #888; line-height: 1.6; }
        .sfh-map__dest-detail-name { font-family: 'Space Grotesk', sans-serif; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #555; margin-bottom: 0.5rem; }

        .sfh-map__tl-step-02 { margin-top: 2rem; }
        .sfh-map__tl-step-03 { margin-top: 2rem; }
        .sfh-map__tl-step-03::before { display: none; }
        .sfh-map__fly-text { font-size: 0.85rem; color: #888; line-height: 1.6; padding-top: 0.5rem; }

        .sfh-map__fleet-row { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0.75rem; border: 1px solid #1e1e1e; color: #fff; transition: all 0.3s; margin-bottom: 0.5rem; cursor: pointer; text-decoration: none; }
        .sfh-map__fleet-row:hover { border-color: #444; }
        .sfh-map__fleet-row--active { border-color: #fff; background: rgba(255,255,255,0.04); }
        .sfh-map__fleet-row img { height: 28px; object-fit: contain; width: 48px; }
        .sfh-map__fleet-model { font-family: 'Space Grotesk', sans-serif; font-weight: 700; text-transform: uppercase; font-size: 0.75rem; }
        .sfh-map__fleet-info { font-size: 0.6rem; color: #555; }
        .sfh-map__fleet-rate { margin-left: auto; font-family: 'Share Tech Mono', monospace; font-size: 0.7rem; color: #888; }

        .sfh-map__cta { display: block; width: 100%; padding: 0.85rem; background: #fff; color: #0e0e0e; text-decoration: none; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; text-align: center; font-family: 'Space Grotesk', sans-serif; font-weight: 600; margin-top: 1.5rem; transition: background 0.3s; }
        .sfh-map__cta:hover { background: #ddd; }

        @media (max-width: 900px) {
          .sfh-map__layout { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Intro */}
      <div className="sfh-map__intro">
        <span className="sfh-map__pre-title">Freedom to Fly Yourself Anywhere</span>
        <h2 className="sfh-map__title">
          <span className="sfh-map__title-line">Your Aircraft</span>
          <span className="sfh-map__title-line sfh-map__title-line--2">Awaits</span>
        </h2>
        <p className="sfh-map__tagline">
          You've earned your licence. Now use it. Hire from our fleet of R22s, R44s and R66s — fuelled, washed and waiting on the pad for you, ready to go. Fly yourself to lunch in France, a weekend in the Cotswolds, a business meeting across the country, or just flying around for the beauty and fun of it. Available by the hour, day or week. No crew, no waiting, no compromise.
        </p>
      </div>

      {/* Map + Timeline */}
      <div className="sfh-map__layout">
        <div className="sfh-map__map-box">
          <div className="sfh-map__map-header">
            <span>Range Map — Denham (EGLD)</span>
          </div>
          <div className="sfh-map__map-aircraft-label">Showing range for: <strong>{range.label}</strong> at {range.cruise} cruise</div>
          <div className="sfh-map__map">
            <svg viewBox="0 0 500 620" fill="none">
              <defs>
                <radialGradient id="sfhglow30" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fff" stopOpacity="0.04"/><stop offset="100%" stopColor="#fff" stopOpacity="0"/></radialGradient>
                <radialGradient id="sfhglow60" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fff" stopOpacity="0.02"/><stop offset="100%" stopColor="#fff" stopOpacity="0"/></radialGradient>
              </defs>

              <path d={sfhUkPath} stroke="#222" strokeWidth="1.2" fill="#141414" />

              <circle className="sfh-map__range-ring" cx={denham.x} cy={denham.y} r={range.r30} fill="url(#sfhglow30)" stroke="#333" strokeWidth="1" strokeDasharray="4 3" />
              <circle className="sfh-map__range-ring" cx={denham.x} cy={denham.y} r={range.r60} fill="url(#sfhglow60)" stroke="#2a2a2a" strokeWidth="1" strokeDasharray="6 4" />
              <circle className="sfh-map__range-ring" cx={denham.x} cy={denham.y} r={range.r120} fill="none" stroke="#222" strokeWidth="1" strokeDasharray="8 5" />

              <text x={denham.x + range.r30 + 4} y={denham.y - 4} className="sfh-map__rlabel">30 MIN</text>
              <text x={denham.x + range.r60 + 4} y={denham.y - 4} className="sfh-map__rlabel">1 HR</text>
              <text x={denham.x + range.r120 + 4} y={denham.y - 4} className="sfh-map__rlabel">2 HR</text>

              <circle cx={denham.x} cy={denham.y} r="5" fill="#fff" />
              <circle cx={denham.x} cy={denham.y} r="10" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.15" />
              <text x={denham.x + 12} y={denham.y + 3} fontFamily="Share Tech Mono" fontSize="7" fill="#666" fontWeight="700">DENHAM</text>

              {sfhDestCoords.map((d, i) => {
                if (!d.x) return null;
                const isActive = activeDest === i;
                const dx = d.x - denham.x, dy = d.y - denham.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const offset = 14;
                const sx = denham.x + (dx / dist) * offset, sy = denham.y + (dy / dist) * offset;
                return (
                  <g key={d.name} className={`sfh-map__pin ${isActive ? 'sfh-map__pin--active' : ''}`} onMouseEnter={() => setHoveredDest(i)} onMouseLeave={() => setHoveredDest(null)} onClick={() => setLockedDest(lockedDest === i ? null : i)} style={{ cursor: 'pointer' }}>
                    <line x1={sx} y1={sy} x2={d.x} y2={d.y} stroke="transparent" strokeWidth="16" />
                    <line x1={sx} y1={sy} x2={d.x} y2={d.y} stroke={isActive ? '#fff' : '#2a2a2a'} strokeWidth={isActive ? 1.5 : 0.75} strokeDasharray="4 3" style={{ transition: 'all 0.2s' }} />
                    <circle cx={d.x} cy={d.y} r={isActive ? 7 : 4} fill={isActive ? '#fff' : '#555'} style={{ transition: 'all 0.2s' }} />
                    {isActive && <circle cx={d.x} cy={d.y} r="14" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.25" />}
                    <text x={d.x + (d.x < denham.x ? -10 : 12)} y={d.y + (d.y < denham.y ? -10 : 16)} textAnchor={d.x < denham.x ? 'end' : 'start'}>{d.name}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="sfh-map__journey">
          <span className="sfh-map__journey-label">Self-Fly Hire</span>

          <div className={`sfh-map__tl-step ${activeDest !== null ? 'sfh-map__tl-step--active' : ''}`}>
            <span className="sfh-map__tl-num">01</span>
            <div>
              <div className="sfh-map__tl-title">Select Destination</div>
              <ul className="sfh-map__dest-list">
                {sfhDestCoords.map((d, i) => (
                  <li
                    key={d.name}
                    className={`sfh-map__dest-item ${activeDest === i ? 'sfh-map__dest-item--active' : ''}`}
                    onMouseEnter={() => setHoveredDest(i)}
                    onMouseLeave={() => setHoveredDest(null)}
                    onClick={() => setLockedDest(lockedDest === i ? null : i)}
                  >
                    <span className="sfh-map__dest-name">{d.name}</span>
                    <span className="sfh-map__dest-flight">{d.nm > 0 ? sfhFormatTime(d.nm, range.cruiseKts) : ''}</span>
                  </li>
                ))}
              </ul>

              <div className="sfh-map__dest-detail-wrap">
                <div className={`sfh-map__dest-detail sfh-map__dest-detail--empty ${activeDest === null ? 'sfh-map__dest-detail--active' : ''}`}>
                  <span className="sfh-map__dest-detail-hint">Hover or click a destination to see details</span>
                </div>
                {sfhDestCoords.map((d, i) => (
                  <div key={d.name} className={`sfh-map__dest-detail ${activeDest === i ? 'sfh-map__dest-detail--active' : ''}`}>
                    <div className="sfh-map__dest-detail-name">{d.name}</div>
                    {d.nm > 0 && <div className="sfh-map__dest-detail-time">{sfhFormatTime(d.nm, range.cruiseKts)}</div>}
                    {d.carTime && <div className="sfh-map__dest-detail-car">vs {d.carTime} by car</div>}
                    <div className="sfh-map__dest-detail-desc">{d.desc}</div>
                  </div>
                ))}
              </div>
              <span className="sfh-map__dest-detail-endless">Endless...</span>
            </div>
          </div>

          <div className="sfh-map__tl-step sfh-map__tl-step-02 sfh-map__tl-step--active">
            <span className="sfh-map__tl-num">02</span>
            <div>
              <div className="sfh-map__tl-title">Choose Your Aircraft</div>
              <div style={{ paddingTop: '1rem' }}>
                {sfhFleet.map(f => (
                  <div key={f.model} className={`sfh-map__fleet-row ${selectedAircraft === f.model ? 'sfh-map__fleet-row--active' : ''}`} onClick={() => setSelectedAircraft(f.model)}>
                    <img src={f.img} alt={f.model} />
                    <div>
                      <div className="sfh-map__fleet-model">{f.model}</div>
                      <div className="sfh-map__fleet-info">{f.seats} · {sfhAircraftRanges[f.model].cruise}</div>
                    </div>
                    <span className="sfh-map__fleet-rate">From {f.rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sfh-map__tl-step sfh-map__tl-step-03 sfh-map__tl-step--active">
            <span className="sfh-map__tl-num">03</span>
            <div>
              <div className="sfh-map__tl-title">Fly</div>
              <div className="sfh-map__fly-text">No crew, no waiting, no compromise. Available by the hour, day or week. Your licence, your aircraft, your schedule.</div>
            </div>
          </div>

          <Link to="/contact?subject=hire" className="sfh-map__cta">Enquire About Hire</Link>
        </div>
      </div>
    </section>
  );
};

function Experimentation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [imagesExpanded, setImagesExpanded] = useState(false);
  const [linesVisible, setLinesVisible] = useState(false);
  const [activeNavSection, setActiveNavSection] = useState(null);
  const [rebuildStep, setRebuildStep] = useState(0);
  const [navCompact, setNavCompact] = useState(false);
  const [navFixed, setNavFixed] = useState(false);
  const [scrollPromptHidden, setScrollPromptHidden] = useState(false);
  const [heroCollapsed, setHeroCollapsed] = useState(false);
  const [aboutLabelStatic, setAboutLabelStatic] = useState(false);
  const [trainingSlide, setTrainingSlide] = useState(2); // Start on Commercial
  const [whyFlyOpen, setWhyFlyOpen] = useState(false);
  const [whyFlySlide, setWhyFlySlide] = useState(0);

  // Shared why-fly data
  const whyFlyBenefits = [
    { verb: 'Join', noun: 'a Community', desc: 'A community of adventurers, business people, positive and successful people who share your passion for aviation.' },
    { verb: 'Save', noun: 'Precious Time', desc: 'What takes hours by car takes minutes by helicopter. Reclaim your most valuable asset - time.' },
    { verb: 'Land', noun: 'Anywhere', desc: 'No runways needed. Land at private estates, yachts, remote locations, and city centres.' },
    { verb: 'Gain', noun: 'Business Edge', desc: 'Arrive fresh, prepared, and on time. Make multiple meetings across the country in a single day.' },
    { verb: 'Create', noun: 'Family Memories', desc: 'Create unforgettable experiences with loved ones. Weekend trips become extraordinary adventures.' },
    { verb: 'Experience', noun: 'True Freedom', desc: 'Go where you want, when you want. The ultimate expression of personal freedom and independence.' },
    { verb: 'Access', noun: 'VIP Moments', desc: 'Private helipads at exclusive venues, VIP access to events, and experiences unavailable to others.' },
    { verb: 'Achieve', noun: 'Your Dreams', desc: "Join an elite group who have mastered one of aviation's most challenging and rewarding skills." },
    { verb: 'Build', noun: 'Your Network', desc: 'Connect with fellow pilots, business leaders, and adventurers at exclusive flying events.' },
    { verb: 'Break', noun: 'Free from Traffic', desc: 'Rise above congestion and constraints. Your journey becomes part of the adventure.' },
    { verb: 'Protect', noun: 'Your Investment', desc: 'Helicopters hold value well. A quality aircraft is both a lifestyle asset and sound investment.' },
    { verb: 'Fly', noun: 'All Year', desc: 'Unlike fixed-wing, helicopters operate from almost anywhere in nearly any weather conditions.' },
    { verb: 'Explore', noun: 'The World', desc: 'From Alpine peaks to Mediterranean coasts, the helicopter opens a world of expedition possibilities.' },
    { verb: 'Build', noun: 'Your Legacy', desc: 'Pass on the gift of flight. Many pilots share this passion across generations.' },
  ];

  const whyFlyImages = [
    '/assets/images/expeditions/helicopter-expeditions-quentin-smith.webp',
    '/assets/images/facility/hq-0035.jpg',
    '/assets/images/expeditions/channel.jpg',
    '/assets/images/facility/hq-0089.jpg',
    '/assets/images/expeditions/north-pole.jpg',
    '/assets/images/expeditions/antartica.jpg',
    '/assets/images/facility/busy-hangar.jpg',
    '/assets/images/facility/hq-0053.jpg',
    '/assets/images/facility/hq-0075.jpg',
    '/assets/images/expeditions/south-pole-by-helicopter-quentin-smith.webp',
    '/assets/images/facility/hq-0129.jpg',
    '/assets/images/expeditions/six-helis-in-North-Pole.jpg',
    '/assets/images/facility/hq-0167.jpg',
    '/assets/images/facility/hq-0209.jpg',
  ];


  // Images for fullwidth staggered layout
  const staggeredImages = [
    '/assets/images/expeditions/helicopter-expeditions-quentin-smith.webp',
    '/assets/images/expeditions/north-pole.jpg',
    '/assets/images/facility/hq-0089.jpg',
    '/assets/images/expeditions/antartica.jpg',
    '/assets/images/facility/hq-0035.jpg',
    '/assets/images/expeditions/channel.jpg',
    '/assets/images/facility/busy-hangar.jpg',
    '/assets/images/expeditions/south-pole-by-helicopter-quentin-smith.webp',
    '/assets/images/facility/hq-0053.jpg',
    '/assets/images/expeditions/six-helis-in-North-Pole.jpg',
  ];
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const navSentinelRef = useRef(null);
  const aboutBtnRef = useRef(null);
  const aboutLabelRef = useRef(null);
  const videoLinesRef = useRef(null);
  const scrollingStripsWrapperRef = useRef(null);
  const videoLinesInView = useInView(videoLinesRef, { once: true, amount: 0.5, margin: "0px 0px -200px 0px" });

  // Training carousel slides
  const trainingSlides = [
    {
      title: 'Discovery Flight',
      image: '/assets/images/gallery/carousel/rotating-4.jpg',
      description: 'Flying is the ultimate dream pursued by mankind. Should you want to live it for real, the discovery flight will certainly fulfil your expectations: After a pre-flight briefing, you will enjoy a full hands-on flying experience with one of our instructors.',
      cta: 'Learn More',
      link: '/training/trial-lessons'
    },
    {
      title: 'Private Pilot Licence',
      image: '/assets/images/gallery/carousel/rotating-4.jpg',
      description: 'Let aside the ground exams that most students self study before taking the tests on site, the obtention of a PPL(H) requires a minimum of 45 hrs of flight training, including 10 hrs of solo. The duration varies depending on commitment.',
      cta: 'Learn More',
      link: '/training/ppl'
    },
    {
      title: 'Commercial Pilot Licence',
      image: '/assets/images/gallery/carousel/rotating-4.jpg',
      description: 'Holding a Commercial Pilot Licence, CPL(H) gives you the status of professional helicopter pilot. To achieve this, 155 hrs of flying time post licence is required, of which 50 hrs must be Pilot In Command (PIC).',
      cta: 'Learn More',
      link: '/training'
    },
    {
      title: 'Type Rating',
      image: '/assets/images/gallery/carousel/rotating-4.jpg',
      description: 'Having achieved your PPL(H), you may wish to fly different types of helicopter. A type specific ground training course followed by a minimum of 5 Hrs of flight training will suffice to put you to the Type Rating test.',
      cta: 'Learn More',
      link: '/training/type-rating'
    },
    {
      title: 'Night Rating',
      image: '/assets/images/gallery/carousel/rotating-4.jpg',
      description: 'Holding a night rating gives you the most flexibility, as sunset will no longer prevent you from flying. To achieve this, 100 hrs of flying post licence is required, of which 60 Hrs must be Pilot In Command.',
      cta: 'Learn More',
      link: '/training'
    },
    {
      title: 'Self-Fly Hire',
      image: '/assets/images/gallery/carousel/rotating-4.jpg',
      description: 'With an impressive fleet of over 30 helicopters, HQ will certainly be able to facilitate your flying requirements, either on a short term hiring or on a long term leasing basis.',
      cta: 'Learn More',
      link: '/services'
    }
  ];

  // Carousel navigation
  const nextTrainingSlide = () => {
    setTrainingSlide((prev) => (prev + 1) % trainingSlides.length);
  };

  const prevTrainingSlide = () => {
    setTrainingSlide((prev) => (prev - 1 + trainingSlides.length) % trainingSlides.length);
  };

  // Sections for the scrolling content
  const sections = [
    {
      id: 'intro',
      preText: 'Welcome to',
      headline: ['HQ', 'Aviation'],
      description: 'The Robinson Specialists since 2010',
      image: null,
    },
    {
      id: 'excellence',
      preText: 'Built on',
      headline: ['Precision', '&', 'Excellence'],
      description: 'Three decades of uncompromising standards',
      image: null,
    },
    {
      id: 'training',
      preText: 'World-class',
      headline: ['Flight', 'Training'],
      description: 'From first flight to commercial certification',
      image: null,
    },
    {
      id: 'expeditions',
      preText: 'Beyond horizons',
      headline: ['Global', 'Expeditions'],
      description: 'Adventure awaits at every altitude',
      image: null,
    },
  ];

  // Navigation items for accordion
  const navItems = [
    { id: 'training', label: 'Flying', icon: '01' },
    { id: 'fleet', label: 'Fleet', icon: '02' },
    { id: 'expeditions', label: 'Expeditions', icon: '03' },
    { id: 'sales', label: 'Sales', icon: '04' },
    { id: 'maintenance', label: 'Maintenance', icon: '05' },
    { id: 'contact', label: 'Contact', icon: '06' },
  ];

  useEffect(() => {
    // Trigger line animations after mount
    const timer = setTimeout(() => setLinesVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const heroHeight = windowHeight * 4; // 4 sections worth of scroll

      // Calculate overall progress (0 to 1)
      const progress = Math.min(scrollTop / heroHeight, 1);
      setScrollProgress(progress);

      // Determine active section (0-3)
      const sectionIndex = Math.min(Math.floor(progress * 4), 3);
      setActiveSection(sectionIndex);

      // Hide scroll prompt after initial scroll
      setScrollPromptHidden(scrollTop > 100);

      // Hero elements hide earlier to avoid overlap with About section
      const shouldHide = scrollTop > heroHeight * 0.85;
      setImagesExpanded(shouldHide);

      // Trigger hero collapse when overlay disappears, reset when scrolling back up
      setHeroCollapsed(shouldHide);

      
      // Track about label sticky state - stops at the headline
      const aboutHeadline = document.querySelector('.fd-about__headline');
      const heroThreshold = heroHeight * 0.85;

      // Track when hero collapse first happens to add buffer
      if (shouldHide && !window._heroCollapseScrollPos) {
        window._heroCollapseScrollPos = scrollTop;
        console.log('=== HERO COLLAPSED - Label should appear ===');
        console.log('Collapse scroll position:', scrollTop);

        // Check actual element state after React re-renders
        setTimeout(() => {
          const labelEl = document.querySelector('.fd-about__label');
          if (labelEl) {
            console.log('AFTER RENDER - Label classes:', labelEl.className);
            console.log('AFTER RENDER - Opacity:', window.getComputedStyle(labelEl).opacity);
          }
        }, 100);
      } else if (!shouldHide) {
        window._heroCollapseScrollPos = null;
      }

      if (aboutHeadline && shouldHide) {
        const headlineRect = aboutHeadline.getBoundingClientRect();
        const stickyTop = 90;

        // Require 100px of scroll after hero collapses before label can become static
        const scrollSinceCollapse = scrollTop - (window._heroCollapseScrollPos || scrollTop);
        const canBecomeStatic = scrollSinceCollapse > 100;
        const newStaticState = canBecomeStatic && headlineRect.top <= stickyTop;

        if (newStaticState !== window._lastStaticState) {
          console.log('--- STATIC STATE CHANGE ---');
          console.log('scrollSinceCollapse:', scrollSinceCollapse);
          console.log('canBecomeStatic (need >100):', canBecomeStatic);
          console.log('headlineRect.top:', headlineRect.top);
          console.log('aboutLabelStatic changing to:', newStaticState);
          window._lastStaticState = newStaticState;
        }

        setAboutLabelStatic(newStaticState);
      } else if (!shouldHide) {
        if (window._lastStaticState !== false) {
          console.log('--- RESET: scrolled back up past hero ---');
          window._lastStaticState = false;
        }
        setAboutLabelStatic(false);
      }

      // Detect which content section is in view for nav highlighting
      const navSectionIds = ['training', 'fleet', 'expeditions', 'sales', 'maintenance', 'contact'];
      let currentNavSection = null;

      for (const sectionId of navSectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is "active" if its top is in the upper half of viewport
          if (rect.top <= windowHeight * 0.5 && rect.bottom >= 100) {
            currentNavSection = sectionId;
          }
        }
      }

      setActiveNavSection(currentNavSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Kill scroll momentum at 0.85 of hero height for 1 second
  useEffect(() => {
    let dampingActive = false;
    let dampingTimeout = null;

    const handleWheel = (e) => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const heroHeight = windowHeight * 4;
      const threshold = heroHeight * 0.85;

      // Entering the damping zone - start 1s timer
      if (scrollY >= threshold && !dampingActive && dampingTimeout === null) {
        dampingActive = true;
        dampingTimeout = setTimeout(() => {
          dampingActive = false;
        }, 500);
      }

      // Reset if scrolled back above threshold
      if (scrollY < threshold) {
        dampingActive = false;
        if (dampingTimeout) {
          clearTimeout(dampingTimeout);
          dampingTimeout = null;
        }
      }

      // Apply damping while active
      if (dampingActive) {
        e.preventDefault();
        const scrollAmount = Math.sign(e.deltaY) * 10;
        window.scrollBy(0, scrollAmount);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (dampingTimeout) clearTimeout(dampingTimeout);
    };
  }, []);

  // Self-contained two-step sticky nav
  // Step 1: Nav sticks below header (full nav visible with "Explore" header)
  // Step 2: After scrolling 200px more, "Explore" slides behind header, only tabs remain
  // Resilient to any DOM changes above the nav
  useEffect(() => {
    if (!navSentinelRef.current) return;
    const HEADER_HEIGHT = 49; // site header height when scrolled
    const COMPACT_SCROLL_DISTANCE = 200; // px after sticking before going compact

    const handleScroll = () => {
      const sentinelTop = navSentinelRef.current.getBoundingClientRect().top;
      const pastHeader = sentinelTop < HEADER_HEIGHT;
      setNavFixed(pastHeader);
      setNavCompact(pastHeader && sentinelTop < HEADER_HEIGHT - COMPACT_SCROLL_DISTANCE);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll reveal effect - elements fade in when scrolling into view, reset when leaving
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal-element');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            // Reset when element leaves viewport - animation will replay on re-entry
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const rebuildSteps = [
    { label: 'Airframe', before: '/assets/images/rebuilds/airframe-before.jpg', after: '/assets/images/rebuilds/airframe-after.jpg', beforeDesc: 'Corrosion, fatigue cracks and fifteen years of wear across the bare airframe.', afterDesc: 'Stripped, inspected, repaired and re-protected — ready for another lifetime.' },
    { label: 'Engine', before: '/assets/images/rebuilds/engine-before.jpg', after: '/assets/images/rebuilds/engine-after.jpg', beforeDesc: '2,200 hours. Worn bearings, degraded seals, metal particles in the oil filter.', afterDesc: 'Zero-time overhaul. Factory-new components throughout, test-run and certified.' },
    { label: 'Avionics', before: '/assets/images/rebuilds/avionics-before.jpg', after: '/assets/images/rebuilds/avionics-after.jpg', beforeDesc: 'Original analogue panel. Faded placards, intermittent radios, no GPS.', afterDesc: 'Full glass cockpit. Garmin suite, GPS/NAV/COM, ADS-B, four-axis autopilot.' },
    { label: 'Wiring', before: '/assets/images/rebuilds/wiring-before.jpg', after: '/assets/images/rebuilds/wiring-after.jpg', beforeDesc: 'Brittle insulation, spliced repairs, corroded connectors. An electrician\'s nightmare.', afterDesc: 'Complete rewire. New looms, mil-spec connectors, laser-etched labels throughout.' },
    { label: 'Interior', before: '/assets/images/rebuilds/interior-before.jpg', after: '/assets/images/rebuilds/interior-after.jpg', beforeDesc: 'Cracked leather, worn carpet, sun-bleached trim. Functional but tired.', afterDesc: 'Hand-stitched leather, custom upholstery, noise-dampening panels. Better than new.' },
    { label: 'Paint', before: '/assets/images/rebuilds/paint-before.jpg', after: '/assets/images/rebuilds/paint-after.jpg', beforeDesc: 'Oxidised, chipped and faded. The livery has seen better days.', afterDesc: 'Stripped to bare metal and refinished in custom livery. Mirror finish, UV-sealed.' },
  ];

  return (
    <div className="final-draft" ref={containerRef}>
      {/* ===== HEADER WITH SPOTLIGHT ANIMATION ===== */}
      <FinalDraftHeader />

      {/* ===== HERO SECTION ===== */}
      <section className={`fd-hero ${heroCollapsed ? 'fd-hero--collapsed' : ''}`} ref={heroRef}>
        {/* SVG Path that draws on scroll */}
        <HeroScrollPath containerRef={heroRef} hidden={imagesExpanded} />

        {/* Animated Grid Lines - hides after hero section */}
        <div className={`fd-hero__grid ${linesVisible ? 'fd-hero__grid--visible' : ''} ${imagesExpanded ? 'fd-hero__grid--hidden' : ''}`}>
          <div className="fd-hero__line fd-hero__line--v1"></div>
          <div className="fd-hero__line fd-hero__line--v2"></div>
          <div className="fd-hero__line fd-hero__line--v3"></div>
          <div className="fd-hero__line fd-hero__line--v4"></div>
          <div className={`fd-hero__line fd-hero__line--h1 ${scrollPromptHidden ? 'fd-hero__line--hidden' : ''}`}></div>
          <div className={`fd-hero__line fd-hero__line--h2 ${scrollPromptHidden ? 'fd-hero__line--hidden' : ''}`}></div>
        </div>

        {/* Fixed Left Image - Cycles on scroll */}
        <div
          className={`fd-hero__image fd-hero__image--left ${imagesExpanded ? 'fd-hero__image--expanded' : ''}`}
          style={{
            opacity: linesVisible ? 1 : 0,
            transform: imagesExpanded ? 'translateX(-100%)' : 'translateX(0)'
          }}
        >
          {leftImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`fd-hero__cycle-img ${activeSection === index ? 'fd-hero__cycle-img--active' : ''}`}
            />
          ))}
        </div>

        {/* Fixed Right Image - Cycles on scroll */}
        <div
          className={`fd-hero__image fd-hero__image--right ${imagesExpanded ? 'fd-hero__image--expanded' : ''}`}
          style={{
            opacity: linesVisible ? 1 : 0,
            transform: imagesExpanded ? 'translateX(100%)' : 'translateX(0)'
          }}
        >
          {rightImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`fd-hero__cycle-img ${activeSection === index ? 'fd-hero__cycle-img--active' : ''}`}
            />
          ))}
        </div>

        {/* Scrolling Content Container - hides after hero section */}
        <div className={`fd-hero__scroll-container ${imagesExpanded ? 'fd-hero__scroll-container--hidden' : ''}`}>
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`fd-hero__section ${activeSection === index ? 'fd-hero__section--active' : ''} ${section.image ? 'fd-hero__section--with-image' : ''}`}
            >
              {/* Text Content */}
              <div className="fd-hero__section-text">
                {/* Coordinates */}
                <div className="fd-hero__coords">
                  <span>51.5751°N</span>
                  <UnionJack size={14} id="coords" />
                  <span>0.5059°W</span>
                </div>

                {/* Pre-text */}
                <span className="fd-hero__pre">{section.preText}</span>

                {/* Headline with varying colors */}
                <h1 className="fd-hero__headline">
                  {section.headline.map((word, i) => (
                    <span
                      key={i}
                      className={`fd-hero__word fd-hero__word--${i + 1}`}
                      style={{ '--delay': `${i * 0.1}s` }}
                    >
                      {word}
                    </span>
                  ))}
                </h1>

                {/* Description */}
                <p className="fd-hero__desc">{section.description}</p>
              </div>

              {/* Section Image (if exists) */}
              {section.image && (
                <div className="fd-hero__section-image">
                  <img src={section.image} alt="" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Scroll Prompt - hides after hero section */}
        <div className={`fd-hero__scroll-prompt ${scrollPromptHidden ? 'fd-hero__scroll-prompt--hidden' : ''}`}>
          <span className="fd-hero__scroll-text">Scroll to explore</span>
          <div className="fd-hero__scroll-line">
            <span></span>
          </div>
        </div>

        {/* Progress Indicator - hides after hero section */}
        <div className={`fd-hero__progress ${imagesExpanded ? 'fd-hero__progress--hidden' : ''}`}>
          {sections.map((_, index) => (
            <div
              key={index}
              className={`fd-hero__progress-dot ${activeSection >= index ? 'fd-hero__progress-dot--active' : ''}`}
            />
          ))}
        </div>
      </section>

      {/* ===== ABOUT US VIDEO SECTION ===== */}
      <section className="fd-about" id="about">
        <div className={`fd-about__video-lines ${videoLinesInView ? 'visible' : ''}`}>
          <span className="fd-about__line fd-about__line--1"></span>
          <span className="fd-about__line fd-about__line--2"></span>
          <span className="fd-about__line fd-about__line--3"></span>
        </div>
        <div className="fd-about__content">
          <div ref={aboutLabelRef} className={`fd-about__label ${heroCollapsed ? 'fd-about__label--visible' : ''} ${aboutLabelStatic ? 'fd-about__label--static' : ''}`}>
            <span className="fd-about__label-line"></span>
            <span>About Us</span>
            <span className="fd-about__label-line"></span>
          </div>
          <h2 className="fd-about__headline fd-about__headline--single-line">
            <span>The Story</span> <span>Behind the</span> <span>Journey</span>
          </h2>

          <div className="fd-about__video" ref={videoLinesRef}>
            <div className="fd-about__video-placeholder">
              <img src={aboutImage} alt="" />
              <div className="fd-about__video-overlay">
                <button className="fd-about__play-btn">
                  <span></span>
                </button>
                <span className="fd-about__video-label">Watch Our Story</span>
              </div>
            </div>
          </div>

          <p className="fd-about__text">
            Founded in 2010 at Denham Aerodrome, HQ Aviation has grown to become
            the UK's leading Robinson helicopter specialists. Our commitment to
            excellence in training, sales, and maintenance has earned us the trust
            of pilots worldwide.
          </p>


            <div className="wfv wfv-merge" ref={aboutBtnRef}>
              <button className={`wfv-merge__fly ${whyFlyOpen ? 'wfv-merge__fly--open' : ''}`} onClick={() => setWhyFlyOpen(!whyFlyOpen)}>
                <div className="wfv-merge__thumbs">
                  {whyFlyImages.slice(0, 5).map((src, idx) => (
                    <div key={idx} className="wfv-merge__thumb" style={{ backgroundImage: `url(${src})`, zIndex: 5 - idx }} />
                  ))}
                </div>
                <div className="wfv-merge__center">
                  <span className="wfv-merge__title">Why We Fly Helicopters</span>
                  <span className={`wfv-merge__pulse ${whyFlyOpen ? 'wfv-merge__pulse--hidden' : ''}`}></span>
                </div>
                <div className="wfv-merge__thumbs">
                  {whyFlyImages.slice(5, 10).map((src, idx) => (
                    <div key={idx} className="wfv-merge__thumb" style={{ backgroundImage: `url(${src})`, zIndex: 5 - idx }} />
                  ))}
                </div>
              </button>
              <div className={`wfv-merge__expand ${whyFlyOpen ? 'wfv-merge__expand--open' : ''}`}>
                <div className="wfv-merge__expand-inner">
                <div className="wfi-q__expanded">
<div className="wfi-q__card-body"><div className="wfi-q__card-text"><h3><span className="wfi-q__verb">{whyFlyBenefits[whyFlySlide].verb}</span>{' '}<span className="wfi-q__noun">{whyFlyBenefits[whyFlySlide].noun}</span></h3><p>{whyFlyBenefits[whyFlySlide].desc}</p></div><div className="wfi-q__card-img">{whyFlyImages.map((src, idx) => (<div key={idx} className={`wfi-q__card-slide ${idx === whyFlySlide ? 'active' : ''}`} style={{ backgroundImage: `url(${src})` }} />))}<div className="wfi-q__card-img-label">Lifestyle</div></div></div>
                  <div className="wfi-q__card-footer"><div className="wfi-q__footer-left"><div className="wfi-q__dots">{whyFlyBenefits.map((_, idx) => (<div key={idx} className={`wfi-q__dot ${idx === whyFlySlide ? 'active' : ''}`} onClick={() => setWhyFlySlide(idx)} />))}</div><span className="wfi-q__counter">{String(whyFlySlide + 1).padStart(2, '0')} / {whyFlyBenefits.length}</span></div><div className="wfi-q__arrows"><button onClick={() => setWhyFlySlide(prev => prev === 0 ? 13 : prev - 1)} aria-label="Previous"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg></button><button onClick={() => setWhyFlySlide(prev => prev === 13 ? 0 : prev + 1)} aria-label="Next"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg></button></div></div>
                </div>
                </div>
              </div>
              <Link to="/about" className="wfv-merge__cta">Learn More About HQ Aviation<span>→</span></Link>
            </div>

        </div>
      </section>

      {/* Sentinel for JS-based sticky nav */}
      <div ref={navSentinelRef} style={{ height: 0, margin: 0, padding: 0 }} />
      {navFixed && <div style={{ height: navRef.current ? navRef.current.offsetHeight : 0 }} />}

      {/* ===== HORIZONTAL ACCORDION NAVIGATION ===== */}
      <nav className={`fd-nav ${navCompact ? 'fd-nav--compact' : ''} ${navFixed ? 'fd-nav--fixed' : ''}`} ref={navRef}>
        <div className="fd-nav__header">
          <span className="fd-nav__line"></span>
          <span>Explore</span>
          <span className="fd-nav__line"></span>
        </div>

        <div className="fd-nav__accordion">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`fd-nav__item ${activeNavSection === item.id ? 'fd-nav__item--active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              <span className="fd-nav__item-icon">{item.icon}</span>
              <span className="fd-nav__item-label">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ===== PARALLAX: TRAINING ===== */}
      <ParallaxSection
        image="/assets/images/gallery/flying/flying-.jpg"
        alt="Training"
        className="reveal-element"
        waves={true}
      >
        <h2 className="parallax-section__title">Flying</h2>
      </ParallaxSection>

      {/* ===== CONTENT SECTIONS ===== */}
      <div className="fd-training-wrapper">
        <section className="fd-section fd-section--with-carousel reveal-element" id="training">
          {/* ===== SCROLL PATH ANIMATION ===== */}
          <div className="fd-scroll-path-wrapper">
            <ScrollPathAnimation
              iconSrc="/assets/images/icons/r66-icon-transparent going right.svg"
              iconSize={60}
              colorStart="#FFFFFF"
              colorMid="#5B9BD5"
              colorEnd="#1E3A5F"
            />
          </div>

          {/* ===== TRAINING CAROUSEL ===== */}
          <div className="fd-carousel-section">
          <div className="carousel carousel--97">
            <div className="carousel__tabs-wrapper">
              <div className="carousel__tabs">
                {trainingSlides.map((slide, index) => (
                  <button
                    key={index}
                    className={`carousel__tab ${index === trainingSlide ? 'active' : ''}`}
                    onClick={() => setTrainingSlide(index)}
                  >
                    <span className="carousel__tab-num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="carousel__tab-title">{slide.title}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="carousel__body">
              <button className="carousel__arrow" onClick={prevTrainingSlide}>
                <svg width="48" height="20" viewBox="0 0 48 20">
                  <line x1="48" y1="10" x2="6" y2="10" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="14 3 6 10 14 17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="carousel__main">
                <div className="carousel__content">
                  <div className="carousel__text-content">
                    {trainingSlides.map((slide, index) => (
                      <div key={index} className={`carousel__slide-content ${index === trainingSlide ? 'active' : ''}`}>
                        <div className="carousel__title-row">
                          <div className="carousel__number-wrapper">
                            <span className="carousel__inline-number">{String(index + 1).padStart(2, '0')}</span>
                          </div>
                          <h3>{slide.title}</h3>
                        </div>
                        <p>{slide.description}</p>
                        <Link to={slide.link} className="carousel__btn">
                          <span>{slide.cta}</span>
                          <svg className="carousel__btn-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="carousel__divider"></div>
                <div className="carousel__image">
                  {trainingSlides.map((slide, index) => (
                    <img key={index} src={slide.image} alt={slide.title} className={index === trainingSlide ? 'active' : ''} />
                  ))}
                </div>
              </div>
              <button className="carousel__arrow" onClick={nextTrainingSlide}>
                <svg width="48" height="20" viewBox="0 0 48 20">
                  <line x1="0" y1="10" x2="42" y2="10" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="34 3 42 10 34 17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="carousel__progress">
              <div className="carousel__progress-bar" style={{ width: `${((trainingSlide + 1) / trainingSlides.length) * 100}%` }}></div>
            </div>
          </div>
          </div>
        </section>
      </div>

      {/* ===== PARALLAX: FLEET ===== */}
      <ParallaxSection
        image="/assets/images/facility/hq-aviation-robinsons.jpg"
        alt="Our Fleet"
        className="reveal-element"
        waves={true}
      >
        <h2 className="parallax-section__title">Self-Fly Hire</h2>
      </ParallaxSection>

      {/* ===== SELF-FLY HIRE — DARK MAP + JOURNEY TIMELINE ===== */}
      <SelfFlyHireSection />

      {/* ===== SCROLLING STRIPS - DESTINATIONS ===== */}
      <div className="scrolling-strips-wrapper" ref={scrollingStripsWrapperRef}>
        <ScrollingStrips wrapperRef={scrollingStripsWrapperRef} />
        <div className="scrolling-strips-spacer"></div>
      </div>

      {/* ===== PARALLAX: EXPEDITIONS ===== */}
      <ParallaxSection
        image="/assets/images/expeditions/six-helis-in-North-Pole.jpg"
        alt="Global Expeditions"
        className="reveal-element"
        waves={true}
      >
        <h2 className="parallax-section__title">Expeditions</h2>
      </ParallaxSection>

      {/* ===== IMMERSIVE EXPEDITIONS SECTION ===== */}
      <section className="fd-exped reveal-element" id="expeditions">
        {/* Cinematic Opening */}
        <div className="fd-exped__cinematic">
          <div className="fd-exped__cinematic-bg">
            <video autoPlay muted loop playsInline>
              <source src="/assets/video/expedition-reel.mp4" type="video/mp4" />
            </video>
            <div className="fd-exped__cinematic-overlay"></div>
          </div>
          {/* Globe SVG underlay */}
          <div className="fd-exped__globe">
            <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer circle */}
              <circle cx="300" cy="300" r="280" stroke="currentColor" strokeWidth="1" opacity="0.15" />
              <circle cx="300" cy="300" r="200" stroke="currentColor" strokeWidth="0.75" opacity="0.1" />
              <circle cx="300" cy="300" r="120" stroke="currentColor" strokeWidth="0.75" opacity="0.08" />
              {/* Horizontal latitude lines */}
              <ellipse cx="300" cy="300" rx="280" ry="80" stroke="currentColor" strokeWidth="0.75" opacity="0.1" />
              <ellipse cx="300" cy="300" rx="280" ry="160" stroke="currentColor" strokeWidth="0.75" opacity="0.08" />
              <ellipse cx="300" cy="300" rx="280" ry="240" stroke="currentColor" strokeWidth="0.75" opacity="0.06" />
              {/* Vertical longitude lines */}
              <ellipse cx="300" cy="300" rx="80" ry="280" stroke="currentColor" strokeWidth="0.75" opacity="0.1" />
              <ellipse cx="300" cy="300" rx="160" ry="280" stroke="currentColor" strokeWidth="0.75" opacity="0.08" />
              <ellipse cx="300" cy="300" rx="240" ry="280" stroke="currentColor" strokeWidth="0.75" opacity="0.06" />
              {/* Axis lines */}
              <line x1="300" y1="15" x2="300" y2="585" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
              <line x1="15" y1="300" x2="585" y2="300" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
              {/* Tilted meridian */}
              <ellipse cx="300" cy="300" rx="140" ry="280" stroke="currentColor" strokeWidth="0.75" opacity="0.07" transform="rotate(30 300 300)" />
              <ellipse cx="300" cy="300" rx="140" ry="280" stroke="currentColor" strokeWidth="0.75" opacity="0.07" transform="rotate(-30 300 300)" />
              {/* Tropic lines */}
              <ellipse cx="300" cy="220" rx="260" ry="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.06" />
              <ellipse cx="300" cy="380" rx="260" ry="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.06" />
            </svg>
          </div>
          <div className="fd-exped__cinematic-content">
            <span className="fd-exped__pre-title">With Captain Quentin Smith</span>
            <h2 className="fd-exped__title">
              <span className="fd-exped__title-word fd-exped__title-word--1">Explore</span>
              <span className="fd-exped__title-word fd-exped__title-word--2">The</span>
              <span className="fd-exped__title-word fd-exped__title-word--3">Unreachable</span>
            </h2>
            <p className="fd-exped__cinematic-desc">
              This isn't transport. This is using the helicopter as a gateway to the world—
              a first-class ticket to the beauty of our planet, seeing places in ways that
              very few have ever experienced before.
            </p>
          </div>
        </div>


        {/* Journey Map - Barcode Compass Grid */}
        <div className="fd-exped__journey">
          <div className="fd-exped__journey-header">
            <span className="fd-exped__label">From Denham to the Ends of the Earth</span>
            <h3 className="fd-exped__journey-title">Where Will You Go?</h3>
            <p className="fd-exped__journey-desc">This isn't transport. This is using the helicopter as a gateway to the world— a first-class ticket to the beauty of our planet, seeing places in ways that very few have ever experienced before.</p>
          </div>
          <ExpeditionBarcode />
        </div>

        {/* Featured Expedition Regions - Large Cards */}
        <div className="fd-exped__regions">
          <span className="fd-exped__regions-label">Choose Your Adventure</span>
          <div className="fd-exped__regions-grid">
            {/* Polar */}
            <Link to="/expeditions?region=polar" className="fd-exped__region-card fd-exped__region-card--polar">
              <div className="fd-exped__region-bg">
                <img src="/assets/images/expeditions/south-pole-by-helicopter-quentin-smith.webp" alt="Polar Expeditions" />
              </div>
              <div className="fd-exped__region-overlay"></div>
              <div className="fd-exped__region-content">
                <span className="fd-exped__region-tag">Extreme</span>
                <h3 className="fd-exped__region-title">Polar Expeditions</h3>
                <p className="fd-exped__region-desc">North Pole • South Pole • Greenland • Antarctica</p>
                <div className="fd-exped__region-meta">
                  <span className="fd-exped__region-duration">10-21 Days</span>
                  <span className="fd-exped__region-arrow">→</span>
                </div>
              </div>
              <div className="fd-exped__region-badge">
                <span>World</span>
                <span>Record</span>
                <span>Holder</span>
              </div>
            </Link>

            {/* European */}
            <Link to="/expeditions?region=european" className="fd-exped__region-card fd-exped__region-card--euro">
              <div className="fd-exped__region-bg">
                <img src="/assets/images/expeditions/channel.jpg" alt="European Expeditions" />
              </div>
              <div className="fd-exped__region-overlay"></div>
              <div className="fd-exped__region-content">
                <span className="fd-exped__region-tag">Classic</span>
                <h3 className="fd-exped__region-title">European Journeys</h3>
                <p className="fd-exped__region-desc">Scottish Highlands • Norwegian Fjords • Swiss Alps • Iceland</p>
                <div className="fd-exped__region-meta">
                  <span className="fd-exped__region-duration">4-7 Days</span>
                  <span className="fd-exped__region-arrow">→</span>
                </div>
              </div>
            </Link>

            {/* Tropical */}
            <Link to="/expeditions?region=tropical" className="fd-exped__region-card fd-exped__region-card--tropical">
              <div className="fd-exped__region-bg">
                <img src="/assets/images/expeditions/helicopter-expeditions-quentin-smith.webp" alt="Tropical Expeditions" />
              </div>
              <div className="fd-exped__region-overlay"></div>
              <div className="fd-exped__region-content">
                <span className="fd-exped__region-tag">Paradise</span>
                <h3 className="fd-exped__region-title">Tropical Escapes</h3>
                <p className="fd-exped__region-desc">Bahamas • Costa Rica • Caribbean Islands</p>
                <div className="fd-exped__region-meta">
                  <span className="fd-exped__region-duration">7-10 Days</span>
                  <span className="fd-exped__region-arrow">→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>


        {/* Upcoming Expeditions - Departure Board Style */}
        <div className="fd-exped__departures">
          <div className="fd-exped__departures-header">
            <span className="fd-exped__departures-status">NOW BOARDING</span>
            <h3 className="fd-exped__departures-title">Upcoming Expeditions</h3>
          </div>
          <div className="fd-exped__departures-board">
            <div className="fd-exped__departure">
              <span className="fd-exped__departure-badge fd-exped__departure-badge--new">NEW</span>
              <span className="fd-exped__departure-date">AUG 2025</span>
              <span className="fd-exped__departure-dest">GREENLAND EXPLORER</span>
              <span className="fd-exped__departure-duration">10 Days</span>
              <span className="fd-exped__departure-status fd-exped__departure-status--boarding">BOOKING</span>
            </div>
            <div className="fd-exped__departure">
              <span className="fd-exped__departure-badge fd-exped__departure-badge--spaces">SPACES</span>
              <span className="fd-exped__departure-date">MAR 2026</span>
              <span className="fd-exped__departure-dest">ICELAND: NORTHERN LIGHTS</span>
              <span className="fd-exped__departure-duration">7 Days</span>
              <span className="fd-exped__departure-status fd-exped__departure-status--open">OPEN</span>
            </div>
            <div className="fd-exped__departure">
              <span className="fd-exped__departure-badge fd-exped__departure-badge--filling">FILLING</span>
              <span className="fd-exped__departure-date">JUN 2026</span>
              <span className="fd-exped__departure-dest">SCOTTISH HIGHLANDS</span>
              <span className="fd-exped__departure-duration">5 Days</span>
              <span className="fd-exped__departure-status fd-exped__departure-status--limited">LIMITED</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="fd-exped__cta">
          <div className="fd-exped__cta-content">
            <p className="fd-exped__cta-text">Ready to embark on the journey of a lifetime?</p>
            <div className="fd-exped__cta-buttons">
              <Link to="/expeditions" className="fd-exped__btn fd-exped__btn--primary">View All Expeditions</Link>
              <Link to="/contact?subject=expedition" className="fd-exped__btn fd-exped__btn--outline">Enquire Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PARALLAX: SALES ===== */}
      <ParallaxSection
        image="/assets/images/facility/main-sales-pic.jpg"
        alt="Aircraft Sales"
        className="reveal-element"
        waves={true}
      >
        <h2 className="parallax-section__title">Sales</h2>
      </ParallaxSection>

      <section className="fd-sales reveal-element" id="sales">
        <div className="fd-sales__header">
          <span className="fd-sales__pre-title">Your Search Starts Here</span>
          <h2 className="fd-sales__title">
            <span className="fd-sales__title-word fd-sales__title-word--1">Find</span>
            <span className="fd-sales__title-word fd-sales__title-word--2">Your Next</span>
            <span className="fd-sales__title-word fd-sales__title-word--3">Aircraft</span>
          </h2>
          <p className="fd-sales__text">
            New and pre-owned helicopters, expertly sourced and prepared to the highest standards.
          </p>
          <div className="fd-sales__header-divider"></div>
        </div>

        {/* Robinson Authorized Dealer — cert-98 Split Dots */}
        <DealerSplitDots />

        {/* ── Section 1: New Aircraft ── */}
        <div className="fd-sales__subsection">
        <h3 className="fd-sales__section-title">New Aircraft</h3>
        <p className="fd-sales__section-desc">
          As an authorised Robinson dealer, we supply factory-new R22, R44, R66 and R88 helicopters — configured to your specification, delivered with full warranty and backed by our in-house maintenance team from day one.
        </p>
        <div className="fd-sales__grid">
          <Link to="/sales/new?model=r88" className="fd-sales__card fd-sales__card--featured">
            <div className="fd-sales__card-badge">NEW</div>
            <div className="fd-sales__card-image">
              <img src="/assets/images/new-aircraft/r88/r88-jellybean-left.png" alt="R88" />
            </div>
            <div className="fd-sales__card-info">
              <h3>R88</h3>
              <span className="fd-sales__card-tagline">The Future of Rotorcraft</span>
              <div className="fd-sales__card-specs">
                <span>8 seats</span>
                <span>140 kts</span>
                <span>Turbine</span>
              </div>
              <span className="fd-sales__card-price">POA</span>
            </div>
          </Link>

          <Link to="/sales/new?model=r66" className="fd-sales__card">
            <div className="fd-sales__card-image">
              <img src="/assets/images/new-aircraft/r66/blue-r66-palo-verde-left-v4.png" alt="R66" />
            </div>
            <div className="fd-sales__card-info">
              <h3>R66</h3>
              <span className="fd-sales__card-tagline">Turbine Performance</span>
              <div className="fd-sales__card-specs">
                <span>5 seats</span>
                <span>120 kts</span>
                <span>Turbine</span>
              </div>
              <span className="fd-sales__card-price">$1,290,000</span>
            </div>
          </Link>

          <Link to="/sales/new?model=r44" className="fd-sales__card">
            <div className="fd-sales__card-image">
              <img src="/assets/images/new-aircraft/r44/raven-ii-front-alpha.png" alt="R44" />
            </div>
            <div className="fd-sales__card-info">
              <h3>R44</h3>
              <span className="fd-sales__card-tagline">World's Best-Selling</span>
              <div className="fd-sales__card-specs">
                <span>4 seats</span>
                <span>113 kts</span>
                <span>Piston</span>
              </div>
              <span className="fd-sales__card-price">$535,000</span>
            </div>
          </Link>

          <Link to="/sales/new?model=r22" className="fd-sales__card">
            <div className="fd-sales__card-image">
              <img src="/assets/images/new-aircraft/r22/r22-red-volcano-front-alpha-v3.png" alt="R22" />
            </div>
            <div className="fd-sales__card-info">
              <h3>R22</h3>
              <span className="fd-sales__card-tagline">Training Excellence</span>
              <div className="fd-sales__card-specs">
                <span>2 seats</span>
                <span>96 kts</span>
                <span>Piston</span>
              </div>
              <span className="fd-sales__card-price">$345,000</span>
            </div>
          </Link>
        </div>

        <div className="fd-sales__actions">
          <Link to="/sales/new" className="fd-sales__btn fd-sales__btn--primary">View New Aircraft</Link>
        </div>
        </div>

        {/* ── Section 2: Rebuilt Aircraft ── */}
        <div className="fd-sales__subsection">
        <h3 className="fd-sales__section-title">Rebuilt Aircraft</h3>
        <p className="fd-sales__section-desc">
          Complete helicopter rebuilds from airframe up. Zero-time engines, new wiring, custom avionics, fresh paint — returned to you in better-than-new condition.
        </p>
        <div className="mv14-beforeafter">
          <span className="mv14-beforeafter__label">The Transformation</span>

          {/* Step indicators */}
          <div className="mv14-beforeafter__steps">
            {rebuildSteps.map((step, i) => (
              <button
                key={i}
                className={`mv14-beforeafter__step ${rebuildStep === i ? 'mv14-beforeafter__step--active' : ''}`}
                onClick={() => setRebuildStep(i)}
              >
                <span className="mv14-beforeafter__step-num">{i + 1}</span>
                <span className="mv14-beforeafter__step-label">{step.label}</span>
              </button>
            ))}
          </div>

          {/* Active pair */}
          <div className="mv14-beforeafter__item">
            <div className="mv14-beforeafter__before">
              <div className="mv14-beforeafter__img">
                <img src={rebuildSteps[rebuildStep].before} alt={`${rebuildSteps[rebuildStep].label} — before`} />
              </div>
              <span>BEFORE</span>
              <p>{rebuildSteps[rebuildStep].beforeDesc}</p>
            </div>
            <div className="mv14-beforeafter__arrow">&rarr;</div>
            <div className="mv14-beforeafter__after">
              <div className="mv14-beforeafter__img">
                <img src={rebuildSteps[rebuildStep].after} alt={`${rebuildSteps[rebuildStep].label} — after`} />
              </div>
              <span>AFTER</span>
              <p>{rebuildSteps[rebuildStep].afterDesc}</p>
            </div>
          </div>

          {/* Prev / Next nav */}
          <div className="mv14-beforeafter__nav">
            <button
              className="mv14-beforeafter__nav-btn"
              onClick={() => setRebuildStep(prev => Math.max(0, prev - 1))}
              disabled={rebuildStep === 0}
            >
              &larr; Prev
            </button>
            <span className="mv14-beforeafter__nav-count">{rebuildStep + 1} / {rebuildSteps.length}</span>
            <button
              className="mv14-beforeafter__nav-btn"
              onClick={() => setRebuildStep(prev => Math.min(rebuildSteps.length - 1, prev + 1))}
              disabled={rebuildStep === rebuildSteps.length - 1}
            >
              Next &rarr;
            </button>
          </div>
        </div>

        <div className="fd-sales__actions">
          <Link to="/contact?subject=rebuild" className="fd-sales__btn fd-sales__btn--primary">Book Your Aircraft into Our Rebuild Programme</Link>
          <Link to="/sales/rebuilds" className="fd-sales__btn fd-sales__btn--outline">Browse Rebuilds</Link>
        </div>
        </div>

        {/* ── Section 3: Pre-Owned Aircraft ── */}
        <div className="fd-sales__subsection">
        <h3 className="fd-sales__section-title">Pre-Owned Aircraft</h3>
        <p className="fd-sales__section-desc" style={{ marginBottom: '1.5rem' }}>
          Our clients regularly trade, upgrade and renew their fleets — which means we always have access to quality pre-owned aircraft at every stage of life. Many come directly from owners whose maintenance we've managed for years, so we know every hour, every component and every logbook entry. When the right aircraft isn't already on our doorstep, we'll source it — inspecting the airframe, engine and avionics on-site before it ever reaches you. Looking for something specific? Talk to our sales team and we'll begin the search.
        </p>
        <div className="fd-sales__carousel">
          {[
            { model: 'R44 Raven II', year: 2019, hours: '1,200', img: '/assets/images/new-aircraft/r44/raven-ii-front-alpha.png' },
            { model: 'R66 Turbine', year: 2021, hours: '800', img: '/assets/images/new-aircraft/r66/blue-r66-palo-verde-left-v4.png' },
            { model: 'R22 Beta II', year: 2017, hours: '2,100', img: '/assets/images/new-aircraft/r22/r22-red-volcano-front-alpha-v3.png' },
            { model: 'R44 Cadet', year: 2020, hours: '950', img: '/assets/images/new-aircraft/r44/raven-ii-front-alpha.png' },
            { model: 'R66 Turbine', year: 2018, hours: '1,800', img: '/assets/images/new-aircraft/r66/blue-r66-palo-verde-left-v4.png' },
            { model: 'Cabri G2', year: 2022, hours: '400', img: '/assets/images/new-aircraft/r22/r22-red-volcano-front-alpha-v3.png' },
          ].map((ac, i) => (
            <div className="fd-sales__sold-card" key={i}>
              <div className="fd-sales__sold-badge">SOLD</div>
              <div className="fd-sales__sold-image">
                <img src={ac.img} alt={ac.model} />
              </div>
              <div className="fd-sales__sold-info">
                <strong>{ac.model}</strong>
                <span>{ac.year} &middot; {ac.hours} hrs</span>
              </div>
            </div>
          ))}
        </div>
        <div className="fd-sales__actions">
          <Link to="/sales/pre-owned" className="fd-sales__btn fd-sales__btn--primary">Browse Pre-Owned Aircraft</Link>
        </div>
        </div>
      </section>

      {/* ===== PARALLAX: MAINTENANCE ===== */}
      <ParallaxSection
        image="/assets/images/facility/maintenance-.jpg"
        alt="Maintenance"
        className="reveal-element"
        waves={true}
      >
        <h2 className="parallax-section__title">Maintenance</h2>
      </ParallaxSection>

      {/* ===== MAINTENANCE ===== */}
      <section className="fd-maint fd-maint--cardgrid" id="maintenance">

        {/* Cert card — Robinson primary — cert-97 Split Dots */}
        <ServiceSplitDots />

        {/* Rich hero text */}
        <div className="fd-maint__header">
          <span className="fd-maint__number">05</span>
          <h2 className="fd-maint__title">Maintenance</h2>
          <p className="fd-maint__text">
            The Robinson Specialists since 2010. Founded by Captain Quentin Smith — 2x World
            Helicopter Aerobatics Champion and the first person to fly a helicopter to both the
            North and South Poles — HQ Aviation was built on one conviction: maintenance isn't
            a service, it's a sacred responsibility. As Robinson Authorised Dealer, Factory
            Distributor, and Designated Service Centre for the full Robinson range — R22, R44,
            and R66 — plus Guimbal Cabri G2 certified and multi-type experienced across Airbus,
            Bell, and MD platforms, our 12 factory-trained engineers work from a purpose-built
            12,000 sq ft climate-controlled facility at Denham Aerodrome. 8 heated service bays
            run simultaneously, backed by a &pound;500K+ genuine parts inventory — 1,200+ engine
            parts, 800+ airframe components, 2,000+ consumables — ensuring same-day dispatch
            and minimal downtime. Spectrometric oil analysis on every service. Flight-tested
            before every release. Nothing leaves our hangar that we wouldn't fly our own
            families in.
          </p>
        </div>

        {/* Simple 6-card grid (from maint-10) */}
        <div className="fd-maint__grid6">
          <div className="fd-maint__grid6-card">
            <span className="fd-maint__grid6-icon"><i className="fas fa-search"></i></span>
            <h4>Inspections</h4>
            <p>50-hour, 100-hour, annual &amp; progressive. Spectrometric oil analysis, compression checks, and full control system review on Robinson &amp; Cabri fleets.</p>
          </div>
          <div className="fd-maint__grid6-card">
            <span className="fd-maint__grid6-icon"><i className="fas fa-cogs"></i></span>
            <h4>Overhauls &amp; Rebuilds</h4>
            <p>12-year and 2,200-hour major overhauls. Complete strip-down, NDT testing, factory-spec rebuild. 40+ Robinsons rebuilt by our chief engineer alone.</p>
          </div>
          <div className="fd-maint__grid6-card">
            <span className="fd-maint__grid6-icon"><i className="fas fa-microchip"></i></span>
            <h4>Avionics &amp; Upgrades</h4>
            <p>Dedicated avionics workshop. Glass cockpit conversions, GPS/NAV systems, ADS-B, transponder upgrades. Modern situational awareness by qualified specialists.</p>
          </div>
          <div className="fd-maint__grid6-card">
            <span className="fd-maint__grid6-icon"><i className="fas fa-exclamation-triangle"></i></span>
            <h4>24/7 AOG &amp; Parts</h4>
            <p>Aircraft on Ground emergency response across Europe. &pound;500K genuine parts inventory — 1,200+ engine, 800+ airframe, 2,000+ consumables. Same-day dispatch.</p>
          </div>
          <div className="fd-maint__grid6-card">
            <span className="fd-maint__grid6-icon"><i className="fas fa-paint-roller"></i></span>
            <h4>Paint &amp; Refurbishment</h4>
            <p>Dedicated in-house paint shop. Complete interior/exterior restoration, corrosion treatment, and custom livery. Factory-new finish from our Denham facility.</p>
          </div>
          <div className="fd-maint__grid6-card">
            <span className="fd-maint__grid6-icon"><i className="fas fa-helicopter"></i></span>
            <h4>Ownership Services</h4>
            <p>Pre-purchase inspections, aircraft management, leaseback revenue programmes, secure heated hangarage, worldwide ferry flights, and new &amp; used sales.</p>
          </div>
        </div>

        {/* Team portraits */}
        <div className="mv12-portraits">
          <h3 className="mv12-crosshead">The People Behind the Panels</h3>
          <div className="mv12-portraits__row">
            <div className="mv12-portraits__person">
              <div className="mv12-portraits__circle">DC</div>
              <strong>David Cross</strong>
              <span>Chief Engineer &middot; 25+ years &middot; 40+ Robinson rebuilds &middot; EASA Part 66</span>
            </div>
            <div className="mv12-portraits__person">
              <div className="mv12-portraits__circle">MF</div>
              <strong>Michael Fowler</strong>
              <span>Senior Engineer &middot; 18 years &middot; Avionics Specialist &middot; Glass cockpit conversions</span>
            </div>
            <div className="mv12-portraits__person">
              <div className="mv12-portraits__circle">DC</div>
              <strong>David Clarke</strong>
              <span>Engine Specialist &middot; 15 years &middot; Lycoming &amp; RR300 certified</span>
            </div>
            <div className="mv12-portraits__person">
              <div className="mv12-portraits__circle">+9</div>
              <strong>Supporting Team</strong>
              <span>12 factory-trained engineers total &middot; All EASA Part 66 licensed &middot; Robinson type-rated</span>
            </div>
          </div>
        </div>

        {/* Facility strip (from maint-12) */}
        <div className="mv12-strip">
          <div className="mv12-strip__item">
            <div className="mv12-strip__img-placeholder"><i className="fas fa-warehouse"></i></div>
            <span>Main Hangar &middot; 12,000 sq ft</span>
          </div>
          <div className="mv12-strip__item">
            <div className="mv12-strip__img-placeholder"><i className="fas fa-wrench"></i></div>
            <span>Service Bay &middot; 8 Heated Bays</span>
          </div>
          <div className="mv12-strip__item">
            <div className="mv12-strip__img-placeholder"><i className="fas fa-spray-can"></i></div>
            <span>Paint Shop &middot; Custom Livery</span>
          </div>
          <div className="mv12-strip__item">
            <div className="mv12-strip__img-placeholder"><i className="fas fa-microchip"></i></div>
            <span>Avionics Workshop</span>
          </div>
          <div className="mv12-strip__item">
            <div className="mv12-strip__img-placeholder"><i className="fas fa-boxes"></i></div>
            <span>Parts Store &middot; &pound;500K+ Inventory</span>
          </div>
        </div>

        <div className="fd-maint__actions">
          <Link to="/maintenance" className="fd-maint__btn fd-maint__btn--primary">Explore Our Maintenance</Link>
        </div>
      </section>


      {/* ===== EDITORIAL GRID (Hero 90) ===== */}
      <div className="reveal-element">
        <EditorialGrid />
      </div>

      {/* ===== BLOG SECTION ===== */}
      <div className="reveal-element">
        <BlogSection />
      </div>

      {/* ===== FOOTER ===== */}
      <FooterMinimal />


      <style>{`
        /* ===== BASE STYLES ===== */
        body {
          overflow-x: clip;
        }

        .final-draft {
          font-family: 'Space Grotesk', -apple-system, sans-serif;
          background: #faf9f6;
          color: #1a1a1a;
        }

        /* ===== HERO SECTION ===== */
        .fd-hero {
          position: relative;
          height: calc(400vh + 250px); /* 4 sections worth of scroll + 250px */
          overflow: hidden;
          background-color: var(--hq-background, #faf9f6);
          transition: none; /* No transition when expanding back */
        }

        .fd-hero--collapsed {
          height: calc(400vh + 250px - 80vh);
          background-color: #ffffff;
          transition: height 1.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 1.5s ease;
        }

        .fd-hero--collapsed .fd-hero__image,
        .fd-hero--collapsed .fd-hero__grid,
        .fd-hero--collapsed .fd-hero__path-svg {
          pointer-events: none !important;
        }

        /* Hero Scroll Path */
        .fd-hero__path-svg {
          position: fixed;
          left: 0;
          width: 100%;
          height: 30vh;
          z-index: 0;
          pointer-events: none;
          opacity: 0.6;
          transition: opacity 0.5s ease;
        }

        .fd-hero__path-svg--top {
          top: 0;
        }

        .fd-hero__path-svg--bottom {
          bottom: 0;
        }

        .fd-hero__path-svg--hidden {
          opacity: 0;
        }

        /* Animated Grid Lines */
        .fd-hero__grid {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 100vh;
          pointer-events: none;
          z-index: 1;
        }

        .fd-hero__line {
          position: absolute;
          background: #e8e6e2;
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fd-hero__grid--visible .fd-hero__line {
          transform: scaleY(1);
        }

        .fd-hero__line--v1 { left: 5%; top: 0; bottom: 0; width: 1px; transition-delay: 0.1s; }
        .fd-hero__line--v2 { left: 28%; top: 0; bottom: 0; width: 1px; transition-delay: 0.2s; }
        .fd-hero__line--v3 { left: 72%; top: 0; bottom: 0; width: 1px; transition-delay: 0.3s; }
        .fd-hero__line--v4 { left: 95%; top: 0; bottom: 0; width: 1px; transition-delay: 0.4s; }

        .fd-hero__line--h1,
        .fd-hero__line--h2 {
          transform: scaleX(0);
          transform-origin: left;
        }

        .fd-hero__grid--visible .fd-hero__line--h1,
        .fd-hero__grid--visible .fd-hero__line--h2 {
          transform: scaleX(1);
        }

        .fd-hero__line--h1 { top: 15%; left: 0; right: 0; height: 1px; transition-delay: 0.5s; }
        .fd-hero__line--h2 { bottom: 15%; left: 0; right: 0; height: 1px; transition-delay: 0.6s; }

        .fd-hero__line--hidden {
          opacity: 0 !important;
          transition: opacity 0.5s ease !important;
        }

        /* Fixed Side Images */
        .fd-hero__image {
          position: fixed;
          top: 0;
          height: 100vh;
          width: 28%;
          z-index: 2;
          overflow: hidden;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease;
        }

        .fd-hero__image--left {
          left: 0;
          transition-delay: 0.3s;
        }

        .fd-hero__image--right {
          right: 0;
          transition-delay: 0.4s;
        }

        .fd-hero__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Cycling images */
        .fd-hero__cycle-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }

        .fd-hero__cycle-img--active {
          opacity: 1;
        }

        .fd-hero__image--expanded {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Scrolling Content Container */
        .fd-hero__scroll-container {
          position: fixed;
          top: 0;
          left: 28%;
          right: 28%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 10;
          padding: 2rem;
          box-shadow: -15px 0 30px -10px rgba(0, 0, 0, 0.3), 15px 0 30px -10px rgba(0, 0, 0, 0.3);
          transition: opacity 0.5s ease;
        }

        .fd-hero--collapsed .fd-hero__scroll-container {
          pointer-events: none !important;
        }

        
        .fd-hero__section {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          pointer-events: none;
        }

        .fd-hero__section--active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* Hidden states - elements fade out after hero section */
        .fd-hero__scroll-container--hidden,
        .fd-hero__scroll-prompt--hidden,
        .fd-hero__progress--hidden,
        .fd-hero__grid--hidden {
          opacity: 0;
          pointer-events: none !important;
          transition: opacity 0.5s ease;
        }

        .fd-hero__scroll-container--hidden .fd-hero__section--active {
          pointer-events: none;
        }

        /* Section with image - side by side layout */
        .fd-hero__section--with-image {
          flex-direction: row;
          align-items: center;
          gap: 3rem;
        }

        .fd-hero__section-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        
        .fd-hero__section--with-image .fd-hero__section-text {
          align-items: flex-start;
          text-align: left;
        }

        .fd-hero__section--with-image .fd-hero__headline {
          align-items: flex-start;
        }

        .fd-hero__section-image {
          width: 280px;
          height: 350px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          flex-shrink: 0;
        }

        .fd-hero__section-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Vertical Dividers */
        .fd-hero__divider {
          width: 1px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fd-hero__divider span {
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, #c0bdb8, transparent);
        }

        .fd-hero__divider--top {
          margin-bottom: 2rem;
        }

        .fd-hero__divider--bottom {
          margin-top: 2rem;
        }

        .fd-hero__divider--hidden {
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        /* Coordinates */
        .fd-hero__coords {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: #999;
        }

        /* Pre-text */
        .fd-hero__pre {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #888;
          margin-bottom: 1rem;
        }

        /* Headline with varying colors */
        .fd-hero__headline {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          margin: 0 0 1.5rem;
        }

        .fd-hero__word {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700;
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          opacity: 0;
          transform: translateY(20px);
          animation: wordFadeIn 0.8s ease forwards;
          animation-delay: var(--delay, 0s);
          text-shadow:
            -8px -8px 0 #faf9f6,
            8px -8px 0 #faf9f6,
            -8px 8px 0 #faf9f6,
            8px 8px 0 #faf9f6,
            0 -8px 0 #faf9f6,
            0 8px 0 #faf9f6,
            -8px 0 0 #faf9f6,
            8px 0 0 #faf9f6,
            -6px -6px 0 #faf9f6,
            6px -6px 0 #faf9f6,
            -6px 6px 0 #faf9f6,
            6px 6px 0 #faf9f6,
            -4px -4px 0 #faf9f6,
            4px -4px 0 #faf9f6,
            -4px 4px 0 #faf9f6,
            4px 4px 0 #faf9f6;
        }

        /* Varying colors for luxury feel */
        .fd-hero__word--1 {
          color: #1a1a1a;
        }

        .fd-hero__word--2 {
          color: #4a4a4a;
        }

        .fd-hero__word--3 {
          color: #7a7a7a;
        }

        @keyframes wordFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Description */
        .fd-hero__desc {
          font-size: 1rem;
          color: #666;
          max-width: 300px;
          line-height: 1.6;
          text-shadow:
            -4px -4px 0 #faf9f6,
            4px -4px 0 #faf9f6,
            -4px 4px 0 #faf9f6,
            4px 4px 0 #faf9f6,
            0 -4px 0 #faf9f6,
            0 4px 0 #faf9f6,
            -4px 0 0 #faf9f6,
            4px 0 0 #faf9f6;
        }

        /* Scroll Prompt */
        .fd-hero__scroll-prompt {
          position: fixed;
          bottom: 0.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          z-index: 20;
        }

        .fd-hero__scroll-text {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #999;
        }

        .fd-hero__scroll-line {
          width: 1px;
          height: 50px;
          background: rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }

        .fd-hero__scroll-line span {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 30%;
          background: #1a1a1a;
          animation: scrollLineMove 2s ease-in-out infinite;
        }

        @keyframes scrollLineMove {
          0% { top: -30%; }
          100% { top: 100%; }
        }

        /* Progress Indicator */
        .fd-hero__progress {
          position: fixed;
          right: 3rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          z-index: 20;
        }

        .fd-hero__progress-dot {
          width: 8px;
          height: 8px;
          border: 1px solid #ccc;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .fd-hero__progress-dot--active {
          background: #1a1a1a;
          border-color: #1a1a1a;
        }

        /* ===== ABOUT SECTION ===== */
        .fd-about {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 2rem 6rem 2rem;
          background: #fff;
          position: relative;
          overflow: visible;
        }

        .fd-about__content {
          max-width: 800px;
          text-align: center;
        }

        .fd-about__label {
          position: sticky;
          top: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #999;
          margin-top: 20px;
          margin-bottom: 100px;
          padding: 1rem 0;
          background: transparent;
          z-index: 50;
          opacity: 0;
          transition: opacity 0.3s ease, top 0.3s ease;
        }

        .fd-about__label--visible {
          opacity: 1;
        }

        .fd-about__label--static {
          top: -50px;
          opacity: 0;
        }

        .fd-about__label-line {
          width: 60px;
          height: 1px;
          background: var(--hq-border, #e8e6e2);
        }

        .fd-about__headline {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin: 0 0 3rem;
        }

        .fd-about__headline span {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.1;
          text-transform: uppercase;
        }

        .fd-about__headline span:nth-child(1) { color: #1a1a1a; }
        .fd-about__headline span:nth-child(2) { color: #4a4a4a; }
        .fd-about__headline span:nth-child(3) { color: #7a7a7a; }

        .fd-about__headline--single-line {
          flex-direction: row;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }

        .fd-about__video {
          margin-bottom: 3rem;
          position: relative;
          z-index: 1;
        }

        .fd-about__video-lines {
          position: absolute;
          top: 55%;
          left: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 30px;
          z-index: 0;
          pointer-events: none;
        }

        .fd-about__line {
          height: 1px;
          width: 100%;
          background: #ccc;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 1.2s ease-out;
        }

        .fd-about__video-lines.visible .fd-about__line {
          transform: scaleX(1);
        }

        .fd-about__video-lines.visible .fd-about__line--1 {
          transition-delay: 0.15s;
        }

        .fd-about__video-lines.visible .fd-about__line--2 {
          transition-delay: 0s;
        }

        .fd-about__video-lines.visible .fd-about__line--3 {
          transition-delay: 0.15s;
        }

        
        .fd-about__video-placeholder {
          position: relative;
          aspect-ratio: 16/9;
          background: #f0f0f0;
          overflow: hidden;
          z-index: 1;
          box-shadow: -20px 0 40px -10px rgba(0, 0, 0, 0.15), 20px 0 40px -10px rgba(0, 0, 0, 0.15);
        }

        .fd-about__video-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .fd-about__video-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        
        .fd-about__play-btn {
          width: 80px;
          height: 80px;
          border: 2px solid #fff;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }

        .fd-about__play-btn span {
          position: absolute;
          top: 50%;
          left: 55%;
          transform: translate(-50%, -50%);
          width: 0;
          height: 0;
          border-left: 16px solid #fff;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
        }

        .fd-about__play-btn:hover {
          background: rgba(255,255,255,0.1);
          transform: scale(1.05);
        }

        .fd-about__video-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #fff;
        }

        .fd-about__text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #666;
          margin-bottom: 2rem;
        }

        .fd-about__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: #1a1a1a;
          color: #fff;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .fd-about__btn:hover {
          background: #333;
        }

        /* ===== HORIZONTAL ACCORDION NAV ===== */
        .fd-nav {
          position: relative;
          z-index: 100;
          background: #fff;
          border-top: 1px solid #e8e6e2;
          border-bottom: 1px solid #e8e6e2;
          padding: 0;
          transition: top 0.3s ease;
        }

        .fd-nav--fixed {
          position: fixed;
          top: 49px;
          left: 0;
          right: 0;
        }

        .fd-nav--fixed.fd-nav--compact {
          top: 20px;
        }

        .fd-nav__header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem 2rem;
          border-bottom: 1px solid #e8e6e2;
        }

        .fd-nav__header span:nth-child(2) {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #999;
          flex-shrink: 0;
        }

        .fd-nav__line {
          flex: 1;
          height: 1px;
          background: #e8e6e2;
        }

        .fd-nav__accordion {
          display: flex;
        }

        .fd-nav__item {
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          border-right: 1px solid #e8e6e2;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .fd-nav__item:last-child {
          border-right: none;
        }

        .fd-nav__item:hover {
          background: #f5f5f2;
        }

        .fd-nav__item--active {
          background: #e8e6e2;
        }

        .fd-nav__item--active .fd-nav__item-icon {
          color: #666;
        }

        .fd-nav__item--active .fd-nav__item-label {
          color: #1a1a1a;
        }

        .fd-nav__item--active:hover {
          background: #ddd;
        }

        .fd-nav__item-icon {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          color: #999;
        }

        .fd-nav__item-label {
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #1a1a1a;
        }

        /* ===== CONTENT SECTIONS ===== */
        .fd-section {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .fd-section--alt {
          background: #fff;
        }

        .fd-section--with-carousel {
          flex-direction: column;
          align-items: stretch;
          gap: 0;
          padding-top: 0;
          padding-bottom: 0;
          padding-left: 0;
          padding-right: 0;
        }

        .fd-section__inner {
          max-width: 600px;
          text-align: center;
        }

        .fd-section__badge {
          margin-bottom: 1.5rem;
        }

        .fd-section__badge-logo {
          height: 60px;
          width: auto;
          opacity: 0.9;
          transition: opacity 0.3s ease;
        }

        .fd-section__badge-logo:hover {
          opacity: 1;
        }

        .fd-section__number {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          color: #999;
          margin-bottom: 1rem;
        }

        .fd-section__title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          text-transform: uppercase;
          margin: 0 0 1.5rem;
          color: #1a1a1a;
        }

        .fd-section__text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #666;
          margin-bottom: 2rem;
        }

        .fd-section__link {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #1a1a1a;
          text-decoration: none;
          border-bottom: 1px solid #ccc;
          padding-bottom: 0.25rem;
          transition: all 0.3s ease;
        }

        .fd-section__link:hover {
          border-color: #1a1a1a;
        }

        /* ===== TRAINING HEADER ===== */
        .fd-training-header {
          text-align: center;
          padding: 4rem 2rem 3rem;
          background: #fff;
          box-shadow: -15px 0 30px -10px rgba(0, 0, 0, 0.1), 15px 0 30px -10px rgba(0, 0, 0, 0.1), 0 15px 30px -10px rgba(0, 0, 0, 0.1);
          position: relative;
          left: 50%;
          right: 50%;
          width: 100vw;
          margin-left: -50vw;
          margin-right: -50vw;
          box-sizing: border-box;
          z-index: 10;
        }

        .fd-training-header__divider {
          width: 60px;
          height: 1px;
          background: #e8e6e2;
          margin: 0 auto 2rem;
        }

        .fd-training-header__title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 700;
          text-transform: uppercase;
          margin: 0 0 1rem;
          color: #1a1a1a;
        }

        .fd-training-header__text {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        /* ===== SCROLL PATH WRAPPER ===== */
        .fd-scroll-path-wrapper {
          width: 100%;
          box-sizing: border-box;
          background: var(--hq-background, #faf9f6);
          position: relative;
        }

        .fd-scroll-path-wrapper .scroll-path-section {
          width: 100%;
          margin-left: 0;
          margin-right: 0;
        }

        /* ===== SECTION DIVIDER ===== */
        .fd-section-divider {
          width: 80px;
          height: 1px;
          background: #e0e0e0;
          margin: 0 auto 2.5rem;
        }

        /* ===== CAROUSEL SECTION ===== */
        .fd-carousel-section {
          padding: 2.5rem 2rem 6rem;
          background: #fff;
          width: 100vw;
          margin-left: -50vw;
          margin-right: -50vw;
          left: 50%;
          right: 50%;
          box-sizing: border-box;
          position: relative;
          z-index: 10;
          box-shadow: inset 0 20px 30px -20px rgba(0, 0, 0, 0.15);
        }

        .fd-carousel-section__header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .fd-carousel-section__label {
          display: inline-block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #999;
          margin-bottom: 1rem;
        }

        .fd-carousel-section__divider {
          width: 60px;
          height: 1px;
          background: #e8e6e2;
          margin: 0 auto 3rem;
        }

        .fd-carousel-section__title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 700;
          text-transform: uppercase;
          margin: 0;
          color: #1a1a1a;
        }

        .fd-carousel-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-align: center;
          margin: 0 0 2rem;
          color: #1a1a1a;
        }

        /* ===== V97 CAROUSEL - MINIMAL WHITE + OUTLINE ===== */
        .carousel--97 { max-width: 1000px; margin: 0 auto; background: #fff; padding: 2rem; border-radius: 16px; border: 1px solid #e5e7eb; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .carousel--97 .carousel__tabs-wrapper { position: relative; margin-bottom: 2rem; }
        .carousel--97 .carousel__tabs-wrapper::before, .carousel--97 .carousel__tabs-wrapper::after { content: ''; position: absolute; top: 0; bottom: 0; width: 40px; pointer-events: none; z-index: 1; }
        .carousel--97 .carousel__tabs-wrapper::before { left: 0; background: linear-gradient(to right, #fff, transparent); }
        .carousel--97 .carousel__tabs-wrapper::after { right: 0; background: linear-gradient(to left, #fff, transparent); }
        .carousel--97 .carousel__tabs { display: flex; gap: 0.5rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.75rem; overflow-x: auto; scrollbar-width: none; }
        .carousel--97 .carousel__tabs::-webkit-scrollbar { display: none; }
        .carousel--97 .carousel__tab { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; background: none; border: none; cursor: pointer; }
        .carousel--97 .carousel__tab-num { font-family: 'Share Tech Mono', monospace; font-size: 0.85rem; font-weight: 600; color: #d1d5db; }
        .carousel--97 .carousel__tab-title { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; white-space: nowrap; }
        .carousel--97 .carousel__tab.active { border-bottom: 1px solid #111827; margin-bottom: -0.75rem; padding-bottom: calc(0.5rem + 0.75rem - 1px); }
        .carousel--97 .carousel__tab.active .carousel__tab-title { color: #111827; }
        .carousel--97 .carousel__body { display: flex; align-items: center; gap: 1.5rem; }
        .carousel--97 .carousel__arrow { padding: 0.75rem 1rem; border: none; background: transparent; cursor: pointer; color: #d1d5db; transition: all 0.3s ease; }
        .carousel--97 .carousel__arrow:hover { color: #111827; }
        .carousel--97 .carousel__main { flex: 1; display: grid; grid-template-columns: 1fr auto 1fr; gap: 2rem; align-items: stretch; }
        .carousel--97 .carousel__image { position: relative; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; min-height: 280px; }
        .carousel--97 .carousel__image img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.5s ease; }
        .carousel--97 .carousel__image img.active { opacity: 1; }
        .carousel--97 .carousel__divider { width: 1px; height: 120px; background: #e5e7eb; align-self: center; }
        .carousel--97 .carousel__content { display: flex; align-items: center; }
        .carousel--97 .carousel__title-row { display: flex; flex-direction: column; align-items: center; margin-bottom: 0.75rem; }
        .carousel--97 .carousel__number-wrapper { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; }
        .carousel--97 .carousel__number-wrapper::before, .carousel--97 .carousel__number-wrapper::after { content: ''; width: 30px; height: 1px; background: #e5e7eb; }
        .carousel--97 .carousel__inline-number { font-family: 'Share Tech Mono', monospace; font-size: 2.5rem; font-weight: 300; color: #d1d5db; line-height: 1; }
        .carousel--97 .carousel__text-content { position: relative; display: grid; background: transparent; border-radius: 12px; padding: 1.5rem; border: 1px solid #e5e7eb; }
        .carousel--97 .carousel__slide-content { grid-area: 1 / 1; opacity: 0; pointer-events: none; display: flex; flex-direction: column; height: 100%; }
        .carousel--97 .carousel__slide-content.active { opacity: 1; pointer-events: auto; }
        .carousel--97 .carousel__slide-content .carousel__btn { margin-top: auto; }
        .carousel--97 .carousel__content h3 { font-size: 1.25rem; font-weight: 500; margin: 0; text-transform: uppercase; text-align: center; color: #111827; letter-spacing: 0.1em; }
        .carousel--97 .carousel__content p { color: #6b7280; line-height: 1.7; margin: 0; padding: 10px 0 20px; font-size: 0.95rem; text-align: center; }
        .carousel--97 .carousel__btn { position: relative; display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 0.75rem 1.5rem; background: transparent; color: #111827; text-decoration: none; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; overflow: hidden; transition: all 0.4s ease; border: 1px solid #111827; border-radius: 8px; }
        .carousel--97 .carousel__btn::before { content: ''; position: absolute; top: 0; left: 0; width: 0; height: 100%; background: #111827; transition: width 0.4s ease; z-index: 0; border-radius: 8px; }
        .carousel--97 .carousel__btn:hover::before { width: 100%; }
        .carousel--97 .carousel__btn:hover { color: #fff; }
        .carousel--97 .carousel__btn span, .carousel--97 .carousel__btn-chevron { position: relative; z-index: 1; }
        .carousel--97 .carousel__progress { height: 1px; background: #e5e7eb; margin-top: 2rem; overflow: hidden; }
        .carousel--97 .carousel__progress-bar { height: 100%; background: #111827; transition: width 0.4s ease; }

        /* V97 Carousel Responsive */
        @media (max-width: 768px) {
          .carousel--97 { max-height: 800px; }
        }

        /* ===== FLEET SECTION (Self-Fly Hire) ===== */
        .fd-fleet {
          background: #faf9f6;
          padding: 0;
        }

        .fd-fleet__intro {
          text-align: center;
          padding: 5rem 2rem 3rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .fd-fleet__pre-title {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #888;
          margin-bottom: 1rem;
        }

        .fd-fleet__title {
          margin: 0 0 1.5rem;
        }

        .fd-fleet__title-line {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          text-transform: uppercase;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .fd-fleet__title-line--1 { color: #1a1a1a; }
        .fd-fleet__title-line--2 { color: #4a4a4a; }

        .fd-fleet__tagline {
          font-size: 1.1rem;
          color: #666;
          font-weight: 400;
        }

        /* Time Comparison Grid */
        .fd-fleet__time-grid {
          background: #1a1a1a;
          padding: 1.25rem 1.5rem;
        }

        .fd-fleet__time-header {
          max-width: 1100px;
          margin: 0 auto 0.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .fd-fleet__time-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.5);
        }

        .fd-fleet__time-legend {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .fd-fleet__legend-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.7);
        }

        .fd-fleet__legend-icon { font-size: 0.85rem; }
        .fd-fleet__legend-icon--heli { width: 16px; height: auto; filter: brightness(0) invert(1); opacity: 0.7; }
        .fd-fleet__legend-divider { color: rgba(255,255,255,0.3); }

        .fd-fleet__destinations {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.6rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .fd-fleet__dest-card {
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .fd-fleet__dest-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }

        .fd-fleet__dest-image {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .fd-fleet__dest-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .fd-fleet__dest-card:hover .fd-fleet__dest-image img {
          transform: scale(1.08);
        }

        .fd-fleet__dest-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, transparent 100%);
        }

        .fd-fleet__dest-time-badge {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255,255,255,0.95);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .fd-fleet__dest-time-value {
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a1a1a;
          letter-spacing: 0.02em;
        }

        .fd-fleet__dest-label {
          padding: 0.75rem;
          background: #1a1a1a;
          text-align: center;
        }

        .fd-fleet__dest-name {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .fd-fleet__time-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.2rem 0;
        }

        .fd-fleet__time-row--car {
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 0.3rem;
        }

        .fd-fleet__time-icon {
          font-size: 0.75rem;
          width: 16px;
          text-align: center;
        }

        .fd-fleet__time-icon--heli {
          width: 16px;
          height: auto;
          filter: brightness(0) invert(1);
        }

        .fd-fleet__time-value {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.6);
        }

        .fd-fleet__time-value--highlight {
          color: #4ade80;
          font-weight: 700;
          font-size: 0.75rem;
        }

        .fd-fleet__time-note {
          font-size: 0.5rem;
          color: rgba(255,255,255,0.3);
          margin-left: auto;
        }

        .fd-fleet__time-saved {
          font-size: 0.5rem;
          color: #4ade80;
          background: rgba(74, 222, 128, 0.15);
          padding: 0.1rem 0.35rem;
          border-radius: 8px;
          margin-left: auto;
        }

        /* Benefits Strip */
        .fd-fleet__benefits {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          padding: 3rem 2rem;
          background: #fff;
          border-bottom: 1px solid #e8e6e2;
        }

        .fd-fleet__benefit {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
        }

        .fd-fleet__benefit-icon {
          width: 32px;
          height: 32px;
          color: #1a1a1a;
        }

        .fd-fleet__benefit-icon svg {
          width: 100%;
          height: 100%;
        }

        .fd-fleet__benefit-stat {
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .fd-fleet__benefit-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #888;
        }

        .fd-fleet__benefit-divider {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, transparent, #e8e6e2, transparent);
        }

        /* Aircraft Showcase */
        .fd-fleet__aircraft {
          padding: 4rem 2rem;
          background: #faf9f6;
        }

        .fd-fleet__aircraft-label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #999;
          text-align: center;
          margin-bottom: 2rem;
        }

        .fd-fleet__aircraft-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .fd-fleet__aircraft-card {
          position: relative;
          background: #fff;
          border: 1px solid #e8e6e2;
          padding: 2rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          text-align: center;
        }

        .fd-fleet__aircraft-card:hover {
          border-color: #1a1a1a;
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.1);
        }

        .fd-fleet__aircraft-card--featured {
          border-color: #1a1a1a;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }

        .fd-fleet__aircraft-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: #1a1a1a;
          color: #fff;
          padding: 0.25rem 0.5rem;
        }

        .fd-fleet__aircraft-image {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .fd-fleet__aircraft-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .fd-fleet__aircraft-info h4 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          text-transform: uppercase;
          margin: 0 0 0.5rem;
          color: #1a1a1a;
        }

        .fd-fleet__aircraft-seats {
          display: block;
          font-size: 0.75rem;
          color: #666;
          margin-bottom: 0.5rem;
        }

        .fd-fleet__aircraft-rate {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem;
          color: #1a1a1a;
          font-weight: 600;
        }

        /* Lifestyle Quote */
        .fd-fleet__lifestyle {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          text-align: center;
        }

        .fd-fleet__quote {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          font-weight: 400;
          font-style: italic;
          color: #fff;
          max-width: 800px;
          margin: 0 auto 1.5rem;
          line-height: 1.6;
        }

        .fd-fleet__quote-attr {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.5);
        }

        /* Fleet CTA */
        .fd-fleet__cta {
          display: flex;
          justify-content: center;
          gap: 1rem;
          padding: 3rem 2rem;
          background: #faf9f6;
        }

        .fd-fleet__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2rem;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .fd-fleet__btn--primary {
          background: #1a1a1a;
          color: #fff;
          border: 1px solid #1a1a1a;
        }

        .fd-fleet__btn--primary:hover {
          background: #333;
        }

        .fd-fleet__btn--outline {
          background: transparent;
          color: #1a1a1a;
          border: 1px solid #1a1a1a;
        }

        .fd-fleet__btn--outline:hover {
          background: #1a1a1a;
          color: #fff;
        }

        /* Fleet Responsive */
        @media (max-width: 1024px) {
          .fd-fleet__destinations {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .fd-fleet__destinations {
            grid-template-columns: 1fr;
            max-width: 400px;
          }

          .fd-fleet__benefits {
            flex-wrap: wrap;
            gap: 2rem;
          }

          .fd-fleet__benefit-divider {
            display: none;
          }

          .fd-fleet__benefit {
            flex: 0 0 calc(50% - 1rem);
          }

          .fd-fleet__aircraft-grid {
            grid-template-columns: 1fr;
            max-width: 350px;
          }

          .fd-fleet__cta {
            flex-direction: column;
            align-items: center;
          }

          .fd-fleet__btn {
            width: 100%;
            max-width: 300px;
          }
        }

        /* ===== EXPEDITIONS SECTION (Immersive) ===== */
        .fd-exped {
          background: #faf9f6;
        }

        /* Cinematic Opening */
        .fd-exped__cinematic {
          position: relative;
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .fd-exped__cinematic-bg {
          position: absolute;
          inset: 0;
        }

        .fd-exped__cinematic-bg video,
        .fd-exped__cinematic-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .fd-exped__cinematic-overlay {
          position: absolute;
          inset: 0;
          background: transparent;
        }

        .fd-exped__globe {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(90vw, 550px);
          height: min(90vw, 550px);
          pointer-events: none;
          z-index: 1;
          color: #1a1a1a;
        }

        .fd-exped__globe svg {
          width: 100%;
          height: 100%;
        }

        .fd-exped__cinematic-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 900px;
          padding: 4rem 2rem;
        }

        .fd-exped__pre-title {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #888;
          margin-bottom: 1rem;
        }

        .fd-exped__title {
          margin: 0 0 2rem;
        }

        .fd-exped__title-word {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 700;
          text-transform: uppercase;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .fd-exped__title-word--1 { color: #1a1a1a; }
        .fd-exped__title-word--2 { color: #4a4a4a; }
        .fd-exped__title-word--3 { color: #7a7a7a; }

        .fd-exped__cinematic-desc {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Stats Bar */
        .fd-exped__stats-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          padding: 2rem;
          background: #1a1a1a;
        }

        .fd-exped__stat-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .fd-exped__stat-num {
          font-family: 'Share Tech Mono', monospace;
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
        }

        .fd-exped__stat-text {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
          line-height: 1.4;
        }

        .fd-exped__stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255,255,255,0.2);
        }

        /* Journey Map */
        .fd-exped__journey {
          padding: 5rem 2rem;
          background: #fff;
        }

        .fd-exped__journey-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .fd-exped__label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #999;
          margin-bottom: 0.5rem;
        }

        .fd-exped__journey-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 700;
          text-transform: uppercase;
          color: #1a1a1a;
          margin: 0;
        }

        .fd-exped__journey-desc {
          font-size: 1rem;
          line-height: 1.7;
          color: #666;
          max-width: 600px;
          margin: 0.75rem auto 0;
        }

        .fd-exped__journey-map {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem;
        }

        .fd-exped__map-svg {
          width: 100%;
          height: auto;
        }

        .fd-exped__map-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          fill: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .fd-exped__map-dest {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          fill: #666;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .fd-exped__map-heli {
          position: absolute;
          width: 30px;
          height: auto;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: heliFloat 3s ease-in-out infinite;
        }

        @keyframes heliFloat {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }

        /* Region Cards */
        .fd-exped__regions {
          padding: 4rem 2rem;
          background: #faf9f6;
        }

        .fd-exped__regions-label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #999;
          text-align: center;
          margin-bottom: 2rem;
        }

        .fd-exped__regions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .fd-exped__region-card {
          position: relative;
          min-height: 400px;
          border-radius: 8px;
          overflow: hidden;
          text-decoration: none;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .fd-exped__region-bg {
          position: absolute;
          inset: 0;
        }

        .fd-exped__region-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .fd-exped__region-card:hover .fd-exped__region-bg img {
          transform: scale(1.1);
        }

        .fd-exped__region-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%);
        }

        .fd-exped__region-content {
          position: relative;
          z-index: 2;
          padding: 2rem;
        }

        .fd-exped__region-tag {
          display: inline-block;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          background: rgba(255,255,255,0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          margin-bottom: 1rem;
        }

        .fd-exped__region-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          text-transform: uppercase;
          margin: 0 0 0.5rem;
        }

        .fd-exped__region-desc {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
          margin: 0 0 1rem;
          line-height: 1.5;
        }

        .fd-exped__region-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .fd-exped__region-duration {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
        }

        .fd-exped__region-arrow {
          font-size: 1.25rem;
          transition: transform 0.3s ease;
        }

        .fd-exped__region-card:hover .fd-exped__region-arrow {
          transform: translateX(5px);
        }

        .fd-exped__region-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #fff;
          color: #1a1a1a;
          padding: 0.5rem;
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-align: center;
          line-height: 1.4;
        }

        .fd-exped__region-badge span {
          display: block;
        }

        /* Leader Section */
        .fd-exped__leader {
          display: flex;
          align-items: center;
          gap: 4rem;
          padding: 5rem 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .fd-exped__leader-image {
          position: relative;
          flex-shrink: 0;
        }

        .fd-exped__leader-image img {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 50%;
        }

        .fd-exped__leader-ring {
          position: absolute;
          inset: -10px;
          border: 1px dashed #ccc;
          border-radius: 50%;
          animation: ringRotate 20s linear infinite;
        }

        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .fd-exped__leader-content {
          flex: 1;
        }

        .fd-exped__leader-role {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #999;
          margin-bottom: 0.5rem;
        }

        .fd-exped__leader-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          margin: 0 0 1.5rem;
          color: #1a1a1a;
        }

        .fd-exped__leader-quote {
          font-size: 1.1rem;
          font-style: italic;
          line-height: 1.8;
          color: #666;
          margin: 0 0 1.5rem;
          padding-left: 1.5rem;
          border-left: 3px solid #e8e6e2;
        }

        .fd-exped__leader-link {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #1a1a1a;
          text-decoration: none;
          border-bottom: 1px solid #ccc;
          padding-bottom: 0.25rem;
          transition: border-color 0.3s ease;
        }

        .fd-exped__leader-link:hover {
          border-color: #1a1a1a;
        }

        /* Departures Board */
        .fd-exped__departures {
          background: #1a1a1a;
          padding: 4rem 2rem;
        }

        .fd-exped__departures-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .fd-exped__departures-status {
          display: inline-block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          color: #4ade80;
          margin-bottom: 0.5rem;
          animation: statusBlink 2s ease-in-out infinite;
        }

        @keyframes statusBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .fd-exped__departures-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #fff;
          margin: 0;
        }

        .fd-exped__departures-board {
          max-width: 900px;
          margin: 0 auto;
          background: #0a0a0a;
          border: 1px solid #333;
          border-radius: 4px;
          overflow: hidden;
        }

        .fd-exped__departure {
          display: grid;
          grid-template-columns: auto 100px 1fr 100px auto;
          gap: 1.5rem;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #222;
          font-family: 'Share Tech Mono', monospace;
        }

        .fd-exped__departure:last-child {
          border-bottom: none;
        }

        .fd-exped__departure-badge {
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.2rem 0.5rem;
          border-radius: 2px;
        }

        .fd-exped__departure-badge--new { background: #3b82f6; color: #fff; }
        .fd-exped__departure-badge--spaces { background: #22c55e; color: #fff; }
        .fd-exped__departure-badge--filling { background: #f59e0b; color: #000; }

        .fd-exped__departure-date {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
        }

        .fd-exped__departure-dest {
          font-size: 1rem;
          color: #fff;
          letter-spacing: 0.05em;
        }

        .fd-exped__departure-duration {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
        }

        .fd-exped__departure-status {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
        }

        .fd-exped__departure-status--boarding { color: #4ade80; }
        .fd-exped__departure-status--open { color: #3b82f6; }
        .fd-exped__departure-status--limited { color: #f59e0b; }

        /* Expedition CTA */
        .fd-exped__cta {
          padding: 4rem 2rem;
          background: #faf9f6;
          text-align: center;
        }

        .fd-exped__cta-text {
          font-size: 1.1rem;
          color: #666;
          margin: 0 0 2rem;
        }

        .fd-exped__cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .fd-exped__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2rem;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .fd-exped__btn--primary {
          background: #1a1a1a;
          color: #fff;
          border: 1px solid #1a1a1a;
        }

        .fd-exped__btn--primary:hover {
          background: #333;
        }

        .fd-exped__btn--outline {
          background: transparent;
          color: #1a1a1a;
          border: 1px solid #1a1a1a;
        }

        .fd-exped__btn--outline:hover {
          background: #1a1a1a;
          color: #fff;
        }

        /* Expeditions Responsive */
        @media (max-width: 1024px) {
          .fd-exped__regions-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
          }

          .fd-exped__region-card {
            min-height: 300px;
          }

          .fd-exped__leader {
            flex-direction: column;
            text-align: center;
          }

          .fd-exped__leader-quote {
            border-left: none;
            padding-left: 0;
            border-top: 3px solid #e8e6e2;
            padding-top: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .fd-exped__stats-bar {
            flex-wrap: wrap;
            gap: 1.5rem;
          }

          .fd-exped__stat-divider {
            display: none;
          }

          .fd-exped__stat-item {
            flex: 0 0 calc(50% - 0.75rem);
            justify-content: center;
          }

          .fd-exped__departure {
            grid-template-columns: 1fr;
            gap: 0.5rem;
            text-align: center;
            padding: 1rem;
          }

          .fd-exped__cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .fd-exped__btn {
            width: 100%;
            max-width: 300px;
          }
        }

        /* ===== CERTIFICATION CARDS (Dealer & Service Center) ===== */
        .fd-cert {
          padding: 0 2rem 3rem;
          display: flex;
          justify-content: center;
        }

        .fd-cert__card {
          position: relative;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          border-radius: 12px;
          overflow: hidden;
          max-width: 900px;
          width: 100%;
        }

        .fd-cert__glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(201, 162, 39, 0.15) 0%, transparent 50%);
          pointer-events: none;
        }

        .fd-cert__glow--blue {
          background: radial-gradient(circle at center, rgba(59, 130, 246, 0.12) 0%, transparent 50%);
        }

        .fd-cert__content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 3rem;
          padding: 2.5rem 3rem;
        }

        .fd-cert__logo-wrap {
          flex-shrink: 0;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .fd-cert__logo {
          height: 80px;
          width: auto;
          display: block;
        }

        .fd-cert__info {
          flex: 1;
        }

        .fd-cert__label {
          display: inline-block;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #c9a227;
          background: rgba(201, 162, 39, 0.15);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          margin-bottom: 0.75rem;
        }

        .fd-cert__card--service .fd-cert__label {
          color: #60a5fa;
          background: rgba(96, 165, 250, 0.15);
        }

        .fd-cert__title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 0.75rem;
        }

        .fd-cert__desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 1.5rem;
          max-width: 500px;
        }

        .fd-cert__stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .fd-cert__stat {
          text-align: center;
        }

        .fd-cert__stat-value {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
        }

        .fd-cert__stat-label {
          display: block;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.25rem;
        }

        .fd-cert__stat-divider {
          width: 1px;
          height: 30px;
          background: rgba(255, 255, 255, 0.2);
        }

        .fd-cert__also {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem 1.5rem;
          background: #2a2a2a;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .fd-cert__also-label {
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.35);
        }
        .fd-cert__also-item {
          font-size: 0.6rem;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.55);
        }
        .fd-cert__also-sep {
          font-size: 0.5rem;
          color: #ccc;
        }

        @media (max-width: 768px) {
          .fd-cert__content {
            flex-direction: column;
            text-align: center;
            padding: 2rem;
            gap: 1.5rem;
          }

          .fd-cert__desc {
            max-width: none;
          }

          .fd-cert__stats {
            justify-content: center;
          }
        }

        /* ===== SALES SECTION ===== */
        .fd-sales {
          padding: 2rem 2rem 5rem;
          background: #fff;
        }

        .fd-sales__header {
          text-align: center;
          padding: 4rem 2rem 32px;
          margin-bottom: 0;
        }

        .fd-sales__number {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          color: #999;
          margin-bottom: 1rem;
        }

        .fd-sales__pre-title {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #888;
          margin-bottom: 1rem;
        }

        .fd-sales__title {
          margin: 0 0 2rem;
        }

        .fd-sales__title-word {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 700;
          text-transform: uppercase;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .fd-sales__title-word--1 { color: #1a1a1a; }
        .fd-sales__title-word--2 { color: #4a4a4a; }
        .fd-sales__title-word--3 { color: #7a7a7a; }

        .fd-sales__text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        .fd-sales__header-divider {
          width: 60px;
          height: 1px;
          background: #ccc;
          margin: 1.5rem auto 0;
        }

        .fd-sales__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .fd-sales__card {
          background: #faf9f6;
          border: 1px solid #e8e6e2;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .fd-sales__card:hover {
          border-color: #ccc;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }

        .fd-sales__card--featured {
          border-color: #1a1a1a;
        }

        .fd-sales__card-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.55rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.25rem 0.5rem;
          background: #1a1a1a;
          color: #fff;
          z-index: 2;
        }

        .fd-sales__card-image {
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, #f5f4f0 0%, #eae8e2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .fd-sales__card-image img {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          transition: transform 0.4s ease;
        }

        .fd-sales__card:hover .fd-sales__card-image img {
          transform: scale(1.05);
        }

        .fd-sales__card-info {
          padding: 1.25rem;
        }

        .fd-sales__card-info h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.25rem;
          color: #1a1a1a;
        }

        .fd-sales__card-tagline {
          display: block;
          font-size: 0.75rem;
          color: #888;
          margin-bottom: 0.75rem;
        }

        .fd-sales__card-specs {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e8e6e2;
        }

        .fd-sales__card-specs span {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          color: #666;
          text-transform: uppercase;
        }

        .fd-sales__card-price {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .fd-sales__subsection {
          max-width: 1100px;
          margin: 0 auto;
        }

        .fd-sales__section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #1a1a1a;
          margin: 3rem 0 1.5rem;
          padding-left: 1rem;
          border-left: 3px solid #1a1a1a;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .fd-sales__section-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e8e6e2;
        }

        .fd-sales__section-desc {
          font-size: 0.9rem;
          line-height: 1.7;
          color: #666;
          margin: 0 0 1.5rem;
          text-align: left;
        }

        .fd-sales__carousel {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: 1.5rem;
          padding: 0.5rem 0 1.5rem;
          -webkit-overflow-scrolling: touch;
        }

        .fd-sales__carousel::-webkit-scrollbar {
          height: 6px;
        }

        .fd-sales__carousel::-webkit-scrollbar-track {
          background: #f0f0f0;
          border-radius: 3px;
        }

        .fd-sales__carousel::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 3px;
        }

        .fd-sales__sold-card {
          flex: 0 0 260px;
          scroll-snap-align: start;
          background: #faf9f6;
          border: 1px solid #e8e6e2;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .fd-sales__sold-card:hover {
          border-color: #ccc;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }

        .fd-sales__sold-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.55rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.25rem 0.6rem;
          background: #c0392b;
          color: #fff;
          z-index: 2;
        }

        .fd-sales__sold-image {
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, #f5f4f0 0%, #eae8e2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .fd-sales__sold-image img {
          max-width: 85%;
          max-height: 85%;
          object-fit: contain;
          opacity: 0.7;
          filter: grayscale(30%);
        }

        .fd-sales__sold-info {
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .fd-sales__sold-info strong {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          color: #1a1a1a;
        }

        .fd-sales__sold-info span {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          color: #888;
          text-transform: uppercase;
        }

        @media (max-width: 900px) {
          .fd-sales__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 550px) {
          .fd-sales__grid {
            grid-template-columns: 1fr;
            max-width: 320px;
          }

          .fd-sales__sold-card {
            flex: 0 0 220px;
          }
        }

        /* ===== MAINTENANCE SECTION ===== */
        .fd-maint {
          padding: 2rem 2rem 5rem;
          background: #faf9f6;
        }

        .fd-maint__header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .fd-maint__number {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          color: #999;
          margin-bottom: 1rem;
        }

        .fd-maint__title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          text-transform: uppercase;
          margin: 0 0 1rem;
          color: #1a1a1a;
        }

        .fd-maint__text {
          font-size: 1rem;
          line-height: 1.7;
          color: #666;
          max-width: 500px;
          margin: 0 auto;
        }

        .fd-maint__stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
          padding: 1.5rem 0;
          border-top: 1px solid #e8e6e2;
          border-bottom: 1px solid #e8e6e2;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .fd-maint__stat {
          text-align: center;
        }

        .fd-maint__stat-value {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.2;
        }

        .fd-maint__stat-label {
          display: block;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #888;
          margin-top: 0.25rem;
        }

        .fd-maint__stat-divider {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, #c0bdb8, transparent);
        }

        .fd-maint__services {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 1000px;
          margin: 0 auto 3rem;
        }

        .fd-maint__service {
          background: #fff;
          border: 1px solid #e8e6e2;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .fd-maint__service:hover {
          border-color: #ccc;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }

        .fd-maint__service-num {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          color: #999;
          margin-bottom: 0.75rem;
        }

        .fd-maint__service h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
          color: #1a1a1a;
        }

        .fd-maint__service p {
          font-size: 0.8rem;
          line-height: 1.6;
          color: #666;
          margin: 0;
        }

        .fd-maint__actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .fd-maint__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.875rem 2rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .fd-maint__btn--primary {
          background: #1a1a1a;
          color: #fff;
          border: 1px solid #1a1a1a;
        }

        .fd-maint__btn--primary:hover {
          background: #333;
        }

        .fd-maint__btn--outline {
          background: transparent;
          color: #1a1a1a;
          border: 1px solid #1a1a1a;
        }

        .fd-maint__btn--outline:hover {
          background: #1a1a1a;
          color: #fff;
        }

        @media (max-width: 900px) {
          .fd-maint__services {
            grid-template-columns: repeat(2, 1fr);
          }

          .fd-maint__stats {
            flex-wrap: wrap;
            gap: 1.5rem;
          }

          .fd-maint__stat-divider {
            display: none;
          }
        }

        @media (max-width: 550px) {
          .fd-maint__services {
            grid-template-columns: 1fr;
            max-width: 320px;
          }

          .fd-maint__stats {
            gap: 1rem;
          }

          .fd-maint__stat {
            flex: 0 0 45%;
          }

          .fd-maint__actions {
            flex-direction: column;
            align-items: center;
          }

          .fd-maint__btn {
            width: 100%;
            max-width: 280px;
          }
        }

        /* ===== MAINTENANCE V5 — Big Stats ===== */
        .fd-maint__big-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          text-align: center;
        }

        .fd-maint__big-stat-value {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1;
        }

        .fd-maint__big-stat-label {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #7a7a7a;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .fd-maint__big-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .fd-maint__big-stat-value { font-size: 1.8rem; }
        }

        /* ===== MAINTENANCE V6 — Split Layout ===== */
        .fd-maint__split-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .fd-maint__split-right {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .fd-maint__split-service {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          padding: 1rem 0;
          border-bottom: 1px solid #e8e6e2;
        }

        .fd-maint__split-service:last-child {
          border-bottom: none;
        }

        .fd-maint__split-service h3 {
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .fd-maint__split-service p {
          font-size: 0.78rem;
          color: #7a7a7a;
          margin: 0;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .fd-maint__split-wrap {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        /* ===== MAINTENANCE V7 — Image Overlay ===== */
        .fd-maint--overlay {
          position: relative;
          min-height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #1a1a1a;
        }

        .fd-maint__overlay-bg {
          position: absolute;
          inset: 0;
        }

        .fd-maint__overlay-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.35;
        }

        .fd-maint__overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(26,26,26,0.3), rgba(26,26,26,0.8));
        }

        .fd-maint__overlay-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 3rem 2rem;
        }

        .fd-maint__overlay-stats {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-top: 1.5rem;
        }

        .fd-maint__overlay-stat {
          text-align: center;
        }

        .fd-maint__overlay-stat span {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
        }

        .fd-maint__overlay-stat small {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.6);
        }

        /* ===== MAINTENANCE V8 — Process Flow ===== */
        .fd-maint__flow {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 0;
          margin: 2rem 0;
          flex-wrap: wrap;
        }

        .fd-maint__flow-step {
          text-align: center;
          flex: 0 0 140px;
          padding: 1rem 0.5rem;
        }

        .fd-maint__flow-num {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          color: #7a7a7a;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }

        .fd-maint__flow-step h4 {
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.3rem;
          color: #1a1a1a;
        }

        .fd-maint__flow-step p {
          font-size: 0.7rem;
          color: #7a7a7a;
          margin: 0;
          line-height: 1.4;
        }

        .fd-maint__flow-arrow {
          width: 24px;
          height: 2px;
          background: #e8e6e2;
          align-self: center;
          margin-top: -1rem;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .fd-maint__flow {
            flex-direction: column;
            align-items: center;
          }
          .fd-maint__flow-arrow {
            width: 2px;
            height: 24px;
            margin-top: 0;
          }
        }

        /* ===== MAINTENANCE V9 — Trust Signals ===== */
        .fd-maint__trust-certs {
          display: flex;
          gap: 2rem;
          justify-content: center;
          align-items: center;
          margin: 2rem 0;
          flex-wrap: wrap;
        }

        .fd-maint__trust-cert {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.25rem 1.5rem;
          background: #fff;
          border: 1px solid #e8e6e2;
          text-align: center;
        }

        .fd-maint__trust-cert span {
          font-size: 0.75rem;
          color: #4a4a4a;
        }

        .fd-maint__trust-copy {
          max-width: 580px;
          margin: 0 auto 1.5rem;
          text-align: center;
        }

        .fd-maint__trust-copy p {
          font-size: 0.85rem;
          line-height: 1.7;
          color: #4a4a4a;
        }

        .fd-maint__trust-summary {
          max-width: 640px;
          margin: 2rem auto 0;
          padding-top: 1.5rem;
          border-top: 1px solid #e8e6e2;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          line-height: 2;
          color: #7a7a7a;
          text-align: center;
          letter-spacing: 0.01em;
        }

        /* ===== MAINTENANCE V10 — Card Grid ===== */
        .fd-maint__grid6 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .fd-maint__grid6-card {
          padding: 1.25rem;
          background: #fff;
          border: 1px solid #e8e6e2;
          text-align: center;
          transition: border-color 0.2s;
        }

        .fd-maint__grid6-card:hover {
          border-color: #1a1a1a;
        }

        .fd-maint__grid6-icon {
          display: block;
          font-size: 1.1rem;
          color: #1a1a1a;
          margin-bottom: 0.75rem;
        }

        .fd-maint__grid6-card h4 {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.4rem;
          color: #1a1a1a;
        }

        .fd-maint__grid6-card p {
          font-size: 0.7rem;
          color: #7a7a7a;
          margin: 0;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .fd-maint__grid6 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .fd-maint__grid6 {
            grid-template-columns: 1fr;
          }
        }

        /* ===== MAINTENANCE PILLARS (v2) ===== */
        .fd-maint__pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .fd-maint__pillar {
          text-align: center;
          padding: 1.25rem 1rem;
          background: #fff;
          border: 1px solid #e8e6e2;
        }

        .fd-maint__pillar i {
          font-size: 1.2rem;
          color: #1a1a1a;
          margin-bottom: 0.75rem;
          display: block;
        }

        .fd-maint__pillar h4 {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.4rem;
        }

        .fd-maint__pillar p {
          font-size: 0.7rem;
          color: #666;
          margin: 0;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .fd-maint__pillars {
            grid-template-columns: 1fr;
          }
        }

        /* ===== PARALLAX SECTIONS ===== */
        .parallax-section {
          position: relative;
          height: 260px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 100vw;
          clip-path: inset(0);
        }

        .parallax-section__image-container {
          position: absolute;
          inset: -15%;
          z-index: 0;
        }

        .parallax-section__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .parallax-section__content {
          position: relative;
          z-index: 2;
          color: #fff;
          padding: 2rem;
          text-align: center;
        }

        .parallax-section__number {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 700;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.35);
          color: transparent;
          line-height: 1;
          letter-spacing: -0.02em;
          flex-shrink: 0;
        }

        .parallax-section__label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          margin-bottom: 1rem;
          opacity: 0.8;
        }

        .parallax-section__title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(4rem, 12vw, 9rem);
          font-weight: 700;
          text-transform: uppercase;
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
          color: #fff;
          opacity: 0.7;
          -webkit-text-stroke: 2px #888;
          paint-order: stroke fill;
        }

        .parallax-section__text {
          font-size: 1.1rem;
          opacity: 0.9;
          max-width: 400px;
          margin: 0 auto;
        }

        /* Dark overlay for image */
        .parallax-section__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        /* Layered wave effects */
        .parallax-section__wave {
          position: absolute;
          left: 0;
          width: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .parallax-section__wave--top {
          top: 0;
          height: 60px;
        }

        .parallax-section__wave--bottom {
          bottom: 0;
          height: 120px;
        }

        /* ===== SCROLLING STRIPS WRAPPER ===== */
        .scrolling-strips-wrapper {
          position: relative;
          overflow: visible;
        }

        .scrolling-strips-spacer {
          height: 100px;
          pointer-events: none;
        }


        /* ===== SCROLL REVEAL ANIMATION ===== */
        .reveal-element {
          opacity: 0;
          transform: translateY(80px) scale(0.95);
          transition: opacity 1s ease, transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-element.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* ===== UNION JACK PLACEMENTS ===== */
        .union-jack {
          display: inline-block;
          vertical-align: middle;
        }

        /* Hero coordinates - between N and W */
        .union-jack--coords {
          margin: 0 0.5rem;
        }

        /* Footer coordinates - between N and W */
        .union-jack--footer {
          margin: 0 0.5rem;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .fd-hero__image {
            width: 25%;
          }

          .fd-hero__scroll-container {
            left: 25%;
            right: 25%;
          }
        }

        @media (max-width: 768px) {
          .fd-hero__image {
            display: none;
          }

          .fd-hero__scroll-container {
            left: 2rem;
            right: 2rem;
          }

          .fd-hero__progress {
            right: 1rem;
          }

          .fd-nav__accordion {
            flex-wrap: wrap;
          }

          .fd-nav__item {
            flex: 1 1 33.333%;
          }
        }

        @keyframes wfFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .wfi-q__expanded {
          background: #faf9f6;
          box-shadow: 0 4px 40px rgba(0, 0, 0, 0.06);
          position: relative;
          animation: wfFadeIn 0.35s ease;
        }
        .wfi-q__close {
          position: absolute; top: 12px; right: 12px;
          background: none; border: none; font-size: 18px; color: #999;
          cursor: pointer; z-index: 2; padding: 4px 8px; line-height: 1;
        }
        .wfi-q__close:hover { color: #333; }
        .wfi-q__card-body {
          padding: 2rem;
          display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
          align-items: center;
        }
        .wfi-q__card-text h3 {
          font-size: clamp(1.25rem, 2.5vw, 1.5rem);
          font-weight: 700; margin: 0 0 1rem;
          text-transform: uppercase; letter-spacing: -0.01em; line-height: 1.2;
        }
        .wfi-q__verb { color: #1a1a1a; }
        .wfi-q__noun { color: #5a5a5a; }
        .wfi-q__card-text p {
          font-size: 0.95rem; color: #666; line-height: 1.7; margin: 0;
        }
        .wfi-q__card-img {
          width: 100%; height: 180px; background: #2a2a2a;
          border-radius: 6px; overflow: hidden; position: relative;
        }
        .wfi-q__card-slide {
          position: absolute; inset: 0; background-size: cover; background-position: center;
          opacity: 0; transition: opacity 0.5s ease;
        }
        .wfi-q__card-slide.active { opacity: 1; }
        .wfi-q__card-img-label {
          position: absolute; bottom: 0.75rem; left: 0.75rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.5rem; letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.5); text-transform: uppercase;
        }
        .wfi-q__card-footer {
          padding: 1.25rem 2rem;
          border-top: 1px solid rgba(26, 26, 26, 0.06);
          display: flex; align-items: center; justify-content: space-between;
        }
        .wfi-q__footer-left {
          display: flex; align-items: center; gap: 1rem;
        }
        .wfi-q__dots { display: flex; gap: 4px; }
        .wfi-q__dot {
          width: 4px; height: 4px; background: rgba(26, 26, 26, 0.15);
          border-radius: 2px; transition: all 0.25s ease; cursor: pointer;
        }
        .wfi-q__dot:hover { background: rgba(26, 26, 26, 0.4); }
        .wfi-q__dot.active { width: 16px; background: #1a1a1a; }
        .wfi-q__counter {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem; color: rgba(26, 26, 26, 0.35); letter-spacing: 0.1em;
        }
        .wfi-q__arrows { display: flex; gap: 0.5rem; }
        .wfi-q__arrows button {
          width: 36px; height: 36px; display: flex; align-items: center;
          justify-content: center; background: transparent;
          border: 1px solid rgba(26, 26, 26, 0.15); border-radius: 6px;
          cursor: pointer; color: rgba(26, 26, 26, 0.4); transition: all 0.25s ease;
        }
        .wfi-q__arrows button:hover {
          background: #1a1a1a; border-color: #1a1a1a; color: #fff;
        }
        .wfi-q__cta-full {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          padding: 0.75rem; text-decoration: none; color: #1a1a1a;
          font-size: 0.78rem; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.1em; border-top: 1px solid rgba(26, 26, 26, 0.06);
          transition: background 0.2s; background: #faf9f6; cursor: pointer;
        }
        .wfi-q__cta-full:hover { background: #f5f3ef; color: #1a1a1a; }
        .wfi-q__cta-full span { transition: transform 0.2s; display: inline-block; color: #1a1a1a; }
        .wfi-q__cta-full:hover span { transform: translateX(4px); color: #1a1a1a; }

        /* --- Why We Fly + Learn More --- */
        .wfv-merge__fly {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.85rem 1.25rem; background: #faf9f6;
          border: 1px solid #e8e6e2; border-radius: 8px 8px 0 0;
          cursor: pointer; transition: background 0.2s, border-color 0.2s;
          width: 100%;
        }
        .wfv-merge__fly:hover { background: #f5f3ef; border-color: #d4d0c8; }
        .wfv-merge__fly--open { border-radius: 8px 8px 0 0; border-bottom: none; }
        .wfv-merge__fly * { cursor: pointer; }
        .wfv-merge__center {
          display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
          flex: 1; pointer-events: none;
        }
        .wfv-merge__thumbs { display: flex; flex-shrink: 0; }
        .wfv-merge__thumb {
          width: 44px; height: 44px; border-radius: 6px;
          background-size: cover; background-position: center;
          border: 2px solid #faf9f6; position: relative;
          margin-left: -12px; pointer-events: none;
        }
        .wfv-merge__thumb:first-child { margin-left: 0; }
        .wfv-merge__title {
          font-size: 0.8rem; font-weight: 600; color: #1a1a1a;
          text-transform: uppercase; letter-spacing: 0.08em; white-space: nowrap;
        }
        .wfv-merge__pulse {
          width: 6px; height: 6px; border-radius: 50%; background: #999;
          animation: wfvPulse 2s ease-in-out infinite;
        }
        .wfv-merge__pulse--hidden { opacity: 0; animation: none; }
        @keyframes wfvPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        /* Expandable card area */
        .wfv-merge__expand {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s ease;
        }
        .wfv-merge__expand--open {
          grid-template-rows: 1fr;
        }
        .wfv-merge__expand-inner {
          overflow: hidden;
        }
        .wfv-merge__expand .wfi-q__expanded {
          animation: none; border-radius: 0;
          border-left: 1px solid #e8e6e2; border-right: 1px solid #e8e6e2;
        }

        .wfv-merge__cta {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          padding: 0.45rem; background: #4a4a4a; color: #fff;
          font-size: 0.78rem; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.1em; text-decoration: none;
          border: 1px solid #3a3a3a; border-radius: 0 0 8px 8px;
          transition: background 0.2s;
          cursor: pointer;
        }
        .wfv-merge__cta:hover { background: #5a5a5a; color: #fff; }
        .wfv-merge__cta span { transition: transform 0.2s; display: inline-block; color: #fff; pointer-events: none; }
        .wfv-merge__cta:hover span { transform: translateX(4px); color: #fff; }
        @media (max-width: 768px) {
          .wfi-q__card-body { grid-template-columns: 1fr; gap: 1.5rem; }
          .wfi-q__card-img { height: 200px; }
        }


        /* =================================================================
           MAINTENANCE V11 — THE FULL STORY
        ================================================================= */
        .mv11 {
          max-width: 960px;
          margin: 0 auto;
          padding: 4rem 2rem;
          font-family: 'Space Grotesk', -apple-system, sans-serif;
          color: #1a1a1a;
        }

        .mv11-section-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #7a7a7a;
          margin-bottom: 1.5rem;
          display: block;
        }

        /* Origin */
        .mv11-origin {
          text-align: center;
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv11-origin__badge {
          display: inline-block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: #7a7a7a;
          border: 1px solid #e8e6e2;
          padding: 0.35rem 1rem;
          margin-bottom: 1.5rem;
        }
        .mv11-origin__title {
          font-size: clamp(1.5rem, 3.5vw, 2.2rem);
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }
        .mv11-origin__text {
          font-size: 0.95rem;
          line-height: 1.8;
          color: #4a4a4a;
          max-width: 680px;
          margin: 0 auto;
        }
        .mv11-origin__sig {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }
        .mv11-origin__sig-line {
          width: 40px;
          height: 1px;
          background: #e8e6e2;
        }
        .mv11-origin__sig-name {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          color: #7a7a7a;
        }

        /* Timeline */
        .mv11-timeline {
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv11-timeline__track {
          display: flex;
          justify-content: space-between;
          position: relative;
        }
        .mv11-timeline__track::before {
          content: '';
          position: absolute;
          top: 26px;
          left: 0;
          right: 0;
          height: 1px;
          background: #e8e6e2;
        }
        .mv11-timeline__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          flex: 1;
        }
        .mv11-timeline__year {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .mv11-timeline__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #1a1a1a;
          margin-bottom: 0.75rem;
          position: relative;
          z-index: 1;
        }
        .mv11-timeline__event {
          font-size: 0.7rem;
          color: #7a7a7a;
          max-width: 140px;
          line-height: 1.4;
        }

        /* Team Grid */
        .mv11-team {
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv11-team__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        .mv11-team__card {
          padding: 1.5rem;
          border: 1px solid #e8e6e2;
          background: #fff;
        }
        .mv11-team__avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #1a1a1a;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          margin-bottom: 1rem;
        }
        .mv11-team__card h4 {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .mv11-team__role {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          color: #7a7a7a;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 0.75rem;
        }
        .mv11-team__card p {
          font-size: 0.78rem;
          line-height: 1.6;
          color: #4a4a4a;
          margin: 0;
        }

        /* Facility Blueprint */
        .mv11-facility {
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv11-facility__blueprint {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .mv11-facility__spec {
          text-align: center;
          padding: 1.5rem 1rem;
          border: 1px solid #e8e6e2;
          background: #fff;
        }
        .mv11-facility__spec-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          line-height: 1;
        }
        .mv11-facility__spec-unit {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #7a7a7a;
          margin-top: 0.25rem;
        }
        .mv11-facility__spec-label {
          display: block;
          font-size: 0.7rem;
          color: #4a4a4a;
          margin-top: 0.75rem;
          line-height: 1.4;
        }
        .mv11-facility__location {
          text-align: center;
          font-size: 0.78rem;
          color: #7a7a7a;
        }
        .mv11-facility__location i {
          margin-right: 0.5rem;
        }

        /* Testimonials */
        .mv11-testimonials {
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv11-testimonials__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .mv11-testimonial {
          padding: 1.5rem;
          border: 1px solid #e8e6e2;
          background: #fff;
          margin: 0;
        }
        .mv11-testimonial p {
          font-size: 0.82rem;
          line-height: 1.7;
          color: #4a4a4a;
          font-style: italic;
          margin: 0 0 1rem;
        }
        .mv11-testimonial cite {
          font-style: normal;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          color: #7a7a7a;
          letter-spacing: 0.05em;
        }

        /* Types Matrix */
        .mv11-types {
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv11-types__matrix {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .mv11-types__group {
          padding: 1.5rem;
          border: 1px solid #e8e6e2;
          background: #fff;
        }
        .mv11-types__mfr {
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .mv11-types__tag {
          display: inline-block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 0.2rem 0.5rem;
          border: 1px solid #e8e6e2;
          margin: 0 0.25rem 0.25rem 0;
        }
        .mv11-types__tag--primary {
          background: #1a1a1a;
          color: #fff;
          border-color: #1a1a1a;
        }
        .mv11-types__tag--accent {
          background: #4a4a4a;
          color: #fff;
          border-color: #4a4a4a;
        }
        .mv11-types__models {
          margin-top: 0.75rem;
        }
        .mv11-types__models span {
          display: block;
          font-size: 0.75rem;
          color: #4a4a4a;
          padding: 0.25rem 0;
          border-bottom: 1px solid #f0f0f0;
        }

        /* Dashboard */
        .mv11-dashboard {
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv11-dashboard__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .mv11-dashboard__stat {
          padding: 1.25rem;
          border: 1px solid #e8e6e2;
          background: #fff;
        }
        .mv11-dashboard__value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .mv11-dashboard__label {
          display: block;
          font-size: 0.7rem;
          color: #7a7a7a;
          margin-bottom: 0.75rem;
        }
        .mv11-dashboard__bar {
          display: block;
          height: 3px;
          background: #1a1a1a;
          transition: width 0.6s ease;
        }

        /* Certs Wall */
        .mv11-certs {
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv11-certs__wall {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .mv11-certs__badge {
          text-align: center;
          padding: 1.5rem 1rem;
          border: 1px solid #e8e6e2;
          background: #fff;
        }
        .mv11-certs__badge i {
          display: block;
          font-size: 1.2rem;
          margin-bottom: 0.75rem;
          color: #1a1a1a;
        }
        .mv11-certs__badge strong {
          display: block;
          font-size: 0.78rem;
          margin-bottom: 0.35rem;
        }
        .mv11-certs__badge span {
          font-size: 0.65rem;
          color: #7a7a7a;
          line-height: 1.4;
        }

        /* Manifesto */
        .mv11-manifesto {
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
          text-align: center;
        }
        .mv11-manifesto__rule {
          width: 60px;
          height: 3px;
          background: #1a1a1a;
          margin: 0 auto 2rem;
        }
        .mv11-manifesto__heading {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #7a7a7a;
          margin-bottom: 1rem;
        }
        .mv11-manifesto__text {
          font-size: 1.2rem;
          font-weight: 600;
          line-height: 1.5;
          max-width: 520px;
          margin: 0 auto 2.5rem;
        }
        .mv11-manifesto__pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          text-align: left;
        }
        .mv11-manifesto__pillar {
          padding: 1.5rem;
          border: 1px solid #e8e6e2;
          background: #fff;
        }
        .mv11-manifesto__pillar-num {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem;
          color: #7a7a7a;
          display: block;
          margin-bottom: 0.75rem;
        }
        .mv11-manifesto__pillar h4 {
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .mv11-manifesto__pillar p {
          font-size: 0.75rem;
          line-height: 1.6;
          color: #4a4a4a;
          margin: 0;
        }

        /* Services */
        .mv11-services {
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv11-services__item {
          display: flex;
          gap: 1.25rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .mv11-services__item:last-child {
          border-bottom: none;
        }
        .mv11-services__icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e8e6e2;
          flex-shrink: 0;
          font-size: 0.9rem;
          color: #1a1a1a;
        }
        .mv11-services__content h4 {
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .mv11-services__content p {
          font-size: 0.78rem;
          line-height: 1.7;
          color: #4a4a4a;
          margin: 0;
        }
        .mv11-services__turnaround {
          display: flex;
          gap: 1rem;
          margin-top: 0.75rem;
        }
        .mv11-services__turnaround span {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          color: #7a7a7a;
          padding: 0.2rem 0.5rem;
          border: 1px solid #e8e6e2;
          letter-spacing: 0.03em;
        }

        /* Parts */
        .mv11-parts {
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv11-parts__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .mv11-parts__category {
          padding: 1.25rem;
          border: 1px solid #e8e6e2;
          background: #fff;
        }
        .mv11-parts__count {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
        }
        .mv11-parts__type {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #7a7a7a;
          margin-bottom: 0.75rem;
        }
        .mv11-parts__category p {
          font-size: 0.7rem;
          line-height: 1.5;
          color: #4a4a4a;
          margin: 0;
        }
        .mv11-parts__total {
          text-align: center;
          font-size: 0.78rem;
          color: #4a4a4a;
        }

        /* AOG Map */
        .mv11-aog {
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv11-aog__map {
          position: relative;
          min-height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .mv11-aog__center {
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .mv11-aog__pin {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .mv11-aog__label {
          font-size: 0.7rem;
          color: #4a4a4a;
          line-height: 1.4;
        }
        .mv11-aog__rings {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mv11-aog__ring {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed #e8e6e2;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 0.5rem;
        }
        .mv11-aog__ring span {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.55rem;
          color: #7a7a7a;
          white-space: nowrap;
        }
        .mv11-aog__ring--1 { width: 160px; height: 160px; }
        .mv11-aog__ring--2 { width: 260px; height: 260px; }
        .mv11-aog__ring--3 { width: 360px; height: 360px; }
        .mv11-aog__note {
          text-align: center;
          font-size: 0.72rem;
          color: #7a7a7a;
        }

        /* Compare Table */
        .mv11-compare {
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv11-compare__table {
          border: 1px solid #e8e6e2;
          overflow: hidden;
        }
        .mv11-compare__row {
          display: grid;
          grid-template-columns: 1fr 1fr 1.3fr;
          border-bottom: 1px solid #f0f0f0;
        }
        .mv11-compare__row:last-child {
          border-bottom: none;
        }
        .mv11-compare__row span {
          padding: 0.75rem 1rem;
          font-size: 0.72rem;
          color: #4a4a4a;
        }
        .mv11-compare__row--header {
          background: #1a1a1a;
        }
        .mv11-compare__row--header span {
          color: #fff;
          font-weight: 600;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .mv11-compare__highlight {
          background: #f5f4f1;
          font-weight: 500;
          color: #1a1a1a !important;
        }

        /* Trust */
        .mv11-trust {
          margin-bottom: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv11-trust__row {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .mv11-trust__row span {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #4a4a4a;
          padding: 0.5rem 1rem;
          border: 1px solid #e8e6e2;
        }
        .mv11-trust__note {
          text-align: center;
          font-size: 0.72rem;
          color: #7a7a7a;
        }

        /* CTA */
        .mv11-cta {
          text-align: center;
          padding: 3rem 0;
        }
        .mv11-cta__headline {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        .mv11-cta__sub {
          font-size: 0.85rem;
          color: #4a4a4a;
          margin-bottom: 1.5rem;
        }
        .mv11-cta__actions {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .mv11-cta__btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          transition: all 0.2s;
        }
        .mv11-cta__btn--primary {
          background: #1a1a1a;
          color: #fff;
          border: 1px solid #1a1a1a;
        }
        .mv11-cta__btn--primary:hover { background: #333; }
        .mv11-cta__btn--secondary {
          background: transparent;
          color: #1a1a1a;
          border: 1px solid #1a1a1a;
        }
        .mv11-cta__btn--secondary:hover { background: #1a1a1a; color: #fff; }
        .mv11-cta__hours {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          color: #7a7a7a;
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .mv11 { padding: 2rem 1.25rem; }
          .mv11-team__grid,
          .mv11-facility__blueprint,
          .mv11-testimonials__grid,
          .mv11-types__matrix,
          .mv11-dashboard__grid,
          .mv11-certs__wall,
          .mv11-manifesto__pillars,
          .mv11-parts__grid { grid-template-columns: 1fr; }
          .mv11-timeline__track { flex-direction: column; gap: 1.5rem; }
          .mv11-timeline__track::before { display: none; }
          .mv11-compare__row { grid-template-columns: 1fr; }
          .mv11-compare__row--header span:first-child { display: none; }
          .mv11-aog__ring--3 { width: 280px; height: 280px; }
        }


        /* =================================================================
           MAINTENANCE V12 — MAGAZINE EDITORIAL
        ================================================================= */
        .mv12 {
          max-width: 880px;
          margin: 0 auto;
          padding: 4rem 2rem;
          font-family: 'Space Grotesk', -apple-system, sans-serif;
          color: #1a1a1a;
        }

        .mv12-crosshead {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #7a7a7a;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e8e6e2;
        }

        /* Cover */
        .mv12-cover {
          text-align: center;
          margin-bottom: 3rem;
          padding-bottom: 2.5rem;
          border-bottom: 2px solid #1a1a1a;
        }
        .mv12-cover__issue {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7a7a7a;
          display: block;
          margin-bottom: 1.5rem;
        }
        .mv12-cover__headline {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1.25rem;
        }
        .mv12-cover__deck {
          font-size: 1rem;
          line-height: 1.6;
          color: #4a4a4a;
          max-width: 580px;
          margin: 0 auto 1.5rem;
        }
        .mv12-cover__byline {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          color: #7a7a7a;
        }
        .mv12-cover__rule {
          width: 40px;
          height: 1px;
          background: #e8e6e2;
        }

        /* Pull Quote */
        .mv12-pull {
          text-align: center;
          margin: 2.5rem 0;
          padding: 2rem 0;
          border-top: 1px solid #e8e6e2;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv12-pull__mark {
          font-size: 3rem;
          line-height: 1;
          color: #e8e6e2;
          display: block;
        }
        .mv12-pull__text {
          font-size: 1.2rem;
          font-weight: 600;
          font-style: italic;
          line-height: 1.5;
          max-width: 500px;
          margin: 0 auto 0.75rem;
        }
        .mv12-pull__attr {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          color: #7a7a7a;
          letter-spacing: 0.1em;
        }

        /* Sidebar Stats */
        .mv12-sidebar-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv12-sidebar-stats__item { text-align: center; }
        .mv12-sidebar-stats__num {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
        }
        .mv12-sidebar-stats__desc {
          font-size: 0.6rem;
          color: #7a7a7a;
          line-height: 1.4;
        }
        .mv12-sidebar-stats__divider {
          width: 1px;
          height: 40px;
          background: #e8e6e2;
        }

        /* Editorial Columns */
        .mv12-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }
        .mv12-columns__col p {
          font-size: 0.82rem;
          line-height: 1.8;
          color: #4a4a4a;
          margin: 0 0 1rem;
        }
        .mv12-columns__dropcap {
          float: left;
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 0.8;
          margin-right: 0.5rem;
          margin-top: 0.1rem;
          color: #1a1a1a;
        }

        /* Photo Strip */
        .mv12-strip {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
          overflow-x: auto;
        }
        .mv12-strip__item {
          flex: 1;
          min-width: 140px;
          text-align: center;
        }
        .mv12-strip__img-placeholder {
          height: 100px;
          background: #f0eeeb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #7a7a7a;
          margin-bottom: 0.5rem;
        }
        .mv12-strip__item span {
          font-size: 0.6rem;
          color: #7a7a7a;
          font-family: 'Share Tech Mono', monospace;
        }

        /* Portraits */
        .mv12-portraits {
          margin-bottom: 2.5rem;
        }
        .mv12-portraits__row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .mv12-portraits__person { text-align: center; }
        .mv12-portraits__circle {
          width: 56px;
          height: 64px;
          border-radius: 4px;
          background: #1a1a1a;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          margin: 0 auto 0.75rem;
        }
        .mv12-portraits__person strong {
          display: block;
          font-size: 0.78rem;
          margin-bottom: 0.25rem;
        }
        .mv12-portraits__person span {
          font-size: 0.6rem;
          color: #7a7a7a;
          line-height: 1.4;
        }

        /* Aircraft */
        .mv12-aircraft {
          margin-bottom: 2.5rem;
        }
        .mv12-aircraft__row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.75rem;
        }
        .mv12-aircraft__type { text-align: center; padding: 1rem 0.5rem; border: 1px solid #e8e6e2; }
        .mv12-aircraft__silhouette { display: block; font-size: 1.2rem; color: #1a1a1a; margin-bottom: 0.5rem; }
        .mv12-aircraft__type strong { display: block; font-size: 0.68rem; margin-bottom: 0.2rem; }
        .mv12-aircraft__note { font-size: 0.55rem; color: #7a7a7a; }

        /* Index */
        .mv12-index { margin-bottom: 2.5rem; }
        .mv12-index__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }
        .mv12-index__entry {
          font-size: 0.68rem;
          line-height: 1.6;
          color: #4a4a4a;
          padding: 0.5rem;
          border-bottom: 1px solid #f0f0f0;
        }
        .mv12-index__letter {
          font-weight: 700;
          font-size: 1rem;
          color: #1a1a1a;
          margin-right: 0.5rem;
        }

        /* Drop Cap Section */
        .mv12-dropcap-section { margin-bottom: 2.5rem; }

        /* Blockquote */
        .mv12-blockquote {
          text-align: center;
          padding: 2.5rem 0;
          margin-bottom: 2.5rem;
          border-top: 1px solid #e8e6e2;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv12-blockquote__mark {
          font-size: 4rem;
          line-height: 0.5;
          color: #e8e6e2;
          display: block;
          margin-bottom: 1rem;
        }
        .mv12-blockquote blockquote {
          font-size: 0.95rem;
          line-height: 1.7;
          font-style: italic;
          max-width: 560px;
          margin: 0 auto;
          color: #4a4a4a;
        }
        .mv12-blockquote__attribution {
          margin-top: 1rem;
        }
        .mv12-blockquote__attribution strong {
          display: block;
          font-size: 0.78rem;
        }
        .mv12-blockquote__attribution span {
          font-size: 0.65rem;
          color: #7a7a7a;
        }

        /* Marginalia */
        .mv12-marginalia { margin-bottom: 2.5rem; }
        .mv12-marginalia__note {
          display: flex;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .mv12-marginalia__marker {
          font-size: 0.9rem;
          color: #7a7a7a;
          flex-shrink: 0;
          width: 16px;
          text-align: center;
        }
        .mv12-marginalia__note p {
          font-size: 0.72rem;
          line-height: 1.6;
          color: #7a7a7a;
          margin: 0;
        }

        /* Infographic */
        .mv12-infographic { margin-bottom: 2.5rem; }
        .mv12-infographic__bar-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem 0;
        }
        .mv12-infographic__bar-label {
          width: 140px;
          font-size: 0.68rem;
          text-align: right;
          color: #4a4a4a;
          flex-shrink: 0;
        }
        .mv12-infographic__bar-track {
          flex: 1;
          height: 8px;
          background: #f0eeeb;
        }
        .mv12-infographic__bar-fill {
          height: 100%;
          background: #1a1a1a;
          transition: width 0.6s ease;
        }
        .mv12-infographic__bar-fill--urgent {
          background: #4a4a4a;
        }
        .mv12-infographic__bar-value {
          width: 70px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          color: #7a7a7a;
          flex-shrink: 0;
        }

        /* Colophon */
        .mv12-colophon {
          margin-bottom: 2.5rem;
          padding: 1.5rem;
          background: #f5f4f1;
          border: 1px solid #e8e6e2;
        }
        .mv12-colophon__grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 1.5rem;
        }
        .mv12-colophon__grid strong {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }
        .mv12-colophon__grid p {
          font-size: 0.68rem;
          line-height: 1.6;
          color: #4a4a4a;
          margin: 0;
        }

        /* Ownership */
        .mv12-ownership { margin-bottom: 2.5rem; }
        .mv12-ownership__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .mv12-ownership__card {
          padding: 1.25rem;
          border: 1px solid #e8e6e2;
          background: #fff;
        }
        .mv12-ownership__card h4 {
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
        }
        .mv12-ownership__card p {
          font-size: 0.7rem;
          line-height: 1.5;
          color: #4a4a4a;
          margin: 0;
        }

        /* CTA */
        .mv12-cta {
          text-align: center;
          padding: 2rem 0;
        }
        .mv12-cta__rule {
          width: 40px;
          height: 2px;
          background: #1a1a1a;
          margin: 0 auto 1.5rem;
        }
        .mv12-cta h3 {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }
        .mv12-cta p {
          font-size: 0.85rem;
          color: #4a4a4a;
          max-width: 480px;
          margin: 0 auto 1.5rem;
          line-height: 1.6;
        }
        .mv12-cta__actions { display: flex; gap: 0.75rem; justify-content: center; }
        .mv12-cta__btn {
          display: inline-block;
          padding: 0.7rem 1.4rem;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          transition: all 0.2s;
        }
        .mv12-cta__btn--primary { background: #1a1a1a; color: #fff; border: 1px solid #1a1a1a; }
        .mv12-cta__btn--primary:hover { background: #333; }
        .mv12-cta__btn--secondary { background: transparent; color: #1a1a1a; border: 1px solid #1a1a1a; }
        .mv12-cta__btn--secondary:hover { background: #1a1a1a; color: #fff; }

        @media (max-width: 768px) {
          .mv12 { padding: 2rem 1.25rem; }
          .mv12-columns,
          .mv12-index__grid { grid-template-columns: 1fr; }
          .mv12-portraits__row { grid-template-columns: repeat(2, 1fr); }
          .mv12-aircraft__row { grid-template-columns: repeat(2, 1fr); }
          .mv12-colophon__grid { grid-template-columns: 1fr; }
          .mv12-ownership__grid { grid-template-columns: 1fr 1fr; }
          .mv12-sidebar-stats { flex-wrap: wrap; gap: 1rem; }
          .mv12-sidebar-stats__divider { display: none; }
        }


        /* =================================================================
           MAINTENANCE V13 — COMMAND CENTRE
        ================================================================= */
        .mv13 {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 1.5rem 3rem;
          font-family: 'Share Tech Mono', monospace;
          color: #1a1a1a;
          background: #faf9f6;
        }

        .mv13-panel-header {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7a7a7a;
          padding: 0.75rem 0;
          border-bottom: 1px solid #e8e6e2;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .mv13-panel-header__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #1a1a1a;
          flex-shrink: 0;
        }
        .mv13-panel-header--alert { color: #1a1a1a; font-weight: 600; }
        .mv13-panel-header__dot--alert { background: #b91c1c; }

        /* Header */
        .mv13-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 2px solid #1a1a1a;
          margin-bottom: 2rem;
        }
        .mv13-header__left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .mv13-header__status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #16a34a;
        }
        .mv13-header__status {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: #16a34a;
        }
        .mv13-header__title {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
        }
        .mv13-header__right { text-align: right; }
        .mv13-header__icao {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .mv13-header__coords {
          font-size: 0.55rem;
          color: #7a7a7a;
        }

        /* Metrics */
        .mv13-metrics {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .mv13-metrics__card {
          padding: 1rem;
          border: 1px solid #e8e6e2;
          background: #fff;
          text-align: center;
        }
        .mv13-metrics__label {
          display: block;
          font-size: 0.5rem;
          color: #7a7a7a;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }
        .mv13-metrics__value {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
        }
        .mv13-metrics__trend {
          display: block;
          font-size: 0.5rem;
          color: #7a7a7a;
          margin-top: 0.25rem;
        }

        /* Registry */
        .mv13-registry { margin-bottom: 2rem; }
        .mv13-registry__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        .mv13-registry__entry {
          padding: 1rem;
          border: 1px solid #e8e6e2;
          background: #fff;
        }
        .mv13-registry__mfr {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          margin-bottom: 0.35rem;
        }
        .mv13-registry__auth {
          display: block;
          font-size: 0.5rem;
          color: #7a7a7a;
          margin-bottom: 0.75rem;
          letter-spacing: 0.05em;
        }
        .mv13-registry__type {
          display: inline-block;
          font-size: 0.55rem;
          padding: 0.2rem 0.4rem;
          border: 1px solid #e8e6e2;
          margin: 0.15rem 0.15rem 0 0;
        }

        /* Engineers */
        .mv13-engineers { margin-bottom: 2rem; }
        .mv13-engineers__row {
          display: grid;
          grid-template-columns: 120px 130px 1fr 160px;
          gap: 0.5rem;
          padding: 0.6rem 0;
          border-bottom: 1px solid #f0f0f0;
          align-items: center;
          font-size: 0.6rem;
        }
        .mv13-engineers__name { font-weight: 600; }
        .mv13-engineers__title { color: #4a4a4a; }
        .mv13-engineers__cert { color: #7a7a7a; font-size: 0.55rem; }
        .mv13-engineers__note { color: #7a7a7a; font-size: 0.55rem; text-align: right; }
        .mv13-engineers__row--team { border-top: 1px solid #e8e6e2; margin-top: 0.25rem; padding-top: 0.75rem; }

        /* Queue */
        .mv13-queue { margin-bottom: 2rem; }
        .mv13-queue__item {
          display: grid;
          grid-template-columns: 60px 1fr 1.5fr 80px;
          gap: 0.75rem;
          padding: 0.6rem 0;
          border-bottom: 1px solid #f0f0f0;
          align-items: center;
          font-size: 0.58rem;
        }
        .mv13-queue__priority {
          font-size: 0.5rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 0.15rem 0.3rem;
          text-align: center;
        }
        .mv13-queue__priority--routine { background: #f0f0f0; }
        .mv13-queue__priority--scheduled { background: #e8e6e2; }
        .mv13-queue__priority--major { background: #1a1a1a; color: #fff; }
        .mv13-queue__priority--urgent { background: #b91c1c; color: #fff; }
        .mv13-queue__service { font-weight: 600; }
        .mv13-queue__detail { color: #7a7a7a; }
        .mv13-queue__eta { text-align: right; font-weight: 600; }

        /* Parts */
        .mv13-parts { margin-bottom: 2rem; }
        .mv13-parts__grid {
          display: flex;
          gap: 0.5rem;
          align-items: flex-end;
          height: 160px;
          padding: 0 2rem;
          margin-bottom: 0.75rem;
        }
        .mv13-parts__item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
        }
        .mv13-parts__bar {
          width: 100%;
          background: #1a1a1a;
          transition: height 0.6s ease;
        }
        .mv13-parts__count {
          font-size: 0.65rem;
          font-weight: 600;
          margin-top: 0.4rem;
        }
        .mv13-parts__cat {
          font-size: 0.5rem;
          color: #7a7a7a;
          letter-spacing: 0.1em;
        }
        .mv13-parts__total {
          text-align: center;
          font-size: 0.55rem;
          color: #7a7a7a;
          letter-spacing: 0.1em;
          padding-top: 0.5rem;
          border-top: 1px solid #e8e6e2;
        }

        /* Cert Matrix */
        .mv13-certmatrix { margin-bottom: 2rem; }
        .mv13-certmatrix__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
        }
        .mv13-certmatrix__cell {
          padding: 0.75rem;
          border: 1px solid #e8e6e2;
          text-align: center;
        }
        .mv13-certmatrix__cell--active {
          border-color: #1a1a1a;
          background: #fff;
        }
        .mv13-certmatrix__code {
          display: block;
          font-size: 0.65rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .mv13-certmatrix__desc {
          font-size: 0.48rem;
          color: #7a7a7a;
          letter-spacing: 0.05em;
        }

        /* AOG */
        .mv13-aog { margin-bottom: 2rem; }
        .mv13-aog__content {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 1.5rem;
          padding: 1.25rem;
          border: 2px solid #1a1a1a;
          background: #fff;
        }
        .mv13-aog__left h4 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        .mv13-aog__left p {
          font-size: 0.7rem;
          line-height: 1.6;
          color: #4a4a4a;
          margin: 0;
        }
        .mv13-aog__right {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }
        .mv13-aog__stat {
          text-align: center;
          padding: 0.75rem;
          border: 1px solid #e8e6e2;
        }
        .mv13-aog__stat strong {
          display: block;
          font-size: 0.7rem;
        }
        .mv13-aog__stat span {
          font-size: 0.48rem;
          color: #7a7a7a;
        }

        /* Bays */
        .mv13-bays { margin-bottom: 2rem; }
        .mv13-bays__grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 0.35rem;
          margin-bottom: 0.75rem;
        }
        .mv13-bays__bay {
          text-align: center;
          padding: 0.75rem 0.25rem;
          border: 1px solid #1a1a1a;
          background: #fff;
        }
        .mv13-bays__num {
          display: block;
          font-size: 0.55rem;
          font-weight: 600;
        }
        .mv13-bays__status {
          font-size: 0.45rem;
          color: #16a34a;
        }
        .mv13-bays__info {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          font-size: 0.5rem;
          color: #7a7a7a;
          letter-spacing: 0.1em;
        }

        /* Turnaround */
        .mv13-turnaround { margin-bottom: 2rem; }
        .mv13-turnaround__row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.4rem 0;
        }
        .mv13-turnaround__label {
          width: 70px;
          font-size: 0.55rem;
          text-align: right;
          flex-shrink: 0;
        }
        .mv13-turnaround__track {
          flex: 1;
          height: 6px;
          background: #f0eeeb;
        }
        .mv13-turnaround__fill {
          height: 100%;
          background: #1a1a1a;
          transition: width 0.6s ease;
        }
        .mv13-turnaround__fill--urgent { background: #b91c1c; }
        .mv13-turnaround__time {
          width: 40px;
          font-size: 0.55rem;
          font-weight: 600;
          flex-shrink: 0;
        }

        /* Type Ratings */
        .mv13-typeratings { margin-bottom: 2rem; }
        .mv13-typeratings__grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }
        .mv13-typeratings__tag {
          font-size: 0.55rem;
          font-weight: 600;
          padding: 0.4rem 0.75rem;
          border: 1px solid #1a1a1a;
          background: #fff;
          letter-spacing: 0.1em;
        }

        /* Diagnostic */
        .mv13-diagnostic { margin-bottom: 2rem; }
        .mv13-diagnostic__line {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0;
          font-size: 0.6rem;
          color: #4a4a4a;
          border-bottom: 1px solid #f0f0f0;
        }
        .mv13-diagnostic__check {
          color: #16a34a;
          font-weight: 700;
          flex-shrink: 0;
        }

        /* Schematic */
        .mv13-schematic { margin-bottom: 2rem; }
        .mv13-schematic__layout {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 0.5rem;
        }
        .mv13-schematic__zone {
          padding: 1rem;
          border: 1px solid #e8e6e2;
          background: #fff;
          text-align: center;
        }
        .mv13-schematic__zone span {
          display: block;
          font-size: 0.6rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .mv13-schematic__zone small {
          font-size: 0.48rem;
          color: #7a7a7a;
        }
        .mv13-schematic__zone--hangar {
          border-color: #1a1a1a;
          border-width: 2px;
        }

        /* Uptime */
        .mv13-uptime { margin-bottom: 2rem; }
        .mv13-uptime__content {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          padding: 1.25rem;
          border: 1px solid #e8e6e2;
          background: #fff;
        }
        .mv13-uptime__gauge {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid #1a1a1a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .mv13-uptime__gauge-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
        }
        .mv13-uptime__gauge-label {
          font-size: 0.45rem;
          color: #7a7a7a;
          letter-spacing: 0.15em;
        }
        .mv13-uptime__text {
          font-size: 0.72rem;
          line-height: 1.6;
          color: #4a4a4a;
          margin: 0;
        }

        /* Dispatch */
        .mv13-dispatch {
          text-align: center;
          padding: 2rem;
          border: 2px solid #1a1a1a;
          background: #1a1a1a;
          color: #fff;
        }
        .mv13-dispatch__label {
          display: block;
          font-size: 0.5rem;
          letter-spacing: 0.2em;
          color: #7a7a7a;
          margin-bottom: 0.75rem;
        }
        .mv13-dispatch__headline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .mv13-dispatch p {
          font-size: 0.65rem;
          color: #999;
          margin-bottom: 1.25rem;
        }
        .mv13-dispatch__actions { display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 0.75rem; }
        .mv13-dispatch__btn {
          display: inline-block;
          padding: 0.6rem 1.25rem;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-decoration: none;
          transition: all 0.2s;
        }
        .mv13-dispatch__btn--primary { background: #fff; color: #1a1a1a; }
        .mv13-dispatch__btn--primary:hover { background: #e8e6e2; color: #1a1a1a; }
        .mv13-dispatch__btn--secondary { border: 1px solid #555; color: #999; }
        .mv13-dispatch__btn--secondary:hover { border-color: #fff; color: #fff; }
        .mv13-dispatch__hours {
          font-size: 0.5rem;
          color: #555;
          letter-spacing: 0.1em;
        }

        @media (max-width: 768px) {
          .mv13 { padding: 0 1rem 2rem; }
          .mv13-metrics { grid-template-columns: repeat(3, 1fr); }
          .mv13-registry__grid { grid-template-columns: 1fr; }
          .mv13-engineers__row { grid-template-columns: 1fr 1fr; }
          .mv13-queue__item { grid-template-columns: 1fr; gap: 0.25rem; }
          .mv13-certmatrix__grid { grid-template-columns: repeat(2, 1fr); }
          .mv13-bays__grid { grid-template-columns: repeat(4, 1fr); }
          .mv13-schematic__layout { grid-template-columns: 1fr 1fr; }
          .mv13-aog__content { grid-template-columns: 1fr; }
          .mv13-header { flex-direction: column; gap: 0.5rem; text-align: center; }
        }


        /* =================================================================
           MAINTENANCE V14 — NARRATIVE SCROLL
        ================================================================= */
        .mv14 {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 2rem;
          font-family: 'Space Grotesk', -apple-system, sans-serif;
          color: #1a1a1a;
        }

        /* Opener */
        .mv14-opener {
          text-align: center;
          margin-bottom: 4rem;
        }
        .mv14-opener__chapter {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7a7a7a;
          display: block;
          margin-bottom: 1rem;
        }
        .mv14-opener__title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1.25rem;
        }
        .mv14-opener__subtitle {
          font-size: 0.9rem;
          line-height: 1.7;
          color: #4a4a4a;
          max-width: 560px;
          margin: 0 auto;
          font-style: italic;
        }
        .mv14-opener__line {
          width: 40px;
          height: 2px;
          background: #1a1a1a;
          margin: 2rem auto 0;
        }

        /* Origin */
        .mv14-origin {
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv14-origin__label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7a7a7a;
          display: block;
          margin-bottom: 1.5rem;
        }
        .mv14-origin__lede {
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }
        .mv14-origin__content p {
          font-size: 0.88rem;
          line-height: 1.8;
          color: #4a4a4a;
          margin: 0 0 1rem;
        }

        /* Verse */
        .mv14-verse {
          margin: 3rem 0;
          padding: 2.5rem 0;
          border-top: 1px solid #e8e6e2;
          border-bottom: 1px solid #e8e6e2;
          text-align: center;
        }
        .mv14-verse__line {
          font-size: 1rem;
          line-height: 2;
          color: #4a4a4a;
          margin: 0;
        }
        .mv14-verse__line--emphasis {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-top: 0.5rem;
        }

        /* Characters */
        .mv14-characters {
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv14-characters__label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7a7a7a;
          display: block;
          margin-bottom: 1.5rem;
        }
        .mv14-characters__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .mv14-characters__card {
          padding: 1.5rem;
          border: 1px solid #e8e6e2;
          background: #fff;
        }
        .mv14-characters__initial {
          display: flex;
          width: 36px;
          height: 36px;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
          color: #fff;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }
        .mv14-characters__card h4 {
          font-size: 0.88rem;
          margin-bottom: 0.25rem;
        }
        .mv14-characters__subtitle {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          color: #7a7a7a;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.75rem;
        }
        .mv14-characters__card p {
          font-size: 0.75rem;
          line-height: 1.7;
          color: #4a4a4a;
          margin: 0;
        }
        .mv14-characters__note {
          margin-top: 1rem;
          font-size: 0.72rem;
          color: #7a7a7a;
          font-style: italic;
          text-align: center;
        }

        /* Tree */
        .mv14-tree {
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv14-tree__label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7a7a7a;
          display: block;
          margin-bottom: 1.5rem;
        }
        .mv14-tree__branch {
          margin-bottom: 1.5rem;
          padding: 1.5rem;
          border: 1px solid #e8e6e2;
          background: #fff;
        }
        .mv14-tree__branch--primary {
          border-color: #1a1a1a;
          border-width: 2px;
        }
        .mv14-tree__branch h4 {
          font-size: 0.88rem;
          margin-bottom: 0.5rem;
        }
        .mv14-tree__badge {
          display: inline-block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.05em;
          color: #7a7a7a;
          padding: 0.2rem 0.5rem;
          border: 1px solid #e8e6e2;
          margin-bottom: 1rem;
        }
        .mv14-tree__leaves {
          display: grid;
          gap: 1rem;
        }
        .mv14-tree__leaf strong {
          display: block;
          font-size: 0.78rem;
          margin-bottom: 0.35rem;
        }
        .mv14-tree__leaf p {
          font-size: 0.72rem;
          line-height: 1.6;
          color: #4a4a4a;
          margin: 0;
        }

        /* Chapters (services) */
        .mv14-chapters {
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv14-chapters__label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7a7a7a;
          display: block;
          margin-bottom: 1.5rem;
        }
        .mv14-chapters__chapter {
          display: flex;
          gap: 1.25rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .mv14-chapters__chapter:last-child { border-bottom: none; }
        .mv14-chapters__num {
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.25rem;
          color: #e8e6e2;
          font-weight: 700;
          flex-shrink: 0;
          width: 40px;
        }
        .mv14-chapters__chapter h4 {
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
        }
        .mv14-chapters__chapter p {
          font-size: 0.78rem;
          line-height: 1.7;
          color: #4a4a4a;
          margin: 0;
        }

        /* Before/After */
        .mv14-beforeafter {
          margin-bottom: 1rem;
          padding: 0;
        }
        .mv14-beforeafter__label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7a7a7a;
          display: block;
          margin-bottom: 0.75rem;
        }
        .mv14-beforeafter__item {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 0.75rem;
          align-items: center;
        }
        .mv14-beforeafter__before,
        .mv14-beforeafter__after {
          padding: 0.65rem;
          border: 1px solid #e8e6e2;
        }
        .mv14-beforeafter__before span,
        .mv14-beforeafter__after span {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          color: #7a7a7a;
          margin-bottom: 0.25rem;
        }
        .mv14-beforeafter__before p,
        .mv14-beforeafter__after p {
          font-size: 0.68rem;
          line-height: 1.4;
          color: #4a4a4a;
          margin: 0;
        }
        .mv14-beforeafter__after {
          border-color: #1a1a1a;
          background: #fff;
        }
        .mv14-beforeafter__arrow {
          font-size: 1.1rem;
          color: #e8e6e2;
        }

        .mv14-beforeafter__img {
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, #f0eeea 0%, #e4e2dc 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-bottom: 0.35rem;
        }

        .mv14-beforeafter__img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mv14-beforeafter__steps {
          display: flex;
          gap: 0.3rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }

        .mv14-beforeafter__step {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.7rem;
          background: #faf9f6;
          border: 1px solid #e8e6e2;
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: inherit;
        }

        .mv14-beforeafter__step:hover {
          border-color: #ccc;
          background: #f5f4f0;
        }

        .mv14-beforeafter__step--active {
          border-color: #1a1a1a;
          background: #1a1a1a;
          color: #fff;
        }

        .mv14-beforeafter__step--active .mv14-beforeafter__step-num,
        .mv14-beforeafter__step--active .mv14-beforeafter__step-label {
          color: #fff;
        }

        .mv14-beforeafter__step-num {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1;
        }

        .mv14-beforeafter__step-label {
          font-size: 0.6rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #666;
        }

        .mv14-beforeafter__nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 0.6rem;
        }

        .mv14-beforeafter__nav-btn {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: none;
          border: 1px solid #e8e6e2;
          padding: 0.4rem 1rem;
          cursor: pointer;
          transition: all 0.25s ease;
          color: #1a1a1a;
        }

        .mv14-beforeafter__nav-btn:hover:not(:disabled) {
          border-color: #1a1a1a;
          background: #1a1a1a;
          color: #fff;
        }

        .mv14-beforeafter__nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .mv14-beforeafter__nav-count {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          color: #999;
        }

        .fd-sales__actions {
          display: flex;
          justify-content: flex-start;
          gap: 0.75rem;
          margin: 0.75rem 0 0;
        }

        .fd-sales__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.65rem 1.4rem;
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .fd-sales__btn--primary {
          background: #1a1a1a;
          color: #fff;
          border: 1px solid #1a1a1a;
        }

        .fd-sales__btn--primary:hover {
          background: #333;
        }

        .fd-sales__btn--outline {
          background: transparent;
          color: #1a1a1a;
          border: 1px solid #1a1a1a;
        }

        .fd-sales__btn--outline:hover {
          background: #1a1a1a;
          color: #fff;
        }

        /* Voices */
        .mv14-voices {
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv14-voices__label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7a7a7a;
          display: block;
          margin-bottom: 1.5rem;
        }
        .mv14-voices__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .mv14-voices__quote {
          padding: 1.25rem;
          border: 1px solid #e8e6e2;
          background: #fff;
          margin: 0;
        }
        .mv14-voices__quote p {
          font-size: 0.78rem;
          line-height: 1.7;
          font-style: italic;
          color: #4a4a4a;
          margin: 0 0 0.75rem;
        }
        .mv14-voices__quote cite {
          font-style: normal;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          color: #7a7a7a;
        }

        /* Walkthrough */
        .mv14-walkthrough {
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv14-walkthrough__label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7a7a7a;
          display: block;
          margin-bottom: 1.5rem;
        }
        .mv14-walkthrough__stop {
          display: flex;
          gap: 1.25rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .mv14-walkthrough__stop:last-child { border-bottom: none; }
        .mv14-walkthrough__stop-num {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #1a1a1a;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          flex-shrink: 0;
        }
        .mv14-walkthrough__stop h4 {
          font-size: 0.82rem;
          margin-bottom: 0.35rem;
        }
        .mv14-walkthrough__stop p {
          font-size: 0.75rem;
          line-height: 1.6;
          color: #4a4a4a;
          margin: 0;
        }

        /* Milestones */
        .mv14-milestones {
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv14-milestones__label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7a7a7a;
          display: block;
          margin-bottom: 1.5rem;
        }
        .mv14-milestones__marker {
          display: flex;
          gap: 1.25rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f0f0f0;
          align-items: baseline;
        }
        .mv14-milestones__year {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem;
          font-weight: 600;
          flex-shrink: 0;
          width: 50px;
        }
        .mv14-milestones__marker p {
          font-size: 0.75rem;
          color: #4a4a4a;
          margin: 0;
        }

        /* Catalogue */
        .mv14-catalogue {
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv14-catalogue__label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7a7a7a;
          display: block;
          margin-bottom: 1.5rem;
        }
        .mv14-catalogue__spread {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .mv14-catalogue__page {
          padding: 1.25rem;
          border: 1px solid #e8e6e2;
          background: #fff;
        }
        .mv14-catalogue__page h4 {
          font-size: 0.78rem;
          margin-bottom: 0.5rem;
        }
        .mv14-catalogue__page p {
          font-size: 0.68rem;
          line-height: 1.6;
          color: #4a4a4a;
          margin: 0;
        }
        .mv14-catalogue__value {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.72rem;
          color: #4a4a4a;
        }

        /* Seals */
        .mv14-seals {
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv14-seals__label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7a7a7a;
          display: block;
          margin-bottom: 1.5rem;
        }
        .mv14-seals__row {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .mv14-seals__seal {
          text-align: center;
        }
        .mv14-seals__icon {
          display: flex;
          width: 48px;
          height: 48px;
          align-items: center;
          justify-content: center;
          border: 2px solid #1a1a1a;
          border-radius: 50%;
          margin: 0 auto 0.5rem;
          font-size: 1rem;
        }
        .mv14-seals__seal strong {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Promise */
        .mv14-promise {
          text-align: center;
          margin-bottom: 3rem;
        }
        .mv14-promise__rule {
          width: 60px;
          height: 2px;
          background: #1a1a1a;
          margin: 0 auto 2rem;
        }
        .mv14-promise__text {
          font-size: 0.88rem;
          line-height: 1.8;
          color: #4a4a4a;
          max-width: 600px;
          margin: 0 auto 1.5rem;
        }
        .mv14-promise__emphasis {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 auto 2rem;
        }

        /* Coords */
        .mv14-coords {
          text-align: center;
          padding: 1.5rem 0;
          border-top: 1px solid #e8e6e2;
          border-bottom: 1px solid #e8e6e2;
          margin-bottom: 2rem;
        }
        .mv14-coords span {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem;
          color: #7a7a7a;
          letter-spacing: 0.1em;
          line-height: 1.8;
        }
        .mv14-coords__icao {
          font-size: 1rem !important;
          font-weight: 600;
          color: #1a1a1a !important;
        }

        /* CTA */
        .mv14-cta {
          text-align: center;
          padding: 2rem 0;
        }
        .mv14-cta h3 {
          font-size: 1.25rem;
          font-style: italic;
          margin-bottom: 0.75rem;
        }
        .mv14-cta p {
          font-size: 0.85rem;
          color: #4a4a4a;
          margin-bottom: 1.5rem;
        }
        .mv14-cta__actions { display: flex; gap: 0.75rem; justify-content: center; }
        .mv14-cta__btn {
          display: inline-block;
          padding: 0.7rem 1.4rem;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          transition: all 0.2s;
        }
        .mv14-cta__btn--primary { background: #1a1a1a; color: #fff; border: 1px solid #1a1a1a; }
        .mv14-cta__btn--primary:hover { background: #333; }
        .mv14-cta__btn--secondary { background: transparent; color: #1a1a1a; border: 1px solid #1a1a1a; }
        .mv14-cta__btn--secondary:hover { background: #1a1a1a; color: #fff; }

        @media (max-width: 768px) {
          .mv14 { padding: 2rem 1.25rem; }
          .mv14-characters__grid,
          .mv14-voices__grid,
          .mv14-catalogue__spread { grid-template-columns: 1fr; }
          .mv14-beforeafter__item { grid-template-columns: 1fr; }
          .mv14-beforeafter__arrow { transform: rotate(90deg); text-align: center; }
          .mv14-beforeafter__steps { gap: 0.35rem; }
          .mv14-beforeafter__step { padding: 0.4rem 0.75rem; }
          .fd-sales__actions { flex-direction: column; align-items: center; }
          .fd-sales__btn { width: 100%; max-width: 340px; text-align: center; }
        }


        /* =================================================================
           MAINTENANCE V15 — BRUTALIST MANIFESTO
        ================================================================= */
        .mv15 {
          max-width: 960px;
          margin: 0 auto;
          padding: 4rem 2rem;
          font-family: 'Share Tech Mono', monospace;
          color: #1a1a1a;
        }

        /* Giant Type */
        .mv15-giant {
          text-align: center;
          margin-bottom: 3rem;
        }
        .mv15-giant__text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(4rem, 12vw, 10rem);
          font-weight: 700;
          line-height: 0.9;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          margin: 0 0 1rem;
        }
        .mv15-giant__sub {
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          color: #7a7a7a;
        }

        /* Stats Wall */
        .mv15-statswall {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          margin-bottom: 0;
        }
        .mv15-statswall__item {
          padding: 1.5rem;
          border: 1px solid #1a1a1a;
          text-align: center;
          margin: -0.5px;
        }
        .mv15-statswall__num {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2rem;
          font-weight: 700;
        }
        .mv15-statswall__label {
          font-size: 0.5rem;
          letter-spacing: 0.15em;
          color: #7a7a7a;
        }

        /* Thick Rule */
        .mv15-rule {
          height: 4px;
          background: #1a1a1a;
          margin: 2.5rem 0;
        }

        /* Services */
        .mv15-services { margin-bottom: 0; }
        .mv15-services__list {
          font-size: 0.62rem;
          line-height: 1.8;
          overflow-x: auto;
          background: #fff;
          padding: 1.5rem;
          border: 1px solid #e8e6e2;
          margin: 0;
          white-space: pre;
        }

        /* Team */
        .mv15-team { margin-bottom: 0; }
        .mv15-team__person {
          padding: 1.25rem 0;
          border-bottom: 1px solid #e8e6e2;
        }
        .mv15-team__person:last-child { border-bottom: none; }
        .mv15-team__name {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .mv15-team__role {
          display: block;
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          color: #7a7a7a;
          margin-bottom: 0.5rem;
        }
        .mv15-team__creds {
          font-size: 0.6rem;
          color: #4a4a4a;
          line-height: 1.6;
        }
        .mv15-team__person--summary {
          border-top: 2px solid #1a1a1a;
          margin-top: 0.5rem;
          padding-top: 1.25rem;
        }

        /* Specimen */
        .mv15-specimen { margin-bottom: 0; }
        .mv15-specimen__heading {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
        }
        .mv15-specimen__grid {
          display: flex;
          flex-direction: column;
        }
        .mv15-specimen__type {
          display: grid;
          grid-template-columns: 200px 1fr 80px;
          gap: 1rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f0f0f0;
          align-items: center;
        }
        .mv15-specimen__name {
          font-size: 0.7rem;
          font-weight: 600;
        }
        .mv15-specimen__detail {
          font-size: 0.58rem;
          color: #7a7a7a;
        }
        .mv15-specimen__status {
          font-size: 0.5rem;
          font-weight: 600;
          text-align: right;
          letter-spacing: 0.1em;
        }

        /* Certs */
        .mv15-certs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          margin-bottom: 0;
        }
        .mv15-certs__badge {
          padding: 1.5rem;
          border: 2px solid #1a1a1a;
          text-align: center;
          font-size: 0.85rem;
          font-weight: 700;
          line-height: 1.3;
          margin: -1px;
          font-family: 'Space Grotesk', sans-serif;
        }

        /* Inventory */
        .mv15-inventory { margin-bottom: 0; }
        .mv15-inventory__raw {
          font-size: 0.62rem;
          line-height: 1.8;
          background: #1a1a1a;
          color: #fff;
          padding: 1.5rem;
          margin: 0;
          white-space: pre;
          overflow-x: auto;
        }

        /* Dimensions */
        .mv15-dimensions {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          margin-bottom: 0;
        }
        .mv15-dimensions__item {
          padding: 1.25rem;
          border: 1px solid #e8e6e2;
          margin: -0.5px;
        }
        .mv15-dimensions__val {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .mv15-dimensions__desc {
          font-size: 0.5rem;
          color: #7a7a7a;
          letter-spacing: 0.1em;
        }

        /* Testimonial */
        .mv15-testimonial { margin-bottom: 0; }
        .mv15-testimonial__text {
          font-size: 0.72rem;
          line-height: 1.8;
          background: #fff;
          padding: 1.5rem;
          border: 1px solid #e8e6e2;
          margin: 0;
          white-space: pre-wrap;
        }

        /* AOG */
        .mv15-aog {
          display: flex;
          align-items: stretch;
          border: 3px solid #1a1a1a;
          margin: 2.5rem 0;
        }
        .mv15-aog__alert {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
          color: #fff;
          padding: 1.5rem;
          font-size: 1.25rem;
          font-weight: 700;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          letter-spacing: 0.2em;
        }
        .mv15-aog__content {
          padding: 1.5rem;
          flex: 1;
        }
        .mv15-aog__content h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .mv15-aog__content p {
          font-size: 0.65rem;
          line-height: 1.8;
          color: #4a4a4a;
          letter-spacing: 0.05em;
          margin: 0;
        }

        /* Philosophy */
        .mv15-philosophy {
          padding: 3rem 0;
          text-align: center;
        }
        .mv15-philosophy__text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          font-weight: 700;
          letter-spacing: 0.15em;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto;
        }

        /* Stamp */
        .mv15-stamp {
          text-align: center;
          padding: 1.5rem 0;
          border-top: 1px solid #e8e6e2;
          border-bottom: 1px solid #e8e6e2;
          margin-bottom: 2rem;
        }
        .mv15-stamp span {
          display: block;
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          color: #7a7a7a;
          line-height: 1.8;
        }

        /* CTA Slab */
        .mv15-ctaslab {
          background: #1a1a1a;
          padding: 2rem;
          text-align: center;
        }
        .mv15-ctaslab__actions {
          display: flex;
          gap: 0;
          justify-content: center;
        }
        .mv15-ctaslab__btn {
          display: inline-block;
          padding: 1rem 2rem;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-decoration: none;
          color: #fff;
          border: 1px solid #555;
          transition: all 0.2s;
          margin: -0.5px;
        }
        .mv15-ctaslab__btn:hover {
          background: #fff;
          color: #1a1a1a;
          border-color: #fff;
        }

        @media (max-width: 768px) {
          .mv15 { padding: 2rem 1rem; }
          .mv15-statswall,
          .mv15-certs,
          .mv15-dimensions { grid-template-columns: repeat(2, 1fr); }
          .mv15-specimen__type { grid-template-columns: 1fr; gap: 0.25rem; }
          .mv15-aog { flex-direction: column; }
          .mv15-aog__alert { writing-mode: horizontal-tb; padding: 1rem; }
        }

        /* ===== Cloud Frost Cert Cards ===== */
        @keyframes certCloudExpand {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 500px; }
        }

        .cert-cloud { width: 100%; max-width: 700px; margin: 0 auto; }
        .cert-cloud--dealer { padding-bottom: 20px; }

        .cert-cloud__card {
          position: relative;
          background: rgba(250, 250, 252, 0.65);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1.5px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .cert-cloud__card:hover { box-shadow: 0 12px 50px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06); border-color: rgba(0, 0, 0, 0.15); }

        .cert-cloud__dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0, 0, 0, 0.04) 2px, transparent 2px);
          background-size: 22px 22px; pointer-events: none; z-index: 0;
          clip-path: polygon(100% 0, 55% 194px, 0% 194px, 0% 236px, 100% 236px);
        }

        .cert-cloud__split { position: relative; display: flex; min-height: 140px; z-index: 1; }

        .cert-cloud__upper {
          flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem;
          background: rgba(0, 0, 0, 0.04);
          clip-path: polygon(0 0, 100% 0, 55% 100%, 0 100%);
        }

        .cert-cloud__lower { position: absolute; right: 2rem; top: 65%; transform: translateY(-50%); text-align: right; }

        .cert-cloud__logo { height: 130px; width: auto; }

        .cert-cloud__guimbal-name {
          display: block; font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem;
          font-weight: 700; color: rgba(0, 0, 0, 0.3); letter-spacing: 0.15em; text-transform: uppercase;
        }
        .cert-cloud__guimbal-sub { display: block; font-size: 0.6rem; color: rgba(0, 0, 0, 0.2); }

        .cert-cloud__hint { display: block; text-align: center; padding: 12px 2rem; font-size: 0.75rem; color: #2563eb; position: relative; z-index: 1; }

        .cert-divider { width: 60px; height: 1px; background: rgba(0, 0, 0, 0.1); margin: 20px auto; }

        .cert-cloud__expanded {
          border-top: 1px solid rgba(0, 0, 0, 0.06); animation: certCloudExpand 0.3s ease; text-align: center;
        }

        .cert-cloud__body { padding: 1.5rem 2.5rem 16px; }

        .cert-cloud__title {
          font-family: 'Space Grotesk', sans-serif; font-size: 1.4rem; font-weight: 700; color: #111; margin: 0 0 0.75rem;
        }

        .cert-cloud__desc { font-size: 0.85rem; line-height: 1.6; color: rgba(0, 0, 0, 0.55); margin: 0 0 1.5rem; }

        .cert-cloud__label-tag {
          display: inline-block; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em;
          color: #2563eb; background: rgba(37, 99, 235, 0.08); padding: 0.25rem 0.75rem; border-radius: 20px; margin: 0 0 1.5rem;
        }

        .cert-cloud__stats {
          display: flex; justify-content: center; gap: 2rem; padding: 1rem 0 0;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .cert-cloud__stat { text-align: center; flex: 1; }
        .cert-cloud__stat-value { display: block; font-family: 'Share Tech Mono', monospace; font-size: 1.2rem; font-weight: 700; color: #111; }
        .cert-cloud__stat-label { display: block; font-size: 0.55rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(0, 0, 0, 0.4); margin-top: 0.2rem; }

        .cert-cloud__footer {
          padding: 1rem 1.5rem; background: rgba(0, 0, 0, 0.03); border-top: 1px solid rgba(0, 0, 0, 0.06); text-align: center;
        }

        .cert-cloud__footer-label {
          display: block; font-size: 0.5rem; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(0, 0, 0, 0.3); margin-bottom: 0.6rem;
        }

        .cert-cloud__pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.4rem; }

        .cert-cloud__pill {
          font-size: 0.6rem; font-weight: 600; color: rgba(0, 0, 0, 0.6);
          padding: 0.3rem 0.75rem; border-radius: 20px; background: rgba(0, 0, 0, 0.04); border: 1px solid rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </div>
  );
}

export default Experimentation;
