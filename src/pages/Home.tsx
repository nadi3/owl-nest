import React from 'react';
import { Box, useTheme } from '@mui/material';
import HeroSection from '@/components/common/HeroSection.tsx';
import ContentSection from '@/components/common/ContentSection.tsx';
import { PageSEO } from '@/components/common/PageSEO.tsx';

/**
 * Owl Nest Home Page.
 * Implements an IMMERSIVE SCROLL EXPERIENCE (CSS Scroll Snapping)
 * and ORCHESTRATED ANIMATIONS (Staggered Children).
 */
const Home: React.FC = () => {
  const theme = useTheme();

  const sections = [
    {
      imageSrc: '/storyset/Laboratory-amico.svg',
      titleKey: 'home.lab.title',
      subtitleKey: 'home.lab.subtitle',
      ctaKey: 'home.lab.cta',
      ctaTo: '/useless',
      bgColor: { bgcolor: theme.palette.secondary.light },
    },
    {
      imageSrc: '/storyset/Digital-tools-amico.svg',
      titleKey: 'home.tools.title',
      subtitleKey: 'home.tools.subtitle',
      ctaKey: 'home.tools.cta',
      ctaTo: '/tools',
      reverse: true,
    },
    {
      imageSrc: '/storyset/Portfolio-amico.svg',
      titleKey: 'home.portfolio.title',
      subtitleKey: 'home.portfolio.subtitle',
      ctaKey: 'home.portfolio.cta',
      ctaTo: '/portfolio',
      bgColor: { bgcolor: theme.palette.secondary.light },
    },
    {
      imageSrc: '/storyset/Security-On-amico.svg',
      titleKey: 'home.private.title',
      subtitleKey: 'home.private.subtitle',
      ctaKey: 'home.private.cta',
      ctaTo: '/private',
      reverse: true,
    },
  ];

  return (
    <Box>
      <PageSEO titleKey={'seo.home.title'} descriptionKey={'seo.home.description'} />

      <HeroSection
        imageSrc={'/storyset/Work-in-progress-amico.svg'}
        titleKey={'home.hero.title_part1'}
        accentKey={'home.hero.title_accent'}
        subtitleKey={'home.hero.subtitle'}
      />
      {sections.map((section, index) => (
        <ContentSection
          key={index}
          imageSrc={section.imageSrc}
          titleKey={section.titleKey}
          subtitleKey={section.subtitleKey}
          ctaKey={section.ctaKey}
          ctaTo={section.ctaTo}
          reverse={section.reverse}
          bgColor={section.bgColor}
        />
      ))}
    </Box>
  );
};

export default Home;
