// src/components/Dashboard/UpcomingTasks.jsx
import { useState } from 'react';
import { FiClock, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import UpcomingTaskItem from '../ui/UpcomingTaskItem';
import { UPCOMING_CONTAINER, UPCOMING_TITLE, UPCOMING_EMPTY } from '../../constants/styles';

function UpcomingTasks({ tasks, onTaskClick, onTaskDelete }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
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

  return (
    <div className={UPCOMING_CONTAINER}>
      {/* Header avec bouton collapse */}
      <div className="flex items-center justify-between mb-3">
        <h3 className={UPCOMING_TITLE}>
          <FiClock size={18} />
          À venir
        </h3>
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-white/50 dark:hover:bg-stone-800/50 transition-colors"
          aria-label={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? (
            <FiChevronDown size={18} className="text-slate-600 dark:text-amber-400" />
          ) : (
            <FiChevronUp size={18} className="text-slate-600 dark:text-amber-400" />
          )}
        </button>
      </div>

      {/* Contenu collapsible */}
      {!isCollapsed && (
        <div className="space-y-3 animate-fade-in">
          {sortedTasks.length === 0 ? (
            <p className={UPCOMING_EMPTY}>
              Aucune échéance prochaine 🎉
            </p>
          ) : (
            sortedTasks.map(task => {
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
            })
          )}
        </div>
      )}
    </div>
  );
}

export default UpcomingTasks;
