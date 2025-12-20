import { FiClock, FiAlertCircle, FiTrash2 } from 'react-icons/fi';

function UpcomingTasks({ tasks, onTaskClick, onTaskDelete }) {
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

  const handleDelete = async (e, taskId) => {
    e.stopPropagation(); // Empêcher le clic de remonter au bouton parent
    if (window.confirm('Supprimer définitivement cette tâche échue ?')) {
      await onTaskDelete(taskId);
    }
  };

  if (sortedTasks.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-cyan-300/60 bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 p-5 shadow-lg dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30">
        <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900 dark:text-amber-50">
          <FiClock size={18} />
          À venir
        </h3>
        <p className="text-sm text-slate-600 dark:text-amber-300/70">
          Aucune échéance prochaine 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-cyan-300/60 bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 p-5 shadow-lg dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30">
      <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900 dark:text-amber-50">
        <FiClock size={18} />
        À venir
      </h3>

      <div className="space-y-3">
        {sortedTasks.map(task => {
          const timeInfo = getTimeUntilDue(task.dueDate);
          
          return (
            <div key={task.id} className="relative">
              <button
                onClick={() => onTaskClick(task.id)}
                className="group w-full rounded-xl border border-slate-200/60 bg-white/50 p-3 text-left transition hover:border-cyan-400/60 hover:bg-white/80 hover:shadow-md dark:border-stone-700/60 dark:bg-stone-900/30 dark:hover:border-amber-700/60 dark:hover:bg-stone-900/50"
              >
                <div className="mb-1.5 flex items-start justify-between gap-2">
                  <p className="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-amber-50">
                    {task.title}
                  </p>
                  {timeInfo.urgent && (
                    <FiAlertCircle className="flex-shrink-0 text-rose-500 dark:text-rose-400" size={16} />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${timeInfo.color}`}>
                    {timeInfo.text}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-amber-300/60">
                    {task.priority === 'HIGH' ? '🔴' : task.priority === 'MEDIUM' ? '🟡' : '🟢'}
                  </span>
                </div>
                
                {/* Bouton poubelle pour les tâches échues */}
                {timeInfo.isOverdue && (
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={(e) => handleDelete(e, task.id)}
                      className="flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-500 hover:text-white dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white"
                      title="Supprimer la tâche échue"
                    >
                      <FiTrash2 size={12} />
                      <span>Supprimer</span>
                    </button>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UpcomingTasks;