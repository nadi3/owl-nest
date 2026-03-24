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

const LabSection: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const imageSrc = '/storyset/Laboratory-amico.svg';

  return (
    <AnimatedSectionWrapper sx={{ bgcolor: theme.palette.secondary.light }}>
      <Grid
        container
        spacing={8}
        alignItems="center"
        direction={{ xs: 'column-reverse', md: 'row' }}
      >
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
                filter: `drop-shadow(0px 10px 20px ${theme.palette.grey.A400})`,
              }}
            />
          </MotionImage>
        </Grid>

        <Grid size={12}>
          <Stack spacing={4}>
            <MotionTitle>
              <Typography
                variant="h2"
                sx={{
                  borderLeft: `8px solid ${theme.palette.secondary.main}`,
                  pl: 3,
                }}
              >
                {t('home.lab.title')}
              </Typography>
            </MotionTitle>
            <MotionBody>
              <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                {t('home.lab.subtitle')}
              </Typography>
            </MotionBody>
            <MotionButton>
              <NestButton nestVariant="contained" nestColor="primary" to="/useless">
                {t('home.lab.cta')}
              </NestButton>
            </MotionButton>
          </Stack>
        </Grid>
      </Grid>
    </AnimatedSectionWrapper>
  );
};

export default LabSection;
