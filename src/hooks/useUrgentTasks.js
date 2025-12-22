// src/hooks/useUrgentTasks.js
import { useMemo } from 'react';

export function useUrgentTasks(tasks, timeTick) {
  const getMinutesRemaining = (dueDate) => {
    if (!dueDate) return Infinity;
    const now = new Date(); // se base sur l'heure courante
    const due = new Date(dueDate);
    return Math.floor((due - now) / 60000);
  };

  const { urgentTasks, normalTasks } = useMemo(() => {
    const urgent = tasks.filter((task) => {
      if (!task.dueDate) return false;
      if (task.status === 'DONE') return false;
      if (task.reactivable) return false; // les réactivables ne passent pas en urgent

      const minutesRemaining = getMinutesRemaining(task.dueDate);
      // Urgent = dans 5 minutes ou moins, y compris échue
      return minutesRemaining <= 5;
    });

    const normal = tasks.filter((task) => {
      if (task.status === 'DONE') return true;
      if (!task.dueDate) return true; // sans date = normal
      if (task.reactivable) return true; // réactivables restent dans normal

      const minutesRemaining = getMinutesRemaining(task.dueDate);
      // Normal = plus de 5 minutes avant l’échéance
      return minutesRemaining > 5;
    });

    return { urgentTasks: urgent, normalTasks: normal };
  }, [tasks, timeTick]); // timeTick force le recalcul périodique

  return { urgentTasks, normalTasks };
}
