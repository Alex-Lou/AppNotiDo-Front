// src/hooks/useAuth.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AUTH } from '../constants/messages';

export const useAuth = (setUsername) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const applyUserTheme = async () => {
    try {
      const themeResponse = await api.get('/auth/theme');
      const theme = themeResponse.data.theme;
      localStorage.setItem('theme', theme);

      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const saveUsername = (username) => {
    if (setUsername) {
      setUsername(username);
    } else {
      localStorage.setItem('username', username);
    }
  };

  const login = async (username, password) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { username, password });
      const loginUsername = response.data.username;

      saveUsername(loginUsername);
      await applyUserTheme();
      navigate('/dashboard');
    } catch (err) {
      setError(AUTH.ERROR_INVALID_CREDENTIALS);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username, email, password, confirmPassword) => {
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError(AUTH.ERROR_PASSWORDS_MISMATCH);
      return;
    }

    if (password.length < 6) {
      setError(AUTH.ERROR_PASSWORD_TOO_SHORT);
      return;
    }

    setIsLoading(true);

    try {
      await api.post('/auth/register', { username, email, password });

      // Connexion automatique
      const loginResponse = await api.post('/auth/login', { username, password });
      const loginUsername = loginResponse.data.username;

      saveUsername(loginUsername);
      await applyUserTheme();
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.status === 409) {
        setError(AUTH.ERROR_USERNAME_EXISTS);
      } else {
        setError(AUTH.ERROR_REGISTER_FAILED);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, register, isLoading, error, setError };
};
