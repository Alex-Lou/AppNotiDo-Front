import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      console.log('Tasks from API', response.data); // ← pour voir si tags est là
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
    await api.post('/tasks', taskData);
    fetchTasks();
  };

  const handleTaskUpdate = async (taskId, taskData) => {
    console.log('Updating task:', taskId, 'with data:', taskData);
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      console.log('Update response:', response.data); // ← voir tags dans la réponse

      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, ...taskData } : task
        )
      );

      await fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      fetchTasks();
    }
  };

  const handleTaskDelete = async (taskId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
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

  return {
    tasks,
    setTasks,
    filteredTasks,
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
