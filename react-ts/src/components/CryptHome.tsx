import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, CardMedia, Link } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import GitHubIcon from '@mui/icons-material/GitHub';

const CryptHome: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Sécurisez vos données avec CryptoVault
      </Typography>
      
      <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
        Made by <Link href="https://github.com/OzaIsBeautiful" target="_blank" rel="noopener">Oza</Link>
      </Typography>
      
      <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
        CryptoVault offre des outils de chiffrement puissants pour protéger vos informations sensibles.
        Utilisez nos algorithmes de pointe pour garantir la confidentialité de vos données.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <LockIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Chiffrement Symétrique
              </Typography>
              <Typography variant="body2">
                Utilisez les algorithmes AES-256, ChaCha20 pour chiffrer vos données avec une clé secrète.
                Idéal pour le stockage sécurisé et la transmission de données confidentielles.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                color="primary" 
                component={RouterLink} 
                to="/symmetric"
                fullWidth
              >
                Essayer
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <EnhancedEncryptionIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Chiffrement Asymétrique
              </Typography>
              <Typography variant="body2">
                Utilisez RSA ou ECC pour échanger des données de manière sécurisée sans partager de clé secrète au préalable.
                Parfait pour une communication sécurisée entre parties.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                color="primary" 
                component={RouterLink} 
                to="/asymmetric"
                fullWidth
              >
                Essayer
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <FingerprintIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Fonctions de Hachage
              </Typography>
              <Typography variant="body2">
                Créez des empreintes numériques uniques avec SHA-256, SHA-3 ou Blake2.
                Vérifiez l'intégrité des fichiers et sécurisez les mots de passe.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                color="primary" 
                component={RouterLink} 
                to="/hash"
                fullWidth
              >
                Essayer
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 6, bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Pourquoi choisir CryptoVault ?
        </Typography>
        <Typography variant="body2" paragraph>
          • Algorithmes de chiffrement de niveau militaire (AES-256, ChaCha20, RSA, ECC)
        </Typography>
        <Typography variant="body2" paragraph>
          • Interface utilisateur intuitive pour des opérations de cryptographie complexes
        </Typography>
        <Typography variant="body2" paragraph>
          • Application de bureau native rapide et sécurisée avec Tauri
        </Typography>
        <Typography variant="body2">
          • Toutes les opérations cryptographiques s'exécutent localement sur votre appareil
        </Typography>
      </Box>
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Link 
          href="https://github.com/OzaIsBeautiful/CryptoVault.git" 
          target="_blank" 
          rel="noopener noreferrer" 
          sx={{ display: 'inline-flex', alignItems: 'center', color: 'primary.main' }}
        >
          <GitHubIcon sx={{ mr: 1 }} /> Consulter le code source sur GitHub
        </Link>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Développé avec passion par <Link href="https://github.com/OzaIsBeautiful" target="_blank" color="primary.main">Oza</Link>
        </Typography>
      </Box>
      
    </Box>
  );
};

export default CryptHome; 