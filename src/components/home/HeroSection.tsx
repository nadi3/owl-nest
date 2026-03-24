import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Stack, Grid, useTheme, Box } from '@mui/material';
import AnimatedSectionWrapper from './AnimatedSectionWrapper';
import { NestButton } from '@/components/common/NestButton.tsx';
import {
  MotionTitle,
  MotionBody,
  MotionButton,
  MotionImage,
} from '@/components/home/HomeAnimationsItems.tsx';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const imageSrc = '/storyset/Work-in-progress-amico.svg';

  return (
    <AnimatedSectionWrapper sx={{ bgcolor: 'background.default' }}>
      <Grid container spacing={8} alignItems="center">
        <Grid size={12}>
          <Stack spacing={4}>
            <MotionTitle>
              <Typography variant="h1" sx={{ fontWeight: 800 }}>
                {t('home.hero.title_part1')}
                <span style={{ color: theme.palette.secondary.main }}>
                  {t('home.hero.title_accent')}
                </span>
              </Typography>
            </MotionTitle>
            <MotionBody>
              <Typography variant="h5" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {t('home.hero.subtitle')}
              </Typography>
            </MotionBody>
            <MotionButton>
              <NestButton
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                {t('common.discover')}
              </NestButton>
            </MotionButton>
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
