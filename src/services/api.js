import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Intercepteur de RÉPONSE pour gérer les erreurs d'authentification
api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const method = error.config?.method?.toUpperCase();
    
    // Ne rediriger vers /auth que pour les erreurs 401
    // ou 403 sur GET (pas sur POST/PUT/DELETE qui peuvent être des erreurs de validation)
    if (status === 401 || (status === 403 && method === 'GET')) {
      localStorage.clear();
      window.location.href = '/auth';
    }
    
    return Promise.reject(error);
  }
);

export default api;