import { FiCalendar, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

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
    <div className="rounded-2xl border-2 border-cyan-300/60 bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 p-5 shadow-lg dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30">
      {/* Date */}
      <div className="mb-4 flex items-center gap-2">
        <FiCalendar className="text-cyan-600 dark:text-amber-400" size={20} />
        <h3 className="text-base font-bold capitalize text-slate-900 dark:text-amber-50">
          {today}
        </h3>
      </div>

      {/* Barre de progression */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700 dark:text-amber-200">
            Progression du jour
          </span>
          <span className="text-sm font-bold text-cyan-600 dark:text-amber-400">
            {completionRate}%
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-500 dark:from-amber-500 dark:to-orange-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-cyan-100/50 to-teal-100/50 p-3 dark:from-cyan-900/20 dark:to-teal-900/20">
          <FiCheckCircle className="text-teal-600 dark:text-teal-400" size={18} />
          <div>
            <p className="text-xs font-medium text-slate-600 dark:text-amber-300/70">
              Terminées
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-amber-50">
              {stats.done}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-orange-100/50 to-amber-100/50 p-3 dark:from-orange-900/20 dark:to-amber-900/20">
          <FiClock className="text-orange-600 dark:text-orange-400" size={18} />
          <div>
            <p className="text-xs font-medium text-slate-600 dark:text-amber-300/70">
              En cours
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-amber-50">
              {stats.inProgress}
            </p>
          </div>
        </div>
      </div>

      {/* Alerte tâches urgentes */}
      {urgentCount > 0 && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-100 to-orange-100 p-3 dark:from-rose-900/30 dark:to-orange-900/30">
          <FiAlertCircle className="text-rose-600 dark:text-rose-400" size={18} />
          <p className="text-sm font-bold text-rose-800 dark:text-rose-300">
            {urgentCount} tâche{urgentCount > 1 ? 's' : ''} urgente{urgentCount > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}

export default DaySummary;