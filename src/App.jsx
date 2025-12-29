// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import Auth from './pages/Auth';
import DashboardNew from './pages/DashboardNew';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [username, setUsername] = useState(() => localStorage.getItem('username') || null);

  // Écoute les changements de localStorage (logout depuis d'autres onglets, etc.)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'username') {
        setUsername(event.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync localStorage quand username change (par sécurité)
  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

  return (
    <>
      {/* Toaster de Sonner - Affiche les toasts dans toute l'app */}
      <Toaster 
        position="top-right"
        expand={true}
        richColors
        closeButton
        duration={4000}
        toastOptions={{
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            border: '1px solid var(--toast-border)',
          },
          className: 'toast-custom',
        }}
      />

      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route
            path="/auth"
            element={username ? <Navigate to="/dashboard" replace /> : <Auth setUsername={setUsername} />}
          />

          {/* Dashboard principal */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardNew setUsername={setUsername} />
              </ProtectedRoute>
            }
          />

          {/* ✅ NOUVEAU : Administration (SUPER_ADMIN) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirection par défaut */}
          <Route
            path="/"
            element={<Navigate to={username ? '/dashboard' : '/auth'} replace />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;