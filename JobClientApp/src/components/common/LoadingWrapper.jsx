import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import LoadingSkeleton from './LoadingSkeleton';

const LoadingWrapper = ({
  loading,
  children,
  skeleton = false,
  skeletonProps = {},
  message = 'Loading...',
  size = 40,
  center = true,
  minHeight = 200
}) => {
  if (!loading) {
    return children;
  }

  if (skeleton) {
    return <LoadingSkeleton {...skeletonProps} />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: center ? 'center' : 'flex-start',
        justifyContent: 'center',
        minHeight: minHeight,
        gap: 2,
        p: 2
      }}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingWrapper; 