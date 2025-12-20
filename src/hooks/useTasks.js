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
      console.error('Erreur:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.clear();
        if (setUsername) setUsername(null);
        navigate('/auth');
      }
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
    try {
      await api.post('/tasks', taskData);
      toast.success('✅ Tâche créée avec succès !');
      fetchTasks();
    } catch (error) {
      console.error('Erreur création tâche:', error);
      toast.error('❌ Erreur lors de la création de la tâche');
    }
  };

  const handleTaskUpdate = async (taskId, taskData) => {
    console.log('Updating task:', taskId, 'with data:', taskData);
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      console.log('Update response:', response.data);

      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, ...taskData } : task
        )
      );

      await fetchTasks();
      // Pas de toast ici car déjà géré dans useTimer pour le timer
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
      
      // Urgent si ≤ 5 minutes ou déjà échue
      return minutesRemaining <= 5;
    });
  };

  const getNonUrgentTasks = () => {
    const now = new Date();
    return filteredTasks.filter(task => {
      if (!task.dueDate) return true; // Pas d'échéance = pas urgent
      if (task.status === 'DONE') return true; // Terminé = afficher normalement
      
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
    searchResultCount: resultCount, // ← CORRIGÉ : utilise resultCount du hook useSearch
  };
};