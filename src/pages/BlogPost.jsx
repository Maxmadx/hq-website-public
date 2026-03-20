/**
 * BlogPost - Dynamic router for individual blog posts
 */

import { useParams, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load all blog post components
const blogComponents = {
  PPLGuide: lazy(() => import('./blog/PPLGuide')),
  MasteringTheHover: lazy(() => import('./blog/MasteringTheHover')),
  WinterFlying: lazy(() => import('./blog/WinterFlying')),
  MaintenanceCheck: lazy(() => import('./blog/MaintenanceCheck')),
  LondonHeliLanes: lazy(() => import('./blog/LondonHeliLanes')),
  Autorotations: lazy(() => import('./blog/Autorotations')),
  NightRating: lazy(() => import('./blog/NightRating')),
  OwnershipVsHire: lazy(() => import('./blog/OwnershipVsHire')),
  PreFlightWalkaround: lazy(() => import('./blog/PreFlightWalkaround')),
  MedicalCertificates: lazy(() => import('./blog/MedicalCertificates')),
  WeatherDecisions: lazy(() => import('./blog/WeatherDecisions')),
  TurbineFlight: lazy(() => import('./blog/TurbineFlight')),
  RadioTelephony: lazy(() => import('./blog/RadioTelephony')),
  FlightInstructor: lazy(() => import('./blog/FlightInstructor')),
  ConfinedAreas: lazy(() => import('./blog/ConfinedAreas')),
  RR300Engine: lazy(() => import('./blog/RR300Engine')),
  WhyWeFly: lazy(() => import('./blog/WhyWeFly')),
};

// Map post IDs to component names
const postIdToComponent = {
  'ppl-guide': 'PPLGuide',
  'mastering-the-hover': 'MasteringTheHover',
  'winter-flying': 'WinterFlying',
  'maintenance-check': 'MaintenanceCheck',
  'london-heli-lanes': 'LondonHeliLanes',
  'autorotations': 'Autorotations',
  'night-rating': 'NightRating',
  'ownership-vs-hire': 'OwnershipVsHire',
  'pre-flight-walkaround': 'PreFlightWalkaround',
  'medical-certificates': 'MedicalCertificates',
  'weather-decisions': 'WeatherDecisions',
  'turbine-flight': 'TurbineFlight',
  'radio-telephony': 'RadioTelephony',
  'flight-instructor': 'FlightInstructor',
  'confined-areas': 'ConfinedAreas',
  'rr300-engine': 'RR300Engine',
  'why-we-fly': 'WhyWeFly',
};

function BlogPost() {
  const { postId } = useParams();
  const componentName = postIdToComponent[postId];

  if (!componentName) {
    return <Navigate to="/blog" replace />;
  }

  const BlogComponent = blogComponents[componentName];

  return (
    <Suspense fallback={
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        fontFamily: "'Space Grotesk', sans-serif",
        color: '#666'
      }}>
        Loading...
      </div>
    }>
      <BlogComponent />
    </Suspense>
  );
}

export default BlogPost;
