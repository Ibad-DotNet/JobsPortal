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
import authApiService from '../api/authApiService';

const Login = () => {
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
      const userData = await authApiService.login('/user/login', {
        userName: email,
        password: password,
      });
      console.log('User data:', userData);
      if (userData.role === 'Admin') {
        console.log('User role:', userData.role);
        navigate('/administrator');
      } else if (userData.role === 'Recruiter') {
        navigate('/recruiter');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      width: '100vw',
      display: 'flex',
      margin: 0,
      padding: 0,
      backgroundColor: '#f5f5f5'
    }}>
      <Grid container sx={{ height: '100vh' }}>
        {/* Left Side - Welcome Section */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            backgroundColor: 'primary.main',
            color: 'white',
            p: 4
          }}
        >
          <Box sx={{ textAlign: 'center', maxWidth: 400 }}>
            <Business sx={{ fontSize: 80, mb: 3, color: 'white' }} />
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Volmatica
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 400, mb: 3, opacity: 0.9 }}>
              Admin System
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.8 }}>
              Welcome to the Volmatica Admin System. Streamline your recruitment process with our comprehensive management platform. Access powerful tools for job posting, candidate tracking, and team collaboration.
            </Typography>
          </Box>
        </Grid>

        {/* Right Side - Login Form */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            p: 4,
            backgroundColor: 'white'
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: 400,
              borderRadius: 3
            }}
          >
            <Typography component="h1" variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
              Sign In
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
              />
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, py: 1.5 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
            </Box>
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Demo Accounts:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Admin: admin@volmatica.com / Admin@111
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Recruiter: Ibad@Volmatica.com / Ibad@111
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;