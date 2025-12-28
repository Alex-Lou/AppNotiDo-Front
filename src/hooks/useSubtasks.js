// src/hooks/useSubtasks.js
import { useState, useCallback } from 'react';
import api from '../services/api';

export const useSubtasks = (taskId) => {
  const [subtasks, setSubtasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger les sous-tâches d'une tâche
  const fetchSubtasks = useCallback(async () => {
    if (!taskId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/tasks/${taskId}/subtasks`);
      setSubtasks(response.data);
    } catch (err) {
      console.error('Erreur chargement sous-tâches:', err);
      setError('Erreur lors du chargement des sous-tâches');
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  // Créer une sous-tâche
  const createSubtask = useCallback(async (title) => {
    console.log('=== CREATE SUBTASK START ===');
    console.log('taskId:', taskId);
    console.log('title:', title);
    
    if (!taskId) {
      console.log('ABORT: no taskId');
      return null;
    }
    
    if (!title || !title.trim()) {
      console.log('ABORT: no title');
      return null;
    }
    
    const payload = { title: title.trim() };
    const url = `/tasks/${taskId}/subtasks`;
    
    console.log('URL:', url);
    console.log('Payload:', payload);
    console.log('Calling api.post...');
    
    try {
      const response = await api.post(url, payload);
      console.log('SUCCESS Response:', response);
      setSubtasks(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error('FAILED Error:', err);
      console.error('Error response:', err.response);
      console.error('Error status:', err.response?.status);
      console.error('Error data:', err.response?.data);
      setError('Erreur lors de la création de la sous-tâche');
      return null;
    }
  }, [taskId]);

  // Toggle le statut d'une sous-tâche
  const toggleSubtask = useCallback(async (subtaskId) => {
    try {
      const response = await api.patch(`/subtasks/${subtaskId}/toggle`);
      setSubtasks(prev => 
        prev.map(s => s.id === subtaskId ? response.data : s)
      );
      return response.data;
    } catch (err) {
      console.error('Erreur toggle sous-tâche:', err);
      setError('Erreur lors de la mise à jour');
      return null;
    }
  }, []);

  // Mettre à jour une sous-tâche
  const updateSubtask = useCallback(async (subtaskId, data) => {
    try {
      const response = await api.put(`/subtasks/${subtaskId}`, data);
      setSubtasks(prev => 
        prev.map(s => s.id === subtaskId ? response.data : s)
      );
      return response.data;
    } catch (err) {
      console.error('Erreur mise à jour sous-tâche:', err);
      setError('Erreur lors de la mise à jour');
      return null;
    }
  }, []);

  // Supprimer une sous-tâche
  const deleteSubtask = useCallback(async (subtaskId) => {
    try {
      await api.delete(`/subtasks/${subtaskId}`);
      setSubtasks(prev => prev.filter(s => s.id !== subtaskId));
      return true;
    } catch (err) {
      console.error('Erreur suppression sous-tâche:', err);
      setError('Erreur lors de la suppression');
      return false;
    }
  }, []);

  // Réordonner les sous-tâches
  const reorderSubtasks = useCallback(async (subtaskIds) => {
    if (!taskId) return false;
    
    try {
      await api.put(`/tasks/${taskId}/subtasks/reorder`, subtaskIds);
      // Réordonner localement
      const reordered = subtaskIds.map(id => subtasks.find(s => s.id === id)).filter(Boolean);
      setSubtasks(reordered);
      return true;
    } catch (err) {
      console.error('Erreur réordonnancement:', err);
      setError('Erreur lors du réordonnancement');
      return false;
    }
  }, [taskId, subtasks]);

  // Calculer les stats
  const stats = {
    total: subtasks.length,
    completed: subtasks.filter(s => s.completed).length,
    pending: subtasks.filter(s => !s.completed).length,
    progress: subtasks.length > 0 
      ? Math.round((subtasks.filter(s => s.completed).length / subtasks.length) * 100)
      : 0
  };

  // Initialiser avec les sous-tâches de la tâche (si déjà chargées)
  const initializeSubtasks = useCallback((initialSubtasks) => {
    if (initialSubtasks && Array.isArray(initialSubtasks)) {
      setSubtasks(initialSubtasks);
    }
  }, []);

  return {
    subtasks,
    setSubtasks,
    loading,
    error,
    stats,
    fetchSubtasks,
    createSubtask,
    toggleSubtask,
    updateSubtask,
    deleteSubtask,
    reorderSubtasks,
    initializeSubtasks
  };
};