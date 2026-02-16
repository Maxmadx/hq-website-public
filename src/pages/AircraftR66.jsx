/**
 * HQ AVIATION - ROBINSON R66 AIRCRAFT PAGE
 *
 * Brand: Luxury Minimal Aviation
 * Typography: Space Grotesk + Share Tech Mono
 * Colors: #faf9f6 (warm white), #1a1a1a (charcoal), #4a4a4a (mid), #7a7a7a (light)
 * Aesthetic: Editorial Design, Luxury Aviation
 *
 * Sections:
 * 1. Hero - Full viewport with animated title
 * 2. Introduction - Robinson's first turbine helicopter
 * 3. History Timeline - First flight 2007, certified 2010
 * 4. Technical Specifications - Interactive specs card
 * 5. Flight Characteristics - Turbine smoothness, performance
 * 6. NXG Glass Cockpit - Garmin avionics, touchscreen navigators
 * 7. Autopilot & Technology - GFC 600H features, safety benefits
 * 8. Captain Quentin Smith Achievement - North Pole expedition
 * 9. Variants Section - R66 Standard, Marine, Newscopter
 * 10. Why Turbine Section - Benefits over piston
 * 11. Gallery - Grid of R66 images
 * 12. CTA - Link to expeditions and sales
 */

import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Import styles
import '../assets/css/main.css';
import '../assets/css/components.css';

// Import Footer
import FooterMinimal from '../components/FooterMinimal';

