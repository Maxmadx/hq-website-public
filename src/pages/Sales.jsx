/**
 * HQ AVIATION - AIRCRAFT SALES PAGE
 *
 * Brand: Luxury Minimal Aviation
 * Typography: Space Grotesk + Share Tech Mono
 * Colors: #faf9f6 (warm white), #1a1a1a (charcoal)
 * Aesthetic: Editorial, Luxury Automotive, Aviation Instrumentation
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Import styles
import '../assets/css/main.css';
import '../assets/css/components.css';

// Import footer
import FooterMinimal from '../components/FooterMinimal';

/**
 * SALES PAGE HEADER
 */
function SalesHeader() {
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
              <li><Link to="/sales" onClick={closeMenu}>New Aircraft</Link></li>
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
              <li><Link to="/training/ppl" onClick={closeMenu}>Private Pilot License</Link></li>
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
            <h3>Contact</h3>
            <ul>
              <li><Link to="/contact" onClick={closeMenu}>Contact Us</Link></li>
              <li><Link to="/contact/pricing" onClick={closeMenu}>Pricing</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <button
        className={`hq-menu-btn ${colorDark ? 'color-dark' : ''} ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
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
              />
            </Link>
            <nav className="Header-nav Header-nav--secondary" data-nc-element="secondary-nav">
              <div className="Header-nav-inner">
                <Link to="/flying" className="Header-nav-item">Flying</Link>
                <Link to="/training" className="Header-nav-item">Training</Link>
                <Link to="/sales" className="Header-nav-item">Aircraft</Link>
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
// SECTION METADATA REGISTRY
// ============================================
// Each section has: id, name, category, desc
const sectionRegistry = [
  { id: 'sales-hero', name: 'Hero Banner', category: 'Hero', desc: 'Full-screen flagship R88 hero with stats and CTAs' },
  { id: 'sales-lineup', name: 'Model Lineup', category: 'Fleet', desc: 'Interactive Robinson aircraft selector with specs' },
  { id: 'sales-dealer', name: 'Authorized Dealer', category: 'Trust', desc: 'Robinson dealer credentials and certifications' },
  { id: 'sales-process', name: 'Buying Process', category: 'Process', desc: 'Step-by-step purchase journey timeline' },
  { id: 'sales-used', name: 'Used Aircraft', category: 'Fleet', desc: 'Pre-owned helicopter inventory grid' },
  { id: 'sales-why', name: 'Why HQ Aviation', category: 'Trust', desc: 'Key differentiators and value propositions' },
  { id: 'sales-r88', name: 'R88 Spotlight', category: 'Fleet', desc: 'Dedicated R88 feature section with specs' },
  { id: 'sales-finance', name: 'Financing Options', category: 'Finance', desc: 'Aviation finance packages and rates' },
  { id: 'sales-tradein', name: 'Trade-In Program', category: 'Finance', desc: 'Aircraft trade-in valuation and process' },
  { id: 'sales-compare', name: 'Model Comparison', category: 'Fleet', desc: 'Side-by-side aircraft specification table' },
  { id: 'sales-testimonials', name: 'Customer Testimonials', category: 'Trust', desc: 'Owner reviews and success stories' },
  { id: 'sales-config', name: 'Configuration Options', category: 'Customization', desc: 'Aircraft personalization and options' },
  { id: 'sales-gallery', name: 'Photo Gallery', category: 'Media', desc: 'Helicopter image showcase grid' },
  { id: 'sales-safety', name: 'Safety Features', category: 'Technical', desc: 'Robinson safety systems and training' },
  { id: 'sales-accessories', name: 'Accessories', category: 'Customization', desc: 'Optional equipment and add-ons' },
  { id: 'sales-training', name: 'Owner Training', category: 'Training', desc: 'New owner training programs' },
  { id: 'sales-maintenance', name: 'Maintenance Support', category: 'Services', desc: 'Service plans and support packages' },
  { id: 'sales-deliveries', name: 'Recent Deliveries', category: 'Trust', desc: 'Latest customer handover gallery' },
  { id: 'sales-international', name: 'International Sales', category: 'Global', desc: 'Worldwide delivery and support network' },
  { id: 'sales-insurance', name: 'Insurance Partners', category: 'Finance', desc: 'Aviation insurance options and partners' },
  { id: 'sales-faq', name: 'FAQ Section', category: 'Info', desc: 'Frequently asked questions accordion' },
  { id: 'sales-fleet', name: 'Demo Fleet', category: 'Fleet', desc: 'Available demonstration aircraft' },
  { id: 'sales-timeline', name: 'Company Timeline', category: 'Trust', desc: 'HQ Aviation history and milestones' },
  { id: 'sales-valuation', name: 'Aircraft Valuation', category: 'Finance', desc: 'Free valuation request form' },
  { id: 'sales-events', name: 'Events Calendar', category: 'Info', desc: 'Upcoming shows and open days' },
  { id: 'sales-leaseback', name: 'Leaseback Program', category: 'Finance', desc: 'Revenue generation through leaseback' },
  { id: 'sales-heritage', name: 'Robinson Heritage', category: 'Trust', desc: 'Brand history and legacy' },
  { id: 'sales-paint', name: 'Paint Schemes', category: 'Customization', desc: 'Custom paint and livery options' },
  { id: 'sales-interior', name: 'Interior Options', category: 'Customization', desc: 'Cabin trim and seating choices' },
  { id: 'sales-missions', name: 'Mission Profiles', category: 'Technical', desc: 'Use case scenarios for each model' },
  { id: 'sales-calculator', name: 'Cost Calculator', category: 'Finance', desc: 'Operating cost estimation tool' },
  { id: 'sales-resale', name: 'Resale Values', category: 'Finance', desc: 'Value retention and market trends' },
  { id: 'sales-awards', name: 'Awards & Recognition', category: 'Trust', desc: 'Industry awards and certifications' },
  { id: 'sales-requirements', name: 'Buyer Requirements', category: 'Info', desc: 'License and documentation checklist' },
  { id: 'sales-vs', name: 'Helicopter vs Fixed-Wing', category: 'Info', desc: 'Comparison with other aircraft types' },
  { id: 'sales-environmental', name: 'Environmental', category: 'Technical', desc: 'Emissions and sustainability info' },
  { id: 'sales-video', name: 'Video Showcase', category: 'Media', desc: 'Promotional and walkthrough videos' },
  { id: 'sales-proof', name: 'Social Proof', category: 'Trust', desc: 'Statistics and credentials strip' },
  { id: 'sales-specs', name: 'Technical Specs', category: 'Technical', desc: 'Detailed specification tables' },
  { id: 'sales-network', name: 'Service Network', category: 'Services', desc: 'Authorized service center map' },
  { id: 'sales-hangarage', name: 'Hangarage Options', category: 'Services', desc: 'Storage facilities and pricing' },
  { id: 'sales-inspection', name: 'Pre-Purchase Inspection', category: 'Services', desc: 'Inspection and survey services' },
  { id: 'sales-demo', name: 'Demo Flights', category: 'Experience', desc: 'Test flight booking section' },
  { id: 'sales-customermap', name: 'Customer Map', category: 'Trust', desc: 'Global customer distribution' },
  { id: 'sales-factory', name: 'Factory Tours', category: 'Experience', desc: 'Robinson factory visit information' },
  { id: 'sales-newsletter', name: 'Newsletter Signup', category: 'Engagement', desc: 'Email subscription form' },
  { id: 'sales-avionics', name: 'Avionics Packages', category: 'Technical', desc: 'Glass cockpit and navigation options' },
  { id: 'sales-warranty', name: 'Warranty Options', category: 'Services', desc: 'Extended warranty packages' },
  { id: 'sales-delivery', name: 'Delivery Methods', category: 'Services', desc: 'Collection and ferry options' },
  { id: 'sales-tools', name: 'Flight Planning Tools', category: 'Technical', desc: 'Recommended apps and resources' },
  { id: 'sales-membership', name: 'Owner Membership', category: 'Engagement', desc: 'HQ owner club benefits' },
  { id: 'sales-techsupport', name: 'Technical Support', category: 'Services', desc: 'Support channels and availability' },
  { id: 'sales-exchange', name: 'Component Exchange', category: 'Services', desc: 'Parts exchange program savings' },
  { id: 'sales-schools', name: 'Flight Schools', category: 'Training', desc: 'Partner training organizations' },
  { id: 'sales-upgrade', name: 'Upgrade Paths', category: 'Fleet', desc: 'Aircraft progression recommendations' },
  { id: 'sales-regulatory', name: 'Regulatory Support', category: 'Services', desc: 'Compliance and certification help' },
  { id: 'sales-stories', name: 'Owner Stories', category: 'Trust', desc: 'Customer success case studies' },
  { id: 'sales-consignment', name: 'Consignment Sales', category: 'Finance', desc: 'Sell your aircraft through HQ' },
  { id: 'sales-editions', name: 'Special Editions', category: 'Fleet', desc: 'Limited and special model variants' },
  { id: 'sales-bases', name: 'Operating Bases', category: 'Info', desc: 'Recommended UK airfields' },
  { id: 'sales-carbon', name: 'Carbon Offset', category: 'Technical', desc: 'Environmental offset program' },
  { id: 'sales-management', name: 'Aircraft Management', category: 'Services', desc: 'Full management service options' },
  { id: 'sales-contacts', name: 'Department Contacts', category: 'Info', desc: 'Direct team contact details' },
  { id: 'sales-quickcompare', name: 'Quick Comparison', category: 'Fleet', desc: 'At-a-glance model suitability' },
  { id: 'sales-chat', name: 'Live Chat', category: 'Engagement', desc: 'Instant messaging support' },
  { id: 'sales-app', name: 'HQ Owner App', category: 'Engagement', desc: 'Mobile app preview and signup' },
  { id: 'sales-contact', name: 'Contact CTA', category: 'Conversion', desc: 'Final call-to-action section' },
];

// Section categories with colors for the picker
const sectionCategories = [
  { key: 'all', label: 'All Sections', color: 'default' },
  { key: 'Hero', label: 'Hero', color: 'purple' },
  { key: 'Fleet', label: 'Fleet', color: 'blue' },
  { key: 'Trust', label: 'Trust', color: 'green' },
  { key: 'Finance', label: 'Finance', color: 'orange' },
  { key: 'Customization', label: 'Customization', color: 'purple' },
  { key: 'Technical', label: 'Technical', color: 'blue' },
  { key: 'Services', label: 'Services', color: 'green' },
  { key: 'Training', label: 'Training', color: 'orange' },
  { key: 'Experience', label: 'Experience', color: 'purple' },
  { key: 'Media', label: 'Media', color: 'blue' },
  { key: 'Info', label: 'Info', color: 'default' },
  { key: 'Engagement', label: 'Engagement', color: 'green' },
  { key: 'Conversion', label: 'Conversion', color: 'orange' },
  { key: 'Global', label: 'Global', color: 'purple' },
];

// ============================================
// SECTION FAVORITE BUTTON COMPONENT
// ============================================
// Rendered via portal into each section
function SectionFavoriteButton({ sectionId, favorites, onToggleFavorite }) {
  const sectionData = sectionRegistry.find(s => s.id === sectionId);
  const isFavorite = favorites.some(f => f.id === sectionId);
  const favoriteData = favorites.find(f => f.id === sectionId);

  return (
    <button
      className={`sales-section-fav ${isFavorite ? 'active' : ''} ${favoriteData?.note ? 'has-note' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onToggleFavorite(sectionId, sectionData?.name);
      }}
      title={favoriteData?.note ? `Note: ${favoriteData.note}` : (isFavorite ? 'Remove from shortlist' : 'Add to shortlist')}
    >
      <span className="sales-section-fav__star">{isFavorite ? '★' : '☆'}</span>
      <span className="sales-section-fav__id">{sectionId}</span>
    </button>
  );
}

