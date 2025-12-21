// hooks/useUrgentTasks.js
import { useMemo } from 'react';

export function useUrgentTasks(tasks) {
  const getMinutesRemaining = (dueDate) => {
    if (!dueDate) return Infinity;
    const now = new Date();
    const due = new Date(dueDate);
    return Math.floor((due - now) / 60000);
  };

  const { urgentTasks, normalTasks } = useMemo(() => {
    const urgent = tasks.filter(task => {
      if (!task.dueDate || task.status === 'DONE') return false;
      const minutesRemaining = getMinutesRemaining(task.dueDate);
      return minutesRemaining <= 5;
    });

    const normal = tasks.filter(task => {
      if (!task.dueDate) return true;
      if (task.status === 'DONE') return true;
      const minutesRemaining = getMinutesRemaining(task.dueDate);
      return minutesRemaining > 5;
    });

    return { urgentTasks: urgent, normalTasks: normal };
  }, [tasks]);

  return { urgentTasks, normalTasks };
}
