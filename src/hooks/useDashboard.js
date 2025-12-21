// src/hooks/useDashboard.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from './useTasks';
import { useNotifications } from './useNotifications';
import { useDragAndDrop } from './useDragAndDrop';
import { useExport } from './useExport';
import { useQuickViews } from './useQuickViews';
import { useDashboardLogic } from './useDashboardLogic';
import { useUrgentTasks } from './useUrgentTasks';
import api from '../services/api';

export const useDashboard = (setUsername) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [activeQuickView, setActiveQuickView] = useState(null);

  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  const { displayName, profileEmail, isProfileModalOpen, setIsProfileModalOpen } = useDashboardLogic(username);

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

  const baseTasksToDisplay = activeQuickView ? getTasksByView(activeQuickView) : filteredTasks;
  const { urgentTasks: urgentToDisplay, normalTasks: normalToDisplay } = useUrgentTasks(baseTasksToDisplay);

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

  const hasFilters = statusFilter !== 'ALL' || priorityFilter !== 'ALL' || hasActiveSearch || activeQuickView !== null;

  return {
    // State
    showTaskForm,
    setShowTaskForm,
    editingTaskId,
    setEditingTaskId,
    activeQuickView,
    username,
    displayName,
    profileEmail,
    isProfileModalOpen,
    setIsProfileModalOpen,
    loading,

    // Tasks
    tasks,
    setTasks,
    filteredTasks,
    urgentToDisplay,
    normalToDisplay,
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
  };
};
