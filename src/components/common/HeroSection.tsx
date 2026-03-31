import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Stack, Grid, useTheme, Box } from '@mui/material';
import AnimatedSectionWrapper from '../home/AnimatedSectionWrapper.tsx';
import { MotionTitle, MotionBody, MotionImage } from '@/components/home/HomeAnimationsItems.tsx';

interface HeroSectionProps {
  imageSrc: string;
  titleKey: string;
  accentKey: string;
  subtitleKey: string;
}

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
              alt="Lab Illustration"
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
