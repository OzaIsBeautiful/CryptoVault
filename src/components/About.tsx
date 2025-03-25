import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import GitHubIcon from '@mui/icons-material/GitHub';
import AppsIcon from '@mui/icons-material/Apps';
import PersonIcon from '@mui/icons-material/Person';

const About: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        À propos de CryptoVault
      </Typography>
      
      <Typography variant="body1" paragraph align="center" sx={{ mb: 1 }}>
        CryptoVault est une application de bureau sécurisée pour les opérations cryptographiques.
        Conçue pour offrir des outils de chiffrement puissants tout en restant facile à utiliser.
      </Typography>
      
      <Typography variant="subtitle1" paragraph align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Made by <Link href="https://github.com/OzaIsBeautiful" target="_blank" rel="noopener">Oza</Link>
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Fonctionnalités principales
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <LockIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Chiffrement symétrique" 
                  secondary="AES-256, ChaCha20, Triple DES et plus" 
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <EnhancedEncryptionIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Chiffrement asymétrique" 
                  secondary="RSA avec génération de paires de clés" 
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <FingerprintIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Fonctions de hachage" 
                  secondary="SHA-256, SHA-512, SHA-3, RIPEMD-160" 
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <DesktopWindowsIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Application native" 
                  secondary="Sécurisée et performante grâce à Tauri" 
                />
              </ListItem>
            </List>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Avantages de sécurité
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Traitement local" 
                  secondary="Toutes les opérations cryptographiques s'exécutent localement sur votre appareil" 
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Aucune donnée stockée" 
                  secondary="Vos données sensibles ne sont jamais enregistrées ni envoyées à des serveurs" 
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Algorithmes de niveau militaire" 
                  secondary="Utilisation des standards cryptographiques les plus robustes" 
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <AppsIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Interface intuitive" 
                  secondary="La sécurité rendue accessible grâce à une interface utilisateur moderne" 
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
      
      <Divider sx={{ my: 4 }} />
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Technologies utilisées
            </Typography>
            
            <Typography variant="body2" paragraph>
              • <strong>Tauri:</strong> Framework pour la création d'applications de bureau légères et sécurisées
            </Typography>
            <Typography variant="body2" paragraph>
              • <strong>React & TypeScript:</strong> Pour une interface utilisateur robuste et typée
            </Typography>
            <Typography variant="body2" paragraph>
              • <strong>Material-UI:</strong> Bibliothèque de composants UI modernes et réactifs
            </Typography>
            <Typography variant="body2" paragraph>
              • <strong>CryptoJS:</strong> Implémentations JavaScript d'algorithmes cryptographiques standards
            </Typography>
            <Typography variant="body2">
              • <strong>JSEncrypt:</strong> Bibliothèque pour les opérations RSA
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Cas d'utilisation
            </Typography>
            
            <Typography variant="body2" paragraph>
              • Chiffrement de messages confidentiels avant de les envoyer
            </Typography>
            <Typography variant="body2" paragraph>
              • Vérification de l'intégrité des fichiers téléchargés
            </Typography>
            <Typography variant="body2" paragraph>
              • Génération de hachages sécurisés pour diverses applications
            </Typography>
            <Typography variant="body2" paragraph>
              • Échange sécurisé d'informations sans partage préalable de clé
            </Typography>
            <Typography variant="body2">
              • Apprentissage des concepts fondamentaux de la cryptographie
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom color="primary.main">
          Made by <Link href="https://github.com/OzaIsBeautiful" target="_blank" rel="noopener">Oza</Link>
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          CryptoVault © {new Date().getFullYear()} - Application développée à des fins éducatives et pratiques
        </Typography>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Link 
            href="https://github.com/OzaIsBeautiful/CryptoVault.git" 
            target="_blank" 
            rel="noopener noreferrer" 
            sx={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <GitHubIcon fontSize="small" sx={{ mr: 0.5 }} /> Code source
          </Link>
          
          <Link 
            href="https://github.com/OzaIsBeautiful" 
            target="_blank" 
            rel="noopener noreferrer" 
            sx={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <PersonIcon fontSize="small" sx={{ mr: 0.5 }} /> Profil Oza
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default About; 