// src/constants/styles/tasks.js

// ==========================================
// TASK CARDS - COMPACT VERSION
// ==========================================

export const TASK_CARD_BASE = `
  group relative overflow-hidden rounded-xl border-2 
  px-3 py-3 
  sm:px-4 sm:py-3
  lg:px-5 lg:py-3
  shadow-md transition-all duration-200 ease-out
`;

export const TASK_CARD_GRADIENT = "bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30";
export const TASK_CARD_BORDER = "border-cyan-300/70 dark:border-amber-900/60";
export const TASK_CARD_HOVER = "hover:shadow-xl hover:border-cyan-400 hover:from-cyan-50/40 hover:to-orange-50/40 hover:-translate-y-0.5 hover:scale-[1.01] dark:hover:border-amber-800/80 dark:hover:from-amber-950/40 dark:hover:to-slate-950/40 dark:hover:shadow-xl";

export const TASK_HALO = "pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br from-cyan-200/40 via-teal-200/40 to-orange-200/40 dark:bg-gradient-to-br dark:from-amber-900/30 dark:via-orange-900/30 dark:to-rose-900/30";

export const TASK_DRAG_HANDLE = "pointer-events-none absolute inset-x-4 top-1 flex justify-center";
export const TASK_DRAG_BAR = "h-1 w-8 rounded-full bg-gradient-to-r from-cyan-300 via-teal-300 to-orange-300 opacity-50 transition-opacity group-hover:opacity-100 dark:bg-gradient-to-r dark:from-amber-700/60 dark:via-orange-700/60 dark:to-rose-700/60";

export const TASK_LOCKED_BADGE = "absolute left-2 top-2 flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 backdrop-blur-sm dark:bg-amber-600/20 text-[10px]";

export const TASK_ACTIONS_CONTAINER = `
  absolute right-2 top-2
  flex gap-1
  opacity-100 translate-y-0
  sm:opacity-0 sm:translate-y-1
  transition-all duration-150 
  sm:group-hover:opacity-100 sm:group-hover:translate-y-0
`;

export const TASK_ACTION_BUTTON = "rounded-full bg-white/90 p-1 sm:p-1.5 shadow-md transition-transform duration-150 hover:scale-110 active:scale-95";

export const TASK_CONTENT = "mt-2 flex flex-col sm:flex-row sm:justify-between gap-2";

export const TASK_TITLE = "text-sm font-bold leading-tight text-slate-900 dark:text-amber-50";

export const TASK_DESCRIPTION = "mt-1 text-xs font-medium leading-snug text-slate-600 dark:text-amber-200/70 line-clamp-2";

export const TASK_METADATA_CONTAINER = "mt-2 flex flex-wrap items-center gap-2";

export const TASK_DATE_INFO = "inline-flex items-center gap-1 text-[11px] font-bold";

export const TASK_DURATION_BADGE = "inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-100 to-teal-100 px-2 py-0.5 text-[11px] font-bold text-cyan-800 shadow-sm dark:bg-gradient-to-r dark:from-amber-900/60 dark:to-orange-900/60 dark:text-amber-200";

export const TASK_BADGES_CONTAINER = "mt-2 flex flex-wrap gap-1.5 text-[11px]";

export const TASK_BADGE = "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-bold shadow-sm text-[11px]";
export const TASK_BADGE_COMPONENT = "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-bold shadow-sm text-[11px]";
export const TASK_BADGE_DOT = "h-1.5 w-1.5 rounded-full bg-current/80";

export const TASK_TAGS_CONTAINER = "mt-1 flex flex-wrap gap-1";
export const TASK_TAG_BADGE = "rounded-full bg-cyan-100/90 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-800 dark:bg-amber-900/60 dark:text-amber-200";

export const TASK_ITEM_CONTENT_FLEX = "flex-1";

export const TASK_DURATION_ICON = "h-3 w-3 text-cyan-600 dark:text-amber-400";

export const TASK_LOCKED_ICON = "text-amber-600 dark:text-amber-400 animate-pulse";
export const TASK_LOCKED_TEXT = "text-[10px] font-bold text-amber-700 dark:text-amber-300";
export const TASK_UNLOCK_ICON = "animate-pulse";

export const TASK_ACTION_LOCK_LOCKED = "text-amber-600 hover:bg-amber-500 hover:text-white dark:bg-amber-900/80 dark:text-amber-300 dark:hover:bg-amber-600";
export const TASK_ACTION_LOCK_UNLOCKED = "text-slate-500 hover:bg-amber-500 hover:text-white dark:bg-slate-800/80 dark:text-slate-400 dark:hover:bg-amber-600";
export const TASK_ACTION_EDIT = "text-cyan-600 hover:bg-cyan-500 hover:text-white dark:bg-amber-900/80 dark:text-amber-300 dark:hover:bg-amber-600 dark:hover:text-white";
export const TASK_ACTION_DELETE = "text-rose-500 hover:bg-rose-500 hover:text-white dark:bg-rose-900/80 dark:text-rose-300 dark:hover:bg-rose-600 dark:hover:text-white";

