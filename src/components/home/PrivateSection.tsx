import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Stack, Grid, Box, useTheme } from '@mui/material';
import AnimatedSectionWrapper from './AnimatedSectionWrapper';
import {
  MotionBody,
  MotionButton,
  MotionImage,
  MotionTitle,
} from '@/components/home/HomeAnimationsItems.tsx';
import { NestButton } from '@/components/common/NestButton.tsx';

const PrivateSection: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const imageSrc = '/storyset/Security-On-amico.svg';

  return (
    <AnimatedSectionWrapper sx={{ bgcolor: 'background.default' }}>
      <Grid
        container
        spacing={8}
        alignItems="center"
        direction={{ xs: 'column', md: 'row-reverse' }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
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
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={4}>
            <MotionTitle>
              <Typography
                variant="h2"
                sx={{
                  borderLeft: `8px solid ${theme.palette.secondary.main}`,
                  pl: 3,
                }}
              >
                {t('home.private.title')}
              </Typography>
            </MotionTitle>
            <MotionBody>
              <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                {t('home.private.subtitle')}
              </Typography>
            </MotionBody>
            <MotionButton>
              <NestButton nestVariant="contained" nestColor="primary" to={'/private'}>
                {t('home.private.cta')}
              </NestButton>
            </MotionButton>
          </Stack>
        </Grid>
      </Grid>
    </AnimatedSectionWrapper>
  );
};

export default PrivateSection;
