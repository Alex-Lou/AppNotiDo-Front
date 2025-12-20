import { FiCheck, FiPlus, FiEdit3 } from 'react-icons/fi';

function RecentActivity({ tasks, onTaskClick }) {
  // Trier les tâches par date de mise à jour
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  const getActivityIcon = (task) => {
    if (task.status === 'DONE') {
      return <FiCheck className="text-teal-600 dark:text-teal-400" size={16} />;
    }
    if (task.createdAt === task.updatedAt) {
      return <FiPlus className="text-cyan-600 dark:text-cyan-400" size={16} />;
    }
    return <FiEdit3 className="text-orange-600 dark:text-orange-400" size={16} />;
  };

  const getActivityText = (task) => {
    if (task.status === 'DONE') return 'Terminée';
    if (task.createdAt === task.updatedAt) return 'Créée';
    return 'Modifiée';
  };

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

  if (recentTasks.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-cyan-300/60 bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 p-5 shadow-lg dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30">
        <h3 className="mb-4 text-base font-bold text-slate-900 dark:text-amber-50">
          Activité récente
        </h3>
        <p className="text-sm text-slate-600 dark:text-amber-300/70">
          Aucune activité récente
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-cyan-300/60 bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 p-5 shadow-lg dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30">
      <h3 className="mb-4 text-base font-bold text-slate-900 dark:text-amber-50">
        Activité récente
      </h3>

      <div className="space-y-3">
        {recentTasks.map(task => (
          <button
            key={task.id}
            onClick={() => onTaskClick(task.id)}
            className="flex w-full items-start gap-3 rounded-xl border border-slate-200/60 bg-white/50 p-3 text-left transition hover:border-cyan-400/60 hover:bg-white/80 hover:shadow-md dark:border-stone-700/60 dark:bg-stone-900/30 dark:hover:border-amber-700/60 dark:hover:bg-stone-900/50"
          >
            <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/40 dark:to-teal-900/40">
              {getActivityIcon(task)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-amber-50">
                {task.title}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <span className="font-medium text-slate-600 dark:text-amber-300/70">
                  {getActivityText(task)}
                </span>
                <span className="text-slate-500 dark:text-amber-300/50">•</span>
                <span className="text-slate-500 dark:text-amber-300/50">
                  {getTimeAgo(task.updatedAt)}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;