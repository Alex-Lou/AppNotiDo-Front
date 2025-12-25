// src/components/Dashboard/DaySummary.jsx
import { useState } from 'react';
import { FiCalendar, FiCheckCircle, FiClock, FiAlertCircle, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import MiniStatCard from '../ui/MiniStatCard';
import { 
  DAY_SUMMARY_CONTAINER,
  DAY_SUMMARY_DATE_CONTAINER,
  DAY_SUMMARY_DATE_ICON,
  DAY_SUMMARY_DATE_TEXT,
  DAY_SUMMARY_PROGRESS_SECTION,
  DAY_SUMMARY_PROGRESS_HEADER,
  PROGRESS_LABEL,
  PROGRESS_PERCENTAGE,
  PROGRESS_BAR_BG,
  PROGRESS_BAR_FILL,
  DAY_SUMMARY_STATS_GRID,
  URGENT_ALERT,
  URGENT_ALERT_TEXT
} from '../../constants/styles';


function DaySummary({ stats, urgentCount }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const today = new Date().toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  const completionRate = stats.total > 0 
    ? Math.round((stats.done / stats.total) * 100) 
    : 0;

  return (
    <div className={DAY_SUMMARY_CONTAINER}>
      {/* Date avec bouton collapse */}
      <div className="flex items-center">
        <div className={DAY_SUMMARY_DATE_CONTAINER}>
          <FiCalendar className={DAY_SUMMARY_DATE_ICON} size={20} />
          <h3 className={DAY_SUMMARY_DATE_TEXT}>
            {today}
          </h3>
        </div>
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto p-1 rounded-lg hover:bg-white/50 dark:hover:bg-stone-800/50 transition-colors"
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
          {/* Barre de progression */}
          <div className={DAY_SUMMARY_PROGRESS_SECTION}>
            <div className={DAY_SUMMARY_PROGRESS_HEADER}>
              <span className={PROGRESS_LABEL}>
                Progression du jour
              </span>
              <span className={PROGRESS_PERCENTAGE}>
                {completionRate}%
              </span>
            </div>
            <div className={PROGRESS_BAR_BG}>
              <div
                className={PROGRESS_BAR_FILL}
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>

          {/* Mini stats */}
          <div className={DAY_SUMMARY_STATS_GRID}>
            <MiniStatCard
              icon={FiCheckCircle}
              label="Terminées"
              value={stats.done}
              variant="success"
              iconColor="text-teal-600 dark:text-teal-400"
            />

            <MiniStatCard
              icon={FiClock}
              label="En cours"
              value={stats.inProgress}
              variant="warning"
              iconColor="text-orange-600 dark:text-orange-400"
            />
          </div>

          {/* Alerte tâches urgentes */}
          {urgentCount > 0 && (
            <div className={URGENT_ALERT}>
              <FiAlertCircle className="text-rose-600 dark:text-rose-400" size={18} />
              <p className={URGENT_ALERT_TEXT}>
                {urgentCount} tâche{urgentCount > 1 ? 's' : ''} urgente{urgentCount > 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DaySummary;
