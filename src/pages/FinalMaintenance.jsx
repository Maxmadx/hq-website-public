/**
 * HQ AVIATION - FINAL MAINTENANCE PAGE
 * =====================================
 *
 * A premium, immersive maintenance page with 20 unique components
 * Brand: Luxury Minimal Aviation
 * Typography: Space Grotesk + Share Tech Mono
 * Colors: #faf9f6 (warm white), #1a1a1a (charcoal)
 *
 * COMPONENTS:
 * 01. Hero - Full viewport with animated grid + status board
 * 02. ScrollProgress - Fixed progress indicator
 * 03. StatsStrip - Animated counters with icons
 * 04. Philosophy - Split text with floating elements
 * 05. ServicesGrid - 3D hover cards for services
 * 06. Timeline - Maintenance history/milestones
 * 07. CertificationBadges - EASA/CAA badges with hover
 * 08. ProcessFlow - Step-by-step diagram
 * 09. TeamProfiles - Engineer spotlight cards with +team count
 * 10. FacilityShowcase - Parallax image gallery
 * 12. EquipmentGallery - Scrolling tool showcase
 * 13. TestimonialSlider - Client reviews
 * 14. MaintenanceSchedule - Interactive booking table
 * 15. PartsInventory - Technical specification cards
 * 16. ServiceComparison - Pricing tiers
 * 17. FAQAccordion - Expandable questions
 * 18. ContactCTA - Split action section
 * 19. TrustIndicators - Logos and certifications
 * 20. EmergencySupport - 24/7 support highlight
 */

import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import '../assets/css/main.css';
import '../assets/css/components.css';
import FooterMinimal from '../components/FooterMinimal';

// ============================================
// UTILITY COMPONENTS
// ============================================

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

// ============================================
// HEADER COMPONENT
// ============================================

