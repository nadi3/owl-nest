import { Box, Typography, Divider, Stack } from '@mui/material';

interface PageHeaderProps {
  title: string;
  zone: string;
  description?: string;
  center?: boolean;
}

export const PageHeader = ({ title, zone, description, center }: PageHeaderProps) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Stack
        direction="row"
        alignItems="baseline"
        spacing={2}
        justifyContent={center ? 'center' : 'flex-start'}
      >
        <Typography sx={{ color: 'secondary.main', fontWeight: 700, fontSize: '1.2rem' }}>
          {zone}
        </Typography>
        <Typography variant="h2" component="h1">
          {title}
        </Typography>
      </Stack>
      <Divider
        sx={{
          my: 2,
          width: '60px',
          borderBottomWidth: 3,
          borderColor: 'primary.main',
          mx: center ? 'auto' : 0,
        }}
      />
      {description && (
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontWeight: 400, maxWidth: '800px', mx: center ? 'auto' : 0 }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};
