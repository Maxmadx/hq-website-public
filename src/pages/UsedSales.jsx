/**
 * HQ AVIATION - USED AIRCRAFT SALES PAGE
 * =======================================
 * Brand: Luxury Minimal Aviation
 * Typography: Space Grotesk + Share Tech Mono
 * Colors: #faf9f6 (warm white), #1a1a1a (charcoal)
 */

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import '../assets/css/main.css';
import '../assets/css/components.css';
import FooterMinimal from '../components/FooterMinimal';

// ============================================
// DATA
// ============================================

const usedInventory = [
  { id: 1, model: 'R66 Turbine', year: 2021, hours: 485, price: '£995,000', status: 'Available', image: '/assets/images/used-aircraft/r66/r66-turbine-ghkcc.jpg', features: ['Garmin G500H', 'Leather Interior', 'Air Conditioning'], engine: 'RR300', serial: 'R66-0892' },
  { id: 2, model: 'R44 Raven II', year: 2019, hours: 890, price: '£385,000', status: 'Available', image: '/assets/images/new-aircraft/r44/r44blueprint.jpg', features: ['Garmin GTN 650', 'Blade Tie-Downs', 'Ground Handling Wheels'], engine: 'IO-540', serial: 'R44-14521' },
  { id: 3, model: 'R66 Turbine', year: 2020, hours: 650, price: '£925,000', status: 'Under Offer', image: '/assets/images/used-aircraft/r66/chris-r66-alps.jpg', features: ['NXG Package', 'Pop-Out Floats', 'Enhanced Avionics'], engine: 'RR300', serial: 'R66-0756' },
  { id: 4, model: 'R44 Cadet', year: 2022, hours: 320, price: '£345,000', status: 'Available', image: '/assets/images/new-aircraft/r44/raven-ii-front-alpha.png', features: ['Training Configuration', 'Dual Controls', 'Extended Range'], engine: 'IO-540', serial: 'R44-31205' },
  { id: 5, model: 'R22 Beta II', year: 2018, hours: 1200, price: '£165,000', status: 'Sold', image: '/assets/images/new-aircraft/r22/r22-red-volcano-front-alpha-v3.png', features: ['Training Ready', 'Low Time Engine', 'Fresh Annual'], engine: 'O-360', serial: 'R22-4892' },
  { id: 6, model: 'R44 Raven I', year: 2017, hours: 1450, price: '£295,000', status: 'Available', image: '/assets/images/new-aircraft/r44/r44blueprint.jpg', features: ['Recent Overhaul', 'New Paint', 'Leather Seats'], engine: 'O-540', serial: 'R44-12087' },
];

const recentlySold = [
  { model: 'R66 Turbine', year: 2019, price: '£885,000', soldDate: 'Jan 2024' },
  { model: 'R44 Raven II', year: 2020, price: '£395,000', soldDate: 'Dec 2023' },
  { model: 'R22 Beta II', year: 2019, price: '£175,000', soldDate: 'Dec 2023' },
  { model: 'R44 Cadet', year: 2021, price: '£335,000', soldDate: 'Nov 2023' },
];

// Aircraft specs for comparison tool
const aircraftSpecs = [
  {
    model: 'R66 Turbine',
    seats: 5,
    engine: 'RR300 Turbine',
    maxSpeed: '140 kts',
    cruiseSpeed: '110 kts',
    range: '350 nm',
    endurance: '3.0 hrs',
    usefulLoad: '1,200 lbs',
    fuelCapacity: '73.4 gal',
    hasAuxTank: true,
    auxTankSpecs: {
      range: '400 nm',
      endurance: '3.5 hrs',
      fuelCapacity: '91.5 gal'
    }
  },
  {
    model: 'R44 Raven II',
    seats: 4,
    engine: 'IO-540 Piston',
    maxSpeed: '130 kts',
    cruiseSpeed: '110 kts',
    range: '300 nm',
    endurance: '3.0 hrs',
    usefulLoad: '882 lbs',
    fuelCapacity: '48.5 gal'
  },
  {
    model: 'R44 Raven I',
    seats: 4,
    engine: 'O-540 Piston',
    maxSpeed: '130 kts',
    cruiseSpeed: '105 kts',
    range: '300 nm',
    endurance: '3.0 hrs',
    usefulLoad: '800 lbs',
    fuelCapacity: '48.5 gal'
  },
  {
    model: 'R44 Cadet',
    seats: 2,
    engine: 'IO-540 Piston',
    maxSpeed: '130 kts',
    cruiseSpeed: '110 kts',
    range: '350 nm',
    endurance: '3.5 hrs',
    usefulLoad: '770 lbs',
    fuelCapacity: '48.5 gal'
  },
  {
    model: 'R22 Beta II',
    seats: 2,
    engine: 'O-360 Piston',
    maxSpeed: '102 kts',
    cruiseSpeed: '96 kts',
    range: '185 nm',
    endurance: '2.5 hrs',
    usefulLoad: '400 lbs',
    fuelCapacity: '26.4 gal'
  },
];

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
    visible: { opacity: 1, y: 0, x: 0 },
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

