import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import api from '../services/api';

export const useTaskSuggestions = (onTasksUpdated) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      
      const isoDate = yesterday.toISOString().slice(0, 10);

      const response = await api.get('/tasks/suggestions/by-date', {
        params: { date: isoDate },
      });
      
      setSuggestions(response.data);
      
      if (response.data.length > 0) {
        setShowModal(true);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const moveTasksToToday = async (taskIds) => {
    try {
      await api.post('/tasks/suggestions/move-to-today', taskIds);
      
      toast.success(`${taskIds.length} tâche${taskIds.length > 1 ? 's déplacées' : ' déplacée'} vers aujourd'hui ! 🎉`);
      setShowModal(false);
      
      if (onTasksUpdated) {
        onTasksUpdated();
      }
      
      return true;
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du déplacement des tâches');
      return false;
    }
  };

  return {
    suggestions,
    showModal,
    setShowModal,
    moveTasksToToday,
    fetchSuggestions, // ← AJOUTE ICI
    loading,
  };
};
