// constants/taskConstants.js
export const PRIORITY_COLORS = {
  LOW: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/40',
  MEDIUM: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/40',
  HIGH: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/40',
};

export const STATUS_COLORS = {
  TODO: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/40',
  IN_PROGRESS: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/40',
  DONE: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/40',
};

export const STATUS_LABELS = {
  TODO: '📝 À faire',
  IN_PROGRESS: '⏳ En cours',
  DONE: '✅ Terminé',
};

export const PRIORITY_LABELS = {
  LOW: '🟢 Basse',
  MEDIUM: '🟡 Moyenne',
  HIGH: '🔴 Haute',
};

export const INPUT_CLASSES = "w-full rounded-xl border-2 border-cyan-300/60 bg-white/90 px-4 py-3 text-sm font-medium text-slate-900 outline-none ring-cyan-500/60 transition-shadow duration-150 focus:ring-2 focus:shadow-md dark:border-amber-700/60 dark:bg-slate-900/80 dark:text-amber-50 dark:ring-amber-500/60";
