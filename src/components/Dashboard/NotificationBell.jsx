// src/components/Dashboard/NotificationBell.jsx
import { useState, useRef, useEffect } from 'react';
import { 
  FiBell, 
  FiCheck, 
  FiCheckCircle, 
  FiTrash2, 
  FiX, 
  FiClock, 
  FiAlertTriangle, 
  FiAlertCircle,
  FiPlus,
  FiEdit2,
  FiRefreshCw,
  FiPlay,
  FiPause,
  FiSquare,
  FiTrendingUp,
  FiFlag
} from 'react-icons/fi';
import { useNotifications } from '../../hooks/useNotifications';
import {
  NOTIF_BELL_BUTTON,
  NOTIF_BELL_ICON,
  NOTIF_BADGE,
  NOTIF_PANEL,
  NOTIF_PANEL_HEADER,
  NOTIF_PANEL_TITLE,
  NOTIF_PANEL_ACTIONS,
  NOTIF_MARK_ALL_BUTTON,
  NOTIF_DELETE_ALL_BUTTON,
  NOTIF_CLOSE_BUTTON,
  NOTIF_LIST,
  NOTIF_ITEM,
  NOTIF_ITEM_UNREAD,
  NOTIF_ITEM_ICON,
  NOTIF_ITEM_CONTENT,
  NOTIF_ITEM_TITLE,
  NOTIF_ITEM_MESSAGE,
  NOTIF_ITEM_TIME,
  NOTIF_ITEM_ACTIONS,
  NOTIF_ITEM_ACTION_BUTTON,
  NOTIF_EMPTY,
  NOTIF_LOADING
} from '../../constants/styles';

const TYPE_ICONS = {
  REMINDER: { icon: FiClock, color: 'text-cyan-500 dark:text-cyan-400' },
  DEADLINE: { icon: FiAlertCircle, color: 'text-amber-500 dark:text-amber-400' },
  OVERDUE: { icon: FiAlertTriangle, color: 'text-rose-500 dark:text-rose-400' },
  TASK_CREATED: { icon: FiPlus, color: 'text-emerald-500 dark:text-emerald-400' },
  TASK_UPDATED: { icon: FiEdit2, color: 'text-blue-500 dark:text-blue-400' },
  TASK_DELETED: { icon: FiTrash2, color: 'text-rose-500 dark:text-rose-400' },
  TASK_COMPLETED: { icon: FiCheckCircle, color: 'text-emerald-500 dark:text-emerald-400' },
  TASK_REACTIVATED: { icon: FiRefreshCw, color: 'text-purple-500 dark:text-purple-400' },
  TIMER_STARTED: { icon: FiPlay, color: 'text-emerald-500 dark:text-emerald-400' },
  TIMER_PAUSED: { icon: FiPause, color: 'text-amber-500 dark:text-amber-400' },
  TIMER_STOPPED: { icon: FiSquare, color: 'text-rose-500 dark:text-rose-400' },
  STATUS_CHANGED: { icon: FiTrendingUp, color: 'text-blue-500 dark:text-blue-400' },
  PRIORITY_CHANGED: { icon: FiFlag, color: 'text-amber-500 dark:text-amber-400' }
};

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  const {
    notifications,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications
  } = useNotifications();

  // ✅ Filtrer pour n'afficher QUE les notifications de tâches (pas SYSTEM)
  const taskNotifications = notifications.filter(n => n.type !== 'SYSTEM');
  const taskUnreadCount = taskNotifications.filter(n => !n.isRead).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        panelRef.current && 
        !panelRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleToggle = () => {
    if (!isOpen) {
      fetchNotifications();
    }
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  const handleDelete = (e, notificationId) => {
    e.stopPropagation();
    deleteNotification(notificationId);
  };

  const handleDeleteAll = () => {
    if (confirm('Supprimer toutes les notifications ?')) {
      deleteAllNotifications();
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={NOTIF_BELL_BUTTON}
        title="Notifications"
      >
        <FiBell className={NOTIF_BELL_ICON} />
        {taskUnreadCount > 0 && (
          <span className={NOTIF_BADGE}>
            {taskUnreadCount > 9 ? '9+' : taskUnreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div ref={panelRef} className={NOTIF_PANEL}>
          <div className={NOTIF_PANEL_HEADER}>
            <h3 className={NOTIF_PANEL_TITLE}>
              Notifications
              {taskUnreadCount > 0 && (
                <span className="ml-2 text-xs font-normal text-slate-500 dark:text-amber-400/70">
                  ({taskUnreadCount} non lue{taskUnreadCount > 1 ? 's' : ''})
                </span>
              )}
            </h3>
            <div className={NOTIF_PANEL_ACTIONS}>
              {taskUnreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className={NOTIF_MARK_ALL_BUTTON}
                  title="Tout marquer comme lu"
                >
                  <FiCheck size={14} />
                  <span className="hidden sm:inline">Tout lu</span>
                </button>
              )}
              {taskNotifications.length > 0 && (
                <button
                  onClick={handleDeleteAll}
                  className={NOTIF_DELETE_ALL_BUTTON}
                  title="Tout supprimer"
                >
                  <FiTrash2 size={14} />
                  <span className="hidden sm:inline">Vider</span>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className={NOTIF_CLOSE_BUTTON}
                title="Fermer"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          <div className={NOTIF_LIST}>
            {loading ? (
              <div className={NOTIF_LOADING}>
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-cyan-500 border-t-transparent dark:border-amber-500" />
                <span>Chargement...</span>
              </div>
            ) : taskNotifications.length === 0 ? (
              <div className={NOTIF_EMPTY}>
                <FiBell size={32} className="text-slate-300 dark:text-stone-600 mb-2" />
                <p>Aucune notification</p>
              </div>
            ) : (
              taskNotifications.map((notification) => {
                const typeConfig = TYPE_ICONS[notification.type];
                if (!typeConfig) return null; // Sécurité supplémentaire
                const IconComponent = typeConfig.icon;

                return (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`${NOTIF_ITEM} ${!notification.isRead ? NOTIF_ITEM_UNREAD : ''}`}
                  >
                    <div className={`${NOTIF_ITEM_ICON} ${typeConfig.color}`}>
                      <IconComponent size={18} />
                    </div>

                    <div className={NOTIF_ITEM_CONTENT}>
                      <p className={NOTIF_ITEM_TITLE}>{notification.title}</p>
                      <p className={NOTIF_ITEM_MESSAGE}>{notification.message}</p>
                      <span className={NOTIF_ITEM_TIME}>
                        {formatRelativeTime(notification.createdAt)}
                        {notification.taskTitle && (
                          <span className="ml-1 text-cyan-600 dark:text-amber-400">
                            • {notification.taskTitle}
                          </span>
                        )}
                      </span>
                    </div>

                    <div className={NOTIF_ITEM_ACTIONS}>
                      {!notification.isRead && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className={`${NOTIF_ITEM_ACTION_BUTTON} hover:text-emerald-500`}
                          title="Marquer comme lu"
                        >
                          <FiCheck size={14} />
                        </button>
                      )}
                      <button
                        onClick={(e) => handleDelete(e, notification.id)}
                        className={`${NOTIF_ITEM_ACTION_BUTTON} hover:text-rose-500`}
                        title="Supprimer"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;