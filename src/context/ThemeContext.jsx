// src/contexts/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { MESSAGES } from '../constants/messages';

const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = 'theme';
const USERNAME_STORAGE_KEY = 'username';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === THEME_DARK;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Appliquer immédiatement le theme initial au DOM (évite FOUC)
  useEffect(() => {
    applyThemeToDOM(isDark);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Au montage, récupérer le thème depuis le backend si connecté
  useEffect(() => {
    const fetchTheme = async () => {
      const username = localStorage.getItem(USERNAME_STORAGE_KEY);
      if (!username) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/theme');
        const backendTheme = response.data.theme;
        const nextIsDark = backendTheme === THEME_DARK;
        
        setIsDark(nextIsDark);
        localStorage.setItem(THEME_STORAGE_KEY, backendTheme);
        applyThemeToDOM(nextIsDark);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(MESSAGES.THEME.FETCH_ERROR, error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTheme();
  }, []);

  // Appliquer le thème au DOM à chaque changement
  useEffect(() => {
    applyThemeToDOM(isDark);
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? THEME_DARK : THEME_LIGHT);
  }, [isDark]);

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    const username = localStorage.getItem(USERNAME_STORAGE_KEY);
    if (!username) return;

    try {
      await api.put('/auth/theme', {
        theme: newTheme ? THEME_DARK : THEME_LIGHT,
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(MESSAGES.THEME.SAVE_ERROR, error);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(MESSAGES.THEME.CONTEXT_ERROR);
  }
  return context;
}

// Fonction utilitaire pour appliquer le thème au DOM
function applyThemeToDOM(isDark) {
  const root = document.documentElement;
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}