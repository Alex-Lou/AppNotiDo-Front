export const useQuickViews = (tasks) => {
  const getTasksByView = (viewId) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() + 7);

    switch (viewId) {
      case 'urgent':
        // HIGH priority + échéance < 24h
        return tasks.filter(task => {
          if (!task.dueDate || task.status === 'DONE') return false;
          const due = new Date(task.dueDate);
          const diff = due - now;
          return task.priority === 'HIGH' && diff < 24 * 60 * 60 * 1000 && diff > 0;
        });

      case 'important':
        // HIGH priority, pas encore terminées
        return tasks.filter(task => task.priority === 'HIGH' && task.status !== 'DONE');

      case 'today':
        // Échéance aujourd'hui
        return tasks.filter(task => {
          if (!task.dueDate || task.status === 'DONE') return false;
          const due = new Date(task.dueDate);
          return due >= today && due < new Date(today.getTime() + 24 * 60 * 60 * 1000);
        });

      case 'week':
        // Échéance cette semaine
        return tasks.filter(task => {
          if (!task.dueDate || task.status === 'DONE') return false;
          const due = new Date(task.dueDate);
          return due >= today && due < weekEnd;
        });

      case 'completed':
        // Tâches complétées (triées par date de mise à jour)
        return tasks
          .filter(task => task.status === 'DONE')
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

      default:
        return tasks;
    }
  };

  return { getTasksByView };
};