// ============================================================================
// COMPONENT: R66Header
// ============================================================================
function R66Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [colorDark, setColorDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [verticalProgress, setVerticalProgress] = useState(0);
  const [horizontalProgress, setHorizontalProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vProgress = Math.min(scrollY / 150, 1);
      setVerticalProgress(vProgress);
      const hProgress = Math.min(scrollY / 300, 1);
      setHorizontalProgress(hProgress);
      setColorDark(scrollY > 300);
      setScrolled(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const spotlightHeight = 95 + Math.round(verticalProgress * 405);
  const spotlightWidth = 214 + Math.round(horizontalProgress * 1786);

  return (
    <>
      <div className={`hq-menu-panel ${menuOpen ? 'open' : ''}`}>
        <div className="hq-menu-grid">
          <div className="hq-menu-section">
            <h3>About</h3>
            <ul>
              <li><Link to="/" onClick={closeMenu}>Home</Link></li>
              <li><Link to="/about-us" onClick={closeMenu}>About Us</Link></li>
              <li><Link to="/about-us/team" onClick={closeMenu}>Meet The Team</Link></li>
              <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Aircraft Sales</h3>
            <ul>
              <li><Link to="/sales/new" onClick={closeMenu}>New Aircraft</Link></li>
              <li><Link to="/aircraft/r66" onClick={closeMenu}>R66 Turbine</Link></li>
              <li><Link to="/aircraft/r44" onClick={closeMenu}>R44</Link></li>
              <li><Link to="/aircraft/r22" onClick={closeMenu}>R22</Link></li>
              <li><Link to="/sales/used" onClick={closeMenu}>Used Aircraft</Link></li>
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Training</h3>
            <ul>
              <li><Link to="/training" onClick={closeMenu}>Training Overview</Link></li>
              <li><Link to="/training/ppl" onClick={closeMenu}>Private Pilot License</Link></li>
              <li><Link to="/training/type-rating" onClick={closeMenu}>Type Ratings</Link></li>
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Services</h3>
            <ul>
              <li><Link to="/services" onClick={closeMenu}>Services</Link></li>
              <li><Link to="/maintenance" onClick={closeMenu}>Maintenance</Link></li>
              <li><Link to="/expeditions" onClick={closeMenu}>Expeditions</Link></li>
            </ul>
          </div>
        </div>
      </div>

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
              />
            </Link>
            <nav className="Header-nav Header-nav--secondary" data-nc-element="secondary-nav">
              <div className="Header-nav-inner">
                <Link to="/fleet" className="Header-nav-item">Fleet</Link>
                <Link to="/training" className="Header-nav-item">Training</Link>
                <Link to="/expeditions" className="Header-nav-item">Expeditions</Link>
              </div>
            </nav>
          </div>
          <div data-nc-container="top-right"></div>
        </div>
      </header>
    </>
  );
}

// ============================================================================
// COMPONENT: Reveal Animation Wrapper
// ============================================================================
function Reveal({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// COMPONENT: AnimatedNumber
// ============================================================================
function AnimatedNumber({ value, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const num = parseInt(value.toString().replace(/[^0-9]/g, ''));
      const duration = 2000;
      const steps = 60;
      const increment = num / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= num) {
          setCount(num);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ============================================================================
// DATA
// ============================================================================

const r66SpecsStandard = [
  { label: 'Engine', value: 'Rolls-Royce RR300', icon: 'fa-cog' },
  { label: 'Power', value: '270 SHP', icon: 'fa-bolt' },
  { label: 'Max Speed', value: '140 kts', icon: 'fa-tachometer-alt' },
  { label: 'Cruise Speed', value: '110 kts', icon: 'fa-plane' },
  { label: 'Range', value: '350 nm', icon: 'fa-route' },
  { label: 'Useful Load', value: '1,200 lbs', icon: 'fa-weight-hanging' },
  { label: 'Seats', value: '5', icon: 'fa-users' },
  { label: 'Rotor Diameter', value: '33 ft', icon: 'fa-circle-notch' },
  { label: 'Fuel Capacity', value: '73.3 gal', icon: 'fa-gas-pump' },
  { label: 'Endurance', value: '3+ hrs', icon: 'fa-clock' },
];

const r66SpecsExtended = [
  { label: 'Engine', value: 'Rolls-Royce RR300', icon: 'fa-cog' },
  { label: 'Power', value: '270 SHP', icon: 'fa-bolt' },
  { label: 'Max Speed', value: '140 kts', icon: 'fa-tachometer-alt' },
  { label: 'Cruise Speed', value: '110 kts', icon: 'fa-plane' },
  { label: 'Range', value: '450+ nm', icon: 'fa-route' },
  { label: 'Useful Load', value: '1,200 lbs', icon: 'fa-weight-hanging' },
  { label: 'Seats', value: '5', icon: 'fa-users' },
  { label: 'Rotor Diameter', value: '33 ft', icon: 'fa-circle-notch' },
  { label: 'Fuel Capacity', value: '98.3 gal', icon: 'fa-gas-pump' },
  { label: 'Endurance', value: '4+ hrs', icon: 'fa-clock' },
];

const historyTimeline = [
  { year: '2007', title: 'First Flight', description: 'The R66 prototype took to the skies, marking Robinson\'s entry into the turbine helicopter market.' },
  { year: '2010', title: 'FAA Certification', description: 'Received FAA Type Certificate, becoming Robinson\'s first turbine-powered helicopter.' },
  { year: '2011', title: 'Production Begins', description: 'Full-scale production commenced at the Torrance, California factory.' },
  { year: '2012', title: 'EASA Certification', description: 'European Aviation Safety Agency certification opened global markets.' },
  { year: '2019', title: '1,000th Delivery', description: 'Robinson delivered the 1,000th R66, cementing its position in the turbine market.' },
  { year: '2024', title: 'NXG Avionics', description: 'The R66 received the new NXG glass cockpit avionics suite as standard.' },
];

const flightCharacteristics = [
  {
    title: 'Turbine Smoothness',
    description: 'The Rolls-Royce RR300 turbine engine delivers exceptionally smooth power delivery with minimal vibration, creating a refined flying experience that passengers and pilots alike appreciate.',
    icon: 'fa-wind',
  },
  {
    title: 'Hot & High Performance',
    description: 'Superior performance in challenging conditions. The turbine engine maintains power at high altitudes and temperatures where piston engines struggle, making it ideal for mountain operations.',
    icon: 'fa-mountain',
  },
  {
    title: '5-Seat Capability',
    description: 'The largest cabin in the Robinson lineup offers genuine five-seat capacity with comfortable spacing. Rear passengers enjoy excellent visibility through large windows.',
    icon: 'fa-users',
  },
];

const nxgCockpitFeatures = [
  {
    title: 'Full Garmin Glass Cockpit',
    description: 'The NXG package delivers a complete Garmin avionics suite, replacing traditional analog gauges with modern digital displays for enhanced situational awareness.',
    icon: 'fa-desktop',
  },
  {
    title: 'Dual Touchscreen Navigators',
    description: 'Garmin GTN touchscreen navigators provide intuitive flight planning, moving map displays, and seamless integration with the autopilot system.',
    icon: 'fa-hand-pointer',
  },
  {
    title: 'G500H TXi Flight Display',
    description: 'Primary flight display showing attitude, airspeed, altitude, and vertical speed with synthetic vision technology for enhanced terrain awareness.',
    icon: 'fa-tachometer-alt',
  },
  {
    title: 'Impact-Resistant Windshield',
    description: 'Advanced laminated windshield provides superior protection against bird strikes and debris while maintaining excellent optical clarity.',
    icon: 'fa-shield-alt',
  },
];

const nxgStandardFeatures = [
  'Garmin G500H TXi Flight Display',
  'Dual GTN 650Xi Touchscreen Navigators',
  'Hand-Stitched Leather Seating',
  'Impact-Resistant Windshield',
  'GFC 600H Two-Axis Autopilot',
  'GTX 345 ADS-B Transponder',
  'Integrated Engine Monitoring',
  'USB Charging Ports',
];

const autopilotModes = [
  {
    mode: 'ALT',
    name: 'Altitude Hold',
    description: 'Automatically maintains selected altitude, reducing pilot workload during cruise flight.',
  },
  {
    mode: 'HDG',
    name: 'Heading Select',
    description: 'Holds or intercepts selected headings, simplifying navigation and traffic pattern work.',
  },
  {
    mode: 'NAV',
    name: 'Navigation Mode',
    description: 'Tracks GPS flight plans and VOR courses for hands-off enroute navigation.',
  },
  {
    mode: 'APR',
    name: 'Approach Mode',
    description: 'Provides precise lateral and vertical guidance during instrument approaches.',
  },
];

const r66Variants = [
  {
    name: 'Southwood',
    description: 'A classic earth-tone color scheme featuring warm brown and tan accents. This elegant configuration pairs beautifully with beige leather interiors and wood-grain trim.',
    image: '/assets/images/new-aircraft/r66/r66-cutout.png',
    features: ['Warm Brown & Tan Exterior', 'Beige Leather Interior', 'Wood-Grain Trim Option', 'Classic Aesthetic'],
  },
  {
    name: 'Palo Verde',
    description: 'A striking blue color scheme inspired by the clear desert skies. The Palo Verde features metallic blue tones complemented by silver accents for a modern, sophisticated appearance.',
    image: '/assets/images/new-aircraft/r66/blue-r66-palo-verde-left-v4.png',
    features: ['Metallic Blue Exterior', 'Silver Accent Striping', 'Dark Leather Interior', 'Contemporary Design'],
  },
  {
    name: 'Riviera',
    description: 'An elegant white and grey color scheme that exudes luxury and refinement. The Riviera is the perfect choice for executive transport and VIP operations.',
    image: '/assets/images/new-aircraft/r66/rhc-r66-nxg-riviera-center-spotlight-vertical-format-14184-2.jpg',
    features: ['Pearl White Exterior', 'Grey Accent Striping', 'Premium Leather Interior', 'Executive Aesthetic'],
  },
];

const turbineBenefits = [
  {
    title: 'Fleet Flight Hours',
    description: 'The global R66 fleet has accumulated over 1.5 million flight hours, demonstrating proven reliability in operations worldwide.',
    stat: '1.5M+',
    statLabel: 'Flight Hours',
  },
  {
    title: 'Engine Reliability',
    description: 'The Rolls-Royce RR300 turbine has achieved an unprecedented safety record with zero in-flight engine failures across the entire fleet.',
    stat: '0',
    statLabel: 'In-Flight Failures',
  },
  {
    title: 'Time Between Overhaul',
    description: 'The RR300 engine boasts an impressive 2,000-hour TBO, minimizing maintenance downtime and maximizing aircraft availability.',
    stat: '2,000',
    statLabel: 'Hour TBO',
  },
  {
    title: 'Fleet Size',
    description: 'Over 1,500 R66 turbines delivered worldwide since 2010, making it the fastest-growing turbine helicopter in its class.',
    stat: '1,500+',
    statLabel: 'Aircraft Delivered',
  },
];

const expeditionAchievements = [
  { label: 'Helicopters', value: '6', suffix: '' },
  { label: 'Poles Reached', value: '3', suffix: '' },
  { label: 'Flight Hours', value: '200', suffix: '+' },
  { label: 'Miles Covered', value: '3000', suffix: '+' },
];

const galleryImages = [
  { src: '/assets/images/new-aircraft/r66/blue-r66-palo-verde-left-v4.png', alt: 'R66 in Blue Livery' },
  { src: '/assets/images/new-aircraft/r66/rhc-r66-nxg-riviera-center-spotlight-vertical-format-14184-2.jpg', alt: 'R66 Spotlight View' },
  { src: '/assets/images/new-aircraft/r66/rhc-r66-nxg-riviera-all-glass-cockpit-13338.jpg', alt: 'R66 Glass Cockpit' },
  { src: '/assets/images/new-aircraft/r66/r66bluprint.jpg', alt: 'R66 Blueprint' },
  { src: '/assets/images/expeditions/six-helis-in-North-Pole.jpg', alt: 'R66 Fleet at North Pole' },
  { src: '/assets/images/expeditions/helicopter-expeditions-quentin-smith.webp', alt: 'R66 Expedition' },
];

// ============================================================================
// SECTION 1: Hero
// ============================================================================
function R66Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 0.7]);

  return (
    <section ref={heroRef} className="r66-hero">
      <motion.div
        className="r66-hero__bg"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <img
          src="/assets/images/new-aircraft/r66/rhc-r66-nxg-riviera-center-spotlight-vertical-format-14184-2.jpg"
          alt="Robinson R66 Turbine Helicopter"
        />
      </motion.div>

      <motion.div
        className="r66-hero__overlay"
        style={{ opacity: overlayOpacity }}
      />

      <motion.div
        className="r66-hero__content"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <motion.span
          className="r66-hero__label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          ROBINSON HELICOPTER COMPANY
        </motion.span>

        <div className="r66-hero__headline">
          {['R', '6', '6'].map((letter, i) => (
            <motion.span
              key={i}
              className="r66-hero__letter"
              initial={{ opacity: 0, y: 60, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4 + i * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.span
          className="r66-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          TURBINE
        </motion.span>

        <motion.div
          className="r66-hero__divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        />

        <motion.p
          className="r66-hero__tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          Robinson's first turbine-powered helicopter. Five seats.
          Rolls-Royce power. Proven reliability.
        </motion.p>

        <motion.div
          className="r66-hero__badges"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="r66-hero__badge">
            <span className="r66-hero__badge-value">270</span>
            <span className="r66-hero__badge-label">SHP</span>
          </div>
          <div className="r66-hero__badge-divider" />
          <div className="r66-hero__badge">
            <span className="r66-hero__badge-value">140</span>
            <span className="r66-hero__badge-label">KTS</span>
          </div>
          <div className="r66-hero__badge-divider" />
          <div className="r66-hero__badge">
            <span className="r66-hero__badge-value">5</span>
            <span className="r66-hero__badge-label">SEATS</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="r66-hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span>Scroll to explore</span>
        <div className="r66-hero__scroll-line">
          <div className="r66-hero__scroll-dot" />
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// SECTION 2: Introduction
// ============================================================================
function R66Introduction() {
  return (
    <section className="r66-intro">
      <div className="r66-intro__container">
        <div className="r66-intro__content">
          <Reveal>
            <span className="r66-pre-text">THE FIRST TURBINE</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="r66-intro__headline">
              <span className="r66-text--dark">Robinson's</span>{' '}
              <span className="r66-text--mid">Turbine</span>{' '}
              <span className="r66-text--light">Revolution</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="r66-intro__text">
              The R66 represents Robinson Helicopter Company's bold entry into the turbine market.
              Combining the company's legendary reliability and value with the power and performance
              of a Rolls-Royce turbine engine, the R66 delivers an unmatched combination of
              capability, efficiency, and Robinson simplicity.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="r66-intro__text">
              With genuine five-seat capacity, smooth turbine power, and operating costs
              significantly lower than other turbine helicopters, the R66 has redefined
              what's possible in light turbine aviation.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.4} direction="right">
          <div className="r66-intro__image">
            <img
              src="/assets/images/new-aircraft/r66/r66-cutout.png"
              alt="Robinson R66 Cutout"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 3: History Timeline
// ============================================================================
function R66History() {
  return (
    <section className="r66-history">
      <div className="r66-history__container">
        <Reveal>
          <div className="r66-section-header">
            <span className="r66-pre-text">DEVELOPMENT</span>
            <h2>
              <span className="r66-text--dark">History</span>{' '}
              <span className="r66-text--mid">of the</span>{' '}
              <span className="r66-text--light">R66</span>
            </h2>
          </div>
        </Reveal>

        <div className="r66-history__timeline">
          {historyTimeline.map((event, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="r66-history__item">
                <div className="r66-history__year">{event.year}</div>
                <div className="r66-history__line">
                  <div className="r66-history__dot" />
                </div>
                <div className="r66-history__content">
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 4: Technical Specifications
// ============================================================================
function R66Specifications() {
  const [activeSpec, setActiveSpec] = useState(null);
  const [isExtendedRange, setIsExtendedRange] = useState(false);
  const r66Specs = isExtendedRange ? r66SpecsExtended : r66SpecsStandard;

  return (
    <section className="r66-specs">
      <div className="r66-specs__container">
        <div className="r66-specs__left">
          <Reveal>
            <div className="r66-section-header">
              <span className="r66-pre-text">PERFORMANCE DATA</span>
              <h2>
                <span className="r66-text--dark">Technical</span>{' '}
                <span className="r66-text--mid">Specifications</span>
              </h2>
            </div>
          </Reveal>

          <div className="r66-specs__toggle">
            <button
              className={`r66-specs__toggle-btn ${!isExtendedRange ? 'active' : ''}`}
              onClick={() => setIsExtendedRange(false)}
            >
              Standard
            </button>
            <button
              className={`r66-specs__toggle-btn ${isExtendedRange ? 'active' : ''}`}
              onClick={() => setIsExtendedRange(true)}
            >
              Extended Range
            </button>
          </div>

          <div className="r66-specs__grid">
            {r66Specs.map((spec, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <motion.div
                  className={`r66-specs__item ${activeSpec === i ? 'active' : ''}`}
                  onHoverStart={() => setActiveSpec(i)}
                  onHoverEnd={() => setActiveSpec(null)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="r66-specs__icon">
                    <i className={`fas ${spec.icon}`}></i>
                  </div>
                  <div className="r66-specs__data">
                    <span className="r66-specs__label">{spec.label}</span>
                    <span className="r66-specs__value">{spec.value}</span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3} direction="right">
          <div className="r66-specs__right">
            <img
              src="/assets/images/new-aircraft/r66/r66bluprint.jpg"
              alt="R66 Blueprint"
              className="r66-specs__blueprint"
            />
            <div className="r66-specs__overlay-data">
              <div className="r66-specs__overlay-item">
                <span>LENGTH</span>
                <span>29.5 ft</span>
              </div>
              <div className="r66-specs__overlay-item">
                <span>HEIGHT</span>
                <span>11.7 ft</span>
              </div>
              <div className="r66-specs__overlay-item">
                <span>MAX WEIGHT</span>
                <span>2,700 lbs</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 5: Flight Characteristics
// ============================================================================
function R66FlightCharacteristics() {
  return (
    <section className="r66-flight">
      <div className="r66-flight__container">
        <Reveal>
          <div className="r66-section-header r66-section-header--center">
            <span className="r66-pre-text">IN THE AIR</span>
            <h2>
              <span className="r66-text--dark">Flight</span>{' '}
              <span className="r66-text--mid">Characteristics</span>
            </h2>
          </div>
        </Reveal>

        <div className="r66-flight__grid">
          {flightCharacteristics.map((char, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <motion.div
                className="r66-flight__card"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="r66-flight__icon">
                  <i className={`fas ${char.icon}`}></i>
                </div>
                <h3>{char.title}</h3>
                <p>{char.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 6: NXG Glass Cockpit
// ============================================================================
function R66NXGCockpit() {
  return (
    <section className="r66-nxg">
      <div className="r66-nxg__container">
        <div className="r66-nxg__header">
          <Reveal>
            <div className="r66-section-header">
              <span className="r66-pre-text">NOW STANDARD ON ALL R66</span>
              <h2>
                <span className="r66-text--dark">NXG</span>{' '}
                <span className="r66-text--mid">Glass</span>{' '}
                <span className="r66-text--light">Cockpit</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="r66-nxg__intro">
              The NXG avionics package transforms the R66 cockpit with a full Garmin glass suite,
              hand-stitched leather seating, and the industry's first two-axis autopilot in a light
              turbine helicopter. Now standard on every new R66.
            </p>
          </Reveal>
        </div>

        <div className="r66-nxg__content">
          <Reveal delay={0.2} direction="left">
            <div className="r66-nxg__image">
              <img
                src="/assets/images/new-aircraft/r66/rhc-r66-nxg-riviera-all-glass-cockpit-13338.jpg"
                alt="R66 NXG Glass Cockpit"
              />
              <div className="r66-nxg__image-badge">
                <span className="r66-nxg__image-badge-label">GARMIN</span>
                <span className="r66-nxg__image-badge-text">Integrated Avionics</span>
              </div>
            </div>
          </Reveal>

          <div className="r66-nxg__features">
            {nxgCockpitFeatures.map((feature, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1} direction="right">
                <motion.div
                  className="r66-nxg__feature"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="r66-nxg__feature-icon">
                    <i className={`fas ${feature.icon}`}></i>
                  </div>
                  <div className="r66-nxg__feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.5}>
          <div className="r66-nxg__standard">
            <h3>NXG Standard Equipment</h3>
            <div className="r66-nxg__standard-grid">
              {nxgStandardFeatures.map((feature, i) => (
                <div key={i} className="r66-nxg__standard-item">
                  <i className="fas fa-check"></i>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 7: Autopilot & Technology
// ============================================================================
function R66Autopilot() {
  const [activeMode, setActiveMode] = useState(0);

  return (
    <section className="r66-autopilot">
      <div className="r66-autopilot__container">
        <Reveal>
          <div className="r66-section-header r66-section-header--center">
            <span className="r66-pre-text">GARMIN GFC 600H</span>
            <h2>
              <span className="r66-text--dark">Two-Axis</span>{' '}
              <span className="r66-text--mid">Autopilot</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="r66-autopilot__intro">
            The Garmin GFC 600H represents a breakthrough in helicopter automation. As the industry's
            first two-axis autopilot standard in a light turbine helicopter, it delivers altitude hold,
            heading select, navigation, and approach modes for unprecedented capability.
          </p>
        </Reveal>

        <div className="r66-autopilot__modes-section">
          <Reveal delay={0.2}>
            <div className="r66-autopilot__modes-header">
              <h3>Autopilot Modes</h3>
            </div>
          </Reveal>

          <div className="r66-autopilot__modes-content">
            <Reveal delay={0.3} direction="left">
              <div className="r66-autopilot__modes-selector">
                {autopilotModes.map((mode, i) => (
                  <motion.button
                    key={i}
                    className={`r66-autopilot__mode-btn ${activeMode === i ? 'active' : ''}`}
                    onClick={() => setActiveMode(i)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="r66-autopilot__mode-code">{mode.mode}</span>
                    <span className="r66-autopilot__mode-name">{mode.name}</span>
                  </motion.button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.4} direction="right">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMode}
                  className="r66-autopilot__mode-detail"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="r66-autopilot__mode-display">
                    <span className="r66-autopilot__mode-display-code">
                      {autopilotModes[activeMode].mode}
                    </span>
                  </div>
                  <h4>{autopilotModes[activeMode].name}</h4>
                  <p>{autopilotModes[activeMode].description}</p>
                </motion.div>
              </AnimatePresence>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.5}>
          <div className="r66-autopilot__stats">
            <div className="r66-autopilot__stat">
              <span className="r66-autopilot__stat-value">1.5M+</span>
              <span className="r66-autopilot__stat-label">Fleet Flight Hours</span>
            </div>
            <div className="r66-autopilot__stat-divider"></div>
            <div className="r66-autopilot__stat">
              <span className="r66-autopilot__stat-value">0</span>
              <span className="r66-autopilot__stat-label">In-Flight Engine Failures</span>
            </div>
            <div className="r66-autopilot__stat-divider"></div>
            <div className="r66-autopilot__stat">
              <span className="r66-autopilot__stat-value">1,500+</span>
              <span className="r66-autopilot__stat-label">Aircraft Delivered Since 2010</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 8: Captain Quentin Smith Achievement Section
// ============================================================================
function R66Expedition() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={sectionRef} className="r66-expedition r66-expedition--compact">
      <motion.div className="r66-expedition__bg" style={{ y: bgY }}>
        <img
          src="/assets/images/expeditions/six-helis-in-North-Pole.jpg"
          alt="Six R66 Helicopters at the North Pole"
        />
      </motion.div>
      <div className="r66-expedition__overlay" />

      <div className="r66-expedition__container">
        <Reveal>
          <h2>
            <span style={{ color: '#fff' }}>Captain Quentin Smith</span>
          </h2>
          <p className="r66-expedition__lead">
            Led an expedition of six R66 helicopters to the Magnetic North Pole, Geographic North Pole,
            and Pole of Inaccessibility - proving the R66's capability in extreme conditions.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="r66-expedition__stats">
            {expeditionAchievements.map((stat, i) => (
              <div key={i} className="r66-expedition__stat">
                <span className="r66-expedition__stat-value">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="r66-expedition__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 7: Variants
// ============================================================================
function R66Variants() {
  const [activeVariant, setActiveVariant] = useState(0);

  return (
    <section className="r66-variants">
      <div className="r66-variants__container">
        <Reveal>
          <div className="r66-section-header r66-section-header--center">
            <span className="r66-pre-text">CONFIGURATIONS</span>
            <h2>
              <span className="r66-text--dark">R66</span>{' '}
              <span className="r66-text--mid">Variants</span>
            </h2>
          </div>
        </Reveal>

        <div className="r66-variants__tabs">
          {r66Variants.map((variant, i) => (
            <button
              key={i}
              className={`r66-variants__tab ${activeVariant === i ? 'active' : ''}`}
              onClick={() => setActiveVariant(i)}
            >
              {variant.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeVariant}
            className="r66-variants__content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="r66-variants__image">
              <img
                src={r66Variants[activeVariant].image}
                alt={r66Variants[activeVariant].name}
              />
            </div>
            <div className="r66-variants__info">
              <h3>{r66Variants[activeVariant].name}</h3>
              <p>{r66Variants[activeVariant].description}</p>
              <ul className="r66-variants__features">
                {r66Variants[activeVariant].features.map((feature, i) => (
                  <li key={i}>
                    <i className="fas fa-check"></i>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="r66-btn r66-btn--primary">
                Request Configuration
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 8: Why Turbine
// ============================================================================
function R66WhyTurbine() {
  return (
    <section className="r66-turbine">
      <div className="r66-turbine__container">
        <Reveal>
          <div className="r66-section-header r66-section-header--center">
            <span className="r66-pre-text">THE TURBINE ADVANTAGE</span>
            <h2>
              <span className="r66-text--dark">Why</span>{' '}
              <span className="r66-text--mid">Turbine</span>{' '}
              <span className="r66-text--light">Power?</span>
            </h2>
          </div>
        </Reveal>

        <div className="r66-turbine__grid">
          {turbineBenefits.map((benefit, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="r66-turbine__card">
                <div className="r66-turbine__stat">
                  <span className="r66-turbine__stat-value">{benefit.stat}</span>
                  <span className="r66-turbine__stat-label">{benefit.statLabel}</span>
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

// ============================================================================
// SECTION 9: Gallery
// ============================================================================
function R66Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="r66-gallery">
      <div className="r66-gallery__container">
        <Reveal>
          <div className="r66-section-header r66-section-header--center">
            <span className="r66-pre-text">VISUALS</span>
            <h2>
              <span className="r66-text--dark">R66</span>{' '}
              <span className="r66-text--mid">Gallery</span>
            </h2>
          </div>
        </Reveal>

        <div className="r66-gallery__grid">
          {galleryImages.map((image, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                className="r66-gallery__item"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image.src} alt={image.alt} />
                <div className="r66-gallery__overlay">
                  <i className="fas fa-expand"></i>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="r66-gallery__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="r66-gallery__lightbox-content"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <img src={selectedImage.src} alt={selectedImage.alt} />
              <button
                className="r66-gallery__lightbox-close"
                onClick={() => setSelectedImage(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ============================================================================
// SECTION 10: CTA
// ============================================================================
function R66CTA() {
  return (
    <section className="r66-cta">
      <div className="r66-cta__container">
        <Reveal>
          <span className="r66-pre-text">NEXT STEPS</span>
          <h2>
            <span className="r66-text--dark">Ready to</span>{' '}
            <span className="r66-text--mid">Experience</span>{' '}
            <span className="r66-text--light">the R66?</span>
          </h2>
          <p>
            Whether you're looking to purchase a new R66, join an expedition,
            or simply learn more about turbine helicopter ownership, we're here to help.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="r66-cta__actions">
            <Link to="/contact" className="r66-btn r66-btn--primary">
              Enquire about Aircraft
            </Link>
            <Link to="/training/ppl" className="r66-btn r66-btn--secondary">
              Learn to Fly
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="r66-cta__contact">
            <div className="r66-cta__contact-item">
              <i className="fas fa-phone"></i>
              <span>+44 1895 833 373</span>
            </div>
            <div className="r66-cta__contact-item">
              <i className="fas fa-envelope"></i>
              <span>sales@hqaviation.com</span>
            </div>
            <div className="r66-cta__contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Denham Aerodrome, UK</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================================
// STYLES (Inline for page-specific styles)
// ============================================================================
const R66Styles = () => (
  <style>{`
    /* ====================================================================
       R66 PAGE STYLES
       ==================================================================== */

    /* Typography Variables */
    .r66-pre-text {
      display: block;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.75rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: #999;
      margin-bottom: 1rem;
    }

    .r66-pre-text--light {
      color: rgba(255, 255, 255, 0.6);
    }

    .r66-text--dark { color: #1a1a1a; }
    .r66-text--mid { color: #4a4a4a; }
    .r66-text--light { color: #7a7a7a; }

    .r66-section-header {
      margin-bottom: 3rem;
    }

    .r66-section-header--center {
      text-align: center;
    }

    .r66-section-header--light .r66-pre-text {
      color: rgba(255, 255, 255, 0.6);
    }

    .r66-section-header h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 500;
      line-height: 1.1;
      margin: 0;
    }

    /* Buttons */
    .r66-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2rem;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.9rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .r66-btn--primary {
      background: #1a1a1a;
      color: #fff;
    }

    .r66-btn--primary:hover {
      background: #333;
      transform: translateY(-2px);
    }

    .r66-btn--secondary {
      background: #4a4a4a;
      color: #fff;
    }

    .r66-btn--secondary:hover {
      background: #5a5a5a;
      transform: translateY(-2px);
    }

    .r66-btn--outline {
      background: transparent;
      color: #1a1a1a;
      border: 1px solid #1a1a1a;
    }

    .r66-btn--outline:hover {
      background: #1a1a1a;
      color: #fff;
    }

    .r66-btn--light {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(10px);
    }

    .r66-btn--light:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    /* ====================================================================
       HERO SECTION
       ==================================================================== */
    .r66-hero {
      position: relative;
      height: 100vh;
      min-height: 700px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .r66-hero__bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .r66-hero__bg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .r66-hero__overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
      z-index: 1;
    }

    .r66-hero__content {
      position: relative;
      z-index: 2;
      text-align: center;
      color: #fff;
      max-width: 900px;
      padding: 0 2rem;
    }

    .r66-hero__label {
      display: block;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.75rem;
      letter-spacing: 0.3em;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 1.5rem;
    }

    .r66-hero__headline {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .r66-hero__letter {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(5rem, 15vw, 12rem);
      font-weight: 500;
      line-height: 1;
      color: #fff;
    }

    .r66-hero__subtitle {
      display: block;
      font-family: 'Share Tech Mono', monospace;
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      letter-spacing: 0.5em;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 2rem;
    }

    .r66-hero__divider {
      width: 100px;
      height: 1px;
      background: rgba(255, 255, 255, 0.4);
      margin: 0 auto 2rem;
      transform-origin: center;
    }

    .r66-hero__tagline {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.125rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.9);
      max-width: 600px;
      margin: 0 auto 3rem;
    }

    .r66-hero__badges {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
    }

    .r66-hero__badge {
      text-align: center;
    }

    .r66-hero__badge-value {
      display: block;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.5rem;
      font-weight: 500;
      color: #fff;
    }

    .r66-hero__badge-label {
      display: block;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.6);
    }

    .r66-hero__badge-divider {
      width: 1px;
      height: 40px;
      background: rgba(255, 255, 255, 0.3);
    }

    .r66-hero__scroll {
      position: absolute;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      text-align: center;
    }

    .r66-hero__scroll span {
      display: block;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 0.5rem;
    }

    .r66-hero__scroll-line {
      width: 1px;
      height: 50px;
      background: rgba(255, 255, 255, 0.2);
      margin: 0 auto;
      position: relative;
      overflow: hidden;
    }

    .r66-hero__scroll-dot {
      width: 3px;
      height: 10px;
      background: #fff;
      border-radius: 2px;
      position: absolute;
      left: -1px;
      animation: scrollDot 2s infinite;
    }

    @keyframes scrollDot {
      0% { top: 0; opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }

    /* ====================================================================
       INTRODUCTION SECTION
       ==================================================================== */
    .r66-intro {
      padding: 8rem 2rem;
      background: #faf9f6;
    }

    .r66-intro__container {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .r66-intro__headline {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 500;
      line-height: 1.2;
      margin-bottom: 2rem;
    }

    .r66-intro__text {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      line-height: 1.8;
      color: #4a4a4a;
      margin-bottom: 1.5rem;
    }

    .r66-intro__image {
      position: relative;
    }

    .r66-intro__image img {
      width: 100%;
      max-width: 600px;
    }

    /* ====================================================================
       HISTORY TIMELINE SECTION
       ==================================================================== */
    .r66-history {
      padding: 8rem 2rem;
      background: #fff;
    }

    .r66-history__container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .r66-history__timeline {
      margin-top: 4rem;
      position: relative;
    }

    .r66-history__timeline::before {
      content: '';
      position: absolute;
      top: 6px;
      left: calc(100px + 1rem + 24px);
      width: 2px;
      height: calc(100% - 2rem);
      background: #1a1a1a;
      z-index: 0;
    }

    .r66-history__item {
      display: grid;
      grid-template-columns: 100px 50px 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
      position: relative;
    }

    .r66-history__year {
      font-family: 'Share Tech Mono', monospace;
      font-size: 1.25rem;
      font-weight: 600;
      color: #1a1a1a;
      text-align: right;
      padding-top: 0.25rem;
    }

    .r66-history__line {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 1;
    }

    .r66-history__dot {
      width: 14px;
      height: 14px;
      background: #1a1a1a;
      border-radius: 50%;
      flex-shrink: 0;
      position: relative;
      z-index: 2;
    }

    .r66-history__content h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 500;
      color: #1a1a1a;
      margin: 0 0 0.5rem;
    }

    .r66-history__content p {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1rem;
      color: #666;
      line-height: 1.6;
      margin: 0;
    }

    /* ====================================================================
       SPECIFICATIONS SECTION
       ==================================================================== */
    .r66-specs {
      padding: 8rem 2rem;
      background: #faf9f6;
    }

    .r66-specs__container {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }

    .r66-specs__toggle {
      display: flex;
      gap: 0;
      margin-top: 1.5rem;
      border: 1px solid #1a1a1a;
      border-radius: 4px;
      overflow: hidden;
      width: fit-content;
    }

    .r66-specs__toggle-btn {
      padding: 0.75rem 1.5rem;
      background: transparent;
      border: none;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.85rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #4a4a4a;
    }

    .r66-specs__toggle-btn:not(:last-child) {
      border-right: 1px solid #1a1a1a;
    }

    .r66-specs__toggle-btn:hover {
      background: #f0efec;
    }

    .r66-specs__toggle-btn.active {
      background: #1a1a1a;
      color: #faf9f6;
    }

    .r66-specs__grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .r66-specs__item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .r66-specs__item:hover,
    .r66-specs__item.active {
      border-color: #1a1a1a;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .r66-specs__icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      border-radius: 4px;
      color: #4a4a4a;
    }

    .r66-specs__data {
      display: flex;
      flex-direction: column;
    }

    .r66-specs__label {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #999;
    }

    .r66-specs__value {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      font-weight: 500;
      color: #1a1a1a;
    }

    .r66-specs__right {
      position: relative;
    }

    .r66-specs__blueprint {
      width: 100%;
      border-radius: 8px;
    }

    .r66-specs__overlay-data {
      position: absolute;
      bottom: 2rem;
      left: 2rem;
      right: 2rem;
      display: flex;
      justify-content: space-around;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      padding: 1.5rem;
      border-radius: 4px;
    }

    .r66-specs__overlay-item {
      text-align: center;
    }

    .r66-specs__overlay-item span:first-child {
      display: block;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.15em;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 0.25rem;
    }

    .r66-specs__overlay-item span:last-child {
      display: block;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      font-weight: 500;
      color: #fff;
    }

    /* ====================================================================
       FLIGHT CHARACTERISTICS SECTION
       ==================================================================== */
    .r66-flight {
      padding: 8rem 2rem;
      background: #fff;
    }

    .r66-flight__container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .r66-flight__grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      margin-top: 3rem;
    }

    .r66-flight__card {
      padding: 2rem;
      background: #faf9f6;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .r66-flight__card:hover {
      background: #fff;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }

    .r66-flight__icon {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1a1a1a;
      color: #fff;
      border-radius: 4px;
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
    }

    .r66-flight__card h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 500;
      color: #1a1a1a;
      margin: 0 0 1rem;
    }

    .r66-flight__card p {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.95rem;
      line-height: 1.7;
      color: #666;
      margin: 0;
    }

    /* ====================================================================
       EXPEDITION SECTION
       ==================================================================== */
    .r66-expedition {
      position: relative;
      padding: 10rem 2rem;
      overflow: hidden;
    }

    .r66-expedition__bg {
      position: absolute;
      inset: -10%;
      z-index: 0;
    }

    .r66-expedition__bg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .r66-expedition__overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.7) 0%,
        rgba(0, 0, 0, 0.85) 100%
      );
      z-index: 1;
    }

    .r66-expedition__container {
      position: relative;
      z-index: 2;
      max-width: 1200px;
      margin: 0 auto;
    }

    .r66-expedition__subtitle {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(1.25rem, 3vw, 2rem);
      font-weight: 400;
      margin-top: 0.5rem;
    }

    .r66-expedition__content {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 4rem;
      margin: 4rem 0;
    }

    .r66-expedition__lead {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 2rem;
    }

    .r66-expedition__achievements {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .r66-expedition__achievement {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .r66-expedition__check {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      color: #fff;
      flex-shrink: 0;
    }

    .r66-expedition__achievement-text h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      font-weight: 500;
      color: #fff;
      margin: 0 0 0.25rem;
    }

    .r66-expedition__achievement-text p {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
      margin: 0;
      line-height: 1.5;
    }

    .r66-expedition__stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .r66-expedition__stat {
      text-align: center;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }

    .r66-expedition__stat-value {
      display: block;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.5rem;
      font-weight: 500;
      color: #fff;
    }

    .r66-expedition__stat-label {
      display: block;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 0.5rem;
    }

    .r66-expedition__quote {
      max-width: 800px;
      margin: 4rem auto;
      text-align: center;
      padding: 3rem;
      border-left: 2px solid rgba(255, 255, 255, 0.3);
      border-right: 2px solid rgba(255, 255, 255, 0.3);
    }

    .r66-expedition__quote blockquote {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-style: italic;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.9);
      margin: 0 0 1.5rem;
    }

    .r66-expedition__quote cite {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      color: rgba(255, 255, 255, 0.5);
    }

    .r66-expedition__image-grid {
      margin: 4rem 0;
    }

    .r66-expedition__image--main img {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      display: block;
      border-radius: 4px;
    }

    .r66-expedition__cta {
      text-align: center;
    }

    /* ====================================================================
       VARIANTS SECTION
       ==================================================================== */
    .r66-variants {
      padding: 8rem 2rem;
      background: #faf9f6;
    }

    .r66-variants__container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .r66-variants__tabs {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin: 3rem 0;
    }

    .r66-variants__tab {
      padding: 0.75rem 2rem;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.9rem;
      font-weight: 500;
      background: transparent;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .r66-variants__tab:hover {
      border-color: #1a1a1a;
    }

    .r66-variants__tab.active {
      background: #1a1a1a;
      border-color: #1a1a1a;
      color: #fff;
    }

    .r66-variants__content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      margin-top: 2rem;
    }

    .r66-variants__image img {
      width: 100%;
      max-height: 400px;
      object-fit: contain;
    }

    .r66-variants__info h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2rem;
      font-weight: 500;
      color: #1a1a1a;
      margin: 0 0 1rem;
    }

    .r66-variants__info p {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      line-height: 1.7;
      color: #666;
      margin-bottom: 2rem;
    }

    .r66-variants__features {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem;
    }

    .r66-variants__features li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1rem;
      color: #4a4a4a;
      padding: 0.5rem 0;
    }

    .r66-variants__features i {
      color: #1a1a1a;
    }

    /* ====================================================================
       WHY TURBINE SECTION
       ==================================================================== */
    .r66-turbine {
      padding: 8rem 2rem;
      background: #fff;
    }

    .r66-turbine__container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .r66-turbine__grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      margin: 4rem 0;
    }

    .r66-turbine__card {
      padding: 2rem;
      background: #faf9f6;
      border-radius: 4px;
      text-align: center;
    }

    .r66-turbine__stat {
      margin-bottom: 1.5rem;
    }

    .r66-turbine__stat-value {
      display: block;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.5rem;
      font-weight: 500;
      color: #1a1a1a;
    }

    .r66-turbine__stat-label {
      display: block;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #999;
    }

    .r66-turbine__card h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      font-weight: 500;
      color: #1a1a1a;
      margin: 0 0 0.75rem;
    }

    .r66-turbine__card p {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.9rem;
      line-height: 1.6;
      color: #666;
      margin: 0;
    }

    .r66-turbine__comparison {
      background: #faf9f6;
      padding: 3rem;
      border-radius: 8px;
    }

    .r66-turbine__comparison h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.5rem;
      font-weight: 500;
      color: #1a1a1a;
      margin: 0 0 2rem;
      text-align: center;
    }

    .r66-turbine__comparison-grid {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .r66-turbine__comparison-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .r66-turbine__comparison-label {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #999;
    }

    .r66-turbine__comparison-bars {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .r66-turbine__bar {
      height: 36px;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      border-radius: 4px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.85rem;
    }

    .r66-turbine__bar--r66 {
      background: #1a1a1a;
      color: #fff;
      width: 100%;
    }

    .r66-turbine__bar--piston {
      background: #ddd;
      color: #666;
      width: 70%;
    }

    /* ====================================================================
       NXG GLASS COCKPIT SECTION
       ==================================================================== */
    .r66-nxg {
      padding: 8rem 2rem;
      background: #1a1a1a;
      color: #fff;
    }

    .r66-nxg__container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .r66-nxg__header {
      max-width: 800px;
      margin-bottom: 4rem;
    }

    .r66-nxg .r66-section-header h2 {
      color: #fff;
    }

    .r66-nxg .r66-text--dark { color: #fff; }
    .r66-nxg .r66-text--mid { color: rgba(255, 255, 255, 0.8); }
    .r66-nxg .r66-text--light { color: rgba(255, 255, 255, 0.6); }

    .r66-nxg__intro {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.15rem;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.75);
      margin-top: 1.5rem;
    }

    .r66-nxg__content {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 4rem;
      align-items: start;
      margin-bottom: 4rem;
    }

    .r66-nxg__image {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
    }

    .r66-nxg__image img {
      width: 100%;
      display: block;
    }

    .r66-nxg__image-badge {
      position: absolute;
      bottom: 1.5rem;
      left: 1.5rem;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(10px);
      padding: 1rem 1.5rem;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .r66-nxg__image-badge-label {
      display: block;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 0.25rem;
    }

    .r66-nxg__image-badge-text {
      display: block;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      color: #fff;
    }

    .r66-nxg__features {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .r66-nxg__feature {
      display: flex;
      gap: 1.25rem;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .r66-nxg__feature:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.15);
    }

    .r66-nxg__feature-icon {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: #fff;
      font-size: 1.1rem;
      flex-shrink: 0;
    }

    .r66-nxg__feature-content h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      font-weight: 500;
      color: #fff;
      margin: 0 0 0.5rem;
    }

    .r66-nxg__feature-content p {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.9rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.6);
      margin: 0;
    }

    .r66-nxg__standard {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 3rem;
    }

    .r66-nxg__standard h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.5rem;
      font-weight: 500;
      color: #fff;
      margin: 0 0 2rem;
      text-align: center;
    }

    .r66-nxg__standard-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }

    .r66-nxg__standard-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 4px;
    }

    .r66-nxg__standard-item i {
      color: rgba(255, 255, 255, 0.4);
      font-size: 0.8rem;
    }

    .r66-nxg__standard-item span {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.8);
    }

    /* ====================================================================
       AUTOPILOT & TECHNOLOGY SECTION
       ==================================================================== */
    .r66-autopilot {
      padding: 8rem 2rem;
      background: #faf9f6;
    }

    .r66-autopilot__container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .r66-autopilot__intro {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.15rem;
      line-height: 1.8;
      color: #4a4a4a;
      text-align: center;
      max-width: 800px;
      margin: 0 auto 4rem;
    }

    .r66-autopilot__modes-section {
      margin-bottom: 4rem;
    }

    .r66-autopilot__modes-header h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 500;
      color: #1a1a1a;
      text-align: center;
      margin: 0 0 2rem;
    }

    .r66-autopilot__modes-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: start;
    }

    .r66-autopilot__modes-selector {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .r66-autopilot__mode-btn {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      padding: 1.25rem 1.5rem;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: left;
    }

    .r66-autopilot__mode-btn:hover {
      border-color: #1a1a1a;
    }

    .r66-autopilot__mode-btn.active {
      background: #1a1a1a;
      border-color: #1a1a1a;
    }

    .r66-autopilot__mode-code {
      font-family: 'Share Tech Mono', monospace;
      font-size: 1.25rem;
      font-weight: 600;
      color: #1a1a1a;
      width: 50px;
      text-align: center;
      padding: 0.5rem;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .r66-autopilot__mode-btn.active .r66-autopilot__mode-code {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
    }

    .r66-autopilot__mode-name {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      color: #1a1a1a;
    }

    .r66-autopilot__mode-btn.active .r66-autopilot__mode-name {
      color: #fff;
    }

    .r66-autopilot__mode-detail {
      background: #fff;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 3rem;
      text-align: center;
    }

    .r66-autopilot__mode-display {
      margin-bottom: 1.5rem;
    }

    .r66-autopilot__mode-display-code {
      display: inline-block;
      font-family: 'Share Tech Mono', monospace;
      font-size: 3rem;
      font-weight: 600;
      color: #1a1a1a;
      padding: 1rem 2rem;
      background: #f5f5f5;
      border-radius: 8px;
      letter-spacing: 0.1em;
    }

    .r66-autopilot__mode-detail h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.5rem;
      font-weight: 500;
      color: #1a1a1a;
      margin: 0 0 1rem;
    }

    .r66-autopilot__mode-detail p {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1rem;
      line-height: 1.7;
      color: #666;
      margin: 0;
    }

    .r66-autopilot__benefits h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 500;
      color: #1a1a1a;
      text-align: center;
      margin: 0 0 2rem;
    }

    .r66-autopilot__benefits-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      margin-bottom: 4rem;
    }

    .r66-autopilot__benefit {
      padding: 2rem;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 4px;
      text-align: center;
      transition: all 0.3s ease;
    }

    .r66-autopilot__benefit-icon {
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1a1a1a;
      color: #fff;
      border-radius: 50%;
      margin: 0 auto 1.5rem;
      font-size: 1.25rem;
    }

    .r66-autopilot__benefit h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      font-weight: 500;
      color: #1a1a1a;
      margin: 0 0 0.75rem;
    }

    .r66-autopilot__benefit p {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.9rem;
      line-height: 1.6;
      color: #666;
      margin: 0;
    }

    .r66-autopilot__stats {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3rem;
      padding: 3rem;
      background: #1a1a1a;
      border-radius: 8px;
    }

    .r66-autopilot__stat {
      text-align: center;
    }

    .r66-autopilot__stat-value {
      display: block;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.5rem;
      font-weight: 500;
      color: #fff;
    }

    .r66-autopilot__stat-label {
      display: block;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 0.5rem;
    }

    .r66-autopilot__stat-divider {
      width: 1px;
      height: 60px;
      background: rgba(255, 255, 255, 0.2);
    }

    /* ====================================================================
       GALLERY SECTION
       ==================================================================== */
    .r66-gallery {
      padding: 8rem 2rem;
      background: #faf9f6;
    }

    .r66-gallery__container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .r66-gallery__grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-top: 3rem;
    }

    .r66-gallery__item {
      position: relative;
      aspect-ratio: 4/3;
      overflow: hidden;
      border-radius: 4px;
      cursor: pointer;
    }

    .r66-gallery__item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .r66-gallery__item:hover img {
      transform: scale(1.05);
    }

    .r66-gallery__overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .r66-gallery__item:hover .r66-gallery__overlay {
      opacity: 1;
    }

    .r66-gallery__overlay i {
      color: #fff;
      font-size: 1.5rem;
    }

    .r66-gallery__lightbox {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.95);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .r66-gallery__lightbox-content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
    }

    .r66-gallery__lightbox-content img {
      max-width: 100%;
      max-height: 85vh;
      object-fit: contain;
    }

    .r66-gallery__lightbox-close {
      position: absolute;
      top: -3rem;
      right: 0;
      width: 40px;
      height: 40px;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .r66-gallery__lightbox-close:hover {
      background: #fff;
      color: #1a1a1a;
    }

    /* ====================================================================
       CTA SECTION
       ==================================================================== */
    .r66-cta {
      padding: 8rem 2rem;
      background: #fff;
      text-align: center;
    }

    .r66-cta__container {
      max-width: 900px;
      margin: 0 auto;
    }

    .r66-cta h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 500;
      line-height: 1.2;
      margin-bottom: 1.5rem;
    }

    .r66-cta p {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      line-height: 1.7;
      color: #666;
      max-width: 600px;
      margin: 0 auto 3rem;
    }

    .r66-cta__actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 4rem;
    }

    .r66-cta__contact {
      display: flex;
      justify-content: center;
      gap: 3rem;
      padding-top: 3rem;
      border-top: 1px solid #eee;
    }

    .r66-cta__contact-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.95rem;
      color: #666;
    }

    .r66-cta__contact-item i {
      color: #1a1a1a;
    }

    /* ====================================================================
       RESPONSIVE STYLES
       ==================================================================== */
    @media (max-width: 1024px) {
      .r66-intro__container,
      .r66-specs__container,
      .r66-variants__content {
        grid-template-columns: 1fr;
      }

      .r66-flight__grid,
      .r66-turbine__grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .r66-expedition__content {
        grid-template-columns: 1fr;
      }

      .r66-gallery__grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .r66-nxg__content {
        grid-template-columns: 1fr;
        gap: 3rem;
      }

      .r66-nxg__standard-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .r66-autopilot__modes-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .r66-autopilot__benefits-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .r66-autopilot__stats {
        flex-wrap: wrap;
        gap: 2rem;
      }

      .r66-autopilot__stat-divider {
        display: none;
      }
    }

    @media (max-width: 768px) {
      .r66-hero__headline {
        gap: 0.25rem;
      }

      .r66-hero__badges {
        flex-direction: column;
        gap: 1.5rem;
      }

      .r66-hero__badge-divider {
        width: 40px;
        height: 1px;
      }

      .r66-history__item {
        grid-template-columns: 80px 40px 1fr;
      }

      .r66-flight__grid,
      .r66-turbine__grid {
        grid-template-columns: 1fr;
      }

      .r66-specs__grid {
        grid-template-columns: 1fr;
      }

      .r66-expedition__stats {
        grid-template-columns: 1fr;
      }

      .r66-variants__tabs {
        flex-direction: column;
      }

      .r66-gallery__grid {
        grid-template-columns: 1fr;
      }

      .r66-cta__actions {
        flex-direction: column;
        align-items: center;
      }

      .r66-cta__contact {
        flex-direction: column;
        gap: 1rem;
        align-items: center;
      }

      .r66-nxg__standard-grid {
        grid-template-columns: 1fr;
      }

      .r66-nxg__feature {
        flex-direction: column;
        text-align: center;
      }

      .r66-nxg__feature-icon {
        margin: 0 auto;
      }

      .r66-autopilot__benefits-grid {
        grid-template-columns: 1fr;
      }

      .r66-autopilot__modes-selector {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }

      .r66-autopilot__mode-btn {
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        flex: 1;
        min-width: 100px;
      }

      .r66-autopilot__mode-code {
        width: auto;
        padding: 0.5rem 0.75rem;
      }

      .r66-autopilot__mode-name {
        font-size: 0.8rem;
        text-align: center;
      }

      .r66-autopilot__stats {
        flex-direction: column;
        gap: 1.5rem;
        padding: 2rem;
      }
    }

    @media (max-width: 480px) {
      .r66-hero__letter {
        font-size: 4rem;
      }

      .r66-hero__subtitle {
        font-size: 1.25rem;
        letter-spacing: 0.3em;
      }

      .r66-intro,
      .r66-history,
      .r66-specs,
      .r66-flight,
      .r66-nxg,
      .r66-autopilot,
      .r66-variants,
      .r66-turbine,
      .r66-gallery,
      .r66-cta {
        padding: 5rem 1.5rem;
      }

      .r66-expedition {
        padding: 6rem 1.5rem;
      }

      .r66-nxg__standard {
        padding: 2rem 1.5rem;
      }

      .r66-autopilot__mode-detail {
        padding: 2rem 1.5rem;
      }

      .r66-autopilot__mode-display-code {
        font-size: 2rem;
        padding: 0.75rem 1.5rem;
      }
    }
  `}</style>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
function AircraftR66() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="r66-page">
      <R66Styles />
      <R66Header />
      <main>
        <R66Hero />
        <R66Introduction />
        <R66History />
        <R66Specifications />
        <R66FlightCharacteristics />
        <R66NXGCockpit />
        <R66Autopilot />
        <R66Expedition />
        <R66Variants />
        <R66WhyTurbine />
        <R66Gallery />
        <R66CTA />
      </main>
      <FooterMinimal />
    </div>
  );
}

export default AircraftR66;
