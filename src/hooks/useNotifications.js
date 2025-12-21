// src/hooks/useNotifications.js
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import api from '../services/api';
import { 
  requestNotificationPermission, 
  sendBrowserNotification, 
  checkTasksForNotifications 
} from '../services/notificationService';

export const useNotifications = (tasks, fetchTasks) => {
  const [notificationPermission, setNotificationPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    localStorage.getItem('notificationsEnabled') !== 'false'
  );
  const [inAppNotifications, setInAppNotifications] = useState([]);
  const notifiedTaskIdsRef = useRef(new Set());

  // Update permission state
  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Check for notifications
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
          // Utiliser actualThreshold pour afficher le bon temps
          const timeRemaining = task.actualThreshold ?? task.minutesRemaining;
          notificationTitle = '🔔 Rappel de tâche';
          notificationText = `${task.title} - Échéance dans ${timeRemaining} min`;
        }

        // Notification in-app (toast)
        addInAppNotification({
          id: `notif-${(task.notificationKey || task.id)}-${Date.now()}`,
          taskId: task.id,
          title: notificationTitle,
          message: notificationText,
          type: task.isStartReminder ? 'start' : task.isUrgent ? 'urgent' : 'reminder',
        });

        // Notification navigateur
        if (notificationPermission === 'granted') {
          sendBrowserNotification(notificationTitle, notificationText);
        }

        // Marquer comme notifié
        notifiedTaskIdsRef.current.add(task.notificationKey || task.id);

        // Mettre à jour le backend si c'est une notification d'échéance
        // ⚠️ On fait JUSTE l'appel API sans rafraîchir toutes les tâches
        if (task.minutesRemaining === 0 || task.isUrgent || task.notified === true) {
          try {
            await api.put(`/tasks/${task.id}`, { ...task, notified: true });
            // ❌ SUPPRIMÉ : fetchTasks() qui causait la boucle infinie
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la notification:', error);
          }
        }
      }
    };

    checkNotifications();
    const interval = setInterval(() => {
      checkNotifications();
    }, 30000); // Vérifier toutes les 30 secondes

    return () => clearInterval(interval);
  }, [tasks, notificationPermission, notificationsEnabled]); // ✅ Retiré fetchTasks des deps

  const handleRequestNotificationPermission = async () => {
    const permission = await requestNotificationPermission();
    setNotificationPermission(permission);
  };

  const toggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    localStorage.setItem('notificationsEnabled', newState);
    
    if (newState) {
      toast.success('🔔 Notifications activées');
    } else {
      toast.info('🔕 Notifications désactivées');
    }
  };

  const addInAppNotification = (notification) => {
    setInAppNotifications(prev => [...prev, notification]);
    
    // Afficher un toast selon le type
    if (notification.type === 'urgent') {
      toast.error(notification.message, {
        duration: 8000,
        icon: '🚨',
      });
    } else if (notification.type === 'start') {
      toast.info(notification.message, {
        duration: 8000,
        icon: '⏰',
      });
    } else {
      toast.warning(notification.message, {
        duration: 8000,
        icon: '🔔',
      });
    }
    
    // Auto-remove après 8 secondes
    setTimeout(() => {
      removeInAppNotification(notification.id);
    }, 8000);
  };

  const removeInAppNotification = (notificationId) => {
    setInAppNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  return {
    notificationPermission,
    notificationsEnabled,
    inAppNotifications,
    handleRequestNotificationPermission,
    toggleNotifications,
    removeInAppNotification,
  };
};
