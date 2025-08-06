import { useCallback } from 'react';
import { useLoading } from '../contexts/LoadingContext';

export const useApiWithLoading = () => {
  const { setLoading, isLoading } = useLoading();

  const callApi = useCallback(async (apiCall, loadingKey, options = {}) => {
    const {
      onSuccess,
      onError,
      showLoading = true
    } = options;

    if (showLoading) {
      setLoading(loadingKey, true);
    }

    try {
      const result = await apiCall();
      
      if (onSuccess) {
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
      if (showLoading) {
        setLoading(loadingKey, false);
      }
    }
  }, [setLoading]);

  return {
    callApi,
    isLoading: (key) => isLoading(key)
  };
}; 