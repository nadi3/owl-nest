import { useEffect, useRef } from 'react';
import { useImpatienceStore } from '@/store/useless/useImpatienceStore.ts';

const CLICK_WINDOW_MS = 2000;
const MAX_CLICKS = 10;
const MOVEMENT_THRESHOLD = 5000;

export const useImpatienceDetector = () => {
  const setImpatience = useImpatienceStore((state) => state.setImpatienceDetected);
  const clickTimestamps = useRef<number[]>([]);
  const lastPosition = useRef({ x: 0, y: 0 });
  const totalDistance = useRef(0);
  const movementTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleGlobalClick = () => {
      const now = Date.now();
      clickTimestamps.current.push(now);
      clickTimestamps.current = clickTimestamps.current.filter((t) => now - t < CLICK_WINDOW_MS);

      if (clickTimestamps.current.length > MAX_CLICKS) {
        setImpatience(true);
        clickTimestamps.current = [];
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dist = Math.sqrt(
        Math.pow(e.clientX - lastPosition.current.x, 2) +
          Math.pow(e.clientY - lastPosition.current.y, 2)
      );
      totalDistance.current += dist;
      lastPosition.current = { x: e.clientX, y: e.clientY };

      if (!movementTimer.current) {
        movementTimer.current = window.setTimeout(() => {
          if (totalDistance.current > MOVEMENT_THRESHOLD) {
            setImpatience(true);
          }
          totalDistance.current = 0;
          movementTimer.current = null;
        }, 1000);
      }
    };

    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setImpatience]);
};
