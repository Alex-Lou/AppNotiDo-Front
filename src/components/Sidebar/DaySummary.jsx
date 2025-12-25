// src/components/Dashboard/DaySummary.jsx
import { useState } from 'react';
import { FiCalendar, FiChevronUp, FiChevronDown, FiAlertCircle } from 'react-icons/fi';
import { 
  DAY_SUMMARY_CONTAINER,
  WIDGET_HEADER,
  WIDGET_TITLE,
  WIDGET_COLLAPSE_BTN,
  PROGRESS_BAR_BG,
  PROGRESS_BAR_FILL
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
      {/* Header unifié */}
      <div className={WIDGET_HEADER}>
        <div className="flex items-center gap-2">
          <FiCalendar className="text-cyan-600 dark:text-amber-400" size={18} />
          <h3 className={WIDGET_TITLE}>{today}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Aperçu compact quand fermé */}
          {isCollapsed && (
            <span className="text-xs font-bold text-cyan-600 dark:text-amber-400">
              {completionRate}%
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

      {/* Contenu */}
      {!isCollapsed && (
        <div className="mt-3 space-y-3">
          {/* Progression compacte */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-600 dark:text-amber-200/70">
                Progression
              </span>
              <span className="text-xs font-bold text-cyan-600 dark:text-amber-400">
                {stats.done}/{stats.total} · {completionRate}%
              </span>
            </div>
            <div className={PROGRESS_BAR_BG}>
              <div className={PROGRESS_BAR_FILL} style={{ width: `${completionRate}%` }} />
            </div>
          </div>

          {/* Stats en ligne */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <span className="text-slate-600 dark:text-amber-200/70">Terminées:</span>
              <span className="font-bold text-slate-800 dark:text-amber-50">{stats.done}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-slate-600 dark:text-amber-200/70">En cours:</span>
              <span className="font-bold text-slate-800 dark:text-amber-50">{stats.inProgress}</span>
            </div>
          </div>

          {/* Alerte urgente */}
          {urgentCount > 0 && (
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-rose-100/80 dark:bg-rose-900/30">
              <FiAlertCircle className="text-rose-600 dark:text-rose-400" size={14} />
              <span className="text-xs font-bold text-rose-700 dark:text-rose-300">
                {urgentCount} urgente{urgentCount > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DaySummary;