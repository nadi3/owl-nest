import { Box, Typography, Link, Container, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box component="footer" sx={{ mt: 'auto', py: 3, backgroundColor: 'transparent' }}>
      <Divider sx={{ mb: 3, opacity: 0.6 }} />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} — {t('title')}
          </Typography>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              component={RouterLink}
              to="/credits"
              color="inherit"
              sx={{
                textDecoration: 'none',
                typography: 'body2',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {t('credits.title')}
            </Link>
            <Typography variant="body2" color="text.secondary">
              V1.0.0
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
