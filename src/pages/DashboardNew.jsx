import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import Sidebar from '../components/Sidebar/Sidebar';
import RightSidebar from '../components/Dashboard/RightSidebar';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import StatsCards from '../components/Dashboard/StatsCards';
import TaskFilters from '../components/Dashboard/TaskFilters';
import InAppNotifications from '../components/Dashboard/InAppNotifications';
import EmptyState from '../components/Dashboard/EmptyState';
import { useTasks } from '../hooks/useTasks';
import { useNotifications } from '../hooks/useNotifications';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { useExport } from '../hooks/useExport';
import { useQuickViews } from '../hooks/useQuickViews';
import api from '../services/api';

function DashboardNew({ setUsername }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [activeQuickView, setActiveQuickView] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  // Custom hooks
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
    urgentTasks,
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

  const handleNewTask = () => {
    setShowTaskForm(!showTaskForm);
  };

  const onTaskCreated = async (taskData) => {
    await handleTaskCreated(taskData);
    setShowTaskForm(false);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredTasks, 'taches_appnotido');
  };

  const handleExportPDF = () => {
    exportToPDF(filteredTasks, stats, username, 'rapport_appnotido');
  };

  const handleStartEditing = (taskId) => {
    setEditingTaskId(taskId);
  };

  const handleTaskClick = (taskId) => {
    // Trouver l'élément TaskItem correspondant
    const taskElement = document.getElementById(`task-${taskId}`);
    if (taskElement) {
      // Scroll vers la tâche
      taskElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Ouvrir le mode édition après le scroll
      setTimeout(() => {
        setEditingTaskId(taskId);
      }, 500);
    }
  };

  const handleStatsCardClick = (status) => {
    setStatusFilter(status);
    setActiveQuickView(null); // Réinitialiser la vue rapide
  };

  const handleQuickViewClick = (viewId) => {
    // Si on clique sur la même vue, on la désactive
    if (activeQuickView === viewId) {
      setActiveQuickView(null);
    } else {
      setActiveQuickView(viewId);
      // Réinitialiser les filtres classiques
      setStatusFilter('ALL');
      setPriorityFilter('ALL');
      clearSearch();
    }
  };

  // Déterminer quelles tâches afficher
  const tasksToDisplay = activeQuickView 
    ? getTasksByView(activeQuickView)
    : filteredTasks;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-orange-200 text-slate-700 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-slate-700 dark:text-amber-300">
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-orange-200 text-slate-700 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-amber-50">
      {/* Notifications in-app */}
      <InAppNotifications
        notifications={inAppNotifications}
        onRemove={removeInAppNotification}
        enabled={notificationsEnabled}
      />

      {/* Sidebar Gauche */}
      <Sidebar
        username={username}
        notificationPermission={notificationPermission}
        notificationsEnabled={notificationsEnabled}
        urgentTasks={urgentTasks}
        onRequestNotificationPermission={handleRequestNotificationPermission}
        onToggleNotifications={toggleNotifications}
        onLogout={handleLogout}
        onQuickViewClick={handleQuickViewClick}
        activeQuickView={activeQuickView}
      />

      {/* Sidebar Droite */}
      <RightSidebar 
        stats={stats}
        tasks={tasks}
        urgentCount={urgentTasks.length}
        onTaskClick={handleTaskClick}
        onTaskDelete={handleTaskDelete}
      />

      {/* Main Content - Ajusté pour les deux sidebars */}
      <main className="ml-72 mr-80 min-h-screen px-10 py-10">
        <div className="mb-10">
          {/* Header */}
          <DashboardHeader username={username} />

          {/* Stats Cards */}
          <StatsCards 
            stats={stats}
            onFilterClick={handleStatsCardClick}
            activeFilter={statusFilter}
          />

          {/* Filters avec recherche et export */}
          <TaskFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            onNewTask={handleNewTask}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={clearSearch}
            searchResultCount={searchResultCount}
            totalCount={tasks.length}
            onExportCSV={handleExportCSV}
            onExportPDF={handleExportPDF}
          />
        </div>

        {/* Task Form */}
        {showTaskForm && (
          <div className="mb-8 rounded-2xl border-2 border-teal-400/60 bg-gradient-to-br from-teal-50 to-cyan-50 p-6 shadow-lg dark:border-stone-800/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80">
            <TaskForm onTaskCreated={onTaskCreated} />
          </div>
        )}

        {/* Task List */}
        <div className="space-y-4 pb-12">
          {tasksToDisplay.length === 0 ? (
            <EmptyState hasFilters={statusFilter !== 'ALL' || priorityFilter !== 'ALL' || hasActiveSearch || activeQuickView !== null} />
          ) : (
            tasksToDisplay.map((task) => (
              <div key={task.id} id={`task-${task.id}`} onDragOver={(e) => e.preventDefault()}>
                <TaskItem
                  task={task}
                  onUpdate={handleTaskUpdate}
                  onDelete={handleTaskDelete}
                  onDragStart={handleDragStart}
                  onDragEnter={(e, targetTaskId) => handleDragEnter(e, targetTaskId, tasksToDisplay)}
                  onDragEnd={() => handleDragEnd(tasksToDisplay)}
                  isDragging={draggedTaskId === task.id}
                  isDragOver={dragOverTaskId === task.id}
                  editingTaskId={editingTaskId}
                  onStartEditing={handleStartEditing}
                />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default DashboardNew;