/**
 * @file Home.tsx
 * @description The main landing page of the Owl Nest application, featuring a
 * full-page scrolling experience with animated sections.
 */

import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import HeroSection from '@/components/common/HeroSection.tsx';
import ContentSection from '@/components/common/ContentSection.tsx';
import { PageSEO } from '@/components/common/PageSEO.tsx';

/**
 * The main homepage component.
 *
 * This page provides an immersive, full-screen scrolling experience using CSS
 * Scroll Snapping. It is composed of a `HeroSection` followed by a series of
 * `ContentSection` components, each highlighting a major area of the application.
 *
 * The content for each section is defined in the `sections` array, making it
 * easy to add, remove, or reorder the page's content blocks. The sections
 * feature orchestrated, staggered animations that trigger on scroll.
 *
 * @component
 * @returns {React.ReactElement} The rendered homepage.
 */
const Home: React.FC = (): React.ReactElement => {
  const theme = useTheme();

  /**
   * An array of configuration objects for each `ContentSection` on the homepage.
   * Each object defines the props for a section, including its image, text content,
   * call-to-action, and layout variations.
   * @constant
   */
  const sections = [
    {
      imageSrc: '/storyset/Laboratory-amico.webp',
      titleKey: 'home.lab.title',
      subtitleKey: 'home.lab.subtitle',
      ctaKey: 'home.lab.cta',
      ctaTo: '/useless',
      bgColor: { bgcolor: theme.palette.secondary.light },
    },
    {
      imageSrc: '/storyset/Digital-tools-amico.webp',
      titleKey: 'home.tools.title',
      subtitleKey: 'home.tools.subtitle',
      ctaKey: 'home.tools.cta',
      ctaTo: '/tools',
      reverse: true,
    },
    {
      imageSrc: '/storyset/Portfolio-amico.webp',
      titleKey: 'home.portfolio.title',
      subtitleKey: 'home.portfolio.subtitle',
      ctaKey: 'home.portfolio.cta',
      ctaTo: '/portfolio',
      bgColor: { bgcolor: theme.palette.secondary.light },
    },
    {
      imageSrc: '/storyset/Security-On-amico.webp',
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
        imageSrc={'/storyset/Work-in-progress-amico.webp'}
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
