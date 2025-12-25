// src/constants/styles/tasks.js

// ==========================================
// TASK CARDS - RESPONSIVE
// ==========================================

export const TASK_CARD_BASE = `
  group relative overflow-hidden rounded-2xl border-2 
  px-4 py-4 
  sm:px-5 sm:py-5
  lg:px-6 lg:py-5
  shadow-lg transition-all duration-200 ease-out
`;

export const TASK_CARD_GRADIENT = "bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30";
export const TASK_CARD_BORDER = "border-cyan-300/70 dark:border-amber-900/60";
export const TASK_CARD_HOVER = "hover:shadow-xl hover:border-cyan-400 hover:from-cyan-50/40 hover:to-orange-50/40 hover:-translate-y-0.5 hover:scale-[1.01] dark:hover:border-amber-800/80 dark:hover:from-amber-950/40 dark:hover:to-slate-950/40 dark:hover:shadow-xl";

export const TASK_HALO = "pointer-events-none absolute -right-10 -top-10 sm:-right-12 sm:-top-12 h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-gradient-to-br from-cyan-200/40 via-teal-200/40 to-orange-200/40 dark:bg-gradient-to-br dark:from-amber-900/30 dark:via-orange-900/30 dark:to-rose-900/30";
export const TASK_DRAG_HANDLE = "pointer-events-none absolute inset-x-4 top-2 sm:inset-x-6 sm:top-3 flex justify-center";
export const TASK_DRAG_BAR = "h-1.5 w-10 sm:h-2 sm:w-12 rounded-full bg-gradient-to-r from-cyan-300 via-teal-300 to-orange-300 opacity-60 transition-opacity group-hover:opacity-100 dark:bg-gradient-to-r dark:from-amber-700/60 dark:via-orange-700/60 dark:to-rose-700/60 dark:opacity-70 dark:group-hover:opacity-100";
export const TASK_LOCKED_BADGE = "absolute left-3 top-3 sm:left-4 sm:top-4 flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-0.5 sm:px-3 sm:py-1 backdrop-blur-sm dark:bg-amber-600/20 text-xs";
export const TASK_ACTIONS_CONTAINER = `
  absolute right-3 top-3 sm:right-4 sm:top-4 
  flex gap-1.5 sm:gap-2 
  opacity-100 translate-y-0
  sm:opacity-0 sm:translate-y-1
  transition-all duration-150 
  sm:group-hover:opacity-100 sm:group-hover:translate-y-0
`;
export const TASK_ACTION_BUTTON = "rounded-full bg-white/90 p-1.5 sm:p-2 shadow-lg transition-transform duration-150 hover:scale-110 active:scale-95";
export const TASK_CONTENT = "mt-4 sm:mt-5 flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4";
export const TASK_TITLE = "text-sm sm:text-base font-bold leading-snug text-slate-900 dark:text-amber-50";
export const TASK_DESCRIPTION = "mt-1.5 sm:mt-2 text-xs sm:text-sm font-medium leading-relaxed text-slate-700 dark:text-amber-200/80";
export const TASK_DATE_INFO = "inline-flex items-center gap-1.5 text-xs font-bold";
export const TASK_DURATION_BADGE = "inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-100 to-teal-100 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-bold text-cyan-800 shadow-sm dark:bg-gradient-to-r dark:from-amber-900/60 dark:to-orange-900/60 dark:text-amber-200";
export const TASK_BADGES_CONTAINER = "mt-2 sm:mt-3 flex flex-wrap gap-2 sm:gap-2.5 text-xs";
export const TASK_BADGE = "inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 font-bold shadow-sm text-xs";
export const TASK_BADGE_COMPONENT = "inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 font-bold shadow-sm text-xs";
export const TASK_BADGE_DOT = "h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-current/80";
export const TASK_TAGS_CONTAINER = "mt-1.5 sm:mt-2 flex flex-wrap gap-1.5";
export const TASK_TAG_BADGE = "rounded-full bg-cyan-100/90 px-2 py-0.5 sm:px-2.5 text-xs font-semibold text-cyan-800 dark:bg-amber-900/60 dark:text-amber-200";
export const TASK_ITEM_CONTENT_FLEX = "flex-1";
export const TASK_METADATA_CONTAINER = "mt-3 flex flex-wrap items-center gap-3";
export const TASK_DURATION_ICON = "h-3.5 w-3.5 text-cyan-600 dark:text-amber-400";
export const TASK_LOCKED_ICON = "text-amber-600 dark:text-amber-400 animate-pulse";
export const TASK_LOCKED_TEXT = "text-xs font-bold text-amber-700 dark:text-amber-300";
export const TASK_UNLOCK_ICON = "animate-pulse";
export const TASK_ACTION_LOCK_LOCKED = "text-amber-600 hover:bg-amber-500 hover:text-white dark:bg-amber-900/80 dark:text-amber-300 dark:hover:bg-amber-600";
export const TASK_ACTION_LOCK_UNLOCKED = "text-slate-500 hover:bg-amber-500 hover:text-white dark:bg-slate-800/80 dark:text-slate-400 dark:hover:bg-amber-600";
export const TASK_ACTION_EDIT = "text-cyan-600 hover:bg-cyan-500 hover:text-white dark:bg-amber-900/80 dark:text-amber-300 dark:hover:bg-amber-600 dark:hover:text-white";
export const TASK_ACTION_DELETE = "text-rose-500 hover:bg-rose-500 hover:text-white dark:bg-rose-900/80 dark:text-rose-300 dark:hover:bg-rose-600 dark:hover:text-white";
export const TASK_TIME_SPENT_TEXT = "text-xs font-semibold text-emerald-700 dark:text-emerald-300";

