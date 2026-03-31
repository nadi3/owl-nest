import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AnimatedSectionWrapper from '../home/AnimatedSectionWrapper.tsx';
import { MotionTitle, MotionBody, MotionImage } from '@/components/home/HomeAnimationsItems.tsx';

/**
 * Props for the HeroSection component.
 */
interface HeroSectionProps {
  /**
   * The source URL of the image to display.
   */
  imageSrc: string;
  /**
   * The translation key for the main title.
   */
  titleKey: string;
  /**
   * The translation key for the accented (highlighted) part of the title.
   */
  accentKey: string;
  /**
   * The translation key for the subtitle.
   */
  subtitleKey: string;
}

/**
 * A component that displays a hero section with a title, a subtitle, and an image.
 * It uses animations for its elements and is designed to be a prominent feature on a page.
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  imageSrc,
  titleKey,
  accentKey,
  subtitleKey,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <AnimatedSectionWrapper
      sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex' }}
    >
      <Grid container spacing={8} alignItems="center">
        <Grid size={12}>
          <Stack spacing={4}>
            <MotionTitle>
              <Typography variant="h1" sx={{ fontWeight: 800 }}>
                {t(titleKey)}{' '}
                <span style={{ color: theme.palette.secondary.main }}>{t(accentKey)}</span>
              </Typography>
            </MotionTitle>
            <MotionBody>
              <Typography variant="h5" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {t(subtitleKey)}
              </Typography>
            </MotionBody>
          </Stack>
        </Grid>
        <Grid size={12}>
          <MotionImage>
            <Box
              component="img"
              src={imageSrc}
              alt="Hero illustration"
              loading="lazy"
              sx={{
                width: '100%',
                height: 'auto',
                maxWidth: '450px',
                display: 'block',
                mx: 'auto',
                filter: `drop-shadow(0px 10px 20px ${theme.palette.secondary.light})`,
              }}
            />
          </MotionImage>
        </Grid>
      </Grid>
    </AnimatedSectionWrapper>
  );
};

export default HeroSection;
