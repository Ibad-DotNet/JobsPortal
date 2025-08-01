import React, { createContext, useContext, useState, useEffect } from 'react';
import authApiService from '../api/authApiService';
const loginUser = authApiService.login;

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate token and restore user session
  const validateAndRestoreSession = () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username');
    const fullName = localStorage.getItem('fullName');
    const role = localStorage.getItem('role');

    // Check if all required fields are present
    if (token && email && role) {
      // Check if token is not expired
      const isExpired = authApiService.isTokenExpired ? authApiService.isTokenExpired(token) : false;
      
      if (!isExpired && token.length > 10) {
        const userData = {
          token,
          email,
          username,
          fullName,
          role
        };
        setUser(userData);
        return true;
      }
    }
    
    // Clear invalid data
    authApiService.logout();
    setUser(null);
    return false;
  };

  // On first load, validate and restore user session
  useEffect(() => {
    validateAndRestoreSession();
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser({ userName: email, password });
      
      if (response?.token) {
        // The authApiService already handles localStorage storage
        setUser(response);
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authApiService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    validateAndRestoreSession, // Expose this for manual validation if needed
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