// ============================================
// COMPONENT 00: HEADER
// ============================================

function UsedSalesHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`hq-menu-panel ${menuOpen ? 'open' : ''}`}>
        <div className="hq-menu-grid">
          <div className="hq-menu-section">
            <h3>Aircraft Sales</h3>
            <ul>
              <li><Link to="/sales" onClick={() => setMenuOpen(false)}>New Aircraft</Link></li>
              <li><Link to="/used-sales" onClick={() => setMenuOpen(false)}>Pre-Owned</Link></li>
            </ul>
          </div>
          <div className="hq-menu-section">
            <h3>Services</h3>
            <ul>
              <li><Link to="/maintenance" onClick={() => setMenuOpen(false)}>Maintenance</Link></li>
              <li><Link to="/training" onClick={() => setMenuOpen(false)}>Training</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <button
        className={`hq-menu-btn ${scrolled ? 'color-dark scrolled' : ''} ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span><span></span><span></span>
      </button>
      <header className={`Header Header--top ${scrolled ? 'Header--scrolled' : ''}`}>
        <div className="Header-inner Header-inner--top" data-nc-group="top">
          <div data-nc-container="top-center">
            <Link to="/" className="Header-branding">
              <img src="/assets/images/logos/hq/hq-aviation-logo-black.png" alt="HQ Aviation" className="Header-branding-logo" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

// ============================================
// COMPONENT 01: USED HERO
// ============================================

function UsedHero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={heroRef} className="used-hero">
      <motion.div className="used-hero__bg" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }}>
        <img src="/assets/images/used-aircraft/r66/chris-r66-alps.jpg" alt="" />
      </motion.div>
      <div className="used-hero__overlay" />
      <motion.div className="used-hero__content" style={{ opacity: heroOpacity, scale: heroScale }}>
        <motion.span className="used-hero__label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          PRE-OWNED AIRCRAFT
        </motion.span>
        <div className="used-hero__headline">
          <motion.span className="used-hero__word used-hero__word--1" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>PRE-OWNED</motion.span>
        </div>
        <motion.div className="used-hero__divider" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.8 }} />
        <motion.p className="used-hero__sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          Meticulously inspected. Fully documented. Ready to fly.
        </motion.p>
      </motion.div>
      <div className="used-hero__scroll">
        <span>SCROLL</span>
        <div className="used-hero__scroll-line"><div className="used-hero__scroll-dot" /></div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 02: WHY BUY USED (Compact)
// ============================================

function WhyBuyUsed() {
  const benefits = [
    { icon: 'fa-clock', title: 'Immediate Availability', desc: 'No factory wait times. Take ownership in weeks, not months.' },
    { icon: 'fa-shield-alt', title: 'HQ Quality Inspection', desc: 'Every aircraft undergoes our rigorous inspection process.' },
  ];

  return (
    <section className="used-why">
      <div className="used-why__container">
        <div className="used-why__benefits">
          {benefits.map((b, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="used-why__benefit">
                <div className="used-why__benefit-icon"><i className={`fas ${b.icon}`}></i></div>
                <div className="used-why__benefit-text">
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
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
// COMPONENT 03: INVENTORY GRID
// ============================================

function InventoryGrid() {
  const availableAircraft = usedInventory.filter(a => a.status === 'Available');

  return (
    <section className="used-inventory">
      <div className="used-inventory__container">
        <Reveal>
          <div className="used-section-header">
            <span className="used-pre-text">Current Stock</span>
            <h2><span className="used-text--dark">Available </span><span className="used-text--mid">Aircraft</span></h2>
          </div>
        </Reveal>
        <div className="used-inventory__grid">
          {availableAircraft.map((aircraft, i) => (
            <motion.div key={aircraft.id} className="used-inventory__card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <div className="used-inventory__image">
                <img src={aircraft.image} alt={aircraft.model} />
              </div>
              <div className="used-inventory__info">
                <div className="used-inventory__header">
                  <h4>{aircraft.model}</h4>
                  <span className="used-inventory__year">{aircraft.year}</span>
                </div>
                <div className="used-inventory__details">
                  <span className="used-inventory__hours">{aircraft.hours.toLocaleString()} hrs</span>
                  <span className="used-inventory__price">{aircraft.price}</span>
                </div>
                <Link to={`/contact?aircraft=${aircraft.id}`} className="used-btn used-btn--outline used-btn--small">Enquire</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 05: REBUILD PROGRAM INTEREST
// ============================================

function RebuildProgramInterest() {
  return (
    <section className="used-rebuild">
      <div className="used-rebuild__container">
        <Reveal>
          <div className="used-rebuild__icon"><i className="fas fa-sync-alt"></i></div>
          <h2><span className="used-text--dark">Rebuild </span><span className="used-text--mid">Program</span></h2>
          <p className="used-rebuild__body">
            Consider registering interest in our rebuild program. Get a refurbished aircraft that's
            as-new but using the frame of a timed-out aircraft.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="used-rebuild__features">
            <div className="used-rebuild__feature"><i className="fas fa-check"></i><span>Factory-standard rebuild</span></div>
            <div className="used-rebuild__feature"><i className="fas fa-check"></i><span>New components throughout</span></div>
            <div className="used-rebuild__feature"><i className="fas fa-check"></i><span>Cost-effective alternative</span></div>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <Link to="/contact?subject=rebuild-program" className="used-btn used-btn--primary">Register Interest</Link>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 06: RECENTLY SOLD
// ============================================

function RecentlySoldSection() {
  return (
    <section className="used-sold">
      <div className="used-sold__container">
        <Reveal>
          <div className="used-section-header">
            <span className="used-pre-text">Market Activity</span>
            <h2><span className="used-text--dark">Recently </span><span className="used-text--mid">Sold</span></h2>
            <p>A selection of aircraft we've successfully placed with new owners</p>
          </div>
        </Reveal>
        <div className="used-sold__grid">
          {recentlySold.map((aircraft, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="used-sold__card">
                <div className="used-sold__badge">SOLD</div>
                <h4>{aircraft.model}</h4>
                <div className="used-sold__details">
                  <span>{aircraft.year}</span>
                  <span>{aircraft.price}</span>
                </div>
                <span className="used-sold__date">{aircraft.soldDate}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 07: TRADE-IN PROGRAM
// ============================================

function TradeInProgram() {
  return (
    <section className="used-tradein">
      <div className="used-tradein__container">
        <div className="used-tradein__badge"><i className="fas fa-exchange-alt"></i></div>
        <div className="used-tradein__content">
          <Reveal>
            <span className="used-pre-text used-pre-text--light">Upgrade Path</span>
            <h2><span style={{ color: '#fff' }}>Trade-In </span><span style={{ color: 'rgba(255,255,255,0.7)' }}>Your Aircraft</span></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="used-tradein__body">Looking to upgrade? We offer competitive trade-in valuations on all Robinson helicopters.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="used-tradein__features">
              <div className="used-tradein__feature"><i className="fas fa-check-circle"></i><span>Fair Market Valuations</span></div>
              <div className="used-tradein__feature"><i className="fas fa-check-circle"></i><span>Quick Turnaround</span></div>
              <div className="used-tradein__feature"><i className="fas fa-check-circle"></i><span>All Robinson Models</span></div>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <Link to="/contact?subject=trade-in" className="used-btn used-btn--light">Get Valuation</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 08: ALERT SIGNUP
// ============================================

function AlertSignup() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [preferences, setPreferences] = useState([]);

  return (
    <section className="used-alert">
      <div className="used-alert__container">
        <Reveal>
          <div className="used-alert__icon"><i className="fas fa-bell"></i></div>
          <h2>Get Aircraft Alerts</h2>
          <p>Be the first to know when aircraft matching your criteria become available</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="used-alert__form">
            <div className="used-alert__checkboxes">
              {['R66 Turbine', 'R44 Raven II', 'R44 Cadet', 'R22 Beta II'].map(model => (
                <label key={model} className="used-alert__checkbox">
                  <input type="checkbox" checked={preferences.includes(model)} onChange={(e) => setPreferences(e.target.checked ? [...preferences, model] : preferences.filter(p => p !== model))} />
                  <span>{model}</span>
                </label>
              ))}
            </div>
            <div className="used-alert__fields">
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="used-alert__email" />
              <textarea placeholder="Any specific requirements or notes..." value={message} onChange={(e) => setMessage(e.target.value)} className="used-alert__message" rows={3} />
            </div>
            <button className="used-btn used-btn--primary">Register Interest</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 09: VIRTUAL TOUR CTA (Compact)
// ============================================

function VirtualTourCTA() {
  return (
    <section className="used-tour">
      <div className="used-tour__container">
        <Reveal>
          <span className="used-pre-text">See It First</span>
          <h2><span className="used-text--dark">Schedule </span><span className="used-text--mid">a Viewing</span></h2>
          <p>Visit our facility at Denham Aerodrome or arrange a virtual tour.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <Link to="/contact?subject=viewing" className="used-btn used-btn--primary">Book a Viewing</Link>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 10: COMPARISON TOOL
// ============================================

function ComparisonTool() {
  const [selected, setSelected] = useState([]);
  const [auxTankEnabled, setAuxTankEnabled] = useState(false);

  const toggleSelect = (model) => {
    if (selected.includes(model)) {
      setSelected(selected.filter(s => s !== model));
      if (model === 'R66 Turbine') setAuxTankEnabled(false);
    } else if (selected.length < 3) {
      setSelected([...selected, model]);
    }
  };

  const selectedSpecs = aircraftSpecs.filter(a => selected.includes(a.model));
  const r66Selected = selected.includes('R66 Turbine');

  // Helper to get value, checking for aux tank override
  const getValue = (aircraft, field) => {
    if (auxTankEnabled && aircraft.model === 'R66 Turbine' && aircraft.auxTankSpecs?.[field]) {
      return aircraft.auxTankSpecs[field];
    }
    return aircraft[field];
  };

  return (
    <section className="used-compare">
      <div className="used-compare__container">
        <Reveal>
          <div className="used-section-header">
            <span className="used-pre-text">Decision Tool</span>
            <h2><span className="used-text--dark">Compare </span><span className="used-text--mid">Aircraft</span></h2>
            <p>Select up to 3 aircraft models to compare specifications</p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="used-compare__selector">
            {aircraftSpecs.map(aircraft => (
              <div key={aircraft.model} className="used-compare__chip-wrapper">
                <button className={`used-compare__chip ${selected.includes(aircraft.model) ? 'selected' : ''}`} onClick={() => toggleSelect(aircraft.model)} disabled={!selected.includes(aircraft.model) && selected.length >= 3}>
                  {aircraft.model}
                  {selected.includes(aircraft.model) && <i className="fas fa-check"></i>}
                </button>
                {aircraft.model === 'R66 Turbine' && r66Selected && (
                  <motion.div
                    className="used-compare__aux-dropdown"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="used-compare__aux-label">
                      <input
                        type="checkbox"
                        checked={auxTankEnabled}
                        onChange={(e) => setAuxTankEnabled(e.target.checked)}
                        className="used-compare__aux-checkbox"
                      />
                      <span className="used-compare__aux-check">
                        {auxTankEnabled && <i className="fas fa-check"></i>}
                      </span>
                      <span className="used-compare__aux-text">+ Auxiliary Tank</span>
                    </label>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
        {selectedSpecs.length > 0 && (
          <motion.div className="used-compare__table" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="used-compare__row used-compare__row--header">
              <div className="used-compare__cell">Specification</div>
              {selectedSpecs.map(a => (
                <div key={a.model} className="used-compare__cell">
                  {a.model}
                  {a.model === 'R66 Turbine' && auxTankEnabled && <span className="used-compare__aux-badge">+ AUX</span>}
                </div>
              ))}
            </div>
            <div className="used-compare__row">
              <div className="used-compare__cell used-compare__cell--label">Seats</div>
              {selectedSpecs.map(a => <div key={a.model} className="used-compare__cell">{a.seats}</div>)}
            </div>
            <div className="used-compare__row">
              <div className="used-compare__cell used-compare__cell--label">Engine</div>
              {selectedSpecs.map(a => <div key={a.model} className="used-compare__cell">{a.engine}</div>)}
            </div>
            <div className="used-compare__row">
              <div className="used-compare__cell used-compare__cell--label">Max Speed</div>
              {selectedSpecs.map(a => <div key={a.model} className="used-compare__cell">{a.maxSpeed}</div>)}
            </div>
            <div className="used-compare__row">
              <div className="used-compare__cell used-compare__cell--label">Cruise Speed</div>
              {selectedSpecs.map(a => <div key={a.model} className="used-compare__cell">{a.cruiseSpeed}</div>)}
            </div>
            <div className="used-compare__row">
              <div className="used-compare__cell used-compare__cell--label">Range</div>
              {selectedSpecs.map(a => (
                <div key={a.model} className={`used-compare__cell ${a.model === 'R66 Turbine' && auxTankEnabled ? 'used-compare__cell--highlighted' : ''}`}>
                  {getValue(a, 'range')}
                </div>
              ))}
            </div>
            <div className="used-compare__row">
              <div className="used-compare__cell used-compare__cell--label">Endurance</div>
              {selectedSpecs.map(a => (
                <div key={a.model} className={`used-compare__cell ${a.model === 'R66 Turbine' && auxTankEnabled ? 'used-compare__cell--highlighted' : ''}`}>
                  {getValue(a, 'endurance')}
                </div>
              ))}
            </div>
            <div className="used-compare__row">
              <div className="used-compare__cell used-compare__cell--label">Useful Load</div>
              {selectedSpecs.map(a => <div key={a.model} className="used-compare__cell">{a.usefulLoad}</div>)}
            </div>
            <div className="used-compare__row">
              <div className="used-compare__cell used-compare__cell--label">Fuel Capacity</div>
              {selectedSpecs.map(a => (
                <div key={a.model} className={`used-compare__cell ${a.model === 'R66 Turbine' && auxTankEnabled ? 'used-compare__cell--highlighted' : ''}`}>
                  {getValue(a, 'fuelCapacity')}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ============================================
// COMPONENT 11: FINAL CTA
// ============================================

function FinalCTA() {
  return (
    <section className="used-final-cta">
      <div className="used-final-cta__container">
        <Reveal>
          <h2><span style={{ color: '#fff' }}>Ready to Find </span><span style={{ color: 'rgba(255,255,255,0.7)' }}>Your Aircraft?</span></h2>
          <p>Our team is standing by to help you find the perfect pre-owned helicopter</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="used-final-cta__actions">
            <Link to="/contact" className="used-btn used-btn--light used-btn--large">Contact Sales Team</Link>
            <a href="tel:+441895833838" className="used-final-cta__phone">
              <i className="fas fa-phone"></i>
              <span>Or call directly:</span>
              <strong>+44 (0) 1895 833 838</strong>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================
// STYLES
// ============================================

const styles = `
/* ========================================
   HQ AVIATION USED SALES PAGE
   ======================================== */

/* === BASE === */
.used-sales {
  font-family: 'Space Grotesk', -apple-system, sans-serif;
  background: #faf9f6;
  color: #1a1a1a;
  line-height: 1.6;
  overflow-x: hidden;
}

/* === TYPOGRAPHY === */
.used-pre-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 1rem;
  display: block;
}

