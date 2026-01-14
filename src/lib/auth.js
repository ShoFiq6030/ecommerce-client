// Authentication utility functions
'use client';

export const setAuthCookie = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

export const getAuthCookie = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

export const removeAuthCookie = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

export const isAuthenticated = () => {
  return !!getAuthCookie();
};

export const logout = () => {
  removeAuthCookie();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};
