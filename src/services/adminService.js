// src/services/adminService.js
import api from './api';

const adminService = {
    // ========================================
    // VÉRIFICATION
    // ========================================
    
    checkSuperAdmin: async () => {
        const response = await api.get('/admin/check');
        return response.data;
    },

    // ========================================
    // STATISTIQUES
    // ========================================
    
    getGlobalStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data;
    },

    // ========================================
    // UTILISATEURS
    // ========================================
    
    getAllUsers: async (page = 0, size = 20, search = '') => {
        const params = new URLSearchParams({ page, size });
        if (search) params.append('search', search);
        const response = await api.get(`/admin/users?${params}`);
        return response.data;
    },

    getUserDetails: async (userId) => {
        const response = await api.get(`/admin/users/${userId}`);
        return response.data;
    },

    updateUserGlobalRole: async (userId, globalRole) => {
        const response = await api.put(`/admin/users/${userId}/role`, { globalRole });
        return response.data;
    },

    deleteUser: async (userId) => {
        await api.delete(`/admin/users/${userId}`);
    },

    getUserProjects: async (userId) => {
        const response = await api.get(`/admin/users/${userId}/projects`);
        return response.data;
    },

    // ========================================
    // PROJETS
    // ========================================
    
    getAllProjects: async (page = 0, size = 20, search = '') => {
        const params = new URLSearchParams({ page, size });
        if (search) params.append('search', search);
        const response = await api.get(`/admin/projects?${params}`);
        return response.data;
    },

    getProjectDetails: async (projectId) => {
        const response = await api.get(`/admin/projects/${projectId}`);
        return response.data;
    },

    getProjectMembers: async (projectId) => {
        const response = await api.get(`/admin/projects/${projectId}/members`);
        return response.data;
    },

    deleteProject: async (projectId) => {
        await api.delete(`/admin/projects/${projectId}`);
    }
};

export default adminService;