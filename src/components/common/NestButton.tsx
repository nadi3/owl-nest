import React from 'react';
import Button, { type ButtonProps } from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';

/**
 * Props for the NestButton component.
 * Extends MUI ButtonProps but omits the 'color' prop to replace it with a custom 'nestColor'.
 */
type NestButtonProps = Omit<ButtonProps, 'color'> & {
  /**
   * The visual style of the button.
   * 'contained': A button with a solid background color.
   * 'ghost': A button with a light background color and colored text.
   * @default 'contained'
   */
  nestVariant?: 'contained' | 'ghost';
  /**
   * The color palette to use for the button.
   * @default 'primary'
   */
  nestColor?: 'primary' | 'secondary' | 'success' | 'error';
  /**
   * If provided, the button will be rendered as a `react-router-dom` Link.
   */
  to?: string;
};

/**
 * A styled MUI Button with custom variants ('contained', 'ghost') and colors.
 * This component applies specific styles based on the `nestVariant` and `nestColor` props.
 */
const StyledNestButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'nestVariant' && prop !== 'nestColor',
})<NestButtonProps>(({ theme, nestColor = 'primary', nestVariant = 'contained' }) => {
  const paletteColor = theme.palette[nestColor] || theme.palette.primary;

  return {
    borderRadius: 50,
    padding: '8px 24px',
    fontWeight: 600,
    boxShadow: 'none',
    border: '1px solid transparent',
    transition: theme.transitions.create(
      ['background-color', 'box-shadow', 'border-color', 'color'],
      {
        duration: theme.transitions.duration.short,
      }
    ),

    ...(nestVariant === 'contained' && {
      backgroundColor: paletteColor.main,
      color: paletteColor.contrastText,
      '&:hover': {
        backgroundColor: paletteColor.dark || alpha(paletteColor.main, 0.9),
        boxShadow: 'none',
      },
    }),

    ...(nestVariant === 'ghost' && {
      backgroundColor: paletteColor.light,
      color: paletteColor.main,
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: alpha(paletteColor.dark || paletteColor.main, 0.25),
        border: '1px solid transparent',
      },
    }),
  };
});

/**
 * A custom button component that wraps a styled MUI Button.
 * It supports custom variants and colors, and can be rendered as a `react-router-dom` Link
 * by providing a `to` prop.
 */
export const NestButton: React.FC<NestButtonProps> = ({ to, ...props }) => {
  return <StyledNestButton {...(to ? { component: Link, to } : {})} {...props} />;
};
