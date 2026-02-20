import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Ghost, Globe, Briefcase, Lock, LogOut, Home as HomeIcon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const DRAWER_WIDTH = 260;

export const Sidebar = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const location = useLocation();

  const menuItems = [
    { label: 'Accueil', path: '/', icon: <HomeIcon size={20} /> },
    { label: 'Lab (Useless)', path: '/useless', icon: <Ghost size={20} /> },
    { label: 'Services Publics', path: '/services', icon: <Globe size={20} /> },
    { label: 'Portfolio', path: '/portfolio', icon: <Briefcase size={20} /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          borderRight: '2px solid',
          borderColor: isLoggedIn ? 'danger.main' : 'success.main',
          transition: 'border-color 0.3s ease',
        },
      }}
    >
      <Toolbar sx={{ my: 2, px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src="/owl-nest.png" alt="Logo" style={{ height: 40 }} />
          <Typography variant="h6" color="primary" sx={{ fontWeight: 700, lineHeight: 1 }}>
            Owl Nest
          </Typography>
        </Box>
      </Toolbar>

      <Box sx={{ overflow: 'auto', px: 2 }}>
        <List spacing={1}>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: '8px',
                  '&.Mui-selected': {
                    bgcolor: 'rgba(0, 58, 105, 0.08)',
                    color: 'primary.main',
                    '& .MuiListItemIcon-root': { color: 'primary.main' },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        {isLoggedIn ? (
          <ListItemButton onClick={logout} sx={{ borderRadius: '8px', color: 'error.main' }}>
            <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
              <LogOut size={20} />
            </ListItemIcon>
            <ListItemText primary="Déconnexion" />
          </ListItemButton>
        ) : (
          <ListItemButton
            component={Link}
            to="/login"
            sx={{
              borderRadius: '8px',
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'white' }}>
              <Lock size={20} />
            </ListItemIcon>
            <ListItemText primary="Zone Privée" />
          </ListItemButton>
        )}
      </Box>
    </Drawer>
  );
};
