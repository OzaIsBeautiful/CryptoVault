import React, { useState, useRef, ChangeEvent } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Divider,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CryptoJS from 'crypto-js';

const HashFunction: React.FC = () => {
  const [text, setText] = useState('');
  const [algorithm, setAlgorithm] = useState<string>('sha256');
  const [hash, setHash] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fonction pour calculer le hachage du texte
  const calculateHash = () => {
    if (!text) {
      setError("Veuillez entrer du texte à hacher");
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      let hashedValue: string = '';
      
      switch (algorithm) {
        case 'md5':
          hashedValue = CryptoJS.MD5(text).toString();
          break;
        case 'sha1':
          hashedValue = CryptoJS.SHA1(text).toString();
          break;
        case 'sha256':
          hashedValue = CryptoJS.SHA256(text).toString();
          break;
        case 'sha512':
          hashedValue = CryptoJS.SHA512(text).toString();
          break;
        case 'sha3':
          hashedValue = CryptoJS.SHA3(text).toString();
          break;
        case 'ripemd160':
          hashedValue = CryptoJS.RIPEMD160(text).toString();
          break;
        default:
          hashedValue = CryptoJS.SHA256(text).toString();
      }
      
      setHash(hashedValue);
    } catch (err) {
      setError(`Erreur lors du calcul du hachage: ${err}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Fonction pour copier le hachage dans le presse-papiers
  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    setSnackbarOpen(true);
  };

  // Gérer le changement de fichier
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    setIsProcessing(true);
    setError(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        setText(content);
        // Calculer le hachage pour les petits fichiers automatiquement
        if (content.length < 10000000) { // Limiter à ~10MB pour l'automatique
          let hashedValue: string = '';
          
          switch (algorithm) {
            case 'md5':
              hashedValue = CryptoJS.MD5(content).toString();
              break;
            case 'sha1':
              hashedValue = CryptoJS.SHA1(content).toString();
              break;
            case 'sha256':
              hashedValue = CryptoJS.SHA256(content).toString();
              break;
            case 'sha512':
              hashedValue = CryptoJS.SHA512(content).toString();
              break;
            case 'sha3':
              hashedValue = CryptoJS.SHA3(content).toString();
              break;
            case 'ripemd160':
              hashedValue = CryptoJS.RIPEMD160(content).toString();
              break;
            default:
              hashedValue = CryptoJS.SHA256(content).toString();
          }
          
          setHash(hashedValue);
        }
      } else {
        // Gérer le contenu binaire pour les gros fichiers
        if (content instanceof ArrayBuffer) {
          const wordArray = CryptoJS.lib.WordArray.create(content);
          let hashedValue: string = '';
          
          switch (algorithm) {
            case 'md5':
              hashedValue = CryptoJS.MD5(wordArray).toString();
              break;
            case 'sha1':
              hashedValue = CryptoJS.SHA1(wordArray).toString();
              break;
            case 'sha256':
              hashedValue = CryptoJS.SHA256(wordArray).toString();
              break;
            case 'sha512':
              hashedValue = CryptoJS.SHA512(wordArray).toString();
              break;
            case 'sha3':
              hashedValue = CryptoJS.SHA3(wordArray).toString();
              break;
            case 'ripemd160':
              hashedValue = CryptoJS.RIPEMD160(wordArray).toString();
              break;
            default:
              hashedValue = CryptoJS.SHA256(wordArray).toString();
          }
          
          setHash(hashedValue);
          setText(`[Contenu binaire du fichier: ${file.name}]`);
        }
      }
      setIsProcessing(false);
    };

    reader.onerror = () => {
      setError(`Erreur lors de la lecture du fichier: ${reader.error}`);
      setIsProcessing(false);
    };

    if (file.size < 50000000) { // Limiter à ~50MB
      if (file.type.startsWith('text/') || file.type === 'application/json') {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    } else {
      setError("Le fichier est trop volumineux (limite: 50MB)");
      setIsProcessing(false);
    }
  };

  // Déclencher le sélecteur de fichier
  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Fonctions de Hachage
      </Typography>
      
      <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
        Les fonctions de hachage créent une empreinte numérique unique à partir des données.
        Elles sont utilisées pour vérifier l'intégrité des fichiers et sécuriser les mots de passe.
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
              <InputLabel>Algorithme de hachage</InputLabel>
              <Select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                label="Algorithme de hachage"
              >
                <MenuItem value="md5">MD5 (non sécurisé)</MenuItem>
                <MenuItem value="sha1">SHA-1 (déconseillé)</MenuItem>
                <MenuItem value="sha256">SHA-256 (recommandé)</MenuItem>
                <MenuItem value="sha512">SHA-512 (très sécurisé)</MenuItem>
                <MenuItem value="sha3">SHA-3 (nouvelle génération)</MenuItem>
                <MenuItem value="ripemd160">RIPEMD-160</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              startIcon={<UploadFileIcon />}
              onClick={handleFileButtonClick}
              sx={{ height: '56px' }} // Pour aligner avec le Select
            >
              {fileName ? `Fichier: ${fileName}` : 'Sélectionner un fichier'}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </Grid>
        </Grid>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Texte à hacher"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Entrez le texte à hacher ou chargez un fichier..."
          />
        </Grid>
        
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={calculateHash}
            startIcon={<FingerprintIcon />}
            disabled={isProcessing || !text}
            sx={{ px: 4 }}
          >
            Calculer le hachage
          </Button>
        </Grid>
        
        {isProcessing && (
          <Grid item xs={12}>
            <CircularProgress sx={{ mt: 2 }} />
          </Grid>
        )}
        
        {hash && (
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              {algorithm.toUpperCase()}:
            </Typography>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                bgcolor: 'background.paper',
                position: 'relative',
                fontFamily: 'monospace',
                overflow: 'hidden',
                wordBreak: 'break-all'
              }}
            >
              <Typography variant="body2" fontFamily="monospace" sx={{ mb: 2 }}>
                {hash}
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
          À propos des fonctions de hachage:
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Empreinte numérique:</strong> Une fonction de hachage cryptographique transforme des données de taille variable en une chaîne de caractères de taille fixe.
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Propriétés:</strong> Les fonctions de hachage sécurisées sont à sens unique (impossible de retrouver les données d'origine) et résistantes aux collisions (deux entrées différentes ne produisent pas la même sortie).
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Applications:</strong> Vérification d'intégrité des fichiers, stockage sécurisé des mots de passe, signatures numériques, blockchain.
        </Typography>
        <Typography variant="body2">
          <strong>Sécurité:</strong> MD5 et SHA-1 sont considérés comme vulnérables. SHA-256, SHA-512 et SHA-3 sont recommandés pour les applications sensibles.
        </Typography>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Hachage copié dans le presse-papiers!"
      />
    </Box>
  );
};

export default HashFunction; 