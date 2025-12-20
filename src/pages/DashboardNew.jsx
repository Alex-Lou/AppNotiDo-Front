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

  // Drag & drop state
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverTaskId, setDragOverTaskId] = useState(null);

  // Permission notifications au montage
  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Récupérer les tâches au chargement
  useEffect(() => {
    fetchTasks();
  }, []);

  // Notifications planifiées
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

  // Filtres
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

  // Handlers Drag & Drop
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-xl font-medium text-gray-600 dark:text-gray-300">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Notifications in-app */}
      {notificationsEnabled && (
        <div className="fixed left-6 bottom-6 z-50 space-y-3 max-w-sm">
          {inAppNotifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white dark:bg-gray-800 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg shadow-xl p-4 flex items-start gap-3 animate-slide-in-left"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <FiBell className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                  {notification.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => removeInAppNotification(notification.id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
              >
                <FiX size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            📝 AppNotiDo
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Organisez votre journée</p>
        </div>

        <div className="mb-8 p-4 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">{username}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Utilisateur actif</p>
            </div>
          </div>
        </div>

        {notificationPermission !== 'granted' && notificationsEnabled && (
          <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/30 border-2 border-orange-200 dark:border-orange-700 rounded-xl">
            <div className="flex items-start gap-2 mb-2">
              <FiBell className="text-orange-600 dark:text-orange-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-orange-700 dark:text-orange-300 mb-1">
                  Activer les notifications
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-400 mb-2">
                  Recevez des alertes pour vos tâches
                </p>
                <button
                  onClick={handleRequestNotificationPermission}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition"
                >
                  Autoriser
                </button>
              </div>
            </div>
          </div>
        )}

        {urgentTasks.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-700 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <FiBell className="text-red-600 dark:text-red-400" />
              <span className="text-sm font-bold text-red-700 dark:text-red-300">
                {urgentTasks.length} tâche{urgentTasks.length > 1 ? 's' : ''} urgente{urgentTasks.length > 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-xs text-red-600 dark:text-red-400">
              Priorité HAUTE - Échéance &lt; 1h
            </p>
          </div>
        )}

        <nav className="flex-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium shadow-soft transition-all hover:shadow-lg">
            <FiList /> Toutes les tâches
          </button>
        </nav>

        <div className="mb-4">
          <button
            onClick={toggleNotifications}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition"
            title={notificationsEnabled ? 'Désactiver les notifications' : 'Activer les notifications'}
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Notifications
            </span>
            <div className="flex items-center gap-2">
              {notificationsEnabled ? (
                <FiBell className="text-blue-600 dark:text-blue-400" size={20} />
              ) : (
                <FiBellOff className="text-gray-400 dark:text-gray-500" size={20} />
              )}
            </div>
          </button>
        </div>

        <div className="mb-4">
          <ThemeToggle />
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition"
        >
          <FiLogOut /> Déconnexion
        </button>
      </aside>

      {/* Contenu principal */}
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Bonjour, {username} 👋
          </h2>

          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Total</span>
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                  <FiList className="text-gray-600 dark:text-gray-300" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">À faire</span>
                <div className="w-10 h-10 bg-blue-200 dark:bg-blue-700 rounded-xl flex items-center justify-center">
                  <FiClock className="text-blue-700 dark:text-blue-300" />
                </div>
              </div>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-200">{stats.todo}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-700 dark:text-purple-300 text-sm font-medium">En cours</span>
                <div className="w-10 h-10 bg-purple-200 dark:bg-purple-700 rounded-xl flex items-center justifyCenter">
                  <FiClock className="text-purple-700 dark:text-purple-300" />
                </div>
              </div>
              <p className="text-3xl font-bold text-purple-900 dark:text-purple-200">{stats.inProgress}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-700 dark:text-green-300 text-sm font-medium">Terminées</span>
                <div className="w-10 h-10 bg-green-200 dark:bg-green-700 rounded-xl flex items-center justify-center">
                  <FiCheck className="text-green-700 dark:text-green-300" />
                </div>
              </div>
              <p className="text-3xl font-bold text-green-900 dark:text-green-200">{stats.done}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <FiPlus /> Nouvelle tâche
            </button>

            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 transition"
              >
                <option value="ALL">📋 Tous les statuts</option>
                <option value="TODO">📝 À faire</option>
                <option value="IN_PROGRESS">⏳ En cours</option>
                <option value="DONE">✅ Terminé</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 transition"
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
          <div className="mb-6">
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>
        )}

        {/* Liste des tâches avec drag & drop */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
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
