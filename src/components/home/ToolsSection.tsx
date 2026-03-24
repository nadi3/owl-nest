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

const ToolsSection: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const imageSrc = '/storyset/Digital-tools-amico.svg';

  return (
    <AnimatedSectionWrapper
      sx={{ bgcolor: theme.palette.secondary.light, color: theme.palette.secondary.dark }}
    >
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
                filter: `drop-shadow(0px 10px 20px ${theme.palette.secondary.light})`,
              }}
            />
          </MotionImage>
        </Grid>
        <Grid size={12}>
          <Stack spacing={3}>
            <MotionTitle>
              <Typography variant="h2" color="inherit">
                {t('home.tools.title')}
              </Typography>
            </MotionTitle>
            <MotionBody>
              <Typography variant="body1" color="inherit" sx={{ fontSize: '1.2rem', opacity: 0.8 }}>
                {t('home.tools.subtitle')}
              </Typography>
            </MotionBody>
            <MotionButton>
              <NestButton variant="outlined" color="inherit">
                {t('home.tools.cta')}
              </NestButton>
            </MotionButton>
          </Stack>
        </Grid>
      </Grid>
    </AnimatedSectionWrapper>
  );
};

export default ToolsSection;
