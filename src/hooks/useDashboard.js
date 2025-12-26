// src/hooks/useDashboard.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from './useTasks';
import { useNotifications } from './useNotifications';
import { useDragAndDrop } from './useDragAndDrop';
import { useExport } from './useExport';
import { useQuickViews } from './useQuickViews';
import { useDashboardLogic } from './useDashboardLogic';
import { useUrgentTasks } from './useUrgentTasks';
import api from '../services/api';

// Clé localStorage pour la vue
const VIEW_MODE_STORAGE_KEY = 'appnotido-view-mode';

// Fonction pour récupérer la vue sauvegardée
const getSavedViewMode = () => {
  try {
    const saved = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
    if (saved && ['list', 'kanban', 'grid', 'calendar'].includes(saved)) {
      return saved;
    }
  } catch (error) {
    console.error('Erreur lecture viewMode localStorage:', error);
  }
  return 'list';
};

export const useDashboard = (setUsername) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [createTaskDefaultDate, setCreateTaskDefaultDate] = useState(null);
  const [activeQuickView, setActiveQuickView] = useState(null);
  const [timeTick, setTimeTick] = useState(Date.now());
  const [viewMode, setViewModeState] = useState(getSavedViewMode);

  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  const { displayName, profileEmail, isProfileModalOpen, setIsProfileModalOpen } =
    useDashboardLogic(username);

  const {
    tasks,
    setTasks,
    filteredTasks,
    loading,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    stats,
    urgentTasks: allUrgentTasks,
    fetchTasks,
    handleTaskCreated,
    handleTaskUpdate,
    handleTaskDelete,
    searchQuery,
    setSearchQuery,
    clearSearch,
    hasActiveSearch,
    searchResultCount,
  } = useTasks(setUsername);

  const {
    notificationPermission,
    notificationsEnabled,
    inAppNotifications,
    handleRequestNotificationPermission,
    toggleNotifications,
    removeInAppNotification,
  } = useNotifications(tasks, fetchTasks);

  const {
    draggedTaskId,
    dragOverTaskId,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  } = useDragAndDrop(tasks, setTasks);

  const { exportToCSV, exportToPDF } = useExport();
  const { getTasksByView } = useQuickViews(tasks);

  // Setter personnalisé pour viewMode avec sauvegarde localStorage
  const setViewMode = (newMode) => {
    try {
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, newMode);
    } catch (error) {
      console.error('Erreur sauvegarde viewMode localStorage:', error);
    }
    setViewModeState(newMode);
  };

  // Tick toutes les 30s pour forcer le recalcul urgent/échue
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTick(Date.now());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Quand editingTaskId change, charger la tâche à éditer
  useEffect(() => {
    if (editingTaskId) {
      const task = tasks.find(t => t.id === editingTaskId);
      if (task) {
        setTaskToEdit(task);
      }
    } else {
      setTaskToEdit(null);
    }
  }, [editingTaskId, tasks]);

  const baseTasksToDisplay = activeQuickView ? getTasksByView(activeQuickView) : filteredTasks;

  const { urgentTasks: urgentToDisplay, normalTasks: normalToDisplay } =
    useUrgentTasks(baseTasksToDisplay, timeTick);

  // Toutes les tâches à afficher (urgent + normal combinés pour Kanban/Grid)
  const allTasksToDisplay = [...urgentToDisplay, ...normalToDisplay];

  // Handlers
  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Erreur logout:', error);
    }
    localStorage.clear();
    if (setUsername) setUsername(null);
    navigate('/auth');
  };

  const onTaskCreated = async (taskData) => {
    await handleTaskCreated(taskData);
    setShowTaskForm(false);
  };

  const handleTaskClick = (taskId) => {
    const taskElement = document.getElementById(`task-${taskId}`);
    if (taskElement) {
      taskElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => setEditingTaskId(taskId), 500);
    }
  };

  const handleStatsCardClick = (status) => {
    setStatusFilter(status);
    setActiveQuickView(null);
  };

  const handleQuickViewClick = (viewId) => {
    if (activeQuickView === viewId) {
      setActiveQuickView(null);
    } else {
      setActiveQuickView(viewId);
      setStatusFilter('ALL');
      setPriorityFilter('ALL');
      clearSearch();
    }
  };

  // Ouvrir le modal d'édition
  const openEditModal = (taskId) => {
    setEditingTaskId(taskId);
    setIsCreatingTask(false);
    setCreateTaskDefaultDate(null);
  };

  // Fermer le modal d'édition/création
  const closeEditModal = () => {
    setEditingTaskId(null);
    setTaskToEdit(null);
    setIsCreatingTask(false);
    setCreateTaskDefaultDate(null);
  };

  // Ouvrir le modal de création avec une date par défaut (depuis calendrier)
  const openCreateModal = (defaultDate = null) => {
    setIsCreatingTask(true);
    setCreateTaskDefaultDate(defaultDate);
    setEditingTaskId(null);
    setTaskToEdit(null);
  };

  // Sauvegarder depuis le modal d'édition
  const handleEditModalSave = async (taskId, updatedTask) => {
    await handleTaskUpdate(taskId, updatedTask);
    closeEditModal();
  };

  // Créer depuis le modal de création
  const handleCreateModalSave = async (taskData) => {
    
    try {
      await handleTaskCreated(taskData);
      closeEditModal();
    } catch (error) {
      console.error('=== ERROR CREATE TASK ===');
      console.error('Error:', error);
      console.error('Response:', error.response);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      // Ne pas fermer le modal en cas d'erreur
    }
  };

  const hasFilters =
    statusFilter !== 'ALL' ||
    priorityFilter !== 'ALL' ||
    hasActiveSearch ||
    activeQuickView !== null;

  return {
    // State
    showTaskForm,
    setShowTaskForm,
    editingTaskId,
    setEditingTaskId,
    taskToEdit,
    isCreatingTask,
    createTaskDefaultDate,
    activeQuickView,
    username,
    displayName,
    profileEmail,
    isProfileModalOpen,
    setIsProfileModalOpen,
    loading,

    // View Mode
    viewMode,
    setViewMode,

    // Tasks
    tasks,
    setTasks,
    filteredTasks,
    urgentToDisplay,
    normalToDisplay,
    allTasksToDisplay,
    allUrgentTasks,
    stats,

    // Filters
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    searchQuery,
    setSearchQuery,
    clearSearch,
    hasActiveSearch,
    searchResultCount,
    hasFilters,

    // Notifications
    notificationPermission,
    notificationsEnabled,
    inAppNotifications,
    removeInAppNotification,

    // Drag & Drop
    draggedTaskId,
    dragOverTaskId,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,

    // Actions
    handleLogout,
    onTaskCreated,
    handleTaskUpdate,
    handleTaskDelete,
    handleTaskClick,
    handleStatsCardClick,
    handleQuickViewClick,
    handleRequestNotificationPermission,
    toggleNotifications,
    exportToCSV: () => exportToCSV(filteredTasks, 'taches_appnotido'),
    exportToPDF: () => exportToPDF(filteredTasks, stats, username, 'rapport_appnotido'),
    fetchTasks,

    // Edit/Create Modal
    openEditModal,
    openCreateModal,
    closeEditModal,
    handleEditModalSave,
    handleCreateModalSave,
  };
};