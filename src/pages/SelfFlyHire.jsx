/**
 * SELF-FLY HIRE PAGE
 *
 * Brand: Luxury Minimal Aviation
 * Typography: Space Grotesk + Share Tech Mono
 * Colors: #faf9f6 (warm white), #1a1a1a (charcoal), #2563eb (accent)
 */

import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Import styles
import '../assets/css/main.css';
import '../assets/css/components.css';

// Import FooterMinimal component
import FooterMinimal from '../components/FooterMinimal';

/**
 * SELF-FLY HIRE PAGE HEADER COMPONENT
 */
function SelfFlyHireHeader() {
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
              <li><Link to="/about-us/captain-q" onClick={closeMenu}>Quentin Smith</Link></li>
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Aircraft Sales</h3>
            <ul>
              <li><Link to="/aircraft-sales" onClick={closeMenu}>New Aircraft</Link></li>
              <li><Link to="/aircraft-sales/new/r66" onClick={closeMenu}>R66</Link></li>
              <li><Link to="/aircraft-sales/new/r44" onClick={closeMenu}>R44</Link></li>
              <li><Link to="/aircraft-sales/new/r22" onClick={closeMenu}>R22</Link></li>
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Flight Training</h3>
            <ul>
              <li><Link to="/training" onClick={closeMenu}>Training Overview</Link></li>
              <li><Link to="/training/ppl" onClick={closeMenu}>Private Pilot License</Link></li>
              <li><Link to="/training/faq" onClick={closeMenu}>Training FAQ</Link></li>
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Services</h3>
            <ul>
              <li><Link to="/services" onClick={closeMenu}>Services Overview</Link></li>
              <li><Link to="/self-fly-hire" onClick={closeMenu}>Self-Fly Hire</Link></li>
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

// Animated reveal wrapper
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

// Animated counter
function AnimatedNumber({ value, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const num = parseInt(value.replace(/[^0-9]/g, ''));
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

  return <span ref={ref}>{count}{suffix}</span>;
}

// Fleet data
const fleetData = [
  {
    model: 'R22',
    image: '/assets/images/fleet/r22-beta-ii.jpg',
    seats: 2,
    speed: '96 kts',
    range: '185 nm',
    hourlyRate: '£275',
    description: 'Perfect for solo adventures or training continuation. Light, nimble, and economical.',
    features: ['Garmin GPS', 'Intercom System', 'Leather Seats']
  },
  {
    model: 'R44 Raven II',
    image: '/assets/images/fleet/r44-raven-ii.jpg',
    seats: 4,
    speed: '113 kts',
    range: '300 nm',
    hourlyRate: '£395',
    description: 'Our most popular hire aircraft. Ideal for day trips, golf outings, and family flights.',
    features: ['Air Conditioning', 'Garmin G500', 'Leather Interior', 'USB Charging']
  },
  {
    model: 'R66 Turbine',
    image: '/assets/images/fleet/r66-turbine.jpg',
    seats: 5,
    speed: '120 kts',
    range: '350 nm',
    hourlyRate: '£595',
    description: 'Turbine reliability with exceptional performance. Perfect for longer journeys and higher altitudes.',
    features: ['Turbine Engine', 'Garmin G500H', 'Premium Interior', 'Enhanced Safety Features']
  }
];

// Requirements data
const requirements = [
  {
    icon: '01',
    title: 'Valid PPL(H)',
    desc: 'Current Private Pilot License for helicopters with valid medical certificate'
  },
  {
    icon: '02',
    title: 'Type Rating',
    desc: 'Current type rating for the aircraft you wish to hire (R22, R44, or R66)'
  },
  {
    icon: '03',
    title: 'Currency Check',
    desc: 'Recent flight experience or checkout flight with our instructors'
  },
  {
    icon: '04',
    title: 'Insurance',
    desc: 'Comprehensive insurance included in all hire rates'
  }
];

// Benefits data
const benefits = [
  { stat: '30+', label: 'Aircraft Available', desc: 'The largest Robinson fleet in Europe' },
  { stat: '7', label: 'Days a Week', desc: 'Flexible scheduling to suit your plans' },
  { stat: '35+', label: 'Years Experience', desc: 'Trusted expertise since 1990' },
  { stat: '2,000+', label: 'Destinations', desc: 'Fly anywhere in the UK and Europe' }
];

function SelfFlyHire() {
  const heroRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeFleet, setActiveFleet] = useState(1);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: 'What are the minimum requirements to hire?',
      a: 'You need a valid PPL(H) with a current medical certificate, the appropriate type rating for your chosen aircraft, and recent flight experience. If you haven\'t flown recently, we can arrange a currency check flight.'
    },
    {
      q: 'How far in advance should I book?',
      a: 'We recommend booking at least 48 hours in advance, especially for weekends and holidays. However, subject to availability, we can accommodate same-day bookings.'
    },
    {
      q: 'Is insurance included?',
      a: 'Yes, comprehensive hull and liability insurance is included in all hire rates. Your excess is £5,000 for the R22, £7,500 for the R44, and £10,000 for the R66.'
    },
    {
      q: 'Can I fly abroad?',
      a: 'Yes, with prior arrangement. We can assist with flight planning, customs requirements, and necessary permissions for international flights.'
    },
    {
      q: 'What happens if I need to cancel?',
      a: 'Cancellations made more than 24 hours before your booking receive a full refund. Cancellations within 24 hours are charged at 50% of the booking value.'
    },
    {
      q: 'Do you offer block booking discounts?',
      a: 'Yes, we offer discounted rates for block bookings of 10 hours or more. Contact us for a personalized quote based on your flying requirements.'
    }
  ];

  return (
    <div className="sfh">
      <SelfFlyHireHeader />

      {/* ========== HERO SECTION ========== */}
      <section ref={heroRef} className="sfh-hero">
        <motion.div
          className="sfh-hero__bg"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img src="/assets/images/gallery/carousel/rotating1.jpg" alt="" />
        </motion.div>
        <div className="sfh-hero__overlay" />

        <motion.div
          className="sfh-hero__content"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <div className="sfh-hero__left">
            <motion.span
              className="sfh-hero__label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              HELICOPTER HIRE
            </motion.span>

            <div className="sfh-hero__headline">
              <motion.span
                className="sfh-hero__word sfh-hero__word--1"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                SELF-FLY
              </motion.span>
              <motion.span
                className="sfh-hero__word sfh-hero__word--2"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                HIRE
              </motion.span>
            </div>

            <motion.div
              className="sfh-hero__divider-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.p
              className="sfh-hero__sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Access Europe's largest Robinson fleet. Fly where you want, when you want—with the freedom only helicopter travel provides.
            </motion.p>

            <motion.div
              className="sfh-hero__stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="sfh-hero__stat">
                <span className="sfh-hero__stat-value">30+</span>
                <span className="sfh-hero__stat-label">Aircraft</span>
              </div>
              <div className="sfh-hero__stat-divider" />
              <div className="sfh-hero__stat">
                <span className="sfh-hero__stat-value">3</span>
                <span className="sfh-hero__stat-label">Models</span>
              </div>
              <div className="sfh-hero__stat-divider" />
              <div className="sfh-hero__stat">
                <span className="sfh-hero__stat-value">7</span>
                <span className="sfh-hero__stat-label">Days/Week</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ========== INTRO SECTION ========== */}
      <section className="sfh-intro">
        <div className="sfh-intro__container">
          <Reveal>
            <div className="sfh-intro__header">
              <span className="sfh-pre-text">Freedom to Fly</span>
              <h2>
                <span className="sfh-text--dark">Your</span>{' '}
                <span className="sfh-text--mid">Aircraft</span>{' '}
                <span className="sfh-text--light">Awaits</span>
              </h2>
              <p>
                With an impressive fleet of over 30 helicopters, HQ Aviation offers unparalleled choice and availability
                for licensed pilots. Whether you're planning a day trip to the coast, a golf weekend in Scotland, or
                a business meeting across the country, we have the perfect aircraft for your mission.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="sfh-intro__benefits">
              {benefits.map((benefit, i) => (
                <div key={i} className="sfh-intro__benefit">
                  <span className="sfh-intro__benefit-stat"><AnimatedNumber value={benefit.stat} /></span>
                  <span className="sfh-intro__benefit-label">{benefit.label}</span>
                  <span className="sfh-intro__benefit-desc">{benefit.desc}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== FLEET SECTION ========== */}
      <section className="sfh-fleet">
        <div className="sfh-fleet__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Our Fleet</span>
              <h2>
                <span className="sfh-text--dark">Choose</span>{' '}
                <span className="sfh-text--mid">Your</span>{' '}
                <span className="sfh-text--light">Aircraft</span>
              </h2>
            </div>
          </Reveal>

          <div className="sfh-fleet__selector">
            {fleetData.map((aircraft, i) => (
              <button
                key={i}
                className={`sfh-fleet__tab ${activeFleet === i ? 'sfh-fleet__tab--active' : ''}`}
                onClick={() => setActiveFleet(i)}
              >
                <span className="sfh-fleet__tab-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="sfh-fleet__tab-model">{aircraft.model}</span>
              </button>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="sfh-fleet__card">
              <div className="sfh-fleet__image">
                <img src={fleetData[activeFleet].image} alt={fleetData[activeFleet].model} />
                <div className="sfh-fleet__image-overlay">
                  <span className="sfh-fleet__model">{fleetData[activeFleet].model}</span>
                </div>
              </div>
              <div className="sfh-fleet__info">
                <div className="sfh-fleet__specs">
                  <div className="sfh-fleet__spec">
                    <span className="sfh-fleet__spec-value">{fleetData[activeFleet].seats}</span>
                    <span className="sfh-fleet__spec-label">Seats</span>
                  </div>
                  <div className="sfh-fleet__spec-divider" />
                  <div className="sfh-fleet__spec">
                    <span className="sfh-fleet__spec-value">{fleetData[activeFleet].speed}</span>
                    <span className="sfh-fleet__spec-label">Cruise Speed</span>
                  </div>
                  <div className="sfh-fleet__spec-divider" />
                  <div className="sfh-fleet__spec">
                    <span className="sfh-fleet__spec-value">{fleetData[activeFleet].range}</span>
                    <span className="sfh-fleet__spec-label">Range</span>
                  </div>
                </div>
                <p className="sfh-fleet__desc">{fleetData[activeFleet].description}</p>
                <div className="sfh-fleet__features">
                  {fleetData[activeFleet].features.map((feature, i) => (
                    <span key={i} className="sfh-fleet__feature">{feature}</span>
                  ))}
                </div>
                <div className="sfh-fleet__price">
                  <span className="sfh-fleet__price-label">From</span>
                  <span className="sfh-fleet__price-value">{fleetData[activeFleet].hourlyRate}</span>
                  <span className="sfh-fleet__price-unit">/hour</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== RATES SECTION ========== */}
      <section className="sfh-rates">
        <div className="sfh-rates__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Transparent Pricing</span>
              <h2>
                <span className="sfh-text--dark">Hire</span>{' '}
                <span className="sfh-text--mid">Rates</span>
              </h2>
              <p className="sfh-section-desc">
                All rates include fuel, insurance, and VAT. Block booking discounts available.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sfh-rates__grid">
              {fleetData.map((aircraft, i) => (
                <div key={i} className="sfh-rates__card">
                  <div className="sfh-rates__card-header">
                    <span className="sfh-rates__card-model">{aircraft.model}</span>
                    <span className="sfh-rates__card-seats">{aircraft.seats} Seats</span>
                  </div>
                  <div className="sfh-rates__card-price">
                    <span className="sfh-rates__card-amount">{aircraft.hourlyRate}</span>
                    <span className="sfh-rates__card-unit">/hour</span>
                  </div>
                  <ul className="sfh-rates__card-features">
                    <li>Fuel included</li>
                    <li>Insurance included</li>
                    <li>Landing fees extra</li>
                  </ul>
                  <a href="/contact?subject=hire" className="sfh-btn sfh-btn--outline">
                    Book Now
                  </a>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="sfh-rates__note">
              <span className="sfh-rates__note-icon">i</span>
              <p>
                All prices include VAT. Landing fees at destination airfields are charged separately.
                Block booking discounts: 10+ hours receive 5% discount, 25+ hours receive 10% discount.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== REQUIREMENTS SECTION ========== */}
      <section className="sfh-requirements">
        <div className="sfh-requirements__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Getting Started</span>
              <h2>
                <span className="sfh-text--dark">Hire</span>{' '}
                <span className="sfh-text--mid">Requirements</span>
              </h2>
            </div>
          </Reveal>

          <div className="sfh-requirements__grid">
            {requirements.map((req, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="sfh-requirements__card">
                  <span className="sfh-requirements__num">{req.icon}</span>
                  <div className="sfh-requirements__text">
                    <h4>{req.title}</h4>
                    <p>{req.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div className="sfh-requirements__cta">
              <p>New to HQ Aviation? Complete a checkout flight with one of our instructors to get started.</p>
              <a href="/contact?subject=checkout" className="sfh-btn sfh-btn--primary">
                Arrange Checkout Flight
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== BOOKING PROCESS ========== */}
      <section className="sfh-process">
        <div className="sfh-process__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Simple & Easy</span>
              <h2>
                <span className="sfh-text--dark">How</span>{' '}
                <span className="sfh-text--mid">To</span>{' '}
                <span className="sfh-text--light">Book</span>
              </h2>
            </div>
          </Reveal>

          <div className="sfh-process__steps">
            <Reveal delay={0.1}>
              <div className="sfh-process__step">
                <div className="sfh-process__step-num">01</div>
                <div className="sfh-process__step-content">
                  <h4>Check Availability</h4>
                  <p>Call or email us with your preferred dates, aircraft type, and estimated flying hours.</p>
                </div>
              </div>
            </Reveal>
            <div className="sfh-process__connector" />
            <Reveal delay={0.2}>
              <div className="sfh-process__step">
                <div className="sfh-process__step-num">02</div>
                <div className="sfh-process__step-content">
                  <h4>Confirm Booking</h4>
                  <p>We'll confirm availability and send you a booking confirmation with all details.</p>
                </div>
              </div>
            </Reveal>
            <div className="sfh-process__connector" />
            <Reveal delay={0.3}>
              <div className="sfh-process__step">
                <div className="sfh-process__step-num">03</div>
                <div className="sfh-process__step-content">
                  <h4>Pre-Flight Brief</h4>
                  <p>Arrive at Denham, complete paperwork, and receive your aircraft briefing.</p>
                </div>
              </div>
            </Reveal>
            <div className="sfh-process__connector" />
            <Reveal delay={0.4}>
              <div className="sfh-process__step">
                <div className="sfh-process__step-num">04</div>
                <div className="sfh-process__step-content">
                  <h4>Fly</h4>
                  <p>Take to the skies and enjoy the freedom of helicopter flight.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== DESTINATIONS SECTION ========== */}
      <section className="sfh-destinations">
        <div className="sfh-destinations__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Where Will You Go?</span>
              <h2>
                <span className="sfh-text--dark">Popular</span>{' '}
                <span className="sfh-text--mid">Destinations</span>
              </h2>
              <p className="sfh-section-desc">
                From coastal escapes to countryside retreats, the helicopter opens doors to destinations unreachable by road.
              </p>
            </div>
          </Reveal>

          <div className="sfh-destinations__grid">
            {[
              { name: 'St Andrews', type: 'Golf', time: '2h 45m', image: '/assets/images/gallery/carousel/rotating2.jpg' },
              { name: 'Le Touquet', type: 'France', time: '45m', image: '/assets/images/gallery/carousel/rotating3.jpg' },
              { name: 'Goodwood', type: 'Racing', time: '25m', image: '/assets/images/gallery/carousel/rotating4.jpg' },
              { name: 'Cotswolds', type: 'Leisure', time: '35m', image: '/assets/images/gallery/carousel/rotating5.jpg' },
              { name: 'Lake District', type: 'Scenic', time: '1h 50m', image: '/assets/images/gallery/carousel/rotating6.jpg' },
              { name: 'Channel Islands', type: 'Islands', time: '1h 15m', image: '/assets/images/gallery/carousel/rotating7.jpg' },
            ].map((dest, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="sfh-destinations__card">
                  <div className="sfh-destinations__image">
                    <img src={dest.image} alt={dest.name} />
                    <div className="sfh-destinations__overlay">
                      <span className="sfh-destinations__time">{dest.time}</span>
                    </div>
                  </div>
                  <div className="sfh-destinations__info">
                    <span className="sfh-destinations__type">{dest.type}</span>
                    <h4>{dest.name}</h4>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SAFETY SECTION ========== */}
      <section className="sfh-safety">
        <div className="sfh-safety__container">
          <div className="sfh-safety__content">
            <Reveal>
              <div className="sfh-safety__header">
                <span className="sfh-pre-text">Your Safety First</span>
                <h2>
                  <span className="sfh-text--dark">Maintained</span>{' '}
                  <span className="sfh-text--mid">To</span>{' '}
                  <span className="sfh-text--light">Perfection</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="sfh-safety__desc">
                Every aircraft in our fleet undergoes rigorous maintenance by our CAA Part-145 approved workshop.
                Our dedicated team of engineers ensures each helicopter exceeds safety standards before every flight.
              </p>
            </Reveal>

            <div className="sfh-safety__features">
              {[
                { title: 'Daily Inspections', desc: 'Pre-flight checks by qualified engineers' },
                { title: '100-Hour Services', desc: 'Comprehensive maintenance schedules' },
                { title: 'Component Tracking', desc: 'Full lifecycle monitoring of all parts' },
                { title: 'CAA Approved', desc: 'Part-145 maintenance organization' },
              ].map((feature, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <div className="sfh-safety__feature">
                    <div className="sfh-safety__feature-num">{String(i + 1).padStart(2, '0')}</div>
                    <div>
                      <h4>{feature.title}</h4>
                      <p>{feature.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal direction="right">
            <div className="sfh-safety__image">
              <img src="/assets/images/gallery/carousel/rotating9.jpg" alt="Maintenance" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== OPERATING HOURS SECTION ========== */}
      <section className="sfh-hours">
        <div className="sfh-hours__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Open 7 Days</span>
              <h2>
                <span className="sfh-text--dark">Operating</span>{' '}
                <span className="sfh-text--mid">Hours</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sfh-hours__grid">
              <div className="sfh-hours__card">
                <div className="sfh-hours__icon">
                  <span>MON-FRI</span>
                </div>
                <div className="sfh-hours__times">
                  <span className="sfh-hours__time">07:00 - 21:00</span>
                  <span className="sfh-hours__note">Summer hours (Apr-Sep)</span>
                </div>
                <div className="sfh-hours__times">
                  <span className="sfh-hours__time">08:00 - 18:00</span>
                  <span className="sfh-hours__note">Winter hours (Oct-Mar)</span>
                </div>
              </div>
              <div className="sfh-hours__card">
                <div className="sfh-hours__icon">
                  <span>SAT-SUN</span>
                </div>
                <div className="sfh-hours__times">
                  <span className="sfh-hours__time">08:00 - 20:00</span>
                  <span className="sfh-hours__note">Summer hours (Apr-Sep)</span>
                </div>
                <div className="sfh-hours__times">
                  <span className="sfh-hours__time">09:00 - 17:00</span>
                  <span className="sfh-hours__note">Winter hours (Oct-Mar)</span>
                </div>
              </div>
              <div className="sfh-hours__card sfh-hours__card--special">
                <div className="sfh-hours__icon">
                  <span>SPECIAL</span>
                </div>
                <div className="sfh-hours__times">
                  <span className="sfh-hours__time">By Arrangement</span>
                  <span className="sfh-hours__note">Early/late departures available</span>
                </div>
                <p className="sfh-hours__special-note">Contact us for out-of-hours requests</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== WEATHER SECTION ========== */}
      <section className="sfh-weather">
        <div className="sfh-weather__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Flight Planning</span>
              <h2>
                <span className="sfh-text--dark">Weather</span>{' '}
                <span className="sfh-text--mid">Minimums</span>
              </h2>
              <p className="sfh-section-desc">
                VFR flying requires appropriate weather conditions. We'll help you plan around the forecast.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sfh-weather__table">
              <div className="sfh-weather__row sfh-weather__row--header">
                <span>Parameter</span>
                <span>Day VFR</span>
                <span>Night VFR</span>
              </div>
              <div className="sfh-weather__row">
                <span>Visibility</span>
                <span>≥ 3km</span>
                <span>≥ 5km</span>
              </div>
              <div className="sfh-weather__row">
                <span>Cloud Base</span>
                <span>≥ 1,500ft</span>
                <span>≥ 2,000ft</span>
              </div>
              <div className="sfh-weather__row">
                <span>Wind</span>
                <span>≤ 25kts</span>
                <span>≤ 20kts</span>
              </div>
              <div className="sfh-weather__row">
                <span>Crosswind</span>
                <span>≤ 15kts</span>
                <span>≤ 12kts</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="sfh-weather__resources">
              <a href="https://www.metoffice.gov.uk/aviation" target="_blank" rel="noopener noreferrer" className="sfh-weather__link">
                <span className="sfh-weather__link-icon">☁</span>
                <span>Met Office Aviation</span>
              </a>
              <a href="https://www.notaminfo.com" target="_blank" rel="noopener noreferrer" className="sfh-weather__link">
                <span className="sfh-weather__link-icon">📋</span>
                <span>NOTAMs</span>
              </a>
              <a href="https://www.skydemon.aero" target="_blank" rel="noopener noreferrer" className="sfh-weather__link">
                <span className="sfh-weather__link-icon">🗺</span>
                <span>SkyDemon</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== FUEL POLICY SECTION ========== */}
      <section className="sfh-fuel">
        <div className="sfh-fuel__inner">
          <Reveal>
            <div className="sfh-fuel__content">
              <span className="sfh-pre-text">Simple & Transparent</span>
              <h2>
                <span className="sfh-text--dark">Fuel</span>{' '}
                <span className="sfh-text--mid">Policy</span>
              </h2>
              <p>
                All our hire rates include fuel at no additional cost. Aircraft are dispatched with full tanks and
                should be returned with full tanks—we'll simply reimburse you for any fuel purchased away from base.
              </p>
              <div className="sfh-fuel__points">
                <div className="sfh-fuel__point">
                  <span className="sfh-fuel__point-icon">✓</span>
                  <span>Fuel included in hourly rate</span>
                </div>
                <div className="sfh-fuel__point">
                  <span className="sfh-fuel__point-icon">✓</span>
                  <span>Return with full tanks</span>
                </div>
                <div className="sfh-fuel__point">
                  <span className="sfh-fuel__point-icon">✓</span>
                  <span>Away-fuel reimbursed</span>
                </div>
                <div className="sfh-fuel__point">
                  <span className="sfh-fuel__point-icon">✓</span>
                  <span>Avgas & Jet-A1 supported</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== INSURANCE SECTION ========== */}
      <section className="sfh-insurance">
        <div className="sfh-insurance__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Fly With Confidence</span>
              <h2>
                <span className="sfh-text--dark">Insurance</span>{' '}
                <span className="sfh-text--mid">Coverage</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sfh-insurance__grid">
              <div className="sfh-insurance__card">
                <h4>Hull Insurance</h4>
                <p className="sfh-insurance__value">Full Value</p>
                <p className="sfh-insurance__desc">Complete coverage for aircraft damage</p>
              </div>
              <div className="sfh-insurance__card">
                <h4>Third Party Liability</h4>
                <p className="sfh-insurance__value">£5M</p>
                <p className="sfh-insurance__desc">Per occurrence coverage</p>
              </div>
              <div className="sfh-insurance__card">
                <h4>Passenger Liability</h4>
                <p className="sfh-insurance__value">£1M</p>
                <p className="sfh-insurance__desc">Per passenger coverage</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="sfh-insurance__excess">
              <h4>Excess Amounts</h4>
              <div className="sfh-insurance__excess-grid">
                <div className="sfh-insurance__excess-item">
                  <span className="sfh-insurance__excess-model">R22</span>
                  <span className="sfh-insurance__excess-amount">£5,000</span>
                </div>
                <div className="sfh-insurance__excess-item">
                  <span className="sfh-insurance__excess-model">R44</span>
                  <span className="sfh-insurance__excess-amount">£7,500</span>
                </div>
                <div className="sfh-insurance__excess-item">
                  <span className="sfh-insurance__excess-model">R66</span>
                  <span className="sfh-insurance__excess-amount">£10,000</span>
                </div>
              </div>
              <p className="sfh-insurance__excess-note">Optional excess waiver available for £50/day</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== CURRENCY SECTION ========== */}
      <section className="sfh-currency">
        <div className="sfh-currency__container">
          <div className="sfh-currency__content">
            <Reveal>
              <span className="sfh-pre-text">Stay Current</span>
              <h2>
                <span className="sfh-text--dark">Recency</span>{' '}
                <span className="sfh-text--mid">Requirements</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="sfh-currency__desc">
                To hire our aircraft, you must maintain adequate recency on the specific type.
                If you haven't flown recently, we can arrange a checkout flight.
              </p>
            </Reveal>

            <div className="sfh-currency__requirements">
              <Reveal delay={0.2}>
                <div className="sfh-currency__req">
                  <div className="sfh-currency__req-header">
                    <span className="sfh-currency__req-hours">3</span>
                    <span className="sfh-currency__req-label">Hours in last 90 days</span>
                  </div>
                  <p>Required on the specific helicopter type you wish to hire</p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="sfh-currency__req">
                  <div className="sfh-currency__req-header">
                    <span className="sfh-currency__req-hours">1</span>
                    <span className="sfh-currency__req-label">Hour with HQ in last 12 months</span>
                  </div>
                  <p>Checkout or recency flight with our instructors</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4}>
              <div className="sfh-currency__checkout">
                <h4>Need a Checkout?</h4>
                <p>Our instructors can conduct currency checks in as little as one hour. Perfect for getting back in the air.</p>
                <a href="/contact?subject=checkout" className="sfh-btn sfh-btn--outline">Book Checkout</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== INTERNATIONAL SECTION ========== */}
      <section className="sfh-international">
        <div className="sfh-international__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Cross Borders</span>
              <h2>
                <span className="sfh-text--dark">International</span>{' '}
                <span className="sfh-text--mid">Travel</span>
              </h2>
              <p className="sfh-section-desc">
                Flying abroad with our aircraft is straightforward. We'll help with the paperwork.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sfh-international__steps">
              <div className="sfh-international__step">
                <div className="sfh-international__step-num">01</div>
                <div className="sfh-international__step-content">
                  <h4>Notify Us</h4>
                  <p>Let us know your intended route and dates at least 48 hours in advance.</p>
                </div>
              </div>
              <div className="sfh-international__step">
                <div className="sfh-international__step-num">02</div>
                <div className="sfh-international__step-content">
                  <h4>We Prepare</h4>
                  <p>We'll arrange GAR forms, customs documentation, and any required permissions.</p>
                </div>
              </div>
              <div className="sfh-international__step">
                <div className="sfh-international__step-num">03</div>
                <div className="sfh-international__step-content">
                  <h4>You Fly</h4>
                  <p>Depart from Denham with all paperwork ready. We'll brief you on procedures.</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="sfh-international__popular">
              <h4>Popular International Destinations</h4>
              <div className="sfh-international__destinations">
                <span>Le Touquet</span>
                <span>Deauville</span>
                <span>Amsterdam</span>
                <span>Brussels</span>
                <span>Jersey</span>
                <span>Guernsey</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section className="sfh-testimonials">
        <div className="sfh-testimonials__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">What Pilots Say</span>
              <h2>
                <span className="sfh-text--dark">Client</span>{' '}
                <span className="sfh-text--mid">Reviews</span>
              </h2>
            </div>
          </Reveal>

          <div className="sfh-testimonials__grid">
            {[
              {
                quote: "The fleet is impeccable. Every aircraft I've hired has been in pristine condition. HQ sets the standard for helicopter hire in the UK.",
                author: "James P.",
                role: "R44 Pilot",
                hours: "450+ hours"
              },
              {
                quote: "Booking is seamless and the team couldn't be more helpful. Last minute changes are handled without fuss. True professionals.",
                author: "Sarah M.",
                role: "R66 Pilot",
                hours: "280+ hours"
              },
              {
                quote: "As a low-hours pilot, I appreciate their thorough briefings and the confidence they give me before each flight. Outstanding service.",
                author: "David K.",
                role: "R22 Pilot",
                hours: "85+ hours"
              }
            ].map((testimonial, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="sfh-testimonials__card">
                  <div className="sfh-testimonials__quote">"</div>
                  <p>{testimonial.quote}</p>
                  <div className="sfh-testimonials__author">
                    <span className="sfh-testimonials__name">{testimonial.author}</span>
                    <span className="sfh-testimonials__role">{testimonial.role}</span>
                    <span className="sfh-testimonials__hours">{testimonial.hours}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== GALLERY SECTION ========== */}
      <section className="sfh-gallery">
        <div className="sfh-gallery__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">In Flight</span>
              <h2>
                <span className="sfh-text--dark">Gallery</span>
              </h2>
            </div>
          </Reveal>

          <div className="sfh-gallery__grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="sfh-gallery__item">
                  <img src={`/assets/images/gallery/carousel/rotating${num}.jpg`} alt={`Flight ${num}`} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COMPARISON SECTION ========== */}
      <section className="sfh-comparison">
        <div className="sfh-comparison__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Side by Side</span>
              <h2>
                <span className="sfh-text--dark">Fleet</span>{' '}
                <span className="sfh-text--mid">Comparison</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sfh-comparison__table">
              <div className="sfh-comparison__header">
                <div className="sfh-comparison__cell sfh-comparison__cell--label"></div>
                <div className="sfh-comparison__cell">R22</div>
                <div className="sfh-comparison__cell">R44</div>
                <div className="sfh-comparison__cell">R66</div>
              </div>
              <div className="sfh-comparison__row">
                <div className="sfh-comparison__cell sfh-comparison__cell--label">Seats</div>
                <div className="sfh-comparison__cell">2</div>
                <div className="sfh-comparison__cell">4</div>
                <div className="sfh-comparison__cell">5</div>
              </div>
              <div className="sfh-comparison__row">
                <div className="sfh-comparison__cell sfh-comparison__cell--label">Cruise Speed</div>
                <div className="sfh-comparison__cell">96 kts</div>
                <div className="sfh-comparison__cell">113 kts</div>
                <div className="sfh-comparison__cell">120 kts</div>
              </div>
              <div className="sfh-comparison__row">
                <div className="sfh-comparison__cell sfh-comparison__cell--label">Range</div>
                <div className="sfh-comparison__cell">185 nm</div>
                <div className="sfh-comparison__cell">300 nm</div>
                <div className="sfh-comparison__cell">350 nm</div>
              </div>
              <div className="sfh-comparison__row">
                <div className="sfh-comparison__cell sfh-comparison__cell--label">Engine</div>
                <div className="sfh-comparison__cell">Piston</div>
                <div className="sfh-comparison__cell">Piston</div>
                <div className="sfh-comparison__cell">Turbine</div>
              </div>
              <div className="sfh-comparison__row">
                <div className="sfh-comparison__cell sfh-comparison__cell--label">Hourly Rate</div>
                <div className="sfh-comparison__cell">£275</div>
                <div className="sfh-comparison__cell">£395</div>
                <div className="sfh-comparison__cell">£595</div>
              </div>
              <div className="sfh-comparison__row">
                <div className="sfh-comparison__cell sfh-comparison__cell--label">Best For</div>
                <div className="sfh-comparison__cell">Solo trips</div>
                <div className="sfh-comparison__cell">Day trips</div>
                <div className="sfh-comparison__cell">Long range</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== ADDONS SECTION ========== */}
      <section className="sfh-addons">
        <div className="sfh-addons__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Enhance Your Flight</span>
              <h2>
                <span className="sfh-text--dark">Additional</span>{' '}
                <span className="sfh-text--mid">Services</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sfh-addons__grid">
              {[
                { title: 'Safety Pilot', price: '£150/hr', desc: 'Experienced pilot accompanies your flight' },
                { title: 'Life Raft', price: '£50/day', desc: 'Required for over-water flights beyond glide distance' },
                { title: 'Excess Waiver', price: '£50/day', desc: 'Reduces your insurance excess to £500' },
                { title: 'Overnight Parking', price: 'At cost', desc: 'We arrange parking at your destination' },
                { title: 'Customs Handling', price: '£75', desc: 'International flight paperwork assistance' },
                { title: 'PPR Booking', price: 'Free', desc: 'We handle destination PPR requests' },
              ].map((addon, i) => (
                <div key={i} className="sfh-addons__card">
                  <div className="sfh-addons__header">
                    <h4>{addon.title}</h4>
                    <span className="sfh-addons__price">{addon.price}</span>
                  </div>
                  <p>{addon.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== GIFT VOUCHERS SECTION ========== */}
      <section className="sfh-vouchers">
        <div className="sfh-vouchers__inner">
          <div className="sfh-vouchers__image">
            <img src="/assets/images/gallery/carousel/rotating10.jpg" alt="Gift Voucher" />
          </div>
          <div className="sfh-vouchers__content">
            <Reveal>
              <span className="sfh-pre-text">The Perfect Gift</span>
              <h2>
                <span className="sfh-text--dark">Flight</span>{' '}
                <span className="sfh-text--mid">Vouchers</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Give the gift of flight with an HQ Aviation voucher. Perfect for birthdays, anniversaries, or any special occasion.
                Vouchers can be used for self-fly hire, training hours, or charter flights.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="sfh-vouchers__options">
                <div className="sfh-vouchers__option">
                  <span className="sfh-vouchers__amount">£500</span>
                  <span className="sfh-vouchers__desc">~2 hours R22</span>
                </div>
                <div className="sfh-vouchers__option">
                  <span className="sfh-vouchers__amount">£1,000</span>
                  <span className="sfh-vouchers__desc">~2.5 hours R44</span>
                </div>
                <div className="sfh-vouchers__option">
                  <span className="sfh-vouchers__amount">Custom</span>
                  <span className="sfh-vouchers__desc">Any amount</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <a href="/contact?subject=voucher" className="sfh-btn sfh-btn--primary">Purchase Voucher</a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== BLOCK BOOKING SECTION ========== */}
      <section className="sfh-block">
        <div className="sfh-block__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Fly More, Save More</span>
              <h2>
                <span className="sfh-text--dark">Block</span>{' '}
                <span className="sfh-text--mid">Booking</span>{' '}
                <span className="sfh-text--light">Discounts</span>
              </h2>
              <p className="sfh-section-desc">
                Commit to more hours and enjoy significant savings on your flying.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sfh-block__tiers">
              <div className="sfh-block__tier">
                <div className="sfh-block__tier-badge">Standard</div>
                <div className="sfh-block__tier-hours">1-9 hours</div>
                <div className="sfh-block__tier-discount">Standard Rate</div>
                <ul>
                  <li>Pay as you fly</li>
                  <li>No commitment</li>
                  <li>Full flexibility</li>
                </ul>
              </div>
              <div className="sfh-block__tier sfh-block__tier--popular">
                <div className="sfh-block__tier-badge">Popular</div>
                <div className="sfh-block__tier-hours">10-24 hours</div>
                <div className="sfh-block__tier-discount">5% Off</div>
                <ul>
                  <li>Pre-pay block</li>
                  <li>12 month validity</li>
                  <li>Priority booking</li>
                </ul>
              </div>
              <div className="sfh-block__tier">
                <div className="sfh-block__tier-badge">Premium</div>
                <div className="sfh-block__tier-hours">25+ hours</div>
                <div className="sfh-block__tier-discount">10% Off</div>
                <ul>
                  <li>Best value</li>
                  <li>18 month validity</li>
                  <li>Guaranteed availability</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== PILOT RESOURCES SECTION ========== */}
      <section className="sfh-resources">
        <div className="sfh-resources__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Plan Your Flight</span>
              <h2>
                <span className="sfh-text--dark">Pilot</span>{' '}
                <span className="sfh-text--mid">Resources</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sfh-resources__grid">
              <a href="https://www.metoffice.gov.uk/aviation" target="_blank" rel="noopener noreferrer" className="sfh-resources__card">
                <div className="sfh-resources__icon">☁️</div>
                <h4>Weather</h4>
                <p>Met Office aviation forecasts, TAFs and METARs</p>
              </a>
              <a href="https://www.notaminfo.com" target="_blank" rel="noopener noreferrer" className="sfh-resources__card">
                <div className="sfh-resources__icon">📋</div>
                <h4>NOTAMs</h4>
                <p>Current notices to airmen for your route</p>
              </a>
              <a href="https://www.skydemon.aero" target="_blank" rel="noopener noreferrer" className="sfh-resources__card">
                <div className="sfh-resources__icon">🗺️</div>
                <h4>Flight Planning</h4>
                <p>SkyDemon route planning and charts</p>
              </a>
              <a href="https://www.caa.co.uk" target="_blank" rel="noopener noreferrer" className="sfh-resources__card">
                <div className="sfh-resources__icon">✈️</div>
                <h4>CAA</h4>
                <p>Regulations, AICs and safety bulletins</p>
              </a>
              <a href="/assets/docs/denham-chart.pdf" className="sfh-resources__card">
                <div className="sfh-resources__icon">📍</div>
                <h4>Denham Chart</h4>
                <p>Local area chart and circuit patterns</p>
              </a>
              <a href="/assets/docs/poh-library.pdf" className="sfh-resources__card">
                <div className="sfh-resources__icon">📖</div>
                <h4>POH Library</h4>
                <p>Pilot operating handbooks for our fleet</p>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== PARTNERS SECTION ========== */}
      <section className="sfh-partners">
        <div className="sfh-partners__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Preferred Partners</span>
              <h2>
                <span className="sfh-text--dark">Destination</span>{' '}
                <span className="sfh-text--mid">Partners</span>
              </h2>
              <p className="sfh-section-desc">
                Exclusive benefits at these partner locations when you arrive by helicopter.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sfh-partners__grid">
              {[
                { name: 'The Grove', type: 'Hotel & Spa', benefit: '15% discount' },
                { name: 'Wentworth', type: 'Golf Club', benefit: 'Priority tee times' },
                { name: 'Gleneagles', type: 'Resort', benefit: '10% room rate' },
                { name: 'Le Manoir', type: 'Restaurant', benefit: 'Complimentary welcome' },
                { name: 'Ascot', type: 'Racecourse', benefit: 'VIP parking' },
                { name: 'Goodwood', type: 'Motor Circuit', benefit: 'Paddock access' },
              ].map((partner, i) => (
                <div key={i} className="sfh-partners__card">
                  <h4>{partner.name}</h4>
                  <span className="sfh-partners__type">{partner.type}</span>
                  <span className="sfh-partners__benefit">{partner.benefit}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== EXPERIENCE STATS SECTION ========== */}
      <section className="sfh-experience">
        <div className="sfh-experience__inner">
          <Reveal>
            <div className="sfh-experience__header">
              <span className="sfh-pre-text">Our Track Record</span>
              <h2>
                <span className="sfh-text--dark">35 Years</span>{' '}
                <span className="sfh-text--mid">of Excellence</span>
              </h2>
            </div>
          </Reveal>

          <div className="sfh-experience__stats">
            {[
              { value: '35+', label: 'Years Operating' },
              { value: '150K+', label: 'Flight Hours' },
              { value: '500+', label: 'Active Pilots' },
              { value: '50K+', label: 'Flights Completed' },
              { value: '98%', label: 'Availability Rate' },
              { value: '30+', label: 'Aircraft Fleet' },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="sfh-experience__stat">
                  <span className="sfh-experience__value"><AnimatedNumber value={stat.value} /></span>
                  <span className="sfh-experience__label">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== OPS TEAM SECTION ========== */}
      <section className="sfh-team">
        <div className="sfh-team__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Here to Help</span>
              <h2>
                <span className="sfh-text--dark">Operations</span>{' '}
                <span className="sfh-text--mid">Team</span>
              </h2>
              <p className="sfh-section-desc">
                Our friendly operations team is here to assist with bookings, planning, and any questions.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sfh-team__grid">
              {[
                { name: 'Sarah Wilson', role: 'Operations Manager', desc: 'Oversees all hire operations' },
                { name: 'Tom Bradley', role: 'Dispatch Coordinator', desc: 'Handles daily scheduling' },
                { name: 'Emma Clarke', role: 'Customer Relations', desc: 'Your first point of contact' },
              ].map((member, i) => (
                <div key={i} className="sfh-team__card">
                  <div className="sfh-team__avatar">{member.name.split(' ').map(n => n[0]).join('')}</div>
                  <h4>{member.name}</h4>
                  <span className="sfh-team__role">{member.role}</span>
                  <p>{member.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== CONTACT FORM SECTION ========== */}
      <section className="sfh-contact">
        <div className="sfh-contact__container">
          <div className="sfh-contact__content">
            <Reveal>
              <span className="sfh-pre-text">Get in Touch</span>
              <h2>
                <span className="sfh-text--dark">Make an</span>{' '}
                <span className="sfh-text--mid">Enquiry</span>
              </h2>
              <p>
                Fill in the form and our team will get back to you within 24 hours.
                For urgent enquiries, please call us directly.
              </p>
            </Reveal>

            <div className="sfh-contact__details">
              <div className="sfh-contact__detail">
                <span className="sfh-contact__detail-label">Phone</span>
                <a href="tel:+441895833373">+44 1895 833 373</a>
              </div>
              <div className="sfh-contact__detail">
                <span className="sfh-contact__detail-label">Email</span>
                <a href="mailto:hire@hqaviation.com">hire@hqaviation.com</a>
              </div>
              <div className="sfh-contact__detail">
                <span className="sfh-contact__detail-label">Location</span>
                <span>Denham Aerodrome, UB9 5DF</span>
              </div>
            </div>
          </div>

          <Reveal delay={0.1}>
            <form className="sfh-contact__form">
              <div className="sfh-contact__row">
                <div className="sfh-contact__field">
                  <label>Name</label>
                  <input type="text" placeholder="Your name" />
                </div>
                <div className="sfh-contact__field">
                  <label>Email</label>
                  <input type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="sfh-contact__row">
                <div className="sfh-contact__field">
                  <label>Phone</label>
                  <input type="tel" placeholder="+44 000 000 0000" />
                </div>
                <div className="sfh-contact__field">
                  <label>Aircraft</label>
                  <select>
                    <option>Select aircraft</option>
                    <option>R22</option>
                    <option>R44</option>
                    <option>R66</option>
                  </select>
                </div>
              </div>
              <div className="sfh-contact__field">
                <label>Preferred Date</label>
                <input type="date" />
              </div>
              <div className="sfh-contact__field">
                <label>Message</label>
                <textarea rows="4" placeholder="Tell us about your flight plans..."></textarea>
              </div>
              <button type="submit" className="sfh-btn sfh-btn--primary sfh-btn--large">
                Submit Enquiry
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ========== LOCATION SECTION ========== */}
      <section className="sfh-location">
        <div className="sfh-location__inner">
          <div className="sfh-location__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2479.5!2d-0.5!3d51.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDM0JzQ4LjAiTiAwwrAzMCcwMC4wIlc!5e0!3m2!1sen!2suk!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="sfh-location__content">
            <Reveal>
              <span className="sfh-pre-text">Find Us</span>
              <h2>
                <span className="sfh-text--dark">Denham</span>{' '}
                <span className="sfh-text--mid">Aerodrome</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Located just 18 miles from central London, Denham Aerodrome offers easy access from the M40 and M25.
                Free parking available for all hire customers.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="sfh-location__info">
                <div className="sfh-location__info-item">
                  <span className="sfh-location__info-label">Address</span>
                  <span>Denham Aerodrome<br />Tilehouse Lane<br />Denham, UB9 5DF</span>
                </div>
                <div className="sfh-location__info-item">
                  <span className="sfh-location__info-label">ICAO Code</span>
                  <span>EGLD</span>
                </div>
                <div className="sfh-location__info-item">
                  <span className="sfh-location__info-label">From London</span>
                  <span>18 miles / 35 mins</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href="https://www.google.com/maps/dir//Denham+Aerodrome"
                target="_blank"
                rel="noopener noreferrer"
                className="sfh-btn sfh-btn--outline"
              >
                Get Directions
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA SECTION ========== */}
      <section className="sfh-final-cta">
        <div className="sfh-final-cta__container">
          <Reveal>
            <span className="sfh-pre-text">Start Your Journey</span>
            <h2>
              <span className="sfh-text--dark">Ready</span>{' '}
              <span className="sfh-text--mid">to</span>{' '}
              <span className="sfh-text--light">Fly?</span>
            </h2>
            <p>
              Contact our team today to discuss your flying requirements and get started with HQ Aviation.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="sfh-final-cta__buttons">
              <a href="tel:+441895833373" className="sfh-btn sfh-btn--primary sfh-btn--large">
                Call Now
              </a>
              <a href="/contact?subject=hire" className="sfh-btn sfh-btn--outline sfh-btn--large">
                Send Enquiry
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section className="sfh-faq">
        <div className="sfh-faq__container">
          <Reveal>
            <div className="sfh-section-header">
              <span className="sfh-pre-text">Common Questions</span>
              <h2>
                <span className="sfh-text--dark">FAQ</span>
              </h2>
            </div>
          </Reveal>

          <div className="sfh-faq__list">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div
                  className={`sfh-faq__item ${openFaq === i ? 'sfh-faq__item--open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="sfh-faq__number">{String(i + 1).padStart(2, '0')}</div>
                  <div className="sfh-faq__content">
                    <h4>
                      {faq.q}
                      <span className="sfh-faq__toggle">{openFaq === i ? '−' : '+'}</span>
                    </h4>
                    <motion.div
                      className="sfh-faq__answer"
                      initial={false}
                      animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="sfh-cta">
        <div className="sfh-cta__inner">
          <div className="sfh-cta__image">
            <motion.img
              src="/assets/images/gallery/carousel/rotating8.jpg"
              alt="Helicopter in flight"
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            />
            <div className="sfh-cta__image-overlay" />
          </div>

          <div className="sfh-cta__content">
            <div className="sfh-cta__header">
              <span className="sfh-pre-text">Ready to Fly?</span>
              <h2>
                <span className="sfh-text--dark">Book</span>{' '}
                <span className="sfh-text--mid">Your</span>{' '}
                <span className="sfh-text--light">Aircraft</span>
              </h2>
            </div>

            <p className="sfh-cta__desc">
              Contact our team to check availability and make your booking. We're here to help make your flight plans a reality.
            </p>

            <div className="sfh-cta__contact">
              <a href="tel:+441895833373" className="sfh-cta__contact-item">
                <span className="sfh-cta__contact-label">Call Us</span>
                <span className="sfh-cta__contact-value">+44 1895 833 373</span>
              </a>
              <div className="sfh-cta__contact-divider" />
              <a href="mailto:hire@hqaviation.com" className="sfh-cta__contact-item">
                <span className="sfh-cta__contact-label">Email</span>
                <span className="sfh-cta__contact-value">hire@hqaviation.com</span>
              </a>
            </div>

            <div className="sfh-cta__buttons">
              <a href="/contact?subject=hire" className="sfh-btn sfh-btn--primary sfh-btn--large">
                Make a Booking
              </a>
              <Link to="/training/ppl" className="sfh-btn sfh-btn--outline">
                Get Your License
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <FooterMinimal />

      {/* ========== STYLES ========== */}
      <style>{`
        /* ===== BASE ===== */
        .sfh {
          font-family: 'Space Grotesk', -apple-system, sans-serif;
          background: #faf9f6;
          color: #1a1a1a;
          overflow-x: hidden;
        }

        .sfh-pre-text {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #999;
          margin-bottom: 1rem;
        }

        .sfh-text--dark { color: #1a1a1a; }
        .sfh-text--mid { color: #4a4a4a; }
        .sfh-text--light { color: #7a7a7a; }

        .sfh-section-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .sfh-section-header h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0.5rem 0;
          line-height: 1.1;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sfh-section-desc {
          color: #666;
          font-size: 1rem;
          margin-top: 1rem;
        }

        /* Buttons */
        .sfh-btn {
          display: inline-block;
          padding: 1rem 2rem;
          font-size: 0.75rem;
          font-weight: 400;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          text-align: center;
        }

        .sfh-btn--primary {
          background: #1a1a1a;
          color: #fff;
        }

        .sfh-btn--primary:hover {
          background: #333;
        }

        .sfh-btn--outline {
          background: transparent;
          color: #1a1a1a;
          border: 2px solid #1a1a1a;
        }

        .sfh-btn--outline:hover {
          background: #1a1a1a;
          color: #fff;
        }

        .sfh-btn--large {
          padding: 1.1rem 2.5rem;
          font-size: 0.8rem;
        }

        /* ===== HERO ===== */
        .sfh-hero {
          min-height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #faf9f6;
        }

        .sfh-hero__bg {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .sfh-hero__bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sfh-hero__overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(90deg, rgba(250,249,246,0.97) 0%, rgba(250,249,246,0.92) 45%, rgba(250,249,246,0.4) 100%);
        }

        .sfh-hero__content {
          position: relative;
          z-index: 3;
          flex: 1;
          display: flex;
          align-items: center;
          padding: 2rem 4rem 2rem;
        }

        .sfh-hero__left {
          max-width: 550px;
        }

        .sfh-hero__label {
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #999;
          display: block;
          margin-bottom: 1.5rem;
        }

        .sfh-hero__headline {
          display: flex;
          flex-direction: column;
          line-height: 1;
          margin-bottom: 1.5rem;
        }

        .sfh-hero__word {
          font-weight: 700;
          font-size: clamp(3rem, 8vw, 5.5rem);
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .sfh-hero__word--1 { color: #1a1a1a; }
        .sfh-hero__word--2 { color: #4a4a4a; }

        .sfh-hero__divider-line {
          width: 80px;
          height: 2px;
          background: #1a1a1a;
          margin-bottom: 1.5rem;
          transform-origin: left;
        }

        .sfh-hero__sub {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.8;
          max-width: 420px;
          margin-bottom: 2rem;
        }

        .sfh-hero__stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .sfh-hero__stat {
          text-align: center;
        }

        .sfh-hero__stat-value {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .sfh-hero__stat-label {
          font-size: 0.65rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .sfh-hero__stat-divider {
          width: 1px;
          height: 30px;
          background: linear-gradient(to bottom, transparent, #e8e6e2, transparent);
        }

        /* ===== INTRO ===== */
        .sfh-intro {
          padding: 5rem 2rem;
          background: #fff;
          position: relative;
        }

        .sfh-intro::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-intro__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sfh-intro__header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3rem;
        }

        .sfh-intro__header h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1.5rem;
          text-transform: uppercase;
        }

        .sfh-intro__header p {
          color: #666;
          font-size: 1rem;
          line-height: 1.8;
        }

        .sfh-intro__benefits {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .sfh-intro__benefit {
          text-align: center;
          padding: 1.5rem;
          background: #faf9f6;
          border-left: 3px solid #1a1a1a;
          border-radius: 0 8px 8px 0;
        }

        .sfh-intro__benefit-stat {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .sfh-intro__benefit-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .sfh-intro__benefit-desc {
          font-size: 0.8rem;
          color: #888;
        }

        /* ===== FLEET ===== */
        .sfh-fleet {
          padding: 5rem 2rem;
          background: #faf9f6;
          position: relative;
        }

        .sfh-fleet::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-fleet__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sfh-fleet__selector {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .sfh-fleet__tab {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          background: #fff;
          border: 1px solid #e8e6e2;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 8px;
        }

        .sfh-fleet__tab:hover {
          border-color: #1a1a1a;
        }

        .sfh-fleet__tab--active {
          background: #1a1a1a;
          border-color: #1a1a1a;
        }

        .sfh-fleet__tab--active .sfh-fleet__tab-num,
        .sfh-fleet__tab--active .sfh-fleet__tab-model {
          color: #fff;
        }

        .sfh-fleet__tab-num {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          color: #999;
        }

        .sfh-fleet__tab-model {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #1a1a1a;
        }

        .sfh-fleet__card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e8e6e2;
        }

        .sfh-fleet__image {
          position: relative;
          min-height: 350px;
        }

        .sfh-fleet__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sfh-fleet__image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
        }

        .sfh-fleet__model {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
        }

        .sfh-fleet__info {
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }

        .sfh-fleet__specs {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e8e6e2;
        }

        .sfh-fleet__spec {
          text-align: center;
        }

        .sfh-fleet__spec-value {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .sfh-fleet__spec-label {
          font-size: 0.65rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .sfh-fleet__spec-divider {
          width: 1px;
          height: 30px;
          background: #e8e6e2;
        }

        .sfh-fleet__desc {
          color: #666;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .sfh-fleet__features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .sfh-fleet__feature {
          padding: 0.4rem 0.8rem;
          background: #faf9f6;
          font-size: 0.7rem;
          color: #666;
          border-radius: 4px;
        }

        .sfh-fleet__price {
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid #e8e6e2;
        }

        .sfh-fleet__price-label {
          font-size: 0.7rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .sfh-fleet__price-value {
          font-family: 'Share Tech Mono', monospace;
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0.25rem;
        }

        .sfh-fleet__price-unit {
          font-size: 0.9rem;
          color: #666;
        }

        /* ===== RATES ===== */
        .sfh-rates {
          padding: 5rem 2rem;
          background: #fff;
          position: relative;
        }

        .sfh-rates::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-rates__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sfh-rates__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .sfh-rates__card {
          background: #faf9f6;
          padding: 2rem;
          text-align: center;
          border-left: 3px solid #1a1a1a;
          border-radius: 0 8px 8px 0;
        }

        .sfh-rates__card-header {
          margin-bottom: 1.5rem;
        }

        .sfh-rates__card-model {
          display: block;
          font-size: 1.25rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #1a1a1a;
          margin-bottom: 0.25rem;
        }

        .sfh-rates__card-seats {
          font-size: 0.75rem;
          color: #888;
        }

        .sfh-rates__card-price {
          margin-bottom: 1.5rem;
        }

        .sfh-rates__card-amount {
          font-family: 'Share Tech Mono', monospace;
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .sfh-rates__card-unit {
          font-size: 0.9rem;
          color: #666;
        }

        .sfh-rates__card-features {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
        }

        .sfh-rates__card-features li {
          font-size: 0.85rem;
          color: #666;
          padding: 0.5rem 0;
          border-bottom: 1px solid #e8e6e2;
        }

        .sfh-rates__card-features li:last-child {
          border-bottom: none;
        }

        .sfh-rates__note {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: #faf9f6;
          border-radius: 8px;
        }

        .sfh-rates__note-icon {
          width: 24px;
          height: 24px;
          background: #1a1a1a;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .sfh-rates__note p {
          margin: 0;
          font-size: 0.85rem;
          color: #666;
          line-height: 1.6;
        }

        /* ===== REQUIREMENTS ===== */
        .sfh-requirements {
          padding: 5rem 2rem;
          background: #faf9f6;
          position: relative;
        }

        .sfh-requirements::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-requirements__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sfh-requirements__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .sfh-requirements__card {
          display: flex;
          gap: 1.25rem;
          background: #fff;
          padding: 1.5rem;
          border-left: 3px solid #1a1a1a;
          border-radius: 0 8px 8px 0;
        }

        .sfh-requirements__num {
          width: 44px;
          height: 44px;
          background: #1a1a1a;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem;
          flex-shrink: 0;
        }

        .sfh-requirements__text h4 {
          margin: 0 0 0.5rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .sfh-requirements__text p {
          margin: 0;
          font-size: 0.85rem;
          color: #666;
          line-height: 1.5;
        }

        .sfh-requirements__cta {
          text-align: center;
          padding: 2rem;
          background: #fff;
          border-radius: 8px;
          border: 1px solid #e8e6e2;
        }

        .sfh-requirements__cta p {
          margin: 0 0 1.5rem;
          color: #666;
        }

        /* ===== PROCESS ===== */
        .sfh-process {
          padding: 5rem 2rem;
          background: #fff;
          position: relative;
        }

        .sfh-process::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-process__container {
          max-width: 800px;
          margin: 0 auto;
        }

        .sfh-process__steps {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .sfh-process__step {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem;
          background: #faf9f6;
          border-left: 3px solid #1a1a1a;
          border-radius: 0 8px 8px 0;
        }

        .sfh-process__step-num {
          width: 50px;
          height: 50px;
          background: #1a1a1a;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Share Tech Mono', monospace;
          font-size: 1rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .sfh-process__step-content h4 {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .sfh-process__step-content p {
          margin: 0;
          font-size: 0.9rem;
          color: #666;
          line-height: 1.6;
        }

        .sfh-process__connector {
          width: 3px;
          height: 20px;
          background: #e8e6e2;
          margin-left: 24px;
        }

        /* ===== FAQ ===== */
        .sfh-faq {
          padding: 5rem 2rem;
          background: #faf9f6;
          position: relative;
        }

        .sfh-faq::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-faq__container {
          max-width: 800px;
          margin: 0 auto;
        }

        .sfh-faq__list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .sfh-faq__item {
          display: flex;
          gap: 1.5rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid #e8e6e2;
          cursor: pointer;
          transition: background 0.2s ease;
          border-radius: 0;
        }

        .sfh-faq__item:hover {
          background: rgba(0,0,0,0.01);
        }

        .sfh-faq__item--open {
          background: rgba(0,0,0,0.02);
        }

        .sfh-faq__number {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          color: #ccc;
          flex-shrink: 0;
          padding-top: 0.1rem;
        }

        .sfh-faq__content {
          flex: 1;
        }

        .sfh-faq__content h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .sfh-faq__toggle {
          font-size: 1.25rem;
          font-weight: 300;
          color: #999;
          flex-shrink: 0;
        }

        .sfh-faq__answer {
          overflow: hidden;
        }

        .sfh-faq__answer p {
          margin: 0.75rem 0 0;
          color: #666;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        /* ===== CTA ===== */
        .sfh-cta {
          background: #1a1a1a;
          position: relative;
          overflow: hidden;
          border-radius: 0;
        }

        .sfh-cta__inner {
          display: grid;
          grid-template-columns: 40% 60%;
          min-height: 500px;
        }

        .sfh-cta__image {
          position: relative;
          overflow: hidden;
          border-radius: 0;
        }

        .sfh-cta__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sfh-cta__image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(26,26,26,0.3) 0%, transparent 50%);
          border-radius: 0;
        }

        .sfh-cta__content {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #fff;
        }

        .sfh-cta__content .sfh-pre-text {
          color: rgba(255,255,255,0.5);
        }

        .sfh-cta__header h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 700;
          text-transform: uppercase;
          line-height: 1.1;
          margin: 0 0 1.5rem;
        }

        .sfh-cta__header .sfh-text--dark { color: #fff; }
        .sfh-cta__header .sfh-text--mid { color: rgba(255,255,255,0.7); }
        .sfh-cta__header .sfh-text--light { color: rgba(255,255,255,0.5); }

        .sfh-cta__desc {
          color: rgba(255,255,255,0.7);
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .sfh-cta__contact {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.15);
        }

        .sfh-cta__contact-item {
          text-decoration: none;
        }

        .sfh-cta__contact-label {
          display: block;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.5);
          margin-bottom: 0.25rem;
        }

        .sfh-cta__contact-value {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 1rem;
          color: #fff;
        }

        .sfh-cta__contact-divider {
          width: 1px;
          height: 40px;
          background: rgba(255,255,255,0.2);
        }

        .sfh-cta__buttons {
          display: flex;
          gap: 1rem;
        }

        .sfh-cta__buttons .sfh-btn--primary {
          background: #fff;
          color: #1a1a1a;
        }

        .sfh-cta__buttons .sfh-btn--primary:hover {
          background: #f0f0f0;
        }

        .sfh-cta__buttons .sfh-btn--outline {
          color: #fff;
          border-color: rgba(255,255,255,0.5);
        }

        .sfh-cta__buttons .sfh-btn--outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: #fff;
        }

        /* ===== DESTINATIONS ===== */
        .sfh-destinations {
          padding: 5rem 2rem;
          background: #fff;
          position: relative;
        }

        .sfh-destinations::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-destinations__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sfh-destinations__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sfh-destinations__card {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          cursor: pointer;
        }

        .sfh-destinations__image {
          position: relative;
          aspect-ratio: 4/3;
        }

        .sfh-destinations__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .sfh-destinations__card:hover .sfh-destinations__image img {
          transform: scale(1.05);
        }

        .sfh-destinations__overlay {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255,255,255,0.95);
          padding: 0.5rem 0.75rem;
          border-radius: 4px;
        }

        .sfh-destinations__time {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          color: #1a1a1a;
        }

        .sfh-destinations__info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        }

        .sfh-destinations__type {
          display: block;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.7);
          margin-bottom: 0.25rem;
        }

        .sfh-destinations__info h4 {
          margin: 0;
          font-size: 1.25rem;
          color: #fff;
          font-weight: 600;
        }

        /* ===== SAFETY ===== */
        .sfh-safety {
          padding: 5rem 2rem;
          background: #faf9f6;
          position: relative;
        }

        .sfh-safety::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-safety__container {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .sfh-safety__header h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1.5rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sfh-safety__desc {
          color: #666;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sfh-safety__features {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .sfh-safety__feature {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: #fff;
          border-left: 3px solid #1a1a1a;
          border-radius: 0 8px 8px 0;
        }

        .sfh-safety__feature-num {
          width: 36px;
          height: 36px;
          background: #1a1a1a;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          flex-shrink: 0;
        }

        .sfh-safety__feature h4 {
          margin: 0 0 0.25rem;
          font-size: 0.95rem;
        }

        .sfh-safety__feature p {
          margin: 0;
          font-size: 0.8rem;
          color: #888;
        }

        .sfh-safety__image {
          border-radius: 8px;
          overflow: hidden;
        }

        .sfh-safety__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* ===== HOURS ===== */
        .sfh-hours {
          padding: 5rem 2rem;
          background: #fff;
          position: relative;
        }

        .sfh-hours::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-hours__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sfh-hours__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sfh-hours__card {
          background: #faf9f6;
          padding: 2rem;
          text-align: center;
          border-left: 3px solid #1a1a1a;
          border-radius: 0 8px 8px 0;
        }

        .sfh-hours__card--special {
          border-left-color: #2563eb;
        }

        .sfh-hours__icon {
          margin-bottom: 1.5rem;
        }

        .sfh-hours__icon span {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: 0.1em;
        }

        .sfh-hours__times {
          margin-bottom: 1rem;
        }

        .sfh-hours__time {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.25rem;
          color: #1a1a1a;
          margin-bottom: 0.25rem;
        }

        .sfh-hours__note {
          font-size: 0.7rem;
          color: #888;
        }

        .sfh-hours__special-note {
          margin: 0.5rem 0 0;
          font-size: 0.8rem;
          color: #2563eb;
        }

        /* ===== WEATHER ===== */
        .sfh-weather {
          padding: 5rem 2rem;
          background: #faf9f6;
          position: relative;
        }

        .sfh-weather::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-weather__container {
          max-width: 700px;
          margin: 0 auto;
        }

        .sfh-weather__table {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .sfh-weather__row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          border-bottom: 1px solid #e8e6e2;
        }

        .sfh-weather__row:last-child {
          border-bottom: none;
        }

        .sfh-weather__row--header {
          background: #1a1a1a;
        }

        .sfh-weather__row--header span {
          color: #fff;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .sfh-weather__row span {
          padding: 1rem 1.25rem;
          font-size: 0.9rem;
        }

        .sfh-weather__cell--label {
          font-weight: 600;
        }

        .sfh-weather__resources {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .sfh-weather__link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: #fff;
          border: 1px solid #e8e6e2;
          border-radius: 8px;
          text-decoration: none;
          color: #1a1a1a;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }

        .sfh-weather__link:hover {
          border-color: #1a1a1a;
        }

        .sfh-weather__link-icon {
          font-size: 1rem;
        }

        /* ===== FUEL ===== */
        .sfh-fuel {
          padding: 5rem 2rem;
          background: #1a1a1a;
          position: relative;
        }

        .sfh-fuel__inner {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }

        .sfh-fuel__content h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1.5rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sfh-fuel__content .sfh-pre-text {
          color: rgba(255,255,255,0.5);
        }

        .sfh-fuel__content .sfh-text--dark { color: #fff; }
        .sfh-fuel__content .sfh-text--mid { color: rgba(255,255,255,0.7); }

        .sfh-fuel__content p {
          color: rgba(255,255,255,0.7);
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sfh-fuel__points {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          text-align: left;
        }

        .sfh-fuel__point {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #fff;
          font-size: 0.9rem;
        }

        .sfh-fuel__point-icon {
          color: #4ade80;
          font-size: 1rem;
        }

        /* ===== INSURANCE ===== */
        .sfh-insurance {
          padding: 5rem 2rem;
          background: #fff;
          position: relative;
        }

        .sfh-insurance::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-insurance__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sfh-insurance__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .sfh-insurance__card {
          background: #faf9f6;
          padding: 2rem;
          text-align: center;
          border-left: 3px solid #1a1a1a;
          border-radius: 0 8px 8px 0;
        }

        .sfh-insurance__card h4 {
          margin: 0 0 1rem;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #666;
        }

        .sfh-insurance__value {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .sfh-insurance__desc {
          font-size: 0.8rem;
          color: #888;
          margin: 0;
        }

        .sfh-insurance__excess {
          background: #faf9f6;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
        }

        .sfh-insurance__excess h4 {
          margin: 0 0 1.5rem;
          font-size: 1rem;
        }

        .sfh-insurance__excess-grid {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 1rem;
        }

        .sfh-insurance__excess-item {
          text-align: center;
        }

        .sfh-insurance__excess-model {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #888;
          margin-bottom: 0.25rem;
        }

        .sfh-insurance__excess-amount {
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .sfh-insurance__excess-note {
          font-size: 0.8rem;
          color: #2563eb;
          margin: 0;
        }

        /* ===== CURRENCY ===== */
        .sfh-currency {
          padding: 5rem 2rem;
          background: #faf9f6;
          position: relative;
        }

        .sfh-currency::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-currency__container {
          max-width: 700px;
          margin: 0 auto;
        }

        .sfh-currency__content h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1.5rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sfh-currency__desc {
          color: #666;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sfh-currency__requirements {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .sfh-currency__req {
          background: #fff;
          padding: 1.5rem;
          border-left: 3px solid #1a1a1a;
          border-radius: 0 8px 8px 0;
        }

        .sfh-currency__req-header {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .sfh-currency__req-hours {
          font-family: 'Share Tech Mono', monospace;
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .sfh-currency__req-label {
          font-size: 0.9rem;
          color: #666;
        }

        .sfh-currency__req p {
          margin: 0;
          font-size: 0.85rem;
          color: #888;
        }

        .sfh-currency__checkout {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
          border: 1px solid #e8e6e2;
        }

        .sfh-currency__checkout h4 {
          margin: 0 0 0.5rem;
        }

        .sfh-currency__checkout p {
          margin: 0 0 1.5rem;
          color: #666;
          font-size: 0.9rem;
        }

        /* ===== INTERNATIONAL ===== */
        .sfh-international {
          padding: 5rem 2rem;
          background: #fff;
          position: relative;
        }

        .sfh-international::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-international__container {
          max-width: 800px;
          margin: 0 auto;
        }

        .sfh-international__steps {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .sfh-international__step {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem;
          background: #faf9f6;
          border-left: 3px solid #1a1a1a;
          border-radius: 0 8px 8px 0;
        }

        .sfh-international__step-num {
          width: 44px;
          height: 44px;
          background: #1a1a1a;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem;
          flex-shrink: 0;
        }

        .sfh-international__step-content h4 {
          margin: 0 0 0.5rem;
          font-size: 1rem;
        }

        .sfh-international__step-content p {
          margin: 0;
          font-size: 0.85rem;
          color: #666;
        }

        .sfh-international__popular {
          background: #faf9f6;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
        }

        .sfh-international__popular h4 {
          margin: 0 0 1.5rem;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #666;
        }

        .sfh-international__destinations {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
        }

        .sfh-international__destinations span {
          padding: 0.5rem 1rem;
          background: #fff;
          border: 1px solid #e8e6e2;
          border-radius: 4px;
          font-size: 0.85rem;
        }

        /* ===== TESTIMONIALS ===== */
        .sfh-testimonials {
          padding: 5rem 2rem;
          background: #faf9f6;
          position: relative;
        }

        .sfh-testimonials::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-testimonials__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sfh-testimonials__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sfh-testimonials__card {
          background: #fff;
          padding: 2rem;
          border-left: 3px solid #1a1a1a;
          border-radius: 0 8px 8px 0;
          position: relative;
        }

        .sfh-testimonials__quote {
          position: absolute;
          top: 0.5rem;
          left: 1.5rem;
          font-family: Georgia, serif;
          font-size: 4rem;
          color: #e8e6e2;
          line-height: 1;
        }

        .sfh-testimonials__card p {
          margin: 0 0 1.5rem;
          color: #666;
          line-height: 1.7;
          font-size: 0.95rem;
          position: relative;
          z-index: 1;
        }

        .sfh-testimonials__author {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .sfh-testimonials__name {
          font-weight: 600;
          color: #1a1a1a;
        }

        .sfh-testimonials__role {
          font-size: 0.8rem;
          color: #888;
        }

        .sfh-testimonials__hours {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          color: #999;
        }

        /* ===== GALLERY ===== */
        .sfh-gallery {
          padding: 5rem 2rem;
          background: #fff;
          position: relative;
        }

        .sfh-gallery::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-gallery__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sfh-gallery__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .sfh-gallery__item {
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 8px;
        }

        .sfh-gallery__item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .sfh-gallery__item:hover img {
          transform: scale(1.1);
        }

        /* ===== COMPARISON ===== */
        .sfh-comparison {
          padding: 5rem 2rem;
          background: #faf9f6;
          position: relative;
        }

        .sfh-comparison::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-comparison__container {
          max-width: 800px;
          margin: 0 auto;
        }

        .sfh-comparison__table {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
        }

        .sfh-comparison__header,
        .sfh-comparison__row {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
        }

        .sfh-comparison__header {
          background: #1a1a1a;
        }

        .sfh-comparison__header .sfh-comparison__cell {
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .sfh-comparison__row {
          border-bottom: 1px solid #e8e6e2;
        }

        .sfh-comparison__row:last-child {
          border-bottom: none;
        }

        .sfh-comparison__cell {
          padding: 1rem 1.25rem;
          font-size: 0.9rem;
        }

        .sfh-comparison__cell--label {
          font-weight: 600;
          color: #1a1a1a;
        }

        /* ===== ADDONS ===== */
        .sfh-addons {
          padding: 5rem 2rem;
          background: #fff;
          position: relative;
        }

        .sfh-addons::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-addons__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sfh-addons__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sfh-addons__card {
          background: #faf9f6;
          padding: 1.5rem;
          border-left: 3px solid #1a1a1a;
          border-radius: 0 8px 8px 0;
        }

        .sfh-addons__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .sfh-addons__header h4 {
          margin: 0;
          font-size: 0.95rem;
        }

        .sfh-addons__price {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem;
          color: #1a1a1a;
          font-weight: 700;
        }

        .sfh-addons__card p {
          margin: 0;
          font-size: 0.8rem;
          color: #888;
        }

        /* ===== VOUCHERS ===== */
        .sfh-vouchers {
          padding: 0;
          background: #faf9f6;
          position: relative;
        }

        .sfh-vouchers__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .sfh-vouchers__image {
          height: 500px;
        }

        .sfh-vouchers__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sfh-vouchers__content {
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .sfh-vouchers__content h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1.5rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sfh-vouchers__content p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sfh-vouchers__options {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .sfh-vouchers__option {
          text-align: center;
          padding: 1rem 1.5rem;
          background: #fff;
          border: 1px solid #e8e6e2;
          border-radius: 8px;
        }

        .sfh-vouchers__amount {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .sfh-vouchers__desc {
          font-size: 0.75rem;
          color: #888;
        }

        /* ===== BLOCK BOOKING ===== */
        .sfh-block {
          padding: 5rem 2rem;
          background: #fff;
          position: relative;
        }

        .sfh-block::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-block__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sfh-block__tiers {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sfh-block__tier {
          background: #faf9f6;
          padding: 2rem;
          text-align: center;
          border-radius: 8px;
          position: relative;
        }

        .sfh-block__tier--popular {
          background: #1a1a1a;
          color: #fff;
        }

        .sfh-block__tier-badge {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.25rem 0.75rem;
          background: #e8e6e2;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #666;
          border-radius: 4px;
        }

        .sfh-block__tier--popular .sfh-block__tier-badge {
          background: #2563eb;
          color: #fff;
        }

        .sfh-block__tier-hours {
          font-size: 0.85rem;
          color: #888;
          margin: 1rem 0 0.5rem;
        }

        .sfh-block__tier--popular .sfh-block__tier-hours {
          color: rgba(255,255,255,0.7);
        }

        .sfh-block__tier-discount {
          font-family: 'Share Tech Mono', monospace;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .sfh-block__tier ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sfh-block__tier li {
          padding: 0.5rem 0;
          font-size: 0.85rem;
          border-bottom: 1px solid #e8e6e2;
        }

        .sfh-block__tier--popular li {
          border-color: rgba(255,255,255,0.2);
        }

        .sfh-block__tier li:last-child {
          border-bottom: none;
        }

        /* ===== RESOURCES ===== */
        .sfh-resources {
          padding: 5rem 2rem;
          background: #faf9f6;
          position: relative;
        }

        .sfh-resources::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-resources__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sfh-resources__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sfh-resources__card {
          background: #fff;
          padding: 2rem;
          text-align: center;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid #e8e6e2;
        }

        .sfh-resources__card:hover {
          border-color: #1a1a1a;
          transform: translateY(-2px);
        }

        .sfh-resources__icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .sfh-resources__card h4 {
          margin: 0 0 0.5rem;
          color: #1a1a1a;
          font-size: 1rem;
        }

        .sfh-resources__card p {
          margin: 0;
          font-size: 0.8rem;
          color: #888;
        }

        /* ===== PARTNERS ===== */
        .sfh-partners {
          padding: 5rem 2rem;
          background: #fff;
          position: relative;
        }

        .sfh-partners::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-partners__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sfh-partners__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sfh-partners__card {
          background: #faf9f6;
          padding: 1.5rem;
          text-align: center;
          border-left: 3px solid #1a1a1a;
          border-radius: 0 8px 8px 0;
        }

        .sfh-partners__card h4 {
          margin: 0 0 0.25rem;
          font-size: 1.1rem;
        }

        .sfh-partners__type {
          display: block;
          font-size: 0.75rem;
          color: #888;
          margin-bottom: 0.75rem;
        }

        .sfh-partners__benefit {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          background: #1a1a1a;
          color: #fff;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 4px;
        }

        /* ===== EXPERIENCE ===== */
        .sfh-experience {
          padding: 5rem 2rem;
          background: #1a1a1a;
          position: relative;
        }

        .sfh-experience__inner {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sfh-experience__header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .sfh-experience__header .sfh-pre-text {
          color: rgba(255,255,255,0.5);
        }

        .sfh-experience__header h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          text-transform: uppercase;
          font-weight: 700;
          margin: 0.5rem 0;
        }

        .sfh-experience__header .sfh-text--dark { color: #fff; }
        .sfh-experience__header .sfh-text--mid { color: rgba(255,255,255,0.7); }

        .sfh-experience__stats {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 2rem;
        }

        .sfh-experience__stat {
          text-align: center;
        }

        .sfh-experience__value {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .sfh-experience__label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.6);
        }

        /* ===== TEAM ===== */
        .sfh-team {
          padding: 5rem 2rem;
          background: #faf9f6;
          position: relative;
        }

        .sfh-team::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-team__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sfh-team__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sfh-team__card {
          background: #fff;
          padding: 2rem;
          text-align: center;
          border-radius: 8px;
        }

        .sfh-team__avatar {
          width: 60px;
          height: 60px;
          background: #1a1a1a;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.25rem;
          margin: 0 auto 1rem;
        }

        .sfh-team__card h4 {
          margin: 0 0 0.25rem;
          font-size: 1rem;
        }

        .sfh-team__role {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #2563eb;
          margin-bottom: 0.75rem;
        }

        .sfh-team__card p {
          margin: 0;
          font-size: 0.85rem;
          color: #888;
        }

        /* ===== CONTACT FORM ===== */
        .sfh-contact {
          padding: 5rem 2rem;
          background: #fff;
          position: relative;
        }

        .sfh-contact::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-contact__container {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 4rem;
        }

        .sfh-contact__content h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1.5rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sfh-contact__content p {
          color: #666;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .sfh-contact__details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .sfh-contact__detail {
          padding-bottom: 1rem;
          border-bottom: 1px solid #e8e6e2;
        }

        .sfh-contact__detail-label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #999;
          margin-bottom: 0.25rem;
        }

        .sfh-contact__detail a,
        .sfh-contact__detail span {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.95rem;
          color: #1a1a1a;
          text-decoration: none;
        }

        .sfh-contact__form {
          background: #faf9f6;
          padding: 2rem;
          border-radius: 8px;
        }

        .sfh-contact__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .sfh-contact__field {
          margin-bottom: 1rem;
        }

        .sfh-contact__field label {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #666;
          margin-bottom: 0.5rem;
        }

        .sfh-contact__field input,
        .sfh-contact__field select,
        .sfh-contact__field textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e8e6e2;
          border-radius: 4px;
          font-family: inherit;
          font-size: 0.9rem;
          background: #fff;
          transition: border-color 0.3s ease;
        }

        .sfh-contact__field input:focus,
        .sfh-contact__field select:focus,
        .sfh-contact__field textarea:focus {
          outline: none;
          border-color: #1a1a1a;
        }

        .sfh-contact__field textarea {
          resize: vertical;
        }

        /* ===== LOCATION ===== */
        .sfh-location {
          background: #faf9f6;
          position: relative;
        }

        .sfh-location__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .sfh-location__map {
          min-height: 400px;
        }

        .sfh-location__map iframe {
          width: 100%;
          height: 100%;
        }

        .sfh-location__content {
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .sfh-location__content h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1.5rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sfh-location__content p {
          color: #666;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .sfh-location__info {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .sfh-location__info-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .sfh-location__info-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #999;
        }

        .sfh-location__info-item span:last-child {
          font-size: 0.9rem;
          color: #1a1a1a;
        }

        /* ===== FINAL CTA ===== */
        .sfh-final-cta {
          padding: 5rem 2rem;
          background: #faf9f6;
          text-align: center;
          position: relative;
        }

        .sfh-final-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(80%, 600px);
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0deda, transparent);
        }

        .sfh-final-cta__container {
          max-width: 600px;
          margin: 0 auto;
        }

        .sfh-final-cta h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0.5rem 0 1.5rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sfh-final-cta p {
          color: #666;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .sfh-final-cta__buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .sfh-intro__benefits {
            grid-template-columns: repeat(2, 1fr);
          }

          .sfh-fleet__card {
            grid-template-columns: 1fr;
          }

          .sfh-fleet__image {
            min-height: 250px;
          }

          .sfh-cta__inner {
            grid-template-columns: 1fr;
          }

          .sfh-cta__image {
            height: 250px;
          }

          .sfh-destinations__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sfh-safety__container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .sfh-safety__image {
            order: -1;
            height: 300px;
          }

          .sfh-hours__grid {
            grid-template-columns: 1fr;
          }

          .sfh-insurance__grid {
            grid-template-columns: 1fr;
          }

          .sfh-testimonials__grid {
            grid-template-columns: 1fr;
          }

          .sfh-gallery__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sfh-addons__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sfh-vouchers__inner {
            grid-template-columns: 1fr;
          }

          .sfh-vouchers__image {
            height: 300px;
          }

          .sfh-block__tiers {
            grid-template-columns: 1fr;
          }

          .sfh-resources__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sfh-partners__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sfh-experience__stats {
            grid-template-columns: repeat(3, 1fr);
          }

          .sfh-team__grid {
            grid-template-columns: 1fr;
          }

          .sfh-contact__container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .sfh-location__inner {
            grid-template-columns: 1fr;
          }

          .sfh-location__map {
            height: 300px;
          }
        }

        @media (max-width: 768px) {
          .sfh-hero__content {
            padding: 5rem 2rem 2rem;
            justify-content: center;
          }

          .sfh-hero__left {
            text-align: center;
            max-width: 100%;
          }

          .sfh-hero__headline {
            align-items: center;
          }

          .sfh-hero__divider-line {
            margin: 1.5rem auto;
          }

          .sfh-hero__sub {
            margin: 0 auto 2rem;
            text-align: center;
          }

          .sfh-hero__stats {
            justify-content: center;
          }

          .sfh-hero__overlay {
            background: linear-gradient(180deg, rgba(250,249,246,0.97) 0%, rgba(250,249,246,0.92) 60%, rgba(250,249,246,0.7) 100%);
          }

          .sfh-intro__benefits {
            grid-template-columns: 1fr;
          }

          .sfh-fleet__selector {
            flex-direction: column;
          }

          .sfh-rates__grid {
            grid-template-columns: 1fr;
          }

          .sfh-requirements__grid {
            grid-template-columns: 1fr;
          }

          .sfh-cta__contact {
            flex-direction: column;
            gap: 1rem;
          }

          .sfh-cta__contact-divider {
            width: 40px;
            height: 1px;
          }

          .sfh-cta__buttons {
            flex-direction: column;
          }

          .sfh-cta__buttons .sfh-btn {
            width: 100%;
          }

          .sfh-destinations__grid {
            grid-template-columns: 1fr;
          }

          .sfh-weather__resources {
            flex-direction: column;
            align-items: center;
          }

          .sfh-fuel__points {
            grid-template-columns: 1fr;
          }

          .sfh-insurance__excess-grid {
            flex-direction: column;
            gap: 1rem;
          }

          .sfh-comparison__header,
          .sfh-comparison__row {
            grid-template-columns: 1.2fr 1fr 1fr 1fr;
          }

          .sfh-comparison__cell {
            padding: 0.75rem;
            font-size: 0.8rem;
          }

          .sfh-addons__grid {
            grid-template-columns: 1fr;
          }

          .sfh-vouchers__content {
            padding: 2rem;
          }

          .sfh-vouchers__options {
            flex-direction: column;
            gap: 1rem;
          }

          .sfh-resources__grid {
            grid-template-columns: 1fr;
          }

          .sfh-partners__grid {
            grid-template-columns: 1fr;
          }

          .sfh-experience__stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .sfh-contact__row {
            grid-template-columns: 1fr;
          }

          .sfh-location__content {
            padding: 2rem;
          }

          .sfh-location__info {
            flex-direction: column;
            gap: 1rem;
          }

          .sfh-final-cta__buttons {
            flex-direction: column;
          }

          .sfh-gallery__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .sfh-experience__stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .sfh-experience__value {
            font-size: 1.5rem;
          }

          .sfh-comparison__header,
          .sfh-comparison__row {
            grid-template-columns: 1fr 0.8fr 0.8fr 0.8fr;
          }

          .sfh-comparison__cell {
            padding: 0.5rem;
            font-size: 0.7rem;
          }

          .sfh-gallery__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default SelfFlyHire;