// ==========================================
// TASK TIMER
// ==========================================

export const TASK_TIMER_CONTAINER = "mt-3 sm:mt-4 rounded-xl border-2 border-cyan-300/60 bg-white/80 p-3 sm:p-4 dark:border-amber-700/60 dark:bg-slate-900/60";
export const TASK_TIMER_LABEL = "text-xs font-semibold text-slate-600 dark:text-amber-300/80 mb-1";
export const TASK_TIMER_TIME = "text-base sm:text-lg font-bold text-cyan-700 dark:text-amber-400";
export const TASK_TIMER_FLEX_CONTAINER = "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3";
export const TASK_TIMER_INFO = "flex-1";
export const TASK_TIMER_BUTTONS = "flex flex-wrap gap-2";
export const TASK_TIMER_START_BUTTON = "inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:from-emerald-400 hover:to-teal-400 hover:scale-105 active:scale-95 dark:from-emerald-600 dark:to-teal-600";
export const TASK_TIMER_PAUSE_BUTTON = "inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:from-amber-400 hover:to-orange-400 hover:scale-105 active:scale-95";
export const TASK_TIMER_STOP_BUTTON = "inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:from-rose-400 hover:to-red-400 hover:scale-105 active:scale-95";
export const TASK_TIMER_PROGRESS_BAR_CONTAINER = "mt-2 sm:mt-3";
export const TASK_TIMER_PROGRESS_BAR = "h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-slate-800/60";
export const TASK_TIMER_PROGRESS_FILL_NORMAL = "h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600";
export const TASK_TIMER_PROGRESS_FILL_OVERTIME = "h-full rounded-full transition-all duration-500 bg-gradient-to-r from-rose-500 to-red-500 dark:from-rose-600 dark:to-red-600";
export const TASK_TIMER_PROGRESS_TEXT_NORMAL = "text-xs font-medium mt-1 text-slate-500 dark:text-slate-400";
export const TASK_TIMER_PROGRESS_TEXT_OVERTIME = "text-xs font-medium mt-1 text-rose-600 dark:text-rose-400";
export const TASK_TIME_SPENT = "mt-2 sm:mt-3 rounded-lg bg-emerald-50/80 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs dark:bg-emerald-900/20";
export const TASK_PROGRESS_CONTAINER = "mt-3 sm:mt-4";
export const TASK_PROGRESS_BAR = "h-1.5 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-slate-800/60";
export const TASK_PROGRESS_FILL = "h-full rounded-full bg-gradient-to-r shadow-sm transition-all duration-500";
export const TASK_PROGRESS_TEXT = "mt-1.5 text-xs font-medium text-slate-600 dark:text-amber-300/70";
export const TASK_PROGRESS_BAR_THIN = "h-1 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-slate-800/60";
export const TASK_PROGRESS_FILL_NO_TRANSITION = "h-full rounded-full shadow-sm";
export const TASK_TIMER_COMPACT_CONTAINER = "mt-2 inline-flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300";
export const TASK_TIMER_COMPACT_TIME = "tabular-nums font-semibold";
export const TASK_TIMER_COMPACT_PLAY = "text-slate-600 hover:text-emerald-600 transition-colors dark:text-slate-400 dark:hover:text-emerald-400";
export const TASK_TIMER_COMPACT_PAUSE = "text-slate-600 hover:text-amber-600 transition-colors dark:text-slate-400 dark:hover:text-amber-400";
export const TASK_TIMER_COMPACT_STOP = "text-slate-600 hover:text-rose-600 transition-colors dark:text-slate-400 dark:hover:text-rose-400";
export const TASK_TIME_SPENT_CONTAINER = "mt-2 sm:mt-3 relative rounded-lg bg-emerald-50/80 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs dark:bg-emerald-900/20";
export const TASK_TIME_SPENT_CLOSE = "absolute right-1 top-1 text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200 transition-colors";