// src/hooks/useProjects.js
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import api from '../services/api';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null); // null = "Inbox" (tâches sans projet)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer tous les projets
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/projects');
      setProjects(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Erreur lors du chargement des projets');
    } finally {
      setLoading(false);
    }
  }, []);

  // Créer un projet
  const createProject = useCallback(async (projectData) => {
    try {
      const response = await api.post('/projects', projectData);
      setProjects(prev => [...prev, response.data]);
      toast.success(`📁 Projet "${response.data.name}" créé !`);
      return response.data;
    } catch (err) {
      console.error('Error creating project:', err);
      toast.error('❌ Erreur lors de la création du projet');
      throw err;
    }
  }, []);

  // Mettre à jour un projet
  const updateProject = useCallback(async (projectId, projectData) => {
    try {
      const response = await api.put(`/projects/${projectId}`, projectData);
      setProjects(prev => 
        prev.map(p => p.id === projectId ? response.data : p)
      );
      toast.success('✅ Projet mis à jour');
      return response.data;
    } catch (err) {
      console.error('Error updating project:', err);
      toast.error('❌ Erreur lors de la mise à jour');
      throw err;
    }
  }, []);

  // Archiver un projet
  const archiveProject = useCallback(async (projectId) => {
    try {
      await api.post(`/projects/${projectId}/archive`);
      setProjects(prev => prev.filter(p => p.id !== projectId));
      
      // Si le projet archivé était actif, revenir à l'inbox
      if (activeProject?.id === projectId) {
        setActiveProject(null);
      }
      
      toast.success('📦 Projet archivé');
    } catch (err) {
      console.error('Error archiving project:', err);
      toast.error('❌ Erreur lors de l\'archivage');
      throw err;
    }
  }, [activeProject]);

  // Supprimer un projet
  const deleteProject = useCallback(async (projectId, withTasks = false) => {
    try {
      const endpoint = withTasks 
        ? `/projects/${projectId}/with-tasks`
        : `/projects/${projectId}`;
      
      await api.delete(endpoint);
      setProjects(prev => prev.filter(p => p.id !== projectId));
      
      // Si le projet supprimé était actif, revenir à l'inbox
      if (activeProject?.id === projectId) {
        setActiveProject(null);
      }
      
      toast.success('🗑️ Projet supprimé');
    } catch (err) {
      console.error('Error deleting project:', err);
      toast.error('❌ Erreur lors de la suppression');
      throw err;
    }
  }, [activeProject]);

  // Sélectionner un projet actif
  const selectProject = useCallback((project) => {
    setActiveProject(project);
  }, []);

  // Revenir à l'inbox (tâches sans projet)
  const goToInbox = useCallback(() => {
    setActiveProject(null);
  }, []);

  // Charger les projets au montage
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    activeProject,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    archiveProject,
    deleteProject,
    selectProject,
    goToInbox
  };
}