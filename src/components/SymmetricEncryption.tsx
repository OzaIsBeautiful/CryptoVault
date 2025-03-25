import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  Alert,
  InputAdornment,
  IconButton,
  Snackbar
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import RefreshIcon from '@mui/icons-material/Refresh';
import CryptoJS from 'crypto-js';

const SymmetricEncryption: React.FC = () => {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [algorithm, setAlgorithm] = useState<string>('aes');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Générer une clé aléatoire
  const generateRandomKey = () => {
    const randomKey = CryptoJS.lib.WordArray.random(16).toString();
    setKey(randomKey);
  };

  // Copier le résultat dans le presse-papiers
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setSnackbarOpen(true);
  };

  // Chiffrer le texte
  const encryptText = () => {
    if (!text) {
      setError("Veuillez entrer du texte à chiffrer");
      return;
    }
    
    if (!key) {
      setError("Veuillez entrer une clé de chiffrement");
      return;
    }

    setError(null);
    try {
      let encrypted: string = '';
      
      switch (algorithm) {
        case 'aes':
          encrypted = CryptoJS.AES.encrypt(text, key).toString();
          break;
        case 'des':
          encrypted = CryptoJS.DES.encrypt(text, key).toString();
          break;
        case 'tripledes':
          encrypted = CryptoJS.TripleDES.encrypt(text, key).toString();
          break;
        case 'rabbit':
          encrypted = CryptoJS.Rabbit.encrypt(text, key).toString();
          break;
        case 'rc4':
          encrypted = CryptoJS.RC4.encrypt(text, key).toString();
          break;
        default:
          encrypted = CryptoJS.AES.encrypt(text, key).toString();
      }
      
      setResult(encrypted);
    } catch (err) {
      setError(`Erreur lors du chiffrement: ${err}`);
    }
  };

  // Déchiffrer le texte
  const decryptText = () => {
    if (!text) {
      setError("Veuillez entrer du texte à déchiffrer");
      return;
    }
    
    if (!key) {
      setError("Veuillez entrer une clé de déchiffrement");
      return;
    }

    setError(null);
    try {
      let decrypted: string = '';
      
      switch (algorithm) {
        case 'aes':
          decrypted = CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
          break;
        case 'des':
          decrypted = CryptoJS.DES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
          break;
        case 'tripledes':
          decrypted = CryptoJS.TripleDES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
          break;
        case 'rabbit':
          decrypted = CryptoJS.Rabbit.decrypt(text, key).toString(CryptoJS.enc.Utf8);
          break;
        case 'rc4':
          decrypted = CryptoJS.RC4.decrypt(text, key).toString(CryptoJS.enc.Utf8);
          break;
        default:
          decrypted = CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
      }
      
      if (!decrypted) {
        throw new Error("Le texte ne peut pas être déchiffré avec cette clé");
      }
      
      setResult(decrypted);
    } catch (err) {
      setError(`Erreur lors du déchiffrement: ${err}`);
    }
  };

  // Exécuter l'opération (chiffrer ou déchiffrer)
  const executeOperation = () => {
    if (mode === 'encrypt') {
      encryptText();
    } else {
      decryptText();
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Chiffrement Symétrique
      </Typography>
      
      <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
        Le chiffrement symétrique utilise la même clé pour chiffrer et déchiffrer les données.
        Choisissez un algorithme, entrez votre texte et une clé secrète pour commencer.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Algorithme</InputLabel>
              <Select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                label="Algorithme"
              >
                <MenuItem value="aes">AES (recommandé)</MenuItem>
                <MenuItem value="tripledes">Triple DES</MenuItem>
                <MenuItem value="rabbit">Rabbit</MenuItem>
                <MenuItem value="rc4">RC4</MenuItem>
                <MenuItem value="des">DES (déconseillé)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Mode</InputLabel>
              <Select
                value={mode}
                onChange={(e) => setMode(e.target.value as 'encrypt' | 'decrypt')}
                label="Mode"
              >
                <MenuItem value="encrypt">Chiffrer</MenuItem>
                <MenuItem value="decrypt">Déchiffrer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label={mode === 'encrypt' ? "Texte à chiffrer" : "Texte à déchiffrer"}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={mode === 'encrypt' ? "Entrez votre texte ici..." : "Collez le texte chiffré ici..."}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            label="Clé secrète"
            fullWidth
            variant="outlined"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Entrez votre clé secrète..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={generateRandomKey}
                    edge="end"
                    title="Générer une clé aléatoire"
                  >
                    <RefreshIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="caption" color="text.secondary">
            Note: Pour déchiffrer, vous devez utiliser exactement la même clé que celle utilisée pour le chiffrement.
          </Typography>
        </Grid>
        
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={executeOperation}
            startIcon={mode === 'encrypt' ? <LockIcon /> : <LockOpenIcon />}
            sx={{ px: 4 }}
          >
            {mode === 'encrypt' ? 'Chiffrer' : 'Déchiffrer'}
          </Button>
        </Grid>
        
        {result && (
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Résultat:
            </Typography>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'hidden',
                wordBreak: 'break-all'
              }}
            >
              <Typography variant="body2" sx={{ mb: 2 }}>
                {result}
              </Typography>
              <IconButton 
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={copyToClipboard}
                title="Copier dans le presse-papiers"
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Paper>
          </Grid>
        )}
      </Grid>
      
      <Box sx={{ mt: 6, bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          À propos des algorithmes de chiffrement symétrique:
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>AES (Advanced Encryption Standard):</strong> Un standard de chiffrement moderne très sécurisé, recommandé pour la plupart des applications.
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Triple DES:</strong> Une version améliorée de DES qui applique l'algorithme trois fois pour augmenter la sécurité.
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Rabbit:</strong> Un algorithme de chiffrement par flux conçu pour être rapide et sécurisé.
        </Typography>
        <Typography variant="body2">
          <strong>RC4:</strong> Un algorithme de chiffrement par flux historique, maintenant déconseillé pour les applications sensibles.
        </Typography>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Copié dans le presse-papiers!"
      />
    </Box>
  );
};

export default SymmetricEncryption; 