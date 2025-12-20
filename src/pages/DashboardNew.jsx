import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import Sidebar from '../components/Sidebar/Sidebar';
import RightSidebar from '../components/Dashboard/RightSidebar';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import DailyProgress from '../components/Dashboard/DailyProgress';
import StatsCards from '../components/Dashboard/StatsCards';
import TaskFilters from '../components/Dashboard/TaskFilters';
import InAppNotifications from '../components/Dashboard/InAppNotifications';
import EmptyState from '../components/Dashboard/EmptyState';
import { useTasks } from '../hooks/useTasks';
import { useNotifications } from '../hooks/useNotifications';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { useExport } from '../hooks/useExport';
import { useQuickViews } from '../hooks/useQuickViews';
import ProfileModal from '../components/Profile/ProfileModal';
import TaskItemSkeleton from '../components/Skeleton/TaskItemSkeleton';
import Skeleton from '../components/Skeleton/Skeleton';
import api from '../services/api';

function DashboardNew({ setUsername }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [activeQuickView, setActiveQuickView] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileEmail, setProfileEmail] = useState('');
  
  // State pour la section urgente (avec sauvegarde localStorage)
  const [isUrgentSectionOpen, setIsUrgentSectionOpen] = useState(() => {
    const saved = localStorage.getItem('urgentSectionOpen');
    return saved === null ? true : saved === 'true';
  });

  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  // Sauvegarder l'état de la section urgente
  useEffect(() => {
    localStorage.setItem('urgentSectionOpen', isUrgentSectionOpen);
  }, [isUrgentSectionOpen]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setDisplayName(res.data.displayName || res.data.username);
        setProfileEmail(res.data.email || '');
      } catch (e) {
        console.error('Erreur chargement profil:', e);
        setDisplayName(username);
      }
    };
    fetchProfile();
  }, [username]);

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
    const taskElement = document.getElementById(`task-${taskId}`);
    if (taskElement) {
      taskElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        setEditingTaskId(taskId);
      }, 500);
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

  // Fonction pour calculer les minutes restantes
  const getMinutesRemaining = (dueDate) => {
    if (!dueDate) return Infinity;
    const now = new Date();
    const due = new Date(dueDate);
    return Math.floor((due - now) / 60000);
  };

  // Séparer les tâches urgentes (≤ 5 min) et normales
  const baseTasksToDisplay = activeQuickView
    ? getTasksByView(activeQuickView)
    : filteredTasks;

  const urgentToDisplay = baseTasksToDisplay.filter(task => {
    if (!task.dueDate || task.status === 'DONE') return false;
    const minutesRemaining = getMinutesRemaining(task.dueDate);
    return minutesRemaining <= 5;
  });

  const normalToDisplay = baseTasksToDisplay.filter(task => {
    if (!task.dueDate) return true;
    if (task.status === 'DONE') return true;
    const minutesRemaining = getMinutesRemaining(task.dueDate);
    return minutesRemaining > 5;
  });

  const hasUrgentTasks = urgentToDisplay.length > 0;

  if (loading || !displayName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-orange-200 text-slate-700 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-amber-50">
        {/* Skeleton Sidebar */}
        <aside className="fixed left-0 top-0 z-20 flex h-full w-72 flex-col border-r-2 border-cyan-300/60 bg-gradient-to-b from-cyan-200 via-teal-200 to-orange-200 px-7 py-7 dark:border-amber-900/60 dark:bg-gradient-to-b dark:from-amber-950/80 dark:via-stone-950/90 dark:to-slate-950/80">
          <div className="mb-10">
            <Skeleton className="h-9 w-9 mb-3" variant="rounded-2xl" />
            <Skeleton className="h-8 w-40" />
          </div>
          <Skeleton className="h-24 w-full mb-8" variant="rounded-2xl" />
        </aside>

        {/* Contenu principal avec skeletons */}
        <main className="ml-72 mr-80 min-h-screen px-10 py-10">
          {/* Header skeleton */}
          <div className="mb-10">
            <Skeleton className="h-10 w-64 mb-6" />
            
            {/* Stats cards skeleton */}
            <div className="mb-6 grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-24" variant="rounded-2xl" />
              ))}
            </div>

            {/* Filters skeleton */}
            <Skeleton className="h-14 w-full" variant="rounded-xl" />
          </div>

          {/* Task list skeletons */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <TaskItemSkeleton key={i} />
            ))}
          </div>
        </main>

        {/* RightSidebar skeleton */}
        <aside className="fixed right-0 top-0 z-20 h-full w-80 border-l-2 border-cyan-300/60 bg-gradient-to-b from-cyan-200 via-teal-200 to-orange-200 px-6 py-7 dark:border-amber-900/60 dark:bg-gradient-to-b dark:from-amber-950/80 dark:via-stone-950/90 dark:to-slate-950/80">
          <Skeleton className="h-32 w-full mb-6" variant="rounded-2xl" />
          <Skeleton className="h-48 w-full" variant="rounded-2xl" />
        </aside>
      </div>
    );
  }

  const handleClearUrgentTasks = async (e) => {
    e.stopPropagation();
    
    if (!window.confirm(`Supprimer définitivement les ${urgentToDisplay.length} tâche(s) urgente(s) ?`)) {
      return;
    }

    const count = urgentToDisplay.length;

    try {
      await Promise.all(
        urgentToDisplay.map(task => api.delete(`/tasks/${task.id}`))
      );
      
      setTasks(prevTasks => 
        prevTasks.filter(task => 
          !urgentToDisplay.some(urgentTask => urgentTask.id === task.id)
        )
      );
      
      toast.success(`🗑️ ${count} tâche(s) urgente(s) supprimée(s)`);
      
      await fetchTasks();
    } catch (error) {
      console.error('Erreur suppression tâches urgentes:', error);
      toast.error('❌ Erreur lors de la suppression');
      fetchTasks();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-orange-200 text-slate-700 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-amber-50">
      <InAppNotifications
        notifications={inAppNotifications}
        onRemove={removeInAppNotification}
        enabled={notificationsEnabled}
      />

      <Sidebar
        username={username}
        displayName={displayName}
        notificationPermission={notificationPermission}
        notificationsEnabled={notificationsEnabled}
        urgentTasks={urgentTasks}
        onRequestNotificationPermission={handleRequestNotificationPermission}
        onToggleNotifications={toggleNotifications}
        onLogout={handleLogout}
        onQuickViewClick={handleQuickViewClick}
        activeQuickView={activeQuickView}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      <RightSidebar
        stats={stats}
        tasks={tasks}
        urgentCount={urgentTasks.length}
        onTaskClick={handleTaskClick}
        onTaskDelete={handleTaskDelete}
      />

      <main className="ml-72 mr-80 min-h-screen px-10 py-10">
        <div className="mb-10">
          <DashboardHeader username={displayName} />

          {/* DAILY PROGRESS - NOUVEAU */}
          <DailyProgress tasks={tasks} />

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

        {showTaskForm && (
          <div className="mb-8 rounded-2xl border-2 border-teal-400/60 bg-gradient-to-br from-teal-50 to-cyan-50 p-6 shadow-lg dark:border-stone-800/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80">
            <TaskForm onTaskCreated={onTaskCreated} />
          </div>
        )}

        <div className="space-y-4 pb-12">
          {/* SECTION URGENTE COLLAPSIBLE */}
          {hasUrgentTasks && (
            <div className="mb-8">
              <button
                onClick={() => setIsUrgentSectionOpen(!isUrgentSectionOpen)}
                className="group w-full mb-4 flex items-center justify-between gap-3 rounded-xl border-2 border-rose-400/60 bg-gradient-to-r from-rose-100 via-orange-100 to-red-100 px-5 py-3 shadow-lg transition-all hover:shadow-xl dark:border-rose-800/70 dark:bg-gradient-to-r dark:from-rose-950/60 dark:via-red-950/70 dark:to-orange-950/60"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-10 h-10">
                    <span className="absolute inset-0 animate-ping-slow opacity-40">
                      <span className="flex h-full w-full items-center justify-center text-2xl">⚠️</span>
                    </span>
                    <span className="absolute inset-0 animate-ping-slow opacity-30" style={{ animationDelay: '0.5s' }}>
                      <span className="flex h-full w-full items-center justify-center text-2xl">⚠️</span>
                    </span>
                    <span className="absolute inset-0 animate-ping-slow opacity-20" style={{ animationDelay: '1s' }}>
                      <span className="flex h-full w-full items-center justify-center text-2xl">⚠️</span>
                    </span>
                    <span className="relative z-10 text-2xl animate-pulse-warning">⚠️</span>
                  </div>

                  <div className="text-left">
                    <h2 className="text-base font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                      Urgent - À faire maintenant !
                    </h2>
                    <p className="text-xs font-medium text-rose-600/80 dark:text-rose-300/70">
                      {urgentToDisplay.length} tâche{urgentToDisplay.length > 1 ? 's' : ''} avec échéance imminente
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-sm font-bold text-white shadow-md dark:bg-rose-700">
                    {urgentToDisplay.length}
                  </div>

                  {!isUrgentSectionOpen && (
                    <button
                      onClick={handleClearUrgentTasks}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-700/20 text-rose-700 transition-all hover:bg-rose-600 hover:text-white hover:scale-110 dark:bg-rose-800/30 dark:text-rose-400 dark:hover:bg-rose-700 dark:hover:text-white"
                      title="Supprimer toutes les tâches urgentes"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}

                  <div className={`transition-transform duration-300 ${isUrgentSectionOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <svg className="h-5 w-5 text-rose-700 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isUrgentSectionOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-4 rounded-2xl border-2 border-rose-400/60 bg-gradient-to-br from-rose-50/80 via-orange-50/60 to-red-50/80 p-6 shadow-xl dark:border-rose-800/70 dark:bg-gradient-to-br dark:from-rose-950/40 dark:via-red-950/50 dark:to-orange-950/40">
                  {urgentToDisplay.map((task) => (
                    <div key={task.id} id={`task-${task.id}`} onDragOver={(e) => e.preventDefault()} className="animate-pulse-subtle">
                      <TaskItem
                        task={task}
                        onUpdate={handleTaskUpdate}
                        onDelete={handleTaskDelete}
                        onDragStart={handleDragStart}
                        onDragEnter={(e, targetTaskId) => handleDragEnter(e, targetTaskId, urgentToDisplay)}
                        onDragEnd={() => handleDragEnd(urgentToDisplay)}
                        isDragging={draggedTaskId === task.id}
                        isDragOver={dragOverTaskId === task.id}
                        editingTaskId={editingTaskId}
                        onStartEditing={handleStartEditing}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {isUrgentSectionOpen && (
                <div className="my-8 flex items-center gap-4">
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700"></div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Autres tâches</span>
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700"></div>
                </div>
              )}
            </div>
          )}

          {/* SECTION NORMALE */}
          {normalToDisplay.length === 0 && !hasUrgentTasks ? (
            <EmptyState hasFilters={statusFilter !== 'ALL' || priorityFilter !== 'ALL' || hasActiveSearch || activeQuickView !== null} />
          ) : (
            <div className="space-y-4">
              {normalToDisplay.map((task) => (
                <div key={task.id} id={`task-${task.id}`} onDragOver={(e) => e.preventDefault()}>
                  <TaskItem
                    task={task}
                    onUpdate={handleTaskUpdate}
                    onDelete={handleTaskDelete}
                    onDragStart={handleDragStart}
                    onDragEnter={(e, targetTaskId) => handleDragEnter(e, targetTaskId, normalToDisplay)}
                    onDragEnd={() => handleDragEnd(normalToDisplay)}
                    isDragging={draggedTaskId === task.id}
                    isDragOver={dragOverTaskId === task.id}
                    editingTaskId={editingTaskId}
                    onStartEditing={handleStartEditing}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {isProfileModalOpen && (
        <ProfileModal
          onClose={() => setIsProfileModalOpen(false)}
          initialEmail={profileEmail}
        />
      )}
    </div>
  );
}

export default DashboardNew;