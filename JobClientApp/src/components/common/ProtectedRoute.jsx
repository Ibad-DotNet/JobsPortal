import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  // If no user after loading, redirect to login
  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Check role requirements
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    if (user.role === 'Admin') {
      return <Navigate to="/administrator" replace />;
    } else if (user.role === 'Recruiter') {
      return <Navigate to="/recruiter" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;