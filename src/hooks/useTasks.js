// src/hooks/useTasks.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../services/api';
import { useSearch } from './useSearch';

export const useTasks = (setUsername) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const navigate = useNavigate();

  const {
    searchQuery,
    setSearchQuery,
    searchedTasks,
    clearSearch,
    hasActiveSearch,
    resultCount,
  } = useSearch(tasks);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.content);
    } catch (error) {
      console.error('Erreur fetchTasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters AND search
  const applyFilters = () => {
    let filtered = [...searchedTasks];
    
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }
    if (priorityFilter !== 'ALL') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }
    setFilteredTasks(filtered);
  };

  // Task operations
  const handleTaskCreated = async (taskData) => {
    console.log('=== API POST /tasks ===');
    console.log('Sending:', JSON.stringify(taskData, null, 2));
    
    try {
      const response = await api.post('/tasks', taskData);
      console.log('SUCCESS Response:', response);
      toast.success('✅ Tâche créée avec succès !');
      await fetchTasks();
    } catch (error) {
      console.error('=== API ERROR ===');
      console.error('Full error:', error);
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
      console.error('Response headers:', error.response?.headers);
      
      alert(`ERREUR API: ${error.response?.status} - ${JSON.stringify(error.response?.data)}`);
      
      toast.error('❌ Erreur lors de la création de la tâche');
      throw error;
    }
  };

  const handleTaskUpdate = async (taskId, taskData) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      
      // Fusionner la réponse du serveur avec les données envoyées
      // pour s'assurer que timerEnabled et reactivable sont préservés
      const updatedTask = {
        ...response.data,
        timerEnabled: taskData.timerEnabled,
        reactivable: taskData.reactivable
      };
      
      // Mise à jour locale immédiate
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? updatedTask : task
        )
      );

      // Ne pas refetch immédiatement pour éviter d'écraser les valeurs
      // Le refetch se fera au prochain chargement de page
      
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('❌ Erreur lors de la mise à jour');
      fetchTasks();
    }
  };

  const handleTaskDelete = async (taskId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) return;
    
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success('🗑️ Tâche supprimée');
      fetchTasks();
    } catch (error) {
      console.error('Erreur suppression:', error);
      toast.error('❌ Erreur lors de la suppression');
    }
  };

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'TODO').length,
    inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    done: tasks.filter(t => t.status === 'DONE').length,
  };

  const urgentTasks = tasks.filter(task => {
    if (!task.dueDate || task.status === 'DONE' || task.priority !== 'HIGH') return false;
    const timeUntilDue = new Date(task.dueDate) - new Date();
    return timeUntilDue > 0 && timeUntilDue < 3600000;
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tasks, statusFilter, priorityFilter, searchedTasks]);

  const getUrgentTasks = () => {
    const now = new Date();
    return filteredTasks.filter(task => {
      if (!task.dueDate || task.status === 'DONE') return false;
      
      const dueDate = new Date(task.dueDate);
      const minutesRemaining = Math.floor((dueDate - now) / 60000);
      
      return minutesRemaining <= 5;
    });
  };

  const getNonUrgentTasks = () => {
    const now = new Date();
    return filteredTasks.filter(task => {
      if (!task.dueDate) return true;
      if (task.status === 'DONE') return true;
      
      const dueDate = new Date(task.dueDate);
      const minutesRemaining = Math.floor((dueDate - now) / 60000);
      
      return minutesRemaining > 5;
    });
  };

  return {
    tasks,
    setTasks,
    filteredTasks,
    urgentTasksInList: getUrgentTasks(),
    nonUrgentTasks: getNonUrgentTasks(),
    loading,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    stats,
    urgentTasks,
    fetchTasks,
    handleTaskCreated,
    handleTaskUpdate,
    handleTaskDelete,
    searchQuery,
    setSearchQuery,
    clearSearch,
    hasActiveSearch,
    searchResultCount: resultCount,
  };
};