.used-pre-text--light { color: rgba(255,255,255,0.6); }
.used-text--dark { color: #1a1a1a; }
.used-text--mid { color: #4a4a4a; }
.used-text--light { color: #7a7a7a; }

.used-section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
}

.used-section-header h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 0.5rem 0;
  line-height: 1.1;
  text-transform: uppercase;
  font-weight: 700;
}

.used-section-header p {
  color: #666;
  font-size: 1rem;
  margin-top: 1rem;
}

/* === BUTTONS === */
.used-btn {
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

.used-btn--primary {
  background: #1a1a1a;
  color: #fff;
  border-color: #1a1a1a;
}

.used-btn--primary:hover {
  background: #333;
  border-color: #333;
}

.used-btn--outline {
  background: transparent;
  color: #1a1a1a;
  border-color: #1a1a1a;
}

.used-btn--outline:hover {
  background: #1a1a1a;
  color: #fff;
}

.used-btn--light {
  background: #fff;
  color: #1a1a1a;
  border-color: #fff;
}

.used-btn--light:hover {
  background: transparent;
  color: #fff;
}

.used-btn--small {
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
}

.used-btn--large {
  padding: 1.25rem 2.5rem;
  font-size: 0.85rem;
}

/* === 01. HERO === */
.used-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.used-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.used-hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.used-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6));
  z-index: 1;
}

