import React, { useState } from 'react';
import { Box, keyframes } from '@mui/material';
import { SufferingMan } from './SufferingMan';
import { SpeechBubble } from './SpeechBubble';
import { getSufferingColor, getSufferingText } from '@/utils/useless/sufferingLogic.ts';

const shake = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(-3px, 3px); }
  50% { transform: translate(3px, -3px); }
  75% { transform: translate(-3px, -3px); }
  100% { transform: translate(0, 0); }
`;

export const SufferingButton = () => {
  const [clicks, setClicks] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [exploded, setExploded] = useState(false);

  const level = Math.floor(clicks / 10);
  const isShaking = clicks > 60;
  const size = Math.max(50, 180 - clicks);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (clicks >= 99) {
      setExploded(true);
      return;
    }
    setClicks((c) => c + 1);
    setPos({
      x: 10 + Math.random() * 70,
      y: 20 + Math.random() * 60,
    });
  };

  if (exploded) {
    return (
      <Box
        sx={{
          position: 'absolute',
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          fontSize: '5rem',
          transform: 'translate(-50%, -50%)',
        }}
      >
        💥
      </Box>
    );
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: 'absolute',
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        zIndex: 100,
      }}
    >
      <SpeechBubble text={getSufferingText(clicks)} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: isShaking ? `${shake} ${0.2 - clicks / 600}s infinite` : 'none',
        }}
      >
        <SufferingMan level={level} color={getSufferingColor(clicks)} size={size} />
      </Box>
    </Box>
  );
};
