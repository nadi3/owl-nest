import React from 'react';
import { Box } from '@mui/material';

interface SufferingManProps {
  level: number; // 0 à 9
  color: string;
  size: number;
}

/**
 * Renders a small character with 10 visual variants of fear/suffering.
 * Uses SVG to animate facial expressions based on the level.
 */
export const SufferingMan: React.FC<SufferingManProps> = ({ level, color, size }) => {
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
