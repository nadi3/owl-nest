import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

/**
 * Enhanced Footer for Owl Nest.
 * Organized in three columns: Identity, Navigation, and Tech Stack.
 */
const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        py: 6,
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1: Identity */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              {t('title')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t('home.hero.subtitle')}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link href="https://github.com/nadi3" color="inherit" target="_blank">
                <Github size={20} />
              </Link>
              <Link href="#" color="inherit">
                <Linkedin size={20} />
              </Link>
              <Link href="#" color="inherit">
                <Mail size={20} />
              </Link>
            </Stack>
          </Grid>

          {/* Column 2: Navigation Links */}
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              {t('nav.menu')}
            </Typography>
            <Stack spacing={1}>
              {['home', 'lab', 'tools', 'portfolio'].map((item) => (
                <Link
                  key={item}
                  href={`/${item === 'home' ? '' : item}`}
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  {t(`nav.${item}`)}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Column 3: Tech Stack & Credits */}
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              {t('credits.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t('credits.desc')}
            </Typography>
            <Link
              href="/credits"
              variant="caption"
              display="flex"
              alignItems="center"
              sx={{ gap: 0.5, color: 'primary.main', fontWeight: 600 }}
            >
              {t('credits.see')}
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            &copy; {new Date().getFullYear()} Owl Nest.
          </Typography>
          <Link
            href="https://github.com/nadi3/owl-nest"
            variant="caption"
            display="flex"
            alignItems="center"
            sx={{ gap: 0.5, color: 'primary.main', fontWeight: 600 }}
          >
            {t('credits.site')} <ExternalLink size={12} />
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
