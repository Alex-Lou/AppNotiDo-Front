import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });
  const [isLoading, setIsLoading] = useState(true);

  // Appliquer immédiatement le theme initial au DOM (évite FOUC)
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []); // une fois au montage

  // Au montage, récupérer le thème depuis le backend si connecté
  useEffect(() => {
    const fetchTheme = async () => {
      const username = localStorage.getItem('username');
      if (username) {
        try {
          const response = await api.get('/auth/theme');
          const backendTheme = response.data.theme;
          const nextIsDark = backendTheme === 'dark';
          setIsDark(nextIsDark);
          localStorage.setItem('theme', backendTheme);

          const root = document.documentElement;
          if (nextIsDark) root.classList.add('dark');
          else root.classList.remove('dark');
        } catch (error) {
          console.log('Erreur récupération thème, utilisation localStorage');
        }
      }
      setIsLoading(false);
    };

    fetchTheme();
  }, []);

  // Appliquer le thème au DOM à chaque changement
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    const username = localStorage.getItem('username');
    if (username) {
      try {
        await api.put('/auth/theme', {
          theme: newTheme ? 'dark' : 'light',
        });
      } catch (error) {
        console.error('Erreur sauvegarde thème:', error);
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
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