// ============================================
// SECTION PICKER COMPONENT
// ============================================
function SectionPicker({
  favorites,
  setFavorites,
  showFavoritesOnly,
  setShowFavoritesOnly,
  showNoteModal,
  setShowNoteModal
}) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showFavsPanel, setShowFavsPanel] = useState(false);
  const [showGridView, setShowGridView] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [copyFeedback, setCopyFeedback] = useState(null);
  const noteInputRef = useRef(null);

  // Get filtered sections
  const filteredSections = activeCategory === 'all'
    ? sectionRegistry
    : sectionRegistry.filter(s => s.category === activeCategory);

  // Get favorited count by category
  const getCategoryCount = (cat) => {
    if (cat === 'all') return sectionRegistry.length;
    return sectionRegistry.filter(s => s.category === cat).length;
  };

  const getFavCount = () => favorites.length;

  // Save note for favorite
  const handleSaveNote = (note) => {
    if (!showNoteModal) return;
    setFavorites(prev => [...prev, {
      id: showNoteModal.id,
      name: showNoteModal.name,
      note: note || ''
    }]);
    setShowNoteModal(null);
  };

  // Edit existing note
  const handleEditNote = (idx) => {
    const fav = favorites[idx];
    const newNote = prompt('Edit note:', fav.note || '');
    if (newNote !== null) {
      setFavorites(prev => prev.map((f, i) =>
        i === idx ? { ...f, note: newNote } : f
      ));
    }
  };

  // Delete favorite
  const handleDeleteFavorite = (idx) => {
    setFavorites(prev => prev.filter((_, i) => i !== idx));
  };

  // Navigate to section
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setShowGridView(false);
      setShowFavsPanel(false);
    }
  };

  // Copy favorites to clipboard
  const handleCopyFavorites = () => {
    if (favorites.length === 0) {
      setCopyFeedback({ message: 'No favorites!', success: false });
      setTimeout(() => setCopyFeedback(null), 2000);
      return;
    }

    const lines = favorites.map(f => {
      let line = f.id;
      if (f.name) line += ` (${f.name})`;
      if (f.note) line += `\n   → ${f.note}`;
      return line;
    });
    const text = 'SHORTLISTED SECTIONS\n' + '='.repeat(40) + '\n\n' + lines.join('\n\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback({ message: `Copied ${favorites.length}!`, success: true });
    }).catch(() => {
      setCopyFeedback({ message: 'Copy failed', success: false });
    });
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  // Clear all favorites
  const handleClearFavorites = () => {
    if (confirm('Remove all shortlisted sections?')) {
      setFavorites([]);
      setShowFavsPanel(false);
      setShowFavoritesOnly(false);
    }
  };

  // Focus note input when modal opens
  useEffect(() => {
    if (showNoteModal && noteInputRef.current) {
      setTimeout(() => noteInputRef.current?.focus(), 100);
    }
  }, [showNoteModal]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setIsMinimized(prev => !prev);
      }
      if (e.key === 'Escape') {
        if (showGridView) setShowGridView(false);
        else if (showNoteModal) setShowNoteModal(null);
        else if (showFavsPanel) setShowFavsPanel(false);
        else setIsMinimized(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGridView, showNoteModal, showFavsPanel, setShowNoteModal]);

  return (
    <>
      {/* Main Picker Panel */}
      <div className={`section-picker ${isMinimized ? 'minimized' : ''}`}>
        {/* Minimized Bar */}
        <div className="section-picker__collapsed" onClick={() => setIsMinimized(false)}>
          <span className="section-picker__collapsed-title">Section Picker</span>
          <span className="section-picker__collapsed-count">★ {getFavCount()}</span>
          <button
            className="section-picker__collapsed-btn"
            onClick={(e) => { e.stopPropagation(); setIsMinimized(false); }}
          >↑</button>
        </div>

        {/* Main Content */}
        <div className="section-picker__main">
          {/* Header */}
          <div className="section-picker__header">
            <div className="section-picker__title">
              <h3>Section Picker</h3>
              <span className="section-picker__badge">{sectionRegistry.length} sections</span>
            </div>
            <button className="section-picker__minimize" onClick={() => setIsMinimized(true)}>−</button>
          </div>

          {/* Category Tabs */}
          <div className="section-picker__tabs">
            {sectionCategories.slice(0, 8).map(cat => (
              <button
                key={cat.key}
                className={`section-picker__tab section-picker__tab--${cat.color} ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label} ({getCategoryCount(cat.key)})
              </button>
            ))}
          </div>

          {/* Filter Toggle */}
          <div className="section-picker__filter">
            <label className="section-picker__toggle">
              <input
                type="checkbox"
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
              />
              <span className="section-picker__toggle-slider"></span>
              <span className="section-picker__toggle-label">Show only shortlisted ({getFavCount()})</span>
            </label>
          </div>

          {/* Actions */}
          <div className="section-picker__actions">
            <button
              className="section-picker__btn"
              onClick={() => setShowGridView(true)}
            >
              📋 Browse All
            </button>
            <button
              className={`section-picker__btn section-picker__btn--favs ${getFavCount() > 0 ? 'has-items' : ''}`}
              onClick={() => setShowFavsPanel(!showFavsPanel)}
            >
              ★ Shortlist ({getFavCount()})
            </button>
            <button
              className={`section-picker__btn section-picker__btn--copy ${copyFeedback ? (copyFeedback.success ? 'success' : 'error') : ''}`}
              onClick={handleCopyFavorites}
            >
              {copyFeedback ? copyFeedback.message : '📋 Copy'}
            </button>
          </div>

          {/* Hints */}
          <div className="section-picker__hints">
            <span>Click <kbd>★</kbd> on sections to shortlist</span>
            <span><kbd>M</kbd> minimize</span>
          </div>
        </div>
      </div>

      {/* Grid View Overlay */}
      {showGridView && (
        <div className="section-picker__grid-overlay">
          <div className="section-picker__grid-header">
            <h2>All Sections ({filteredSections.length})</h2>
            <button onClick={() => setShowGridView(false)}>×</button>
          </div>
          <div className="section-picker__grid-tabs">
            {sectionCategories.map(cat => (
              <button
                key={cat.key}
                className={`section-picker__grid-tab ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="section-picker__grid-content">
            {filteredSections.map(section => {
              const isFav = favorites.some(f => f.id === section.id);
              return (
                <div
                  key={section.id}
                  className={`section-picker__grid-item ${isFav ? 'is-favorite' : ''}`}
                  onClick={() => scrollToSection(section.id)}
                >
                  <div className="section-picker__grid-item-header">
                    <span className="section-picker__grid-item-category">{section.category}</span>
                    {isFav && <span className="section-picker__grid-item-star">★</span>}
                  </div>
                  <h4>{section.name}</h4>
                  <p>{section.desc}</p>
                  <code>{section.id}</code>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Favorites Panel */}
      {showFavsPanel && favorites.length > 0 && (
        <div className="section-picker__favs-panel">
          <div className="section-picker__favs-header">
            <strong>★ Shortlist ({favorites.length})</strong>
            <button onClick={() => setShowFavsPanel(false)}>×</button>
          </div>
          <div className="section-picker__favs-list">
            {favorites.map((fav, idx) => (
              <div key={fav.id} className="section-picker__favs-item">
                <div
                  className="section-picker__favs-item-main"
                  onClick={() => scrollToSection(fav.id)}
                >
                  <span className="section-picker__favs-item-name">{fav.name}</span>
                  <code className="section-picker__favs-item-id">{fav.id}</code>
                </div>
                <div className={`section-picker__favs-item-note ${!fav.note ? 'empty' : ''}`}>
                  {fav.note ? `→ ${fav.note}` : 'No note'}
                </div>
                <div className="section-picker__favs-item-actions">
                  <button onClick={() => handleEditNote(idx)}>✏️</button>
                  <button onClick={() => handleDeleteFavorite(idx)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
          <div className="section-picker__favs-footer">
            <button onClick={handleCopyFavorites}>📋 Copy All</button>
            <button onClick={handleClearFavorites}>🗑️ Clear All</button>
          </div>
        </div>
      )}

      {/* Note Modal */}
      {showNoteModal && (
        <div className="section-picker__note-modal" onClick={() => setShowNoteModal(null)}>
          <div className="section-picker__note-content" onClick={e => e.stopPropagation()}>
            <div className="section-picker__note-header">
              <span className="section-picker__note-icon">★</span>
              <span>Add to Shortlist</span>
            </div>
            <div className="section-picker__note-name">{showNoteModal.name}</div>
            <code className="section-picker__note-id">{showNoteModal.id}</code>
            <textarea
              ref={noteInputRef}
              className="section-picker__note-input"
              placeholder="Add a note (optional)... e.g., 'Great for homepage'"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSaveNote(e.target.value.trim());
                }
                if (e.key === 'Escape') {
                  setShowNoteModal(null);
                }
              }}
            />
            <div className="section-picker__note-actions">
              <button onClick={() => setShowNoteModal(null)}>Cancel</button>
              <button
                className="section-picker__note-save"
                onClick={() => handleSaveNote(noteInputRef.current?.value.trim())}
              >
                Add to Shortlist
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Aircraft models data
const aircraftModels = [
  {
    id: 'r88',
    name: 'R88',
    tagline: 'The Future of Rotorcraft',
    description: 'Revolutionary 8-seat turbine helicopter with unmatched capability.',
    seats: 8,
    speed: '140',
    range: '400',
    engine: 'Safran Arriel',
    price: 'POA',
    image: '/assets/images/new-aircraft/r88/rhc-r88-3-spotlights-left-side-atmospheric-effect-21794_2.jpg',
    cutout: '/assets/images/new-aircraft/r88/r88-jellybean-left.png',
    featured: true,
    badge: 'NEW',
  },
  {
    id: 'r66',
    name: 'R66',
    tagline: 'Turbine Performance',
    description: 'Five-seat turbine helicopter with Robinson reliability.',
    seats: 5,
    speed: '120',
    range: '350',
    engine: 'RR300',
    price: '$1,290,000',
    image: '/assets/images/new-aircraft/r66/rhc-r66-nxg-riviera-center-spotlight-vertical-format-14184-2.jpg',
    cutout: '/assets/images/new-aircraft/r66/blue-r66-palo-verde-left-v4.png',
    featured: false,
    badge: null,
  },
  {
    id: 'r44',
    name: 'R44',
    tagline: 'World\'s Best-Selling',
    description: 'Four-seat piston helicopter. The industry benchmark.',
    seats: 4,
    speed: '113',
    range: '300',
    engine: 'Lycoming IO-540',
    price: '$535,000',
    image: '/assets/images/new-aircraft/r44/r44blueprint.jpg',
    cutout: '/assets/images/new-aircraft/r44/raven-ii-front-alpha.png',
    featured: false,
    badge: null,
  },
  {
    id: 'r22',
    name: 'R22',
    tagline: 'Training Excellence',
    description: 'Two-seat trainer. Where pilots are made.',
    seats: 2,
    speed: '96',
    range: '200',
    engine: 'Lycoming O-360',
    price: '$345,000',
    image: '/assets/images/new-aircraft/r22/r22blueprint.jpg',
    cutout: '/assets/images/new-aircraft/r22/r22-red-volcano-front-alpha-v3.png',
    featured: false,
    badge: null,
  },
];

// Used aircraft data
const usedAircraft = [
  {
    id: 1,
    model: 'R66 Turbine',
    year: 2018,
    hours: 1245,
    price: '£895,000',
    image: '/assets/images/used-aircraft/r66/r66-turbine-ghkcc.jpg',
    status: 'Available',
  },
  {
    id: 2,
    model: 'R44 Raven II',
    year: 2019,
    hours: 890,
    price: '£385,000',
    image: '/assets/images/new-aircraft/r44/r44blueprint.jpg',
    status: 'Available',
  },
  {
    id: 3,
    model: 'R66 Turbine',
    year: 2020,
    hours: 650,
    price: '£995,000',
    image: '/assets/images/used-aircraft/r66/chris-r66-alps.jpg',
    status: 'Under Offer',
  },
];

// Buying process steps
const buyingSteps = [
  { num: '01', title: 'Consultation', desc: 'Discuss your requirements with our specialists' },
  { num: '02', title: 'Configuration', desc: 'Choose your model, options, and livery' },
  { num: '03', title: 'Factory Order', desc: 'We place your order with Robinson' },
  { num: '04', title: 'Production', desc: 'Your aircraft is built in Torrance, California' },
  { num: '05', title: 'Delivery', desc: 'Factory-direct or assembled at HQ Aviation' },
  { num: '06', title: 'Handover', desc: 'Full training and ongoing support' },
];

// R88 features
const r88Features = [
  { icon: '⬡', title: '8 Seats', desc: 'Largest cabin in its class' },
  { icon: '◈', title: 'Safran Arriel', desc: 'Proven turbine reliability' },
  { icon: '◉', title: '400 NM Range', desc: 'Extended mission capability' },
  { icon: '◎', title: 'Glass Cockpit', desc: 'State-of-the-art avionics' },
  { icon: '⬢', title: 'Air Conditioning', desc: 'Passenger comfort standard' },
  { icon: '◇', title: 'Cargo Bay', desc: 'Rear access storage' },
];

// Financing options
const financingOptions = [
  {
    type: 'Cash Purchase',
    icon: '●',
    benefits: ['Best price', 'No interest', 'Full ownership immediately'],
    note: 'Most straightforward option',
  },
  {
    type: 'Aviation Finance',
    icon: '◐',
    benefits: ['Low deposit from 10%', 'Flexible terms 3-10 years', 'Fixed rates available'],
    note: 'Most popular choice',
    featured: true,
  },
  {
    type: 'Lease Purchase',
    icon: '○',
    benefits: ['Lower monthly payments', 'Balloon payment option', 'Tax efficient'],
    note: 'Great for business use',
  },
  {
    type: 'Operating Lease',
    icon: '◔',
    benefits: ['Off balance sheet', 'Return at end of term', 'Maintenance included'],
    note: 'Corporate flexibility',
  },
];

// Comparison specs
const comparisonSpecs = [
  { spec: 'Seats', r88: '8', r66: '5', r44: '4', r22: '2' },
  { spec: 'Max Speed (kts)', r88: '140', r66: '120', r44: '113', r22: '96' },
  { spec: 'Range (NM)', r88: '400', r66: '350', r44: '300', r22: '200' },
  { spec: 'Engine Type', r88: 'Turbine', r66: 'Turbine', r44: 'Piston', r22: 'Piston' },
  { spec: 'Useful Load (lb)', r88: '2,100', r66: '1,270', r44: '1,025', r22: '407' },
  { spec: 'Hover Ceiling IGE (ft)', r88: '10,000', r66: '10,000', r44: '8,950', r22: '6,400' },
  { spec: 'Fuel Capacity (gal)', r88: '120', r66: '73.3', r44: '50.5', r22: '19.2' },
  { spec: 'Price From', r88: 'POA', r66: '$1.29M', r44: '$535K', r22: '$345K' },
];

// Owner testimonials
const testimonials = [
  {
    quote: "The team at HQ made the entire buying process seamless. From configuration to delivery, they were with us every step of the way.",
    author: "James Richardson",
    role: "R66 Owner since 2022",
    image: '/assets/images/team/team-member-1.jpg',
  },
  {
    quote: "Third helicopter I've purchased from HQ. Their after-sales support is unmatched in the UK. Wouldn't go anywhere else.",
    author: "Sarah Mitchell",
    role: "R44 & R66 Owner",
    image: '/assets/images/team/team-member-2.jpg',
  },
  {
    quote: "As a first-time buyer, I was nervous about the process. HQ's expertise and patience made it a pleasure. Now I can't imagine life without my R22.",
    author: "Michael Chen",
    role: "R22 Owner since 2023",
    image: '/assets/images/team/team-member-3.jpg',
  },
];

// Configuration options
const configOptions = [
  { category: 'Exterior', options: ['Custom Paint Schemes', 'Blade Tape Colors', 'Chrome Package', 'LED Landing Lights'] },
  { category: 'Interior', options: ['Leather Seats', 'Alcantara Headliner', 'Custom Carpet', 'Sound Dampening'] },
  { category: 'Avionics', options: ['Garmin G500H', 'Dual Transponders', 'ADS-B Out', 'Autopilot Systems'] },
  { category: 'Safety', options: ['Pop-out Floats', 'ELT Upgrade', 'Enhanced Vision', 'Wire Strike Protection'] },
];

// Safety features
const safetyFeatures = [
  { title: 'Rotor Brake', desc: 'Prevents blade sailing in wind', icon: '◎' },
  { title: 'Crashworthy Seats', desc: 'Energy-absorbing design', icon: '◈' },
  { title: 'Inertia Reel Belts', desc: '4-point harness system', icon: '⬡' },
  { title: 'Bladder Fuel Tanks', desc: 'Crash-resistant fuel cells', icon: '◇' },
  { title: 'Full Authority FADEC', desc: 'Engine protection (R66)', icon: '⬢' },
  { title: 'Main Rotor Design', desc: 'High-inertia system', icon: '◉' },
];

// Accessories
const accessories = [
  { name: 'Ground Handling Wheels', price: '£2,850', category: 'Ground Equipment' },
  { name: 'Air Covers Set', price: '£1,950', category: 'Protection' },
  { name: 'Blade Tie-Down Kit', price: '£495', category: 'Ground Equipment' },
  { name: 'Sunshade Set', price: '£685', category: 'Protection' },
  { name: 'Leather Headset Bag', price: '£285', category: 'Accessories' },
  { name: 'Robinson Floor Mats', price: '£395', category: 'Interior' },
  { name: 'GPU Receptacle', price: '£1,450', category: 'Electrical' },
  { name: 'Cargo Pod (R44)', price: '£8,500', category: 'Utility' },
];

// Training packages
const trainingPackages = [
  {
    name: 'Basic Transition',
    hours: '5',
    includes: ['Type conversion', 'Aircraft familiarization', 'Emergency procedures'],
    price: 'Included',
  },
  {
    name: 'Comprehensive Package',
    hours: '10',
    includes: ['Type conversion', 'Navigation training', 'Night qualification', 'Cross-country'],
    price: '+£3,500',
  },
  {
    name: 'Owner Pilot Program',
    hours: '20',
    includes: ['Full PPL training', 'R22/R44 type rating', 'Robinson safety course', 'Solo cross-country'],
    price: '+£15,000',
  },
];

// Maintenance packages
const maintenancePackages = [
  {
    name: 'Essential',
    coverage: '100-hour inspections',
    price: '£295/hr',
    features: ['Scheduled inspections', 'Basic consumables', 'Flight logs'],
  },
  {
    name: 'Premium',
    coverage: 'Full maintenance care',
    price: '£485/hr',
    features: ['All inspections', 'All consumables', 'Component exchanges', '24/7 AOG support'],
    featured: true,
  },
  {
    name: 'Complete',
    coverage: 'All-inclusive program',
    price: '£695/hr',
    features: ['Everything in Premium', 'Major overhauls', 'Hangarage included', 'Insurance discount'],
  },
];

// Recent deliveries
const recentDeliveries = [
  { model: 'R66 NXG', owner: 'Private Owner', location: 'Kent', date: 'Jan 2024', image: '/assets/images/new-aircraft/r66/rhc-r66-nxg-riviera-center-spotlight-vertical-format-14184-2.jpg' },
  { model: 'R44 Raven II', owner: 'Flight School', location: 'Manchester', date: 'Dec 2023', image: '/assets/images/new-aircraft/r44/raven-ii-front-alpha.png' },
  { model: 'R66 Turbine', owner: 'Charter Company', location: 'Scotland', date: 'Nov 2023', image: '/assets/images/used-aircraft/r66/chris-r66-alps.jpg' },
  { model: 'R22 Beta II', owner: 'Training Academy', location: 'Wales', date: 'Oct 2023', image: '/assets/images/new-aircraft/r22/r22-red-volcano-front-alpha-v3.png' },
];

// FAQ items
const faqItems = [
  {
    q: 'How long does delivery take for a new helicopter?',
    a: 'Delivery times vary by model and configuration. Currently, R22 and R44 models typically take 6-12 months from order. R66 models can be 12-18 months. R88 availability is limited—contact us for current timelines.',
  },
  {
    q: 'Can I trade in my current aircraft?',
    a: 'Yes! We accept trade-ins on all Robinson helicopters and many other makes. Our team will provide a fair market valuation and apply the value directly to your new aircraft purchase.',
  },
  {
    q: 'What financing options are available?',
    a: 'We work with specialist aviation finance providers to offer flexible terms. Options include aviation loans, lease purchase, operating leases, and hire purchase. Typical deposits start from 10% with terms up to 10 years.',
  },
  {
    q: 'Do you offer demo flights?',
    a: 'Absolutely. We encourage prospective buyers to experience the aircraft before committing. Demo flights can be arranged at Denham Aerodrome—contact our sales team to schedule.',
  },
  {
    q: 'What warranty comes with a new Robinson?',
    a: 'All new Robinson helicopters come with a 2-year factory warranty covering defects in materials and workmanship. Extended warranty options are available through Robinson and third-party providers.',
  },
  {
    q: 'Can you deliver internationally?',
    a: 'Yes, we deliver worldwide. We can arrange ferry flights to any destination, handle export documentation, and coordinate with local authorities for registration and certification.',
  },
];

// Insurance partners
const insurancePartners = [
  { name: 'Hayward Aviation', logo: '/assets/images/logos/partners/hayward-fleet-insurance-copy.png', specialty: 'Fleet & Training' },
  { name: 'Global Aerospace', logo: '/assets/images/logos/partners/global-aerospace.png', specialty: 'Private & Commercial' },
  { name: 'Willis Towers Watson', logo: '/assets/images/logos/partners/willis.png', specialty: 'Corporate Solutions' },
];

// Demo events
const upcomingEvents = [
  { date: '15', month: 'Mar', title: 'R88 Preview Day', location: 'Denham Aerodrome', type: 'Product Launch' },
  { date: '22', month: 'Mar', title: 'Spring Open House', location: 'HQ Aviation', type: 'Open Day' },
  { date: '05', month: 'Apr', title: 'Finance Workshop', location: 'Online Webinar', type: 'Workshop' },
  { date: '18', month: 'Apr', title: 'Demo Day - R66', location: 'Denham Aerodrome', type: 'Demo Flight' },
];

// Heritage timeline
const heritageTimeline = [
  { year: '1990', event: 'HQ Aviation founded at Denham Aerodrome' },
  { year: '1995', event: 'Appointed Robinson Authorized Dealer' },
  { year: '2000', event: '100th helicopter delivered' },
  { year: '2005', event: 'Part 145 maintenance approval granted' },
  { year: '2010', event: 'R66 Turbine added to lineup' },
  { year: '2015', event: 'New state-of-the-art hangar complex' },
  { year: '2020', event: '500th helicopter delivered' },
  { year: '2024', event: 'R88 launch — A new era begins' },
];

// Paint scheme options
const paintSchemes = [
  { name: 'Classic White', type: 'Standard', image: '/assets/images/new-aircraft/r66/rhc-r66-nxg-pv-left-side-wide-view-13611.jpg' },
  { name: 'Palo Verde', type: 'NXG Edition', image: '/assets/images/new-aircraft/r66/blue-r66-palo-verde-front-v4.png' },
  { name: 'Riviera Blue', type: 'NXG Edition', image: '/assets/images/new-aircraft/r66/copy-of-r66-riviera-front-v2.png' },
  { name: 'Corporate Black', type: 'Custom', image: '/assets/images/new-aircraft/r88/rhc-r88-right-side-view-dark-21823_2.jpg' },
  { name: 'Racing Red', type: 'Custom', image: '/assets/images/new-aircraft/r22/r22-red-volcano-front-alpha-v3.png' },
  { name: 'Bespoke Design', type: 'Full Custom', image: '/assets/images/facility/hq-aviation-robinsons.jpg' },
];

// Interior options
const interiorOptions = [
  { name: 'Standard Cloth', desc: 'Durable aviation-grade fabric', tier: 'Standard' },
  { name: 'Premium Leather', desc: 'Full grain automotive leather', tier: 'Premium' },
  { name: 'Alcantara Suede', desc: 'Italian luxury microfiber', tier: 'Luxury' },
  { name: 'Custom Stitching', desc: 'Contrast thread options', tier: 'Add-on' },
  { name: 'Carbon Fiber Trim', desc: 'Lightweight accent panels', tier: 'Add-on' },
  { name: 'Ambient Lighting', desc: 'LED interior lighting', tier: 'Add-on' },
];

// Mission profiles
const missionProfiles = [
  {
    id: 'private',
    title: 'Private Ownership',
    icon: '◈',
    desc: 'Personal transport, weekend flying, and adventure',
    benefits: ['Ultimate freedom', 'No scheduling hassles', 'Family adventures', 'Business travel'],
    recommended: 'R44 or R66',
  },
  {
    id: 'training',
    title: 'Flight Training',
    icon: '◎',
    desc: 'Schools and academies building the next generation',
    benefits: ['Low operating costs', 'Excellent safety record', 'Robinson certification', 'High utilization'],
    recommended: 'R22 or R44 Cadet',
  },
  {
    id: 'charter',
    title: 'Charter Operations',
    icon: '⬡',
    desc: 'Commercial passenger transport services',
    benefits: ['Revenue generation', 'Fleet scalability', 'Customer comfort', 'Reliability'],
    recommended: 'R66 or R88',
  },
  {
    id: 'utility',
    title: 'Utility & Work',
    icon: '⬢',
    desc: 'Agricultural, survey, and industrial applications',
    benefits: ['Payload capacity', 'Operational efficiency', 'Low maintenance', 'Versatility'],
    recommended: 'R44 or R66',
  },
];

// Ownership costs breakdown
const ownershipCosts = [
  { category: 'Fixed Costs', items: [
    { name: 'Insurance', r22: '£8,000', r44: '£12,000', r66: '£18,000' },
    { name: 'Hangarage', r22: '£4,800', r44: '£6,000', r66: '£7,200' },
    { name: 'Annual Inspection', r22: '£3,500', r44: '£5,000', r66: '£7,500' },
  ]},
  { category: 'Variable Costs (per hour)', items: [
    { name: 'Fuel', r22: '£45', r44: '£85', r66: '£120' },
    { name: 'Maintenance Reserve', r22: '£120', r44: '£180', r66: '£250' },
    { name: 'Engine Reserve', r22: '£80', r44: '£95', r66: '£150' },
  ]},
];

// Resale data
const resaleData = [
  { model: 'R22 Beta II', age: '5 years', retention: '72%' },
  { model: 'R44 Raven II', age: '5 years', retention: '75%' },
  { model: 'R66 Turbine', age: '5 years', retention: '78%' },
];

// Awards
const awards = [
  { year: '2023', title: 'European Dealer of the Year', org: 'Robinson Helicopter Company' },
  { year: '2022', title: 'Excellence in Training', org: 'CAA' },
  { year: '2021', title: 'Best Maintenance Facility', org: 'Helicopter Association International' },
  { year: '2020', title: 'Customer Service Award', org: 'Aviation Consumer Magazine' },
];

// Pilot requirements
const pilotRequirements = [
  { model: 'R22', license: 'PPL(H)', rating: 'R22 Type Rating', minHours: '45', medical: 'Class 2' },
  { model: 'R44', license: 'PPL(H)', rating: 'R44 Type Rating', minHours: '45', medical: 'Class 2' },
  { model: 'R66', license: 'PPL(H)', rating: 'R66 Turbine Rating', minHours: '45', medical: 'Class 2' },
  { model: 'R88', license: 'PPL(H)', rating: 'R88 Type Rating', minHours: '100*', medical: 'Class 2' },
];

// Comparison vs competition
const competitorComparison = [
  { feature: 'Purchase Price', robinson: '$$', competitor: '$$$$', advantage: 'robinson' },
  { feature: 'Operating Cost/Hour', robinson: '$150-350', competitor: '$400-800', advantage: 'robinson' },
  { feature: 'Parts Availability', robinson: 'Excellent', competitor: 'Good', advantage: 'robinson' },
  { feature: 'Resale Value', robinson: '75%+ at 5yrs', competitor: '60-70%', advantage: 'robinson' },
  { feature: 'Training Network', robinson: 'Worldwide', competitor: 'Limited', advantage: 'robinson' },
  { feature: 'Maintenance Simplicity', robinson: 'Owner-friendly', competitor: 'Complex', advantage: 'robinson' },
];

// Environmental data
const environmentalData = [
  { metric: 'Fuel Efficiency', value: 'Best in Class', desc: 'Lowest fuel burn per passenger mile' },
  { metric: 'Noise Footprint', value: '-3dB', desc: 'Quieter than industry average' },
  { metric: 'Carbon Offset', value: 'Available', desc: 'Optional carbon neutral program' },
  { metric: 'Recyclability', value: '85%', desc: 'Aircraft materials recyclable' },
];

// Partner locations
const partnerLocations = [
  { region: 'Europe', count: 45, countries: ['UK', 'France', 'Germany', 'Spain', 'Italy'] },
  { region: 'Americas', count: 120, countries: ['USA', 'Canada', 'Brazil', 'Mexico'] },
  { region: 'Asia Pacific', count: 35, countries: ['Australia', 'Japan', 'Singapore', 'NZ'] },
  { region: 'Middle East', count: 15, countries: ['UAE', 'Saudi Arabia', 'Qatar'] },
];

// Hangarage tiers
const hangarageOptions = [
  { tier: 'Basic', price: '£400/mo', features: ['Covered storage', 'Security', 'Ground handling'] },
  { tier: 'Premium', price: '£600/mo', features: ['Climate controlled', 'Wash service', 'Battery tender', 'Priority access'] },
  { tier: 'Full Service', price: '£900/mo', features: ['All Premium features', 'Weekly inspection', 'Fuel top-up', 'Concierge service'] },
];

// Pre-purchase inspection
const inspectionPackages = [
  { name: 'Basic Inspection', duration: '1 day', price: '£1,500', includes: ['Visual inspection', 'Logbook review', 'AD compliance check'] },
  { name: 'Comprehensive', duration: '2-3 days', price: '£3,500', includes: ['Full inspection', 'Engine borescope', 'Compression test', 'Component history', 'Market valuation'] },
  { name: 'Pre-Purchase Plus', duration: '3-5 days', price: '£5,500', includes: ['Everything above', 'Test flight', 'Avionics check', 'Paint evaluation', 'Negotiation support'] },
];

// Video content
const videoContent = [
  { id: 1, title: 'R88 World Premiere', duration: '4:32', thumbnail: '/assets/images/new-aircraft/r88/rhc-r88-atmospheric-effect-front-view-218022.jpg' },
  { id: 2, title: 'Factory Tour: Torrance', duration: '12:15', thumbnail: '/assets/images/facility/hq-aviation-robinsons.jpg' },
  { id: 3, title: 'Owner Stories', duration: '8:45', thumbnail: '/assets/images/expeditions/channel.jpg' },
  { id: 4, title: 'R66 NXG Reveal', duration: '3:22', thumbnail: '/assets/images/new-aircraft/r66/rhc-r66-nxg-riviera-center-spotlight-vertical-format-14184-2.jpg' },
];

// Social proof stats
const socialProofStats = [
  { value: '35', suffix: '+', label: 'Years in Business' },
  { value: '500', suffix: '+', label: 'Aircraft Delivered' },
  { value: '98', suffix: '%', label: 'Customer Satisfaction' },
  { value: '24', suffix: '/7', label: 'Support Available' },
];

// Specification details
const specificationDetails = {
  r66: {
    dimensions: { length: '33.2 ft', height: '11.7 ft', width: '6.4 ft' },
    weights: { empty: '1,280 lb', maxGross: '2,700 lb', useful: '1,420 lb' },
    performance: { cruise: '110 kts', maxSpeed: '140 kts', range: '350 nm', endurance: '3.5 hrs' },
    engine: { type: 'Rolls-Royce RR300', power: '270 shp', fuel: 'Jet-A' },
  },
};

// Customer locations map data
const customerLocations = [
  { city: 'London', lat: 51.5, customers: 45 },
  { city: 'Manchester', lat: 53.5, customers: 22 },
  { city: 'Edinburgh', lat: 55.9, customers: 15 },
  { city: 'Dublin', lat: 53.3, customers: 12 },
  { city: 'Paris', lat: 48.8, customers: 18 },
];

// Avionics packages
const avionicsPackages = [
  {
    name: 'Standard',
    includes: ['Dual G500H TXi', 'GTN 650Xi', 'GTX 345', 'GMA 350H'],
    price: 'Included',
  },
  {
    name: 'Enhanced',
    includes: ['Dual G500H TXi', 'GTN 750Xi', 'GTX 345', 'GMA 350H', 'GFC 600H Autopilot', 'Radar Altimeter'],
    price: '+$45,000',
    featured: true,
  },
  {
    name: 'Premium IFR',
    includes: ['All Enhanced', 'Second GTN 750Xi', 'GWX 75 Weather Radar', 'Flight Director', 'HTAWS'],
    price: '+$95,000',
  },
];

// Warranty options
const warrantyOptions = [
  { type: 'Standard', duration: '2 Years', coverage: 'Factory defects', price: 'Included' },
  { type: 'Extended', duration: '5 Years', coverage: 'Comprehensive coverage', price: '+£12,500' },
  { type: 'Ultimate', duration: '7 Years', coverage: 'All-inclusive + wear items', price: '+£24,000' },
];

// Delivery options
const deliveryOptions = [
  { method: 'Factory Pickup', location: 'Torrance, CA', time: 'Immediate', price: 'Included', desc: 'Fly your new helicopter home with support' },
  { method: 'Sea Freight', location: 'Felixstowe', time: '8-10 weeks', price: '+£15,000', desc: 'Container shipping with HQ reassembly' },
  { method: 'Ferry Flight', location: 'Denham', time: '2-3 weeks', price: '+£35,000', desc: 'Professional pilots deliver door-to-door' },
];

// Flight planning tools
const flightTools = [
  { name: 'SkyDemon', type: 'Navigation', desc: 'UK\'s favorite flight planning app', logo: '◈' },
  { name: 'ForeFlight', type: 'Navigation', desc: 'Comprehensive aviation platform', logo: '◎' },
  { name: 'Helipaddy', type: 'Landing Sites', desc: 'Helicopter landing locations', logo: '⬡' },
  { name: 'Met Office', type: 'Weather', desc: 'Official UK aviation weather', logo: '◉' },
];

// Membership benefits
const membershipBenefits = [
  { title: 'Owner Events', desc: 'Exclusive fly-ins, dinners, and expeditions', icon: '✈' },
  { title: 'Priority Service', desc: 'Front of queue for maintenance slots', icon: '⚡' },
  { title: 'Parts Discount', desc: '15% off genuine Robinson parts', icon: '%' },
  { title: 'Community Access', desc: 'Private owner WhatsApp group', icon: '💬' },
  { title: 'Free Hangarage', desc: 'First month free at Denham', icon: '🏠' },
  { title: 'Insurance Savings', desc: 'Preferred rates with partners', icon: '🛡' },
];

// Technical support
const techSupport = [
  { channel: 'Phone', availability: '24/7', response: 'Immediate', number: '+44 1234 567 890' },
  { channel: 'WhatsApp', availability: '7am-10pm', response: '< 1 hour', number: '+44 7XXX XXX XXX' },
  { channel: 'Email', availability: '24/7', response: '< 24 hours', number: 'support@hqaviation.co.uk' },
  { channel: 'AOG Line', availability: '24/7', response: 'Immediate', number: '+44 800 XXX XXXX' },
];

// Component exchange program
const componentExchange = [
  { component: 'Main Rotor Blades', exchange: '£18,500', new: '£32,000', savings: '42%' },
  { component: 'Tail Rotor Blades', exchange: '£4,200', new: '£7,800', savings: '46%' },
  { component: 'Swashplate Assembly', exchange: '£8,900', new: '£15,500', savings: '43%' },
  { component: 'Transmission', exchange: '£45,000', new: '£85,000', savings: '47%' },
];

// Flight school partnerships
const flightSchools = [
  { name: 'HQ Aviation Academy', location: 'Denham', specialty: 'Robinson PPL/CPL', partner: true },
  { name: 'Helicopter Services', location: 'Wycombe', specialty: 'Type Ratings', partner: true },
  { name: 'Bournemouth Helicopters', location: 'Bournemouth', specialty: 'ATPL Theory', partner: true },
  { name: 'Helicentre Aviation', location: 'Leicester', specialty: 'Instrument Ratings', partner: true },
];

// Upgrade paths
const upgradePaths = [
  { from: 'R22', to: 'R44', benefit: 'Double the seats, greater range', tradein: 'Up to 80%' },
  { from: 'R44', to: 'R66', benefit: 'Turbine reliability, 5th seat', tradein: 'Up to 85%' },
  { from: 'R66', to: 'R88', benefit: '8 seats, ultimate capability', tradein: 'Up to 90%' },
];

// Regulatory info
const regulatoryBodies = [
  { name: 'CAA', region: 'UK', role: 'Primary certification authority', link: 'caa.co.uk' },
  { name: 'EASA', region: 'Europe', role: 'European aviation safety', link: 'easa.europa.eu' },
  { name: 'FAA', region: 'USA', role: 'US certification (factory)', link: 'faa.gov' },
];

// Owner stories detailed
const ownerStories = [
  {
    name: 'Dr. Sarah Mitchell',
    aircraft: 'R66 Turbine',
    purchased: '2022',
    hours: '450+',
    story: 'As a surgeon, time is critical. My R66 lets me be in three hospitals across the South in a single day.',
    useCase: 'Business Commute',
  },
  {
    name: 'The Harrison Family',
    aircraft: 'R44 Raven II',
    purchased: '2020',
    hours: '380+',
    story: 'Weekend adventures with the kids have never been better. We\'ve explored every corner of the UK.',
    useCase: 'Family Adventures',
  },
  {
    name: 'James & Partners LLP',
    aircraft: '3x R66',
    purchased: '2021',
    hours: '2,400+',
    story: 'Our charter operation started with one R66. HQ\'s support helped us scale to three aircraft.',
    useCase: 'Charter Business',
  },
];

// Consignment sales
const consignmentBenefits = [
  'Professional photography and video',
  'Listing on HQ website and partners',
  'Pre-sale inspection and certification',
  'Handling all viewings and test flights',
  'Secure transaction management',
  'Worldwide buyer network access',
];

// Special editions
const specialEditions = [
  { name: 'NXG Riviera', base: 'R66', features: ['Alcantara interior', 'Custom paint', 'Enhanced avionics'], limited: 50 },
  { name: 'NXG Palo Verde', base: 'R66', features: ['Two-tone exterior', 'Leather seats', 'A/C upgrade'], limited: 50 },
  { name: 'Anniversary Edition', base: 'R44', features: ['Gold accents', 'Special livery', 'Commemorative plaque'], limited: 35 },
];

// Operating bases
const operatingBases = [
  { name: 'Denham Aerodrome', code: 'EGLD', runway: '06/24', fuel: 'Avgas, Jet-A1', facilities: 'Full maintenance, hangarage, clubhouse' },
  { name: 'Battersea Heliport', code: 'EGLW', runway: 'Helipad', fuel: 'Jet-A1', facilities: 'VIP lounge, car service' },
  { name: 'Biggin Hill', code: 'EGKB', runway: '03/21', fuel: 'Avgas, Jet-A1', facilities: 'Customs, FBO services' },
];

// Carbon offset program
const carbonProgram = {
  providers: ['Gold Standard', 'Verified Carbon Standard'],
  cost: '£8 per flight hour',
  projects: ['UK Woodland restoration', 'African cookstove initiative', 'South American reforestation'],
  certificates: 'Annual carbon neutral certification available',
};

// Aircraft management services
const managementServices = [
  { service: 'Scheduling', desc: 'Online booking system for your aircraft', price: 'Included' },
  { service: 'Crew Sourcing', desc: 'Vetted pilots on demand', price: '£450/day' },
  { service: 'Trip Planning', desc: 'Route, permits, handling arranged', price: '£150/trip' },
  { service: 'Expense Tracking', desc: 'Monthly reports and analysis', price: 'Included' },
  { service: 'Regulatory Filing', desc: 'AOC support and compliance', price: '£2,500/year' },
];

// Quick contact methods
const quickContacts = [
  { dept: 'New Sales', name: 'Michael Thompson', email: 'michael@hqaviation.co.uk', phone: '+44 1234 567 001' },
  { dept: 'Used Aircraft', name: 'Sarah Williams', email: 'sarah@hqaviation.co.uk', phone: '+44 1234 567 002' },
  { dept: 'Finance', name: 'David Chen', email: 'david@hqaviation.co.uk', phone: '+44 1234 567 003' },
  { dept: 'After Sales', name: 'Emma Roberts', email: 'emma@hqaviation.co.uk', phone: '+44 1234 567 004' },
];

// Aircraft comparison quick view
const quickComparison = [
  { model: 'R22', ideal: 'Training, Budget flying', notIdeal: 'Family trips, Long range' },
  { model: 'R44', ideal: 'Private ownership, Training', notIdeal: 'Heavy utility, IFR' },
  { model: 'R66', ideal: 'Charter, Business, Family', notIdeal: 'Budget-conscious buyers' },
  { model: 'R88', ideal: 'Commercial ops, Large groups', notIdeal: 'First-time owners' },
];

function Sales() {
  const [activeModel, setActiveModel] = useState(aircraftModels[0]);
  const [hoveredModel, setHoveredModel] = useState(null);
  const heroRef = useRef(null);

  // Favorites/shortlist state
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('hq-sales-section-favorites');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(null);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('hq-sales-section-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite handler
  const handleToggleFavorite = useCallback((id, name) => {
    const isFavorite = favorites.some(f => f.id === id);
    if (isFavorite) {
      setFavorites(prev => prev.filter(f => f.id !== id));
    } else {
      setShowNoteModal({ id, name });
    }
  }, [favorites]);

  // State for mounted section containers
  const [sectionContainers, setSectionContainers] = useState([]);

  // Find all section containers on mount and when DOM updates
  useEffect(() => {
    const findSections = () => {
      const containers = [];
      sectionRegistry.forEach(section => {
        // Find sections by className pattern (e.g., section.sales-hero)
        const el = document.querySelector(`section.${section.id}`);
        if (el) {
          // Ensure section has position relative for absolute button positioning
          el.style.position = 'relative';
          // Add data attribute for identification
          el.dataset.sectionId = section.id;
          // Create container for the button if not exists
          let btnContainer = el.querySelector('.sales-section-fav-container');
          if (!btnContainer) {
            btnContainer = document.createElement('div');
            btnContainer.className = 'sales-section-fav-container';
            btnContainer.dataset.sectionId = section.id;
            el.insertBefore(btnContainer, el.firstChild);
          }
          containers.push({ id: section.id, container: btnContainer });
        }
      });
      setSectionContainers(containers);
    };

    // Initial find with delay to ensure DOM is ready
    const timer = setTimeout(findSections, 200);
    return () => clearTimeout(timer);
  }, []);

  // Handle visibility filtering
  useEffect(() => {
    sectionRegistry.forEach(section => {
      const sectionEl = document.querySelector(`section.${section.id}`);
      if (sectionEl) {
        const isFavorite = favorites.some(f => f.id === section.id);
        if (showFavoritesOnly && !isFavorite) {
          sectionEl.style.display = 'none';
        } else {
          sectionEl.style.display = '';
        }
      }
    });
  }, [showFavoritesOnly, favorites]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="sales-page">
      <SalesHeader />

      {/* Section Picker */}
      <SectionPicker
        favorites={favorites}
        setFavorites={setFavorites}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        showNoteModal={showNoteModal}
        setShowNoteModal={setShowNoteModal}
      />

      {/* Render favorite buttons into each section via portals */}
      {sectionContainers.map(({ id, container }) =>
        createPortal(
          <SectionFavoriteButton
            key={id}
            sectionId={id}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />,
          container
        )
      )}

      {/* ========== HERO: Flagship R88 ========== */}
      <section ref={heroRef} className="sales-hero">
        <motion.div
          className="sales-hero__bg"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img src="/assets/images/new-aircraft/r88/rhc-r88-atmospheric-effect-front-view-218022.jpg" alt="" />
        </motion.div>
        <div className="sales-hero__overlay" />

        <motion.div
          className="sales-hero__content"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <div className="sales-hero__left">
            <motion.div
              className="sales-hero__badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src="/assets/images/robinson-assets/logos/rhc-authorized-dealer-logo-logo-yellow-rotor-black-type.svg"
                alt="Robinson Authorized Dealer"
                className="sales-hero__dealer-logo"
              />
            </motion.div>

            <motion.span
              className="sales-hero__label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              AIRCRAFT SALES
            </motion.span>

            <div className="sales-hero__headline">
              <motion.span
                className="sales-hero__word sales-hero__word--1"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                ROBINSON
              </motion.span>
              <motion.span
                className="sales-hero__word sales-hero__word--2"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                SPECIALISTS
              </motion.span>
            </div>

            <motion.div
              className="sales-hero__divider"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.p
              className="sales-hero__sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              The UK's leading Robinson dealer since 1990. New and pre-owned helicopters, factory support, and lifetime partnership.
            </motion.p>

            <motion.div
              className="sales-hero__stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <div className="sales-hero__stat">
                <span className="sales-hero__stat-num">500+</span>
                <span className="sales-hero__stat-label">Aircraft Delivered</span>
              </div>
              <div className="sales-hero__stat-divider" />
              <div className="sales-hero__stat">
                <span className="sales-hero__stat-num">35</span>
                <span className="sales-hero__stat-label">Years Experience</span>
              </div>
              <div className="sales-hero__stat-divider" />
              <div className="sales-hero__stat">
                <span className="sales-hero__stat-num">UK</span>
                <span className="sales-hero__stat-label">#1 Dealer</span>
              </div>
            </motion.div>

            <motion.div
              className="sales-hero__cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <a href="#models" className="sales-btn sales-btn--primary">Explore Models</a>
              <a href="/contact" className="sales-btn sales-btn--outline">Contact Sales</a>
            </motion.div>
          </div>
        </motion.div>

        <div className="sales-hero__scroll">
          <span>Scroll</span>
          <div className="sales-hero__scroll-line">
            <div className="sales-hero__scroll-progress" />
          </div>
        </div>
      </section>

      {/* ========== NEW AIRCRAFT LINEUP ========== */}
      <section id="models" className="sales-lineup">
        <div className="sales-lineup__container">
          <Reveal>
            <div className="sales-lineup__header">
              <span className="sales-pre-text">New Aircraft</span>
              <h2>
                <span className="sales-text--dark">The</span>{' '}
                <span className="sales-text--mid">Robinson</span>{' '}
                <span className="sales-text--light">Lineup</span>
              </h2>
              <p>
                Four exceptional models. One legendary manufacturer.
                Every Robinson delivers unmatched value, reliability, and performance.
              </p>
            </div>
          </Reveal>

          {/* Model Selector */}
          <div className="sales-lineup__selector">
            {aircraftModels.map((model, i) => (
              <Reveal key={model.id} delay={i * 0.1}>
                <button
                  className={`sales-lineup__tab ${activeModel.id === model.id ? 'sales-lineup__tab--active' : ''}`}
                  onClick={() => setActiveModel(model)}
                  onMouseEnter={() => setHoveredModel(model.id)}
                  onMouseLeave={() => setHoveredModel(null)}
                >
                  {model.badge && <span className="sales-lineup__tab-badge">{model.badge}</span>}
                  <span className="sales-lineup__tab-name">{model.name}</span>
                  <span className="sales-lineup__tab-tagline">{model.tagline}</span>
                </button>
              </Reveal>
            ))}
          </div>

          {/* Active Model Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModel.id}
              className="sales-lineup__display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sales-lineup__image">
                <motion.img
                  src={activeModel.cutout}
                  alt={activeModel.name}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <div className="sales-lineup__info">
                <div className="sales-lineup__model-header">
                  <h3>{activeModel.name}</h3>
                  <span className="sales-lineup__tagline">{activeModel.tagline}</span>
                </div>

                <p className="sales-lineup__desc">{activeModel.description}</p>

                <div className="sales-lineup__specs">
                  <div className="sales-lineup__spec">
                    <span className="sales-lineup__spec-value">{activeModel.seats}</span>
                    <span className="sales-lineup__spec-label">Seats</span>
                  </div>
                  <div className="sales-lineup__spec">
                    <span className="sales-lineup__spec-value">{activeModel.speed}</span>
                    <span className="sales-lineup__spec-label">Knots</span>
                  </div>
                  <div className="sales-lineup__spec">
                    <span className="sales-lineup__spec-value">{activeModel.range}</span>
                    <span className="sales-lineup__spec-label">NM Range</span>
                  </div>
                  <div className="sales-lineup__spec">
                    <span className="sales-lineup__spec-value">{activeModel.engine}</span>
                    <span className="sales-lineup__spec-label">Engine</span>
                  </div>
                </div>

                <div className="sales-lineup__price">
                  <span className="sales-lineup__price-label">From</span>
                  <span className="sales-lineup__price-value">{activeModel.price}</span>
                  <span className="sales-lineup__price-note">ex-factory</span>
                </div>

                <div className="sales-lineup__actions">
                  <Link to={`/aircraft-sales/new/${activeModel.id}`} className="sales-btn sales-btn--primary">
                    View Details
                  </Link>
                  <Link to="/contact?subject=new-aircraft" className="sales-btn sales-btn--outline">
                    Request Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ========== AUTHORIZED DEALER SECTION ========== */}
      <section className="sales-dealer">
        <div className="sales-dealer__container">
          <Reveal>
            <div className="sales-dealer__content">
              <div className="sales-dealer__logos">
                <img
                  src="/assets/images/robinson-assets/logos/rhc-authorized-dealer-logo-logo-yellow-rotor-white-type.svg"
                  alt="Robinson Authorized Dealer"
                />
                <img
                  src="/assets/images/robinson-assets/logos/rhc_authorized-service-center-logo-logo-yellow-rotor-white-type.svg"
                  alt="Robinson Authorized Service Center"
                />
              </div>
              <h2>Official Robinson Partner</h2>
              <p>
                As an Authorized Robinson Dealer and Service Centre, we provide factory-direct sales,
                genuine parts, certified maintenance, and the expertise that comes from three decades
                of exclusive Robinson focus.
              </p>
              <div className="sales-dealer__features">
                <div className="sales-dealer__feature">
                  <span className="sales-dealer__feature-icon">✓</span>
                  <span>Factory-Direct Pricing</span>
                </div>
                <div className="sales-dealer__feature">
                  <span className="sales-dealer__feature-icon">✓</span>
                  <span>Full Warranty Support</span>
                </div>
                <div className="sales-dealer__feature">
                  <span className="sales-dealer__feature-icon">✓</span>
                  <span>Genuine Parts</span>
                </div>
                <div className="sales-dealer__feature">
                  <span className="sales-dealer__feature-icon">✓</span>
                  <span>Factory Training</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== BUYING PROCESS ========== */}
      <section className="sales-process">
        <div className="sales-process__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Your Journey</span>
              <h2>
                <span className="sales-text--dark">The</span>{' '}
                <span className="sales-text--mid">Buying</span>{' '}
                <span className="sales-text--light">Process</span>
              </h2>
            </div>
          </Reveal>

          <div className="sales-process__grid">
            {buyingSteps.map((step, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  className="sales-process__step"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span className="sales-process__num">{step.num}</span>
                  <div className="sales-process__text">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== USED AIRCRAFT ========== */}
      <section className="sales-used">
        <div className="sales-used__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Pre-Owned</span>
              <h2>
                <span className="sales-text--dark">Used</span>{' '}
                <span className="sales-text--mid">Aircraft</span>
              </h2>
              <p>Carefully inspected, fully serviced, and ready to fly.</p>
            </div>
          </Reveal>

          <div className="sales-used__grid">
            {usedAircraft.map((aircraft, i) => (
              <Reveal key={aircraft.id} delay={i * 0.1}>
                <motion.div
                  className="sales-used__card"
                  whileHover={{ y: -4 }}
                >
                  <div className="sales-used__image">
                    <img src={aircraft.image} alt={aircraft.model} />
                    <span className={`sales-used__status sales-used__status--${aircraft.status.toLowerCase().replace(' ', '-')}`}>
                      {aircraft.status}
                    </span>
                  </div>
                  <div className="sales-used__info">
                    <div className="sales-used__header">
                      <h4>{aircraft.model}</h4>
                      <span className="sales-used__year">{aircraft.year}</span>
                    </div>
                    <div className="sales-used__details">
                      <span className="sales-used__hours">{aircraft.hours.toLocaleString()} hrs</span>
                      <span className="sales-used__price">{aircraft.price}</span>
                    </div>
                    <a href={`/contact?subject=used-${aircraft.id}`} className="sales-btn sales-btn--outline sales-btn--small">
                      Enquire
                    </a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="sales-used__cta">
              <Link to="/aircraft-sales/used" className="sales-btn sales-btn--outline">
                View All Used Aircraft
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== WHY HQ AVIATION ========== */}
      <section className="sales-why">
        <div className="sales-why__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">The HQ Difference</span>
              <h2>
                <span className="sales-text--dark">Why</span>{' '}
                <span className="sales-text--mid">Buy From</span>{' '}
                <span className="sales-text--light">HQ Aviation</span>
              </h2>
            </div>
          </Reveal>

          <div className="sales-why__grid">
            <Reveal delay={0.1}>
              <div className="sales-why__card">
                <span className="sales-why__num">01</span>
                <h4>Lifetime Partnership</h4>
                <p>
                  Your purchase is just the beginning. We provide ongoing training,
                  maintenance, and support throughout your ownership journey.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="sales-why__card">
                <span className="sales-why__num">02</span>
                <h4>Expert Knowledge</h4>
                <p>
                  35 years of exclusive Robinson focus. Our team knows these aircraft
                  better than anyone in the UK.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="sales-why__card">
                <span className="sales-why__num">03</span>
                <h4>Complete Service</h4>
                <p>
                  Sales, maintenance, training, hangarage, and expeditions—
                  everything under one roof at Denham Aerodrome.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="sales-why__card">
                <span className="sales-why__num">04</span>
                <h4>Community</h4>
                <p>
                  Join a thriving community of helicopter owners and enthusiasts.
                  Group trips, events, and shared adventures await.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== SECTION 8: R88 SPOTLIGHT ========== */}
      <section className="sales-r88">
        <div className="sales-r88__container">
          <div className="sales-r88__grid">
            <div className="sales-r88__content">
              <Reveal>
                <span className="sales-pre-text">Now Taking Orders</span>
                <h2 className="sales-r88__title">
                  <span className="sales-text--dark">The</span>{' '}
                  <span className="sales-text--mid">All-New</span>{' '}
                  <span className="sales-text--accent">R88</span>
                </h2>
                <p className="sales-r88__intro">
                  Robinson's revolutionary 8-seat turbine helicopter represents the future of
                  rotorcraft. Purpose-built for utility, charter, and private operations.
                </p>
              </Reveal>

              <div className="sales-r88__features">
                {r88Features.map((feature, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <motion.div
                      className="sales-r88__feature"
                      whileHover={{ x: 4 }}
                    >
                      <span className="sales-r88__feature-icon">{feature.icon}</span>
                      <div>
                        <span className="sales-r88__feature-title">{feature.title}</span>
                        <span className="sales-r88__feature-desc">{feature.desc}</span>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.4}>
                <div className="sales-r88__cta">
                  <Link to="/aircraft-sales/new/r88" className="sales-btn sales-btn--primary">
                    R88 Details
                  </Link>
                  <Link to="/contact?subject=r88-interest" className="sales-btn sales-btn--outline">
                    Register Interest
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="sales-r88__visual">
              <Reveal direction="right">
                <motion.div
                  className="sales-r88__image"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src="/assets/images/new-aircraft/r88/rhc-r88-left-side-three-quarter-front-view-21797.jpg"
                    alt="Robinson R88"
                  />
                  <div className="sales-r88__badge">
                    <span>2024</span>
                    <span>LAUNCH</span>
                  </div>
                </motion.div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 9: FINANCING OPTIONS ========== */}
      <section className="sales-finance">
        <div className="sales-finance__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Flexible Solutions</span>
              <h2>
                <span className="sales-text--dark">Financing</span>{' '}
                <span className="sales-text--mid">Options</span>
              </h2>
              <p>Tailored financial solutions to get you flying sooner.</p>
            </div>
          </Reveal>

          <div className="sales-finance__grid">
            {financingOptions.map((option, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className={`sales-finance__card ${option.featured ? 'sales-finance__card--featured' : ''}`}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {option.featured && <div className="sales-finance__ribbon">Most Popular</div>}
                  <span className="sales-finance__icon">{option.icon}</span>
                  <h4>{option.type}</h4>
                  <ul>
                    {option.benefits.map((benefit, j) => (
                      <li key={j}>{benefit}</li>
                    ))}
                  </ul>
                  <span className="sales-finance__note">{option.note}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="sales-finance__cta">
              <p>Speak with our finance partners for a no-obligation quote.</p>
              <a href="/contact?subject=financing" className="sales-btn sales-btn--primary">
                Get Finance Quote
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 10: TRADE-IN PROGRAM ========== */}
      <section className="sales-tradein">
        <div className="sales-tradein__inner">
          <Reveal>
            <div className="sales-tradein__content">
              <span className="sales-pre-text">Upgrade Today</span>
              <h2>
                <span className="sales-text--white">Trade In</span>{' '}
                <span className="sales-text--light">Your Aircraft</span>
              </h2>
              <p>
                Ready for an upgrade? We accept trade-ins on Robinson helicopters
                and many other makes. Get a fair market valuation and apply it
                directly to your new purchase.
              </p>
              <div className="sales-tradein__steps">
                <div className="sales-tradein__step">
                  <span className="sales-tradein__step-num">1</span>
                  <span>Submit Details</span>
                </div>
                <div className="sales-tradein__step-arrow">→</div>
                <div className="sales-tradein__step">
                  <span className="sales-tradein__step-num">2</span>
                  <span>Receive Valuation</span>
                </div>
                <div className="sales-tradein__step-arrow">→</div>
                <div className="sales-tradein__step">
                  <span className="sales-tradein__step-num">3</span>
                  <span>Apply to Purchase</span>
                </div>
              </div>
              <a href="/contact?subject=trade-in" className="sales-btn sales-btn--white">
                Get Valuation
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 11: COMPARISON CHART ========== */}
      <section className="sales-compare">
        <div className="sales-compare__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Side by Side</span>
              <h2>
                <span className="sales-text--dark">Compare</span>{' '}
                <span className="sales-text--mid">Models</span>
              </h2>
              <p>Find the perfect Robinson for your mission profile.</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="sales-compare__table-wrapper">
              <table className="sales-compare__table">
                <thead>
                  <tr>
                    <th>Specification</th>
                    <th className="sales-compare__featured">R88 <span>NEW</span></th>
                    <th>R66</th>
                    <th>R44</th>
                    <th>R22</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonSpecs.map((row, i) => (
                    <tr key={i}>
                      <td>{row.spec}</td>
                      <td className="sales-compare__featured">{row.r88}</td>
                      <td>{row.r66}</td>
                      <td>{row.r44}</td>
                      <td>{row.r22}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="sales-compare__note">
              <span>*</span> Specifications are typical values. Contact us for detailed performance data.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 12: TESTIMONIALS ========== */}
      <section className="sales-testimonials">
        <div className="sales-testimonials__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Owner Stories</span>
              <h2>
                <span className="sales-text--dark">What Our</span>{' '}
                <span className="sales-text--mid">Customers Say</span>
              </h2>
            </div>
          </Reveal>

          <div className="sales-testimonials__grid">
            {testimonials.map((testimonial, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <motion.div
                  className="sales-testimonials__card"
                  whileHover={{ y: -4 }}
                >
                  <div className="sales-testimonials__quote">
                    <span className="sales-testimonials__mark">"</span>
                    <p>{testimonial.quote}</p>
                  </div>
                  <div className="sales-testimonials__author">
                    <div className="sales-testimonials__avatar">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="sales-testimonials__info">
                      <span className="sales-testimonials__name">{testimonial.author}</span>
                      <span className="sales-testimonials__role">{testimonial.role}</span>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 13: CONFIGURATION OPTIONS ========== */}
      <section className="sales-config">
        <div className="sales-config__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Personalization</span>
              <h2>
                <span className="sales-text--dark">Custom</span>{' '}
                <span className="sales-text--mid">Configuration</span>
              </h2>
              <p>Make it uniquely yours with factory and aftermarket options.</p>
            </div>
          </Reveal>

          <div className="sales-config__grid">
            {configOptions.map((category, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="sales-config__category">
                  <h4>{category.category}</h4>
                  <ul>
                    {category.options.map((option, j) => (
                      <li key={j}>
                        <span className="sales-config__check">✓</span>
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="sales-config__image">
              <img
                src="/assets/images/new-aircraft/r66/rhc-r66-nxg-riviera-front-cockpit-wide-view-13425.jpg"
                alt="Custom R66 Interior"
              />
              <div className="sales-config__caption">
                R66 NXG Riviera Edition — Alcantara interior with custom stitching
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 14: GALLERY ========== */}
      <section className="sales-gallery">
        <div className="sales-gallery__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Visual Excellence</span>
              <h2>
                <span className="sales-text--white">Aircraft</span>{' '}
                <span className="sales-text--light">Gallery</span>
              </h2>
            </div>
          </Reveal>

          <div className="sales-gallery__grid">
            <motion.div
              className="sales-gallery__item sales-gallery__item--large"
              whileHover={{ scale: 1.02 }}
            >
              <img src="/assets/images/new-aircraft/r88/rhc-r88-atmospheric-effect-front-view-218022.jpg" alt="R88" />
              <span className="sales-gallery__label">R88 — The Future</span>
            </motion.div>
            <motion.div
              className="sales-gallery__item"
              whileHover={{ scale: 1.02 }}
            >
              <img src="/assets/images/new-aircraft/r66/rhc-r66-nxg-pv-left-side-wide-view-13611.jpg" alt="R66" />
              <span className="sales-gallery__label">R66 Palo Verde</span>
            </motion.div>
            <motion.div
              className="sales-gallery__item"
              whileHover={{ scale: 1.02 }}
            >
              <img src="/assets/images/new-aircraft/r66/rhc-r66-nxg-riviera-dramatic-overhead-13365.jpg" alt="R66 Interior" />
              <span className="sales-gallery__label">R66 Interior</span>
            </motion.div>
            <motion.div
              className="sales-gallery__item"
              whileHover={{ scale: 1.02 }}
            >
              <img src="/assets/images/new-aircraft/r88/rhc-r88-left-pilot-seat-full-frame-13570.jpg" alt="R88 Cockpit" />
              <span className="sales-gallery__label">R88 Cockpit</span>
            </motion.div>
            <motion.div
              className="sales-gallery__item"
              whileHover={{ scale: 1.02 }}
            >
              <img src="/assets/images/new-aircraft/r88/rhc-r88-glass-flight-displays-right-side-cyclic-13216.jpg" alt="Avionics" />
              <span className="sales-gallery__label">Glass Cockpit</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 15: SAFETY FEATURES ========== */}
      <section className="sales-safety">
        <div className="sales-safety__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Built to Protect</span>
              <h2>
                <span className="sales-text--dark">Robinson</span>{' '}
                <span className="sales-text--mid">Safety</span>
              </h2>
              <p>Decades of engineering focused on pilot and passenger protection.</p>
            </div>
          </Reveal>

          <div className="sales-safety__grid">
            {safetyFeatures.map((feature, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  className="sales-safety__item"
                  whileHover={{ backgroundColor: '#1a1a1a', color: '#fff' }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="sales-safety__icon">{feature.icon}</span>
                  <div className="sales-safety__text">
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div className="sales-safety__cta">
              <p>Robinson helicopters meet or exceed all FAA and EASA safety requirements.</p>
              <a href="/training/safety" className="sales-btn sales-btn--outline">
                Safety Training
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 16: ACCESSORIES ========== */}
      <section className="sales-accessories">
        <div className="sales-accessories__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Essential Add-Ons</span>
              <h2>
                <span className="sales-text--dark">Accessories</span>{' '}
                <span className="sales-text--mid">& Equipment</span>
              </h2>
              <p>Complete your purchase with genuine Robinson accessories.</p>
            </div>
          </Reveal>

          <div className="sales-accessories__grid">
            {accessories.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <motion.div
                  className="sales-accessories__item"
                  whileHover={{ y: -4, borderColor: '#1a1a1a' }}
                >
                  <span className="sales-accessories__category">{item.category}</span>
                  <h4>{item.name}</h4>
                  <span className="sales-accessories__price">{item.price}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="sales-accessories__cta">
              <Link to="/store" className="sales-btn sales-btn--primary">
                View Full Catalog
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 17: TRAINING PACKAGES ========== */}
      <section className="sales-training">
        <div className="sales-training__container">
          <div className="sales-training__grid">
            <div className="sales-training__content">
              <Reveal>
                <span className="sales-pre-text">Learn to Fly</span>
                <h2>
                  <span className="sales-text--dark">Training</span>{' '}
                  <span className="sales-text--mid">Packages</span>
                </h2>
                <p>
                  Every new aircraft purchase includes transition training.
                  Need more? We offer comprehensive packages for new pilots.
                </p>
              </Reveal>

              <div className="sales-training__packages">
                {trainingPackages.map((pkg, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <motion.div
                      className="sales-training__package"
                      whileHover={{ x: 8 }}
                    >
                      <div className="sales-training__package-header">
                        <h4>{pkg.name}</h4>
                        <span className="sales-training__hours">{pkg.hours} hrs</span>
                      </div>
                      <ul>
                        {pkg.includes.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                      <span className="sales-training__price">{pkg.price}</span>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="sales-training__visual">
              <Reveal direction="right">
                <img
                  src="/assets/images/training/instructor-student.jpg"
                  alt="Flight Training"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 18: MAINTENANCE PLANS ========== */}
      <section className="sales-maintenance">
        <div className="sales-maintenance__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Worry-Free Ownership</span>
              <h2>
                <span className="sales-text--dark">Maintenance</span>{' '}
                <span className="sales-text--mid">Plans</span>
              </h2>
              <p>Predictable costs and expert care for your investment.</p>
            </div>
          </Reveal>

          <div className="sales-maintenance__grid">
            {maintenancePackages.map((pkg, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className={`sales-maintenance__card ${pkg.featured ? 'sales-maintenance__card--featured' : ''}`}
                  whileHover={{ y: -8 }}
                >
                  {pkg.featured && <div className="sales-maintenance__badge">Recommended</div>}
                  <h4>{pkg.name}</h4>
                  <span className="sales-maintenance__coverage">{pkg.coverage}</span>
                  <div className="sales-maintenance__price">
                    <span className="sales-maintenance__amount">{pkg.price}</span>
                  </div>
                  <ul>
                    {pkg.features.map((feature, j) => (
                      <li key={j}>
                        <span className="sales-maintenance__check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href="/contact?subject=maintenance" className="sales-btn sales-btn--outline sales-btn--full">
                    Learn More
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 19: RECENT DELIVERIES ========== */}
      <section className="sales-deliveries">
        <div className="sales-deliveries__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Happy Owners</span>
              <h2>
                <span className="sales-text--dark">Recent</span>{' '}
                <span className="sales-text--mid">Deliveries</span>
              </h2>
            </div>
          </Reveal>

          <div className="sales-deliveries__grid">
            {recentDeliveries.map((delivery, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="sales-deliveries__card"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="sales-deliveries__image">
                    <img src={delivery.image} alt={delivery.model} />
                  </div>
                  <div className="sales-deliveries__info">
                    <h4>{delivery.model}</h4>
                    <span className="sales-deliveries__owner">{delivery.owner}</span>
                    <div className="sales-deliveries__meta">
                      <span>{delivery.location}</span>
                      <span>{delivery.date}</span>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 20: INTERNATIONAL SALES ========== */}
      <section className="sales-international">
        <div className="sales-international__inner">
          <Reveal>
            <div className="sales-international__content">
              <span className="sales-pre-text">Global Reach</span>
              <h2>
                <span className="sales-text--white">Worldwide</span>{' '}
                <span className="sales-text--light">Delivery</span>
              </h2>
              <p>
                From Denham to anywhere on the planet. We handle export documentation,
                ferry flights, and coordinate with local aviation authorities for
                seamless international delivery.
              </p>
              <div className="sales-international__stats">
                <div className="sales-international__stat">
                  <span className="sales-international__num">40+</span>
                  <span>Countries</span>
                </div>
                <div className="sales-international__stat">
                  <span className="sales-international__num">6</span>
                  <span>Continents</span>
                </div>
                <div className="sales-international__stat">
                  <span className="sales-international__num">500+</span>
                  <span>Deliveries</span>
                </div>
              </div>
              <a href="/contact?subject=international" className="sales-btn sales-btn--white">
                International Enquiry
              </a>
            </div>
          </Reveal>
          <div className="sales-international__map">
            <svg viewBox="0 0 800 400" className="sales-international__globe">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.1)" />
                </pattern>
              </defs>
              <rect width="800" height="400" fill="url(#grid)" />
              <circle cx="400" cy="200" r="150" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <circle cx="400" cy="200" r="100" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <circle cx="400" cy="200" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <circle cx="320" cy="180" r="6" fill="#fff" />
              <text x="320" y="165" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle">UK</text>
              <circle cx="520" cy="220" r="4" fill="rgba(255,255,255,0.5)" />
              <circle cx="280" cy="250" r="4" fill="rgba(255,255,255,0.5)" />
              <circle cx="450" cy="140" r="4" fill="rgba(255,255,255,0.5)" />
              <circle cx="600" cy="190" r="4" fill="rgba(255,255,255,0.5)" />
            </svg>
          </div>
        </div>
      </section>

      {/* ========== SECTION 21: INSURANCE PARTNERS ========== */}
      <section className="sales-insurance">
        <div className="sales-insurance__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Protection Partners</span>
              <h2>
                <span className="sales-text--dark">Aviation</span>{' '}
                <span className="sales-text--mid">Insurance</span>
              </h2>
              <p>Work with leading aviation insurers for competitive coverage.</p>
            </div>
          </Reveal>

          <div className="sales-insurance__grid">
            <Reveal delay={0.1}>
              <div className="sales-insurance__card">
                <div className="sales-insurance__icon">H</div>
                <h4>Hayward Aviation</h4>
                <span className="sales-insurance__specialty">Fleet & Training Specialists</span>
                <p>Preferred partner for flight schools and fleet operators. Competitive rates for Robinson aircraft.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="sales-insurance__card">
                <div className="sales-insurance__icon">G</div>
                <h4>Global Aerospace</h4>
                <span className="sales-insurance__specialty">Private & Commercial</span>
                <p>Comprehensive coverage for private owners and commercial operators worldwide.</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="sales-insurance__card">
                <div className="sales-insurance__icon">W</div>
                <h4>Willis Towers Watson</h4>
                <span className="sales-insurance__specialty">Corporate Solutions</span>
                <p>Tailored programs for corporate flight departments and high-value operations.</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <p className="sales-insurance__note">
              We can introduce you to our insurance partners during the purchase process.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 22: FAQ ========== */}
      <section className="sales-faq">
        <div className="sales-faq__container">
          <div className="sales-faq__grid">
            <div className="sales-faq__header">
              <Reveal>
                <span className="sales-pre-text">Questions</span>
                <h2>
                  <span className="sales-text--dark">Frequently</span>{' '}
                  <span className="sales-text--mid">Asked</span>
                </h2>
                <p>Everything you need to know about buying a helicopter.</p>
                <div className="sales-faq__contact">
                  <p>Can't find your answer?</p>
                  <a href="/contact" className="sales-btn sales-btn--outline">
                    Contact Us
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="sales-faq__list">
              {faqItems.map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <details className="sales-faq__item">
                    <summary className="sales-faq__question">
                      <span>{item.q}</span>
                      <span className="sales-faq__toggle">+</span>
                    </summary>
                    <div className="sales-faq__answer">
                      <p>{item.a}</p>
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 23: FLEET MANAGEMENT ========== */}
      <section className="sales-fleet">
        <div className="sales-fleet__container">
          <div className="sales-fleet__grid">
            <div className="sales-fleet__visual">
              <Reveal direction="left">
                <img
                  src="/assets/images/facility/hq-aviation-robinsons.jpg"
                  alt="HQ Aviation Fleet"
                />
              </Reveal>
            </div>

            <div className="sales-fleet__content">
              <Reveal>
                <span className="sales-pre-text">For Operators</span>
                <h2>
                  <span className="sales-text--dark">Fleet</span>{' '}
                  <span className="sales-text--mid">Management</span>
                </h2>
                <p>
                  Operating multiple helicopters? We offer comprehensive fleet solutions
                  including volume purchasing, centralized maintenance, crew training,
                  and operations support.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <ul className="sales-fleet__benefits">
                  <li>Volume discounts on new aircraft</li>
                  <li>Consolidated maintenance scheduling</li>
                  <li>Dedicated account manager</li>
                  <li>Priority parts availability</li>
                  <li>Crew standardization training</li>
                  <li>Regulatory compliance support</li>
                </ul>
              </Reveal>

              <Reveal delay={0.3}>
                <a href="/contact?subject=fleet" className="sales-btn sales-btn--primary">
                  Fleet Enquiry
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 24: DELIVERY TIMELINE ========== */}
      <section className="sales-timeline">
        <div className="sales-timeline__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Your Journey</span>
              <h2>
                <span className="sales-text--dark">Delivery</span>{' '}
                <span className="sales-text--mid">Timeline</span>
              </h2>
              <p>From order to flight — here's what to expect.</p>
            </div>
          </Reveal>

          <div className="sales-timeline__visual">
            <div className="sales-timeline__line" />

            <Reveal delay={0.1}>
              <div className="sales-timeline__point">
                <span className="sales-timeline__marker">●</span>
                <div className="sales-timeline__content">
                  <span className="sales-timeline__month">Month 0</span>
                  <h4>Order Placed</h4>
                  <p>Configuration finalized, deposit paid, factory slot secured</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="sales-timeline__point">
                <span className="sales-timeline__marker">●</span>
                <div className="sales-timeline__content">
                  <span className="sales-timeline__month">Month 3-6</span>
                  <h4>Production</h4>
                  <p>Aircraft enters production queue at Robinson factory, Torrance CA</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="sales-timeline__point">
                <span className="sales-timeline__marker">●</span>
                <div className="sales-timeline__content">
                  <span className="sales-timeline__month">Month 6-9</span>
                  <h4>Completion</h4>
                  <p>Paint, options, and factory flight testing completed</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="sales-timeline__point">
                <span className="sales-timeline__marker">●</span>
                <div className="sales-timeline__content">
                  <span className="sales-timeline__month">Month 9-12</span>
                  <h4>Shipping</h4>
                  <p>Sea freight to UK or ferry flight arranged</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="sales-timeline__point sales-timeline__point--final">
                <span className="sales-timeline__marker">★</span>
                <div className="sales-timeline__content">
                  <span className="sales-timeline__month">Delivery Day</span>
                  <h4>Handover</h4>
                  <p>Registration, training, and first flight at HQ Aviation</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.6}>
            <p className="sales-timeline__note">
              Timelines vary by model and factory demand. Current lead times available on request.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 25: AIRCRAFT VALUATION ========== */}
      <section className="sales-valuation">
        <div className="sales-valuation__container">
          <div className="sales-valuation__card">
            <Reveal>
              <div className="sales-valuation__icon">◈</div>
              <h2>Free Aircraft Valuation</h2>
              <p>
                Thinking of selling or trading? Get a no-obligation market valuation
                from our experienced team. We assess condition, hours, equipment,
                and current market trends.
              </p>
              <div className="sales-valuation__form">
                <div className="sales-valuation__inputs">
                  <input type="text" placeholder="Aircraft Make/Model" />
                  <input type="text" placeholder="Year" />
                  <input type="text" placeholder="Hours" />
                  <input type="email" placeholder="Email Address" />
                </div>
                <button type="button" className="sales-btn sales-btn--primary">
                  Request Valuation
                </button>
              </div>
              <span className="sales-valuation__note">Response within 24 hours</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== SECTION 26: UPCOMING EVENTS ========== */}
      <section className="sales-events">
        <div className="sales-events__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Join Us</span>
              <h2>
                <span className="sales-text--dark">Upcoming</span>{' '}
                <span className="sales-text--mid">Events</span>
              </h2>
            </div>
          </Reveal>

          <div className="sales-events__grid">
            {upcomingEvents.map((event, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="sales-events__card"
                  whileHover={{ y: -4, borderColor: '#1a1a1a' }}
                >
                  <div className="sales-events__date">
                    <span className="sales-events__day">{event.date}</span>
                    <span className="sales-events__month">{event.month}</span>
                  </div>
                  <div className="sales-events__info">
                    <span className="sales-events__type">{event.type}</span>
                    <h4>{event.title}</h4>
                    <span className="sales-events__location">{event.location}</span>
                  </div>
                  <a href="/contact?subject=event" className="sales-events__link">
                    Register →
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 27: LEASEBACK OPPORTUNITY ========== */}
      <section className="sales-leaseback">
        <div className="sales-leaseback__inner">
          <Reveal>
            <div className="sales-leaseback__content">
              <span className="sales-pre-text">Earn While You Own</span>
              <h2>
                <span className="sales-text--white">Leaseback</span>{' '}
                <span className="sales-text--light">Program</span>
              </h2>
              <p>
                Put your aircraft to work when you're not flying. Our leaseback program
                allows owners to earn revenue through charter and training operations,
                offsetting ownership costs significantly.
              </p>
              <div className="sales-leaseback__benefits">
                <div className="sales-leaseback__benefit">
                  <span className="sales-leaseback__benefit-icon">£</span>
                  <div>
                    <h5>Revenue Share</h5>
                    <span>Up to 60% of hourly rates</span>
                  </div>
                </div>
                <div className="sales-leaseback__benefit">
                  <span className="sales-leaseback__benefit-icon">⟳</span>
                  <div>
                    <h5>Maintenance</h5>
                    <span>Handled by our Part 145</span>
                  </div>
                </div>
                <div className="sales-leaseback__benefit">
                  <span className="sales-leaseback__benefit-icon">✓</span>
                  <div>
                    <h5>Insurance</h5>
                    <span>Commercial coverage included</span>
                  </div>
                </div>
              </div>
              <a href="/services/leaseback" className="sales-btn sales-btn--white">
                Learn More
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 28: HERITAGE TIMELINE ========== */}
      <section className="sales-heritage">
        <div className="sales-heritage__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Our Story</span>
              <h2>
                <span className="sales-text--dark">35 Years</span>{' '}
                <span className="sales-text--mid">of Excellence</span>
              </h2>
              <p>A legacy of trust, expertise, and passion for rotorcraft.</p>
            </div>
          </Reveal>

          <div className="sales-heritage__timeline">
            {heritageTimeline.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  className="sales-heritage__item"
                  whileHover={{ x: 4 }}
                >
                  <span className="sales-heritage__year">{item.year}</span>
                  <div className="sales-heritage__dot" />
                  <span className="sales-heritage__event">{item.event}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 29: PAINT SCHEMES ========== */}
      <section className="sales-paint">
        <div className="sales-paint__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Personalization</span>
              <h2>
                <span className="sales-text--dark">Paint</span>{' '}
                <span className="sales-text--mid">Schemes</span>
              </h2>
              <p>From factory standards to full bespoke designs.</p>
            </div>
          </Reveal>

          <div className="sales-paint__grid">
            {paintSchemes.map((scheme, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  className="sales-paint__card"
                  whileHover={{ y: -8 }}
                >
                  <div className="sales-paint__image">
                    <img src={scheme.image} alt={scheme.name} />
                  </div>
                  <div className="sales-paint__info">
                    <span className="sales-paint__type">{scheme.type}</span>
                    <h4>{scheme.name}</h4>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div className="sales-paint__cta">
              <p>Work with our design team to create your perfect livery.</p>
              <a href="/contact?subject=custom-paint" className="sales-btn sales-btn--outline">
                Design Consultation
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 30: INTERIOR OPTIONS ========== */}
      <section className="sales-interior">
        <div className="sales-interior__container">
          <div className="sales-interior__grid">
            <div className="sales-interior__visual">
              <Reveal direction="left">
                <img
                  src="/assets/images/new-aircraft/r66/rhc-r66-nxg-riviera-front-cockpit-wide-view-13425.jpg"
                  alt="R66 Interior"
                />
              </Reveal>
            </div>

            <div className="sales-interior__content">
              <Reveal>
                <span className="sales-pre-text">Cabin Refinement</span>
                <h2>
                  <span className="sales-text--dark">Interior</span>{' '}
                  <span className="sales-text--mid">Options</span>
                </h2>
                <p>
                  From practical durability to executive luxury, configure
                  your cabin to match your lifestyle.
                </p>
              </Reveal>

              <div className="sales-interior__options">
                {interiorOptions.map((option, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div className="sales-interior__option">
                      <span className="sales-interior__tier">{option.tier}</span>
                      <h4>{option.name}</h4>
                      <p>{option.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 31: MISSION PROFILES ========== */}
      <section className="sales-missions">
        <div className="sales-missions__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Find Your Fit</span>
              <h2>
                <span className="sales-text--dark">Mission</span>{' '}
                <span className="sales-text--mid">Profiles</span>
              </h2>
              <p>What will you use your helicopter for?</p>
            </div>
          </Reveal>

          <div className="sales-missions__grid">
            {missionProfiles.map((mission, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="sales-missions__card"
                  whileHover={{ y: -8, borderColor: '#1a1a1a' }}
                >
                  <span className="sales-missions__icon">{mission.icon}</span>
                  <h4>{mission.title}</h4>
                  <p className="sales-missions__desc">{mission.desc}</p>
                  <ul>
                    {mission.benefits.map((benefit, j) => (
                      <li key={j}>{benefit}</li>
                    ))}
                  </ul>
                  <div className="sales-missions__recommend">
                    <span>Recommended:</span>
                    <strong>{mission.recommended}</strong>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 32: OWNERSHIP CALCULATOR ========== */}
      <section className="sales-calculator">
        <div className="sales-calculator__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Know Your Costs</span>
              <h2>
                <span className="sales-text--dark">Cost of</span>{' '}
                <span className="sales-text--mid">Ownership</span>
              </h2>
              <p>Transparent breakdown of what to expect.</p>
            </div>
          </Reveal>

          <div className="sales-calculator__table-wrapper">
            <Reveal delay={0.2}>
              {ownershipCosts.map((section, i) => (
                <div key={i} className="sales-calculator__section">
                  <h4>{section.category}</h4>
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>R22</th>
                        <th>R44</th>
                        <th>R66</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item, j) => (
                        <tr key={j}>
                          <td>{item.name}</td>
                          <td>{item.r22}</td>
                          <td>{item.r44}</td>
                          <td>{item.r66}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <p className="sales-calculator__note">
              * Estimates based on 100 hours annual flying. Actual costs vary by usage and location.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 33: RESALE VALUE ========== */}
      <section className="sales-resale">
        <div className="sales-resale__inner">
          <Reveal>
            <div className="sales-resale__content">
              <span className="sales-pre-text">Investment Protection</span>
              <h2>
                <span className="sales-text--white">Industry-Leading</span>{' '}
                <span className="sales-text--light">Resale Value</span>
              </h2>
              <p>
                Robinson helicopters consistently hold their value better than
                any other brand in the light helicopter market.
              </p>

              <div className="sales-resale__stats">
                {resaleData.map((item, i) => (
                  <div key={i} className="sales-resale__stat">
                    <span className="sales-resale__retention">{item.retention}</span>
                    <span className="sales-resale__model">{item.model}</span>
                    <span className="sales-resale__age">After {item.age}</span>
                  </div>
                ))}
              </div>

              <p className="sales-resale__sub">
                We also offer guaranteed buy-back programs for select purchases.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 34: AWARDS ========== */}
      <section className="sales-awards">
        <div className="sales-awards__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Recognition</span>
              <h2>
                <span className="sales-text--dark">Awards &</span>{' '}
                <span className="sales-text--mid">Achievements</span>
              </h2>
            </div>
          </Reveal>

          <div className="sales-awards__grid">
            {awards.map((award, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="sales-awards__card"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="sales-awards__year">{award.year}</span>
                  <div className="sales-awards__trophy">★</div>
                  <h4>{award.title}</h4>
                  <span className="sales-awards__org">{award.org}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 35: PILOT REQUIREMENTS ========== */}
      <section className="sales-requirements">
        <div className="sales-requirements__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Ready to Fly?</span>
              <h2>
                <span className="sales-text--dark">Pilot</span>{' '}
                <span className="sales-text--mid">Requirements</span>
              </h2>
              <p>What you need to fly each Robinson model.</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="sales-requirements__table-wrapper">
              <table className="sales-requirements__table">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>License</th>
                    <th>Type Rating</th>
                    <th>Min Hours</th>
                    <th>Medical</th>
                  </tr>
                </thead>
                <tbody>
                  {pilotRequirements.map((req, i) => (
                    <tr key={i}>
                      <td><strong>{req.model}</strong></td>
                      <td>{req.license}</td>
                      <td>{req.rating}</td>
                      <td>{req.minHours}</td>
                      <td>{req.medical}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="sales-requirements__note">
              * R88 requirements pending certification. Don't have a license? We offer complete training programs.
            </p>
            <div className="sales-requirements__cta">
              <Link to="/training" className="sales-btn sales-btn--primary">
                Training Programs
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 36: VS COMPETITION ========== */}
      <section className="sales-vs">
        <div className="sales-vs__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">The Smart Choice</span>
              <h2>
                <span className="sales-text--dark">Why</span>{' '}
                <span className="sales-text--mid">Robinson?</span>
              </h2>
              <p>How Robinson compares to other light helicopters.</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="sales-vs__table-wrapper">
              <table className="sales-vs__table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="sales-vs__robinson">Robinson</th>
                    <th>Others</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorComparison.map((row, i) => (
                    <tr key={i}>
                      <td>{row.feature}</td>
                      <td className="sales-vs__robinson">
                        <span className="sales-vs__check">✓</span> {row.robinson}
                      </td>
                      <td>{row.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 37: ENVIRONMENTAL ========== */}
      <section className="sales-environmental">
        <div className="sales-environmental__container">
          <div className="sales-environmental__grid">
            <div className="sales-environmental__content">
              <Reveal>
                <span className="sales-pre-text">Sustainability</span>
                <h2>
                  <span className="sales-text--dark">Environmental</span>{' '}
                  <span className="sales-text--mid">Responsibility</span>
                </h2>
                <p>
                  Robinson's efficient designs minimize environmental impact
                  while maximizing performance and value.
                </p>
              </Reveal>

              <div className="sales-environmental__metrics">
                {environmentalData.map((item, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="sales-environmental__metric">
                      <span className="sales-environmental__value">{item.value}</span>
                      <div>
                        <h4>{item.metric}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="sales-environmental__visual">
              <Reveal direction="right">
                <div className="sales-environmental__icon-large">
                  <svg viewBox="0 0 100 100" className="sales-environmental__leaf">
                    <path
                      d="M50 10 C20 30, 10 70, 50 90 C90 70, 80 30, 50 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M50 30 L50 75 M50 45 L35 35 M50 55 L65 45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 38: VIDEO SHOWCASE ========== */}
      <section className="sales-video">
        <div className="sales-video__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Watch</span>
              <h2>
                <span className="sales-text--white">Video</span>{' '}
                <span className="sales-text--light">Gallery</span>
              </h2>
            </div>
          </Reveal>

          <div className="sales-video__grid">
            {videoContent.map((video, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="sales-video__card"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="sales-video__thumbnail">
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="sales-video__play">
                      <span>▶</span>
                    </div>
                    <span className="sales-video__duration">{video.duration}</span>
                  </div>
                  <h4>{video.title}</h4>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 39: SOCIAL PROOF STATS ========== */}
      <section className="sales-proof">
        <div className="sales-proof__container">
          <div className="sales-proof__grid">
            {socialProofStats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="sales-proof__stat"
                  whileHover={{ y: -4 }}
                >
                  <span className="sales-proof__value">
                    {stat.value}<span className="sales-proof__suffix">{stat.suffix}</span>
                  </span>
                  <span className="sales-proof__label">{stat.label}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 40: SPECIFICATION DEEP DIVE ========== */}
      <section className="sales-specs">
        <div className="sales-specs__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Technical Data</span>
              <h2>
                <span className="sales-text--dark">R66</span>{' '}
                <span className="sales-text--mid">Specifications</span>
              </h2>
            </div>
          </Reveal>

          <div className="sales-specs__grid">
            <Reveal delay={0.1}>
              <div className="sales-specs__category">
                <h4>Dimensions</h4>
                <dl>
                  <dt>Overall Length</dt><dd>{specificationDetails.r66.dimensions.length}</dd>
                  <dt>Overall Height</dt><dd>{specificationDetails.r66.dimensions.height}</dd>
                  <dt>Cabin Width</dt><dd>{specificationDetails.r66.dimensions.width}</dd>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="sales-specs__category">
                <h4>Weights</h4>
                <dl>
                  <dt>Empty Weight</dt><dd>{specificationDetails.r66.weights.empty}</dd>
                  <dt>Max Gross</dt><dd>{specificationDetails.r66.weights.maxGross}</dd>
                  <dt>Useful Load</dt><dd>{specificationDetails.r66.weights.useful}</dd>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="sales-specs__category">
                <h4>Performance</h4>
                <dl>
                  <dt>Cruise Speed</dt><dd>{specificationDetails.r66.performance.cruise}</dd>
                  <dt>Max Speed</dt><dd>{specificationDetails.r66.performance.maxSpeed}</dd>
                  <dt>Range</dt><dd>{specificationDetails.r66.performance.range}</dd>
                  <dt>Endurance</dt><dd>{specificationDetails.r66.performance.endurance}</dd>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="sales-specs__category">
                <h4>Powerplant</h4>
                <dl>
                  <dt>Engine</dt><dd>{specificationDetails.r66.engine.type}</dd>
                  <dt>Max Power</dt><dd>{specificationDetails.r66.engine.power}</dd>
                  <dt>Fuel Type</dt><dd>{specificationDetails.r66.engine.fuel}</dd>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========== SECTION 41: PARTNER NETWORK ========== */}
      <section className="sales-network">
        <div className="sales-network__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Global Support</span>
              <h2>
                <span className="sales-text--dark">Worldwide</span>{' '}
                <span className="sales-text--mid">Dealer Network</span>
              </h2>
              <p>Robinson's global network ensures support wherever you fly.</p>
            </div>
          </Reveal>

          <div className="sales-network__grid">
            {partnerLocations.map((region, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="sales-network__card"
                  whileHover={{ y: -4 }}
                >
                  <span className="sales-network__count">{region.count}</span>
                  <h4>{region.region}</h4>
                  <p>{region.countries.join(' · ')}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div className="sales-network__total">
              <span className="sales-network__total-num">200+</span>
              <span className="sales-network__total-label">Service Centers Worldwide</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 42: HANGARAGE ========== */}
      <section className="sales-hangarage">
        <div className="sales-hangarage__container">
          <div className="sales-hangarage__grid">
            <div className="sales-hangarage__content">
              <Reveal>
                <span className="sales-pre-text">Storage Solutions</span>
                <h2>
                  <span className="sales-text--dark">Hangarage</span>{' '}
                  <span className="sales-text--mid">at HQ</span>
                </h2>
                <p>
                  Keep your helicopter safe and ready at Denham Aerodrome.
                  Multiple packages to suit your needs.
                </p>
              </Reveal>

              <div className="sales-hangarage__tiers">
                {hangarageOptions.map((tier, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="sales-hangarage__tier">
                      <div className="sales-hangarage__tier-header">
                        <h4>{tier.tier}</h4>
                        <span className="sales-hangarage__price">{tier.price}</span>
                      </div>
                      <ul>
                        {tier.features.map((feature, j) => (
                          <li key={j}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="sales-hangarage__visual">
              <Reveal direction="right">
                <img
                  src="/assets/images/facility/hq-aviation-robinsons.jpg"
                  alt="HQ Aviation Hangar"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 43: PRE-PURCHASE INSPECTION ========== */}
      <section className="sales-inspection">
        <div className="sales-inspection__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Buy with Confidence</span>
              <h2>
                <span className="sales-text--dark">Pre-Purchase</span>{' '}
                <span className="sales-text--mid">Inspection</span>
              </h2>
              <p>Expert evaluation before you commit to a used aircraft.</p>
            </div>
          </Reveal>

          <div className="sales-inspection__grid">
            {inspectionPackages.map((pkg, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="sales-inspection__card"
                  whileHover={{ y: -8 }}
                >
                  <h4>{pkg.name}</h4>
                  <div className="sales-inspection__meta">
                    <span>{pkg.duration}</span>
                    <span className="sales-inspection__price">{pkg.price}</span>
                  </div>
                  <ul>
                    {pkg.includes.map((item, j) => (
                      <li key={j}>
                        <span className="sales-inspection__check">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="/contact?subject=inspection" className="sales-btn sales-btn--outline sales-btn--full">
                    Book Inspection
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 44: DEMO FLIGHT BOOKING ========== */}
      <section className="sales-demo">
        <div className="sales-demo__inner">
          <Reveal>
            <div className="sales-demo__content">
              <span className="sales-pre-text">Experience First</span>
              <h2>
                <span className="sales-text--white">Book a</span>{' '}
                <span className="sales-text--light">Demo Flight</span>
              </h2>
              <p>
                The best way to know if a helicopter is right for you is to fly it.
                Schedule a demonstration flight at Denham Aerodrome.
              </p>
              <div className="sales-demo__form">
                <select className="sales-demo__select">
                  <option>Select Model</option>
                  <option>R22 Beta II</option>
                  <option>R44 Raven II</option>
                  <option>R66 Turbine</option>
                </select>
                <input type="text" placeholder="Your Name" className="sales-demo__input" />
                <input type="email" placeholder="Email Address" className="sales-demo__input" />
                <input type="tel" placeholder="Phone Number" className="sales-demo__input" />
                <button type="button" className="sales-btn sales-btn--white sales-btn--full">
                  Request Demo
                </button>
              </div>
              <span className="sales-demo__note">Demo flights are subject to availability and weather conditions.</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 45: CUSTOMER MAP ========== */}
      <section className="sales-customermap">
        <div className="sales-customermap__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Our Community</span>
              <h2>
                <span className="sales-text--dark">Where Our</span>{' '}
                <span className="sales-text--mid">Customers Fly</span>
              </h2>
            </div>
          </Reveal>

          <div className="sales-customermap__visual">
            <Reveal delay={0.2}>
              <div className="sales-customermap__map">
                <svg viewBox="0 0 600 400" className="sales-customermap__svg">
                  <defs>
                    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#e04a2f" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#e04a2f" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* UK outline simplified */}
                  <path
                    d="M280 80 Q320 100 300 150 Q330 180 310 220 Q350 240 320 280 Q300 320 260 300 Q240 280 250 240 Q220 220 240 180 Q220 140 260 120 Q270 90 280 80"
                    fill="none"
                    stroke="#e8e6e2"
                    strokeWidth="2"
                  />
                  {/* Customer location dots */}
                  {customerLocations.map((loc, i) => (
                    <g key={i}>
                      <circle cx={280 + (i * 20 - 40)} cy={120 + i * 35} r="20" fill="url(#glow)" />
                      <circle cx={280 + (i * 20 - 40)} cy={120 + i * 35} r="6" fill="#e04a2f" />
                      <text x={280 + (i * 20 - 40)} y={100 + i * 35} textAnchor="middle" fontSize="10" fill="#666">
                        {loc.city}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <div className="sales-customermap__stats">
              <div className="sales-customermap__stat">
                <span className="sales-customermap__num">500+</span>
                <span>Active Owners</span>
              </div>
              <div className="sales-customermap__stat">
                <span className="sales-customermap__num">15</span>
                <span>Countries</span>
              </div>
              <div className="sales-customermap__stat">
                <span className="sales-customermap__num">35</span>
                <span>Years of Community</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 46: FACTORY TOUR ========== */}
      <section className="sales-factory">
        <div className="sales-factory__container">
          <div className="sales-factory__grid">
            <div className="sales-factory__visual">
              <Reveal direction="left">
                <div className="sales-factory__image">
                  <img
                    src="/assets/images/facility/hq-aviation-robinsons.jpg"
                    alt="Robinson Factory"
                  />
                  <div className="sales-factory__overlay">
                    <span className="sales-factory__play">▶</span>
                    <span className="sales-factory__text">Virtual Tour</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="sales-factory__content">
              <Reveal>
                <span className="sales-pre-text">Behind the Scenes</span>
                <h2>
                  <span className="sales-text--dark">Visit the</span>{' '}
                  <span className="sales-text--mid">Factory</span>
                </h2>
                <p>
                  See where your helicopter is born. Robinson's Torrance, California
                  facility welcomes prospective owners for exclusive factory tours.
                </p>
                <ul className="sales-factory__features">
                  <li>Watch your aircraft being built</li>
                  <li>Meet the engineering team</li>
                  <li>Tour the R&D facility</li>
                  <li>Complete Robinson safety course</li>
                </ul>
                <a href="/contact?subject=factory-tour" className="sales-btn sales-btn--primary">
                  Arrange Factory Visit
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 47: NEWSLETTER ========== */}
      <section className="sales-newsletter">
        <div className="sales-newsletter__container">
          <Reveal>
            <div className="sales-newsletter__content">
              <h2>Stay Informed</h2>
              <p>
                Get the latest on new models, special offers, and aviation news
                delivered to your inbox.
              </p>
              <div className="sales-newsletter__form">
                <input type="email" placeholder="Enter your email" />
                <button type="button" className="sales-btn sales-btn--primary">
                  Subscribe
                </button>
              </div>
              <span className="sales-newsletter__privacy">
                We respect your privacy. Unsubscribe anytime.
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 48: AVIONICS PACKAGES ========== */}
      <section className="sales-avionics">
        <div className="sales-avionics__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Cockpit Technology</span>
              <h2>
                <span className="sales-text--dark">Avionics</span>{' '}
                <span className="sales-text--mid">Packages</span>
              </h2>
              <p>State-of-the-art Garmin systems tailored to your mission.</p>
            </div>
          </Reveal>

          <div className="sales-avionics__grid">
            {avionicsPackages.map((pkg, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className={`sales-avionics__card ${pkg.featured ? 'sales-avionics__card--featured' : ''}`}
                  whileHover={{ y: -8 }}
                >
                  {pkg.featured && <div className="sales-avionics__badge">Most Popular</div>}
                  <h4>{pkg.name}</h4>
                  <ul>
                    {pkg.includes.map((item, j) => (
                      <li key={j}>
                        <span className="sales-avionics__check">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="sales-avionics__price">{pkg.price}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 49: WARRANTY OPTIONS ========== */}
      <section className="sales-warranty">
        <div className="sales-warranty__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Peace of Mind</span>
              <h2>
                <span className="sales-text--dark">Extended</span>{' '}
                <span className="sales-text--mid">Warranty</span>
              </h2>
              <p>Protect your investment with comprehensive coverage.</p>
            </div>
          </Reveal>

          <div className="sales-warranty__grid">
            {warrantyOptions.map((option, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="sales-warranty__card"
                  whileHover={{ borderColor: '#1a1a1a' }}
                >
                  <span className="sales-warranty__duration">{option.duration}</span>
                  <h4>{option.type}</h4>
                  <p>{option.coverage}</p>
                  <span className="sales-warranty__price">{option.price}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 50: DELIVERY OPTIONS ========== */}
      <section className="sales-delivery">
        <div className="sales-delivery__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Getting Your Aircraft</span>
              <h2>
                <span className="sales-text--dark">Delivery</span>{' '}
                <span className="sales-text--mid">Methods</span>
              </h2>
            </div>
          </Reveal>

          <div className="sales-delivery__grid">
            {deliveryOptions.map((option, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="sales-delivery__card"
                  whileHover={{ y: -4 }}
                >
                  <div className="sales-delivery__header">
                    <h4>{option.method}</h4>
                    <span className="sales-delivery__price">{option.price}</span>
                  </div>
                  <p className="sales-delivery__desc">{option.desc}</p>
                  <div className="sales-delivery__meta">
                    <span>📍 {option.location}</span>
                    <span>⏱ {option.time}</span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 51: FLIGHT PLANNING TOOLS ========== */}
      <section className="sales-tools">
        <div className="sales-tools__inner">
          <Reveal>
            <div className="sales-tools__content">
              <span className="sales-pre-text">Mission Planning</span>
              <h2>
                <span className="sales-text--white">Flight</span>{' '}
                <span className="sales-text--light">Planning Tools</span>
              </h2>
              <p>Essential apps and resources for helicopter operations.</p>

              <div className="sales-tools__grid">
                {flightTools.map((tool, i) => (
                  <motion.div
                    key={i}
                    className="sales-tools__item"
                    whileHover={{ x: 4 }}
                  >
                    <span className="sales-tools__logo">{tool.logo}</span>
                    <div>
                      <h4>{tool.name}</h4>
                      <span className="sales-tools__type">{tool.type}</span>
                      <p>{tool.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 52: MEMBERSHIP BENEFITS ========== */}
      <section className="sales-membership">
        <div className="sales-membership__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Owner Perks</span>
              <h2>
                <span className="sales-text--dark">HQ Owner</span>{' '}
                <span className="sales-text--mid">Membership</span>
              </h2>
              <p>Exclusive benefits when you purchase from HQ Aviation.</p>
            </div>
          </Reveal>

          <div className="sales-membership__grid">
            {membershipBenefits.map((benefit, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  className="sales-membership__card"
                  whileHover={{ y: -4, background: '#1a1a1a', color: '#fff' }}
                >
                  <span className="sales-membership__icon">{benefit.icon}</span>
                  <h4>{benefit.title}</h4>
                  <p>{benefit.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 53: TECHNICAL SUPPORT ========== */}
      <section className="sales-techsupport">
        <div className="sales-techsupport__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Always Available</span>
              <h2>
                <span className="sales-text--dark">Technical</span>{' '}
                <span className="sales-text--mid">Support</span>
              </h2>
              <p>Expert help when you need it, however you need it.</p>
            </div>
          </Reveal>

          <div className="sales-techsupport__grid">
            {techSupport.map((channel, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="sales-techsupport__card">
                  <h4>{channel.channel}</h4>
                  <div className="sales-techsupport__details">
                    <div>
                      <span className="sales-techsupport__label">Availability</span>
                      <span className="sales-techsupport__value">{channel.availability}</span>
                    </div>
                    <div>
                      <span className="sales-techsupport__label">Response</span>
                      <span className="sales-techsupport__value">{channel.response}</span>
                    </div>
                  </div>
                  <span className="sales-techsupport__contact">{channel.number}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 54: COMPONENT EXCHANGE ========== */}
      <section className="sales-exchange">
        <div className="sales-exchange__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Cost Savings</span>
              <h2>
                <span className="sales-text--dark">Component</span>{' '}
                <span className="sales-text--mid">Exchange</span>
              </h2>
              <p>Save up to 47% on major components with our exchange program.</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="sales-exchange__table-wrapper">
              <table className="sales-exchange__table">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Exchange Price</th>
                    <th>New Price</th>
                    <th>Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {componentExchange.map((item, i) => (
                    <tr key={i}>
                      <td>{item.component}</td>
                      <td className="sales-exchange__highlight">{item.exchange}</td>
                      <td>{item.new}</td>
                      <td className="sales-exchange__savings">{item.savings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 55: FLIGHT SCHOOL PARTNERSHIPS ========== */}
      <section className="sales-schools">
        <div className="sales-schools__container">
          <div className="sales-schools__grid">
            <div className="sales-schools__content">
              <Reveal>
                <span className="sales-pre-text">Learn to Fly</span>
                <h2>
                  <span className="sales-text--dark">Training</span>{' '}
                  <span className="sales-text--mid">Partners</span>
                </h2>
                <p>
                  Whether you're starting from zero or adding a type rating,
                  our partner schools offer the highest quality instruction.
                </p>
              </Reveal>

              <div className="sales-schools__list">
                {flightSchools.map((school, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="sales-schools__item">
                      <div className="sales-schools__info">
                        <h4>{school.name}</h4>
                        <span>{school.location}</span>
                      </div>
                      <span className="sales-schools__specialty">{school.specialty}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="sales-schools__visual">
              <Reveal direction="right">
                <img
                  src="/assets/images/training/instructor-student.jpg"
                  alt="Flight Training"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 56: UPGRADE PATHS ========== */}
      <section className="sales-upgrade">
        <div className="sales-upgrade__inner">
          <Reveal>
            <div className="sales-upgrade__content">
              <span className="sales-pre-text">Grow With Us</span>
              <h2>
                <span className="sales-text--white">Upgrade</span>{' '}
                <span className="sales-text--light">Paths</span>
              </h2>
              <p>Your next helicopter is always closer than you think.</p>

              <div className="sales-upgrade__paths">
                {upgradePaths.map((path, i) => (
                  <motion.div
                    key={i}
                    className="sales-upgrade__path"
                    whileHover={{ x: 8 }}
                  >
                    <div className="sales-upgrade__models">
                      <span className="sales-upgrade__from">{path.from}</span>
                      <span className="sales-upgrade__arrow">→</span>
                      <span className="sales-upgrade__to">{path.to}</span>
                    </div>
                    <p>{path.benefit}</p>
                    <span className="sales-upgrade__tradein">Trade-in: {path.tradein}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 57: REGULATORY INFO ========== */}
      <section className="sales-regulatory">
        <div className="sales-regulatory__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Compliance</span>
              <h2>
                <span className="sales-text--dark">Regulatory</span>{' '}
                <span className="sales-text--mid">Information</span>
              </h2>
              <p>All Robinson helicopters meet international certification standards.</p>
            </div>
          </Reveal>

          <div className="sales-regulatory__grid">
            {regulatoryBodies.map((body, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="sales-regulatory__card">
                  <span className="sales-regulatory__name">{body.name}</span>
                  <span className="sales-regulatory__region">{body.region}</span>
                  <p>{body.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 58: OWNER STORIES ========== */}
      <section className="sales-stories">
        <div className="sales-stories__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Real Owners</span>
              <h2>
                <span className="sales-text--dark">Owner</span>{' '}
                <span className="sales-text--mid">Stories</span>
              </h2>
            </div>
          </Reveal>

          <div className="sales-stories__grid">
            {ownerStories.map((story, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <motion.div
                  className="sales-stories__card"
                  whileHover={{ y: -4 }}
                >
                  <div className="sales-stories__header">
                    <span className="sales-stories__usecase">{story.useCase}</span>
                    <span className="sales-stories__aircraft">{story.aircraft}</span>
                  </div>
                  <blockquote>{story.story}</blockquote>
                  <div className="sales-stories__footer">
                    <span className="sales-stories__name">{story.name}</span>
                    <span className="sales-stories__meta">{story.hours} hours · Since {story.purchased}</span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 59: CONSIGNMENT SALES ========== */}
      <section className="sales-consignment">
        <div className="sales-consignment__container">
          <div className="sales-consignment__grid">
            <div className="sales-consignment__content">
              <Reveal>
                <span className="sales-pre-text">Selling Your Aircraft?</span>
                <h2>
                  <span className="sales-text--dark">Consignment</span>{' '}
                  <span className="sales-text--mid">Sales</span>
                </h2>
                <p>
                  Let HQ Aviation sell your helicopter. We handle everything
                  from marketing to transaction, ensuring you get the best price.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <ul className="sales-consignment__benefits">
                  {consignmentBenefits.map((benefit, i) => (
                    <li key={i}>
                      <span className="sales-consignment__check">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.3}>
                <a href="/contact?subject=consignment" className="sales-btn sales-btn--primary">
                  Consign Your Aircraft
                </a>
              </Reveal>
            </div>

            <div className="sales-consignment__visual">
              <Reveal direction="right">
                <div className="sales-consignment__stat-box">
                  <span className="sales-consignment__stat-num">92%</span>
                  <span className="sales-consignment__stat-label">Sell within 90 days</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 60: SPECIAL EDITIONS ========== */}
      <section className="sales-editions">
        <div className="sales-editions__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Limited Production</span>
              <h2>
                <span className="sales-text--dark">Special</span>{' '}
                <span className="sales-text--mid">Editions</span>
              </h2>
              <p>Exclusive configurations with enhanced features.</p>
            </div>
          </Reveal>

          <div className="sales-editions__grid">
            {specialEditions.map((edition, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="sales-editions__card"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="sales-editions__limited">
                    Limited to {edition.limited}
                  </div>
                  <h4>{edition.name}</h4>
                  <span className="sales-editions__base">Based on {edition.base}</span>
                  <ul>
                    {edition.features.map((feature, j) => (
                      <li key={j}>{feature}</li>
                    ))}
                  </ul>
                  <a href={`/contact?subject=${edition.name.toLowerCase().replace(' ', '-')}`} className="sales-btn sales-btn--outline sales-btn--small">
                    Enquire
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 61: OPERATING BASES ========== */}
      <section className="sales-bases">
        <div className="sales-bases__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Where We Operate</span>
              <h2>
                <span className="sales-text--dark">Operating</span>{' '}
                <span className="sales-text--mid">Bases</span>
              </h2>
            </div>
          </Reveal>

          <div className="sales-bases__grid">
            {operatingBases.map((base, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="sales-bases__card"
                  whileHover={{ y: -4 }}
                >
                  <div className="sales-bases__header">
                    <h4>{base.name}</h4>
                    <span className="sales-bases__code">{base.code}</span>
                  </div>
                  <div className="sales-bases__details">
                    <div>
                      <span className="sales-bases__label">Runway</span>
                      <span>{base.runway}</span>
                    </div>
                    <div>
                      <span className="sales-bases__label">Fuel</span>
                      <span>{base.fuel}</span>
                    </div>
                  </div>
                  <p className="sales-bases__facilities">{base.facilities}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 62: CARBON OFFSET ========== */}
      <section className="sales-carbon">
        <div className="sales-carbon__inner">
          <Reveal>
            <div className="sales-carbon__content">
              <span className="sales-pre-text">Fly Responsibly</span>
              <h2>
                <span className="sales-text--white">Carbon</span>{' '}
                <span className="sales-text--light">Offset Program</span>
              </h2>
              <p>Offset your flight emissions through verified programs.</p>

              <div className="sales-carbon__details">
                <div className="sales-carbon__price">
                  <span className="sales-carbon__amount">{carbonProgram.cost}</span>
                  <span>per flight hour</span>
                </div>
                <div className="sales-carbon__projects">
                  <span className="sales-carbon__label">Projects Include:</span>
                  <ul>
                    {carbonProgram.projects.map((project, i) => (
                      <li key={i}>{project}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="sales-carbon__providers">
                Verified by: {carbonProgram.providers.join(' · ')}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 63: AIRCRAFT MANAGEMENT ========== */}
      <section className="sales-management">
        <div className="sales-management__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Full Service</span>
              <h2>
                <span className="sales-text--dark">Aircraft</span>{' '}
                <span className="sales-text--mid">Management</span>
              </h2>
              <p>Let us handle the details while you focus on flying.</p>
            </div>
          </Reveal>

          <div className="sales-management__grid">
            {managementServices.map((service, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  className="sales-management__item"
                  whileHover={{ x: 4 }}
                >
                  <div className="sales-management__info">
                    <h4>{service.service}</h4>
                    <p>{service.desc}</p>
                  </div>
                  <span className="sales-management__price">{service.price}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 64: QUICK CONTACTS ========== */}
      <section className="sales-contacts">
        <div className="sales-contacts__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">Direct Lines</span>
              <h2>
                <span className="sales-text--dark">Sales</span>{' '}
                <span className="sales-text--mid">Team</span>
              </h2>
            </div>
          </Reveal>

          <div className="sales-contacts__grid">
            {quickContacts.map((contact, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="sales-contacts__card"
                  whileHover={{ y: -4, borderColor: '#1a1a1a' }}
                >
                  <span className="sales-contacts__dept">{contact.dept}</span>
                  <h4>{contact.name}</h4>
                  <a href={`mailto:${contact.email}`} className="sales-contacts__email">
                    {contact.email}
                  </a>
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="sales-contacts__phone">
                    {contact.phone}
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 65: QUICK COMPARISON ========== */}
      <section className="sales-quickcompare">
        <div className="sales-quickcompare__container">
          <Reveal>
            <div className="sales-section-header">
              <span className="sales-pre-text">At a Glance</span>
              <h2>
                <span className="sales-text--dark">Which Model</span>{' '}
                <span className="sales-text--mid">Is Right?</span>
              </h2>
            </div>
          </Reveal>

          <div className="sales-quickcompare__grid">
            {quickComparison.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="sales-quickcompare__card"
                  whileHover={{ y: -4 }}
                >
                  <h4>{item.model}</h4>
                  <div className="sales-quickcompare__ideal">
                    <span className="sales-quickcompare__label">Ideal For</span>
                    <p>{item.ideal}</p>
                  </div>
                  <div className="sales-quickcompare__notideal">
                    <span className="sales-quickcompare__label">Not Ideal For</span>
                    <p>{item.notIdeal}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 66: LIVE CHAT ========== */}
      <section className="sales-chat">
        <div className="sales-chat__container">
          <Reveal>
            <div className="sales-chat__content">
              <div className="sales-chat__icon">
                <span>💬</span>
              </div>
              <h2>Have Questions?</h2>
              <p>Our sales team is online and ready to help.</p>
              <button type="button" className="sales-btn sales-btn--primary">
                Start Live Chat
              </button>
              <span className="sales-chat__status">
                <span className="sales-chat__dot"></span>
                3 team members online
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SECTION 67: MOBILE APP ========== */}
      <section className="sales-app">
        <div className="sales-app__inner">
          <Reveal>
            <div className="sales-app__content">
              <span className="sales-pre-text">Coming Soon</span>
              <h2>
                <span className="sales-text--white">HQ Aviation</span>{' '}
                <span className="sales-text--light">App</span>
              </h2>
              <p>
                Manage your aircraft, book maintenance, track flights,
                and connect with the HQ community—all from your phone.
              </p>
              <div className="sales-app__features">
                <span>Flight Logging</span>
                <span>Maintenance Alerts</span>
                <span>Community Events</span>
                <span>Direct Support</span>
              </div>
              <div className="sales-app__notify">
                <input type="email" placeholder="Enter email for launch notification" />
                <button type="button" className="sales-btn sales-btn--white">
                  Notify Me
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== CONTACT CTA ========== */}
      <section className="sales-contact">
        <div className="sales-contact__inner">
          <Reveal>
            <div className="sales-contact__content">
              <span className="sales-pre-text">Ready to Begin?</span>
              <h2>
                <span className="sales-text--light">Let's Talk</span>{' '}
                <span className="sales-text--white">About Your</span>{' '}
                <span className="sales-text--white">Next Aircraft</span>
              </h2>
              <p>
                Whether you're a first-time buyer or expanding your fleet,
                our team is ready to guide you to the perfect helicopter.
              </p>
              <div className="sales-contact__actions">
                <a href="tel:+441234567890" className="sales-btn sales-btn--white">
                  Call +44 1234 567 890
                </a>
                <Link to="/contact?subject=aircraft-sales" className="sales-btn sales-btn--outline-white">
                  Send Enquiry
                </Link>
              </div>
              <div className="sales-contact__location">
                <span>HQ Aviation · Denham Aerodrome · UB9 5DF</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <FooterMinimal />

      {/* ========== STYLES ========== */}
      <style>{`
        /* ===== BASE ===== */
        .sales-page {
          font-family: 'Space Grotesk', -apple-system, sans-serif;
          background: #faf9f6;
          color: #1a1a1a;
          overflow-x: hidden;
        }

        .sales-pre-text {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #888;
          margin-bottom: 1rem;
        }

        .sales-text--dark { color: #1a1a1a; }
        .sales-text--mid { color: #4a4a4a; }
        .sales-text--light { color: #7a7a7a; }
        .sales-text--white { color: #fff; }

        .sales-section-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .sales-section-header h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0.5rem 0;
          line-height: 1.1;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-section-header p {
          color: #666;
          font-size: 1.1rem;
          line-height: 1.7;
        }

        /* Buttons */
        .sales-btn {
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
        }

        .sales-btn--primary {
          background: #1a1a1a;
          color: #fff;
        }

        .sales-btn--primary:hover {
          background: #333;
        }

        .sales-btn--outline {
          background: transparent;
          color: #1a1a1a;
          border: 2px solid #1a1a1a;
        }

        .sales-btn--outline:hover {
          background: #1a1a1a;
          color: #fff;
        }

        .sales-btn--white {
          background: #fff;
          color: #1a1a1a;
        }

        .sales-btn--white:hover {
          background: #f0f0f0;
        }

        .sales-btn--outline-white {
          background: transparent;
          color: #fff;
          border: 2px solid rgba(255,255,255,0.5);
        }

        .sales-btn--outline-white:hover {
          background: rgba(255,255,255,0.1);
          border-color: #fff;
        }

        .sales-btn--small {
          padding: 0.6rem 1.25rem;
          font-size: 0.65rem;
        }

        /* ===== HERO ===== */
        .sales-hero {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #1a1a1a;
        }

        .sales-hero__bg {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .sales-hero__bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.6;
        }

        .sales-hero__overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(90deg, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.7) 50%, rgba(26,26,26,0.3) 100%);
        }

        .sales-hero__content {
          position: relative;
          z-index: 3;
          padding: 2rem 4rem;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .sales-hero__left {
          max-width: 600px;
        }

        .sales-hero__badge {
          margin-bottom: 2rem;
        }

        .sales-hero__dealer-logo {
          height: 50px;
          width: auto;
        }

        .sales-hero__label {
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          display: block;
          margin-bottom: 1.5rem;
        }

        .sales-hero__headline {
          display: flex;
          flex-direction: column;
          line-height: 1;
          margin-bottom: 1.5rem;
        }

        .sales-hero__word {
          font-weight: 700;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .sales-hero__word--1 {
          color: #fff;
        }

        .sales-hero__word--2 {
          color: rgba(255,255,255,0.6);
        }

        .sales-hero__divider {
          width: 80px;
          height: 2px;
          background: #fff;
          margin-bottom: 1.5rem;
          transform-origin: left;
        }

        .sales-hero__sub {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sales-hero__stats {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2.5rem;
          padding: 1.5rem 0;
          border-top: 1px solid rgba(255,255,255,0.15);
          border-bottom: 1px solid rgba(255,255,255,0.15);
        }

        .sales-hero__stat {
          text-align: center;
        }

        .sales-hero__stat-num {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.75rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
          margin-bottom: 0.35rem;
        }

        .sales-hero__stat-label {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.5);
        }

        .sales-hero__stat-divider {
          width: 1px;
          height: 35px;
          background: rgba(255,255,255,0.2);
        }

        .sales-hero__cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .sales-hero__cta .sales-btn--primary {
          background: #fff;
          color: #1a1a1a;
        }

        .sales-hero__cta .sales-btn--primary:hover {
          background: #f0f0f0;
        }

        .sales-hero__cta .sales-btn--outline {
          color: #fff;
          border-color: rgba(255,255,255,0.5);
        }

        .sales-hero__cta .sales-btn--outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: #fff;
        }

        .sales-hero__scroll {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .sales-hero__scroll span {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.4);
        }

        .sales-hero__scroll-line {
          width: 1px;
          height: 40px;
          background: rgba(255,255,255,0.15);
          position: relative;
          overflow: hidden;
        }

        .sales-hero__scroll-progress {
          position: absolute;
          top: -30%;
          left: 0;
          width: 100%;
          height: 30%;
          background: #fff;
          animation: scrollLine 2s ease-in-out infinite;
        }

        @keyframes scrollLine {
          0% { top: -30%; }
          100% { top: 100%; }
        }

        /* ===== LINEUP ===== */
        .sales-lineup {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-lineup__container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .sales-lineup__header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .sales-lineup__header h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0.5rem 0;
          line-height: 1.1;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-lineup__header p {
          color: #666;
          font-size: 1.1rem;
          line-height: 1.7;
        }

        .sales-lineup__selector {
          display: flex;
          justify-content: center;
          gap: 0;
          margin-bottom: 3rem;
          border: 1px solid #e8e6e2;
          border-radius: 8px;
          overflow: hidden;
        }

        .sales-lineup__tab {
          flex: 1;
          padding: 1.25rem 1.5rem;
          background: #faf9f6;
          border: none;
          border-right: 1px solid #e8e6e2;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          position: relative;
        }

        .sales-lineup__tab:last-child {
          border-right: none;
        }

        .sales-lineup__tab:hover {
          background: #f0efe8;
        }

        .sales-lineup__tab--active {
          background: #1a1a1a;
        }

        .sales-lineup__tab--active .sales-lineup__tab-name {
          color: #fff;
        }

        .sales-lineup__tab--active .sales-lineup__tab-tagline {
          color: rgba(255,255,255,0.6);
        }

        .sales-lineup__tab-badge {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: #e04a2f;
          color: #fff;
          font-size: 0.5rem;
          font-weight: 700;
          padding: 0.15rem 0.4rem;
          letter-spacing: 0.1em;
          border-radius: 2px;
        }

        .sales-lineup__tab-name {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.25rem;
        }

        .sales-lineup__tab-tagline {
          font-size: 0.65rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .sales-lineup__display {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          padding: 2rem;
          background: linear-gradient(135deg, #faf9f6 0%, #f0efe8 100%);
          border-radius: 12px;
        }

        .sales-lineup__image {
          position: relative;
        }

        .sales-lineup__image img {
          width: 100%;
          height: auto;
          max-height: 400px;
          object-fit: contain;
        }

        .sales-lineup__info {
          max-width: 450px;
        }

        .sales-lineup__model-header {
          margin-bottom: 1rem;
        }

        .sales-lineup__model-header h3 {
          font-size: 2.5rem;
          font-weight: 700;
          text-transform: uppercase;
          margin: 0;
          line-height: 1;
        }

        .sales-lineup__tagline {
          font-size: 0.9rem;
          color: #666;
        }

        .sales-lineup__desc {
          color: #666;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .sales-lineup__specs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 1rem 0;
          border-top: 1px solid #e8e6e2;
          border-bottom: 1px solid #e8e6e2;
        }

        .sales-lineup__spec {
          text-align: center;
        }

        .sales-lineup__spec-value {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .sales-lineup__spec-label {
          font-size: 0.6rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .sales-lineup__price {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .sales-lineup__price-label {
          font-size: 0.7rem;
          color: #888;
          text-transform: uppercase;
        }

        .sales-lineup__price-value {
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .sales-lineup__price-note {
          font-size: 0.7rem;
          color: #888;
        }

        .sales-lineup__actions {
          display: flex;
          gap: 1rem;
        }

        /* ===== DEALER ===== */
        .sales-dealer {
          padding: 5rem 2rem;
          background: #1a1a1a;
          color: #fff;
        }

        .sales-dealer__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sales-dealer__content {
          text-align: center;
        }

        .sales-dealer__logos {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 2rem;
        }

        .sales-dealer__logos img {
          height: 70px;
          width: auto;
        }

        .sales-dealer__content h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 700;
          text-transform: uppercase;
          margin: 0 0 1.5rem;
        }

        .sales-dealer__content p {
          color: rgba(255,255,255,0.7);
          font-size: 1.05rem;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto 2rem;
        }

        .sales-dealer__features {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .sales-dealer__feature {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.8);
        }

        .sales-dealer__feature-icon {
          color: #4ade80;
          font-weight: 700;
        }

        /* ===== PROCESS ===== */
        .sales-process {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-process__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-process__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #e8e6e2;
          border-radius: 8px;
          overflow: hidden;
        }

        .sales-process__step {
          background: #fff;
          padding: 1.5rem;
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          cursor: default;
        }

        .sales-process__num {
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

        .sales-process__text h4 {
          margin: 0 0 0.25rem;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .sales-process__text p {
          margin: 0;
          font-size: 0.8rem;
          color: #888;
        }

        /* ===== USED AIRCRAFT ===== */
        .sales-used {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-used__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-used__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .sales-used__card {
          background: #faf9f6;
          border: 1px solid #e8e6e2;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .sales-used__card:hover {
          border-color: #ccc;
        }

        .sales-used__image {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .sales-used__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .sales-used__card:hover .sales-used__image img {
          transform: scale(1.05);
        }

        .sales-used__status {
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

        .sales-used__status--available {
          background: rgba(74, 222, 128, 0.9);
          color: #fff;
        }

        .sales-used__status--under-offer {
          background: rgba(251, 191, 36, 0.9);
          color: #1a1a1a;
        }

        .sales-used__info {
          padding: 1.25rem;
        }

        .sales-used__header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.75rem;
        }

        .sales-used__header h4 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }

        .sales-used__year {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          color: #888;
        }

        .sales-used__details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e8e6e2;
        }

        .sales-used__hours {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          color: #888;
        }

        .sales-used__price {
          font-family: 'Share Tech Mono', monospace;
          font-size: 1rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .sales-used__cta {
          text-align: center;
          margin-top: 2.5rem;
        }

        /* ===== WHY HQ ===== */
        .sales-why {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-why__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-why__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .sales-why__card {
          background: #fff;
          padding: 2rem;
          border-left: 3px solid #1a1a1a;
        }

        .sales-why__num {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          color: #ccc;
          margin-bottom: 1rem;
        }

        .sales-why__card h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.75rem;
          text-transform: uppercase;
        }

        .sales-why__card p {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.7;
          margin: 0;
        }

        /* ===== CONTACT CTA ===== */
        .sales-contact {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          padding: 6rem 2rem;
        }

        .sales-contact__inner {
          max-width: 900px;
          margin: 0 auto;
        }

        .sales-contact__content {
          text-align: center;
          color: #fff;
        }

        .sales-contact__content .sales-pre-text {
          color: rgba(255,255,255,0.5);
        }

        .sales-contact__content h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0.5rem 0 1.5rem;
          line-height: 1.1;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-contact__content p {
          color: rgba(255,255,255,0.7);
          font-size: 1.1rem;
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto 2rem;
        }

        .sales-contact__actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .sales-contact__location {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.4);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .sales-lineup__display {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .sales-lineup__image {
            order: -1;
          }

          .sales-lineup__info {
            max-width: 100%;
            text-align: center;
          }

          .sales-lineup__actions {
            justify-content: center;
          }

          .sales-why__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sales-used__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sales-process__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .sales-hero__content {
            padding: 6rem 2rem 2rem;
          }

          .sales-hero__stats {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .sales-hero__stat-divider {
            display: none;
          }

          .sales-lineup__selector {
            flex-direction: column;
          }

          .sales-lineup__tab {
            border-right: none;
            border-bottom: 1px solid #e8e6e2;
          }

          .sales-lineup__tab:last-child {
            border-bottom: none;
          }

          .sales-lineup__specs {
            grid-template-columns: repeat(2, 1fr);
          }

          .sales-why__grid {
            grid-template-columns: 1fr;
          }

          .sales-used__grid {
            grid-template-columns: 1fr;
          }

          .sales-process__grid {
            grid-template-columns: 1fr;
          }

          .sales-dealer__logos {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }

          .sales-dealer__logos img {
            height: 50px;
          }
        }

        @media (max-width: 480px) {
          .sales-hero__headline .sales-hero__word {
            font-size: 2rem;
          }

          .sales-lineup__model-header h3 {
            font-size: 2rem;
          }

          .sales-lineup__price-value {
            font-size: 1.5rem;
          }

          .sales-contact__actions {
            flex-direction: column;
          }

          .sales-contact__actions .sales-btn {
            width: 100%;
            text-align: center;
          }
        }

        /* ===== SECTION 8: R88 SPOTLIGHT ===== */
        .sales-r88 {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #f8f7f4 0%, #faf9f6 100%);
        }

        .sales-r88__container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .sales-r88__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .sales-r88__title {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0.5rem 0 1.5rem;
          line-height: 1.1;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-text--accent {
          color: #e04a2f;
        }

        .sales-r88__intro {
          color: #666;
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sales-r88__features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .sales-r88__feature {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: #fff;
          border-left: 2px solid #e8e6e2;
          transition: all 0.3s ease;
        }

        .sales-r88__feature:hover {
          border-color: #1a1a1a;
        }

        .sales-r88__feature-icon {
          font-size: 1.25rem;
          color: #1a1a1a;
        }

        .sales-r88__feature-title {
          display: block;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .sales-r88__feature-desc {
          font-size: 0.75rem;
          color: #888;
        }

        .sales-r88__cta {
          display: flex;
          gap: 1rem;
        }

        .sales-r88__visual {
          position: relative;
        }

        .sales-r88__image {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
        }

        .sales-r88__image img {
          width: 100%;
          height: auto;
        }

        .sales-r88__badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #e04a2f;
          color: #fff;
          padding: 0.5rem 1rem;
          text-align: center;
        }

        .sales-r88__badge span {
          display: block;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .sales-r88__badge span:first-child {
          font-size: 1.25rem;
          font-family: 'Share Tech Mono', monospace;
          letter-spacing: 0;
        }

        /* ===== SECTION 9: FINANCING ===== */
        .sales-finance {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-finance__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-finance__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .sales-finance__card {
          background: #faf9f6;
          padding: 2rem 1.5rem;
          border: 1px solid #e8e6e2;
          text-align: center;
          position: relative;
          transition: all 0.3s ease;
        }

        .sales-finance__card--featured {
          background: #1a1a1a;
          color: #fff;
          border-color: #1a1a1a;
        }

        .sales-finance__ribbon {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: #e04a2f;
          color: #fff;
          font-size: 0.55rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.35rem 0.75rem;
        }

        .sales-finance__icon {
          font-size: 2rem;
          display: block;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .sales-finance__card h4 {
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          margin: 0 0 1rem;
        }

        .sales-finance__card ul {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem;
        }

        .sales-finance__card li {
          font-size: 0.8rem;
          padding: 0.35rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .sales-finance__card--featured li {
          border-color: rgba(255,255,255,0.1);
        }

        .sales-finance__note {
          font-size: 0.7rem;
          color: #888;
          font-style: italic;
        }

        .sales-finance__card--featured .sales-finance__note {
          color: rgba(255,255,255,0.5);
        }

        .sales-finance__cta {
          text-align: center;
        }

        .sales-finance__cta p {
          color: #888;
          margin-bottom: 1rem;
        }

        /* ===== SECTION 10: TRADE-IN ===== */
        .sales-tradein {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 5rem 2rem;
        }

        .sales-tradein__inner {
          max-width: 900px;
          margin: 0 auto;
        }

        .sales-tradein__content {
          text-align: center;
          color: #fff;
        }

        .sales-tradein__content .sales-pre-text {
          color: rgba(255,255,255,0.5);
        }

        .sales-tradein__content h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0.5rem 0 1.5rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-tradein__content p {
          color: rgba(255,255,255,0.7);
          font-size: 1.1rem;
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto 2rem;
        }

        .sales-tradein__steps {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .sales-tradein__step {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255,255,255,0.05);
          padding: 0.75rem 1.25rem;
          border-radius: 4px;
        }

        .sales-tradein__step-num {
          width: 28px;
          height: 28px;
          background: #fff;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 50%;
        }

        .sales-tradein__step span:last-child {
          font-size: 0.85rem;
          font-weight: 500;
        }

        .sales-tradein__step-arrow {
          color: rgba(255,255,255,0.3);
          font-size: 1.25rem;
        }

        /* ===== SECTION 11: COMPARISON ===== */
        .sales-compare {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-compare__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-compare__table-wrapper {
          overflow-x: auto;
        }

        .sales-compare__table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
          font-size: 0.85rem;
        }

        .sales-compare__table th,
        .sales-compare__table td {
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid #e8e6e2;
        }

        .sales-compare__table th {
          background: #faf9f6;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }

        .sales-compare__table th:first-child,
        .sales-compare__table td:first-child {
          text-align: left;
          font-weight: 500;
        }

        .sales-compare__featured {
          background: rgba(224, 74, 47, 0.05) !important;
        }

        .sales-compare__featured span {
          display: inline-block;
          background: #e04a2f;
          color: #fff;
          font-size: 0.5rem;
          padding: 0.15rem 0.35rem;
          margin-left: 0.5rem;
          vertical-align: middle;
        }

        .sales-compare__note {
          text-align: center;
          font-size: 0.75rem;
          color: #888;
          margin-top: 1rem;
        }

        .sales-compare__note span {
          color: #e04a2f;
        }

        /* ===== SECTION 12: TESTIMONIALS ===== */
        .sales-testimonials {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-testimonials__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-testimonials__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .sales-testimonials__card {
          background: #faf9f6;
          padding: 2rem;
          border: 1px solid #e8e6e2;
        }

        .sales-testimonials__quote {
          margin-bottom: 1.5rem;
        }

        .sales-testimonials__mark {
          font-size: 3rem;
          font-family: Georgia, serif;
          line-height: 0;
          color: #ddd;
          display: block;
          margin-bottom: 0.5rem;
        }

        .sales-testimonials__quote p {
          font-size: 0.95rem;
          line-height: 1.8;
          color: #444;
          font-style: italic;
        }

        .sales-testimonials__author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .sales-testimonials__avatar {
          width: 44px;
          height: 44px;
          background: #1a1a1a;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .sales-testimonials__name {
          display: block;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .sales-testimonials__role {
          font-size: 0.75rem;
          color: #888;
        }

        /* ===== SECTION 13: CONFIGURATION ===== */
        .sales-config {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-config__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-config__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .sales-config__category {
          background: #fff;
          padding: 2rem;
          border-top: 3px solid #1a1a1a;
        }

        .sales-config__category h4 {
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          margin: 0 0 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e8e6e2;
        }

        .sales-config__category ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sales-config__category li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          padding: 0.5rem 0;
          color: #555;
        }

        .sales-config__check {
          color: #4ade80;
          font-size: 0.75rem;
        }

        .sales-config__image {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
        }

        .sales-config__image img {
          width: 100%;
          height: auto;
        }

        .sales-config__caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: #fff;
          padding: 2rem 1.5rem 1.5rem;
          font-size: 0.85rem;
        }

        /* ===== SECTION 14: GALLERY ===== */
        .sales-gallery {
          padding: 6rem 2rem;
          background: #1a1a1a;
        }

        .sales-gallery__container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .sales-gallery__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(2, 200px);
          gap: 1rem;
        }

        .sales-gallery__item {
          position: relative;
          overflow: hidden;
          border-radius: 6px;
          cursor: pointer;
        }

        .sales-gallery__item--large {
          grid-column: span 2;
          grid-row: span 2;
        }

        .sales-gallery__item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .sales-gallery__item:hover img {
          transform: scale(1.05);
        }

        .sales-gallery__label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: #fff;
          padding: 2rem 1rem 1rem;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ===== SECTION 15: SAFETY ===== */
        .sales-safety {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-safety__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-safety__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #e8e6e2;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .sales-safety__item {
          background: #faf9f6;
          padding: 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          cursor: default;
        }

        .sales-safety__icon {
          font-size: 1.5rem;
          opacity: 0.5;
        }

        .sales-safety__text h4 {
          margin: 0 0 0.25rem;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .sales-safety__text p {
          margin: 0;
          font-size: 0.8rem;
          color: #888;
        }

        .sales-safety__cta {
          text-align: center;
        }

        .sales-safety__cta p {
          color: #888;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        /* ===== SECTION 16: ACCESSORIES ===== */
        .sales-accessories {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-accessories__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-accessories__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .sales-accessories__item {
          background: #fff;
          padding: 1.25rem;
          border: 1px solid #e8e6e2;
          transition: all 0.3s ease;
        }

        .sales-accessories__category {
          display: block;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #888;
          margin-bottom: 0.5rem;
        }

        .sales-accessories__item h4 {
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
        }

        .sales-accessories__price {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .sales-accessories__cta {
          text-align: center;
        }

        /* ===== SECTION 17: TRAINING PACKAGES ===== */
        .sales-training {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-training__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-training__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .sales-training__content h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-training__content > p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sales-training__packages {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .sales-training__package {
          background: #faf9f6;
          padding: 1.25rem 1.5rem;
          border-left: 3px solid #e8e6e2;
          transition: all 0.3s ease;
        }

        .sales-training__package:hover {
          border-color: #1a1a1a;
        }

        .sales-training__package-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.75rem;
        }

        .sales-training__package h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .sales-training__hours {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.8rem;
          color: #888;
        }

        .sales-training__package ul {
          list-style: none;
          padding: 0;
          margin: 0 0 0.75rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .sales-training__package li {
          font-size: 0.75rem;
          color: #666;
          background: #fff;
          padding: 0.25rem 0.5rem;
          border-radius: 2px;
        }

        .sales-training__price {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .sales-training__visual img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        /* ===== SECTION 18: MAINTENANCE ===== */
        .sales-maintenance {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-maintenance__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-maintenance__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sales-maintenance__card {
          background: #fff;
          padding: 2rem;
          border: 1px solid #e8e6e2;
          text-align: center;
          position: relative;
        }

        .sales-maintenance__card--featured {
          border-color: #1a1a1a;
          border-width: 2px;
        }

        .sales-maintenance__badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #1a1a1a;
          color: #fff;
          font-size: 0.55rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.35rem 0.75rem;
        }

        .sales-maintenance__card h4 {
          font-size: 1.25rem;
          font-weight: 700;
          text-transform: uppercase;
          margin: 0 0 0.5rem;
        }

        .sales-maintenance__coverage {
          display: block;
          font-size: 0.8rem;
          color: #888;
          margin-bottom: 1.5rem;
        }

        .sales-maintenance__price {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e8e6e2;
        }

        .sales-maintenance__amount {
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .sales-maintenance__card ul {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
          text-align: left;
        }

        .sales-maintenance__card li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f5f5f5;
        }

        .sales-maintenance__check {
          color: #4ade80;
          font-size: 0.75rem;
        }

        .sales-btn--full {
          width: 100%;
        }

        /* ===== SECTION 19: DELIVERIES ===== */
        .sales-deliveries {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-deliveries__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-deliveries__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .sales-deliveries__card {
          background: #faf9f6;
          border: 1px solid #e8e6e2;
          overflow: hidden;
        }

        .sales-deliveries__image {
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .sales-deliveries__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .sales-deliveries__card:hover .sales-deliveries__image img {
          transform: scale(1.05);
        }

        .sales-deliveries__info {
          padding: 1rem;
        }

        .sales-deliveries__info h4 {
          margin: 0 0 0.25rem;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .sales-deliveries__owner {
          display: block;
          font-size: 0.75rem;
          color: #888;
          margin-bottom: 0.5rem;
        }

        .sales-deliveries__meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          color: #aaa;
          font-family: 'Share Tech Mono', monospace;
        }

        /* ===== SECTION 20: INTERNATIONAL ===== */
        .sales-international {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 6rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .sales-international__inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .sales-international__content {
          color: #fff;
        }

        .sales-international__content .sales-pre-text {
          color: rgba(255,255,255,0.5);
        }

        .sales-international__content h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0.5rem 0 1.5rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-international__content p {
          color: rgba(255,255,255,0.7);
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sales-international__stats {
          display: flex;
          gap: 3rem;
          margin-bottom: 2rem;
        }

        .sales-international__stat {
          text-align: center;
        }

        .sales-international__num {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .sales-international__stat span:last-child {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.5);
        }

        .sales-international__map {
          position: relative;
        }

        .sales-international__globe {
          width: 100%;
          height: auto;
        }

        /* ===== SECTION 21: INSURANCE ===== */
        .sales-insurance {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-insurance__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-insurance__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .sales-insurance__card {
          background: #fff;
          padding: 2rem;
          border: 1px solid #e8e6e2;
          text-align: center;
        }

        .sales-insurance__icon {
          width: 50px;
          height: 50px;
          background: #1a1a1a;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 auto 1.25rem;
        }

        .sales-insurance__card h4 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
        }

        .sales-insurance__specialty {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #888;
          margin-bottom: 1rem;
        }

        .sales-insurance__card p {
          font-size: 0.85rem;
          color: #666;
          line-height: 1.7;
          margin: 0;
        }

        .sales-insurance__note {
          text-align: center;
          font-size: 0.85rem;
          color: #888;
        }

        /* ===== SECTION 22: FAQ ===== */
        .sales-faq {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-faq__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-faq__grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
        }

        .sales-faq__header h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-faq__header > p {
          color: #666;
          margin-bottom: 2rem;
        }

        .sales-faq__contact {
          background: #faf9f6;
          padding: 1.5rem;
        }

        .sales-faq__contact p {
          font-size: 0.9rem;
          color: #666;
          margin: 0 0 1rem;
        }

        .sales-faq__list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .sales-faq__item {
          border-bottom: 1px solid #e8e6e2;
        }

        .sales-faq__question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 0;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .sales-faq__question::-webkit-details-marker {
          display: none;
        }

        .sales-faq__toggle {
          font-size: 1.25rem;
          color: #888;
          transition: transform 0.3s ease;
        }

        .sales-faq__item[open] .sales-faq__toggle {
          transform: rotate(45deg);
        }

        .sales-faq__answer {
          padding: 0 0 1.25rem;
        }

        .sales-faq__answer p {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.8;
          margin: 0;
        }

        /* ===== SECTION 23: FLEET MANAGEMENT ===== */
        .sales-fleet {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-fleet__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-fleet__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .sales-fleet__visual img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .sales-fleet__content h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-fleet__content > p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sales-fleet__benefits {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .sales-fleet__benefits li {
          font-size: 0.85rem;
          color: #555;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sales-fleet__benefits li::before {
          content: '✓';
          color: #4ade80;
          font-size: 0.75rem;
        }

        /* ===== SECTION 24: TIMELINE ===== */
        .sales-timeline {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-timeline__container {
          max-width: 800px;
          margin: 0 auto;
        }

        .sales-timeline__visual {
          position: relative;
          padding-left: 3rem;
        }

        .sales-timeline__line {
          position: absolute;
          left: 7px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #e8e6e2;
        }

        .sales-timeline__point {
          position: relative;
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .sales-timeline__marker {
          position: absolute;
          left: -3rem;
          width: 16px;
          height: 16px;
          background: #fff;
          border: 2px solid #1a1a1a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.5rem;
        }

        .sales-timeline__point--final .sales-timeline__marker {
          background: #1a1a1a;
          color: #fff;
          font-size: 0.6rem;
        }

        .sales-timeline__content {
          background: #faf9f6;
          padding: 1.25rem 1.5rem;
          flex: 1;
        }

        .sales-timeline__month {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem;
          color: #888;
          margin-bottom: 0.5rem;
        }

        .sales-timeline__content h4 {
          margin: 0 0 0.25rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .sales-timeline__content p {
          margin: 0;
          font-size: 0.85rem;
          color: #666;
        }

        .sales-timeline__note {
          text-align: center;
          font-size: 0.85rem;
          color: #888;
          margin-top: 2rem;
        }

        /* ===== SECTION 25: VALUATION ===== */
        .sales-valuation {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #f8f7f4 0%, #faf9f6 100%);
        }

        .sales-valuation__container {
          max-width: 700px;
          margin: 0 auto;
        }

        .sales-valuation__card {
          background: #fff;
          padding: 3rem;
          text-align: center;
          border: 1px solid #e8e6e2;
        }

        .sales-valuation__icon {
          font-size: 2.5rem;
          color: #1a1a1a;
          margin-bottom: 1.5rem;
        }

        .sales-valuation__card h2 {
          font-size: 1.5rem;
          font-weight: 700;
          text-transform: uppercase;
          margin: 0 0 1rem;
        }

        .sales-valuation__card > p {
          color: #666;
          line-height: 1.8;
          max-width: 500px;
          margin: 0 auto 2rem;
        }

        .sales-valuation__form {
          margin-bottom: 1rem;
        }

        .sales-valuation__inputs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .sales-valuation__inputs input {
          padding: 1rem;
          font-size: 0.85rem;
          border: 1px solid #e8e6e2;
          font-family: inherit;
          background: #faf9f6;
        }

        .sales-valuation__inputs input:focus {
          outline: none;
          border-color: #1a1a1a;
        }

        .sales-valuation__note {
          font-size: 0.75rem;
          color: #888;
        }

        /* ===== SECTION 26: EVENTS ===== */
        .sales-events {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-events__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-events__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .sales-events__card {
          background: #faf9f6;
          padding: 1.5rem;
          border: 1px solid #e8e6e2;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .sales-events__date {
          text-align: center;
          padding: 1rem;
          background: #1a1a1a;
          color: #fff;
        }

        .sales-events__day {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 2rem;
          font-weight: 700;
          line-height: 1;
        }

        .sales-events__month {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .sales-events__info {
          flex: 1;
        }

        .sales-events__type {
          display: block;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #888;
          margin-bottom: 0.5rem;
        }

        .sales-events__info h4 {
          margin: 0 0 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .sales-events__location {
          font-size: 0.8rem;
          color: #666;
        }

        .sales-events__link {
          font-size: 0.75rem;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .sales-events__link:hover {
          text-decoration: underline;
        }

        /* ===== SECTION 27: LEASEBACK ===== */
        .sales-leaseback {
          background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
          padding: 6rem 2rem;
        }

        .sales-leaseback__inner {
          max-width: 900px;
          margin: 0 auto;
        }

        .sales-leaseback__content {
          text-align: center;
          color: #fff;
        }

        .sales-leaseback__content .sales-pre-text {
          color: rgba(255,255,255,0.5);
        }

        .sales-leaseback__content h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0.5rem 0 1.5rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-leaseback__content > p {
          color: rgba(255,255,255,0.7);
          font-size: 1.05rem;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto 2.5rem;
        }

        .sales-leaseback__benefits {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .sales-leaseback__benefit {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-align: left;
        }

        .sales-leaseback__benefit-icon {
          width: 50px;
          height: 50px;
          background: rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .sales-leaseback__benefit h5 {
          margin: 0 0 0.25rem;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .sales-leaseback__benefit span {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
        }

        /* ===== SECTION 28: HERITAGE ===== */
        .sales-heritage {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-heritage__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sales-heritage__timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }

        .sales-heritage__timeline::before {
          content: '';
          position: absolute;
          left: 60px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #e8e6e2;
        }

        .sales-heritage__item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1rem 0;
        }

        .sales-heritage__year {
          width: 50px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: #1a1a1a;
          text-align: right;
        }

        .sales-heritage__dot {
          width: 12px;
          height: 12px;
          background: #1a1a1a;
          border-radius: 50%;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }

        .sales-heritage__event {
          flex: 1;
          font-size: 0.95rem;
          color: #555;
        }

        /* ===== SECTION 29: PAINT ===== */
        .sales-paint {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-paint__container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .sales-paint__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .sales-paint__card {
          background: #fff;
          border: 1px solid #e8e6e2;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .sales-paint__image {
          aspect-ratio: 16/10;
          overflow: hidden;
        }

        .sales-paint__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .sales-paint__card:hover .sales-paint__image img {
          transform: scale(1.05);
        }

        .sales-paint__info {
          padding: 1rem;
        }

        .sales-paint__type {
          display: block;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #888;
          margin-bottom: 0.25rem;
        }

        .sales-paint__info h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .sales-paint__cta {
          text-align: center;
        }

        .sales-paint__cta p {
          color: #888;
          margin-bottom: 1rem;
        }

        /* ===== SECTION 30: INTERIOR ===== */
        .sales-interior {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-interior__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-interior__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .sales-interior__visual img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .sales-interior__content h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-interior__content > p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sales-interior__options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .sales-interior__option {
          background: #faf9f6;
          padding: 1rem;
          border-left: 3px solid #e8e6e2;
        }

        .sales-interior__tier {
          display: block;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #888;
          margin-bottom: 0.25rem;
        }

        .sales-interior__option h4 {
          margin: 0 0 0.25rem;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .sales-interior__option p {
          margin: 0;
          font-size: 0.75rem;
          color: #666;
        }

        /* ===== SECTION 31: MISSIONS ===== */
        .sales-missions {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-missions__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-missions__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .sales-missions__card {
          background: #fff;
          padding: 2rem;
          border: 1px solid #e8e6e2;
          transition: all 0.3s ease;
        }

        .sales-missions__icon {
          font-size: 2rem;
          display: block;
          margin-bottom: 1rem;
          opacity: 0.6;
        }

        .sales-missions__card h4 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
          text-transform: uppercase;
        }

        .sales-missions__desc {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 1rem;
        }

        .sales-missions__card ul {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem;
        }

        .sales-missions__card li {
          font-size: 0.75rem;
          color: #888;
          padding: 0.25rem 0;
          padding-left: 1rem;
          position: relative;
        }

        .sales-missions__card li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #ccc;
        }

        .sales-missions__recommend {
          padding-top: 1rem;
          border-top: 1px solid #e8e6e2;
          font-size: 0.75rem;
        }

        .sales-missions__recommend span {
          color: #888;
        }

        .sales-missions__recommend strong {
          display: block;
          font-size: 0.85rem;
          color: #1a1a1a;
          margin-top: 0.25rem;
        }

        /* ===== SECTION 32: CALCULATOR ===== */
        .sales-calculator {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-calculator__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sales-calculator__section {
          margin-bottom: 2rem;
        }

        .sales-calculator__section h4 {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #1a1a1a;
        }

        .sales-calculator__section table {
          width: 100%;
          border-collapse: collapse;
        }

        .sales-calculator__section th,
        .sales-calculator__section td {
          padding: 0.75rem;
          text-align: center;
          border-bottom: 1px solid #e8e6e2;
          font-size: 0.85rem;
        }

        .sales-calculator__section th {
          font-weight: 600;
          background: #faf9f6;
        }

        .sales-calculator__section td:first-child {
          text-align: left;
          font-weight: 500;
        }

        .sales-calculator__note {
          text-align: center;
          font-size: 0.8rem;
          color: #888;
        }

        /* ===== SECTION 33: RESALE ===== */
        .sales-resale {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 6rem 2rem;
        }

        .sales-resale__inner {
          max-width: 900px;
          margin: 0 auto;
        }

        .sales-resale__content {
          text-align: center;
          color: #fff;
        }

        .sales-resale__content .sales-pre-text {
          color: rgba(255,255,255,0.5);
        }

        .sales-resale__content h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0.5rem 0 1.5rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-resale__content > p {
          color: rgba(255,255,255,0.7);
          font-size: 1.05rem;
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto 2.5rem;
        }

        .sales-resale__stats {
          display: flex;
          justify-content: center;
          gap: 4rem;
          margin-bottom: 2rem;
        }

        .sales-resale__stat {
          text-align: center;
        }

        .sales-resale__retention {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 3rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .sales-resale__model {
          display: block;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .sales-resale__age {
          display: block;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.5);
        }

        .sales-resale__sub {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.5);
        }

        /* ===== SECTION 34: AWARDS ===== */
        .sales-awards {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-awards__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-awards__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .sales-awards__card {
          background: #fff;
          padding: 2rem;
          text-align: center;
          border: 1px solid #e8e6e2;
        }

        .sales-awards__year {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.8rem;
          color: #888;
          margin-bottom: 1rem;
        }

        .sales-awards__trophy {
          font-size: 2rem;
          color: #fbbf24;
          margin-bottom: 1rem;
        }

        .sales-awards__card h4 {
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
        }

        .sales-awards__org {
          font-size: 0.7rem;
          color: #888;
        }

        /* ===== SECTION 35: REQUIREMENTS ===== */
        .sales-requirements {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-requirements__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sales-requirements__table-wrapper {
          overflow-x: auto;
        }

        .sales-requirements__table {
          width: 100%;
          border-collapse: collapse;
          background: #faf9f6;
        }

        .sales-requirements__table th,
        .sales-requirements__table td {
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid #e8e6e2;
          font-size: 0.85rem;
        }

        .sales-requirements__table th {
          background: #1a1a1a;
          color: #fff;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
        }

        .sales-requirements__table td:first-child {
          background: #fff;
        }

        .sales-requirements__note {
          text-align: center;
          font-size: 0.8rem;
          color: #888;
          margin: 1rem 0;
        }

        .sales-requirements__cta {
          text-align: center;
        }

        /* ===== SECTION 36: VS COMPETITION ===== */
        .sales-vs {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-vs__container {
          max-width: 800px;
          margin: 0 auto;
        }

        .sales-vs__table-wrapper {
          overflow-x: auto;
        }

        .sales-vs__table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
        }

        .sales-vs__table th,
        .sales-vs__table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e8e6e2;
          font-size: 0.85rem;
        }

        .sales-vs__table th {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          background: #faf9f6;
        }

        .sales-vs__robinson {
          background: rgba(74, 222, 128, 0.1) !important;
        }

        .sales-vs__check {
          color: #4ade80;
          margin-right: 0.5rem;
        }

        /* ===== SECTION 37: ENVIRONMENTAL ===== */
        .sales-environmental {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-environmental__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-environmental__grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .sales-environmental__content h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-environmental__content > p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sales-environmental__metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .sales-environmental__metric {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: #faf9f6;
        }

        .sales-environmental__value {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: #4ade80;
          white-space: nowrap;
        }

        .sales-environmental__metric h4 {
          margin: 0;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .sales-environmental__metric p {
          margin: 0;
          font-size: 0.75rem;
          color: #888;
        }

        .sales-environmental__icon-large {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sales-environmental__leaf {
          width: 150px;
          height: 150px;
          color: #4ade80;
        }

        /* ===== SECTION 38: VIDEO ===== */
        .sales-video {
          padding: 6rem 2rem;
          background: #1a1a1a;
        }

        .sales-video__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-video__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .sales-video__card {
          cursor: pointer;
        }

        .sales-video__thumbnail {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
          border-radius: 6px;
          margin-bottom: 0.75rem;
        }

        .sales-video__thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .sales-video__card:hover .sales-video__thumbnail img {
          transform: scale(1.05);
        }

        .sales-video__play {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          background: rgba(255,255,255,0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: #1a1a1a;
          transition: all 0.3s ease;
        }

        .sales-video__card:hover .sales-video__play {
          transform: translate(-50%, -50%) scale(1.1);
        }

        .sales-video__duration {
          position: absolute;
          bottom: 0.5rem;
          right: 0.5rem;
          background: rgba(0,0,0,0.7);
          color: #fff;
          font-size: 0.65rem;
          padding: 0.25rem 0.5rem;
          border-radius: 2px;
          font-family: 'Share Tech Mono', monospace;
        }

        .sales-video__card h4 {
          color: #fff;
          font-size: 0.85rem;
          font-weight: 500;
          margin: 0;
        }

        /* ===== SECTION 39: SOCIAL PROOF STATS ===== */
        .sales-proof {
          padding: 5rem 2rem;
          background: linear-gradient(135deg, #faf9f6 0%, #f0efe8 100%);
        }

        .sales-proof__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-proof__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .sales-proof__stat {
          text-align: center;
          padding: 2rem;
          background: #fff;
          border: 1px solid #e8e6e2;
        }

        .sales-proof__value {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 3rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .sales-proof__suffix {
          font-size: 1.5rem;
          color: #888;
        }

        .sales-proof__label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #888;
        }

        /* ===== SECTION 40: SPECS ===== */
        .sales-specs {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-specs__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-specs__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .sales-specs__category {
          background: #faf9f6;
          padding: 1.5rem;
          border-top: 3px solid #1a1a1a;
        }

        .sales-specs__category h4 {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e8e6e2;
        }

        .sales-specs__category dl {
          margin: 0;
        }

        .sales-specs__category dt {
          font-size: 0.75rem;
          color: #888;
          margin-top: 0.75rem;
        }

        .sales-specs__category dd {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          margin: 0.25rem 0 0;
        }

        /* ===== SECTION 41: NETWORK ===== */
        .sales-network {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-network__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-network__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .sales-network__card {
          background: #fff;
          padding: 2rem;
          border: 1px solid #e8e6e2;
          text-align: center;
        }

        .sales-network__count {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .sales-network__card h4 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
        }

        .sales-network__card p {
          font-size: 0.75rem;
          color: #888;
          margin: 0;
        }

        .sales-network__total {
          text-align: center;
        }

        .sales-network__total-num {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 4rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1;
        }

        .sales-network__total-label {
          font-size: 0.85rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ===== SECTION 42: HANGARAGE ===== */
        .sales-hangarage {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-hangarage__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-hangarage__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .sales-hangarage__content h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-hangarage__content > p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sales-hangarage__tiers {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .sales-hangarage__tier {
          background: #faf9f6;
          padding: 1.25rem;
          border-left: 3px solid #e8e6e2;
        }

        .sales-hangarage__tier:hover {
          border-color: #1a1a1a;
        }

        .sales-hangarage__tier-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.75rem;
        }

        .sales-hangarage__tier h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .sales-hangarage__price {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .sales-hangarage__tier ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .sales-hangarage__tier li {
          font-size: 0.75rem;
          color: #666;
          background: #fff;
          padding: 0.25rem 0.5rem;
          border-radius: 2px;
        }

        .sales-hangarage__visual img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        /* ===== SECTION 43: INSPECTION ===== */
        .sales-inspection {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-inspection__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-inspection__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sales-inspection__card {
          background: #fff;
          padding: 2rem;
          border: 1px solid #e8e6e2;
        }

        .sales-inspection__card h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 1rem;
        }

        .sales-inspection__meta {
          display: flex;
          justify-content: space-between;
          padding-bottom: 1rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #e8e6e2;
        }

        .sales-inspection__meta span {
          font-size: 0.8rem;
          color: #888;
        }

        .sales-inspection__price {
          font-family: 'Share Tech Mono', monospace;
          font-weight: 700;
          color: #1a1a1a !important;
        }

        .sales-inspection__card ul {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
        }

        .sales-inspection__card li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          padding: 0.4rem 0;
        }

        .sales-inspection__check {
          color: #4ade80;
          font-size: 0.75rem;
        }

        /* ===== SECTION 44: DEMO ===== */
        .sales-demo {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 6rem 2rem;
        }

        .sales-demo__inner {
          max-width: 600px;
          margin: 0 auto;
        }

        .sales-demo__content {
          text-align: center;
          color: #fff;
        }

        .sales-demo__content .sales-pre-text {
          color: rgba(255,255,255,0.5);
        }

        .sales-demo__content h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0.5rem 0 1rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-demo__content > p {
          color: rgba(255,255,255,0.7);
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sales-demo__form {
          display: grid;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .sales-demo__select,
        .sales-demo__input {
          padding: 1rem;
          font-size: 0.9rem;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
          color: #fff;
          font-family: inherit;
        }

        .sales-demo__select option {
          background: #1a1a1a;
        }

        .sales-demo__select:focus,
        .sales-demo__input:focus {
          outline: none;
          border-color: #fff;
        }

        .sales-demo__input::placeholder {
          color: rgba(255,255,255,0.4);
        }

        .sales-demo__note {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
        }

        /* ===== SECTION 45: CUSTOMER MAP ===== */
        .sales-customermap {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-customermap__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-customermap__visual {
          margin-bottom: 3rem;
        }

        .sales-customermap__map {
          background: #faf9f6;
          padding: 2rem;
          border-radius: 8px;
        }

        .sales-customermap__svg {
          width: 100%;
          height: auto;
          max-height: 400px;
        }

        .sales-customermap__stats {
          display: flex;
          justify-content: center;
          gap: 4rem;
        }

        .sales-customermap__stat {
          text-align: center;
        }

        .sales-customermap__num {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .sales-customermap__stat span:last-child {
          font-size: 0.75rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ===== SECTION 46: FACTORY ===== */
        .sales-factory {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-factory__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-factory__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .sales-factory__image {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
        }

        .sales-factory__image img {
          width: 100%;
          height: auto;
        }

        .sales-factory__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .sales-factory__overlay:hover {
          background: rgba(0,0,0,0.6);
        }

        .sales-factory__play {
          width: 60px;
          height: 60px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: #1a1a1a;
        }

        .sales-factory__text {
          color: #fff;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .sales-factory__content h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-factory__content > p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sales-factory__features {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem;
        }

        .sales-factory__features li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          padding: 0.5rem 0;
        }

        .sales-factory__features li::before {
          content: '✓';
          color: #4ade80;
        }

        /* ===== SECTION 47: NEWSLETTER ===== */
        .sales-newsletter {
          padding: 5rem 2rem;
          background: linear-gradient(135deg, #f8f7f4 0%, #faf9f6 100%);
        }

        .sales-newsletter__container {
          max-width: 600px;
          margin: 0 auto;
        }

        .sales-newsletter__content {
          text-align: center;
        }

        .sales-newsletter__content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          text-transform: uppercase;
          margin: 0 0 0.75rem;
        }

        .sales-newsletter__content > p {
          color: #666;
          margin-bottom: 1.5rem;
        }

        .sales-newsletter__form {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .sales-newsletter__form input {
          flex: 1;
          padding: 1rem;
          font-size: 0.9rem;
          border: 1px solid #e8e6e2;
          background: #fff;
          font-family: inherit;
        }

        .sales-newsletter__form input:focus {
          outline: none;
          border-color: #1a1a1a;
        }

        .sales-newsletter__privacy {
          font-size: 0.75rem;
          color: #888;
        }

        /* ===== SECTION 48: AVIONICS ===== */
        .sales-avionics {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-avionics__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-avionics__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sales-avionics__card {
          background: #fff;
          padding: 2rem;
          border: 1px solid #e8e6e2;
          position: relative;
        }

        .sales-avionics__card--featured {
          border-color: #1a1a1a;
          border-width: 2px;
        }

        .sales-avionics__badge {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: #1a1a1a;
          color: #fff;
          font-size: 0.55rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.35rem 0.75rem;
          white-space: nowrap;
        }

        .sales-avionics__card h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 1rem;
          text-transform: uppercase;
        }

        .sales-avionics__card ul {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
        }

        .sales-avionics__card li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          padding: 0.4rem 0;
          border-bottom: 1px solid #f5f5f5;
        }

        .sales-avionics__check {
          color: #4ade80;
          font-size: 0.75rem;
        }

        .sales-avionics__price {
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        /* ===== SECTION 49: WARRANTY ===== */
        .sales-warranty {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-warranty__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sales-warranty__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sales-warranty__card {
          background: #faf9f6;
          padding: 2rem;
          text-align: center;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .sales-warranty__duration {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .sales-warranty__card h4 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
          text-transform: uppercase;
        }

        .sales-warranty__card p {
          font-size: 0.8rem;
          color: #666;
          margin: 0 0 1rem;
        }

        .sales-warranty__price {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        /* ===== SECTION 50: DELIVERY ===== */
        .sales-delivery {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-delivery__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-delivery__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sales-delivery__card {
          background: #fff;
          padding: 1.5rem;
          border: 1px solid #e8e6e2;
        }

        .sales-delivery__header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.75rem;
        }

        .sales-delivery__header h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .sales-delivery__price {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .sales-delivery__desc {
          font-size: 0.85rem;
          color: #666;
          margin: 0 0 1rem;
        }

        .sales-delivery__meta {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: #888;
        }

        /* ===== SECTION 51: TOOLS ===== */
        .sales-tools {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 6rem 2rem;
        }

        .sales-tools__inner {
          max-width: 900px;
          margin: 0 auto;
        }

        .sales-tools__content {
          color: #fff;
          text-align: center;
        }

        .sales-tools__content .sales-pre-text {
          color: rgba(255,255,255,0.5);
        }

        .sales-tools__content h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0.5rem 0 1rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-tools__content > p {
          color: rgba(255,255,255,0.7);
          margin-bottom: 2.5rem;
        }

        .sales-tools__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          text-align: left;
        }

        .sales-tools__item {
          display: flex;
          gap: 1rem;
          padding: 1.25rem;
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
        }

        .sales-tools__logo {
          font-size: 1.5rem;
          opacity: 0.7;
        }

        .sales-tools__item h4 {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .sales-tools__type {
          display: block;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.25rem;
        }

        .sales-tools__item p {
          margin: 0;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.6);
        }

        /* ===== SECTION 52: MEMBERSHIP ===== */
        .sales-membership {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-membership__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-membership__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .sales-membership__card {
          background: #faf9f6;
          padding: 1.5rem;
          text-align: center;
          border: 1px solid #e8e6e2;
          transition: all 0.3s ease;
        }

        .sales-membership__icon {
          font-size: 1.5rem;
          display: block;
          margin-bottom: 0.75rem;
        }

        .sales-membership__card h4 {
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
        }

        .sales-membership__card p {
          font-size: 0.75rem;
          color: #666;
          margin: 0;
        }

        /* ===== SECTION 53: TECH SUPPORT ===== */
        .sales-techsupport {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-techsupport__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-techsupport__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .sales-techsupport__card {
          background: #fff;
          padding: 1.5rem;
          border: 1px solid #e8e6e2;
          text-align: center;
        }

        .sales-techsupport__card h4 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 1rem;
          text-transform: uppercase;
        }

        .sales-techsupport__details {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }

        .sales-techsupport__label {
          display: block;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #888;
        }

        .sales-techsupport__value {
          font-size: 0.8rem;
          font-weight: 500;
        }

        .sales-techsupport__contact {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          color: #1a1a1a;
          word-break: break-all;
        }

        /* ===== SECTION 54: EXCHANGE ===== */
        .sales-exchange {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-exchange__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sales-exchange__table-wrapper {
          overflow-x: auto;
        }

        .sales-exchange__table {
          width: 100%;
          border-collapse: collapse;
        }

        .sales-exchange__table th,
        .sales-exchange__table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e8e6e2;
          font-size: 0.85rem;
        }

        .sales-exchange__table th {
          background: #faf9f6;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
        }

        .sales-exchange__highlight {
          font-family: 'Share Tech Mono', monospace;
          font-weight: 700;
          color: #4ade80;
        }

        .sales-exchange__savings {
          font-family: 'Share Tech Mono', monospace;
          font-weight: 700;
          color: #1a1a1a;
          background: rgba(74, 222, 128, 0.15);
          padding: 0.25rem 0.5rem;
          border-radius: 2px;
        }

        /* ===== SECTION 55: SCHOOLS ===== */
        .sales-schools {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-schools__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-schools__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .sales-schools__content h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-schools__content > p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sales-schools__list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .sales-schools__item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #fff;
          border-left: 3px solid #1a1a1a;
        }

        .sales-schools__info h4 {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .sales-schools__info span {
          font-size: 0.75rem;
          color: #888;
        }

        .sales-schools__specialty {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #666;
          background: #faf9f6;
          padding: 0.35rem 0.75rem;
        }

        .sales-schools__visual img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        /* ===== SECTION 56: UPGRADE ===== */
        .sales-upgrade {
          background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
          padding: 6rem 2rem;
        }

        .sales-upgrade__inner {
          max-width: 700px;
          margin: 0 auto;
        }

        .sales-upgrade__content {
          color: #fff;
          text-align: center;
        }

        .sales-upgrade__content .sales-pre-text {
          color: rgba(255,255,255,0.5);
        }

        .sales-upgrade__content h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0.5rem 0 1rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-upgrade__content > p {
          color: rgba(255,255,255,0.7);
          margin-bottom: 2.5rem;
        }

        .sales-upgrade__paths {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .sales-upgrade__path {
          background: rgba(255,255,255,0.05);
          padding: 1.5rem;
          text-align: left;
          border-radius: 4px;
        }

        .sales-upgrade__models {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .sales-upgrade__from,
        .sales-upgrade__to {
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .sales-upgrade__from {
          color: rgba(255,255,255,0.5);
        }

        .sales-upgrade__to {
          color: #fff;
        }

        .sales-upgrade__arrow {
          font-size: 1.25rem;
          color: #4ade80;
        }

        .sales-upgrade__path p {
          margin: 0 0 0.5rem;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
        }

        .sales-upgrade__tradein {
          font-size: 0.75rem;
          color: #4ade80;
        }

        /* ===== SECTION 57: REGULATORY ===== */
        .sales-regulatory {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-regulatory__container {
          max-width: 900px;
          margin: 0 auto;
        }

        .sales-regulatory__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sales-regulatory__card {
          background: #faf9f6;
          padding: 2rem;
          text-align: center;
          border-top: 3px solid #1a1a1a;
        }

        .sales-regulatory__name {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .sales-regulatory__region {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #888;
          margin-bottom: 1rem;
        }

        .sales-regulatory__card p {
          font-size: 0.85rem;
          color: #666;
          margin: 0;
        }

        /* ===== SECTION 58: STORIES ===== */
        .sales-stories {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-stories__container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sales-stories__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sales-stories__card {
          background: #fff;
          padding: 2rem;
          border: 1px solid #e8e6e2;
        }

        .sales-stories__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .sales-stories__usecase {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #888;
          background: #faf9f6;
          padding: 0.25rem 0.5rem;
        }

        .sales-stories__aircraft {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .sales-stories__card blockquote {
          font-size: 0.9rem;
          color: #444;
          line-height: 1.7;
          font-style: italic;
          margin: 0 0 1.5rem;
          padding-left: 1rem;
          border-left: 2px solid #e8e6e2;
        }

        .sales-stories__footer {
          border-top: 1px solid #e8e6e2;
          padding-top: 1rem;
        }

        .sales-stories__name {
          display: block;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .sales-stories__meta {
          font-size: 0.7rem;
          color: #888;
        }

        /* ===== SECTION 59: CONSIGNMENT ===== */
        .sales-consignment {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-consignment__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-consignment__grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .sales-consignment__content h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin: 0.5rem 0 1rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-consignment__content > p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .sales-consignment__benefits {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem;
        }

        .sales-consignment__benefits li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          padding: 0.5rem 0;
        }

        .sales-consignment__check {
          color: #4ade80;
        }

        .sales-consignment__stat-box {
          background: #1a1a1a;
          color: #fff;
          padding: 3rem;
          text-align: center;
        }

        .sales-consignment__stat-num {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 4rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .sales-consignment__stat-label {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
        }

        /* ===== SECTION 60: EDITIONS ===== */
        .sales-editions {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-editions__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-editions__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sales-editions__card {
          background: #fff;
          padding: 2rem;
          border: 1px solid #e8e6e2;
          text-align: center;
          position: relative;
        }

        .sales-editions__limited {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #e04a2f;
        }

        .sales-editions__card h4 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
        }

        .sales-editions__base {
          display: block;
          font-size: 0.75rem;
          color: #888;
          margin-bottom: 1rem;
        }

        .sales-editions__card ul {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
        }

        .sales-editions__card li {
          font-size: 0.8rem;
          color: #666;
          padding: 0.35rem 0;
          border-bottom: 1px solid #f5f5f5;
        }

        /* ===== SECTION 61: BASES ===== */
        .sales-bases {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-bases__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-bases__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .sales-bases__card {
          background: #faf9f6;
          padding: 1.5rem;
          border: 1px solid #e8e6e2;
        }

        .sales-bases__header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1rem;
        }

        .sales-bases__header h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .sales-bases__code {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.8rem;
          color: #888;
        }

        .sales-bases__details {
          display: flex;
          gap: 2rem;
          margin-bottom: 1rem;
        }

        .sales-bases__label {
          display: block;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #888;
        }

        .sales-bases__details span:last-child {
          font-size: 0.8rem;
        }

        .sales-bases__facilities {
          font-size: 0.8rem;
          color: #666;
          margin: 0;
          padding-top: 1rem;
          border-top: 1px solid #e8e6e2;
        }

        /* ===== SECTION 62: CARBON ===== */
        .sales-carbon {
          background: linear-gradient(135deg, #1a5c38 0%, #0f3d26 100%);
          padding: 6rem 2rem;
        }

        .sales-carbon__inner {
          max-width: 800px;
          margin: 0 auto;
        }

        .sales-carbon__content {
          color: #fff;
          text-align: center;
        }

        .sales-carbon__content .sales-pre-text {
          color: rgba(255,255,255,0.6);
        }

        .sales-carbon__content h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0.5rem 0 1rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-carbon__content > p {
          color: rgba(255,255,255,0.8);
          margin-bottom: 2.5rem;
        }

        .sales-carbon__details {
          display: flex;
          justify-content: center;
          gap: 4rem;
          margin-bottom: 2rem;
        }

        .sales-carbon__price {
          text-align: center;
        }

        .sales-carbon__amount {
          display: block;
          font-family: 'Share Tech Mono', monospace;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .sales-carbon__price span:last-child {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.6);
        }

        .sales-carbon__projects {
          text-align: left;
        }

        .sales-carbon__label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.6);
          margin-bottom: 0.5rem;
        }

        .sales-carbon__projects ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sales-carbon__projects li {
          font-size: 0.85rem;
          padding: 0.25rem 0;
        }

        .sales-carbon__providers {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
        }

        /* ===== SECTION 63: MANAGEMENT ===== */
        .sales-management {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-management__container {
          max-width: 800px;
          margin: 0 auto;
        }

        .sales-management__grid {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .sales-management__item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: #fff;
          border-bottom: 1px solid #e8e6e2;
        }

        .sales-management__item:first-child {
          border-top: 1px solid #e8e6e2;
        }

        .sales-management__info h4 {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .sales-management__info p {
          margin: 0;
          font-size: 0.8rem;
          color: #888;
        }

        .sales-management__price {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        /* ===== SECTION 64: CONTACTS ===== */
        .sales-contacts {
          padding: 6rem 2rem;
          background: #fff;
        }

        .sales-contacts__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-contacts__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .sales-contacts__card {
          background: #faf9f6;
          padding: 1.5rem;
          border: 1px solid #e8e6e2;
          text-align: center;
          transition: all 0.3s ease;
        }

        .sales-contacts__dept {
          display: block;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #888;
          margin-bottom: 0.5rem;
        }

        .sales-contacts__card h4 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.75rem;
        }

        .sales-contacts__email,
        .sales-contacts__phone {
          display: block;
          font-size: 0.75rem;
          color: #666;
          text-decoration: none;
          margin-bottom: 0.25rem;
        }

        .sales-contacts__email:hover,
        .sales-contacts__phone:hover {
          color: #1a1a1a;
        }

        /* ===== SECTION 65: QUICK COMPARE ===== */
        .sales-quickcompare {
          padding: 6rem 2rem;
          background: #faf9f6;
        }

        .sales-quickcompare__container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sales-quickcompare__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .sales-quickcompare__card {
          background: #fff;
          padding: 1.5rem;
          border: 1px solid #e8e6e2;
        }

        .sales-quickcompare__card h4 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 1rem;
          text-align: center;
        }

        .sales-quickcompare__ideal,
        .sales-quickcompare__notideal {
          padding: 0.75rem 0;
        }

        .sales-quickcompare__ideal {
          border-bottom: 1px solid #e8e6e2;
        }

        .sales-quickcompare__label {
          display: block;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.25rem;
        }

        .sales-quickcompare__ideal .sales-quickcompare__label {
          color: #4ade80;
        }

        .sales-quickcompare__notideal .sales-quickcompare__label {
          color: #888;
        }

        .sales-quickcompare__ideal p,
        .sales-quickcompare__notideal p {
          margin: 0;
          font-size: 0.8rem;
          color: #666;
        }

        /* ===== SECTION 66: CHAT ===== */
        .sales-chat {
          padding: 5rem 2rem;
          background: linear-gradient(135deg, #f8f7f4 0%, #faf9f6 100%);
        }

        .sales-chat__container {
          max-width: 500px;
          margin: 0 auto;
        }

        .sales-chat__content {
          text-align: center;
        }

        .sales-chat__icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .sales-chat__content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
        }

        .sales-chat__content > p {
          color: #666;
          margin-bottom: 1.5rem;
        }

        .sales-chat__status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #666;
          margin-top: 1rem;
        }

        .sales-chat__dot {
          width: 8px;
          height: 8px;
          background: #4ade80;
          border-radius: 50%;
          animation: chatPulse 2s infinite;
        }

        @keyframes chatPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* ===== SECTION 67: APP ===== */
        .sales-app {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 6rem 2rem;
        }

        .sales-app__inner {
          max-width: 600px;
          margin: 0 auto;
        }

        .sales-app__content {
          color: #fff;
          text-align: center;
        }

        .sales-app__content .sales-pre-text {
          color: rgba(255,255,255,0.5);
        }

        .sales-app__content h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0.5rem 0 1rem;
          text-transform: uppercase;
          font-weight: 700;
        }

        .sales-app__content > p {
          color: rgba(255,255,255,0.7);
          margin-bottom: 2rem;
        }

        .sales-app__features {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .sales-app__features span {
          font-size: 0.75rem;
          padding: 0.5rem 1rem;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
        }

        .sales-app__notify {
          display: flex;
          gap: 1rem;
          max-width: 400px;
          margin: 0 auto;
        }

        .sales-app__notify input {
          flex: 1;
          padding: 1rem;
          font-size: 0.85rem;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
          color: #fff;
          font-family: inherit;
        }

        .sales-app__notify input::placeholder {
          color: rgba(255,255,255,0.4);
        }

        .sales-app__notify input:focus {
          outline: none;
          border-color: #fff;
        }

        /* ===== SECTIONS 48-67 RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .sales-avionics__grid,
          .sales-warranty__grid,
          .sales-delivery__grid,
          .sales-regulatory__grid,
          .sales-editions__grid,
          .sales-bases__grid {
            grid-template-columns: 1fr;
          }

          .sales-membership__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sales-techsupport__grid,
          .sales-contacts__grid,
          .sales-quickcompare__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sales-tools__grid {
            grid-template-columns: 1fr;
          }

          .sales-schools__grid,
          .sales-consignment__grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .sales-stories__grid {
            grid-template-columns: 1fr;
          }

          .sales-carbon__details {
            flex-direction: column;
            gap: 2rem;
          }

          .sales-carbon__projects {
            text-align: center;
          }
        }

        @media (max-width: 768px) {
          .sales-membership__grid {
            grid-template-columns: 1fr;
          }

          .sales-techsupport__grid,
          .sales-contacts__grid,
          .sales-quickcompare__grid {
            grid-template-columns: 1fr;
          }

          .sales-app__notify {
            flex-direction: column;
          }
        }

        /* ===== SECTIONS 28-47 RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .sales-paint__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sales-interior__grid,
          .sales-environmental__grid,
          .sales-hangarage__grid,
          .sales-factory__grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .sales-missions__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sales-awards__grid,
          .sales-specs__grid,
          .sales-network__grid,
          .sales-proof__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sales-video__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sales-inspection__grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .sales-heritage__timeline::before {
            left: 50px;
          }

          .sales-heritage__year {
            width: 40px;
            font-size: 0.8rem;
          }

          .sales-paint__grid {
            grid-template-columns: 1fr;
          }

          .sales-interior__options {
            grid-template-columns: 1fr;
          }

          .sales-missions__grid {
            grid-template-columns: 1fr;
          }

          .sales-resale__stats {
            flex-direction: column;
            gap: 2rem;
          }

          .sales-awards__grid,
          .sales-specs__grid,
          .sales-network__grid,
          .sales-proof__grid {
            grid-template-columns: 1fr;
          }

          .sales-environmental__metrics {
            grid-template-columns: 1fr;
          }

          .sales-video__grid {
            grid-template-columns: 1fr;
          }

          .sales-customermap__stats {
            flex-direction: column;
            gap: 1.5rem;
          }

          .sales-newsletter__form {
            flex-direction: column;
          }
        }

        /* ===== NEW SECTION RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .sales-r88__grid,
          .sales-training__grid,
          .sales-fleet__grid,
          .sales-international__inner {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .sales-r88__visual {
            order: -1;
          }

          .sales-finance__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sales-config__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sales-testimonials__grid {
            grid-template-columns: 1fr;
          }

          .sales-gallery__grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
          }

          .sales-gallery__item--large {
            grid-column: span 2;
          }

          .sales-safety__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sales-accessories__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sales-maintenance__grid {
            grid-template-columns: 1fr;
          }

          .sales-deliveries__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sales-insurance__grid {
            grid-template-columns: 1fr;
          }

          .sales-faq__grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .sales-events__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .sales-r88__features {
            grid-template-columns: 1fr;
          }

          .sales-finance__grid {
            grid-template-columns: 1fr;
          }

          .sales-tradein__steps {
            flex-direction: column;
          }

          .sales-tradein__step-arrow {
            transform: rotate(90deg);
          }

          .sales-compare__table {
            font-size: 0.75rem;
          }

          .sales-compare__table th,
          .sales-compare__table td {
            padding: 0.75rem 0.5rem;
          }

          .sales-config__grid {
            grid-template-columns: 1fr;
          }

          .sales-gallery__grid {
            grid-template-columns: 1fr;
          }

          .sales-gallery__item--large {
            grid-column: span 1;
          }

          .sales-safety__grid {
            grid-template-columns: 1fr;
          }

          .sales-accessories__grid {
            grid-template-columns: 1fr;
          }

          .sales-deliveries__grid {
            grid-template-columns: 1fr;
          }

          .sales-international__stats {
            flex-direction: column;
            gap: 1.5rem;
          }

          .sales-fleet__benefits {
            grid-template-columns: 1fr;
          }

          .sales-valuation__inputs {
            grid-template-columns: 1fr;
          }

          .sales-events__grid {
            grid-template-columns: 1fr;
          }

          .sales-leaseback__benefits {
            flex-direction: column;
            gap: 1.5rem;
          }
        }

        /* ============================================ */
        /* SECTION PICKER STYLES */
        /* ============================================ */

        /* Section Favorite Container */
        .sales-section-fav-container {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 1000;
        }

        .sales-section-fav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: rgba(255,255,255,0.95);
          border: 2px solid #e5e5e5;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .sales-section-fav:hover {
          border-color: #f59e0b;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .sales-section-fav.active {
          background: #f59e0b;
          border-color: #f59e0b;
          color: #fff;
        }

        .sales-section-fav.has-note::after {
          content: '📝';
          position: absolute;
          top: -6px;
          right: -6px;
          font-size: 10px;
        }

        .sales-section-fav__star {
          font-size: 16px;
        }

        .sales-section-fav__id {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          opacity: 0.7;
        }

        /* Section Picker Panel */
        .section-picker {
          position: fixed;
          bottom: 20px;
          left: 20px;
          width: 380px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          z-index: 100000;
          font-family: 'Space Grotesk', sans-serif;
          transition: all 0.3s ease;
        }

        .section-picker.minimized {
          transform: translateY(calc(100% - 44px));
        }

        .section-picker.minimized .section-picker__main {
          visibility: hidden;
          height: 0;
          overflow: hidden;
        }

        /* Collapsed Bar */
        .section-picker__collapsed {
          display: none;
          height: 44px;
          background: #1a1a1a;
          border-radius: 16px 16px 0 0;
          padding: 0 16px;
          align-items: center;
          justify-content: space-between;
          color: #fff;
          cursor: pointer;
        }

        .section-picker.minimized .section-picker__collapsed {
          display: flex;
        }

        .section-picker__collapsed-title {
          font-weight: 600;
          font-size: 13px;
        }

        .section-picker__collapsed-count {
          background: #f59e0b;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;
        }

        .section-picker__collapsed-btn {
          width: 28px;
          height: 28px;
          border: none;
          background: rgba(255,255,255,0.15);
          color: #fff;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        /* Main Content */
        .section-picker__main {
          display: block;
        }

        .section-picker__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid #e5e5e5;
        }

        .section-picker__title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-picker__title h3 {
          font-size: 14px;
          font-weight: 700;
          margin: 0;
        }

        .section-picker__badge {
          background: #f0f0f0;
          padding: 3px 8px;
          border-radius: 10px;
          font-size: 10px;
          color: #666;
        }

        .section-picker__minimize {
          width: 28px;
          height: 28px;
          border: 1px solid #e5e5e5;
          background: #fff;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
        }

        /* Tabs */
        .section-picker__tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          padding: 10px;
          background: #f8f8f8;
          border-bottom: 1px solid #e5e5e5;
          max-height: 100px;
          overflow-y: auto;
        }

        .section-picker__tab {
          padding: 5px 8px;
          font-size: 10px;
          font-weight: 500;
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .section-picker__tab:hover {
          border-color: #333;
        }

        .section-picker__tab.active {
          background: #1a1a1a;
          color: #fff;
          border-color: #1a1a1a;
        }

        .section-picker__tab--blue.active { background: #2196f3; border-color: #2196f3; }
        .section-picker__tab--green.active { background: #4caf50; border-color: #4caf50; }
        .section-picker__tab--purple.active { background: #9c27b0; border-color: #9c27b0; }
        .section-picker__tab--orange.active { background: #ff9800; border-color: #ff9800; }

        /* Filter Toggle */
        .section-picker__filter {
          padding: 10px 16px;
          border-bottom: 1px solid #e5e5e5;
        }

        .section-picker__toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-size: 12px;
        }

        .section-picker__toggle input {
          display: none;
        }

        .section-picker__toggle-slider {
          width: 36px;
          height: 20px;
          background: #e5e5e5;
          border-radius: 10px;
          position: relative;
          transition: background 0.2s;
        }

        .section-picker__toggle-slider::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 16px;
          height: 16px;
          background: #fff;
          border-radius: 50%;
          transition: transform 0.2s;
        }

        .section-picker__toggle input:checked + .section-picker__toggle-slider {
          background: #f59e0b;
        }

        .section-picker__toggle input:checked + .section-picker__toggle-slider::after {
          transform: translateX(16px);
        }

        /* Actions */
        .section-picker__actions {
          display: flex;
          gap: 6px;
          padding: 10px 16px;
          border-bottom: 1px solid #e5e5e5;
        }

        .section-picker__btn {
          flex: 1;
          padding: 8px 10px;
          font-size: 11px;
          font-weight: 600;
          background: #1a1a1a;
          color: #fff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .section-picker__btn:hover {
          opacity: 0.85;
        }

        .section-picker__btn--favs {
          background: #444;
        }

        .section-picker__btn--favs.has-items {
          background: #f59e0b;
        }

        .section-picker__btn--copy {
          background: #6366f1;
        }

        .section-picker__btn--copy.success {
          background: #22c55e;
        }

        .section-picker__btn--copy.error {
          background: #ef4444;
        }

        /* Hints */
        .section-picker__hints {
          display: flex;
          justify-content: space-between;
          padding: 10px 16px;
          font-size: 10px;
          color: #999;
          background: #f8f8f8;
          border-radius: 0 0 16px 16px;
        }

        .section-picker__hints kbd {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 3px;
          padding: 1px 4px;
          font-family: inherit;
          font-size: 9px;
        }

        /* Grid Overlay */
        .section-picker__grid-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          z-index: 100002;
          display: flex;
          flex-direction: column;
          animation: pickerFadeIn 0.2s ease;
        }

        @keyframes pickerFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .section-picker__grid-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          background: #fff;
        }

        .section-picker__grid-header h2 {
          margin: 0;
          font-size: 20px;
        }

        .section-picker__grid-header button {
          width: 40px;
          height: 40px;
          border: none;
          background: #f5f5f5;
          border-radius: 8px;
          cursor: pointer;
          font-size: 20px;
        }

        .section-picker__grid-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 15px 30px;
          background: #fff;
          border-bottom: 1px solid #e5e5e5;
        }

        .section-picker__grid-tab {
          padding: 6px 12px;
          font-size: 11px;
          font-weight: 500;
          background: #f0f0f0;
          border: none;
          border-radius: 20px;
          cursor: pointer;
        }

        .section-picker__grid-tab.active {
          background: #1a1a1a;
          color: #fff;
        }

        .section-picker__grid-content {
          flex: 1;
          overflow-y: auto;
          padding: 30px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
          align-content: start;
        }

        .section-picker__grid-item {
          background: #fff;
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .section-picker__grid-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        .section-picker__grid-item.is-favorite {
          border: 2px solid #f59e0b;
        }

        .section-picker__grid-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .section-picker__grid-item-category {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #666;
          background: #f0f0f0;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .section-picker__grid-item-star {
          color: #f59e0b;
          font-size: 16px;
        }

        .section-picker__grid-item h4 {
          margin: 0 0 6px;
          font-size: 14px;
          font-weight: 600;
        }

        .section-picker__grid-item p {
          margin: 0 0 10px;
          font-size: 12px;
          color: #666;
          line-height: 1.4;
        }

        .section-picker__grid-item code {
          display: block;
          font-size: 10px;
          color: #999;
          font-family: 'Share Tech Mono', monospace;
        }

        /* Favorites Panel */
        .section-picker__favs-panel {
          position: fixed;
          bottom: 300px;
          left: 20px;
          width: 360px;
          max-height: 400px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.25);
          z-index: 100003;
          display: flex;
          flex-direction: column;
          animation: pickerSlideUp 0.2s ease;
        }

        @keyframes pickerSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .section-picker__favs-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          border-bottom: 1px solid #e5e5e5;
          font-size: 14px;
        }

        .section-picker__favs-header button {
          width: 26px;
          height: 26px;
          border: none;
          background: #f5f5f5;
          border-radius: 50%;
          cursor: pointer;
          font-size: 16px;
        }

        .section-picker__favs-list {
          flex: 1;
          overflow-y: auto;
          max-height: 280px;
        }

        .section-picker__favs-item {
          padding: 12px 16px;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          transition: background 0.15s;
        }

        .section-picker__favs-item:hover {
          background: #f9f9f9;
        }

        .section-picker__favs-item-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .section-picker__favs-item-name {
          font-weight: 600;
          font-size: 13px;
        }

        .section-picker__favs-item-id {
          font-size: 10px;
          color: #999;
        }

        .section-picker__favs-item-note {
          font-size: 12px;
          color: #666;
          padding: 4px 8px;
          background: #f5f5f5;
          border-radius: 4px;
          margin: 6px 0;
        }

        .section-picker__favs-item-note.empty {
          color: #bbb;
          font-style: italic;
        }

        .section-picker__favs-item-actions {
          display: flex;
          gap: 6px;
          justify-content: flex-end;
        }

        .section-picker__favs-item-actions button {
          width: 28px;
          height: 28px;
          border: 1px solid #e5e5e5;
          background: #fff;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.15s;
        }

        .section-picker__favs-item-actions button:hover {
          background: #f0f0f0;
        }

        .section-picker__favs-footer {
          display: flex;
          gap: 8px;
          padding: 12px 16px;
          border-top: 1px solid #e5e5e5;
        }

        .section-picker__favs-footer button {
          flex: 1;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .section-picker__favs-footer button:first-child {
          background: #6366f1;
          color: #fff;
        }

        .section-picker__favs-footer button:last-child {
          background: #f5f5f5;
          color: #666;
        }

        /* Note Modal */
        .section-picker__note-modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100005;
          animation: pickerFadeIn 0.15s ease;
        }

        .section-picker__note-content {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          width: 360px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          animation: pickerSlideUp 0.2s ease;
        }

        .section-picker__note-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 12px;
        }

        .section-picker__note-icon {
          color: #f59e0b;
          font-size: 20px;
        }

        .section-picker__note-name {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .section-picker__note-id {
          display: block;
          font-size: 11px;
          color: #999;
          margin-bottom: 16px;
          padding: 6px 10px;
          background: #f5f5f5;
          border-radius: 6px;
        }

        .section-picker__note-input {
          width: 100%;
          padding: 12px 14px;
          border: 2px solid #e5e5e5;
          border-radius: 10px;
          font-size: 13px;
          font-family: inherit;
          resize: none;
          transition: border-color 0.15s;
          box-sizing: border-box;
        }

        .section-picker__note-input:focus {
          outline: none;
          border-color: #f59e0b;
        }

        .section-picker__note-actions {
          display: flex;
          gap: 10px;
          margin-top: 16px;
        }

        .section-picker__note-actions button {
          flex: 1;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .section-picker__note-actions button:first-child {
          background: #f5f5f5;
          color: #666;
        }

        .section-picker__note-save {
          background: #f59e0b !important;
          color: #fff !important;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .section-picker {
            left: 10px;
            right: 10px;
            width: auto;
          }

          .section-picker__favs-panel {
            left: 10px;
            right: 10px;
            width: auto;
            bottom: 280px;
          }

          .sales-section-fav {
            padding: 0.4rem 0.6rem;
            font-size: 10px;
          }

          .sales-section-fav__id {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default Sales;
