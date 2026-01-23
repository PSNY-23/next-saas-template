// components/ClientLenis.js

'use client'; // This marks the component as client-side

import { useEffect } from 'react';
import Lenis from 'lenis';

export const LenisClient = () => {
  useEffect(() => {
    // Initialize Lenis with custom settings
    const lenis = new Lenis({
      autoRaf: true,  // Lenis automatically handles requestAnimationFrame
      duration: 1,  // Scroll duration (lower values = faster scroll)
      easing: (t) => 1 - Math.pow(1 - t, 4),  // Ease-out easing function for smoother scroll
      smoothWheel: true, // Enable smooth scrolling with mouse wheel
    });

    // Cleanup function when component unmounts
    return () => {
      lenis.destroy(); // Clean up Lenis when the component is removed from the DOM
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return null; // This component doesn't render any DOM, just initializes Lenis
};
