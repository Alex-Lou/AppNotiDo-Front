// src/components/Dashboard/RecentActivity.jsx
import { useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import ActivityItem from '../ui/ActivityItem';
import { ACTIVITY_CONTAINER, ACTIVITY_TITLE, ACTIVITY_EMPTY } from '../../constants/styles';

function RecentActivity({ tasks, onTaskClick }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Trier les tâches par date de mise à jour
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return past.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  return (
    <div className={ACTIVITY_CONTAINER}>
      {/* Header avec bouton collapse */}
      <div className="flex items-center justify-between mb-3">
        <h3 className={ACTIVITY_TITLE}>
          Activité récente
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
          {recentTasks.length === 0 ? (
            <p className={ACTIVITY_EMPTY}>
              Aucune activité récente
            </p>
          ) : (
            recentTasks.map(task => (
              <ActivityItem
                key={task.id}
                task={task}
                timeAgo={getTimeAgo(task.updatedAt)}
                onClick={() => onTaskClick(task.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;
