import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });
  const [isLoading, setIsLoading] = useState(true);

  // Au montage, récupérer le thème depuis le backend si connecté
  useEffect(() => {
    const fetchTheme = async () => {
      const username = localStorage.getItem('username'); // ✅ Changé : on vérifie username au lieu de token
      if (username) {
        try {
          const response = await api.get('/auth/theme');
          const backendTheme = response.data.theme;
          setIsDark(backendTheme === 'dark');
          localStorage.setItem('theme', backendTheme);
        } catch (error) {
          console.log('Erreur récupération thème, utilisation localStorage');
        }
      }
      setIsLoading(false);
    };

    fetchTheme();
  }, []);

  // Appliquer le thème au DOM
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    const username = localStorage.getItem('username'); // ✅ Changé : on vérifie username au lieu de token
    if (username) {
      try {
        await api.put('/auth/theme', {
          theme: newTheme ? 'dark' : 'light'
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