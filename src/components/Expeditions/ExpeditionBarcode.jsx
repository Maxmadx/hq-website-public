/**
 * ExpeditionBarcode
 *
 * Modern barcode/scanner style display of expedition destinations.
 * Each destination has a unique generated barcode pattern.
 * Central Denham compass as full background with barcode cards overlaid.
 *
 * Props:
 * - destinations: Array of destination objects (optional, uses defaults)
 * - title: Section title (optional)
 */

import React, { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

const defaultDestinations = [
  { id: 'arctic', name: 'Arctic', distance: '2,500 nm', year: '2022', image: '/assets/images/expeditions/north-pole.jpg' },
  { id: 'iceland', name: 'Iceland', distance: '1,200 nm', year: '2019', image: '/assets/images/expeditions/channel.jpg' },
  { id: 'morocco', name: 'Morocco', distance: '1,100 nm', year: '2021', image: '/assets/images/expeditions/helicopter-expeditions-quentin-smith.webp' },
  { id: 'norway', name: 'Norway', distance: '650 nm', year: '2018', image: '/assets/images/expeditions/six-helis-in-North-Pole.jpg' },
  { id: 'alps', name: 'Alps', distance: '500 nm', year: '2020', image: '/assets/images/expeditions/south-pole-by-helicopter-quentin-smith.webp' },
  { id: 'greenland', name: 'Greenland', distance: '2,100 nm', year: '2023', image: '/assets/images/expeditions/antartica.jpg' },
  { id: 'bahamas', name: 'Bahamas', distance: '4,200 nm', year: '2025', image: '/assets/images/expeditions/channel.jpg' },
  { id: 'costa-rica', name: 'Costa Rica', distance: '5,100 nm', year: '2026', image: '/assets/images/expeditions/helicopter-expeditions-quentin-smith.webp' },
];

// Generate deterministic barcode pattern from string
function generateBarcode(str, length = 30) {
  const bars = [];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  for (let i = 0; i < length; i++) {
    const val = (hash >> (i % 16)) & 1;
    bars.push(val);
  }
  return bars;
}

function ExpeditionBarcode({
  destinations = defaultDestinations,
  title = 'EXPEDITION MANIFEST',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const barcodes = useMemo(() => {
    return destinations.map(d => ({
      ...d,
      code: generateBarcode(d.id + d.name, 25)
    }));
  }, [destinations]);

  return (
    <section className="exp-barcode" ref={ref}>
      <div className="exp-barcode__container">
        <motion.div
          className="exp-barcode__header"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="exp-barcode__title">{title}</h2>
          <span className="exp-barcode__subtitle">HQ Aviation • Denham Aerodrome</span>
        </motion.div>

        {/* Grid wrapper with compass background */}
        <div className="exp-barcode__grid-wrapper">
          {/* Compass background - centered on grid only */}
          <div className="exp-barcode__compass-bg">
            <svg viewBox="-50 -50 700 700" className="exp-barcode__compass-svg" preserveAspectRatio="xMidYMid meet">
              {/* Orbital rings */}
              {[80, 140, 200, 260].map((radius, i) => (
                <motion.circle
                  key={radius}
                  cx="300"
                  cy="300"
                  r={radius}
                  fill="none"
                  stroke="#e8e6e2"
                  strokeWidth="2.5"
                  strokeDasharray="8 4"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 0.6 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                  style={{ transformOrigin: '300px 300px' }}
                />
              ))}

              {/* Flight path lines from Denham - 4 diagonal directions (blue) */}
              {[
                { x: -20, y: -20 },   // top-left
                { x: 620, y: -20 },   // top-right
                { x: -20, y: 620 },   // bottom-left
                { x: 620, y: 620 },   // bottom-right
              ].map((endpoint, i) => (
                <motion.line
                  key={`flight-path-${i}`}
                  x1="300"
                  y1="300"
                  x2={endpoint.x}
                  y2={endpoint.y}
                  stroke="#3b82f6"
                  strokeWidth="5"
                  strokeDasharray="8 8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                />
              ))}

              {/* Cardinal direction lines - N E S W (grey) */}
              {[
                { x: 300, y: 20 },    // North
                { x: 580, y: 300 },   // East
                { x: 300, y: 580 },   // South
                { x: 20, y: 300 },    // West
              ].map((endpoint, i) => (
                <motion.line
                  key={`cardinal-${i}`}
                  x1="300"
                  y1="300"
                  x2={endpoint.x}
                  y2={endpoint.y}
                  stroke="#d1d5db"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                />
              ))}

              {/* Denham center point */}
              <motion.circle
                cx="300"
                cy="300"
                r="12"
                fill="#1a1a1a"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.1, duration: 0.4, type: 'spring', stiffness: 200 }}
              />

              {/* N S E W Compass indicators */}
              <motion.text
                x="300"
                y="-10"
                textAnchor="middle"
                className="exp-barcode__compass-dir"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.4 } : {}}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                N
              </motion.text>
              <motion.text
                x="300"
                y="625"
                textAnchor="middle"
                className="exp-barcode__compass-dir"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.4 } : {}}
                transition={{ delay: 0.75, duration: 0.3 }}
              >
                S
              </motion.text>
              <motion.text
                x="625"
                y="305"
                textAnchor="middle"
                className="exp-barcode__compass-dir"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.4 } : {}}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                E
              </motion.text>
              <motion.text
                x="-25"
                y="305"
                textAnchor="middle"
                className="exp-barcode__compass-dir"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.4 } : {}}
                transition={{ delay: 0.85, duration: 0.3 }}
              >
                W
              </motion.text>

              {/* Center label */}
              <motion.text
                x="300"
                y="330"
                textAnchor="middle"
                className="exp-barcode__compass-label"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.7 } : {}}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                DENHAM
              </motion.text>
            </svg>
          </div>

          <div className="exp-barcode__grid">
          {barcodes.map((item, i) => (
            <motion.div
              key={item.id}
              className="exp-barcode__item"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
            >
              <div className="exp-barcode__top">
                <div className="exp-barcode__thumb">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="exp-barcode__bars">
                  {item.code.map((bar, j) => (
                    <div
                      key={j}
                      className="exp-barcode__bar"
                      style={{
                        width: bar ? (((j % 3) + 1) * 1.2) : 1,
                        background: bar ? '#1a1a1a' : 'transparent'
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="exp-barcode__info">
                <span className="exp-barcode__dest">{item.name}</span>
                <span className="exp-barcode__meta">{item.distance}</span>
              </div>
            </motion.div>
          ))}

          </div>

          {/* Connecting lines between barcode pairs - positioned behind cards */}
          <motion.div
            className="exp-barcode__connector exp-barcode__connector--top-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
          />
          <motion.div
            className="exp-barcode__connector exp-barcode__connector--top-right"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.55, duration: 0.4, ease: 'easeOut' }}
          />
          <motion.div
            className="exp-barcode__connector exp-barcode__connector--bottom-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
          />
          <motion.div
            className="exp-barcode__connector exp-barcode__connector--bottom-right"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.65, duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      <style>{`
        .exp-barcode {
          font-family: 'Space Grotesk', -apple-system, sans-serif;
          background: #fff;
          padding: 4rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .exp-barcode__compass-bg {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .exp-barcode__compass-svg {
          width: auto;
          height: 100%;
          max-height: 100%;
          aspect-ratio: 1;
        }

        .exp-barcode__compass-dir {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 24px;
          font-weight: 700;
          fill: #1a1a1a;
          letter-spacing: 0.1em;
        }

        .exp-barcode__compass-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 700;
          fill: #1a1a1a;
          letter-spacing: 0.2em;
        }

        .exp-barcode__container {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .exp-barcode__header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .exp-barcode__title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin: 0 0 0.5rem 0;
        }

        .exp-barcode__subtitle {
          font-size: 0.85rem;
          color: #888;
          letter-spacing: 0.1em;
        }

        .exp-barcode__grid-wrapper {
          position: relative;
        }

        .exp-barcode__grid {
          display: grid;
          grid-template-columns: 1fr 1fr 4rem 1fr 1fr;
          gap: 1rem;
          align-items: start;
          position: relative;
          z-index: 2;
        }

        /* Skip the middle column (spacer) */
        .exp-barcode__item:nth-child(1) { grid-column: 1; }
        .exp-barcode__item:nth-child(2) { grid-column: 2; }
        .exp-barcode__item:nth-child(3) { grid-column: 4; }
        .exp-barcode__item:nth-child(4) { grid-column: 5; }
        .exp-barcode__item:nth-child(5) { grid-column: 1; grid-row: 2; }
        .exp-barcode__item:nth-child(6) { grid-column: 2; grid-row: 2; }
        .exp-barcode__item:nth-child(7) { grid-column: 4; grid-row: 2; }
        .exp-barcode__item:nth-child(8) { grid-column: 5; grid-row: 2; }

        .exp-barcode__item {
          padding: 0.85rem 1rem;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.95);
          cursor: pointer;
          backdrop-filter: blur(4px);
          position: relative;
          z-index: 2;
        }

        .exp-barcode__item:hover {
          transform: scale(1.03);
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .exp-barcode__top {
          display: flex;
          gap: 0.5rem;
          align-items: stretch;
          margin-bottom: 0.5rem;
        }

        .exp-barcode__thumb {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          border-radius: 4px;
          overflow: hidden;
        }

        .exp-barcode__thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .exp-barcode__bars {
          display: flex;
          gap: 1px;
          flex: 1;
          height: 40px;
          align-items: stretch;
          padding: 0.35rem;
          background: #fafafa;
          border-radius: 3px;
        }

        .exp-barcode__bar {
          height: 100%;
          border-radius: 1px;
        }

        .exp-barcode__info {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .exp-barcode__dest {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .exp-barcode__meta {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          color: #888;
        }

        /* Connector lines between barcode pairs */
        .exp-barcode__connector {
          position: absolute;
          height: 2px;
          background: #3b82f6;
          z-index: 1;
          pointer-events: none;
        }

        .exp-barcode__connector--top-left {
          top: 50px;
          left: 21%;
          width: calc(23% - 1rem);
          transform-origin: left center;
        }

        .exp-barcode__connector--top-right {
          top: 50px;
          right: 21%;
          width: calc(23% - 1rem);
          transform-origin: right center;
        }

        .exp-barcode__connector--bottom-left {
          bottom: 50px;
          left: 21%;
          width: calc(23% - 1rem);
          transform-origin: left center;
        }

        .exp-barcode__connector--bottom-right {
          bottom: 50px;
          right: 21%;
          width: calc(23% - 1rem);
          transform-origin: right center;
        }

        @media (max-width: 900px) {
          .exp-barcode__grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .exp-barcode__item:nth-child(n) {
            grid-column: auto;
            grid-row: auto;
          }
          .exp-barcode__compass-bg {
            display: none;
          }
          .exp-barcode__connector {
            display: none;
          }
        }

        @media (max-width: 500px) {
          .exp-barcode {
            padding: 2rem 1rem;
          }

          .exp-barcode__grid {
            grid-template-columns: 1fr;
          }

          .exp-barcode__compass-dir {
            font-size: 18px;
          }

          .exp-barcode__compass-label {
            font-size: 10px;
          }
        }
      `}</style>
    </section>
  );
}

export default ExpeditionBarcode;
