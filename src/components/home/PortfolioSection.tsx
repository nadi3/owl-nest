import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Stack, Grid, Box, useTheme } from '@mui/material';
import AnimatedSectionWrapper from './AnimatedSectionWrapper';
import { NestButton } from '@/components/common/NestButton.tsx';
import {
  MotionTitle,
  MotionBody,
  MotionButton,
  MotionImage,
} from '@/components/home/HomeAnimationsItems.tsx';

const PortfolioSection: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const imageSrc = '/storyset/Portfolio-amico.svg';

  return (
    <AnimatedSectionWrapper sx={{ bgcolor: theme.palette.secondary.light }}>
      <Grid container spacing={8} alignItems="center">
        <Grid size={12}>
          <Stack spacing={4}>
            <MotionTitle>
              <Typography variant="h2" color="secondary.dark" sx={{ fontWeight: 900 }}>
                {t('home.portfolio.title')}
              </Typography>
            </MotionTitle>
            <MotionBody>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.secondary.dark, fontSize: '1.2rem', opacity: 0.9 }}
              >
                {t('home.portfolio.subtitle')}
              </Typography>
            </MotionBody>
            <MotionButton>
              <NestButton
                variant="outlined"
                sx={{
                  color: theme.palette.secondary.dark,
                  borderColor: theme.palette.secondary.dark,
                  borderWidth: 2,
                  '&:hover': { borderWidth: 2, bgcolor: 'rgba(0,0,0,0.05)' },
                }}
              >
                {t('home.portfolio.cta')}
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

export default PortfolioSection;
