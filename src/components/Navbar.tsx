import { AppBar, Toolbar, Box, Typography, Button, Container } from '@mui/material';
import { LayoutDashboard, Library } from 'lucide-react';

export const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ borderBottom: '1px solid #E0E4E8', bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src="/owl-nest.png" alt="Owl Nest Logo" style={{ height: 60 }} />
            <Typography variant="h5" color="primary" sx={{ letterSpacing: -0.5 }}>
              Owl Nest
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button startIcon={<LayoutDashboard size={18} />} color="inherit">
              Dashboard
            </Button>
            <Button startIcon={<Library size={18} />} color="inherit">
              Bibliothèque
            </Button>
            <Button variant="contained" disableElevation>
              Connexion
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
