// Demander la permission pour les notifications navigateur
export const requestNotificationPermission = async () => {
  if ('Notification' in window && Notification.permission === 'default') {
    await Notification.requestPermission();
  }
};

// Envoyer une notification navigateur
export const sendBrowserNotification = (title, body) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/vite.svg',
      badge: '/vite.svg',
    });
  }
};

// Vérifier les tâches qui nécessitent une notification
export const checkTasksForNotifications = (tasks) => {
  const now = new Date();
  const tasksToNotify = [];

  tasks.forEach((task) => {
    if (!task.dueDate || task.notified || task.status === 'DONE') return;

    const dueDate = new Date(task.dueDate);
    const reminderTime = new Date(dueDate.getTime() - (task.reminderMinutes || 15) * 60000);

    // Si on est entre le moment du rappel et l'échéance
    if (now >= reminderTime && now < dueDate) {
      tasksToNotify.push(task);
    }

    // Notification pour commencer une tâche longue
    if (task.estimatedDuration && task.estimatedDuration > 30 && task.status === 'TODO') {
      const startTime = new Date(dueDate.getTime() - task.estimatedDuration * 60000);
      if (now >= startTime && now < dueDate) {
        tasksToNotify.push({
          ...task,
          isStartReminder: true,
        });
      }
    }
  });

  return tasksToNotify;
};