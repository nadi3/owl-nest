import React, { type ReactNode } from 'react';
import { motion, type UseInViewOptions, type Variants } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * @file This file defines the AnimatedSectionWrapper component, a reusable wrapper
 * that applies scroll-triggered animations to its children.
 */

/**
 * Props for the AnimatedSectionWrapper component.
 * @interface AnimatedSectionWrapperProps
 */
interface AnimatedSectionWrapperProps {
  /**
   * The content to be rendered inside the section.
   * These children will be animated when the section scrolls into view.
   * @type {React.ReactNode}
   */
  children: ReactNode;
  /**
   * If true, the section will take up the full viewport height (100vh).
   * @type {boolean}
   * @default true
   */
  fullHeight?: boolean;
  /**
   * Custom MUI styles to be applied to the main container Box.
   * @type {SxProps<Theme>}
   */
  sx?: SxProps<Theme>;
}

/**
 * A wrapper component that uses `framer-motion` to orchestrate staggered animations
 * for its children as the section scrolls into the viewport.
 *
 * It acts as a `motion.section` and controls the `initial`, `whileInView`, and `variants`
 * properties to trigger animations. The `staggerChildren` transition property
 * creates a sequential animation effect for the elements inside.
 *
 * @component
 * @param {AnimatedSectionWrapperProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered animated section wrapper.
 */
const AnimatedSectionWrapper: React.FC<AnimatedSectionWrapperProps> = ({
  children,
  fullHeight = true,
  sx = {},
}: AnimatedSectionWrapperProps): React.ReactElement => {
  // 1. Container Variants (triggers the orchestration)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  return (
    <Box
      component={motion.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 } as UseInViewOptions}
      variants={containerVariants}
      sx={{
        minHeight: fullHeight ? '100vh' : 'auto',
        py: { xs: 4, md: 6 },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        ...sx,
      }}
    >
      <Container maxWidth="lg" sx={{ width: '100%', height: '100%' }}>
        {children}
      </Container>
    </Box>
  );
};

export default AnimatedSectionWrapper;
