import React from 'react';
import { Box, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Layers, Code2, Server, HardDrive, Cpu, Container } from 'lucide-react';
import { useTheme } from '@mui/material/styles';

const INVENTORY = [
    {
        category: 'Frontend Engineering',
        icon: Code2,
        items: [
            { name: 'React 19', detail: 'Library UI' },
            { name: 'TypeScript', detail: 'Strict Mode' },
            { name: 'Vite', detail: 'Build Tool' },
            { name: 'MUI v6', detail: 'Design System' },
            { name: 'Zustand', detail: 'State Management' },
        ]
    },
    {
        category: 'Backend & Services',
        icon: Server,
        items: [
            { name: 'Node.js / Express', detail: 'API Runtime' },
            { name: 'Go (Golang)', detail: 'Microservices' },
            { name: 'PostgreSQL', detail: 'Relational Data' },
            { name: 'Redis', detail: 'Caching' },
        ]
    },
    {
        category: 'DevOps & Infra',
        icon: Container,
        items: [
            { name: 'Docker Compose', detail: 'Orchestration' },
            { name: 'Traefik', detail: 'Edge Router' },
            { name: 'GitHub Actions', detail: 'CI/CD Pipelines' },
            { name: 'Portainer', detail: 'Container Management' },
        ]
    },
    {
        category: 'Hardware Lab',
        icon: HardDrive,
        items: [
            { name: 'Raspberry Pi 5', detail: '8GB RAM - Main Node' },
            { name: 'NVMe SSD', detail: '1TB Storage' },
            { name: 'Unifi Network', detail: 'Routing' },
        ]
    },
];

export const StackPage: React.FC = () => {
    const theme = useTheme();

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
            <Typography variant="h4" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Layers size={32} /> Technology Stack
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
                Inventaire des technologies et matériels utilisés dans le Nid.
            </Typography>

            <Grid container spacing={4}>
                {INVENTORY.map((rack) => (
                    <Grid item xs={12} md={6} key={rack.category}>
                        <Paper sx={{ overflow: 'hidden', height: '100%' }}>
                            {/* Header du Rack */}
                            <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', gap: 2 }}>
                                <rack.icon size={20} color={theme.palette.secondary.main} />
                                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700, letterSpacing: 0.5 }}>
                                    {rack.category.toUpperCase()}
                                </Typography>
                            </Box>

                            {/* Liste des items */}
                            <List>
                                {rack.items.map((item, index) => (
                                    <React.Fragment key={item.name}>
                                        <ListItem>
                                            <ListItemIcon sx={{ minWidth: 36 }}>
                                                <Cpu size={16} opacity={0.5} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.name}
                                                secondary={item.detail}
                                                primaryTypographyProps={{ fontWeight: 500 }}
                                                secondaryTypographyProps={{ fontFamily: 'Fira Code', fontSize: '0.75rem' }}
                                            />
                                        </ListItem>
                                        {index < rack.items.length - 1 && <Divider component="li" variant="inset" />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};