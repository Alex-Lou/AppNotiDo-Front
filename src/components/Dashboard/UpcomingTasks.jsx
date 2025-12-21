// src/components/Dashboard/UpcomingTasks.jsx
import { FiClock } from 'react-icons/fi';
import UpcomingTaskItem from '../ui/UpcomingTaskItem';
import { UPCOMING_CONTAINER, UPCOMING_TITLE, UPCOMING_EMPTY } from '../../constants/styles';

function UpcomingTasks({ tasks, onTaskClick, onTaskDelete }) {
  // Trier les tâches par date d'échéance
  const sortedTasks = [...tasks]
    .filter(task => task.dueDate && task.status !== 'DONE')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5); // Max 5 tâches

  const getTimeUntilDue = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (diff < 0) return { text: 'Échue', color: 'text-rose-600 dark:text-rose-400', urgent: true, isOverdue: true };
    if (hours < 1) return { text: 'Maintenant!', color: 'text-rose-600 dark:text-rose-400', urgent: true, isOverdue: false };
    if (hours < 24) return { text: `Dans ${hours}h`, color: 'text-orange-600 dark:text-orange-400', urgent: true, isOverdue: false };
    if (days === 1) return { text: 'Demain', color: 'text-amber-600 dark:text-amber-400', urgent: false, isOverdue: false };
    if (days <= 7) return { text: `Dans ${days}j`, color: 'text-cyan-600 dark:text-cyan-400', urgent: false, isOverdue: false };
    return { text: due.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }), color: 'text-slate-600 dark:text-slate-400', urgent: false, isOverdue: false };
  };

  if (sortedTasks.length === 0) {
    return (
      <div className={UPCOMING_CONTAINER}>
        <h3 className={UPCOMING_TITLE}>
          <FiClock size={18} />
          À venir
        </h3>
        <p className={UPCOMING_EMPTY}>
          Aucune échéance prochaine 🎉
        </p>
      </div>
    );
  }

  return (
    <div className={UPCOMING_CONTAINER}>
      <h3 className={UPCOMING_TITLE}>
        <FiClock size={18} />
        À venir
      </h3>

      <div className="space-y-3">
        {sortedTasks.map(task => {
          const timeInfo = getTimeUntilDue(task.dueDate);
          
          return (
            <UpcomingTaskItem
              key={task.id}
              task={task}
              timeInfo={timeInfo}
              onTaskClick={onTaskClick}
              onDelete={onTaskDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UpcomingTasks;
