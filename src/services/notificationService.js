import { toast } from 'sonner';

// Demander la permission pour les notifications navigateur
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return 'unsupported';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission === 'denied') {
    toast.error('🚫 Les notifications sont bloquées. Activez-les dans les paramètres du navigateur.');
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      toast.success('🎉 Notifications activées !');
      new Notification('🎉 Notifications activées !', {
        body: 'Vous recevrez maintenant des alertes pour vos tâches.',
        icon: '/vite.svg',
      });
    } else if (permission === 'denied') {
      toast.error('🚫 Notifications refusées');
    }
    
    return permission;
  } catch (error) {
    toast.error('❌ Erreur lors de l\'activation des notifications');
    return 'error';
  }
};

// Envoyer une notification navigateur
export const sendBrowserNotification = (title, body) => {
  if (!('Notification' in window)) {
    return;
  }

  if (Notification.permission !== 'granted') {
    return;
  }

  try {
    const notification = new Notification(title, {
      body,
      icon: '/vite.svg',
      badge: '/vite.svg',
      requireInteraction: false,
    });

    // Auto-close après 8 secondes
    setTimeout(() => notification.close(), 8000);
  } catch (error) {
    console.error('❌ Erreur envoi notification :', error);
  }
};

// Calculer le temps restant en minutes
const getMinutesUntilDue = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);
  return Math.floor((due - now) / 60000);
};

// Vérifier les tâches qui nécessitent une notification
export const checkTasksForNotifications = (tasks) => {
  const tasksToNotify = [];

  tasks.forEach((task) => {
    if (!task.dueDate || task.status === 'DONE') return;

    const minutesRemaining = getMinutesUntilDue(task.dueDate);
    
    // Ignorer les tâches échues depuis plus de 2 minutes
    if (minutesRemaining < -2) return;

    // Utiliser reminderMinutes avec fallback sur 15
    const reminderMinutes = task.reminderMinutes ?? 15;
    
    // Déterminer les seuils de notification selon le reminderMinutes choisi
    let notificationThresholds = [];
    
    if (reminderMinutes === 30) {
      notificationThresholds = [30, 15, 5, 0];
    } else if (reminderMinutes === 15) {
      notificationThresholds = [15, 5, 0];
    } else if (reminderMinutes === 5) {
      notificationThresholds = [5, 0];
    } else if (reminderMinutes === 60) {
      notificationThresholds = [60, 30, 15, 5, 0];
    } else {
      // Pour toute autre valeur personnalisée
      notificationThresholds = [reminderMinutes, 0];
    }

    // Vérifier si on doit notifier pour ce seuil
    // Fenêtre de 2 minutes pour capturer le bon moment
    for (const threshold of notificationThresholds) {
      const isInWindow = minutesRemaining <= threshold && minutesRemaining >= threshold - 2;
      
      if (isInWindow) {
        const notificationKey = `${task.id}-${threshold}`;
        
        tasksToNotify.push({
          ...task,
          minutesRemaining: Math.max(0, minutesRemaining),
          notificationKey,
          isUrgent: threshold === 0,
          actualThreshold: threshold, // Pour afficher le bon temps
        });
        break; // Une seule notification par vérification
      }
    }

    // Notification pour commencer une tâche longue (> 30 min)
    if (task.estimatedDuration && task.estimatedDuration > 30 && task.status === 'TODO') {
      const startTime = new Date(new Date(task.dueDate).getTime() - task.estimatedDuration * 60000);
      const minutesUntilStart = Math.floor((startTime - new Date()) / 60000);
      
      // Notifier dans une fenêtre de 2 minutes avant le moment de commencer
      if (minutesUntilStart <= 5 && minutesUntilStart >= 3) {
        tasksToNotify.push({
          ...task,
          isStartReminder: true,
          notificationKey: `${task.id}-start`,
        });
      }
    }
  });

  return tasksToNotify;
};