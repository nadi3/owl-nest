import React from 'react';
import { Box, useTheme } from '@mui/material';
import HeroSection from '@/components/common/HeroSection.tsx';
import ContentSection from '@/components/common/ContentSection.tsx';

const Portfolio: React.FC = () => {
  const theme = useTheme();

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