function MaintenanceHeader() {
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
              <li><Link to="/sales" onClick={closeMenu}>New Aircraft</Link></li>
              <li><Link to="/sales/r66" onClick={closeMenu}>Robinson R66</Link></li>
              <li><Link to="/sales/r44" onClick={closeMenu}>Robinson R44</Link></li>
              <li><Link to="/sales/r22" onClick={closeMenu}>Robinson R22</Link></li>
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Flight Training</h3>
            <ul>
              <li><Link to="/training" onClick={closeMenu}>Training Overview</Link></li>
              <li><Link to="/training/ppl" onClick={closeMenu}>Private Pilot License</Link></li>
              <li><Link to="/training/trial-lessons" onClick={closeMenu}>Trial Lessons</Link></li>
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Services</h3>
            <ul>
              <li><Link to="/services" onClick={closeMenu}>Services Overview</Link></li>
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
                <Link to="/training" className="Header-nav-item">Training</Link>
                <Link to="/sales" className="Header-nav-item">Aircraft</Link>
                <Link to="/maintenance" className="Header-nav-item">Maintenance</Link>
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

// ============================================
// PARALLAX IMAGE SECTION WITH WAVE OVERLAYS
// ============================================

function ParallaxSection({ image, number, label, largeText }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section ref={ref} className="maint-parallax">
      <motion.div className="maint-parallax__bg" style={{ y }}>
        <img src={image} alt="" />
      </motion.div>
      <div className="maint-parallax__overlay" />

      {/* Wave overlays */}
      <svg className="maint-parallax__wave maint-parallax__wave--top" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,50 C360,100 1080,0 1440,50 L1440,0 L0,0 Z" fill="#faf9f6"/>
      </svg>
      <svg className="maint-parallax__wave maint-parallax__wave--bottom" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,50 C360,0 1080,100 1440,50 L1440,100 L0,100 Z" fill="#ffffff"/>
      </svg>

      <div className="maint-parallax__content">
        <span className="maint-parallax__number">— {number} —</span>
        <span className="maint-parallax__label">{label}</span>
        <span className="maint-parallax__large">{largeText}</span>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 01: HERO WITH STATUS BOARD
// ============================================

function HeroSection() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={heroRef} className="maint-hero">
      <motion.div
        className="maint-hero__bg"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <img src="/assets/images/facility/maintenance-hangar.jpg" alt="" />
      </motion.div>
      <div className="maint-hero__overlay" />

      {/* Animated Grid */}
      <div className="maint-hero__grid">
        {[20, 40, 60, 80].map((pos, i) => (
          <motion.div
            key={`v-${i}`}
            className="maint-hero__grid-line maint-hero__grid-line--v"
            style={{ left: `${pos}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        {[33, 66].map((pos, i) => (
          <motion.div
            key={`h-${i}`}
            className="maint-hero__grid-line maint-hero__grid-line--h"
            style={{ top: `${pos}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4 + 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>

      <motion.div
        className="maint-hero__content"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <motion.span
          className="maint-hero__label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          EASA PART 145 APPROVED • UK CAA CERTIFIED
        </motion.span>

        <div className="maint-hero__headline">
          <motion.span
            className="maint-hero__word maint-hero__word--1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            PRECISION
          </motion.span>
          <motion.span
            className="maint-hero__word maint-hero__word--2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            ENGINEERING
          </motion.span>
          <motion.span
            className="maint-hero__word maint-hero__word--3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            EXCELLENCE
          </motion.span>
        </div>

        <motion.div
          className="maint-hero__divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.span
          className="maint-hero__coords"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          51.5751°N • 0.5059°W • DENHAM AERODROME
        </motion.span>
      </motion.div>
    </section>
  );
}

// ============================================
// COMPONENT 02: SCROLL PROGRESS
// ============================================

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollTop / docHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="maint-scroll-progress">
      <div className="maint-scroll-progress__track">
        <motion.div
          className="maint-scroll-progress__bar"
          style={{ scaleY: progress }}
        />
      </div>
      <span className="maint-scroll-progress__label">{Math.round(progress * 100)}%</span>
    </div>
  );
}

// ============================================
// COMPONENT 03: STATS STRIP
// ============================================

function StatsStrip() {
  const stats = [
    { icon: 'fa-helicopter', value: 85, suffix: '+', label: 'Aircraft Under Care' },
    { icon: 'fa-calendar-check', value: 15, suffix: '+', label: 'Years Experience' },
    { icon: 'fa-wrench', value: 2500, suffix: '+', label: 'Services Completed' },
    { icon: 'fa-certificate', value: 100, suffix: '%', label: 'Genuine Parts' },
    { icon: 'fa-users', value: 12, suffix: '', label: 'Expert Engineers' },
  ];

  return (
    <section className="maint-stats">
      <div className="maint-stats__container">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="maint-stats__item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <i className={`fas ${stat.icon}`}></i>
            <span className="maint-stats__value">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="maint-stats__label">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 04: PHILOSOPHY SECTION
// ============================================

function PhilosophySection() {
  return (
    <section className="maint-philosophy">
      <div className="maint-philosophy__container">
        <div className="maint-philosophy__content">
          <Reveal>
            <span className="maint-pre-text">Our Philosophy</span>
            <h2 className="maint-philosophy__headline">
              <span className="maint-text--dark">Where </span>
              <span className="maint-text--mid">Precision </span>
              <span className="maint-text--light">Meets Care</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="maint-philosophy__body">
              At HQ Aviation, maintenance isn't just a service—it's a commitment to excellence.
              Our team has the highest quality standards and we have enough engineers to ensure
              a rapid turnaround time as well as holding a certain amount of parts in inventory
              to minimise AOG. Every inspection, every repair, every overhaul is performed with
              the same meticulous attention to detail that has defined us since 2010.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="maint-philosophy__pillars">
              <div className="maint-philosophy__pillar">
                <div className="maint-philosophy__pillar-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h4>Safety First</h4>
                <p>Uncompromising standards that exceed regulatory requirements</p>
              </div>
              <div className="maint-philosophy__pillar">
                <div className="maint-philosophy__pillar-icon">
                  <i className="fas fa-microscope"></i>
                </div>
                <h4>Meticulous Detail</h4>
                <p>Every component inspected, every system verified</p>
              </div>
              <div className="maint-philosophy__pillar">
                <div className="maint-philosophy__pillar-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h4>Client Partnership</h4>
                <p>Transparent communication throughout every service</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="maint-philosophy__visual">
          <motion.div
            className="maint-philosophy__image"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src="/assets/images/facility/hq-0053.jpg" alt="Precision engineering" />
            <div className="maint-philosophy__image-label">
              <span className="maint-philosophy__image-num">01</span>
              <span>Precision at every step</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 05: SERVICES GRID
// ============================================

function ServicesGrid() {
  const services = [
    {
      id: '01',
      title: 'Scheduled Maintenance',
      desc: '100-hour, annual, and progressive inspections performed to manufacturer specifications.',
      icon: 'fa-calendar-alt',
      features: ['100 Hour Inspections', 'Annual Inspections', 'Progressive Checks']
    },
    {
      id: '02',
      title: 'Overhaul Services',
      desc: 'Complete component and engine overhauls with certified parts and expert craftsmanship.',
      icon: 'fa-cogs',
      features: ['Engine Overhauls', 'Component Rebuild', 'Transmission Service']
    },
    {
      id: '03',
      title: 'Avionics & Upgrades',
      desc: 'Modern avionics installation, panel upgrades, and system integration services.',
      icon: 'fa-satellite-dish',
      features: ['Glass Cockpit', 'GPS/NAV Systems', 'Transponder Upgrades']
    },
    {
      id: '04',
      title: 'AOG Support',
      desc: '24/7 Aircraft on Ground response for urgent maintenance needs anywhere in Europe.',
      icon: 'fa-bolt',
      features: ['24/7 Response', 'Mobile Service', 'Parts Sourcing']
    },
    {
      id: '05',
      title: 'Pre-Purchase Inspection',
      desc: 'Comprehensive evaluation before you buy, ensuring complete peace of mind.',
      icon: 'fa-search',
      features: ['Full Inspection', 'Documentation Review', 'Value Assessment']
    },
    {
      id: '06',
      title: 'Paint & Refurbishment',
      desc: 'Complete interior and exterior restoration to factory-new condition.',
      icon: 'fa-paint-brush',
      features: ['Custom Paint', 'Interior Refresh', 'Corrosion Treatment']
    }
  ];

  return (
    <section className="maint-services">
      <div className="maint-services__container">
        <Reveal>
          <div className="maint-section-header">
            <span className="maint-pre-text">What We Offer</span>
            <h2>
              <span className="maint-text--dark">Comprehensive </span>
              <span className="maint-text--mid">Maintenance </span>
              <span className="maint-text--light">Services</span>
            </h2>
          </div>
        </Reveal>

        <div className="maint-services__grid">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.1}>
              <motion.div
                className="maint-services__card"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="maint-services__card-header">
                  <span className="maint-services__card-num">{service.id}</span>
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <ul className="maint-services__features">
                  {service.features.map((f, j) => (
                    <li key={j}><i className="fas fa-check"></i>{f}</li>
                  ))}
                </ul>
                <div className="maint-services__card-footer">
                  <Link to="/contact" className="maint-services__link">
                    Learn More <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 05B: REBUILDS SECTION
// ============================================

function RebuildsSection() {
  return (
    <section className="maint-rebuilds">
      <div className="maint-rebuilds__container">
        <div className="maint-rebuilds__content">
          <Reveal>
            <span className="maint-pre-text">Complete Restoration</span>
            <h2 className="maint-rebuilds__headline">
              <span className="maint-text--dark">12-Year </span>
              <span className="maint-text--mid">Rebuild </span>
              <span className="maint-text--light">Programme</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="maint-rebuilds__body">
              When your Robinson helicopter reaches its 12-year inspection, we don't just check it—we
              transform it. Our comprehensive rebuild programme takes your aircraft through a complete
              restoration: we strip it down to a bare shell, inspect every component, replace what's
              needed, and build it back up again to factory-fresh condition.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="maint-rebuilds__process">
              <div className="maint-rebuilds__step">
                <span className="maint-rebuilds__step-num">01</span>
                <h4>Strip Down</h4>
                <p>Complete disassembly to bare airframe</p>
              </div>
              <div className="maint-rebuilds__arrow">
                <i className="fas fa-chevron-right"></i>
              </div>
              <div className="maint-rebuilds__step">
                <span className="maint-rebuilds__step-num">02</span>
                <h4>Inspect</h4>
                <p>Every component examined and tested</p>
              </div>
              <div className="maint-rebuilds__arrow">
                <i className="fas fa-chevron-right"></i>
              </div>
              <div className="maint-rebuilds__step">
                <span className="maint-rebuilds__step-num">03</span>
                <h4>Rebuild</h4>
                <p>Reassembly with new and certified parts</p>
              </div>
              <div className="maint-rebuilds__arrow">
                <i className="fas fa-chevron-right"></i>
              </div>
              <div className="maint-rebuilds__step">
                <span className="maint-rebuilds__step-num">04</span>
                <h4>Test Flight</h4>
                <p>Returned to service like new</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="maint-rebuilds__cta">
              <Link to="/contact" className="maint-btn maint-btn--primary">
                Enquire About Rebuilds
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="maint-rebuilds__visual">
          <motion.div
            className="maint-rebuilds__image"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* TODO: Add flatpack image from Instagram */}
            <div className="maint-rebuilds__image-placeholder">
              <i className="fas fa-helicopter"></i>
              <span>Stripped to shell</span>
            </div>
            <div className="maint-rebuilds__image-note">
              <i className="fas fa-camera"></i>
              <span>See our rebuild progress on Instagram</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 05C: WE BUY ANY ROBINSON
// ============================================

function WeBuySection() {
  return (
    <section className="maint-webuy">
      <div className="maint-webuy__container">
        <div className="maint-webuy__badge">
          <i className="fas fa-hand-holding-usd"></i>
        </div>
        <div className="maint-webuy__content">
          <Reveal>
            <span className="maint-pre-text maint-pre-text--light">Aircraft Acquisition</span>
            <h2>
              <span style={{ color: '#fff' }}>We Buy </span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Any </span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Robinson</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="maint-webuy__body">
              If you're a Robinson aircraft owner, we're interested in purchasing your helicopter.
              We're especially keen on aircraft from private owners who are running lower on years
              but still have plentiful hours remaining. We can put your aircraft on our training
              school fleet and use those hours up before the 12-year rebuild—maximising the value
              for everyone.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="maint-webuy__features">
              <div className="maint-webuy__feature">
                <i className="fas fa-check-circle"></i>
                <span>Fair Market Valuations</span>
              </div>
              <div className="maint-webuy__feature">
                <i className="fas fa-check-circle"></i>
                <span>Quick Decision Process</span>
              </div>
              <div className="maint-webuy__feature">
                <i className="fas fa-check-circle"></i>
                <span>All Robinson Models</span>
              </div>
              <div className="maint-webuy__feature">
                <i className="fas fa-check-circle"></i>
                <span>Any Condition Considered</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="maint-webuy__cta">
              <Link to="/contact" className="maint-btn maint-btn--light">
                Get a Valuation
              </Link>
              <a href="tel:+441234567890" className="maint-webuy__phone">
                <i className="fas fa-phone"></i>
                <span>Or call us directly</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 06: TIMELINE
// ============================================

function Timeline() {
  const milestones = [
    { year: '2010', title: 'Founded', desc: 'HQ Aviation established at Denham Aerodrome' },
    { year: '1995', title: 'EASA Approval', desc: 'Achieved Part 145 maintenance organization approval' },
    { year: '2000', title: 'Robinson Service Centre', desc: 'Appointed as authorized Robinson service facility' },
    { year: '2010', title: 'New Hangar', desc: 'Purpose-built maintenance facility opened' },
    { year: '2015', title: 'Fleet Expansion', desc: 'Over 50 aircraft under management' },
    { year: '2024', title: 'Industry Leader', desc: '85+ aircraft, 15 years of excellence' },
  ];

  return (
    <section className="maint-timeline">
      <div className="maint-timeline__container">
        <Reveal>
          <div className="maint-section-header maint-section-header--light">
            <span className="maint-pre-text maint-pre-text--light">Our Journey</span>
            <h2>
              <span style={{ color: '#fff' }}>15 Years </span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>of </span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Excellence</span>
            </h2>
          </div>
        </Reveal>

        <div className="maint-timeline__track">
          <div className="maint-timeline__line" />
          {milestones.map((m, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className={`maint-timeline__item ${i % 2 === 0 ? 'maint-timeline__item--top' : 'maint-timeline__item--bottom'}`}>
                <div className="maint-timeline__dot" />
                <div className="maint-timeline__content">
                  <span className="maint-timeline__year">{m.year}</span>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 07: CERTIFICATION BADGES
// ============================================

function CertificationBadges() {
  const certs = [
    { logo: '/assets/images/logos/certifications/caa-logo.png', name: 'UK CAA', desc: 'Civil Aviation Authority Certified' },
    { logo: '/assets/images/robinson-assets/logos/rhc_authorized-service-center-logo-logo-yellow-rotor-black-type.svg', name: 'Robinson Authorized', desc: 'Factory Authorized Service Centre' },
  ];

  return (
    <section className="maint-certs">
      <div className="maint-certs__container">
        <Reveal>
          <div className="maint-section-header">
            <span className="maint-pre-text">Certifications</span>
            <h2>
              <span className="maint-text--dark">Trusted </span>
              <span className="maint-text--mid">& </span>
              <span className="maint-text--light">Certified</span>
            </h2>
          </div>
        </Reveal>

        <div className="maint-certs__grid maint-certs__grid--two">
          {certs.map((cert, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                className="maint-certs__card"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="maint-certs__logo">
                  <img src={cert.logo} alt={cert.name} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  <div className="maint-certs__logo-fallback" style={{ display: 'none' }}>
                    <i className="fas fa-certificate"></i>
                  </div>
                </div>
                <h4>{cert.name}</h4>
                <p>{cert.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 08: PROCESS FLOW
// ============================================

function ProcessFlow() {
  const steps = [
    { num: '01', title: 'Initial Consultation', desc: 'Discuss your needs, schedule, and specific requirements', icon: 'fa-comments' },
    { num: '02', title: 'Inspection & Assessment', desc: 'Thorough evaluation of your aircraft\'s condition', icon: 'fa-search-plus' },
    { num: '03', title: 'Detailed Quote', desc: 'Transparent pricing with no hidden costs', icon: 'fa-file-invoice' },
    { num: '04', title: 'Expert Service', desc: 'Skilled engineers perform all work to highest standards', icon: 'fa-tools' },
    { num: '05', title: 'Quality Assurance', desc: 'Multiple inspections ensure perfect completion', icon: 'fa-clipboard-check' },
    { num: '06', title: 'Return to Service', desc: 'Full documentation and test flight if required', icon: 'fa-plane-departure' },
  ];

  return (
    <section className="maint-process">
      <div className="maint-process__container">
        <Reveal>
          <div className="maint-section-header">
            <span className="maint-pre-text">How We Work</span>
            <h2>
              <span className="maint-text--dark">The HQ </span>
              <span className="maint-text--mid">Maintenance </span>
              <span className="maint-text--light">Process</span>
            </h2>
          </div>
        </Reveal>

        <div className="maint-process__flow">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="maint-process__step">
                <div className="maint-process__step-num">{step.num}</div>
                <div className="maint-process__step-icon">
                  <i className={`fas ${step.icon}`}></i>
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
                {i < steps.length - 1 && <div className="maint-process__connector" />}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 09: TEAM PROFILES
// ============================================

function TeamProfiles() {
  const team = [
    { name: 'David Cross', role: 'Chief Engineer', exp: '25 years', img: '/assets/images/team/engineer-1.jpg', certs: ['EASA Part 66', 'Robinson Certified'] },
    { name: 'Michael Fowler', role: 'Senior Engineer', exp: '18 years', img: '/assets/images/team/engineer-2.jpg', certs: ['EASA Part 66', 'Avionics Specialist'] },
    { name: 'David Clarke', role: 'Engine Specialist', exp: '15 years', img: '/assets/images/team/engineer-3.jpg', certs: ['Lycoming Certified', 'Robinson Certified'] },
  ];

  const teamCount = 12;

  return (
    <section className="maint-team">
      <div className="maint-team__container">
        <Reveal>
          <div className="maint-section-header maint-section-header--light">
            <span className="maint-pre-text maint-pre-text--light">Our Engineers</span>
            <h2>
              <span style={{ color: '#fff' }}>Expert </span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Hands, </span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Trusted Care</span>
            </h2>
          </div>
        </Reveal>

        <div className="maint-team__grid">
          {team.map((member, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="maint-team__card">
                <div className="maint-team__photo">
                  <div className="maint-team__photo-placeholder">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <div className="maint-team__info">
                  <h4>{member.name}</h4>
                  <span className="maint-team__role">{member.role}</span>
                  <span className="maint-team__exp">{member.exp} experience</span>
                  <div className="maint-team__certs">
                    {member.certs.map((c, j) => (
                      <span key={j} className="maint-team__cert">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.45}>
            <div className="maint-team__card maint-team__card--count">
              <div className="maint-team__count">
                <span className="maint-team__count-plus">+</span>
                <span className="maint-team__count-number">{teamCount}</span>
              </div>
              <div className="maint-team__count-label">
                <span>Skilled Engineers</span>
                <span>& Technicians</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.5}>
          <div className="maint-team__cta">
            <p>Our entire team is factory-trained and maintains continuous education certifications</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 11: FACILITY SHOWCASE
// ============================================

function FacilityShowcase() {
  const facilities = [
    { img: '/assets/images/facility/hq-0035.jpg', title: 'Main Hangar', desc: 'Climate controlled, 12,000 sq ft' },
    { img: '/assets/images/facility/hq-0089.jpg', title: 'Paint Shop', desc: 'Professional finishing facility' },
    { img: '/assets/images/facility/busy-hangar.jpg', title: 'Service Bays', desc: 'Multiple aircraft capacity' },
  ];

  return (
    <section className="maint-facility">
      <div className="maint-facility__container">
        <Reveal>
          <div className="maint-section-header">
            <span className="maint-pre-text">Our Home</span>
            <h2>
              <span className="maint-text--dark">Purpose-Built </span>
              <span className="maint-text--mid">Modern </span>
              <span className="maint-text--light">Facility</span>
            </h2>
          </div>
        </Reveal>

        <div className="maint-facility__gallery">
          {facilities.map((f, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <motion.div
                className="maint-facility__item"
                whileHover={{ scale: 1.02 }}
              >
                <img src={f.img} alt={f.title} />
                <div className="maint-facility__overlay">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 12: EQUIPMENT GALLERY
// ============================================

function EquipmentGallery() {
  const equipment = [
    { name: 'Vibration Analysis', icon: 'fa-wave-square' },
    { name: 'Track & Balance', icon: 'fa-balance-scale' },
    { name: 'Precision Tooling', icon: 'fa-tools' },
    { name: 'Diagnostic Systems', icon: 'fa-laptop-medical' },
    { name: 'Lifting Equipment', icon: 'fa-arrow-up' },
    { name: 'Cleaning Systems', icon: 'fa-spray-can' },
  ];

  return (
    <section className="maint-equipment">
      <div className="maint-equipment__container">
        <Reveal>
          <div className="maint-section-header maint-section-header--left">
            <span className="maint-pre-text">Professional Tools</span>
            <h2>
              <span className="maint-text--dark">State-of-the-Art </span>
              <span className="maint-text--light">Equipment</span>
            </h2>
          </div>
        </Reveal>

        <div className="maint-equipment__scroll">
          <div className="maint-equipment__track">
            {[...equipment, ...equipment].map((eq, i) => (
              <div key={i} className="maint-equipment__item">
                <i className={`fas ${eq.icon}`}></i>
                <span>{eq.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 14: MAINTENANCE SCHEDULE
// ============================================

function MaintenanceSchedule() {
  const schedule = [
    { interval: '50 HR', work: 'Periodic Inspection', duration: '1-2 days', includes: 'Oil change, visual inspection, minor adjustments' },
    { interval: '100 HR', work: 'Scheduled Inspection', duration: '2-3 days', includes: 'Comprehensive inspection, filter changes, lubrication' },
    { interval: 'Annual', work: 'Annual Inspection', duration: '3-5 days', includes: 'Full inspection, compliance checks, airworthiness review' },
    { interval: '2200 HR', work: 'Engine Overhaul', duration: '4-6 weeks', includes: 'Complete engine disassembly, inspection, rebuild' },
    { interval: '12 YR', work: 'Major Overhaul', duration: '6-8 weeks', includes: 'Airframe inspection, component overhauls, repainting' },
  ];

  return (
    <section className="maint-schedule">
      <div className="maint-schedule__container">
        <Reveal>
          <div className="maint-section-header">
            <span className="maint-pre-text">Planning</span>
            <h2>
              <span className="maint-text--dark">Maintenance </span>
              <span className="maint-text--mid">Schedule </span>
              <span className="maint-text--light">Overview</span>
            </h2>
          </div>
        </Reveal>

        <div className="maint-schedule__table">
          <div className="maint-schedule__header">
            <span>Interval</span>
            <span>Service</span>
            <span>Duration</span>
            <span>Includes</span>
          </div>
          {schedule.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="maint-schedule__row">
                <span className="maint-schedule__interval">{item.interval}</span>
                <span className="maint-schedule__work">{item.work}</span>
                <span className="maint-schedule__duration">{item.duration}</span>
                <span className="maint-schedule__includes">{item.includes}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5}>
          <div className="maint-schedule__note">
            <i className="fas fa-info-circle"></i>
            <p>Durations are estimates and may vary based on aircraft condition and parts availability</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 15: PARTS INVENTORY
// ============================================

function PartsInventory() {
  return (
    <section className="maint-parts">
      <div className="maint-parts__container">
        <div className="maint-parts__content">
          <Reveal>
            <span className="maint-pre-text maint-pre-text--light">Parts Supply</span>
            <h2>
              <span style={{ color: '#fff' }}>Factory </span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Authorized </span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Parts</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p>As an authorized Robinson Service Centre, we maintain extensive parts inventory ensuring minimal downtime for your aircraft.</p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="maint-parts__features">
              <div className="maint-parts__feature">
                <i className="fas fa-warehouse"></i>
                <span>£500K+ Stock Value</span>
              </div>
              <div className="maint-parts__feature">
                <i className="fas fa-truck-fast"></i>
                <span>Same Day Dispatch</span>
              </div>
              <div className="maint-parts__feature">
                <i className="fas fa-globe-europe"></i>
                <span>European Coverage</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <Link to="/contact" className="maint-btn maint-btn--light">
              Request Part Quote
            </Link>
          </Reveal>
        </div>

        <div className="maint-parts__visual">
          <div className="maint-parts__grid">
            <div className="maint-parts__item">
              <span className="maint-parts__item-cat">Engine</span>
              <span className="maint-parts__item-count">1,200+</span>
            </div>
            <div className="maint-parts__item">
              <span className="maint-parts__item-cat">Airframe</span>
              <span className="maint-parts__item-count">800+</span>
            </div>
            <div className="maint-parts__item">
              <span className="maint-parts__item-cat">Avionics</span>
              <span className="maint-parts__item-count">450+</span>
            </div>
            <div className="maint-parts__item">
              <span className="maint-parts__item-cat">Consumables</span>
              <span className="maint-parts__item-count">2,000+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 16: SERVICE COMPARISON
// ============================================

function ServiceComparison() {
  const tiers = [
    {
      name: 'Essential',
      desc: 'Core maintenance services',
      features: ['Scheduled Inspections', 'Minor Repairs', 'Oil Analysis', 'Basic Documentation'],
      highlight: false
    },
    {
      name: 'Complete',
      desc: 'Full care package',
      features: ['All Essential Services', 'Priority Scheduling', 'Courtesy Aircraft', 'Extended Warranty', 'Pickup & Delivery'],
      highlight: true
    },
    {
      name: 'Premium',
      desc: 'Ultimate ownership experience',
      features: ['All Complete Services', '24/7 AOG Support', 'Dedicated Engineer', 'Annual Paint Touch-up', 'Concierge Service'],
      highlight: false
    },
  ];

  return (
    <section className="maint-comparison">
      <div className="maint-comparison__container">
        <Reveal>
          <div className="maint-section-header">
            <span className="maint-pre-text">Packages</span>
            <h2>
              <span className="maint-text--dark">Service </span>
              <span className="maint-text--mid">Programmes </span>
              <span className="maint-text--light">for Owners</span>
            </h2>
          </div>
        </Reveal>

        <div className="maint-comparison__grid">
          {tiers.map((tier, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className={`maint-comparison__card ${tier.highlight ? 'maint-comparison__card--highlight' : ''}`}>
                {tier.highlight && <span className="maint-comparison__badge">Most Popular</span>}
                <h3>{tier.name}</h3>
                <p className="maint-comparison__desc">{tier.desc}</p>
                <ul>
                  {tier.features.map((f, j) => (
                    <li key={j}><i className="fas fa-check"></i>{f}</li>
                  ))}
                </ul>
                <Link to="/contact" className={`maint-btn ${tier.highlight ? 'maint-btn--primary' : 'maint-btn--outline'}`}>
                  Learn More
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 17: FAQ ACCORDION
// ============================================

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { q: 'How long does a 100-hour inspection take?', a: 'Typically 2-3 working days, depending on any additional findings. We will keep you informed throughout the process.' },
    { q: 'Do you offer pickup and delivery?', a: 'Yes, we can arrange ferry pilots to collect and return your aircraft from anywhere in the UK and Europe.' },
    { q: 'What warranty do you offer on repairs?', a: 'All work is warranted for 12 months or until the next scheduled inspection, whichever comes first. Parts carry manufacturer warranty.' },
    { q: 'Can you service non-Robinson helicopters?', a: 'We specialize in Robinson aircraft, but can provide advice and referrals for other manufacturers.' },
    { q: 'How do I get a quote for maintenance?', a: 'Contact us with your aircraft details and maintenance requirements. We\'ll provide a detailed written estimate within 24 hours.' },
  ];

  return (
    <section className="maint-faq">
      <div className="maint-faq__container">
        <Reveal>
          <div className="maint-section-header">
            <span className="maint-pre-text">Questions</span>
            <h2>
              <span className="maint-text--dark">Frequently </span>
              <span className="maint-text--mid">Asked </span>
              <span className="maint-text--light">Questions</span>
            </h2>
          </div>
        </Reveal>

        <div className="maint-faq__list">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className={`maint-faq__item ${openIndex === i ? 'maint-faq__item--open' : ''}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="maint-faq__question">
                  <span className="maint-faq__num">{String(i + 1).padStart(2, '0')}</span>
                  <h4>{faq.q}</h4>
                  <span className="maint-faq__toggle">{openIndex === i ? '−' : '+'}</span>
                </div>
                <motion.div
                  className="maint-faq__answer"
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{faq.a}</p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 18: CONTACT CTA
// ============================================

function ContactCTA() {
  return (
    <section className="maint-contact-cta">
      <div className="maint-contact-cta__container">
        <div className="maint-contact-cta__content">
          <Reveal>
            <span className="maint-pre-text">Get In Touch</span>
            <h2>
              <span className="maint-text--dark">Ready to </span>
              <span className="maint-text--mid">Book </span>
              <span className="maint-text--light">Your Service?</span>
            </h2>
            <p>Our team is ready to discuss your maintenance needs and provide a comprehensive quote.</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="maint-contact-cta__actions">
              <Link to="/contact" className="maint-btn maint-btn--primary maint-btn--large">
                <i className="fas fa-paper-plane"></i>
                Request Quote
              </Link>
              <a href="tel:+441234567890" className="maint-btn maint-btn--outline maint-btn--large">
                <i className="fas fa-phone"></i>
                Call Us
              </a>
            </div>
          </Reveal>
        </div>

        <div className="maint-contact-cta__info">
          <Reveal delay={0.3}>
            <div className="maint-contact-cta__card">
              <div className="maint-contact-cta__item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Location</h4>
                  <p>Denham Aerodrome<br />Tilehouse Lane, UB9 5DF</p>
                </div>
              </div>
              <div className="maint-contact-cta__item">
                <i className="fas fa-clock"></i>
                <div>
                  <h4>Hours</h4>
                  <p>Mon-Fri: 08:00 - 18:00<br />Sat: 08:00 - 14:00</p>
                </div>
              </div>
              <div className="maint-contact-cta__item">
                <i className="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p>maintenance@hq-aviation.co.uk</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 19: TRUST INDICATORS
// ============================================

function TrustIndicators() {
  const logos = [
    { name: 'Robinson Helicopters', src: '/assets/images/logos/robinson-logo.png' },
    { name: 'EASA', src: '/assets/images/logos/easa-logo.png' },
    { name: 'CAA', src: '/assets/images/logos/caa-logo.png' },
    { name: 'AOPA', src: '/assets/images/logos/aopa-logo.png' },
  ];

  return (
    <section className="maint-trust">
      <div className="maint-trust__container">
        <span className="maint-trust__label">Trusted Partners & Certifications</span>
        <div className="maint-trust__logos">
          {logos.map((logo, i) => (
            <div key={i} className="maint-trust__logo">
              <div className="maint-trust__logo-placeholder">
                <i className="fas fa-certificate"></i>
                <span>{logo.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 20: EMERGENCY SUPPORT
// ============================================

function EmergencySupport() {
  return (
    <section className="maint-emergency">
      <div className="maint-emergency__container">
        <div className="maint-emergency__icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <div className="maint-emergency__content">
          <h3>24/7 AOG Support</h3>
          <p>Aircraft on Ground? Our emergency response team is available around the clock for urgent maintenance needs anywhere in Europe.</p>
        </div>
        <div className="maint-emergency__action">
          <a href="tel:+441234567890" className="maint-emergency__phone">
            <i className="fas fa-phone"></i>
            <span>Emergency Line</span>
            <strong>+44 (0) 1234 567 890</strong>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// STYLES
// ============================================

const styles = `
/* ========================================
   HQ AVIATION MAINTENANCE PAGE
   20 Component Design System
   ======================================== */

/* === BASE === */
.maint {
  font-family: 'Space Grotesk', -apple-system, sans-serif;
  background: #faf9f6;
  color: #1a1a1a;
  line-height: 1.6;
  overflow-x: hidden;
}

.maint * {
  box-sizing: border-box;
}

/* === TYPOGRAPHY === */
.maint-pre-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 1rem;
  display: block;
}

.maint-pre-text--light {
  color: rgba(255,255,255,0.6);
}

.maint-text--dark { color: #1a1a1a; }
.maint-text--mid { color: #4a4a4a; }
.maint-text--light { color: #7a7a7a; }

.maint-section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
}

.maint-section-header--left {
  text-align: left;
  margin-left: 0;
}

.maint-section-header--light {
  color: #fff;
}

.maint-section-header h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 0.5rem 0;
  line-height: 1.1;
  text-transform: uppercase;
  font-weight: 700;
}

/* === BUTTONS === */
.maint-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.maint-btn--primary {
  background: #1a1a1a;
  color: #fff;
  border-color: #1a1a1a;
}

.maint-btn--primary:hover {
  background: #333;
  border-color: #333;
}

.maint-btn--outline {
  background: transparent;
  color: #1a1a1a;
  border-color: #1a1a1a;
}

.maint-btn--outline:hover {
  background: #1a1a1a;
  color: #fff;
}

.maint-btn--light {
  background: #fff;
  color: #1a1a1a;
  border-color: #fff;
}

.maint-btn--light:hover {
  background: transparent;
  color: #fff;
}

.maint-btn--large {
  padding: 1.25rem 2.5rem;
  font-size: 0.8rem;
}

/* === 01. HERO === */
.maint-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.maint-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.maint-hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.maint-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.4) 0%,
    rgba(0,0,0,0.6) 50%,
    rgba(0,0,0,0.8) 100%
  );
  z-index: 1;
}

.maint-hero__grid {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.maint-hero__grid-line {
  position: absolute;
  background: rgba(255,255,255,0.08);
}

.maint-hero__grid-line--v {
  width: 1px;
  height: 100%;
  top: 0;
  transform-origin: top;
}

.maint-hero__grid-line--h {
  height: 1px;
  width: 100%;
  left: 0;
  transform-origin: left;
}

.maint-hero__content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: #faf9f6;
  padding: 2rem;
  max-width: 1000px;
}

/* Status Board */
.maint-hero__status-board {
  background: rgba(0,0,0,0.7);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 1rem 1.5rem;
  margin-bottom: 3rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.maint-hero__status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  margin-bottom: 0.75rem;
}

.maint-hero__status-title {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.7);
}

.maint-hero__status-time {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: #4ade80;
}

.maint-hero__status-rows {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.maint-hero__status-row {
  display: grid;
  grid-template-columns: 1fr 0.8fr 1fr 1.2fr;
  gap: 1rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  padding: 0.4rem 0;
  border-bottom: 1px dashed rgba(255,255,255,0.1);
}

.maint-hero__status-reg {
  color: #fff;
  font-weight: 600;
}

.maint-hero__status-type {
  color: rgba(255,255,255,0.6);
}

.maint-hero__status-work {
  color: rgba(255,255,255,0.8);
}

.maint-hero__status-state {
  text-align: right;
  font-size: 0.6rem;
  padding: 0.15rem 0.5rem;
  border-radius: 2px;
}

.maint-hero__status-state--complete {
  background: rgba(74, 222, 128, 0.2);
  color: #4ade80;
}

.maint-hero__status-state--progress {
  background: rgba(250, 204, 21, 0.2);
  color: #facc15;
}

.maint-hero__status-state--scheduled {
  background: rgba(96, 165, 250, 0.2);
  color: #60a5fa;
}

.maint-hero__label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(250,249,246,0.7);
  margin-bottom: 2rem;
  display: block;
}

.maint-hero__headline {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.maint-hero__word {
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.maint-hero__word--1 { color: #faf9f6; }
.maint-hero__word--2 { color: rgba(250,249,246,0.7); }
.maint-hero__word--3 { color: rgba(250,249,246,0.5); }

.maint-hero__divider {
  width: 80px;
  height: 2px;
  background: #faf9f6;
  margin: 2rem auto;
  transform-origin: center;
}

.maint-hero__coords {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: rgba(250,249,246,0.6);
}

.maint-hero__scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  z-index: 10;
}

.maint-hero__scroll span {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.5);
}

.maint-hero__scroll-line {
  width: 1px;
  height: 50px;
  background: rgba(255,255,255,0.2);
  position: relative;
  overflow: hidden;
}

.maint-hero__scroll-dot {
  position: absolute;
  width: 100%;
  height: 20px;
  background: rgba(255,255,255,0.8);
  animation: scrollDot 1.5s ease-in-out infinite;
}

@keyframes scrollDot {
  0% { top: -20px; }
  100% { top: 50px; }
}

/* === 02. SCROLL PROGRESS === */
.maint-scroll-progress {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.maint-scroll-progress__track {
  width: 3px;
  height: 100px;
  background: rgba(0,0,0,0.1);
  border-radius: 2px;
  overflow: hidden;
}

.maint-scroll-progress__bar {
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  transform-origin: top;
}

.maint-scroll-progress__label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  color: #888;
}

/* === 03. STATS === */
.maint-stats {
  background: #1a1a1a;
  padding: 3rem 2rem;
}

.maint-stats__container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.maint-stats__item {
  text-align: center;
  min-width: 140px;
}

.maint-stats__item i {
  font-size: 1.25rem;
  color: rgba(255,255,255,0.5);
  margin-bottom: 0.75rem;
  display: block;
}

.maint-stats__value {
  font-family: 'Share Tech Mono', monospace;
  font-size: 2rem;
  color: #faf9f6;
  display: block;
  font-weight: 600;
}

.maint-stats__label {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(250,249,246,0.5);
  margin-top: 0.25rem;
  display: block;
}

/* === 04. PHILOSOPHY === */
.maint-philosophy {
  padding: 6rem 2rem;
  background: #faf9f6;
}

.maint-philosophy__container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.maint-philosophy__headline {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.maint-philosophy__body {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.maint-philosophy__pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.maint-philosophy__pillar {
  text-align: center;
  padding: 1.5rem 1rem;
  background: #fff;
  border: 1px solid #e8e6e2;
}

.maint-philosophy__pillar-icon {
  width: 50px;
  height: 50px;
  background: #1a1a1a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.maint-philosophy__pillar h4 {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.maint-philosophy__pillar p {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
}

.maint-philosophy__visual {
  position: relative;
}

.maint-philosophy__image {
  position: relative;
}

.maint-philosophy__image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.maint-philosophy__image-label {
  position: absolute;
  bottom: -1rem;
  left: 2rem;
  background: #1a1a1a;
  color: #fff;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.maint-philosophy__image-num {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.5);
}

.maint-philosophy__image-label span:last-child {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ========== PARALLAX SECTIONS ========== */
.maint-parallax {
  position: relative;
  height: 400px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.maint-parallax__bg {
  position: absolute;
  inset: -15%;
  z-index: 0;
}

.maint-parallax__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.maint-parallax__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1;
}

.maint-parallax__wave {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 2;
}

.maint-parallax__wave--top {
  top: 0;
}

.maint-parallax__wave--bottom {
  bottom: 0;
}

.maint-parallax__content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: #faf9f6;
}

.maint-parallax__number {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  display: block;
  margin-bottom: 0.5rem;
}

.maint-parallax__label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(250,249,246,0.7);
  display: block;
  margin-bottom: 1rem;
}

.maint-parallax__large {
  font-size: clamp(4rem, 12vw, 9rem);
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.7;
  letter-spacing: 0.05em;
  -webkit-text-stroke: 1px rgba(250,249,246,0.3);
  color: transparent;
}

/* ========== SECTION 6-7: CORE SERVICES ========== */
.maint-core-services {
  background: #ffffff;
  padding: 5rem 2rem;
}

.maint-core-services__header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
}

.maint-core-services__headline {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  margin-bottom: 1rem;
}

.maint-core-services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: #e8e6e2;
  border-radius: 8px;
  overflow: hidden;
  max-width: 900px;
  margin: 0 auto;
}

.maint-core-services__card {
  background: #ffffff;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.maint-core-services__card:hover {
  transform: translateY(-3px);
}

.maint-core-services__num {
  width: 44px;
  height: 44px;
  background: #1a1a1a;
  color: #faf9f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.maint-core-services__text h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
}

.maint-core-services__text p {
  font-size: 0.75rem;
  color: #666;
  margin: 0;
  line-height: 1.4;
}

/* ========== SECTION 8: PARTS BADGE ========== */
.maint-badge {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #ffffff;
}

.maint-badge__inner {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid #e8e6e2;
  border-radius: 4px;
  font-size: 0.8rem;
}

.maint-badge__label {
  color: #666;
}

.maint-badge__tag {
  background: #1a1a1a;
  color: #faf9f6;
  padding: 0.25rem 0.75rem;
  border-radius: 2px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
}

@media (max-width: 768px) {
  .maint-core-services__grid {
    grid-template-columns: 1fr;
  }
}

/* ========== SECTIONS 11-13: CERTIFICATIONS ========== */
.maint-cert {
  padding: 4rem 2rem;
}

.maint-cert__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
  align-items: center;
}

.maint-cert__image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.maint-cert__image img {
  max-width: 200px;
  height: auto;
}

.maint-cert__content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem;
}

.maint-cert__content p {
  color: #666;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.maint-cert__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.maint-cert__list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.maint-cert__list li::before {
  content: '\u2713';
  position: absolute;
  left: 0;
  color: #1a1a1a;
}

@media (max-width: 768px) {
  .maint-cert__grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

/* ========== SECTION 14: LOGOS STRIP ========== */
.maint-logos {
  background: #ffffff;
  padding: 3rem 2rem;
}

.maint-logos__container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.maint-logos__item {
  filter: grayscale(100%);
  opacity: 0.6;
  transition: all 0.3s ease;
}

.maint-logos__item:hover {
  filter: grayscale(0%);
  opacity: 1;
}

.maint-logos__item img {
  height: 50px;
  width: auto;
}

/* ========== SECTION 17: AIRCRAFT CARDS ========== */
.maint-aircraft {
  padding: 0 2rem 5rem;
}

.maint-aircraft__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
}

.maint-aircraft__card {
  border-left: 3px solid #1a1a1a;
  padding-left: 1rem;
}

.maint-aircraft__image {
  aspect-ratio: 4/3;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.maint-aircraft__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.maint-aircraft__card:hover .maint-aircraft__image img {
  transform: scale(1.05);
}

.maint-aircraft__model {
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.maint-aircraft__notes {
  font-size: 0.75rem;
  color: #888;
}

@media (max-width: 900px) {
  .maint-aircraft__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .maint-aircraft__grid {
    grid-template-columns: 1fr;
  }
}

/* ========== SECTION 18-19: TEAM ========== */
.maint-team {
  padding: 5rem 2rem;
  background: #faf9f6;
}

.maint-profile {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  border-left: 3px solid #1a1a1a;
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
}

.maint-profile__image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.maint-profile__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.maint-profile__name {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
}

.maint-profile__title {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #888;
  display: block;
  margin-bottom: 1rem;
}

.maint-profile__stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e8e6e2;
}

.maint-profile__stat-value {
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.25rem;
  display: block;
}

.maint-profile__stat-label {
  font-size: 0.65rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.maint-profile__bio {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 500px) {
  .maint-profile {
    flex-direction: column;
    text-align: center;
  }
  .maint-profile__image {
    margin: 0 auto;
  }
  .maint-profile__stats {
    justify-content: center;
  }
}

.maint-team-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  max-width: 600px;
  margin: 2rem auto 0;
}

.maint-team-member {
  background: #ffffff;
  border-left: 2px solid #1a1a1a;
  padding: 0.75rem 1rem;
  min-width: 140px;
}

.maint-team-member__name {
  font-size: 0.75rem;
  font-weight: 600;
  margin: 0 0 0.1rem;
}

.maint-team-member__role {
  font-size: 0.6rem;
  color: #888;
}

/* === 05. SERVICES === */
.maint-services {
  padding: 4rem 2rem;
  background: #fff;
}

.maint-services__container {
  max-width: 1200px;
  margin: 0 auto;
}

.maint-services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.maint-services__card {
  background: #faf9f6;
  padding: 1.25rem;
  border: 1px solid #e8e6e2;
  transition: all 0.3s ease;
}

.maint-services__card:hover {
  border-color: #1a1a1a;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
}

.maint-services__card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.maint-services__card-num {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  color: #ccc;
}

.maint-services__card-header i {
  font-size: 1rem;
  color: #1a1a1a;
}

.maint-services__card h3 {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 0.5rem;
}

.maint-services__card p {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.maint-services__features {
  list-style: none;
  padding: 0;
  margin: 0 0 0.75rem 0;
}

.maint-services__features li {
  font-size: 0.7rem;
  color: #666;
  padding: 0.2rem 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.maint-services__features li i {
  color: #4ade80;
  font-size: 0.6rem;
}

.maint-services__card-footer {
  padding-top: 0.75rem;
  border-top: 1px solid #e8e6e2;
}

.maint-services__link {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #1a1a1a;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: gap 0.3s ease;
}

/* === 05B. REBUILDS === */
.maint-rebuilds {
  padding: 5rem 2rem;
  background: #faf9f6;
}

.maint-rebuilds__container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: center;
}

.maint-rebuilds__headline {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.maint-rebuilds__body {
  font-size: 1rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.maint-rebuilds__process {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.maint-rebuilds__step {
  flex: 1;
  min-width: 120px;
  text-align: center;
  padding: 1rem;
  background: #fff;
  border: 1px solid #e8e6e2;
}

.maint-rebuilds__step-num {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  color: #ccc;
  display: block;
  margin-bottom: 0.5rem;
}

.maint-rebuilds__step h4 {
  font-size: 0.85rem;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.maint-rebuilds__step p {
  font-size: 0.75rem;
  color: #888;
  margin: 0;
}

.maint-rebuilds__arrow {
  display: flex;
  align-items: center;
  color: #ccc;
  padding-top: 1.5rem;
}

.maint-rebuilds__cta {
  margin-top: 1rem;
}

.maint-rebuilds__visual {
  position: relative;
}

.maint-rebuilds__image-placeholder {
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, #e8e6e2 0%, #d0cdc8 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.maint-rebuilds__image-placeholder i {
  font-size: 3rem;
  color: #999;
}

.maint-rebuilds__image-placeholder span {
  font-size: 0.85rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.maint-rebuilds__image-note {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #1a1a1a;
  color: #fff;
}

.maint-rebuilds__image-note i {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.6);
}

.maint-rebuilds__image-note span {
  font-size: 0.75rem;
}

/* === 05C. WE BUY ANY ROBINSON === */
.maint-webuy {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}

.maint-webuy__container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

.maint-webuy__badge {
  width: 80px;
  height: 80px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.maint-webuy__badge i {
  font-size: 2rem;
  color: #4ade80;
}

.maint-webuy__content h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.maint-webuy__body {
  font-size: 1rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.maint-webuy__features {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.maint-webuy__feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
}

.maint-webuy__feature i {
  color: #4ade80;
  font-size: 0.85rem;
}

.maint-webuy__feature span {
  font-size: 0.85rem;
}

.maint-webuy__cta {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.maint-webuy__phone {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s ease;
}

.maint-webuy__phone:hover {
  color: #fff;
}

.maint-services__link:hover {
  gap: 1rem;
}

/* === 06. TIMELINE === */
.maint-timeline {
  padding: 6rem 2rem;
  background: #1a1a1a;
  overflow: hidden;
}

.maint-timeline__container {
  max-width: 1200px;
  margin: 0 auto;
}

.maint-timeline__track {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 4rem 0;
}

.maint-timeline__line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(255,255,255,0.2);
}

.maint-timeline__item {
  position: relative;
  flex: 1;
  text-align: center;
}

.maint-timeline__item--top .maint-timeline__content {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 2rem;
}

.maint-timeline__item--bottom .maint-timeline__content {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 2rem;
}

.maint-timeline__dot {
  width: 16px;
  height: 16px;
  background: #1a1a1a;
  border: 3px solid #faf9f6;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.maint-timeline__year {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.5);
  display: block;
  margin-bottom: 0.5rem;
}

.maint-timeline__content h4 {
  font-size: 0.9rem;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 0.35rem;
  white-space: nowrap;
}

.maint-timeline__content p {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.6);
  margin: 0;
  max-width: 150px;
}

/* === 07. CERTIFICATIONS === */
.maint-certs {
  padding: 6rem 2rem;
  background: #faf9f6;
}

.maint-certs__container {
  max-width: 1000px;
  margin: 0 auto;
}

.maint-certs__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.maint-certs__grid--two {
  grid-template-columns: repeat(2, 1fr);
  max-width: 700px;
  margin: 0 auto;
}

.maint-certs__card {
  background: #fff;
  padding: 2rem 1.5rem;
  text-align: center;
  border: 1px solid #e8e6e2;
  transition: all 0.3s ease;
}

.maint-certs__card:hover {
  border-color: #1a1a1a;
}

.maint-certs__logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.maint-certs__logo img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.maint-certs__logo-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #ccc;
}

.maint-certs__card h4 {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.maint-certs__card p {
  font-size: 0.75rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

/* === 08. PROCESS === */
.maint-process {
  padding: 6rem 2rem;
  background: #fff;
}

.maint-process__container {
  max-width: 1200px;
  margin: 0 auto;
}

.maint-process__flow {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0;
  align-items: stretch;
}

.maint-process__flow > * {
  height: 100%;
}

.maint-process__step {
  text-align: center;
  padding: 2rem 1rem;
  position: relative;
  background: #faf9f6;
  border: 1px solid #e8e6e2;
  margin-right: -1px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.maint-process__step-num {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  color: #ccc;
  margin-bottom: 0.75rem;
}

.maint-process__step-icon {
  width: 50px;
  height: 50px;
  background: #1a1a1a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.1rem;
}

.maint-process__step h4 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 0.5rem;
}

.maint-process__step p {
  font-size: 0.75rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
  flex-grow: 1;
}

.maint-process__connector {
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: #fff;
  border: 1px solid #e8e6e2;
  border-radius: 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.maint-process__connector::after {
  content: '→';
  font-size: 0.8rem;
  color: #1a1a1a;
}

/* === 09. TEAM === */
.maint-team {
  padding: 6rem 2rem;
  background: #1a1a1a;
}

.maint-team__container {
  max-width: 1000px;
  margin: 0 auto;
}

.maint-team__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.maint-team__card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 2rem;
  text-align: center;
}

.maint-team__photo {
  margin-bottom: 1.5rem;
}

.maint-team__photo-placeholder {
  width: 80px;
  height: 80px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.maint-team__photo-placeholder i {
  font-size: 2rem;
  color: rgba(255,255,255,0.3);
}

.maint-team__info h4 {
  font-size: 1rem;
  color: #fff;
  margin-bottom: 0.25rem;
}

.maint-team__role {
  display: block;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.35rem;
}

.maint-team__exp {
  display: block;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  margin-bottom: 1rem;
}

.maint-team__certs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.maint-team__cert {
  font-size: 0.6rem;
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.7);
  padding: 0.25rem 0.5rem;
  border-radius: 2px;
}

.maint-team__cta {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.maint-team__cta p {
  color: rgba(255,255,255,0.6);
  font-size: 0.9rem;
}

.maint-team__card--count {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.08);
  border: 1px dashed rgba(255,255,255,0.2);
}

.maint-team__count {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.maint-team__count-plus {
  font-size: 2rem;
  color: rgba(255,255,255,0.5);
  font-weight: 300;
}

.maint-team__count-number {
  font-family: 'Share Tech Mono', monospace;
  font-size: 3.5rem;
  color: #fff;
  font-weight: 600;
  line-height: 1;
}

.maint-team__count-label {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.maint-team__count-label span {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* === 11. FACILITY === */
.maint-facility {
  padding: 6rem 2rem;
  background: #fff;
}

.maint-facility__container {
  max-width: 1200px;
  margin: 0 auto;
}

.maint-facility__gallery {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
}

.maint-facility__gallery > div:first-child {
  grid-row: span 2;
}

.maint-facility__item {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.maint-facility__gallery > div:first-child .maint-facility__item {
  height: 100%;
}

.maint-facility__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.maint-facility__item:hover img {
  transform: scale(1.05);
}

.maint-facility__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: #fff;
}

.maint-facility__overlay h4 {
  font-size: 0.9rem;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.maint-facility__overlay p {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.7);
  margin: 0;
}

/* === 12. EQUIPMENT === */
.maint-equipment {
  padding: 4rem 2rem;
  background: #faf9f6;
  overflow: hidden;
}

.maint-equipment__container {
  max-width: 1200px;
  margin: 0 auto;
}

.maint-equipment__scroll {
  margin-top: 2rem;
  overflow: hidden;
}

.maint-equipment__track {
  display: flex;
  gap: 2rem;
  animation: equipmentScroll 20s linear infinite;
}

@keyframes equipmentScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.maint-equipment__item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fff;
  padding: 1rem 1.5rem;
  border: 1px solid #e8e6e2;
}

.maint-equipment__item i {
  font-size: 1.25rem;
  color: #1a1a1a;
}

.maint-equipment__item span {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

/* === 14. SCHEDULE === */
.maint-schedule {
  padding: 6rem 2rem;
  background: #faf9f6;
}

.maint-schedule__container {
  max-width: 1000px;
  margin: 0 auto;
}

.maint-schedule__table {
  background: #fff;
  border: 1px solid #e8e6e2;
}

.maint-schedule__header {
  display: grid;
  grid-template-columns: 100px 180px 120px 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #1a1a1a;
  color: #fff;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.maint-schedule__row {
  display: grid;
  grid-template-columns: 100px 180px 120px 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e8e6e2;
  align-items: center;
}

.maint-schedule__row:last-child {
  border-bottom: none;
}

.maint-schedule__interval {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
  font-weight: 600;
}

.maint-schedule__work {
  font-size: 0.9rem;
  font-weight: 500;
}

.maint-schedule__duration {
  font-size: 0.85rem;
  color: #666;
}

.maint-schedule__includes {
  font-size: 0.8rem;
  color: #888;
}

.maint-schedule__note {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(0,0,0,0.02);
  border-left: 3px solid #1a1a1a;
}

.maint-schedule__note i {
  color: #1a1a1a;
}

.maint-schedule__note p {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
}

/* === 15. PARTS === */
.maint-parts {
  padding: 6rem 2rem;
  background: #1a1a1a;
}

.maint-parts__container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.maint-parts__content p {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.maint-parts__features {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.maint-parts__feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #fff;
}

.maint-parts__feature i {
  font-size: 1.25rem;
  color: rgba(255,255,255,0.5);
}

.maint-parts__feature span {
  font-size: 0.85rem;
}

.maint-parts__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.maint-parts__item {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 1.5rem;
  text-align: center;
}

.maint-parts__item-cat {
  display: block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.5);
  margin-bottom: 0.5rem;
}

.maint-parts__item-count {
  font-family: 'Share Tech Mono', monospace;
  font-size: 2rem;
  color: #fff;
  font-weight: 600;
}

/* === 16. COMPARISON === */
.maint-comparison {
  padding: 6rem 2rem;
  background: #fff;
}

.maint-comparison__container {
  max-width: 1000px;
  margin: 0 auto;
}

.maint-comparison__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.maint-comparison__card {
  background: #faf9f6;
  border: 1px solid #e8e6e2;
  padding: 2rem;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
}

.maint-comparison__card--highlight {
  background: #1a1a1a;
  color: #fff;
  border-color: #1a1a1a;
  transform: scale(1.05);
}

.maint-comparison__badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #4ade80;
  color: #1a1a1a;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.35rem 0.75rem;
  font-weight: 600;
}

.maint-comparison__card h3 {
  font-size: 1.25rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.maint-comparison__desc {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 1.5rem;
}

.maint-comparison__card--highlight .maint-comparison__desc {
  color: rgba(255,255,255,0.6);
}

.maint-comparison__card ul {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  text-align: left;
}

.maint-comparison__card li {
  font-size: 0.85rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.maint-comparison__card--highlight li {
  border-color: rgba(255,255,255,0.1);
}

.maint-comparison__card li i {
  color: #4ade80;
  font-size: 0.7rem;
}

/* === 17. FAQ === */
.maint-faq {
  padding: 6rem 2rem;
  background: #faf9f6;
}

.maint-faq__container {
  max-width: 800px;
  margin: 0 auto;
}

.maint-faq__list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.maint-faq__item {
  background: #fff;
  border: 1px solid #e8e6e2;
  margin-bottom: -1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.maint-faq__item:hover {
  background: #fefefe;
}

.maint-faq__item--open {
  border-color: #1a1a1a;
  z-index: 1;
}

.maint-faq__question {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.25rem 1.5rem;
}

.maint-faq__num {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: #ccc;
}

.maint-faq__question h4 {
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0;
}

.maint-faq__toggle {
  font-size: 1.5rem;
  color: #888;
}

.maint-faq__answer {
  overflow: hidden;
}

.maint-faq__answer p {
  padding: 0 1.5rem 1.5rem 4rem;
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.7;
}

/* === 18. CONTACT CTA === */
.maint-contact-cta {
  padding: 6rem 2rem;
  background: #fff;
}

.maint-contact-cta__container {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.maint-contact-cta__content h2 {
  font-size: clamp(2rem, 4vw, 2.5rem);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.maint-contact-cta__content p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
}

.maint-contact-cta__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.maint-contact-cta__card {
  background: #faf9f6;
  padding: 2rem;
  border: 1px solid #e8e6e2;
}

.maint-contact-cta__item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e8e6e2;
}

.maint-contact-cta__item:last-child {
  border-bottom: none;
}

.maint-contact-cta__item i {
  font-size: 1.25rem;
  color: #1a1a1a;
  width: 24px;
}

.maint-contact-cta__item h4 {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.35rem;
}

.maint-contact-cta__item p {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

/* === 19. TRUST === */
.maint-trust {
  padding: 3rem 2rem;
  background: #faf9f6;
  border-top: 1px solid #e8e6e2;
}

.maint-trust__container {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.maint-trust__label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #888;
  margin-bottom: 2rem;
  display: block;
}

.maint-trust__logos {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.maint-trust__logo {
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.maint-trust__logo:hover {
  opacity: 1;
}

.maint-trust__logo-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.maint-trust__logo-placeholder i {
  font-size: 2rem;
  color: #ccc;
}

.maint-trust__logo-placeholder span {
  font-size: 0.7rem;
  color: #999;
}

/* === 20. EMERGENCY === */
.maint-emergency {
  padding: 2rem;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
}

.maint-emergency__container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.maint-emergency__icon {
  width: 60px;
  height: 60px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.maint-emergency__icon i {
  font-size: 1.5rem;
  color: #fff;
}

.maint-emergency__content {
  flex: 1;
}

.maint-emergency__content h3 {
  color: #fff;
  font-size: 1.25rem;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.maint-emergency__content p {
  color: rgba(255,255,255,0.8);
  font-size: 0.9rem;
  margin: 0;
}

.maint-emergency__phone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: #fff;
  padding: 1rem 2rem;
  text-decoration: none;
  color: #1a1a1a;
  transition: transform 0.3s ease;
}

.maint-emergency__phone:hover {
  transform: scale(1.05);
}

.maint-emergency__phone i {
  font-size: 1.25rem;
}

.maint-emergency__phone span {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888;
}

.maint-emergency__phone strong {
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;
}

/* === RESPONSIVE === */
@media (max-width: 1024px) {
  .maint-philosophy__container,
  .maint-parts__container,
  .maint-contact-cta__container,
  .maint-rebuilds__container {
    grid-template-columns: 1fr;
  }

  .maint-services__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .maint-team__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .maint-process__flow {
    grid-template-columns: repeat(3, 1fr);
  }

  .maint-certs__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .maint-timeline__track {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
  }

  .maint-timeline__line {
    display: none;
  }

  .maint-timeline__item--top .maint-timeline__content,
  .maint-timeline__item--bottom .maint-timeline__content {
    position: static;
    transform: none;
    padding: 0;
  }

  .maint-timeline__dot {
    display: none;
  }

  .maint-webuy__container {
    flex-direction: column;
    text-align: center;
  }

  .maint-webuy__features {
    justify-content: center;
  }

  .maint-webuy__cta {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .maint-services__grid,
  .maint-team__grid,
  .maint-comparison__grid {
    grid-template-columns: 1fr;
  }

  .maint-process__flow {
    grid-template-columns: repeat(2, 1fr);
  }

  .maint-process__connector {
    display: none;
  }

  .maint-philosophy__pillars {
    grid-template-columns: 1fr;
  }

  .maint-facility__gallery {
    grid-template-columns: 1fr;
  }

  .maint-facility__gallery > div:first-child {
    grid-row: auto;
  }

  .maint-schedule__header,
  .maint-schedule__row {
    grid-template-columns: 80px 1fr;
  }

  .maint-schedule__duration,
  .maint-schedule__includes {
    display: none;
  }

  .maint-comparison__card--highlight {
    transform: none;
  }

  .maint-rebuilds__process {
    flex-direction: column;
  }

  .maint-rebuilds__arrow {
    transform: rotate(90deg);
    padding: 0;
  }

  .maint-certs__grid--two {
    grid-template-columns: 1fr;
  }

  .maint-scroll-progress {
    display: none;
  }

  .maint-emergency__container {
    flex-direction: column;
    text-align: center;
  }
}
`;

// ============================================
// MAIN COMPONENT
// ============================================

function FinalMaintenance() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="maint">
      <style>{styles}</style>
      <MaintenanceHeader />

      {/* 01 */ } <HeroSection />
      {/* 02 */ } <ScrollProgress />
      {/* 03 */ } <StatsStrip />
      {/* 04 */ } <PhilosophySection />

      {/* ========== SECTION 5: PARALLAX - HANGAR ========== */}
      <ParallaxSection
        image="/assets/images/facility/maintenance-hangar.jpg"
        number="01"
        label="Factory Trained"
        largeText="MAINTENANCE"
      />

      {/* ========== SECTION 6-7: CORE SERVICES ========== */}
      <section className="maint-core-services">
        <div className="maint-core-services__header">
          <Reveal>
            <span className="maint-pre-text">Our Services</span>
            <h2 className="maint-core-services__headline">
              <span className="maint-text--dark">9 </span>
              <span className="maint-text--mid">Core </span>
              <span className="maint-text--light">Services</span>
            </h2>
            <p className="maint-body" style={{ margin: '0 auto' }}>
              Comprehensive maintenance solutions for Robinson and Guimbal helicopters,
              delivered by factory-trained engineers using genuine parts.
            </p>
          </Reveal>
        </div>

        <div className="maint-core-services__grid">
          {[
            { num: '01', title: '50-Hour Inspections', desc: 'Routine checks to maintain airworthiness' },
            { num: '02', title: '100-Hour Inspections', desc: 'Comprehensive scheduled maintenance' },
            { num: '03', title: 'Annual Inspections', desc: 'Full yearly airworthiness review' },
            { num: '04', title: '2200-Hour Overhauls', desc: 'Complete engine and component overhaul' },
            { num: '05', title: 'Component Repairs', desc: 'Expert repair of all aircraft systems' },
            { num: '06', title: 'Avionics Services', desc: 'Navigation, communication, and displays' },
            { num: '07', title: 'Pre-Purchase Inspections', desc: 'Thorough evaluation before purchase' },
            { num: '08', title: 'AOG Support', desc: 'Emergency Aircraft on Ground assistance' },
            { num: '09', title: 'Refurbishment', desc: 'Interior and exterior restoration' },
          ].map((service, i) => (
            <Reveal key={service.num} delay={i * 0.05}>
              <div className="maint-core-services__card">
                <span className="maint-core-services__num">{service.num}</span>
                <div className="maint-core-services__text">
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========== SECTION 8: PARTS BADGE ========== */}
      <div className="maint-badge">
        <Reveal>
          <div className="maint-badge__inner">
            <span className="maint-badge__label">All Services Include</span>
            <span className="maint-badge__tag">GENUINE PARTS</span>
          </div>
        </Reveal>
      </div>

      {/* ========== SECTION 9: PARALLAX - EXPERTISE ========== */}
      <ParallaxSection
        image="/assets/images/facility/engineer-working.jpg"
        number="02"
        label="Expert Team"
        largeText="EXPERTISE"
      />

      {/* ========== SECTION 10: CERTIFICATIONS HEADER ========== */}
      <section className="maint-section">
        <div className="maint-container maint-container--narrow" style={{ textAlign: 'center' }}>
          <Reveal>
            <span className="maint-pre-text">Approved & Certified</span>
            <h2 className="maint-headline">
              <span className="maint-text--dark">Industry </span>
              <span className="maint-text--mid">Leading </span>
              <span className="maint-text--light">Standards</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 11: EASA PART 145 ========== */}
      <section className="maint-cert">
        <div className="maint-cert__grid">
          <Reveal direction="left">
            <div className="maint-cert__image">
              <img src="/assets/images/logos/easa-logo.png" alt="EASA Part 145" />
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="maint-cert__content">
              <h3>EASA Part 145 Maintenance Organisation</h3>
              <p>
                HQ Aviation operates a fully EASA Part 145 approved maintenance facility
                at Denham Aerodrome. This certification represents the highest European
                standard for aircraft maintenance.
              </p>
              <ul className="maint-cert__list">
                <li>Approved maintenance procedures</li>
                <li>Quality management system</li>
                <li>Continuous airworthiness management</li>
                <li>Trained and qualified personnel</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 12: ROBINSON AUTHORIZED ========== */}
      <section className="maint-cert maint-section--alt">
        <div className="maint-cert__grid" style={{ direction: 'rtl' }}>
          <Reveal direction="right">
            <div className="maint-cert__content" style={{ direction: 'ltr' }}>
              <span className="maint-pre-text">Factory Authorized</span>
              <h3>Robinson Helicopter Company Service Centre</h3>
              <p>
                As a Robinson Authorized Service Centre, we are approved to perform
                all maintenance, repairs, and overhauls on R22, R44, and R66 helicopters.
                Our technicians complete regular factory training at Robinson's California facility.
              </p>
            </div>
          </Reveal>
          <Reveal direction="left">
            <div className="maint-cert__image" style={{ direction: 'ltr' }}>
              <img src="/assets/images/logos/robinson-authorized.png" alt="Robinson Authorized" />
              <span className="maint-pre-text" style={{ marginTop: '1rem' }}>Since 1990</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 13: GUIMBAL CERTIFIED ========== */}
      <section className="maint-cert">
        <div className="maint-cert__grid">
          <Reveal direction="left">
            <div className="maint-cert__image">
              <img src="/assets/images/logos/guimbal-logo.png" alt="Guimbal" />
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="maint-cert__content">
              <span className="maint-pre-text">Certified Centre</span>
              <h3>Guimbal Cabri G2 Service Centre</h3>
              <p>
                We are proud to be one of the UK's certified Guimbal Cabri G2 service
                centres. The Cabri G2 has become increasingly popular for training,
                and our technicians have completed comprehensive factory training.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 14: LOGOS STRIP ========== */}
      <section className="maint-logos">
        <div className="maint-logos__container">
          {['easa', 'robinson', 'guimbal', 'caa'].map((logo, i) => (
            <Reveal key={logo} delay={i * 0.1}>
              <div className="maint-logos__item">
                <img src={`/assets/images/logos/${logo}-logo.png`} alt={logo.toUpperCase()} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========== SECTION 15: PARALLAX - FLEET ========== */}
      <ParallaxSection
        image="/assets/images/facility/hq-aviation-robinsons.jpg"
        number="03"
        label="Supported Models"
        largeText="FLEET"
      />

      {/* ========== SECTION 16: AIRCRAFT HEADER ========== */}
      <section className="maint-section">
        <div className="maint-container maint-container--narrow" style={{ textAlign: 'center' }}>
          <Reveal>
            <span className="maint-pre-text">Supported Aircraft</span>
            <h2 className="maint-headline">
              <span className="maint-text--dark">Robinson </span>
              <span className="maint-text--mid">& </span>
              <span className="maint-text--light">Guimbal</span>
            </h2>
            <p className="maint-body" style={{ margin: '0 auto' }}>
              We provide full maintenance support for the complete Robinson range
              and Guimbal Cabri G2.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 17: AIRCRAFT CARDS ========== */}
      <section className="maint-aircraft">
        <div className="maint-aircraft__grid">
          {[
            { model: 'Robinson R22', image: '/assets/images/new-aircraft/r22-beta.webp', notes: 'Beta II, all variants' },
            { model: 'Robinson R44', image: '/assets/images/new-aircraft/r44-raven.webp', notes: 'Raven, Cadet, Clipper' },
            { model: 'Robinson R66', image: '/assets/images/new-aircraft/r66-turbine.webp', notes: 'Turbine expertise' },
            { model: 'Guimbal Cabri G2', image: '/assets/images/new-aircraft/cabri-g2.webp', notes: 'Certified centre' },
          ].map((a, i) => (
            <Reveal key={a.model} delay={i * 0.1}>
              <div className="maint-aircraft__card">
                <div className="maint-aircraft__image">
                  <img src={a.image} alt={a.model} />
                </div>
                <div className="maint-aircraft__model">{a.model}</div>
                <div className="maint-aircraft__notes">{a.notes}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========== SECTION 18: CHIEF ENGINEER ========== */}
      <section className="maint-team">
        <Reveal>
          <div className="maint-profile">
            <div className="maint-profile__image">
              <img src="/assets/images/team/engineer-chief.jpg" alt="Chief Engineer" />
            </div>
            <div className="maint-profile__content">
              <h3 className="maint-profile__name">David Cross</h3>
              <span className="maint-profile__title">Chief Engineer</span>
              <div className="maint-profile__stats">
                <div>
                  <span className="maint-profile__stat-value"><AnimatedNumber value={30} />+</span>
                  <span className="maint-profile__stat-label">Years Experience</span>
                </div>
                <div>
                  <span className="maint-profile__stat-value"><AnimatedNumber value={500} />+</span>
                  <span className="maint-profile__stat-label">Overhauls Completed</span>
                </div>
              </div>
              <p className="maint-profile__bio">
                David has been with HQ Aviation since 1995 and leads our team of factory-trained
                engineers. His expertise spans the complete Robinson range and Guimbal aircraft.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ========== SECTION 19: TEAM GRID ========== */}
        <div className="maint-team-grid">
          {[
            { name: 'James Mitchell', role: 'Licensed Engineer' },
            { name: 'Robert Taylor', role: 'Licensed Engineer' },
            { name: 'Sarah Williams', role: 'Avionics Specialist' },
            { name: 'Tom Anderson', role: 'Engineering Apprentice' },
          ].map((member, i) => (
            <Reveal key={member.name} delay={i * 0.1}>
              <div className="maint-team-member">
                <div className="maint-team-member__name">{member.name}</div>
                <div className="maint-team-member__role">{member.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 05 */ } <ServicesGrid />
      {/* 05B */} <RebuildsSection />
      {/* 05C */} <WeBuySection />
      {/* 06 */ } <Timeline />
      {/* 07 */ } <CertificationBadges />
      {/* 08 */ } <ProcessFlow />
      {/* 09 */ } <TeamProfiles />
      {/* 11 */ } <FacilityShowcase />
      {/* 12 */ } <EquipmentGallery />
      {/* 14 */ } <MaintenanceSchedule />
      {/* 15 */ } <PartsInventory />
      {/* 16 */ } <ServiceComparison />
      {/* 17 */ } <FAQAccordion />
      {/* 18 */ } <ContactCTA />
      {/* 19 */ } <TrustIndicators />
      {/* 20 */ } <EmergencySupport />

      <FooterMinimal />
    </div>
  );
}

export default FinalMaintenance;
