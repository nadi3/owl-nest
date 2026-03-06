// src/components/useless/SpeechBubble.tsx
import React from 'react';
import { Box, styled, Typography } from '@mui/material';

const BubbleContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '80%',
  left: '60%',
  backgroundColor: theme.palette.common.white,
  border: '2px solid #000',
  borderRadius: '16px',
  padding: theme.spacing(1.5, 2),
  minWidth: '140px',
  maxWidth: '220px',
  zIndex: 10,
  boxShadow: '4px 4px 0px rgba(0,0,0,0.1)',
  pointerEvents: 'none',

  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-12px',
    left: '15px',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '12px 12px 0 0',
    borderColor: '#000 transparent transparent transparent',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '17px',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '10px 10px 0 0',
    borderColor: '#fff transparent transparent transparent',
    zIndex: 1,
  },
}));

export const SpeechBubble: React.FC<{ text: string }> = ({ text }) => (
  <BubbleContainer>
    <Typography
      variant="caption"
      sx={{
        fontWeight: 800,
        color: 'text.primary',
        display: 'block',
        lineHeight: 1.2,
        fontFamily: '"Rubik", sans-serif',
      }}
    >
      {text}
    </Typography>
  </BubbleContainer>
);
