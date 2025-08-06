import React from 'react';
import {
  Backdrop,
  CircularProgress,
  Box,
  Typography,
  Fade
} from '@mui/material';

const LoadingOverlay = ({ 
  open, 
  message = 'Loading...', 
  size = 60,
  color = 'primary',
  fullScreen = false,
  transparent = false
}) => {
  if (!open) return null;

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: transparent ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.8)',
        position: fullScreen ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      open={open}
    >
      <Fade in={open}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <CircularProgress 
            size={size} 
            color={color}
            thickness={4}
          />
          {message && (
            <Typography
              variant="body1"
              sx={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 500,
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Fade>
    </Backdrop>
  );
};

export default LoadingOverlay; 