import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiPlus, FiCheck, FiClock, FiList, FiBell, FiBellOff, FiX } from 'react-icons/fi';
import api from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import ThemeToggle from '../components/ThemeToggle';
import { 
  requestNotificationPermission, 
  sendBrowserNotification, 
  checkTasksForNotifications 
} from '../services/notificationService';

function DashboardNew({ setUsername }) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    localStorage.getItem('notificationsEnabled') !== 'false'
  );
  const [inAppNotifications, setInAppNotifications] = useState([]);
  const notifiedTaskIdsRef = useRef(new Set());
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverTaskId, setDragOverTaskId] = useState(null);

  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length === 0 || !notificationsEnabled) return;

    const checkNotifications = async () => {
      const tasksToNotify = checkTasksForNotifications(tasks);
      
      for (const task of tasksToNotify) {
        if (notifiedTaskIdsRef.current.has(task.notificationKey || task.id)) continue;

        let notificationText;
        let notificationTitle;
        
        if (task.isStartReminder) {
          notificationTitle = '⏰ Temps de commencer';
          notificationText = `${task.title} (durée : ${task.estimatedDuration} min)`;
        } else if (task.isUrgent) {
          notificationTitle = '🚨 Échéance imminente';
          notificationText = `${task.title} - C'est maintenant !`;
        } else {
          const minutes = task.minutesRemaining ?? task.reminderMinutes;
          notificationTitle = '🔔 Rappel de tâche';
          notificationText = `${task.title} - Échéance dans ${minutes} min`;
        }

        addInAppNotification({
          id: `notif-${(task.notificationKey || task.id)}-${Date.now()}`,
          taskId: task.id,
          title: notificationTitle,
          message: notificationText,
          type: task.isStartReminder ? 'start' : task.isUrgent ? 'urgent' : 'reminder',
        });

        if (notificationPermission === 'granted') {
          sendBrowserNotification(notificationTitle, notificationText);
        }

        notifiedTaskIdsRef.current.add(task.notificationKey || task.id);

        if (task.minutesRemaining === 0 || task.isUrgent || task.notified === true) {
          try {
            await api.put(`/tasks/${task.id}`, { ...task, notified: true });
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la notification:', error);
          }
        }
      }

      if (tasksToNotify.length > 0) {
        fetchTasks();
      }
    };

    checkNotifications();
    const interval = setInterval(() => {
      checkNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [tasks, notificationPermission, notificationsEnabled]);

  useEffect(() => {
    applyFilters();
  }, [tasks, statusFilter, priorityFilter]);

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

  const applyFilters = () => {
    let filtered = [...tasks];
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }
    if (priorityFilter !== 'ALL') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }
    setFilteredTasks(filtered);
  };

  const handleRequestNotificationPermission = async () => {
    const permission = await requestNotificationPermission();
    setNotificationPermission(permission);
  };

  const toggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    localStorage.setItem('notificationsEnabled', newState);
  };

  const addInAppNotification = (notification) => {
    setInAppNotifications(prev => [...prev, notification]);
    setTimeout(() => {
      removeInAppNotification(notification.id);
    }, 8000);
  };

  const removeInAppNotification = (notificationId) => {
    setInAppNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleTaskCreated = async (taskData) => {
    await api.post('/tasks', taskData);
    fetchTasks();
    setShowTaskForm(false);
  };

  const handleTaskUpdate = async (taskId, taskData) => {
    console.log('Updating task:', taskId, 'with data:', taskData);
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      console.log('Update response:', response.data);
      
      notifiedTaskIdsRef.current.forEach(key => {
        if (String(key).startsWith(`${taskId}-`) || key === taskId) {
          notifiedTaskIdsRef.current.delete(key);
        }
      });
      
      // Forcer le rafraîchissement
      await fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    }
  };

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

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e, targetTaskId) => {
    e.preventDefault();
    if (draggedTaskId === null || draggedTaskId === targetTaskId) return;
    setDragOverTaskId(targetTaskId);

    setFilteredTasks((prev) => {
      const currentIndex = prev.findIndex((t) => t.id === draggedTaskId);
      const targetIndex = prev.findIndex((t) => t.id === targetTaskId);
      if (currentIndex === -1 || targetIndex === -1) return prev;

      const updated = [...prev];
      const [moved] = updated.splice(currentIndex, 1);
      updated.splice(targetIndex, 0, moved);
      return updated;
    });
  };

  const handleDragEnd = () => {
    if (draggedTaskId == null) {
      setDraggedTaskId(null);
      setDragOverTaskId(null);
      return;
    }

    setTasks((prev) => {
      const idsInNewOrder = filteredTasks.map((t) => t.id);
      const ordered = [...prev].sort(
        (a, b) => idsInNewOrder.indexOf(a.id) - idsInNewOrder.indexOf(b.id)
      );
      return ordered;
    });

    setDraggedTaskId(null);
    setDragOverTaskId(null);
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
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-cyan-200 via-teal-100 to-orange-200
        text-slate-700
        dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-amber-50
      "
    >
      {/* Notifications in-app */}
      {notificationsEnabled && (
        <div className="fixed left-6 bottom-6 z-50 space-y-3 max-w-sm">
          {inAppNotifications.map((notification) => (
            <div
              key={notification.id}
              className="relative flex items-start gap-3 rounded-2xl border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-100 to-teal-100 px-5 py-4 shadow-xl backdrop-blur-sm dark:border-amber-800/70 dark:bg-gradient-to-br dark:from-amber-950/80 dark:to-stone-950/80 dark:text-amber-50"
            >
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-200 to-teal-200 dark:bg-gradient-to-br dark:from-amber-900/60 dark:to-orange-900/60">
                  <FiBell className="text-cyan-700 dark:text-amber-300" size={20} />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="mb-1.5 text-sm font-bold text-slate-800 dark:text-amber-50">
                  {notification.title}
                </h4>
                <p className="text-xs leading-relaxed text-slate-700 dark:text-amber-100/80">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => removeInAppNotification(notification.id)}
                className="flex-shrink-0 rounded-full p-1.5 text-cyan-600 transition hover:bg-cyan-200 hover:text-cyan-800 dark:text-amber-300/70 dark:hover:bg-amber-900/60 dark:hover:text-amber-50"
              >
                <FiX size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Sidebar */}
      <aside
        className="
          fixed left-0 top-0 z-20 flex h-full w-72 flex-col
          border-r-2 border-cyan-300/60
          bg-gradient-to-b from-cyan-200 via-teal-200 to-orange-200
          px-7 py-7
          dark:border-amber-900/60 dark:bg-gradient-to-b dark:from-amber-950/80 dark:via-stone-950/90 dark:to-slate-950/80
        "
      >
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            <h1 className="bg-gradient-to-r from-cyan-700 via-teal-700 to-orange-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-amber-500 dark:via-orange-500 dark:to-rose-500">
              AppNotiDo
            </h1>
          </div>
          <p className="mt-2 text-sm font-medium text-slate-800/90 dark:text-amber-200/80">
            Organisez votre journée
          </p>
        </div>

        <div className="mb-8 rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-100 via-teal-100 to-orange-100 px-5 py-4 shadow-md dark:border-amber-800/70 dark:bg-gradient-to-br dark:from-amber-900/60 dark:via-stone-900/70 dark:to-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-teal-500 to-orange-500 text-base font-bold text-white shadow-md dark:from-amber-600 dark:via-orange-600 dark:to-rose-600">
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-amber-50">
                {username}
              </p>
              <p className="text-xs font-medium text-slate-800/80 dark:text-amber-200/70">
                Utilisateur actif
              </p>
            </div>
          </div>
        </div>

        {notificationPermission !== 'granted' && notificationsEnabled && (
          <div className="mb-5 rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-100 to-orange-100 px-4 py-4 text-amber-900 shadow-md dark:border-amber-700/70 dark:bg-gradient-to-br dark:from-amber-900/70 dark:to-orange-900/70 dark:text-amber-50">
            <div className="mb-3 flex items-start gap-2">
              <FiBell className="mt-0.5 text-amber-700 dark:text-amber-300" size={18} />
              <div className="flex-1">
                <p className="mb-1.5 text-sm font-bold text-amber-900 dark:text-amber-100">
                  Activer les notifications
                </p>
                <p className="text-xs leading-relaxed text-amber-800/90 dark:text-amber-200/80">
                  Recevez des alertes pour vos tâches importantes.
                </p>
              </div>
            </div>
            <button
              onClick={handleRequestNotificationPermission}
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:from-amber-400 hover:to-orange-400 dark:from-amber-600 dark:to-orange-600 dark:hover:from-amber-500 dark:hover:to-orange-500"
            >
              Autoriser
            </button>
          </div>
        )}

        {urgentTasks.length > 0 && (
          <div className="mb-5 rounded-2xl border-2 border-red-400/60 bg-gradient-to-br from-red-100 to-orange-100 px-4 py-4 text-red-900 shadow-md dark:border-red-700/70 dark:bg-gradient-to-br dark:from-red-900/70 dark:to-orange-900/70 dark:text-red-100">
            <div className="mb-1.5 flex items-center gap-2">
              <FiBell className="text-red-700 dark:text-red-300" size={18} />
              <span className="text-sm font-bold">
                {urgentTasks.length} tâche{urgentTasks.length > 1 ? 's' : ''} urgente{urgentTasks.length > 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-xs font-medium leading-relaxed text-red-800/90 dark:text-red-200/80">
              Priorité HAUTE - Échéance &lt; 1h
            </p>
          </div>
        )}

        <nav className="mt-4 flex-1 space-y-3">
          <button className="flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-100 to-teal-100 px-5 py-3.5 text-base font-bold text-cyan-900 shadow-md ring-2 ring-cyan-400/70 transition hover:from-cyan-200 hover:to-teal-200 hover:shadow-lg dark:bg-gradient-to-r dark:from-amber-900/60 dark:to-stone-900/60 dark:text-amber-50 dark:ring-amber-800/70 dark:hover:from-amber-900/80 dark:hover:to-stone-900/80">
            <FiList className="text-cyan-700 dark:text-amber-300" size={20} /> 
            <span>Toutes les tâches</span>
          </button>
        </nav>

        <div className="mt-6 space-y-3">
          <button
            onClick={toggleNotifications}
            className="flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-teal-100 to-emerald-100 px-5 py-3 text-sm font-bold text-teal-900 shadow-md ring-2 ring-teal-400/70 transition hover:from-teal-200 hover:to-emerald-200 hover:shadow-lg dark:bg-gradient-to-r dark:from-teal-900/60 dark:to-emerald-900/60 dark:text-amber-100 dark:ring-teal-800/70 dark:hover:from-teal-900/80 dark:hover:to-emerald-900/80"
            title={notificationsEnabled ? 'Désactiver les notifications' : 'Activer les notifications'}
          >
            <span>Notifications</span>
            <div className="flex items-center gap-1.5">
              {notificationsEnabled ? (
                <FiBell className="text-teal-700 dark:text-amber-300" size={18} />
              ) : (
                <FiBellOff className="text-teal-500 dark:text-stone-500" size={18} />
              )}
            </div>
          </button>

          <div className="pointer-events-auto">
            <ThemeToggle />
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-rose-700 transition hover:bg-gradient-to-r hover:from-rose-100 hover:to-orange-100 hover:shadow-md dark:text-rose-300 dark:hover:bg-gradient-to-r dark:hover:from-rose-900/60 dark:hover:to-orange-900/60"
          >
            <FiLogOut size={18} /> 
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="ml-72 min-h-screen px-10 py-10">
        <div className="mb-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-amber-50">
                Bonjour, {username} <span className="align-middle">👋</span>
              </h2>
              <p className="mt-2 text-base font-medium text-slate-700/90 dark:text-amber-200/80">
                Voici un aperçu de vos tâches pour aujourd'hui.
              </p>
            </div>
          </div>

          {/* Cartes de stats */}
          <div className="mb-10 grid grid-cols-4 gap-5">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 px-6 py-5 shadow-lg ring-2 ring-slate-400/50 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80 dark:ring-stone-700/70">
              <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:bg-gradient-to-br dark:from-stone-800/60 dark:to-slate-800/60" />
              <p className="text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-amber-200/80">
                Total
              </p>
              <p className="mt-3 text-4xl font-bold text-slate-900 dark:text-amber-50">
                {stats.total}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-amber-300/70">
                Tâches enregistrées
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-100 to-teal-200 px-6 py-5 shadow-lg ring-2 ring-cyan-400/60 dark:bg-gradient-to-br dark:from-cyan-900/70 dark:to-teal-900/70 dark:ring-cyan-800/70">
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-200 to-teal-300 dark:bg-gradient-to-br dark:from-cyan-800/60 dark:to-teal-800/60" />
              <p className="text-sm font-bold uppercase tracking-wide text-cyan-900 dark:text-cyan-200">
                À faire
              </p>
              <p className="mt-3 text-4xl font-bold text-cyan-900 dark:text-cyan-50">
                {stats.todo}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-cyan-800 dark:text-cyan-300/80">
                En attente
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 px-6 py-5 shadow-lg ring-2 ring-orange-400/60 dark:bg-gradient-to-br dark:from-orange-900/70 dark:to-amber-900/70 dark:ring-orange-800/70">
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 dark:bg-gradient-to-br dark:from-orange-800/60 dark:to-amber-800/60" />
              <p className="text-sm font-bold uppercase tracking-wide text-orange-900 dark:text-orange-200">
                En cours
              </p>
              <p className="mt-3 text-4xl font-bold text-orange-900 dark:text-orange-50">
                {stats.inProgress}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-orange-800 dark:text-orange-300/80">
                En traitement
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-200 px-6 py-5 shadow-lg ring-2 ring-teal-400/60 dark:bg-gradient-to-br dark:from-teal-900/70 dark:to-emerald-900/70 dark:ring-teal-800/70">
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-teal-200 to-emerald-300 dark:bg-gradient-to-br dark:from-teal-800/60 dark:to-emerald-800/60" />
              <p className="text-sm font-bold uppercase tracking-wide text-teal-900 dark:text-teal-200">
                Terminées
              </p>
              <p className="mt-3 text-4xl font-bold text-teal-900 dark:text-teal-50">
                {stats.done}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-teal-800 dark:text-teal-300/80">
                Complétées
              </p>
            </div>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-orange-500 px-7 py-3.5 text-base font-bold text-white shadow-lg transition hover:shadow-xl hover:from-cyan-400 hover:via-teal-400 hover:to-orange-400 dark:from-amber-600 dark:via-orange-600 dark:to-rose-600 dark:hover:from-amber-500 dark:hover:via-orange-500 dark:hover:to-rose-500"
            >
              <FiPlus size={20} /> 
              <span>Nouvelle tâche</span>
            </button>

            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border-2 border-cyan-400/70 bg-gradient-to-br from-cyan-50 to-teal-50 px-5 py-3 text-sm font-bold text-slate-800 shadow-md outline-none ring-cyan-400/60 transition focus:ring-2 hover:border-cyan-500 dark:border-stone-700/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80 dark:text-amber-50 dark:ring-amber-700/60 dark:hover:border-stone-600 [&>option]:bg-white [&>option]:text-slate-800 dark:[&>option]:bg-stone-800 dark:[&>option]:text-amber-50"
              >
                <option value="ALL">📋 Tous les statuts</option>
                <option value="TODO">📝 À faire</option>
                <option value="IN_PROGRESS">⏳ En cours</option>
                <option value="DONE">✅ Terminé</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="rounded-xl border-2 border-orange-400/70 bg-gradient-to-br from-orange-50 to-amber-50 px-5 py-3 text-sm font-bold text-slate-800 shadow-md outline-none ring-orange-400/60 transition focus:ring-2 hover:border-orange-500 dark:border-stone-700/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80 dark:text-amber-50 dark:ring-amber-700/60 dark:hover:border-stone-600 [&>option]:bg-white [&>option]:text-slate-800 dark:[&>option]:bg-stone-800 dark:[&>option]:text-amber-50"
              >
                <option value="ALL">🎯 Toutes priorités</option>
                <option value="LOW">🟢 Basse</option>
                <option value="MEDIUM">🟡 Moyenne</option>
                <option value="HIGH">🔴 Haute</option>
              </select>
            </div>
          </div>
        </div>

        {showTaskForm && (
          <div className="mb-8 rounded-2xl border-2 border-teal-400/60 bg-gradient-to-br from-teal-50 to-cyan-50 p-6 shadow-lg dark:border-stone-800/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80">
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>
        )}

        {/* Liste des tâches */}
        <div className="space-y-4 pb-12">
          {filteredTasks.length === 0 ? (
            <div className="rounded-2xl border-2 border-slate-400/50 bg-gradient-to-br from-slate-100 to-slate-200 p-12 text-center shadow-lg dark:border-stone-800/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80">
              <p className="text-base font-semibold text-slate-700 dark:text-amber-300/80">
                {tasks.length === 0
                  ? "Aucune tâche pour le moment. Créez-en une ! 🚀"
                  : "Aucune tâche ne correspond aux filtres sélectionnés."}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                onDragOver={(e) => e.preventDefault()}
              >
                <TaskItem
                  task={task}
                  onUpdate={handleTaskUpdate}
                  onDelete={handleTaskDelete}
                  onDragStart={handleDragStart}
                  onDragEnter={handleDragEnter}
                  onDragEnd={handleDragEnd}
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