.used-hero__content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  padding: 2rem;
}

.used-hero__label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  opacity: 0.7;
  display: block;
  margin-bottom: 1.5rem;
}

.used-hero__headline {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.used-hero__word {
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.used-hero__word--1 { color: #fff; }
.used-hero__word--2 { color: rgba(255,255,255,0.7); }

.used-hero__divider {
  width: 80px;
  height: 2px;
  background: #fff;
  margin: 2rem auto;
  transform-origin: center;
}

.used-hero__sub {
  font-size: 1.1rem;
  opacity: 0.8;
  max-width: 400px;
  margin: 0 auto;
}

.used-hero__scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: #fff;
}

.used-hero__scroll span {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  opacity: 0.6;
}

.used-hero__scroll-line {
  width: 1px;
  height: 50px;
  background: rgba(255,255,255,0.2);
  position: relative;
  overflow: hidden;
}

.used-hero__scroll-dot {
  width: 100%;
  height: 30%;
  background: #fff;
  position: absolute;
  animation: scrollMove 2s ease-in-out infinite;
}

@keyframes scrollMove {
  0%, 100% { top: -30%; }
  50% { top: 100%; }
}

/* === 02. WHY BUY USED (Compact) === */
.used-why {
  padding: 3rem 2rem;
  background: #f0efec;
}

.used-why__container {
  max-width: 900px;
  margin: 0 auto;
}

.used-why__benefits {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.used-why__benefit {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
  max-width: 400px;
}

.used-why__benefit-icon {
  width: 48px;
  height: 48px;
  background: #1a1a1a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  flex-shrink: 0;
}

.used-why__benefit-text h4 {
  font-size: 1rem;
  margin: 0 0 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.used-why__benefit-text p {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .used-why__benefits {
    flex-direction: column;
    align-items: center;
  }
}

/* === 03. FEATURED === */
.used-featured {
  padding: 6rem 2rem;
  background: #fff;
}

.used-featured__container {
  max-width: 1200px;
  margin: 0 auto;
}

.used-featured__grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-top: 2rem;
}

.used-featured__image {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.used-featured__image img {
  width: 100%;
  height: auto;
}

.used-featured__badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #1a1a1a;
  color: #fff;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  padding: 0.5rem 1rem;
}

.used-featured__header h2 {
  font-size: 2rem;
  margin: 0 0 0.25rem;
  text-transform: uppercase;
}

.used-featured__serial {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: #888;
}

.used-featured__specs {
  display: flex;
  gap: 2rem;
  margin: 1.5rem 0;
  padding: 1rem 0;
  border-top: 1px solid #e8e6e2;
  border-bottom: 1px solid #e8e6e2;
}

.used-featured__spec-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888;
  display: block;
}

.used-featured__spec-value {
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.25rem;
  font-weight: 600;
}

.used-featured__features {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.used-featured__features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.used-featured__features i {
  color: #1a1a1a;
  font-size: 0.75rem;
}

.used-featured__price {
  margin: 2rem 0;
}

.used-featured__price-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888;
  display: block;
}

.used-featured__price-value {
  font-family: 'Share Tech Mono', monospace;
  font-size: 2rem;
  font-weight: 700;
}

.used-featured__actions {
  display: flex;
  gap: 1rem;
}

@media (max-width: 900px) {
  .used-featured__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

/* === 04. INVENTORY === */
.used-inventory {
  padding: 6rem 2rem;
  background: #faf9f6;
}

.used-inventory__container {
  max-width: 1200px;
  margin: 0 auto;
}

.used-inventory__filters {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
}

.used-inventory__filter {
  padding: 0.5rem 1.25rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: transparent;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.used-inventory__filter:hover,
.used-inventory__filter.active {
  background: #1a1a1a;
  color: #fff;
  border-color: #1a1a1a;
}

.used-inventory__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.used-inventory__card {
  background: #fff;
  border: 1px solid #e8e6e2;
  overflow: hidden;
  transition: all 0.3s ease;
}

.used-inventory__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.used-inventory__image {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}

.used-inventory__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.used-inventory__card:hover .used-inventory__image img {
  transform: scale(1.05);
}

.used-inventory__status {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  font-size: 0.55rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.35rem 0.65rem;
  border-radius: 2px;
}

.used-inventory__status--available {
  background: rgba(74, 222, 128, 0.9);
  color: #fff;
}

.used-inventory__status--under-offer {
  background: rgba(251, 191, 36, 0.9);
  color: #1a1a1a;
}

.used-inventory__status--sold {
  background: rgba(220, 38, 38, 0.9);
  color: #fff;
}

.used-inventory__info {
  padding: 1.25rem;
}

.used-inventory__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.75rem;
}

.used-inventory__header h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.used-inventory__year {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: #888;
}

.used-inventory__details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e8e6e2;
}

.used-inventory__hours {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: #888;
}

.used-inventory__price {
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;
  font-weight: 700;
}

@media (max-width: 900px) {
  .used-inventory__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .used-inventory__grid { grid-template-columns: 1fr; }
}

/* === 05. REBUILD PROGRAM === */
.used-rebuild {
  padding: 4rem 2rem;
  background: #f0efec;
  text-align: center;
}

.used-rebuild__container {
  max-width: 700px;
  margin: 0 auto;
}

.used-rebuild__icon {
  width: 60px;
  height: 60px;
  background: #1a1a1a;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 1.25rem;
}

.used-rebuild h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  text-transform: uppercase;
  margin: 0 0 1rem;
}

.used-rebuild__body {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.used-rebuild__features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.used-rebuild__feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.used-rebuild__feature i {
  color: #1a1a1a;
}

/* === 06. RECENTLY SOLD === */
.used-sold {
  padding: 6rem 2rem;
  background: #fff;
}

.used-sold__container {
  max-width: 1000px;
  margin: 0 auto;
}

.used-sold__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.used-sold__card {
  background: #faf9f6;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #e8e6e2;
  position: relative;
}

.used-sold__badge {
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  background: #dc2626;
  color: #fff;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0.25rem 0.5rem;
}

.used-sold__card h4 {
  font-size: 0.9rem;
  margin: 0.5rem 0;
  text-transform: uppercase;
}

.used-sold__details {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.used-sold__date {
  font-size: 0.65rem;
  color: #999;
}

@media (max-width: 900px) {
  .used-sold__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 500px) {
  .used-sold__grid { grid-template-columns: 1fr; }
}

/* === 07. TRADE-IN === */
.used-tradein {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}

.used-tradein__container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 3rem;
}

.used-tradein__badge {
  width: 80px;
  height: 80px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.used-tradein__badge i {
  font-size: 1.75rem;
  color: #fff;
}

.used-tradein__content h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin: 0.5rem 0 1rem;
  text-transform: uppercase;
}

.used-tradein__body {
  color: rgba(255,255,255,0.7);
  margin-bottom: 1.5rem;
}

.used-tradein__features {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.used-tradein__feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-size: 0.85rem;
}

.used-tradein__feature i {
  color: rgba(255,255,255,0.5);
}

@media (max-width: 768px) {
  .used-tradein__container {
    flex-direction: column;
    text-align: center;
  }

  .used-tradein__features {
    justify-content: center;
  }
}

/* === 08. ALERT SIGNUP === */
.used-alert {
  padding: 5rem 2rem;
  background: #faf9f6;
  text-align: center;
}

.used-alert__container {
  max-width: 600px;
  margin: 0 auto;
}

.used-alert__icon {
  width: 60px;
  height: 60px;
  background: #1a1a1a;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 1.25rem;
}

.used-alert h2 {
  font-size: 1.5rem;
  text-transform: uppercase;
  margin: 0 0 0.5rem;
}

.used-alert > div > p {
  color: #666;
  margin-bottom: 2rem;
}

.used-alert__form {
  text-align: left;
}

.used-alert__checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.used-alert__checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.85rem;
}

.used-alert__checkbox input {
  width: 18px;
  height: 18px;
  accent-color: #1a1a1a;
}

.used-alert__fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.used-alert__email,
.used-alert__message {
  padding: 0.875rem 1rem;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  background: #fff;
  font-family: inherit;
  width: 100%;
}

.used-alert__message {
  resize: vertical;
}

.used-alert__email:focus,
.used-alert__message:focus {
  outline: none;
  border-color: #1a1a1a;
}

.used-alert__form .used-btn {
  width: 100%;
}

/* === 09. VIRTUAL TOUR (Compact) === */
.used-tour {
  padding: 4rem 2rem;
  background: #f0efec;
  text-align: center;
}

.used-tour__container {
  max-width: 600px;
  margin: 0 auto;
}

.used-tour h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  text-transform: uppercase;
  margin: 0.5rem 0 1rem;
}

