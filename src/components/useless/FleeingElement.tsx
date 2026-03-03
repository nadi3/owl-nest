import { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useSpring } from 'framer-motion';
import { MouseAvatar } from '@/components/useless/MouseAvatar.tsx';
import { useTranslation } from 'react-i18next';

interface FleeingElementProps {
  onCatch: () => void;
}

export const FleeingElement = ({ onCatch }: FleeingElementProps) => {
  const { t } = useTranslation();
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fluid animation using framer-motion
  const x = useSpring(0, { stiffness: 100, damping: 20 });
  const y = useSpring(0, { stiffness: 100, damping: 20 });

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
    <Box ref={containerRef} sx={{ width: '100%', height: '100%', position: 'relative' }}>
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
          onCatch();
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
