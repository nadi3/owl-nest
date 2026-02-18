import React from 'react';
import { Box, Grid, Typography, Chip, Stack, Button, Paper, Divider } from '@mui/material';
import { Activity, Server, Database, Globe, ArrowRight, Terminal, Cpu, ExternalLink, Github } from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import { AcademicCard } from '../components/AcademicCard'; // Assure-toi que ce chemin est bon

// --- MOCK DATA (À remplacer par une API plus tard) ---
const LIVE_SERVICES = [
    { name: 'Traefik Gateway', type: 'Proxy', status: 'online', uptime: '99.9%', icon: Globe },
    { name: 'Owl API', type: 'Backend', status: 'online', uptime: '99.5%', icon: Server },
    { name: 'PostgreSQL', type: 'Database', status: 'maintenance', uptime: '98.0%', icon: Database },
    { name: 'Node Exporter', type: 'Monitoring', status: 'online', uptime: '100%', icon: Activity },
];

const BLUEPRINTS = [
    {
        id: 'OWL-001',
        title: 'Owl Nest Infrastructure',
        desc: 'Orchestration complète d\'un homelab auto-hébergé. Gestion de conteneurs, reverse-proxy et CI/CD.',
        stack: ['Docker', 'Traefik', 'React', 'Go'],
        year: '2026',
        status: 'Production'
    },
    {
        id: 'ASM-CORE',
        title: 'Assembleur MIPS Simulator',
        desc: 'Simulateur pédagogique de processeur MIPS32 écrit en Rust pour les étudiants de 1ère année.',
        stack: ['Rust', 'WebAssembly', 'Svelte'],
        year: '2025',
        status: 'Archived'
    },
];

export const LandingPage: React.FC = () => {
    const theme = useTheme();

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>

            {/* --- HEADER : SYSTEM STATUS --- */}
            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h3" sx={{ mb: 1, color: 'primary.main' }}>
                        System Overview
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600 }}>
                        Bienvenue dans le Nid. Cette interface est servie directement depuis mon infrastructure personnelle.
                        Tous les systèmes sont nominaux.
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
                    <Chip
                        icon={<Activity size={16} />}
                        label="ALL SYSTEMS GO"
                        color="success"
                        variant="outlined"
                        sx={{ fontWeight: 700, letterSpacing: 1 }}
                    />
                    <Typography variant="caption" display="block" sx={{ mt: 1, fontFamily: 'Fira Code', opacity: 0.6 }}>
                        LAST PING: {new Date().toLocaleTimeString()}
                    </Typography>
                </Box>
            </Box>

            {/* --- SECTION 1 : LIVE TOPOLOGY (L'approche SysAdmin) --- */}
            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Terminal size={20} /> LIVE TOPOLOGY
            </Typography>

            <Grid container spacing={3} sx={{ mb: 8 }}>
                {LIVE_SERVICES.map((service) => (
                    <Grid item xs={12} sm={6} md={3} key={service.name}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                border: '1px solid rgba(0,0,0,0.08)',
                                bgcolor: 'background.paper',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'translateY(-4px)', borderColor: theme.palette.secondary.main }
                            }}
                        >
                            <Stack direction="row" justifyContent="space-between" mb={2}>
                                <service.icon size={24} color={theme.palette.primary.main} />
                                <Box
                                    sx={{
                                        width: 8, height: 8, borderRadius: '50%',
                                        bgcolor: service.status === 'online' ? 'success.main' : 'warning.main',
                                        boxShadow: service.status === 'online' ? `0 0 8px ${theme.palette.success.main}` : 'none'
                                    }}
                                />
                            </Stack>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{service.name}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'Fira Code' }}>{service.type}</Typography>

                            <Divider sx={{ my: 1.5, opacity: 0.5 }} />

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.6 }}>UPTIME</Typography>
                                <Typography variant="caption" sx={{ fontFamily: 'Fira Code', fontWeight: 600, color: 'success.main' }}>
                                    {service.uptime}
                                </Typography>
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* --- SECTION 2 : BLUEPRINTS (L'approche Académique) --- */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Cpu size={20} /> ENGINEERING BLUEPRINTS
                </Typography>
                <Button endIcon={<ArrowRight size={16} />} color="secondary">
                    Voir tout le portfolio
                </Button>
            </Box>

            <Grid container spacing={3}>
                {BLUEPRINTS.map((project) => (
                    <Grid item xs={12} md={6} key={project.id}>
                        <AcademicCard accentColor="primary" sx={{ height: '100%' }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="start" mb={2}>
                                <Box>
                                    <Typography variant="caption" sx={{ fontFamily: 'Fira Code', color: 'secondary.main' }}>
                                        {project.id} // {project.year}
                                    </Typography>
                                    <Typography variant="h5" sx={{ mt: 0.5 }}>{project.title}</Typography>
                                </Box>
                                <Chip label={project.status} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                            </Stack>

                            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
                                {project.desc}
                            </Typography>

                            <Box sx={{ mt: 'auto' }}>
                                <Stack direction="row" spacing={1} mb={3} flexWrap="wrap" useFlexGap>
                                    {project.stack.map(tech => (
                                        <Chip key={tech} label={tech} size="small" sx={{ bgcolor: 'background.default', border: 'none' }} />
                                    ))}
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <Button variant="outlined" size="small" startIcon={<Github size={16} />}>
                                        Source
                                    </Button>
                                    <Button variant="text" size="small" color="secondary" endIcon={<ExternalLink size={16} />}>
                                        Live Demo
                                    </Button>
                                </Stack>
                            </Box>
                        </AcademicCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};