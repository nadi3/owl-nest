import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { ProjectsPage } from './pages/ProjectsPage'; // Ajout
import { StackPage } from './pages/StackPage';       // Ajout
import { Box, Typography } from '@mui/material';     // Pour le placeholder Services

// Placeholder simple pour Services (on le fera au prochain tour si tu veux)
const Services = () => (
    <Box sx={{ textAlign: 'center', mt: 10, opacity: 0.5 }}>
        <Typography variant="h4">System Monitor</Typography>
        <Typography>Module en cours de calibration...</Typography>
    </Box>
);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/stack" element={<StackPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;