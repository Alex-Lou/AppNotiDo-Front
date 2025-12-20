import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import Sidebar from '../components/Sidebar/Sidebar';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import StatsCards from '../components/Dashboard/StatsCards';
import TaskFilters from '../components/Dashboard/TaskFilters';
import InAppNotifications from '../components/Dashboard/InAppNotifications';
import EmptyState from '../components/Dashboard/EmptyState';
import { useTasks } from '../hooks/useTasks';
import { useNotifications } from '../hooks/useNotifications';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import api from '../services/api';

function DashboardNew({ setUsername }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
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

      {/* Sidebar */}
      <Sidebar
        username={username}
        notificationPermission={notificationPermission}
        notificationsEnabled={notificationsEnabled}
        urgentTasks={urgentTasks}
        onRequestNotificationPermission={handleRequestNotificationPermission}
        onToggleNotifications={toggleNotifications}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="ml-72 min-h-screen px-10 py-10">
        <div className="mb-10">
          {/* Header */}
          <DashboardHeader username={username} />

          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Filters */}
          <TaskFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            onNewTask={handleNewTask}
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
          {filteredTasks.length === 0 ? (
            <EmptyState hasFilters={statusFilter !== 'ALL' || priorityFilter !== 'ALL'} />
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id} onDragOver={(e) => e.preventDefault()}>
                <TaskItem
                  task={task}
                  onUpdate={handleTaskUpdate}
                  onDelete={handleTaskDelete}
                  onDragStart={handleDragStart}
                  onDragEnter={(e, targetTaskId) => handleDragEnter(e, targetTaskId, filteredTasks)}
                  onDragEnd={() => handleDragEnd(filteredTasks)}
                  isDragging={draggedTaskId === task.id}
                  isDragOver={dragOverTaskId === task.id}
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