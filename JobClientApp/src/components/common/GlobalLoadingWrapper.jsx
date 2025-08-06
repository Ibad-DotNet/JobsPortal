import React from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import LoadingOverlay from './LoadingOverlay';

const GlobalLoadingWrapper = ({ children }) => {
  const { isAnyLoading, globalLoading } = useLoading();

  return (
    <>
      {children}
      <LoadingOverlay
        open={isAnyLoading() || globalLoading}
        message="Please wait..."
        fullScreen={true}
        size={80}
      />
    </>
  );
};

export default GlobalLoadingWrapper; 