.used-tour p {
  color: #666;
  margin-bottom: 1.5rem;
}

/* === 10. COMPARE === */
.used-compare {
  padding: 6rem 2rem;
  background: #fff;
}

.used-compare__container {
  max-width: 1000px;
  margin: 0 auto;
}

.used-compare__selector {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.used-compare__chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #faf9f6;
  border: 1px solid #e8e6e2;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.used-compare__chip:hover:not(:disabled) {
  border-color: #1a1a1a;
}

.used-compare__chip.selected {
  background: #1a1a1a;
  color: #fff;
  border-color: #1a1a1a;
}

.used-compare__chip:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.used-compare__table {
  overflow-x: auto;
}

.used-compare__row {
  display: grid;
  grid-template-columns: 150px repeat(3, 1fr);
  border-bottom: 1px solid #e8e6e2;
}

.used-compare__row--header {
  background: #1a1a1a;
  color: #fff;
  font-weight: 600;
  border-bottom: none;
}

.used-compare__row--header .used-compare__cell {
  border-right-color: rgba(255,255,255,0.1);
}

.used-compare__cell {
  padding: 1rem;
  text-align: center;
  border-right: 1px solid #e8e6e2;
  font-size: 0.85rem;
}

.used-compare__cell:last-child {
  border-right: none;
}

