/**
 * FINAL MAINTENANCE PAGE
 *
 * Brand: Luxury Minimal Aviation
 * Typography: Space Grotesk + Share Tech Mono
 * Colors: #faf9f6 (warm white), #1a1a1a (charcoal)
 * 30 Sections - Immersive Brand Experience
 */

import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

import '../assets/css/main.css';
import '../assets/css/components.css';
import FooterMinimal from '../components/FooterMinimal';

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

  return <span ref={ref}>{count}{suffix}</span>;
}

// Header with spotlight animation
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
      {/* Menu Panel */}
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
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Flight Training</h3>
            <ul>
              <li><Link to="/training" onClick={closeMenu}>Training Overview</Link></li>
              <li><Link to="/training/ppl" onClick={closeMenu}>Private Pilot License</Link></li>
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Services</h3>
            <ul>
              <li><Link to="/services" onClick={closeMenu}>Services Overview</Link></li>
              <li><Link to="/maintenance" onClick={closeMenu}>Maintenance</Link></li>
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
              />
            </Link>
            <nav className="Header-nav Header-nav--secondary" data-nc-element="secondary-nav">
              <div className="Header-nav-inner">
                <Link to="/training" className="Header-nav-item">Training</Link>
                <Link to="/sales" className="Header-nav-item">Aircraft</Link>
                <Link to="/maintenance" className="Header-nav-item">Maintenance</Link>
              </div>
            </nav>
          </div>
          <div data-nc-container="top-right"></div>
        </div>
      </header>
    </>
  );
}

const styles = `
/* ========================================
   MAINTENANCE PAGE STYLES
   CSS Prefix: .maint-
   ======================================== */

/* Base Reset & Typography */
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

/* Typography Utilities */
.maint-pre-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 1rem;
  display: block;
}

.maint-headline {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 600;
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
}

.maint-text--dark { color: #1a1a1a; }
.maint-text--mid { color: #4a4a4a; }
.maint-text--light { color: #7a7a7a; }

.maint-body {
  font-size: 1rem;
  color: #666;
  max-width: 600px;
  line-height: 1.7;
}

/* Section Spacing */
.maint-section {
  padding: 5rem 2rem;
}

.maint-section--dark {
  background: #1a1a1a;
  color: #faf9f6;
}

.maint-section--alt {
  background: #ffffff;
}

.maint-container {
  max-width: 1200px;
  margin: 0 auto;
}

.maint-container--narrow {
  max-width: 800px;
}

/* Shared Components */
.maint-divider {
  width: 80px;
  height: 1px;
  background: #1a1a1a;
  margin: 1.5rem 0;
}

.maint-divider--white {
  background: #faf9f6;
}

/* ========== SECTION 1: HERO ========== */
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
    rgba(0,0,0,0.3) 0%,
    rgba(0,0,0,0.5) 50%,
    rgba(0,0,0,0.7) 100%
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
  background: rgba(255,255,255,0.1);
}

.maint-hero__grid-line--v {
  width: 1px;
  height: 100%;
  top: 0;
}

.maint-hero__grid-line--h {
  height: 1px;
  width: 100%;
  left: 0;
}

.maint-hero__content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: #faf9f6;
  padding: 2rem;
}

.maint-hero__label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
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
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}

.maint-hero__word--1 { color: #faf9f6; }
.maint-hero__word--2 { color: rgba(250,249,246,0.7); }
.maint-hero__word--3 { color: rgba(250,249,246,0.5); }

.maint-hero__divider {
  width: 80px;
  height: 1px;
  background: #faf9f6;
  margin: 2rem auto;
  transform-origin: center;
}

.maint-hero__coords {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: rgba(250,249,246,0.6);
}
`;

function FinalMaintenance() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="maint">
      <style>{styles}</style>
      <MaintenanceHeader />

      {/* ========== SECTION 1: HERO ========== */}
      <section className="maint-hero">
        <motion.div
          className="maint-hero__bg"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img src="/assets/images/facility/maintenance-hangar.jpg" alt="" />
        </motion.div>
        <div className="maint-hero__overlay" />

        {/* Animated grid lines */}
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

        <div className="maint-hero__content">
          <motion.span
            className="maint-hero__label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            EASA PART 145 APPROVED
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
            51.5751°N • 0.5059°W
          </motion.span>
        </div>
      </section>

      <FooterMinimal />
    </div>
  );
}

export default FinalMaintenance;
