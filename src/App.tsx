import { Container, Grid, Typography, Box, Button, Stack, Chip } from '@mui/material';
import { Navbar } from './components/Navbar';
import { AcademicCard } from './components/AcademicCard';
import { Code2, Zap, FolderCode } from 'lucide-react';

function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        {/* SECTION HERO : L'Identité */}
        <Box sx={{ mb: 10, maxWidth: '800px' }}>
          <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            Nadia's{' '}
            <Box component="span" color="primary.main">
              Owl Nest
            </Box>
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, fontWeight: 400, lineHeight: 1.6 }}
          >
            Architecte logiciel par jour, bidouilleuse de systèmes par nuit. Bienvenue dans mon
            infrastructure personnelle où se croisent code, auto-hébergement et design.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="large" startIcon={<FolderCode />}>
              Voir mes projets
            </Button>
            <Button variant="outlined" size="large">
              Me contacter
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={4}>
          {/* PILIER 1 : SERVICES AUTO-HÉBERGÉS */}
          <Grid item xs={12} md={6}>
            <AcademicCard title="Infrastructure & Cloud" severity="success">
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Services déployés sur mon infra privée, orchestrés par Traefik et Docker.
              </Typography>
              <Stack spacing={2}>
                <ServiceItem
                  name="Nextcloud"
                  url="https://cloud.ton-domaine.com"
                  status="Online"
                  desc="Stockage & Collaboration"
                />
                <ServiceItem
                  name="Vaultwarden"
                  url="https://vault.ton-domaine.com"
                  status="Online"
                  desc="Gestionnaire de secrets"
                />
              </Stack>
            </AcademicCard>
          </Grid>

          {/* PILIER 2 : LE LABO (PROJETS EN COURS) */}
          <Grid item xs={12} md={6}>
            <AcademicCard title="The Lab" severity="primary">
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Expérimentations en cours et Proof of Concepts.
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ p: 2, borderRadius: 2, border: '1px dashed #B0B8C1' }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <Zap size={18} color="#003A69" /> Project "Owl Nest"
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Construction de ce hub en React + MUI avec une approche design system stricte.
                  </Typography>
                </Box>
                <Box sx={{ p: 2, borderRadius: 2, border: '1px dashed #B0B8C1' }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <Code2 size={18} color="#003A69" /> Custom API Gateway
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Middleware en Node.js pour centraliser l'auth de mes futurs services.
                  </Typography>
                </Box>
              </Stack>
            </AcademicCard>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

// Petit composant interne pour les services
const ServiceItem = ({ name, url, status, desc }: any) => (
  <Box
    component="a"
    href={url}
    target="_blank"
    sx={{
      p: 2,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      textDecoration: 'none',
      color: 'inherit',
      bgcolor: 'background.default',
      borderRadius: 2,
      transition: '0.2s',
      '&:hover': { bgcolor: '#F0F7FF', transform: 'translateX(4px)' },
    }}
  >
    <Box>
      <Typography variant="subtitle2" fontWeight={700}>
        {name}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {desc}
      </Typography>
    </Box>
    <Chip label={status} size="small" color="success" variant="outlined" sx={{ fontWeight: 700 }} />
  </Box>
);

export default App;
