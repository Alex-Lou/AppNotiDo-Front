// src/components/Dashboard/RecentActivity.jsx
import { useState } from 'react';
import { FiActivity, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import ActivityItem from '../ui/ActivityItem';
import { 
  ACTIVITY_CONTAINER, 
  WIDGET_HEADER,
  WIDGET_TITLE,
  WIDGET_COLLAPSE_BTN,
  ACTIVITY_EMPTY 
} from '../../constants/styles';

function RecentActivity({ tasks, onTaskClick }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
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
      <div className={WIDGET_HEADER}>
        <div className="flex items-center gap-2">
          <FiActivity className="text-cyan-600 dark:text-amber-400" size={18} />
          <h3 className={WIDGET_TITLE}>Activité récente</h3>
        </div>
        
        <div className="flex items-center gap-2">
          {isCollapsed && recentTasks.length > 0 && (
            <span className="text-xs font-bold text-cyan-600 dark:text-amber-400">
              {recentTasks.length}
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
        <div className="mt-3 space-y-2 max-h-72 overflow-y-auto scrollbar-thin">
          {recentTasks.length === 0 ? (
            <p className={ACTIVITY_EMPTY}>Aucune activité récente</p>
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