import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { Login } from './pages/Login';
import { Useless } from './pages/Useless';
import { Services } from './pages/Services';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 4, minHeight: '100vh', bgcolor: 'background.default' }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/useless" element={<Useless />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
