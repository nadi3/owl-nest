import { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useSpring } from 'framer-motion';
import { MouseAvatar } from '@/components/useless/MouseAvatar.tsx';
import { useTranslation } from 'react-i18next';

/**
 * @file FleeingElement.tsx
 * @description A "useless" but fun component featuring an element that runs away from the mouse cursor.
 */

/**
 * A component that renders an element that actively flees the user's mouse cursor.
 *
 * This component creates an interactive "game" where a `MouseAvatar` element tries
 * to escape the cursor. When the cursor gets too close, the element moves away.
 * Clicking the element "catches" it, increments a score, and teleports it to a new
 * random location within its container.
 *
 * The movement is handled using `framer-motion`'s `useSpring` for a smooth,
 * physics-based animation. The logic for fleeing is contained within a `useEffect`
 * hook that listens to global `mousemove` events.
 *
 * @component
 * @returns {React.ReactElement} The rendered fleeing element game area.
 */
export const FleeingElement = () => {
  const { t } = useTranslation();
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);

  // Fluid animation using framer-motion
  const x = useSpring(0, { stiffness: 100, damping: 20 });
  const y = useSpring(0, { stiffness: 100, damping: 20 });

  /**
   * `useEffect` hook to initialize the element's position.
   * It centers the element within its container once the component has mounted.
   */
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      x.set(rect.width / 2);
      y.set(rect.height / 2);
    }
  }, [x, y]);

  /**
   * `useEffect` hook to manage the core fleeing logic.
   * It adds a `mousemove` event listener to the window to track the cursor's position.
   *
   * When the mouse moves, it calculates the distance to the element. If the distance
   * is within a certain radius, it applies a force to "push" the element away from
   * the cursor, ensuring it stays within the container boundaries.
   *
   * The cleanup function removes the event listener when the component unmounts.
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Current position of the element
      const currentX = x.get();
      const currentY = y.get();

      // Computes distance between the mouse and the element
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      const distance = Math.hypot(dx, dy);

      const radius = 120;

      if (distance < radius) {
        setIsRunning(true);

        // Compute the force and move the element towards the mouse
        const angle = Math.atan2(dy, dx);
        const force = (radius - distance) / radius;
        const moveDistance = force * 500;

        let nextX = currentX - Math.cos(angle) * moveDistance;
        let nextY = currentY - Math.sin(angle) * moveDistance;

        // Make sure the element stays within the container
        const padding = 50;
        nextX = Math.max(padding, Math.min(rect.width - padding, nextX));
        nextY = Math.max(padding, Math.min(rect.height - padding, nextY));

        x.set(nextX);
        y.set(nextY);
      } else {
        setIsRunning(false);
      }
    };

    globalThis.addEventListener('mousemove', handleMouseMove);
    return () => globalThis.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <Box
      ref={containerRef}
      sx={{ width: '100%', height: '100%', position: 'relative', cursor: 'crosshair' }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          textAlign: 'right',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <Typography
          variant="caption"
          sx={{ display: 'block', fontWeight: 800, color: 'text.disabled' }}
        >
          {t('useless.fleeing-mouse.score')}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 900,
            color: 'secondary.main',
          }}
        >
          {score.toString().padStart(2, '0')}
        </Typography>
      </Box>
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const padding = 60;

            const teleportX = Math.random() * (rect.width - padding * 2) + padding;
            const teleportY = Math.random() * (rect.height - padding * 2) + padding;

            x.set(teleportX);
            y.set(teleportY);
          }
          setScore((prev) => prev + 1);
        }}
        style={{
          x,
          y,
          position: 'absolute',
          left: -30,
          top: -30,
          cursor: 'pointer',
        }}
        whileTap={{ scale: 0.8 }}
      >
        <Box
          sx={{
            fontSize: '3rem',
            userSelect: 'none',
            filter: isRunning ? 'drop-shadow(0 0 8px rgba(255,126,103,0.4))' : 'none',
            transition: 'filter 0.3s',
          }}
        >
          <MouseAvatar isRunning={isRunning} />
        </Box>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: isRunning ? 'secondary.main' : 'text.disabled',
            fontWeight: 700,
            mt: -1,
          }}
        >
          {isRunning ? t('useless.fleeing-mouse.run') : t('useless.fleeing-mouse.idle')}
        </Typography>
      </motion.div>
    </Box>
  );
};
