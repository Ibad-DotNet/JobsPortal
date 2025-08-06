import React from 'react';
import { Button, CircularProgress, Box } from '@mui/material';

const LoadingButton = ({
  loading = false,
  loadingText = 'Loading...',
  children,
  disabled,
  startIcon,
  endIcon,
  ...buttonProps
}) => {
  return (
    <Button
      {...buttonProps}
      disabled={disabled || loading}
      startIcon={
        loading ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          startIcon
        )
      }
      endIcon={!loading ? endIcon : null}
    >
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span>{loadingText}</span>
        </Box>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton; 