export const TASK_TIME_SPENT_CONTAINER = "mt-1.5 relative rounded-lg bg-emerald-50/80 px-2 py-1 text-[11px] dark:bg-emerald-900/20";
export const TASK_TIME_SPENT_TEXT = "text-[11px] font-semibold text-emerald-700 dark:text-emerald-300";
export const TASK_TIME_SPENT_CLOSE = "absolute right-1 top-1 text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200 transition-colors";

// ==========================================
// TASK TIMER - COMPACT
// ==========================================

export const TASK_TIMER_CONTAINER = "mt-2 rounded-lg border border-cyan-300/60 bg-white/80 p-2 dark:border-amber-700/60 dark:bg-slate-900/60";
export const TASK_TIMER_LABEL = "text-[10px] font-semibold text-slate-600 dark:text-amber-300/80 mb-0.5";
export const TASK_TIMER_TIME = "text-sm font-bold text-cyan-700 dark:text-amber-400";
export const TASK_TIMER_FLEX_CONTAINER = "flex items-center justify-between gap-2";
export const TASK_TIMER_INFO = "flex-1";
export const TASK_TIMER_BUTTONS = "flex gap-1";
export const TASK_TIMER_START_BUTTON = "inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-2 py-1 text-[11px] font-bold text-white shadow-sm transition-all hover:scale-105 active:scale-95";
export const TASK_TIMER_PAUSE_BUTTON = "inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-1 text-[11px] font-bold text-white shadow-sm transition-all hover:scale-105 active:scale-95";
export const TASK_TIMER_STOP_BUTTON = "inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-rose-500 to-red-500 px-2 py-1 text-[11px] font-bold text-white shadow-sm transition-all hover:scale-105 active:scale-95";
export const TASK_TIMER_PROGRESS_BAR_CONTAINER = "mt-1.5";
export const TASK_TIMER_PROGRESS_BAR = "h-1 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-slate-800/60";
export const TASK_TIMER_PROGRESS_FILL_NORMAL = "h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600";
export const TASK_TIMER_PROGRESS_FILL_OVERTIME = "h-full rounded-full transition-all duration-500 bg-gradient-to-r from-rose-500 to-red-500 dark:from-rose-600 dark:to-red-600";
export const TASK_TIMER_PROGRESS_TEXT_NORMAL = "text-[10px] font-medium mt-0.5 text-slate-500 dark:text-slate-400";
export const TASK_TIMER_PROGRESS_TEXT_OVERTIME = "text-[10px] font-medium mt-0.5 text-rose-600 dark:text-rose-400";

export const TASK_TIME_SPENT = "mt-1.5 rounded-lg bg-emerald-50/80 px-2 py-1 text-[11px] dark:bg-emerald-900/20";

export const TASK_PROGRESS_CONTAINER = "mt-2";
export const TASK_PROGRESS_BAR = "h-1 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-slate-800/60";
export const TASK_PROGRESS_FILL = "h-full rounded-full bg-gradient-to-r shadow-sm transition-all duration-500";
export const TASK_PROGRESS_onTaskUpdateTEXT = "mt-1 text-[10px] font-medium text-slate-600 dark:text-amber-300/70";
export const TASK_PROGRESS_BAR_THIN = "h-1 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-slate-800/60";
export const TASK_PROGRESS_FILL_NO_TRANSITION = "h-full rounded-full shadow-sm";

export const TASK_TIMER_COMPACT_CONTAINER = "mt-2 inline-flex items-center gap-2 text-xs text-slate-700 dark:text-amber-200 bg-slate-100 dark:bg-stone-800 px-2 py-1 rounded-lg";
export const TASK_TIMER_COMPACT_TIME = "tabular-nums font-semibold";
export const TASK_TIMER_COMPACT_PLAY = "text-slate-600 hover:text-emerald-600 transition-colors dark:text-slate-400 dark:hover:text-emerald-400";
export const TASK_TIMER_COMPACT_PAUSE = "text-slate-600 hover:text-amber-600 transition-colors dark:text-slate-400 dark:hover:text-amber-400";
export const TASK_TIMER_COMPACT_STOP = "text-slate-600 hover:text-rose-600 transition-colors dark:text-slate-400 dark:hover:text-rose-400";
export const TASK_PROGRESS_TEXT = "mt-1 text-[10px] font-medium text-slate-600 dark:text-amber-300/70";
