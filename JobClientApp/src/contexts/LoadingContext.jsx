import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = (key, isLoading) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: isLoading
    }));
  };

  const setGlobalLoadingState = (isLoading) => {
    setGlobalLoading(isLoading);
  };

  const isLoading = (key) => {
    return loadingStates[key] || false;
  };

  const isAnyLoading = () => {
    return globalLoading || Object.values(loadingStates).some(state => state);
  };

  const clearLoading = (key) => {
    setLoadingStates(prev => {
      const newStates = { ...prev };
      delete newStates[key];
      return newStates;
    });
  };

  const clearAllLoading = () => {
    setLoadingStates({});
    setGlobalLoading(false);
  };

  const value = {
    globalLoading,
    setGlobalLoading: setGlobalLoadingState,
    setLoading,
    isLoading,
    isAnyLoading,
    clearLoading,
    clearAllLoading,
    loadingStates
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}; 