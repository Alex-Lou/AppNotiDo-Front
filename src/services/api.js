import axios from 'axios';

const api = axios.create({
  baseURL: '/api',  // ✅ Relatif maintenant, proxy Vite redirige vers :8080
  withCredentials: true,
});

// Intercepteur de RÉPONSE pour gérer les erreurs d'authentification
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token invalide/expiré → déconnecter et rediriger
      localStorage.clear();
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;
