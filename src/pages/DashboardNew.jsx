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
    await api.put(`/tasks/${taskId}`, taskData);
    notifiedTaskIdsRef.current.forEach(key => {
      if (String(key).startsWith(`${taskId}-`) || key === taskId) {
        notifiedTaskIdsRef.current.delete(key);
      }
    });
    fetchTasks();
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
      <div className="min-h-screen bg-gradient-to-b from-cyan-300 via-teal-200 to-orange-300 text-slate-700 dark:bg-slate-950 dark:text-slate-100 flex items-center justify-center">
        <div className="text-xl font-medium text-slate-700 dark:text-slate-300">
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-b
        from-cyan-300 via-teal-200 to-orange-300
        text-slate-700
        dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-amber-50
      "
    >
      {/* Notifications in-app */}
      {notificationsEnabled && (
        <div className="fixed left-6 bottom-6 z-50 space-y-3 max-w-sm">
          {inAppNotifications.map((notification) => (
            <div
              key={notification.id}
              className="relative flex items-start gap-3 rounded-2xl border border-cyan-300 bg-cyan-50 px-4 py-3 shadow-xl dark:border-amber-800 dark:bg-stone-950/95 dark:text-amber-50"
            >
              <div className="flex-shrink-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-100 dark:bg-amber-500/20">
                  <FiBell className="text-cyan-600 dark:text-amber-300" size={18} />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="mb-1 text-xs font-semibold text-slate-700 dark:text-amber-50">
                  {notification.title}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-amber-100/80">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => removeInAppNotification(notification.id)}
                className="flex-shrink-0 rounded-full p-1 text-cyan-500 transition hover:bg-cyan-100 hover:text-cyan-700 dark:text-amber-300/70 dark:hover:bg-amber-900/60 dark:hover:text-amber-50"
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Sidebar */}
      <aside
        className="
          fixed left-0 top-0 z-20 flex h-full w-64 flex-col
          border-r border-cyan-300/50
          bg-gradient-to-b from-cyan-100 via-teal-100 to-orange-100
          px-6 py-6
          dark:border-amber-900 dark:from-amber-950 dark:via-stone-950 dark:to-slate-950
        "
      >
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <h1 className="bg-gradient-to-r from-cyan-600 via-teal-600 to-orange-500 bg-clip-text text-xl font-semibold text-transparent">
              AppNotiDo
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-700/80 dark:text-amber-200/80">
            Organisez votre journée
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-cyan-300 bg-gradient-to-r from-cyan-100 via-teal-100 to-orange-100 px-4 py-3 dark:border-amber-800 dark:from-amber-900 dark:via-rose-900/80 dark:to-stone-950">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-teal-500 to-orange-500 text-sm font-bold text-white">
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-amber-50">
                {username}
              </p>
              <p className="text-[11px] text-slate-700/80 dark:text-amber-200/80">
                Utilisateur actif
              </p>
            </div>
          </div>
        </div>

        {notificationPermission !== 'granted' && notificationsEnabled && (
          <div className="mb-4 rounded-2xl border border-amber-300 bg-amber-100 px-3 py-3 text-amber-900 dark:border-amber-700 dark:bg-amber-900/70 dark:text-amber-50">
            <div className="mb-2 flex items-start gap-2">
              <FiBell className="mt-0.5 text-amber-600 dark:text-amber-300" />
              <div className="flex-1">
                <p className="mb-1 text-xs font-semibold text-amber-900 dark:text-amber-100">
                  Activer les notifications
                </p>
                <p className="text-[11px] text-amber-800/90 dark:text-amber-200/90">
                  Recevez des alertes pour vos tâches importantes.
                </p>
              </div>
            </div>
            <button
              onClick={handleRequestNotificationPermission}
              className="w-full rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-400"
            >
              Autoriser
            </button>
          </div>
        )}

        {urgentTasks.length > 0 && (
          <div className="mb-4 rounded-2xl border border-red-300 bg-red-100 px-3 py-3 text-red-900 dark:border-red-700 dark:bg-red-900/70 dark:text-red-50">
            <div className="mb-1 flex items-center gap-2">
              <FiBell className="text-red-600 dark:text-red-300" />
              <span className="text-xs font-semibold">
                {urgentTasks.length} tâche{urgentTasks.length > 1 ? 's' : ''} urgente{urgentTasks.length > 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-[11px] text-red-800/90 dark:text-red-100/90">
              Priorité HAUTE - Échéance &lt; 1h
            </p>
          </div>
        )}

        <nav className="mt-4 flex-1 space-y-2">
          <button className="flex w-full items-center gap-3 rounded-xl bg-cyan-100 px-4 py-2.5 text-sm font-medium text-cyan-900 shadow-sm ring-1 ring-cyan-300 transition hover:bg-cyan-200 hover:ring-cyan-400 dark:bg-stone-950 dark:text-amber-50 dark:ring-amber-800/70 dark:hover:bg-stone-900 dark:hover:ring-amber-500/60">
            <FiList className="text-cyan-700 dark:text-amber-300" /> Toutes les tâches
          </button>
        </nav>

        <div className="mt-4 space-y-3">
          <button
            onClick={toggleNotifications}
            className="flex w-full items-center justify-between rounded-xl bg-teal-100 px-4 py-2.5 text-xs text-teal-900 ring-1 ring-teal-300 transition hover:bg-teal-200 hover:ring-teal-400 dark:bg-stone-950 dark:text-amber-100 dark:ring-amber-900 dark:hover:bg-stone-900 dark:hover:ring-amber-500/60"
            title={notificationsEnabled ? 'Désactiver les notifications' : 'Activer les notifications'}
          >
            <span className="font-medium">Notifications</span>
            <div className="flex items-center gap-1.5">
              {notificationsEnabled ? (
                <FiBell className="text-teal-700 dark:text-amber-300" size={16} />
              ) : (
                <FiBellOff className="text-teal-500 dark:text-stone-500" size={16} />
              )}
            </div>
          </button>

          <div className="pointer-events-auto">
            <ThemeToggle />
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium text-rose-700 transition hover:bg-rose-100 hover:text-rose-800 dark:text-amber-100 dark:hover:bg-red-900/60 dark:hover:text-red-100"
          >
            <FiLogOut /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="ml-64 min-h-screen px-8 py-8">
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-slate-800 dark:text-amber-50">
                Bonjour, {username} <span className="align-middle">👋</span>
              </h2>
              <p className="mt-1 text-sm text-slate-700/90 dark:text-amber-200/80">
                Voici un aperçu de vos tâches pour aujourd'hui.
              </p>
            </div>
          </div>

          {/* Cartes de stats */}
          <div className="mb-8 grid grid-cols-4 gap-4">
            <div className="relative overflow-hidden rounded-2xl bg-slate-100 px-5 py-4 shadow-md ring-1 ring-slate-300 dark:bg-stone-950/90 dark:ring-stone-800">
              <div className="pointer-events-none absolute -right-8 -top-8 h-16 w-16 rounded-full bg-slate-200 dark:bg-stone-800/60" />
              <p className="text-xs font-medium text-slate-600 dark:text-amber-200/80">
                Total
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-800 dark:text-amber-50">
                {stats.total}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-slate-500 dark:text-stone-400">
                Tâches enregistrées
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-cyan-100 px-5 py-4 shadow-md ring-1 ring-cyan-300 dark:bg-amber-900/85 dark:ring-amber-700">
              <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rounded-full bg-cyan-200 dark:bg-amber-700/60" />
              <p className="text-xs font-medium text-cyan-800 dark:text-amber-100">
                À faire
              </p>
              <p className="mt-2 text-3xl font-semibold text-cyan-900 dark:text-amber-50">
                {stats.todo}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-cyan-700 dark:text-amber-200/80">
                En attente
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-orange-100 px-5 py-4 shadow-md ring-1 ring-orange-300 dark:bg-orange-900/85 dark:ring-orange-700">
              <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rounded-full bg-orange-200 dark:bg-orange-700/60" />
              <p className="text-xs font-medium text-orange-800 dark:text-orange-100">
                En cours
              </p>
              <p className="mt-2 text-3xl font-semibold text-orange-900 dark:text-orange-50">
                {stats.inProgress}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-orange-700 dark:text-orange-200/80">
                En traitement
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-teal-100 px-5 py-4 shadow-md ring-1 ring-teal-300 dark:bg-emerald-900/85 dark:ring-emerald-700">
              <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rounded-full bg-teal-200 dark:bg-emerald-700/60" />
              <p className="text-xs font-medium text-teal-800 dark:text-emerald-100">
                Terminées
              </p>
              <p className="mt-2 text-3xl font-semibold text-teal-900 dark:text-emerald-50">
                {stats.done}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-teal-700 dark:text-emerald-200/80">
                Complétées
              </p>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl hover:from-cyan-400 hover:via-teal-400 hover:to-orange-400"
            >
              <FiPlus /> Nouvelle tâche
            </button>

            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-cyan-300 bg-cyan-50 px-4 py-2 text-xs text-slate-700 outline-none ring-cyan-400/60 transition focus:ring-2 dark:border-stone-700 dark:bg-stone-950 dark:text-amber-50"
              >
                <option value="ALL">📋 Tous les statuts</option>
                <option value="TODO">📝 À faire</option>
                <option value="IN_PROGRESS">⏳ En cours</option>
                <option value="DONE">✅ Terminé</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="rounded-xl border border-orange-300 bg-orange-50 px-4 py-2 text-xs text-slate-700 outline-none ring-orange-400/60 transition focus:ring-2 dark:border-stone-700 dark:bg-stone-950 dark:text-amber-50"
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
          <div className="mb-6 rounded-2xl border border-teal-300 bg-teal-50 p-4 shadow-md dark:border-stone-800 dark:bg-stone-950">
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>
        )}

        {/* Liste des tâches */}
        <div className="space-y-3 pb-12">
          {filteredTasks.length === 0 ? (
            <div className="rounded-2xl border border-slate-300 bg-slate-100 p-10 text-center shadow-md dark:border-stone-800 dark:bg-stone-950">
              <p className="text-sm text-slate-600 dark:text-stone-400">
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