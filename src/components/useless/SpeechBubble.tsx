import React from 'react';
import { Box, styled, Typography } from '@mui/material';

/**
 * @file SpeechBubble.tsx
 * @description A "useless" component that renders a comic-book style speech bubble.
 */

/**
 * A styled `Box` component that creates the visual appearance of a speech bubble.
 *
 * This component uses MUI's `styled` utility to create a container with a white
 * background, black border, and a "tail" pointing downwards, mimicking a classic
 * comic book speech bubble. The tail is created using CSS pseudo-elements (`::after`
 * for the border and `::before` for the fill).
 *
 * @constant
 */
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

/**
 * A component that displays a given text inside a stylized speech bubble.
 *
 * This is a simple, presentational component that takes a `text` string and
 * renders it within the `BubbleContainer`. It's designed to be positioned
 * absolutely relative to a parent element to make it appear as if a character
 * or object is speaking.
 *
 * @component
 * @param {{text: string}} props - The props for the component.
 * @param {string} props.text - The text to be displayed inside the bubble.
 * @returns {React.ReactElement} The rendered speech bubble component.
 */
export const SpeechBubble: React.FC<{ text: string }> = ({
  text,
}: {
  text: string;
}): React.ReactElement => (
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
