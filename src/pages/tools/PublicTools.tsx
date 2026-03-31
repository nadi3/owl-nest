/**
 * @file PublicTools.tsx
 * @description The main landing page for the public tools section, showcasing
 * the available tools with descriptive sections.
 */

import { Box, useTheme } from '@mui/material';
import HeroSection from '@/components/common/HeroSection.tsx';
import ContentSection from '@/components/common/ContentSection.tsx';
import { PageSEO } from '@/components/common/PageSEO.tsx';

/**
 * The main page component for showcasing the suite of public tools.
 *
 * This page acts as a directory for the various tools available on the site.
 * It uses a `HeroSection` for an engaging introduction, followed by a series of
 * `ContentSection` components. Each `ContentSection` highlights a specific tool,
 * providing a title, a brief description, and a call-to-action button that
 * links to the tool's dedicated page.
 *
 * The configuration for each tool's section is stored in the `sections` array,
 * making it easy to manage the content.
 *
 * @component
 * @returns {React.ReactElement} The rendered public tools page.
 */
const PublicTools = (): React.ReactElement => {
  const theme = useTheme();

  /**
   * An array of configuration objects for each tool's `ContentSection`.
   * Each object defines the props needed to render a section, including the
   * image, title, subtitle, and link to the tool.
   * @constant
   */
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
