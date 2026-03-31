import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme, type SxProps, type Theme } from '@mui/material/styles';
import React from 'react';

/**
 * Props for the NestCard component.
 */
interface NestCardProps {
  /**
   * The main title of the card.
   */
  title: string;
  /**
   * An optional subtitle displayed above the main title.
   */
  subtitle?: string;
  /**
   * The content to be displayed within the card.
   */
  children: React.ReactNode;
  /**
   * The color of the left border accent.
   * @default theme.palette.secondary.main
   */
  accentColor?: string;
  /**
   * Custom styles to be applied to the card.
   */
  sx?: SxProps<Theme>;
}

/**
 * A custom Card component with a distinctive left accent border.
 * It is designed to display a title, an optional subtitle, and content.
 * The card has a hover effect that slightly moves it and adds a shadow.
 */
export const NestCard = ({ title, subtitle, children, accentColor, sx }: NestCardProps) => {
  const theme = useTheme();

  const borderColor = accentColor || theme.palette.secondary.main;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        border: `1px solid ${theme.palette.divider}`,
        borderLeft: `6px solid ${borderColor}`,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateX(4px)',
          boxShadow: `0 4px 20px rgba(0,0,0,0.05)`,
        },
        ...sx,
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Box sx={{ mb: 2 }}>
          {subtitle && (
            <Typography
              variant="overline"
              sx={{
                color: 'text.disabled',
                fontWeight: 700,
                display: 'block',
                mb: 0.5,
                letterSpacing: 2,
              }}
            >
              {subtitle}
            </Typography>
          )}
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 800, color: 'primary.main', lineHeight: 1.2 }}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ color: 'text.secondary' }}>{children}</Box>
      </CardContent>
    </Card>
  );
};
