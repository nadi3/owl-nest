import React from 'react';
import Box from '@mui/material/Box';

/**
 * @file SufferingMan.tsx
 * @description A "useless" component that renders an SVG face which becomes
 * increasingly distressed based on a "level" prop.
 */

/**
 * Props for the SufferingMan component.
 * @interface SufferingManProps
 */
interface SufferingManProps {
  /**
   * The level of "suffering" to display, from 0 (neutral) to 9 (maximum distress).
   * This value controls the facial expression.
   * @type {number}
   */
  level: number;
  /**
   * The background color of the face.
   * @type {string}
   */
  color: string;
  /**
   * The size (width and height) of the component in pixels.
   * @type {number}
   */
  size: number;
}

/**
 * Renders a simple, stylized SVG face that displays increasing levels of distress.
 *
 * This component visualizes a "suffering" level from 0 to 9 by dynamically
 * changing SVG attributes. As the `level` prop increases:
 * - The eyes widen.
 * - The pupils shrink.
 * - The eyebrows angle downwards in an expression of anger or fear.
 * - The mouth transitions from a neutral line to a wide-open scream.
 *
 * It's a purely presentational component used to give character to other "useless"
 * features, like the `SufferingButton`.
 *
 * @component
 * @param {SufferingManProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered SVG face component.
 */
export const SufferingMan: React.FC<SufferingManProps> = ({
  level,
  color,
  size,
}: SufferingManProps): React.ReactElement => {
  const eyeSize = 2 + level * 0.5;
  const mouthY = 15 + level * 0.5;
  const browRotation = level * 5;

  return (
    <Box sx={{ width: size, height: size, transition: 'all 0.2s' }}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill={color} stroke="black" strokeWidth="1" />

        <circle cx="13" cy="15" r={eyeSize} fill="white" stroke="black" />
        <circle cx="27" cy="15" r={eyeSize} fill="white" stroke="black" />
        <circle cx="13" cy="15" r={level > 5 ? 1 : 2} fill="black" />
        <circle cx="27" cy="15" r={level > 5 ? 1 : 2} fill="black" />

        <path
          d="M10 10 L16 12"
          stroke="black"
          strokeWidth="1.5"
          style={{ transform: `rotate(${-browRotation}deg)`, transformOrigin: '13px 11px' }}
        />
        <path
          d="M24 12 L30 10"
          stroke="black"
          strokeWidth="1.5"
          style={{ transform: `rotate(${browRotation}deg)`, transformOrigin: '27px 11px' }}
        />

        {level === 0 ? (
          <path d="M14 25 Q20 28 26 25" stroke="black" strokeWidth="1.5" fill="none" />
        ) : (
          <ellipse cx="20" cy={mouthY + 10} rx={2 + level} ry={1 + level * 0.8} fill="black" />
        )}
      </svg>
    </Box>
  );
};
