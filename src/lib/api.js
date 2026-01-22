import axios from 'axios';
import { getAuthCookie } from '../../lib/auth';

// API base URL
const API_BASE_URL = process.env.API_URL || 'http://localhost:5000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token and user-id to requests
api.interceptors.request.use(
  (config) => {
    const token = getAuthCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add user-id to headers if available in localStorage
    try {
      if (typeof window !== 'undefined') {
        const userId = localStorage.getItem('userId');
        if (userId) {
          config.headers['user-id'] = userId;
        }
      }
    } catch (error) {
      // If localStorage access fails, continue without user-id
      console.warn('Failed to get user-id from localStorage:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API methods
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Login failed';
  }
};

export const verifyAuth = async () => {
  try {
    const response = await api.get('/auth/verify');
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Authentication failed';
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch products';
  }
};

export const searchProducts = async (searchTerm) => {
  try {
    const response = await api.get(`/products?search=${encodeURIComponent(searchTerm)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to search products';
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch product';
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to create product';
  }
};

export default api;