.used-compare__cell--label {
  text-align: left;
  font-weight: 600;
  background: #faf9f6;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.used-compare__row:nth-child(even) .used-compare__cell:not(.used-compare__cell--label) {
  background: #faf9f6;
}

/* Aux Tank Dropdown */
.used-compare__chip-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.used-compare__aux-dropdown {
  overflow: hidden;
}

.used-compare__aux-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.4rem 0.75rem;
  background: #1a1a1a;
  border-radius: 3px;
  transition: all 0.2s ease;
}

.used-compare__aux-label:hover {
  background: #2a2a2a;
}

.used-compare__aux-checkbox {
  display: none;
}

.used-compare__aux-check {
  width: 14px;
  height: 14px;
  border: 1.5px solid rgba(255,255,255,0.5);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.used-compare__aux-check i {
  font-size: 8px;
  color: #fff;
}

.used-compare__aux-checkbox:checked + .used-compare__aux-check {
  background: #fff;
  border-color: #fff;
}

.used-compare__aux-checkbox:checked + .used-compare__aux-check i {
  color: #1a1a1a;
}

.used-compare__aux-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  color: rgba(255,255,255,0.9);
  letter-spacing: 0.03em;
}

.used-compare__aux-badge {
  display: inline-block;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.55rem;
  background: #1a1a1a;
  color: #fff;
  padding: 0.15rem 0.4rem;
  border-radius: 2px;
  margin-left: 0.5rem;
  vertical-align: middle;
}

