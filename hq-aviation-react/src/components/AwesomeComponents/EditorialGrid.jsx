/**
 * EDITORIAL GRID COMPONENT
 * Curated Commerce - Net-a-Porter, Sotheby's inspired
 * Saved for future use
 */

import { Link } from 'react-router-dom';

// Image imports - update these paths as needed
const imgs = {
  r66: '/assets/images/new-aircraft/r66-turbine.jpg',
  r44: '/assets/images/new-aircraft/r44-raven.jpg',
  hangar: '/assets/images/facility/hangar-main.jpg',
};

export const EditorialGrid = () => (
  <section className="editorial-grid">
    <header className="editorial-grid__header">
      <div className="editorial-grid__logo">HQ</div>
      <div className="editorial-grid__tagline">The Aviation Edit</div>
      <div className="editorial-grid__issue">Issue No. 47 — Winter 2024</div>
    </header>

    <div className="editorial-grid__grid">
      <div className="editorial-grid__cell editorial-grid__cell--feature">
        <img src={imgs.r66} alt="" />
        <div className="editorial-grid__cell-content">
          <span className="editorial-grid__category">Featured Aircraft</span>
          <h2>The R66 Turbine</h2>
          <p>Redefining private aviation for the discerning pilot</p>
          <Link to="/aircraft">Shop Now →</Link>
        </div>
      </div>

      <div className="editorial-grid__cell editorial-grid__cell--training">
        <img src={imgs.hangar} alt="" />
        <div className="editorial-grid__cell-content">
          <span className="editorial-grid__category">Training</span>
          <h3>Flight Academy</h3>
          <Link to="/training">Explore</Link>
        </div>
      </div>

      <div className="editorial-grid__cell editorial-grid__cell--quote">
        <blockquote>
          "Excellence is not a destination but a continuous journey."
        </blockquote>
        <cite>— Captain Q</cite>
      </div>

      <div className="editorial-grid__cell editorial-grid__cell--expeditions">
        <img src={imgs.r44} alt="" />
        <div className="editorial-grid__cell-content">
          <span className="editorial-grid__category">Expeditions</span>
          <h3>World Adventures</h3>
          <Link to="/expeditions">Discover</Link>
        </div>
      </div>
    </div>

    <div className="editorial-grid__ticker">
      <div className="editorial-grid__ticker-content">
        <span>Robinson Approved Service Centre</span>
        <span>•</span>
        <span>35+ Years Experience</span>
        <span>•</span>
        <span>PPL to ATPL Training</span>
        <span>•</span>
        <span>Aircraft Sales & Acquisition</span>
        <span>•</span>
        <span>Worldwide Expeditions</span>
        <span>•</span>
      </div>
    </div>

    <style>{`
      .editorial-grid {
        min-height: 100vh;
        background: #faf9f7;
        display: flex;
        flex-direction: column;
      }

      .editorial-grid__header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e8e6e2;
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

      .editorial-grid__issue {
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: #999;
      }

      .editorial-grid__grid {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        flex: 1;
        gap: 1px;
        background: #e8e6e2;
      }

      .editorial-grid__cell {
        position: relative;
        background: #fff;
        overflow: hidden;
      }

      .editorial-grid__cell img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.8s ease;
      }

      .editorial-grid__cell:hover img {
        transform: scale(1.05);
      }

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

      .editorial-grid__cell--feature {
        grid-row: span 2;
      }

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

      .editorial-grid__ticker {
        padding: 1rem 0;
        border-top: 1px solid #e8e6e2;
        overflow: hidden;
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

      @media (max-width: 768px) {
        .editorial-grid__grid {
          grid-template-columns: 1fr;
          grid-template-rows: auto;
        }

        .editorial-grid__cell--feature {
          grid-row: 1;
          min-height: 50vh;
        }
      }
    `}</style>
  </section>
);

export default EditorialGrid;
