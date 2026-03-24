import React, { type ReactNode } from 'react';
import { motion, type UseInViewOptions, type Variants } from 'framer-motion';
import { Box, Container, type SxProps, type Theme } from '@mui/material';

/**
 * Props for the AnimatedSectionWrapper.
 */
interface AnimatedSectionWrapperProps {
  /** The content of the section. */
  children: ReactNode;
  /** Full screen section? (100vh). Defaults to true. */
  fullHeight?: boolean;
  /** Additional SX styles for the Box container. */
  sx?: SxProps<Theme>;
}

/**
 * Enhanced wrapper that orchestrates staggered animations for its children
 * when the section scrolls into view.
 */
const AnimatedSectionWrapper: React.FC<AnimatedSectionWrapperProps> = ({
  children,
  fullHeight = true,
  sx = {},
}) => {
  // 1. Container Variants (triggers the orchestration)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Core Logic: Delay between each child animation
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  return (
    <Box
      component={motion.section} // Cast Box as motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 } as UseInViewOptions} // Trigger earlier (20% visible)
      variants={containerVariants}
      sx={{
        minHeight: fullHeight ? '100vh' : 'auto',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        py: 12, // Increased padding
        // CSS Scroll Snapping
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        ...sx,
      }}
    >
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        {children}
      </Container>
    </Box>
  );
};

export default AnimatedSectionWrapper;
