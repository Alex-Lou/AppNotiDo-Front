// src/components/Dashboard/UpcomingTasks.jsx
import { useState } from 'react';
import { FiClock, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import UpcomingTaskItem from '../ui/UpcomingTaskItem';
import { 
  UPCOMING_CONTAINER, 
  WIDGET_HEADER,
  WIDGET_TITLE,
  WIDGET_COLLAPSE_BTN,
  UPCOMING_EMPTY 
} from '../../constants/styles';

function UpcomingTasks({ tasks, onTaskClick, onTaskDelete }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const sortedTasks = [...tasks]
    .filter(task => task.dueDate && task.status !== 'DONE')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

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

  return (
    <div className={UPCOMING_CONTAINER}>
      <div className={WIDGET_HEADER}>
        <div className="flex items-center gap-2">
          <FiClock className="text-cyan-600 dark:text-amber-400" size={18} />
          <h3 className={WIDGET_TITLE}>À venir</h3>
        </div>
        
        <div className="flex items-center gap-2">
          {isCollapsed && (
            <span className="text-xs font-bold text-cyan-600 dark:text-amber-400">
              {sortedTasks.length}
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={WIDGET_COLLAPSE_BTN}
          >
            {isCollapsed ? <FiChevronDown size={16} /> : <FiChevronUp size={16} />}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="mt-3 space-y-2">
          {sortedTasks.length === 0 ? (
            <p className={UPCOMING_EMPTY}>Aucune échéance prochaine 🎉</p>
          ) : (
            sortedTasks.map(task => (
              <UpcomingTaskItem
                key={task.id}
                task={task}
                timeInfo={getTimeUntilDue(task.dueDate)}
                onTaskClick={onTaskClick}
                onDelete={onTaskDelete}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default UpcomingTasks;