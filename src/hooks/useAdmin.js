// src/hooks/useAdmin.js
import { useState, useEffect, useCallback } from 'react';
import adminService from '../services/adminService';

export function useAdmin() {
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);

    // Vérifier si l'utilisateur est SUPER_ADMIN
    const checkAdmin = useCallback(async () => {
        try {
            setLoading(true);
            const result = await adminService.checkSuperAdmin();
            setIsSuperAdmin(result.isSuperAdmin);
        } catch (err) {
            console.error('Erreur vérification admin:', err);
            setIsSuperAdmin(false);
        } finally {
            setLoading(false);
        }
    }, []);

    // Charger les stats globales
    const loadStats = useCallback(async () => {
        try {
            const data = await adminService.getGlobalStats();
            setStats(data);
            setError(null);
        } catch (err) {
            console.error('Erreur chargement stats:', err);
            setError('Erreur lors du chargement des statistiques');
        }
    }, []);

    useEffect(() => {
        checkAdmin();
    }, [checkAdmin]);

    return {
        isSuperAdmin,
        loading,
        stats,
        error,
        loadStats,
        checkAdmin
    };
}

export function useAdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 20,
        totalPages: 0,
        totalElements: 0
    });

    const loadUsers = useCallback(async (page = 0, size = 20, search = '') => {
        try {
            setLoading(true);
            const data = await adminService.getAllUsers(page, size, search);
            setUsers(data.content);
            setPagination({
                page: data.number,
                size: data.size,
                totalPages: data.totalPages,
                totalElements: data.totalElements
            });
            setError(null);
        } catch (err) {
            console.error('Erreur chargement users:', err);
            setError('Erreur lors du chargement des utilisateurs');
        } finally {
            setLoading(false);
        }
    }, []);

    const updateUserRole = useCallback(async (userId, globalRole) => {
        try {
            await adminService.updateUserGlobalRole(userId, globalRole);
            await loadUsers(pagination.page, pagination.size);
        } catch (err) {
            console.error('Erreur update role:', err);
            throw err;
        }
    }, [loadUsers, pagination]);

    const deleteUser = useCallback(async (userId) => {
        try {
            await adminService.deleteUser(userId);
            await loadUsers(pagination.page, pagination.size);
        } catch (err) {
            console.error('Erreur delete user:', err);
            throw err;
        }
    }, [loadUsers, pagination]);

    return {
        users,
        loading,
        error,
        pagination,
        loadUsers,
        updateUserRole,
        deleteUser
    };
}

export function useAdminProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 20,
        totalPages: 0,
        totalElements: 0
    });

    const loadProjects = useCallback(async (page = 0, size = 20, search = '') => {
        try {
            setLoading(true);
            const data = await adminService.getAllProjects(page, size, search);
            setProjects(data.content);
            setPagination({
                page: data.number,
                size: data.size,
                totalPages: data.totalPages,
                totalElements: data.totalElements
            });
            setError(null);
        } catch (err) {
            console.error('Erreur chargement projects:', err);
            setError('Erreur lors du chargement des projets');
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteProject = useCallback(async (projectId) => {
        try {
            await adminService.deleteProject(projectId);
            await loadProjects(pagination.page, pagination.size);
        } catch (err) {
            console.error('Erreur delete project:', err);
            throw err;
        }
    }, [loadProjects, pagination]);

    return {
        projects,
        loading,
        error,
        pagination,
        loadProjects,
        deleteProject
    };
}