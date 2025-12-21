// src/pages/DashboardNew.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/Task/TaskForm';
import Sidebar from '../components/Sidebar/Sidebar';
import RightSidebar from '../components/Dashboard/RightSidebar';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import StatsCards from '../components/Dashboard/StatsCards';
import TaskFilters from '../components/Dashboard/TaskFilters';
import InAppNotifications from '../components/Dashboard/InAppNotifications';
import EmptyState from '../components/Dashboard/EmptyState';
import UrgentTasksSection from '../components/Dashboard/UrgentTasksSection';
import TaskList from '../components/Dashboard/TaskList';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import ProfileModal from '../components/Skeleton/ProfileModal';
import DashboardSkeleton from '../components/Skeleton/DashboardSkeleton';
import { useTasks } from '../hooks/useTasks';
import { useNotifications } from '../hooks/useNotifications';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { useExport } from '../hooks/useExport';
import { useQuickViews } from '../hooks/useQuickViews';
import { useDashboardLogic } from '../hooks/useDashboardLogic';
import { useUrgentTasks } from '../hooks/useUrgentTasks';
import api from '../services/api';

function DashboardNew({ setUsername }) {
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

  if (loading || !displayName) {
    return <DashboardSkeleton />;
  }

  const hasFilters = statusFilter !== 'ALL' || priorityFilter !== 'ALL' || hasActiveSearch || activeQuickView !== null;

  return (
    <DashboardLayout
      notifications={
        <InAppNotifications
          notifications={inAppNotifications}
          onRemove={removeInAppNotification}
          enabled={notificationsEnabled}
        />
      }
      sidebar={
        <Sidebar
          username={username}
          displayName={displayName}
          notificationPermission={notificationPermission}
          notificationsEnabled={notificationsEnabled}
          urgentTasks={allUrgentTasks}
          onRequestNotificationPermission={handleRequestNotificationPermission}
          onToggleNotifications={toggleNotifications}
          onLogout={handleLogout}
          onQuickViewClick={handleQuickViewClick}
          activeQuickView={activeQuickView}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
        />
      }
      rightSidebar={
        <RightSidebar
          stats={stats}
          tasks={tasks}
          urgentCount={allUrgentTasks.length}
          onTaskClick={handleTaskClick}
          onTaskDelete={handleTaskDelete}
        />
      }
    >
      <div className="mb-10">
        <DashboardHeader username={displayName} />

        <StatsCards
          stats={stats}
          onFilterClick={handleStatsCardClick}
          activeFilter={statusFilter}
        />

        <TaskFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          onNewTask={() => setShowTaskForm(!showTaskForm)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={clearSearch}
          searchResultCount={searchResultCount}
          totalCount={tasks.length}
          onExportCSV={() => exportToCSV(filteredTasks, 'taches_appnotido')}
          onExportPDF={() => exportToPDF(filteredTasks, stats, username, 'rapport_appnotido')}
        />
      </div>

      {showTaskForm && (
        <div className="mb-8 rounded-2xl border-2 border-teal-400/60 bg-gradient-to-br from-teal-50 to-cyan-50 p-6 shadow-lg dark:border-stone-800/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80">
          <TaskForm onTaskCreated={onTaskCreated} />
        </div>
      )}

      <div className="space-y-4 pb-12">
        <UrgentTasksSection
          urgentTasks={urgentToDisplay}
          draggedTaskId={draggedTaskId}
          dragOverTaskId={dragOverTaskId}
          editingTaskId={editingTaskId}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete}
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragEnd={handleDragEnd}
          onStartEditing={setEditingTaskId}
          setTasks={setTasks}
          fetchTasks={fetchTasks}
        />

        {normalToDisplay.length === 0 && urgentToDisplay.length === 0 ? (
          <EmptyState hasFilters={hasFilters} />
        ) : (
          <TaskList
            tasks={normalToDisplay}
            draggedTaskId={draggedTaskId}
            dragOverTaskId={dragOverTaskId}
            editingTaskId={editingTaskId}
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
            onStartEditing={setEditingTaskId}
          />
        )}
      </div>

      {isProfileModalOpen && (
        <ProfileModal
          onClose={() => setIsProfileModalOpen(false)}
          initialEmail={profileEmail}
        />
      )}
    </DashboardLayout>
  );
}

export default DashboardNew;
