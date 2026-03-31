import { motion } from 'framer-motion';

/**
 * @file MouseAvatar.tsx
 * @description A "useless" but animated SVG component representing a small mouse or rodent.
 */

/**
 * Props for the MouseAvatar component.
 * @interface MouseAvatarProps
 */
interface MouseAvatarProps {
  /**
   * A boolean flag that determines whether the mouse should be in its "running" state.
   * When `true`, the component will display running legs and a wiggling tail animation.
   * @type {boolean}
   */
  isRunning: boolean;
}

/**
 * An animated SVG component that renders a stylized mouse avatar.
 *
 * This component uses `framer-motion` to create several animations that change
 * based on the `isRunning` prop. The animations include:
 * - A slight body rotation when running.
 * - A wiggling tail animation when running.
 * - The appearance of animated "running legs" when running.
 *
 * It's a purely decorative component designed to be used in other "useless"
 * features, like the `FleeingElement`.
 *
 * @component
 * @param {MouseAvatarProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered animated SVG component.
 */
export const MouseAvatar = ({ isRunning }: MouseAvatarProps) => {
  return (
    <motion.svg
      width="60"
      height="40"
      viewBox="0 0 60 40"
      animate={{ rotate: isRunning ? [0, -5, 5, 0] : 0 }}
      transition={{ repeat: Infinity, duration: 0.2 }}
    >
      {/* Body */}
      <ellipse cx="30" cy="25" rx="20" ry="12" fill="#B0BEC5" />

      {/* Ears */}
      <circle cx="15" cy="15" r="7" fill="#B0BEC5" />
      <circle cx="15" cy="15" r="4" fill="#FFA726" opacity="0.4" />

      {/* Eye */}
      <circle cx="40" cy="22" r="2" fill="black" />

      {/* Animated tail */}
      <motion.path
        d="M 10 25 Q 0 20 5 10"
        stroke="#B0BEC5"
        strokeWidth="2"
        fill="none"
        animate={{
          d: isRunning ? ['M 10 25 Q 0 30 5 35', 'M 10 25 Q 0 20 5 10'] : 'M 10 25 Q 0 20 5 10',
        }}
        transition={{ repeat: Infinity, duration: 0.3, repeatType: 'reverse' }}
      />

      {/* Running legs */}
      {isRunning && (
        <>
          <motion.line
            x1="25"
            y1="35"
            x2="20"
            y2="38"
            stroke="#90A4AE"
            strokeWidth="2"
            animate={{ y2: [38, 35, 38] }}
            transition={{ repeat: Infinity, duration: 0.1 }}
          />
          <motion.line
            x1="35"
            y1="35"
            x2="40"
            y2="38"
            stroke="#90A4AE"
            strokeWidth="2"
            animate={{ y2: [35, 38, 35] }}
            transition={{ repeat: Infinity, duration: 0.1 }}
          />
        </>
      )}
    </motion.svg>
  );
};
