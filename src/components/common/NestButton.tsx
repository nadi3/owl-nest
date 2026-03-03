import { Button, type ButtonProps, styled, alpha } from '@mui/material';

type NestButtonProps = Omit<ButtonProps, 'color'> & {
  nestVariant?: 'contained' | 'ghost';
  nestColor?: 'primary' | 'secondary' | 'success' | 'error';
};

export const NestButton = styled(Button, {
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
