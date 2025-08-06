/**
 * Utility functions for managing loading states
 */

/**
 * Wraps an API call with proper loading state management
 * @param {Function} setLoading - Function to set loading state
 * @param {string} loadingKey - Key for the loading state
 * @param {Function} apiCall - The API function to call
 * @param {Function} onSuccess - Success callback
 * @param {Function} onError - Error callback
 */
export const withLoading = async (
  setLoading,
  loadingKey,
  apiCall,
  onSuccess = null,
  onError = null
) => {
  try {
    setLoading(loadingKey, true);
    const result = await apiCall();
    
    if (result && onSuccess) {
      onSuccess(result);
    }
    
    return result;
  } catch (error) {
    console.error(`API call failed for ${loadingKey}:`, error);
    
    if (onError) {
      onError(error);
    }
    
    throw error;
  } finally {
    setLoading(loadingKey, false);
  }
};

/**
 * Creates a loading state manager for multiple operations
 * @param {Function} setLoading - Function to set loading state
 * @param {Function} isLoading - Function to check loading state
 */
export const createLoadingManager = (setLoading, isLoading) => {
  return {
    /**
     * Execute API call with loading state
     */
    execute: (loadingKey, apiCall, onSuccess, onError) => 
      withLoading(setLoading, loadingKey, apiCall, onSuccess, onError),
    
    /**
     * Check if a specific operation is loading
     */
    isActive: (loadingKey) => isLoading(loadingKey),
    
    /**
     * Set loading state manually
     */
    set: (loadingKey, isActive) => setLoading(loadingKey, isActive),
    
    /**
     * Clear all loading states
     */
    clearAll: () => setLoading('*', false)
  };
}; 