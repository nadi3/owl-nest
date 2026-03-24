import React, { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Box, Typography, useTheme } from '@mui/material';

const commonTransition = { type: 'spring', stiffness: 100, damping: 15 };

// Variants for Text elements (slide up)
const textVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: commonTransition },
};

// Variants for Buttons (scale and pop in)
const buttonVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { ...commonTransition, delay: 0.2 } },
};

// Variants for Images (Scale and light rotate)
const imageVariants: Variants = {
  hidden: { scale: 0.5, rotate: -5, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 20 },
  },
};

/** Animate Title (H1, H2) with slide-up */
export const MotionTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <motion.div variants={textVariants}>{children}</motion.div>
);

/** Animate Body Text (Typography body1) with slide-up */
export const MotionBody: React.FC<{ children: ReactNode }> = ({ children }) => (
  <motion.div variants={textVariants}>{children}</motion.div>
);

/** Animate Buttons with a scale pop */
export const MotionButton: React.FC<{ children: ReactNode }> = ({ children }) => (
  <motion.div variants={buttonVariants}>{children}</motion.div>
);

/** Animate Images/Placeholders with scale and rotate */
export const MotionImage: React.FC<{ children: ReactNode }> = ({ children }) => (
  <motion.div variants={imageVariants}>{children}</motion.div>
);

/** * Styled Placeholder for missing images.
 * Uses SECONDARY color and definitive aspect ratio.
 */
export const ImagePlaceholder: React.FC<{ description: string }> = ({ description }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: 480,
        // USE SECONDARY COLOR (Light version for background)
        bgcolor: theme.palette.secondary.light,
        borderRadius: `${theme.shape.borderRadius * 2}px`, // Very rounded
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: '16/10',
        border: '4px solid',
        // USE SECONDARY COLOR (Main version for border)
        borderColor: theme.palette.secondary.main,
        color: theme.palette.secondary.dark,
        p: 4,
        textAlign: 'center',
        boxShadow: theme.shadows[6],
      }}
    >
      <Box>
        <Typography variant="h6" color="inherit">
          [ STORYSET SVG ]
        </Typography>
        <Typography variant="body2" color="inherit">
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
