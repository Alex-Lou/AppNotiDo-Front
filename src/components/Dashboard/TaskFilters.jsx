import { FiPlus } from 'react-icons/fi';

function TaskFilters({ 
  statusFilter, 
  setStatusFilter, 
  priorityFilter, 
  setPriorityFilter,
  onNewTask 
}) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <button
        onClick={onNewTask}
        className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-orange-500 px-7 py-3.5 text-base font-bold text-white shadow-lg transition hover:shadow-xl hover:from-cyan-400 hover:via-teal-400 hover:to-orange-400 dark:from-amber-600 dark:via-orange-600 dark:to-rose-600 dark:hover:from-amber-500 dark:hover:via-orange-500 dark:hover:to-rose-500"
      >
        <FiPlus size={20} /> 
        <span>Nouvelle tâche</span>
      </button>

      <div className="flex gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border-2 border-cyan-400/70 bg-gradient-to-br from-cyan-50 to-teal-50 px-5 py-3 text-sm font-bold text-slate-800 shadow-md outline-none ring-cyan-400/60 transition focus:ring-2 hover:border-cyan-500 dark:border-stone-700/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80 dark:text-amber-50 dark:ring-amber-700/60 dark:hover:border-stone-600 [&>option]:bg-white [&>option]:text-slate-800 dark:[&>option]:bg-stone-800 dark:[&>option]:text-amber-50"
        >
          <option value="ALL">📋 Tous les statuts</option>
          <option value="TODO">📝 À faire</option>
          <option value="IN_PROGRESS">⏳ En cours</option>
          <option value="DONE">✅ Terminé</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-xl border-2 border-orange-400/70 bg-gradient-to-br from-orange-50 to-amber-50 px-5 py-3 text-sm font-bold text-slate-800 shadow-md outline-none ring-orange-400/60 transition focus:ring-2 hover:border-orange-500 dark:border-stone-700/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80 dark:text-amber-50 dark:ring-amber-700/60 dark:hover:border-stone-600 [&>option]:bg-white [&>option]:text-slate-800 dark:[&>option]:bg-stone-800 dark:[&>option]:text-amber-50"
        >
          <option value="ALL">🎯 Toutes priorités</option>
          <option value="LOW">🟢 Basse</option>
          <option value="MEDIUM">🟡 Moyenne</option>
          <option value="HIGH">🔴 Haute</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilters;