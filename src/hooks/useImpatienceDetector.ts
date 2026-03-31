/**
 * @file useImpatienceDetector.ts
 * @description A "useless" hook that monitors user behavior to detect signs of "impatience,"
 * such as rapid clicking or frantic mouse movements.
 */

import { useEffect, useRef } from 'react';
import { useImpatienceStore } from '@/store/useless/useImpatienceStore.ts';

/**
 * The time window in milliseconds for detecting rapid clicks.
 * @constant {number}
 */
const CLICK_WINDOW_MS = 2000;
/**
 * The number of clicks within the time window that triggers the impatience state.
 * @constant {number}
 */
const MAX_CLICKS = 10;
/**
 * The total mouse movement distance (in pixels) within a 1-second window that
 * triggers the impatience state.
 * @constant {number}
 */
const MOVEMENT_THRESHOLD = 5000;

/**
 * A custom hook that monitors global user interactions to detect "impatient" behavior.
 *
 * This hook sets up global event listeners for mouse clicks and movements to identify
 * two types of impatience:
 * 1.  **Rapid Clicking**: More than `MAX_CLICKS` clicks within the `CLICK_WINDOW_MS`.
 * 2.  **Frantic Movement**: Mouse movement exceeding `MOVEMENT_THRESHOLD` pixels in a short time.
 *
 * When impatience is detected, it updates a global state using `useImpatienceStore`.
 * This hook is intended for creating humorous, non-essential features.
 *
 * It should be mounted once in a top-level component (e.g., `App.tsx`) to ensure it
 * monitors events across the entire application.
 */
export const useImpatienceDetector = () => {
  const setImpatience = useImpatienceStore((state) => state.setImpatienceDetected);
  const clickTimestamps = useRef<number[]>([]);
  const lastPosition = useRef({ x: 0, y: 0 });
  const totalDistance = useRef(0);
  const movementTimer = useRef<number | null>(null);

  useEffect(() => {
    /**
     * Handles global click events to detect rapid clicking.
     * It maintains a rolling window of timestamps and triggers impatience if the
     * click count exceeds `MAX_CLICKS`.
     */
    const handleGlobalClick = () => {
      const now = Date.now();
      clickTimestamps.current.push(now);
      clickTimestamps.current = clickTimestamps.current.filter((t) => now - t < CLICK_WINDOW_MS);

      if (clickTimestamps.current.length > MAX_CLICKS) {
        setImpatience(true);
        clickTimestamps.current = [];
      }
    };

    /**
     * Handles mouse movement to detect frantic motion.
     * It accumulates the total distance the mouse has traveled and, using a timer,
     * checks if this distance exceeds `MOVEMENT_THRESHOLD` in a short period.
     * @param {MouseEvent} e - The mouse move event.
     */
    const handleMouseMove = (e: MouseEvent) => {
      const dist = Math.sqrt(
        Math.pow(e.clientX - lastPosition.current.x, 2) +
          Math.pow(e.clientY - lastPosition.current.y, 2)
      );
      totalDistance.current += dist;
      lastPosition.current = { x: e.clientX, y: e.clientY };

      if (!movementTimer.current) {
        movementTimer.current = globalThis.setTimeout(() => {
          if (totalDistance.current > MOVEMENT_THRESHOLD) {
            setImpatience(true);
          }
          totalDistance.current = 0;
          movementTimer.current = null;
        }, 1000);
      }
    };

    globalThis.addEventListener('click', handleGlobalClick);
    globalThis.addEventListener('mousemove', handleMouseMove);

    return () => {
      globalThis.removeEventListener('click', handleGlobalClick);
      globalThis.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setImpatience]);
};
