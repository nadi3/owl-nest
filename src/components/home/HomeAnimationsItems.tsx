import React, { type ReactNode } from 'react';
import { motion, type Variants, type Transition } from 'framer-motion';

/**
 * @file This file exports a collection of pre-configured `framer-motion` components.
 * These components are designed to be used within an `AnimatedSectionWrapper`
 * to create consistent, staggered animations across the application.
 */

/**
 * A common transition configuration used by most motion components.
 * It defines a spring animation for a natural and fluid effect.
 * @type {Transition}
 */
const commonTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

/**
 * Animation variants for text elements (e.g., titles, paragraphs).
 * The animation creates a "slide up" and "fade in" effect.
 * - `hidden`: The initial state, where the element is moved down and is transparent.
 * - `visible`: The target state, where the element is in its final position and fully opaque.
 * @type {Variants}
 */
const textVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: commonTransition },
};

/**
 * Animation variants for button elements.
 * The animation creates a "pop in" effect by scaling up and fading in.
 * - `hidden`: The initial state, where the button is scaled down and transparent.
 * - `visible`: The target state, where the button is at its normal size and fully opaque.
 * @type {Variants}
 */
const buttonVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { ...commonTransition, delay: 0.2 } },
};

/**
 * Animation variants for image elements.
 * The animation creates a "scale in" and "slight rotation" effect.
 * - `hidden`: The initial state, where the image is scaled down, slightly rotated, and transparent.
 * - `visible`: The target state, where the image is at its normal size, with no rotation, and fully opaque.
 * @type {Variants}
 */
const imageVariants: Variants = {
  hidden: { scale: 0.5, rotate: -5, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 20 },
  },
};

/**
 * A motion component that wraps its children in a `motion.div` pre-configured
 * with `textVariants`. It's designed for animating titles (e.g., `<h1>`, `<h2>`).
 *
 * @component
 * @param {{children: React.ReactNode}} props The props for the component.
 * @returns {React.ReactElement} The rendered motion component.
 */
export const MotionTitle: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => <motion.div variants={textVariants}>{children}</motion.div>;

/**
 * A motion component that wraps its children in a `motion.div` pre-configured
 * with `textVariants`. It's ideal for animating body text like paragraphs.
 *
 * @component
 * @param {{children: React.ReactNode}} props The props for the component.
 * @returns {React.ReactElement} The rendered motion component.
 */
export const MotionBody: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => <motion.div variants={textVariants}>{children}</motion.div>;

/**
 * A motion component that wraps its children in a `motion.div` pre-configured
 * with `buttonVariants`. It provides a "pop-in" animation suitable for buttons.
 *
 * @component
 * @param {{children: React.ReactNode}} props The props for the component.
 * @returns {React.ReactElement} The rendered motion component.
 */
export const MotionButton: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => <motion.div variants={buttonVariants}>{children}</motion.div>;

/**
 * A motion component that wraps its children in a `motion.div` pre-configured
 * with `imageVariants`. It's designed to animate images or other media with a
 * subtle scale and rotation effect.
 *
 * @component
 * @param {{children: React.ReactNode}} props The props for the component.
 * @returns {React.ReactElement} The rendered motion component.
 */
export const MotionImage: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => <motion.div variants={imageVariants}>{children}</motion.div>;
