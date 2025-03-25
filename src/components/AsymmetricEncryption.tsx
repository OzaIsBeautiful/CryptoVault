import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  FormControl,
  Select,
  MenuItem,
  Paper,
  Divider,
  Alert,
  IconButton,
  Snackbar,
  Tabs,
  Tab,
  InputAdornment
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import KeyIcon from '@mui/icons-material/Key';
import CryptoJS from 'crypto-js';

// Pour JSEncrypt, nous l'importons comme ceci (c'est une bibliothèque CommonJS)
import JSEncrypt from 'jsencrypt';

// Interface pour définir les propriétés du TabPanel
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Composant de panneau d'onglet
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`asymmetric-tabpanel-${index}`}
      aria-labelledby={`asymmetric-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const AsymmetricEncryption: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [plainText, setPlainText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fonction pour générer une paire de clés RSA
  const generateKeyPair = () => {
    try {
      const jsEncrypt = new JSEncrypt({ default_key_size: '2048' });
      const publicKey = jsEncrypt.getPublicKey();
      const privateKey = jsEncrypt.getPrivateKey();
      
      setPublicKey(publicKey);
      setPrivateKey(privateKey);
      setError(null);
      setSnackbarMessage("Paire de clés générée avec succès");
      setSnackbarOpen(true);
    } catch (err) {
      setError(`Erreur lors de la génération des clés: ${err}`);
    }
  };

  // Fonction pour copier dans le presse-papiers
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  // Fonction pour chiffrer avec la clé publique
  const encryptWithPublicKey = () => {
    if (!plainText) {
      setError("Veuillez entrer du texte à chiffrer");
      return;
    }

    if (!publicKey) {
      setError("Veuillez entrer ou générer une clé publique");
      return;
    }

    try {
      const jsEncrypt = new JSEncrypt();
      jsEncrypt.setPublicKey(publicKey);
      const encrypted = jsEncrypt.encrypt(plainText);
      
      if (encrypted === false) {
        throw new Error("Échec du chiffrement. Vérifiez votre clé publique et réessayez.");
      }
      
      setEncryptedText(encrypted);
      setError(null);
    } catch (err) {
      setError(`Erreur de chiffrement: ${err}`);
    }
  };

  // Fonction pour déchiffrer avec la clé privée
  const decryptWithPrivateKey = () => {
    if (!encryptedText) {
      setError("Veuillez entrer du texte chiffré à déchiffrer");
      return;
    }

    if (!privateKey) {
      setError("Veuillez entrer ou générer une clé privée");
      return;
    }

    try {
      const jsEncrypt = new JSEncrypt();
      jsEncrypt.setPrivateKey(privateKey);
      const decrypted = jsEncrypt.decrypt(encryptedText);
      
      if (decrypted === false) {
        throw new Error("Échec du déchiffrement. Vérifiez que vous utilisez la bonne clé privée.");
      }
      
      setDecryptedText(decrypted);
      setError(null);
    } catch (err) {
      setError(`Erreur de déchiffrement: ${err}`);
    }
  };

  // Gérer le changement d'onglet
  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Chiffrement Asymétrique
      </Typography>
      
      <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
        Le chiffrement asymétrique utilise une paire de clés: une clé publique pour chiffrer et une clé privée pour déchiffrer.
        Idéal pour l'échange sécurisé d'informations sans partager de secret préalable.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Paper elevation={2} sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleChangeTab} 
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Générer des clés" icon={<KeyIcon />} iconPosition="start" />
          <Tab label="Chiffrer" icon={<LockIcon />} iconPosition="start" />
          <Tab label="Déchiffrer" icon={<LockOpenIcon />} iconPosition="start" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <Typography variant="body1" paragraph>
            Générez une paire de clés RSA pour commencer. Gardez la clé privée secrète et partagez la clé publique avec ceux qui doivent vous envoyer des messages chiffrés.
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={generateKeyPair}
            startIcon={<KeyIcon />}
            sx={{ mb: 3 }}
          >
            Générer une nouvelle paire de clés RSA
          </Button>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Clé publique"
                multiline
                rows={5}
                fullWidth
                variant="outlined"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                InputProps={{
                  endAdornment: publicKey ? (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => copyToClipboard(publicKey, "Clé publique copiée!")}
                        edge="end"
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Clé privée (à garder secrète)"
                multiline
                rows={5}
                fullWidth
                variant="outlined"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                InputProps={{
                  endAdornment: privateKey ? (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => copyToClipboard(privateKey, "Clé privée copiée!")}
                        edge="end"
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                }}
              />
              <Typography variant="caption" color="error">
                Attention: Ne partagez jamais votre clé privée. Gardez-la dans un endroit sûr.
              </Typography>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="body1" paragraph>
            Utilisez une clé publique pour chiffrer un message. Seul le détenteur de la clé privée correspondante pourra le déchiffrer.
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Clé publique du destinataire"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                placeholder="Collez ici la clé publique du destinataire..."
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Texte à chiffrer"
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                placeholder="Entrez le message à chiffrer..."
              />
            </Grid>
            
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={encryptWithPublicKey}
                startIcon={<LockIcon />}
              >
                Chiffrer avec la clé publique
              </Button>
            </Grid>
            
            {encryptedText && (
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Texte chiffré:
                </Typography>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'background.paper',
                    position: 'relative',
                    wordBreak: 'break-all'
                  }}
                >
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {encryptedText}
                  </Typography>
                  <IconButton 
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={() => copyToClipboard(encryptedText, "Texte chiffré copié!")}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </Grid>
            )}
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1" paragraph>
            Utilisez votre clé privée pour déchiffrer un message qui a été chiffré avec votre clé publique.
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Votre clé privée"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Collez ici votre clé privée..."
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Texte chiffré à déchiffrer"
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                value={encryptedText}
                onChange={(e) => setEncryptedText(e.target.value)}
                placeholder="Collez ici le texte chiffré..."
              />
            </Grid>
            
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={decryptWithPrivateKey}
                startIcon={<LockOpenIcon />}
              >
                Déchiffrer avec la clé privée
              </Button>
            </Grid>
            
            {decryptedText && (
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Texte déchiffré:
                </Typography>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'background.paper',
                    position: 'relative'
                  }}
                >
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {decryptedText}
                  </Typography>
                  <IconButton 
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={() => copyToClipboard(decryptedText, "Texte déchiffré copié!")}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </Grid>
            )}
          </Grid>
        </TabPanel>
      </Paper>
      
      <Box sx={{ mt: 6, bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          À propos du chiffrement asymétrique:
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>RSA (Rivest-Shamir-Adleman):</strong> L'algorithme de chiffrement asymétrique le plus utilisé, basé sur la difficulté de factoriser de grands nombres premiers.
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Clé publique:</strong> Peut être partagée librement et est utilisée pour chiffrer les données.
        </Typography>
        <Typography variant="body2">
          <strong>Clé privée:</strong> Doit rester secrète et est utilisée pour déchiffrer les données chiffrées avec la clé publique correspondante.
        </Typography>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default AsymmetricEncryption; 