// Demander la permission pour les notifications navigateur
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return 'unsupported';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission === 'denied') {
    alert('🚫 Les notifications sont bloquées.\n\nPour les activer :\n1. Cliquez sur le cadenas/icône à gauche de l\'URL\n2. Autorisez les notifications\n3. Rechargez la page');
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      new Notification('🎉 Notifications activées !', {
        body: 'Vous recevrez maintenant des alertes pour vos tâches.',
        icon: '/vite.svg',
      });
    } else if (permission === 'denied') {
      alert('🚫 Vous avez refusé les notifications.\n\nPour les réactiver, cliquez sur le cadenas à gauche de l\'URL.');
    }
    
    return permission;
  } catch (error) {
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

    const reminderMinutes = task.reminderMinutes || 15;
    
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
      // Par défaut : notification au temps choisi et à l'échéance
      notificationThresholds = [reminderMinutes, 0];
    }

    // Vérifier si on doit notifier pour ce seuil
    // Fenêtre de 2 minutes pour capturer le bon moment (ex: entre 5 et 3 min pour seuil à 5)
    for (const threshold of notificationThresholds) {
      const isInWindow = minutesRemaining <= threshold && minutesRemaining >= threshold - 2;
      
      if (isInWindow) {
        const notificationKey = `${task.id}-${threshold}`;
        
        tasksToNotify.push({
          ...task,
          minutesRemaining: Math.max(0, minutesRemaining),
          notificationKey,
          isUrgent: threshold === 0,
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
