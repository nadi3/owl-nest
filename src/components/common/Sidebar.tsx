import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Briefcase, ChevronLeft, Ghost, Gift, Home, /*Lock,*/ Menu } from 'lucide-react';
import LangSwitcher from '@/components/common/LangSwitcher.tsx';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DRAWER_WIDTH = 240;

const Sidebar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'home.title', icon: <Home />, path: '/home' },
    { text: 'useless.title', icon: <Ghost />, path: '/useless' },
    { text: 'tools.title', icon: <Gift />, path: '/tools' },
    { text: 'portfolio.title', icon: <Briefcase />, path: '/portfolio' },
    /*{ text: 'private.title', icon: <Lock />, path: '/private' },*/
  ];

  const toggleDrawer = () => setOpen(!open);
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? DRAWER_WIDTH : 64,
        transition: (theme) =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_WIDTH : 64,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          overflowX: 'hidden',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          justifyContent: open ? 'space-between' : 'center',
        }}
      >
        {open && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="/logo-owl-white.png" alt="Owl Nest" style={{ width: 50, height: 50 }} />
            <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 700 }}>
              OWL NEST
            </Typography>
          </Box>
        )}
        <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
          {open ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </Box>

      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />

      {/* Liste des menus */}
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                minHeight: 48,
                height: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(46, 255, 255, 0.1)',
                  borderRight: '4px solid',
                  borderColor: 'secondary.main',
                },
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={t(item.text)} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          mt: 'auto',
          pt: 2,
          pb: 2,
          px: open ? 2.5 : 0,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <LangSwitcher isOpen={open} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
