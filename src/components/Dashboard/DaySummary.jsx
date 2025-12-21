// src/components/Dashboard/DaySummary.jsx
import { FiCalendar, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';
import MiniStatCard from '../ui/MiniStatCard';
import { 
  DAY_SUMMARY_CONTAINER,
  DAY_SUMMARY_DATE_ICON,
  DAY_SUMMARY_DATE_TEXT,
  PROGRESS_LABEL,
  PROGRESS_PERCENTAGE,
  PROGRESS_BAR_BG,
  PROGRESS_BAR_FILL,
  URGENT_ALERT,
  URGENT_ALERT_TEXT
} from '../../constants/styles';

function DaySummary({ stats, urgentCount }) {
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
      {/* Date */}
      <div className="mb-4 flex items-center gap-2">
        <FiCalendar className={DAY_SUMMARY_DATE_ICON} size={20} />
        <h3 className={DAY_SUMMARY_DATE_TEXT}>
          {today}
        </h3>
      </div>

      {/* Barre de progression */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
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
      <div className="grid grid-cols-2 gap-3">
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
  );
}

export default DaySummary;
