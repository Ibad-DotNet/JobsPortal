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
  const [authLoading, setAuthLoading] = useState(true);

  // On first load, check localStorage for user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setAuthLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser({ userName: email, password }); // API call from js file
      const userData = response;
      console.log('Login response:', userData);

      if (userData?.token) {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
      }

      return userData;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading: authLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