.used-compare__cell--highlighted {
  background: rgba(26, 26, 26, 0.06) !important;
  font-weight: 600;
  position: relative;
}

.used-compare__cell--highlighted::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #1a1a1a;
}

/* === 11. FINAL CTA === */
.used-final-cta {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  text-align: center;
}

.used-final-cta__container {
  max-width: 700px;
  margin: 0 auto;
}

.used-final-cta h2 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  text-transform: uppercase;
  margin: 0 0 1rem;
}

.used-final-cta p {
  color: rgba(255,255,255,0.7);
  margin-bottom: 2rem;
}

.used-final-cta__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.used-final-cta__phone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;
  color: #fff;
}

.used-final-cta__phone i {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.used-final-cta__phone span {
  font-size: 0.7rem;
  opacity: 0.6;
}

.used-final-cta__phone strong {
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.1rem;
}

/* === RESPONSIVE === */
@media (max-width: 768px) {
  .used-hero__word {
    font-size: clamp(2rem, 12vw, 4rem);
  }
}
`;

// ============================================
// MAIN COMPONENT
// ============================================

function UsedSales() {
  return (
    <div className="used-sales">
      <style>{styles}</style>
      <UsedSalesHeader />
      <UsedHero />
      <WhyBuyUsed />
      <InventoryGrid />
      <RebuildProgramInterest />
      <RecentlySoldSection />
      <TradeInProgram />
      <AlertSignup />
      <VirtualTourCTA />
      <ComparisonTool />
      <FinalCTA />
      <FooterMinimal />
    </div>
  );
}

export default UsedSales;
