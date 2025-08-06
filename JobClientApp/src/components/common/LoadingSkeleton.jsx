import React from 'react';
import { Skeleton, Box, Card, CardContent } from '@mui/material';

const LoadingSkeleton = ({ 
  variant = 'card', 
  count = 1, 
  height = 200,
  width = '100%',
  showAvatar = false,
  showText = true,
  showTitle = true
}) => {
  const renderCardSkeleton = () => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {showAvatar && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={20} />
            </Box>
          </Box>
        )}
        {showTitle && <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />}
        {showText && (
          <>
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="90%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="70%" height={20} />
          </>
        )}
      </CardContent>
    </Card>
  );

  const renderTableSkeleton = () => (
    <Box>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index} sx={{ display: 'flex', mb: 1 }}>
          <Skeleton variant="rectangular" width="30%" height={40} sx={{ mr: 1 }} />
          <Skeleton variant="rectangular" width="40%" height={40} sx={{ mr: 1 }} />
          <Skeleton variant="rectangular" width="20%" height={40} sx={{ mr: 1 }} />
          <Skeleton variant="rectangular" width="10%" height={40} />
        </Box>
      ))}
    </Box>
  );

  const renderListSkeleton = () => (
    <Box>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {showAvatar && <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />}
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={24} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
        </Box>
      ))}
    </Box>
  );

  const renderCustomSkeleton = () => (
    <Skeleton 
      variant="rectangular" 
      width={width} 
      height={height}
      sx={{ borderRadius: 1 }}
    />
  );

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return Array.from({ length: count }).map((_, index) => (
          <Box key={index}>{renderCardSkeleton()}</Box>
        ));
      case 'table':
        return renderTableSkeleton();
      case 'list':
        return renderListSkeleton();
      case 'custom':
        return renderCustomSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <Box>
      {renderSkeleton()}
    </Box>
  );
};

export default LoadingSkeleton; 