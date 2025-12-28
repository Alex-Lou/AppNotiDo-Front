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

  // Fonction pour notifier les changements aux notifications
  const notifyChange = () => {
    window.dispatchEvent(new CustomEvent('notifications-update'));
  };

  // Fetch tasks
  const fetchTasks = async () => {
    console.log("=== fetchTasks CALLED ===");
    try {
      const response = await api.get('/tasks');
      console.log("fetchTasks response:", response.data);
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
    console.log('=== handleTaskCreated CALLED ===');
    console.log('Sending:', JSON.stringify(taskData, null, 2));
    
    try {
      console.log(">>> AVANT api.post /tasks");
      const response = await api.post('/tasks', taskData);
      console.log(">>> APRÈS api.post, response:", response);
      toast.success('✅ Tâche créée avec succès !');
      await fetchTasks();
      notifyChange();
    } catch (error) {
      console.error('=== API ERROR (CREATE) ===');
      console.error('Full error:', error);
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
      
      alert(`ERREUR API: ${error.response?.status} - ${JSON.stringify(error.response?.data)}`);
      
      toast.error('❌ Erreur lors de la création de la tâche');
      throw error;
    }
  };

  const handleTaskUpdate = async (taskId, taskData) => {
    console.log("=== handleTaskUpdate CALLED ===");
    console.log("taskId:", taskId);
    console.log("taskData:", JSON.stringify(taskData, null, 2));
    
    try {
      console.log(">>> AVANT api.put /tasks/" + taskId);
      const response = await api.put(`/tasks/${taskId}`, taskData);
      console.log(">>> APRÈS api.put, response:", response);
      console.log(">>> response.data:", response.data);
      
      // Fusionner la réponse du serveur avec les données envoyées
      // pour s'assurer que timerEnabled et reactivable sont préservés
      const updatedTask = {
        ...response.data,
        timerEnabled: taskData.timerEnabled,
        reactivable: taskData.reactivable
      };
      
      console.log(">>> updatedTask après fusion:", updatedTask);
      
      // Mise à jour locale immédiate
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? updatedTask : task
        )
      );

      console.log(">>> Mise à jour locale effectuée");
      notifyChange();
      console.log(">>> notifyChange appelé");
      
    } catch (error) {
      console.error('=== API ERROR (UPDATE) ===');
      console.error('Full error:', error);
      console.error('Error message:', error.message);
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
      toast.error('❌ Erreur lors de la mise à jour');
      fetchTasks();
    }
  };

  const handleTaskDelete = async (taskId, skipConfirm = false) => {
    console.log("=== handleTaskDelete CALLED ===");
    console.log("taskId:", taskId, "skipConfirm:", skipConfirm);
    
    try {
      console.log(">>> AVANT api.delete /tasks/" + taskId);
      await api.delete(`/tasks/${taskId}`);
      console.log(">>> APRÈS api.delete");
      
      if (skipConfirm) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      } else {
        toast.success('🗑️ Tâche supprimée');
        fetchTasks();
      }
      
      notifyChange();
      
    } catch (error) {
      console.error('=== API ERROR (DELETE) ===');
      console.error('Full error:', error);
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