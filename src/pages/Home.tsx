import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '@/components/home/HeroSection.tsx';
import LabSection from '@/components/home/LabSection.tsx';
import ToolsSection from '@/components/home/ToolsSection.tsx';
import PortfolioSection from '@/components/home/PortfolioSection.tsx';
import PrivateSection from '@/components/home/PrivateSection.tsx';

/**
 * Owl Nest Home Page.
 * Implements an IMMERSIVE SCROLL EXPERIENCE (CSS Scroll Snapping)
 * and ORCHESTRATED ANIMATIONS (Staggered Children).
 */
const Home: React.FC = () => {
  return (
    <Box
      sx={{
        // Core Logic for CSS Scroll Snapping
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory', // Snap vertically, always.
        '& section': {
          scrollSnapAlign: 'start', // Align start of section to start of viewport
        },
        // Hide default scrollbar for total immersion (optional but recommended for this style)
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none', // IE and Edge
        scrollbarWidth: 'none', // Firefox
      }}
    >
      <HeroSection />
      <LabSection />
      <ToolsSection />
      <PortfolioSection />
      <PrivateSection />
    </Box>
  );
};

export default Home;
