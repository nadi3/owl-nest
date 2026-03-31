/**
 * @file Portfolio.tsx
 * @description The main portfolio page, showcasing different areas of expertise
 * through a series of content sections.
 */

import React from 'react';
import { Box, useTheme } from '@mui/material';
import HeroSection from '@/components/common/HeroSection.tsx';
import ContentSection from '@/components/common/ContentSection.tsx';
import { PageSEO } from '@/components/common/PageSEO.tsx';

/**
 * The portfolio page component.
 *
 * This page serves as a high-level overview of the different projects and areas of expertise.
 *
 * The content for each section is defined in the `sections` array, making it
 * easy to add, remove, or reorder areas of focus.
 *
 * @component
 * @returns {React.ReactElement} The rendered portfolio page.
 */
const Portfolio: React.FC = (): React.ReactElement => {
  const theme = useTheme();

  /**
   * An array of configuration objects for each `ContentSection` on the page.
   * Each object defines the props for a section, including its image, text content,
   * call-to-action, and layout variations.
   * @constant
   */
  const sections = [
    {
      imageSrc: '/storyset/Server-status-amico.svg',
      titleKey: 'portfolio.sysadmin.title',
      subtitleKey: 'portfolio.sysadmin.subtitle',
      ctaKey: 'portfolio.sysadmin.cta',
      ctaTo: '/portfolio',
      bgColor: { bgcolor: theme.palette.secondary.light },
    },
    {
      imageSrc: '/storyset/Cross-platform software-amico.svg',
      titleKey: 'portfolio.dev.title',
      subtitleKey: 'portfolio.dev.subtitle',
      ctaKey: 'portfolio.dev.cta',
      ctaTo: '/portfolio',
      reverse: true,
    },
    {
      imageSrc: '/storyset/Robot-arm-amico.svg',
      titleKey: 'portfolio.iot.title',
      subtitleKey: 'portfolio.iot.subtitle',
      ctaKey: 'portfolio.iot.cta',
      ctaTo: '/portfolio',
      bgColor: { bgcolor: theme.palette.secondary.light },
    },
  ];

  return (
    <Box>
      <PageSEO titleKey={'seo.portfolio.title'} descriptionKey={'seo.portfolio.description'} />
      <HeroSection
        imageSrc={'/storyset/Portfolio-amico.svg'}
        titleKey={'portfolio.hero.title_part1'}
        accentKey={'portfolio.hero.title_accent'}
        subtitleKey={'portfolio.hero.subtitle'}
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

export default Portfolio;
