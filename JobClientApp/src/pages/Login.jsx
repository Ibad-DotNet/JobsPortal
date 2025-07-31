import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Grid
} from '@mui/material';
import { Business } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userData = await login(email, password); // ✅ Context-based login

      if (userData?.role === 'Admin') {
        navigate('/administrator');
      } else if (userData?.role === 'Recruiter') {
        navigate('/recruiter');
      } else {
        setError('Invalid role');
      }
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', display: 'flex', backgroundColor: '#f5f5f5' }}>
      <Grid container sx={{ height: '100vh' }}>
        {/* Left Panel */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'primary.main', color: 'white', p: 4 }}>
          <Box sx={{ textAlign: 'center', maxWidth: 400 }}>
            <Business sx={{ fontSize: 80, mb: 3 }} />
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>Volmatica</Typography>
            <Typography variant="h5" sx={{ fontWeight: 400, mb: 3 }}>Admin System</Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.8 }}>
              Welcome to the Volmatica Admin System. Streamline your recruitment process with our management platform.
            </Typography>
          </Box>
        </Grid>

        {/* Right Panel (Form) */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4, backgroundColor: 'white' }}>
          <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400, borderRadius: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>Sign In</Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                required fullWidth margin="normal" label="Email Address" type="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required fullWidth margin="normal" label="Password" type="password"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />

              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, py: 1.5 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Demo Accounts:</Typography>
              <Typography variant="body2" color="text.secondary">Admin: admin@volmatica.com / Admin@111</Typography>
              <Typography variant="body2" color="text.secondary">Recruiter: Ibad@Volmatica.com / Ibad@111</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
