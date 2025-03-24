import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link as MuiLink } from '@mui/material';

import './App.css';
// Import tous les composants depuis le fichier barrel
import {
  CryptHome,
  SymmetricEncryption,
  AsymmetricEncryption,
  HashFunction,
  About
} from './components';

// Création du thème sombre
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5c6bc0',
    },
    secondary: {
      main: '#26a69a',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulation de connexion simple
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static">
            <Toolbar>
              <LockOutlinedIcon sx={{ mr: 2 }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                CryptoVault
              </Typography>
              {!isLoggedIn ? (
                <Button color="inherit" onClick={handleLogin}>Connexion</Button>
              ) : (
                <>
                  <Button color="inherit" component={RouterLink} to="/">Accueil</Button>
                  <Button color="inherit" component={RouterLink} to="/symmetric">Chiffrement Symétrique</Button>
                  <Button color="inherit" component={RouterLink} to="/asymmetric">Chiffrement Asymétrique</Button>
                  <Button color="inherit" component={RouterLink} to="/hash">Hachage</Button>
                  <Button color="inherit" component={RouterLink} to="/about">À propos</Button>
                </>
              )}
            </Toolbar>
          </AppBar>

          <Container component="main" sx={{ mt: 4, mb: 4, flex: '1 0 auto' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              {!isLoggedIn ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <LockIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
                  <Typography variant="h4" gutterBottom>
                    Bienvenue sur CryptoVault
                  </Typography>
                  
                  <Typography variant="body1" paragraph>
                    Votre solution sécurisée pour la cryptographie et la protection de vos données
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    onClick={handleLogin}
                    startIcon={<SecurityIcon />}
                  >
                    Commencer
                  </Button>
                </Box>
              ) : (
                <Routes>
                  <Route path="/" element={<CryptHome />} />
                  <Route path="/symmetric" element={<SymmetricEncryption />} />
                  <Route path="/asymmetric" element={<AsymmetricEncryption />} />
                  <Route path="/hash" element={<HashFunction />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              )}
            </Paper>
          </Container>

          <Box component="footer" sx={{ py: 3, mt: 'auto', bgcolor: 'background.paper' }}>
            <Container maxWidth="sm">
              <Typography variant="body1" color="primary" align="center" fontWeight="bold" gutterBottom>
                Made by <MuiLink href="https://github.com/OzaIsBeautiful" target="_blank" rel="noopener" color="primary">Oza</MuiLink>
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                © {new Date().getFullYear()} CryptoVault - Application sécurisée de cryptographie
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                <MuiLink 
                  href="https://github.com/OzaIsBeautiful/CryptoVault.git" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  sx={{ display: 'inline-flex', alignItems: 'center', mx: 1 }}
                >
                  <GitHubIcon fontSize="small" sx={{ mr: 0.5 }} /> Code source
                </MuiLink>
              </Box>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
