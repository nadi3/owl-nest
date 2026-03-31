import { Box, Typography, Divider, Stack } from '@mui/material';

/**
 * Props for the PageHeader component.
 */
interface PageHeaderProps {
  /**
   * The main title of the page.
   */
  title: string;
  /**
   * The zone or category of the page, displayed next to the title.
   */
  zone: string;
  /**
   * An optional description or subtitle for the page.
   */
  description?: string;
  /**
   * If true, the header content will be centered.
   * @default false
   */
  center?: boolean;
}

/**
 * A reusable component for displaying a standardized page header.
 * It includes a zone, a main title, a short divider, and an optional description.
 * The alignment of the header can be controlled via the `center` prop.
 */
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
