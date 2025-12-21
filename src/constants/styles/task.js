// src/constants/styles/task.js

// ===== TASK EDIT FORM =====
export const EDIT_FORM_CONTAINER = "relative overflow-hidden rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-50 via-teal-50 to-orange-50 px-6 py-5 shadow-lg transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] dark:border-amber-800/70 dark:bg-gradient-to-br dark:from-amber-950/40 dark:via-stone-950/60 dark:to-slate-950/40";
export const DECORATIVE_HALO = "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-200/40 via-teal-200/40 to-orange-200/40 dark:bg-gradient-to-br dark:from-amber-900/20 dark:via-orange-900/20 dark:to-rose-900/20";

// ===== TASK FORM =====
export const FORM_CONTAINER = "bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6";
export const FORM_TITLE = "text-lg font-bold mb-4 text-gray-900 dark:text-white";

// ===== TASK ITEM STYLES =====
export const TASK_CARD_BASE = "group relative overflow-hidden rounded-2xl border-2 px-6 py-5 shadow-lg transition-all duration-200 ease-out";
export const TASK_CARD_GRADIENT = "bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30";
export const TASK_CARD_BORDER = "border-cyan-300/70 dark:border-amber-900/60";
export const TASK_CARD_HOVER = "hover:shadow-xl hover:border-cyan-400 hover:from-cyan-50/40 hover:to-orange-50/40 hover:-translate-y-0.5 hover:scale-[1.01] dark:hover:border-amber-800/80 dark:hover:from-amber-950/40 dark:hover:to-slate-950/40 dark:hover:shadow-xl";

// Halo décoratif pour TaskItem
export const TASK_HALO = "pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br from-cyan-200/40 via-teal-200/40 to-orange-200/40 dark:bg-gradient-to-br dark:from-amber-900/30 dark:via-orange-900/30 dark:to-rose-900/30";

// Handle de drag
export const TASK_DRAG_HANDLE = "pointer-events-none absolute inset-x-6 top-3 flex justify-center";
export const TASK_DRAG_BAR = "h-2 w-12 rounded-full bg-gradient-to-r from-cyan-300 via-teal-300 to-orange-300 opacity-60 transition-opacity group-hover:opacity-100 dark:bg-gradient-to-r dark:from-amber-700/60 dark:via-orange-700/60 dark:to-rose-700/60 dark:opacity-70 dark:group-hover:opacity-100";

// Badge verrouillé
export const TASK_LOCKED_BADGE = "absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 backdrop-blur-sm dark:bg-amber-600/20";

// Actions flottantes
export const TASK_ACTIONS_CONTAINER = "absolute right-4 top-4 flex gap-2 opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0";
export const TASK_ACTION_BUTTON = "rounded-full bg-white/90 p-2 shadow-lg transition-transform duration-150 hover:scale-110 active:scale-95";

// Contenu de la tâche
export const TASK_CONTENT = "mt-5 flex justify-between gap-4";
export const TASK_TITLE = "text-base font-bold leading-snug text-slate-900 dark:text-amber-50";
export const TASK_DESCRIPTION = "mt-2 text-sm font-medium leading-relaxed text-slate-700 dark:text-amber-200/80";

// Info date
export const TASK_DATE_INFO = "inline-flex items-center gap-1.5 text-xs font-bold";

// Badge durée
export const TASK_DURATION_BADGE = "inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-100 to-teal-100 px-3 py-1.5 text-xs font-bold text-cyan-800 shadow-sm dark:bg-gradient-to-r dark:from-amber-900/60 dark:to-orange-900/60 dark:text-amber-200";

// Timer section
export const TASK_TIMER_CONTAINER = "mt-4 rounded-xl border-2 border-cyan-300/60 bg-white/80 p-4 dark:border-amber-700/60 dark:bg-slate-900/60";
export const TASK_TIMER_LABEL = "text-xs font-semibold text-slate-600 dark:text-amber-300/80 mb-1";
export const TASK_TIMER_TIME = "text-lg font-bold text-cyan-700 dark:text-amber-400";

// Temps passé (tâche terminée)
export const TASK_TIME_SPENT = "mt-3 rounded-lg bg-emerald-50/80 px-3 py-2 dark:bg-emerald-900/20";

// Badges statut/priorité
export const TASK_BADGES_CONTAINER = "mt-3 flex flex-wrap gap-2.5 text-xs";
export const TASK_BADGE = "inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-bold shadow-sm";

// Progress bar
export const TASK_PROGRESS_CONTAINER = "mt-4";
export const TASK_PROGRESS_BAR = "h-1.5 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-slate-800/60";
export const TASK_PROGRESS_FILL = "h-full rounded-full bg-gradient-to-r shadow-sm transition-all duration-500";
export const TASK_PROGRESS_TEXT = "mt-1.5 text-xs font-medium text-slate-600 dark:text-amber-300/70";

// ===== TASK BADGE COMPONENT =====
export const TASK_BADGE_COMPONENT = "inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-bold shadow-sm text-xs";
export const TASK_BADGE_DOT = "h-2 w-2 rounded-full bg-current/80";

// Progress bar variant (date info)
export const TASK_PROGRESS_BAR_THIN = "h-1 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-slate-800/60";
export const TASK_PROGRESS_FILL_NO_TRANSITION = "h-full rounded-full shadow-sm";

// ===== TASK TAGS =====
export const TASK_TAGS_CONTAINER = "mt-2 flex flex-wrap gap-1.5";
export const TASK_TAG_BADGE = "rounded-full bg-cyan-100/90 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-amber-900/60 dark:text-amber-200";


// ===== TASK TIMER (EXTENDED) =====
export const TASK_TIMER_FLEX_CONTAINER = "flex items-center justify-between";
export const TASK_TIMER_INFO = "flex-1";
export const TASK_TIMER_PROGRESS_TEXT_NORMAL = "text-xs font-medium mt-1 text-slate-500 dark:text-slate-400";
export const TASK_TIMER_PROGRESS_TEXT_OVERTIME = "text-xs font-medium mt-1 text-rose-600 dark:text-rose-400";
export const TASK_TIMER_BUTTONS = "flex gap-2";
export const TASK_TIMER_START_BUTTON = "inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:from-emerald-400 hover:to-teal-400 hover:scale-105 active:scale-95 dark:from-emerald-600 dark:to-teal-600";
export const TASK_TIMER_PAUSE_BUTTON = "inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:from-amber-400 hover:to-orange-400 hover:scale-105 active:scale-95";
export const TASK_TIMER_STOP_BUTTON = "inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:from-rose-400 hover:to-red-400 hover:scale-105 active:scale-95";
export const TASK_TIMER_PROGRESS_BAR_CONTAINER = "mt-3";
export const TASK_TIMER_PROGRESS_BAR = "h-2 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-slate-800/60";
export const TASK_TIMER_PROGRESS_FILL_NORMAL = "h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600";
export const TASK_TIMER_PROGRESS_FILL_OVERTIME = "h-full rounded-full transition-all duration-500 bg-gradient-to-r from-rose-500 to-red-500 dark:from-rose-600 dark:to-red-600";


