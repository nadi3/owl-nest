import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import { Mail, ExternalLink } from 'lucide-react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

/**
 * A functional component that renders the footer for the Owl Nest application.
 *
 * The footer is organized into three main columns:
 * 1. **Identity**: Displays the application title, a brief description, and social media links (GitHub, LinkedIn, Mail).
 * 2. **Navigation**: Provides quick links to the main sections of the site (Home, Lab, Tools, Portfolio).
 * 3. **Tech Stack & Credits**: Briefly mentions the technologies used and links to the credits page for more details.
 *
 * It also includes a bottom bar with the copyright notice and a link to the project's GitHub repository.
 * The component uses `react-i18next` for internationalization.
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
                <GitHubIcon sx={{ fontSize: 20 }} />
              </Link>
              <Link href="#" color="inherit">
                <LinkedInIcon sx={{ fontSize: 20 }} />
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
            {t('common.git')} <ExternalLink size={12} />
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
