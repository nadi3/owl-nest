import { Box, useTheme } from '@mui/material';
import HeroSection from '@/components/common/HeroSection.tsx';
import ContentSection from '@/components/common/ContentSection.tsx';
import { PageSEO } from '@/components/common/PageSEO.tsx';

const PublicTools = () => {
  const theme = useTheme();

  const sections = [
    {
      imageSrc: '/storyset/Decision-fatigue-amico.svg',
      titleKey: 'tools.wheel.title',
      subtitleKey: 'tools.wheel.subtitle',
      ctaKey: 'tools.wheel.cta',
      ctaTo: '/tools/wheel',
      bgColor: { bgcolor: theme.palette.secondary.light },
    },
    {
      imageSrc: '/storyset/Headphone-amico.svg',
      titleKey: 'tools.audioVisualizer.title',
      subtitleKey: 'tools.audioVisualizer.subtitle',
      ctaKey: 'tools.audioVisualizer.cta',
      ctaTo: '/tools/visualizer',
      reverse: true,
    },
    {
      imageSrc: '/storyset/Image-viewer-amico.svg',
      titleKey: 'tools.anonymizer.title',
      subtitleKey: 'tools.anonymizer.subtitle',
      ctaKey: 'tools.anonymizer.cta',
      ctaTo: '/tools/anonymizer',
      bgColor: { bgcolor: theme.palette.secondary.light },
    },
  ];

  return (
    <Box>
      <PageSEO titleKey={'seo.tools.title'} descriptionKey={'seo.tools.description'} />

      <HeroSection
        imageSrc={'/storyset/Digital-tools-amico.svg'}
        titleKey={'tools.hero.title_part1'}
        accentKey={'tools.hero.title_accent'}
        subtitleKey={'tools.hero.subtitle'}
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

export default PublicTools;
