import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  type SxProps,
  type Theme,
} from '@mui/material';
import React from 'react';

interface NestCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  accentColor?: string;
  sx?: SxProps<Theme>;
}

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
