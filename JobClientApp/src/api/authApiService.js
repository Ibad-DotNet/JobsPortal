import axios from 'axios';
import { login as loginEndpoint } from './apiEndpoints';
import { toast } from 'react-toastify';

// --- LocalStorage Utilities ---
const setLoginData = ({ token, email, username, fullName, role }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('email', email);
  localStorage.setItem('username', username);
  localStorage.setItem('fullName', fullName);
  localStorage.setItem('role', role);
};

const getToken = () => localStorage.getItem('token');
const getRole = () => localStorage.getItem('role');

const clearLoginData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('username');
  localStorage.removeItem('fullName');
  localStorage.removeItem('role');
};

// JWT token validation utility
const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    // Decode JWT token (base64 decode the payload part)
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    
    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedPayload.exp < currentTime;
  } catch (error) {
    // If token is malformed, consider it expired
    return true;
  }
};

const getLoggedInUser = () => ({
  token: localStorage.getItem('token'),
  email: localStorage.getItem('email'),
  username: localStorage.getItem('username'),
  fullName: localStorage.getItem('fullName'),
  role: localStorage.getItem('role'),
});

// --- Axios Setup ---
const api = axios.create({
  headers: { 'Content-Type': 'application/json' }
});

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear local storage
      clearLoginData();
      // Redirect to login page
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --- Response/Error Handling ---
const handleResponse = (res, isGet = false) => {
  // Handle different response structures
  let code, message, data;
  
  // Check if response has a standard structure
  if (res.code !== undefined) {
    code = res.code;
    message = res.message;
    data = res.data;
  } else if (res.status !== undefined) {
    // Some APIs use status instead of code
    code = res.status;
    message = res.message || res.msg || res.response?.message || res.result?.message;
    data = res.data || res.result;
  } else if (res.success !== undefined) {
    // Some APIs use success boolean
    code = res.success ? 200 : 400;
    message = res.message || res.msg || res.response?.message || res.result?.message;
    data = res.data || res.result;
  } else {
    // Fallback - assume success if no error structure
    code = 200;
    message = res.message || res.msg || res.response?.message || res.result?.message || res.message;
    data = res.data || res.result || res;
  }
  
  // Try to get message from various possible fields
  const responseMessage = message || res.msg || res.response?.message || res.result?.message || res.message;
  
  if (isGet) {
    if (code === 200) return data;
    toast.error(responseMessage || 'Failed to fetch data');
    return null;
  } else {
    if (code === 200 || code === 201) {
      toast.success(responseMessage || 'Operation completed successfully');
      return true;
    } else {
      toast.error(responseMessage || 'Operation failed');
      return false;
    }
  }
};

const handleError = (error) => {
  // Try to get error message from various possible fields
  const errorData = error?.response?.data;
  const errMsg = errorData?.message || 
                 errorData?.msg || 
                 errorData?.error || 
                 errorData?.response?.message ||
                 error?.message ||
                 'Network or server error';
  
  toast.error(errMsg);
  return false;
};

// --- HTTP Methods ---
const get = async (url) => {
  try {
    const res = await api.get(url, { headers: authHeaders() });
    return handleResponse(res.data, true);
  } catch (error) {
    return handleError(error);
  }
};

const post = async (url, data) => {
  try {
    const res = await api.post(url, data, { headers: authHeaders() });
    return handleResponse(res.data);
  } catch (error) {
    return handleError(error);
  }
};

const put = async (url, data) => {
  try {
    const res = await api.put(url, data, { headers: authHeaders() });
    return handleResponse(res.data);
  } catch (error) {
    return handleError(error);
  }
};

const patch = async (url, data) => {
  try {
    const res = await api.patch(url, data, { headers: authHeaders() });
    return handleResponse(res.data);
  } catch (error) {
    return handleError(error);
  }
};

const del = async (url) => {
  try {
    const res = await api.delete(url, { headers: authHeaders() });
    return handleResponse(res.data);
  } catch (error) {
    return handleError(error);
  }
};

// --- Login & Logout ---
const login = async (credentials) => {
  try {
    const endpoint = loginEndpoint;
    const response = await api.post(endpoint, credentials);
    const { code, message, data } = response?.data;

    if (code === 200 && data?.token) {
      setLoginData(data);
      toast.success(message || 'Login successful');
      return data;
    } else {
      toast.error(message || 'Login failed');
      return null;
    }
  } catch (error) {
    return handleError(error);
  }
};


const logout = () => {
  clearLoginData();
};

// --- Exported Service ---
const authApiService = {
  login,
  logout,
  get,
  post,
  put,
  patch,
  delete: del,
  getToken,
  getRole,
  getLoggedInUser,
  isTokenExpired
};

export default authApiService;
