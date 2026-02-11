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

// Import all styles - Header/Navigation styles included via main.css
import '../assets/css/main.css';
import '../assets/css/components.css';

// Scroll path animation component
import ScrollPathAnimation from '../components/ScrollPathAnimation';

// Awesome Components
import PrecisionEngineering from '../components/AwesomeComponents/PrecisionEngineering';
import EditorialGrid from '../components/AwesomeComponents/EditorialGrid';

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

function FinalDraft() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [imagesExpanded, setImagesExpanded] = useState(false);
  const [linesVisible, setLinesVisible] = useState(false);
  const [activeNavSection, setActiveNavSection] = useState(null);
  const [navCompact, setNavCompact] = useState(false);
  const [scrollPromptHidden, setScrollPromptHidden] = useState(false);
  const [trainingSlide, setTrainingSlide] = useState(2); // Start on Commercial
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const aboutBtnRef = useRef(null);

  // Training carousel slides
  const trainingSlides = [
    {
      title: 'Discovery Flight',
      image: '/assets/images/gallery/carousel/rotating-4.jpg',
      description: 'Flying is the ultimate dream pursued by mankind. Should you want to live it for real, the discovery flight will certainly fulfil your expectations: After a pre-flight briefing, you will enjoy a full hands-on flying experience with one of our instructors.',
      cta: 'Learn More About DISCOVERY FLIGHT',
      link: '/training/trial-lessons'
    },
    {
      title: 'Private Pilot Licence',
      image: '/assets/images/gallery/carousel/rotating-4.jpg',
      description: 'Let aside the ground exams that most students self study before taking the tests on site, the obtention of a PPL(H) requires a minimum of 45 hrs of flight training, including 10 hrs of solo. The duration varies depending on commitment.',
      cta: 'Learn More About PRIVATE PILOT LICENCE',
      link: '/training/ppl'
    },
    {
      title: 'Commercial Pilot Licence',
      image: '/assets/images/gallery/carousel/rotating-4.jpg',
      description: 'Holding a Commercial Pilot Licence, CPL(H) gives you the status of professional helicopter pilot. To achieve this, 155 hrs of flying time post licence is required, of which 50 hrs must be Pilot In Command (PIC).',
      cta: 'Learn More About COMMERCIAL PILOT LICENCE',
      link: '/training'
    },
    {
      title: 'Type Rating',
      image: '/assets/images/gallery/carousel/rotating-4.jpg',
      description: 'Having achieved your PPL(H), you may wish to fly different types of helicopter. A type specific ground training course followed by a minimum of 5 Hrs of flight training will suffice to put you to the Type Rating test.',
      cta: 'Learn More About TYPE RATING',
      link: '/training'
    },
    {
      title: 'Night Rating',
      image: '/assets/images/gallery/carousel/rotating-4.jpg',
      description: 'Holding a night rating gives you the most flexibility, as sunset will no longer prevent you from flying. To achieve this, 100 hrs of flying post licence is required, of which 60 Hrs must be Pilot In Command.',
      cta: 'Learn More About NIGHT RATING',
      link: '/training'
    },
    {
      title: 'Self-Fly Hire',
      image: '/assets/images/gallery/carousel/rotating-4.jpg',
      description: 'With an impressive fleet of over 30 helicopters, HQ will certainly be able to facilitate your flying requirements, either on a short term hiring or on a long term leasing basis.',
      cta: 'Learn More About SELF-FLY HIRE',
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
      description: 'The Robinson Specialists since 1990',
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
    { id: 'training', label: 'Training', icon: '01' },
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

  // Intersection Observer to switch nav to compact mode
  // Triggers when about button scrolls 500px OFF the top of the viewport
  useEffect(() => {
    if (!aboutBtnRef.current) {
      console.log('ERROR: About button ref not found');
      return;
    }


    const observer = new IntersectionObserver(
      ([entry]) => {
        setNavCompact(!entry.isIntersecting);
      },
      {
        rootMargin: '180px 0px 0px 0px', // Extend detection 180px ABOVE viewport
        threshold: 0
      }
    );

    observer.observe(aboutBtnRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="final-draft" ref={containerRef}>
      {/* ===== HEADER WITH SPOTLIGHT ANIMATION ===== */}
      <FinalDraftHeader />

      {/* ===== HERO SECTION ===== */}
      <section className="fd-hero">
        {/* Animated Grid Lines - hides after hero section */}
        <div className={`fd-hero__grid ${linesVisible ? 'fd-hero__grid--visible' : ''} ${imagesExpanded ? 'fd-hero__grid--hidden' : ''}`}>
          <div className="fd-hero__line fd-hero__line--v1"></div>
          <div className="fd-hero__line fd-hero__line--v2"></div>
          <div className="fd-hero__line fd-hero__line--v3"></div>
          <div className="fd-hero__line fd-hero__line--v4"></div>
          <div className="fd-hero__line fd-hero__line--h1"></div>
          <div className="fd-hero__line fd-hero__line--h2"></div>
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
                {/* Vertical Divider Top */}
                <div className="fd-hero__divider fd-hero__divider--top">
                  <span></span>
                </div>

                {/* Coordinates */}
                <div className="fd-hero__coords">
                  <span>51.5751°N</span>
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

                {/* Vertical Divider Bottom */}
                <div className="fd-hero__divider fd-hero__divider--bottom">
                  <span></span>
                </div>
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
        <div className="fd-about__content">
          <span className="fd-about__label">About Us</span>
          <h2 className="fd-about__headline">
            <span>The Story</span>
            <span>Behind the</span>
            <span>Journey</span>
          </h2>

          <div className="fd-about__video">
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
            Founded in 1990 at Denham Aerodrome, HQ Aviation has grown to become
            the UK's leading Robinson helicopter specialists. Our commitment to
            excellence in training, sales, and maintenance has earned us the trust
            of pilots worldwide.
          </p>

          <Link to="/about" className="fd-about__btn" ref={aboutBtnRef}>
            Learn More
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* ===== HORIZONTAL ACCORDION NAVIGATION ===== */}
      <nav className={`fd-nav ${navCompact ? 'fd-nav--compact' : ''}`} ref={navRef}>
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

      {/* ===== SCROLL PATH ANIMATION ===== */}
      <ScrollPathAnimation
        iconSrc="/assets/images/icons/r66-icon-transparent going right.svg"
        iconSize={60}
        colorStart="#FFFFFF"
        colorMid="#5B9BD5"
        colorEnd="#1E3A5F"
      />

      {/* ===== CONTENT SECTIONS ===== */}
      <section className="fd-section" id="training">
        <div className="fd-section__inner">
          <span className="fd-section__number">01</span>
          <h2 className="fd-section__title">Training</h2>
          <p className="fd-section__text">
            From your first discovery flight to advanced commercial ratings,
            our experienced instructors guide you every step of the way.
          </p>
          <Link to="/training" className="fd-section__link">Explore Training →</Link>
        </div>
      </section>

      <section className="fd-section fd-section--alt" id="fleet">
        <div className="fd-section__inner">
          <span className="fd-section__number">02</span>
          <h2 className="fd-section__title">Fleet</h2>
          <p className="fd-section__text">
            Our meticulously maintained fleet of Robinson helicopters
            represents the pinnacle of rotary-wing aviation.
          </p>
          <Link to="/fleet" className="fd-section__link">View Fleet →</Link>
        </div>
      </section>

      <section className="fd-section" id="expeditions">
        <div className="fd-section__inner">
          <span className="fd-section__number">03</span>
          <h2 className="fd-section__title">Expeditions</h2>
          <p className="fd-section__text">
            Join Captain Q on extraordinary adventures across the globe,
            from the Arctic to Antarctica and everywhere in between.
          </p>
          <Link to="/expeditions" className="fd-section__link">Discover Adventures →</Link>
        </div>
      </section>

      <section className="fd-section fd-section--alt" id="sales">
        <div className="fd-section__inner">
          <span className="fd-section__number">04</span>
          <h2 className="fd-section__title">Aircraft Sales</h2>
          <p className="fd-section__text">
            New and pre-owned Robinson helicopters, expertly sourced
            and prepared to the highest standards.
          </p>
          <Link to="/sales" className="fd-section__link">Browse Aircraft →</Link>
        </div>
      </section>

      <section className="fd-section" id="maintenance">
        <div className="fd-section__inner">
          <span className="fd-section__number">05</span>
          <h2 className="fd-section__title">Maintenance</h2>
          <p className="fd-section__text">
            Robinson Approved Service Centre with factory-trained
            engineers and genuine parts.
          </p>
          <Link to="/maintenance" className="fd-section__link">Our Services →</Link>
        </div>
      </section>

      <section className="fd-section fd-section--alt" id="contact">
        <div className="fd-section__inner">
          <span className="fd-section__number">06</span>
          <h2 className="fd-section__title">Contact</h2>
          <p className="fd-section__text">
            Ready to begin your aviation journey? Get in touch with
            our team at Denham Aerodrome.
          </p>
          <Link to="/contact" className="fd-section__link">Get in Touch →</Link>
        </div>
      </section>

      {/* ===== PRECISION ENGINEERING (Hero 92) ===== */}
      <PrecisionEngineering />

      {/* ===== EDITORIAL GRID (Hero 90) ===== */}
      <EditorialGrid />

      {/* ===== TRAINING CAROUSEL ===== */}
      <section className="fd-carousel-section">
        <div className="fd-carousel-section__header">
          <span className="fd-carousel-section__label">Training</span>
          <h2 className="fd-carousel-section__title">Explore Our Courses</h2>
        </div>

        <div className="hq-service-carousel">
          <div className="hq-tabs-container">
            {trainingSlides.map((slide, index) => (
              <button
                key={index}
                className={`hq-tab ${index === trainingSlide ? 'active' : ''}`}
                onClick={() => setTrainingSlide(index)}
              >
                {slide.title}
              </button>
            ))}
          </div>

          <div className="hq-carousel-body">
            <button
              className="hq-arrow hq-prev"
              onClick={prevTrainingSlide}
            >
              &#10094;
            </button>

            <div className="hq-slides-wrapper">
              {trainingSlides.map((slide, index) => {
                const isPrev = index === (trainingSlide - 1 + trainingSlides.length) % trainingSlides.length;
                const isNext = index === (trainingSlide + 1) % trainingSlides.length;
                return (
                  <div
                    key={index}
                    className={`hq-slide ${index === trainingSlide ? 'active' : ''} ${isNext ? 'next' : ''} ${isPrev ? 'prev' : ''}`}
                    onClick={() => {
                      if (isPrev) prevTrainingSlide();
                      else if (isNext) nextTrainingSlide();
                    }}
                  >
                    <h3>{slide.title}</h3>
                  <img src={slide.image} alt={slide.title} className="hq-slide-img" />
                  <p>{slide.description}</p>
                  <Link to={slide.link} className="hq-btn">{slide.cta}</Link>
                </div>
                );
              })}
            </div>

            <button
              className="hq-arrow hq-next"
              onClick={nextTrainingSlide}
            >
              &#10095;
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="fd-footer">
        <div className="fd-footer__coords">
          <span>51.5751°N</span>
          <span className="fd-footer__divider"></span>
          <span>0.5059°W</span>
        </div>
        <div className="fd-footer__brand">
          <span>HQ Aviation</span>
          <span>Denham Aerodrome, UK</span>
        </div>
        <div className="fd-footer__year">Est. 1990</div>
      </footer>

      <style>{`
        /* ===== BASE STYLES ===== */
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
          pointer-events: none;
          transition: opacity 0.5s ease;
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
        }

        /* Scroll Prompt */
        .fd-hero__scroll-prompt {
          position: fixed;
          bottom: 1.5rem;
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
          padding: 6rem 2rem;
          background: #fff;
        }

        .fd-about__content {
          max-width: 800px;
          text-align: center;
        }

        .fd-about__label {
          display: inline-block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #999;
          margin-bottom: 2rem;
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

        .fd-about__video {
          margin-bottom: 3rem;
        }

        .fd-about__video-placeholder {
          position: relative;
          aspect-ratio: 16/9;
          background: #f0f0f0;
          overflow: hidden;
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
          position: sticky;
          top: 49px;
          z-index: 100;
          background: #fff;
          border-top: 1px solid #e8e6e2;
          border-bottom: 1px solid #e8e6e2;
          padding: 0;
          transition: top 0.3s ease;
        }

        .fd-nav--compact {
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

        .fd-section__inner {
          max-width: 600px;
          text-align: center;
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

        /* ===== CAROUSEL SECTION ===== */
        .fd-carousel-section {
          padding: 6rem 2rem;
          background: #fff;
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

        .fd-carousel-section__title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 700;
          text-transform: uppercase;
          margin: 0;
          color: #1a1a1a;
        }

        /* ===== HQ SERVICE CAROUSEL (from original site) ===== */
        .hq-service-carousel {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          overflow: hidden;
        }

        .hq-tabs-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 20px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 15px;
          position: relative;
          z-index: 20;
          width: 100%;
        }

        .hq-tab {
          background: none;
          border: none;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          padding: 10px 5px;
          color: #888;
          transition: all 0.3s ease;
          font-weight: 600;
          text-align: center;
        }

        .hq-tab:hover {
          color: #000;
        }

        .hq-tab.active {
          color: #000;
          border-bottom: 2px solid #000;
        }

        .hq-carousel-body {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          min-height: 600px;
          width: 100%;
          padding-top: 40px;
          transition: height 0.4s ease-in-out;
        }

        .hq-slides-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .hq-slide {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          opacity: 0;
          transform: translateX(-50%) scale(0.8);
          transition: all 0.5s ease-in-out;
          pointer-events: none;
          z-index: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 15px;
          box-sizing: border-box;
        }

        .hq-slide.active {
          opacity: 1;
          transform: translateX(-50%) scale(1);
          z-index: 10;
          pointer-events: auto;
        }

        .hq-slide.prev {
          opacity: 0.4;
          transform: translateX(-150%) scale(0.9);
          z-index: 5;
          pointer-events: auto;
          cursor: pointer;
        }

        .hq-slide.next {
          opacity: 0.4;
          transform: translateX(50%) scale(0.9);
          z-index: 5;
          pointer-events: auto;
          cursor: pointer;
        }

        .hq-slide h3 {
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 20px;
          font-size: 18px;
        }

        .hq-slide-img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          margin-bottom: 25px;
          border-radius: 4px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .hq-slide p {
          font-size: 15px;
          line-height: 1.6;
          color: #555;
          margin-bottom: 30px;
        }

        .hq-btn {
          font-family: din-condensed-web, 'Helvetica Neue', Arial, sans-serif;
          padding: 21px 34px;
          font-size: 15px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          background-color: transparent;
          color: #222;
          border: 2px solid #222;
          transition: 0.1s background-color linear, 0.1s color linear;
          display: inline-block;
          text-decoration: none;
          cursor: pointer;
          line-height: normal;
          white-space: nowrap;
          margin-bottom: 20px;
        }

        .hq-btn:hover {
          background-color: #222;
          color: #fff;
        }

        .hq-slide .hq-btn {
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .hq-slide.active .hq-btn {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
          transition: opacity 0.3s ease 0.4s, transform 0.3s ease 0.4s, background-color 0.1s linear 0s, color 0.1s linear 0s !important;
        }

        .hq-arrow {
          background: none;
          border: none;
          font-size: 40px;
          font-weight: 100;
          color: #000;
          cursor: pointer;
          padding: 0 10px;
          position: absolute;
          top: 300px;
          transform: translateY(-50%);
          z-index: 20;
          opacity: 0.4;
          transition: all 0.3s ease;
        }

        .hq-arrow:hover {
          opacity: 1;
          color: #333;
        }

        .hq-prev {
          left: 10px;
        }

        .hq-next {
          right: 10px;
        }

        @media (max-width: 768px) {
          .hq-tabs-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-items: center;
            gap: 10px 0;
          }

          .hq-slide {
            width: 90%;
          }

          .hq-slide.prev {
            transform: translateX(-200%) scale(0.8);
            opacity: 0;
          }

          .hq-slide.next {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
          }

          .hq-btn {
            white-space: normal;
            width: 100%;
          }
        }

        /* ===== FOOTER ===== */
        .fd-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3rem;
          background: #1a1a1a;
          color: #fff;
        }

        .fd-footer__coords {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.5);
        }

        .fd-footer__divider {
          width: 20px;
          height: 1px;
          background: rgba(255,255,255,0.3);
        }

        .fd-footer__brand {
          text-align: center;
        }

        .fd-footer__brand span:first-child {
          display: block;
          font-size: 1.25rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          margin-bottom: 0.25rem;
        }

        .fd-footer__brand span:last-child {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.5);
        }

        .fd-footer__year {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.5);
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

          .fd-footer {
            flex-direction: column;
            gap: 2rem;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

export default FinalDraft;
