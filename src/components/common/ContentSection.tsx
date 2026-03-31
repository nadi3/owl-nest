import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Stack,
  Grid,
  Box,
  useTheme,
  type SxProps,
  type Theme,
  type GridDirection,
} from '@mui/material';
import AnimatedSectionWrapper from '../home/AnimatedSectionWrapper.tsx';
import { NestButton } from '@/components/common/NestButton.tsx';
import {
  MotionTitle,
  MotionBody,
  MotionButton,
  MotionImage,
} from '@/components/home/HomeAnimationsItems.tsx';

interface ContentSectionProps {
  imageSrc: string;
  titleKey: string;
  subtitleKey: string;
  ctaKey: string;
  ctaTo: string;
  reverse?: boolean;
  bgColor?: SxProps<Theme>;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  imageSrc,
  titleKey,
  subtitleKey,
  ctaKey,
  ctaTo,
  reverse = false,
  bgColor,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const direction: { xs: GridDirection; md: GridDirection } = {
    xs: reverse ? 'column-reverse' : 'column',
    md: reverse ? 'row-reverse' : 'row',
  };

  return (
    <AnimatedSectionWrapper sx={bgColor}>
      <Grid container spacing={8} alignItems="center" direction={direction}>
        <Grid size={{ xs: 12, md: 6 }}>
          <MotionImage>
            <Box
              component="img"
              src={imageSrc}
              alt={t(titleKey)}
              sx={{
                width: '100%',
                height: 'auto',
                maxWidth: '450px',
                display: 'block',
                mx: 'auto',
                filter: `drop-shadow(0px 10px 20px ${
                  bgColor ? theme.palette.grey.A400 : theme.palette.secondary.light
                })`,
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
                {t(titleKey)}
              </Typography>
            </MotionTitle>
            <MotionBody>
              <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                {t(subtitleKey)}
              </Typography>
            </MotionBody>
            <MotionButton>
              <NestButton nestVariant="contained" nestColor="primary" to={ctaTo}>
                {t(ctaKey)}
              </NestButton>
            </MotionButton>
          </Stack>
        </Grid>
      </Grid>
    </AnimatedSectionWrapper>
  );
};

export default ContentSection;
