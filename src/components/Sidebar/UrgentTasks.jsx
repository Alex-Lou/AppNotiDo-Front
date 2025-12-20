import { FiBell } from 'react-icons/fi';

function UrgentTasks({ urgentTasks }) {
  if (urgentTasks.length === 0) return null;

  return (
    <div className="mb-5 rounded-2xl border-2 border-red-400/60 bg-gradient-to-br from-red-100 to-orange-100 px-4 py-4 text-red-900 shadow-md dark:border-red-700/70 dark:bg-gradient-to-br dark:from-red-900/70 dark:to-orange-900/70 dark:text-red-100">
      <div className="mb-1.5 flex items-center gap-2">
        <FiBell className="text-red-700 dark:text-red-300" size={18} />
        <span className="text-sm font-bold">
          {urgentTasks.length} tâche{urgentTasks.length > 1 ? 's' : ''} urgente{urgentTasks.length > 1 ? 's' : ''}
        </span>
      </div>
      <p className="text-xs font-medium leading-relaxed text-red-800/90 dark:text-red-200/80">
        Priorité HAUTE - Échéance &lt; 1h
      </p>
    </div>
  );
}

export default UrgentTasks;