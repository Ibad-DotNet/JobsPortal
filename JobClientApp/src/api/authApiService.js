import axios from 'axios';
const BASE_URL ='https://localhost:7184/api';
const getToken = () => localStorage.getItem('token');

const setToken = (token) => localStorage.setItem('token', token);

const removeToken = () => localStorage.removeItem('token');
const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});
const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --- API METHODS ---
const get = async (url) => {
  try {
    const response = await api.get(url, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

const post = async (url, data) => {
  try {
    const response = await api.post(url, data, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

const put = async (url, data) => {
  try {
    const response = await api.put(url, data, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

const patch = async (url, data) => {
  try {
    const response = await api.patch(url, data, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

const del = async (url) => {
  try {
    const response = await api.delete(url, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// --- LOGIN & LOGOUT ---
const login = async (url, credentials) => {
  try {
    const response = await api.post(BASE_URL+url, credentials);
    const { token } = response.data.data.token;
    if (token) setToken(token);
    return response.data.data;
  } catch (error) {
    throw handleError(error);
  }
};

const logout = () => {
  removeToken();
};

// --- ERROR HANDLER ---
const handleError = (error) => {
  if (error.response) return error.response.data;
  return { message: 'Network or server error' };
};

// --- EXPORT SERVICE ---
const authApiService = {
  get,
  post,
  put,
  patch,
  delete: del,
  login,
  logout,
};

export default authApiService;
