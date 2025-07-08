import React, { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = [
          {
            email: 'admin@volmatica.com',
            password: 'Admin@111',
            username: 'System Administrator',
            role: 'SystemAdmin',
            token: 'admin_jwt_token_123'
          },
          {
            email: 'Ibad@Volmatica.com',
            password: 'Ibad@111',
            username: 'Ibad Ahmed',
            role: 'Recruiter',
            token: 'recruiter_jwt_token_456'
          }
        ];

        const foundUser = users.find(u => 
          u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (foundUser) {
          const userData = {
            username: foundUser.username,
            email: foundUser.email,
            role: foundUser.role,
            token: foundUser.token
          };

          localStorage.setItem('token', foundUser.token);
          localStorage.setItem('userData', JSON.stringify(userData));
          setUser(userData);
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
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
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};