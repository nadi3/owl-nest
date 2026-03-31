import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid, { type GridDirection } from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTheme, type SxProps, type Theme } from '@mui/material/styles';
import AnimatedSectionWrapper from '../home/AnimatedSectionWrapper.tsx';
import { NestButton } from '@/components/common/NestButton.tsx';
import {
  MotionTitle,
  MotionBody,
  MotionButton,
  MotionImage,
} from '@/components/home/HomeAnimationsItems.tsx';

/**
 * Props for the ContentSection component.
 */
interface ContentSectionProps {
  /**
   * The source URL of the image to display.
   */
  imageSrc: string;
  /**
   * The translation key for the section title.
   */
  titleKey: string;
  /**
   * The translation key for the section subtitle.
   */
  subtitleKey: string;
  /**
   * The translation key for the call-to-action button text.
   */
  ctaKey: string;
  /**
   * The URL to navigate to when the call-to-action button is clicked.
   */
  ctaTo: string;
  /**
   * If true, the image and text will be displayed in reverse order.
   * @default false
   */
  reverse?: boolean;
  /**
   * The background color of the section.
   */
  bgColor?: SxProps<Theme>;
}

/**
 * A reusable component that displays a content section with an image, title, subtitle, and a call-to-action button.
 * The layout can be configured to reverse the order of the image and text.
 * It uses animations for its elements.
 */
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
              loading="lazy"
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
