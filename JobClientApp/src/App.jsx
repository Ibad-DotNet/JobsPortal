import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { LoadingProvider } from './contexts/LoadingContext';



import theme from './theme/theme';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import JobsPage from './pages/JobPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import GlobalLoadingWrapper from './components/common/GlobalLoadingWrapper';

function App() {
  return (
    <ThemeProvider theme={theme}>


      <CssBaseline />
      <LoadingProvider>
        <AuthProvider>
          <ToastProvider>
            <GlobalLoadingWrapper>
              <Router>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route
                    path="/administrator"
                    element={
                      <ProtectedRoute >
                        <Layout>
                          <AdminDashboard />
                        </Layout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/recruiter"
                    element={
                      <ProtectedRoute requiredRole="Recruiter">
                        <Layout>
                          <RecruiterDashboard />
                        </Layout>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/jobs" element={
                    <JobsPage />
                  }/>
                  {/* <Route
                    path="/all-jobs"
                    element={
                      <ProtectedRoute requiredRole="Recruiter">
                        <Layout>
                          <AllJobs />
                        </Layout>
                      </ProtectedRoute>
                    }
                  /> */}

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Router>
              <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </GlobalLoadingWrapper>
          </ToastProvider>
        </AuthProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;