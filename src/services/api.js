import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

// Intercepteur pour gérer les erreurs d'authentification
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