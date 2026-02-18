import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Stack, Chip } from '@mui/material';
import { LayoutDashboard, Server, Container, Layers, Github, Terminal, Activity } from 'lucide-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const DRAWER_WIDTH = 280;

// Menu pour un profil Tech / SysAdmin
const MENU_ITEMS = [
    { text: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { text: 'Mes Projets', icon: Layers, path: '/projects' }, // Le Showcase
    { text: 'Services Live', icon: Server, path: '/services' }, // Tes apps self-hosted
    { text: 'Stack & Lab', icon: Container, path: '/stack' }, // Ta config technique
];

export const MainLayout: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>

            {/* --- SIDEBAR : LE "COCKPIT" --- */}
            <Drawer
                variant="permanent"
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRight: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        py: 4,
                    },
                }}
            >
                {/* HAUT : IDENTITÉ */}
                <Box>
                    <Box sx={{ px: 3, mb: 6 }}>
                        {/* Logo textuel fort */}
                        <Typography variant="h5" sx={{ fontFamily: 'Rubik', fontWeight: 700, letterSpacing: 1 }}>
                            OWL NEST
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1, opacity: 0.8 }}>
                            <Terminal size={14} color={theme.palette.secondary.main} />
                            <Typography variant="caption" sx={{ color: 'secondary.main', letterSpacing: 1.5, fontFamily: 'Fira Code, monospace' }}>
                                ROOT@NADIA
                            </Typography>
                        </Stack>
                    </Box>

                    {/* NAVIGATION */}
                    <List sx={{ px: 2 }}>
                        {MENU_ITEMS.map((item) => {
                            const isActive = location.pathname === item.path;
                            const Icon = item.icon;
                            return (
                                <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                    <ListItemButton
                                        onClick={() => navigate(item.path)}
                                        sx={{
                                            borderRadius: 2,
                                            transition: 'all 0.2s ease-in-out',
                                            bgcolor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                                            borderLeft: isActive ? `4px solid ${theme.palette.secondary.main}` : '4px solid transparent',
                                            '&:hover': {
                                                bgcolor: 'rgba(255,255,255,0.05)',
                                                transform: 'translateX(4px)'
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'secondary.main' : 'rgba(255,255,255,0.7)' }}>
                                            <Icon size={20} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.text}
                                            primaryTypographyProps={{
                                                fontSize: '0.95rem',
                                                fontWeight: isActive ? 500 : 400,
                                                fontFamily: isActive ? 'Rubik' : 'Roboto',
                                                color: isActive ? 'white' : 'rgba(255,255,255,0.9)'
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>

                {/* BAS : STATUT SYSTÈME & LIENS */}
                <Box sx={{ px: 3, pb: 2 }}>
                    <Divider sx={{ bgcolor: 'rgba(255,255,255,0.15)', mb: 3 }} />

                    {/* Indicateur de statut "Self-Host" */}
                    <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
                            <Activity size={16} color={theme.palette.success.main} />
                            <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700, letterSpacing: 1 }}>
                                SYSTEM OPTIMAL
                            </Typography>
                        </Stack>
                        <Typography variant="caption" display="block" sx={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Fira Code' }}>
                            Uptime: 99.9%
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Fira Code' }}>
                            Traefik: Active
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={1}>
                        <Chip
                            icon={<Github size={14} />}
                            label="GitHub"
                            component="a"
                            href="https://github.com" // À remplacer par ton lien
                            target="_blank"
                            clickable
                            size="small"
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                                '& .MuiChip-icon': { color: 'white' }
                            }}
                        />
                    </Stack>
                </Box>
            </Drawer>

            {/* --- MAIN CONTENT --- */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 3, md: 5 },
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};