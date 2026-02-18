import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, Grid, Chip, Stack, MenuItem, Select } from '@mui/material';
import { Search, Filter, FolderGit2, Calendar, GitCommit } from 'lucide-react';
import { AcademicCard } from '../components/AcademicCard';

// --- MOCK DATA ÉTOFFÉE ---
const ALL_PROJECTS = [
    {
        id: 'OWL-001',
        title: 'Owl Nest Infrastructure',
        desc: 'Orchestration complète d\'un homelab auto-hébergé. Reverse-proxy Traefik, authentification centralisée et monitoring Prometheus/Grafana.',
        tags: ['DevOps', 'Docker', 'React'],
        status: 'Live',
        year: '2026'
    },
    {
        id: 'ASM-CORE',
        title: 'MIPS32 Simulator',
        desc: 'Simulateur pédagogique de processeur MIPS écrit en Rust (WASM). Permet l\'exécution pas-à-pas d\'instructions assembleur dans le navigateur.',
        tags: ['Rust', 'Wasm', 'Education'],
        status: 'Archived',
        year: '2025'
    },
    {
        id: 'NET-WATCH',
        title: 'Network Watchdog',
        desc: 'Service background en Go qui surveille la latence réseau et notifie via Telegram en cas de dégradation.',
        tags: ['Go', 'Network', 'Bot'],
        status: 'Beta',
        year: '2026'
    },
    {
        id: 'LMS-UI',
        title: 'Academic LMS Interface',
        desc: 'Refonte de l\'interface utilisateur d\'une plateforme de cours. Focus sur l\'accessibilité et le "Swiss Design".',
        tags: ['UX/UI', 'React', 'Design System'],
        status: 'Concept',
        year: '2024'
    },
];

export const ProjectsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    // Logique de filtrage
    const filteredProjects = ALL_PROJECTS.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = filterStatus === 'All' || project.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>

            {/* HEADER & CONTROLS */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h4" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <FolderGit2 size={32} /> Project Archive
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Base de connaissance des développements et expérimentations.
                </Typography>

                {/* SEARCH BAR STYLE TERMINAL */}
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        placeholder="Rechercher un module (ex: React, Docker...)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={20} />
                                </InputAdornment>
                            ),
                            sx: { bgcolor: 'background.paper', fontFamily: 'Fira Code' }
                        }}
                    />
                    <Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Status Filter' }}
                        sx={{ minWidth: 200, bgcolor: 'background.paper' }}
                        IconComponent={Filter}
                    >
                        <MenuItem value="All">Tout afficher</MenuItem>
                        <MenuItem value="Live">Live / Production</MenuItem>
                        <MenuItem value="Beta">Beta / Lab</MenuItem>
                        <MenuItem value="Archived">Archived</MenuItem>
                    </Select>
                </Stack>
            </Box>

            {/* GRID DES PROJETS */}
            <Grid container spacing={3}>
                {filteredProjects.map((project) => (
                    <Grid item xs={12} md={6} key={project.id}>
                        <AcademicCard
                            accentColor={project.status === 'Live' ? 'success' : project.status === 'Archived' ? 'error' : 'secondary'}
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <Stack direction="row" justifyContent="space-between" mb={2}>
                                <Typography variant="caption" sx={{ fontFamily: 'Fira Code', opacity: 0.7 }}>
                                    ID: {project.id}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Calendar size={14} opacity={0.5}/>
                                    <Typography variant="caption">{project.year}</Typography>
                                </Stack>
                            </Stack>

                            <Typography variant="h5" sx={{ mb: 2 }}>{project.title}</Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                                {project.desc}
                            </Typography>

                            <Stack direction="row" spacing={1} alignItems="center">
                                <GitCommit size={16} style={{ opacity: 0.5 }} />
                                {project.tags.map(tag => (
                                    <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                                ))}
                            </Stack>
                        </AcademicCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};