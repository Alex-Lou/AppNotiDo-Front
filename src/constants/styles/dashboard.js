// src/constants/styles/dashboard.js

// ===== DASHBOARD LAYOUT =====
export const DASHBOARD_LAYOUT_CONTAINER = "min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-orange-200 text-slate-700 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-amber-50";
export const DASHBOARD_LAYOUT_MAIN = "ml-72 mr-80 min-h-screen px-10 py-10";

// ===== DASHBOARD HEADER =====
export const DASHBOARD_HEADER_CONTAINER = "mb-8 flex items-center justify-between";
export const DASHBOARD_HEADER_TITLE = "text-4xl font-bold tracking-tight text-slate-800 dark:text-amber-50";
export const DASHBOARD_HEADER_SUBTITLE = "mt-2 text-base font-medium text-slate-700/90 dark:text-amber-200/80";

// ===== RIGHT SIDEBAR =====
export const RIGHT_SIDEBAR = "fixed right-0 top-0 h-full w-80 overflow-y-auto border-l-2 border-cyan-300/60 bg-gradient-to-b from-cyan-100/30 via-teal-100/20 to-orange-100/30 px-6 py-10 dark:border-amber-900/60 dark:bg-gradient-to-b dark:from-slate-950/60 dark:via-stone-950/50 dark:to-slate-950/60";

// ===== DAY SUMMARY =====
export const DAY_SUMMARY_CONTAINER = "rounded-2xl border-2 border-cyan-300/60 bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 p-5 shadow-lg dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30";
export const DAY_SUMMARY_DATE_ICON = "text-cyan-600 dark:text-amber-400";
export const DAY_SUMMARY_DATE_TEXT = "text-base font-bold capitalize text-slate-900 dark:text-amber-50";
export const PROGRESS_LABEL = "text-sm font-semibold text-slate-700 dark:text-amber-200";
export const PROGRESS_PERCENTAGE = "text-sm font-bold text-cyan-600 dark:text-amber-400";
export const PROGRESS_BAR_BG = "h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800";
export const PROGRESS_BAR_FILL = "h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-500 dark:from-amber-500 dark:to-orange-500";

// Mini stat cards
export const MINI_STAT_CARD = "flex items-center gap-2 rounded-xl p-3";
export const MINI_STAT_SUCCESS = "bg-gradient-to-br from-cyan-100/50 to-teal-100/50 dark:from-cyan-900/20 dark:to-teal-900/20";
export const MINI_STAT_WARNING = "bg-gradient-to-br from-orange-100/50 to-amber-100/50 dark:from-orange-900/20 dark:to-amber-900/20";
export const MINI_STAT_LABEL = "text-xs font-medium text-slate-600 dark:text-amber-300/70";
export const MINI_STAT_VALUE = "text-lg font-bold text-slate-900 dark:text-amber-50";

// Alerte urgente
export const URGENT_ALERT = "mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-100 to-orange-100 p-3 dark:from-rose-900/30 dark:to-orange-900/30";
export const URGENT_ALERT_TEXT = "text-sm font-bold text-rose-800 dark:text-rose-300";

// ===== URGENT SECTION =====
export const URGENT_HEADER_BUTTON = "group w-full mb-4 flex items-center justify-between gap-3 rounded-xl border-2 border-rose-400/60 bg-gradient-to-r from-rose-100 via-orange-100 to-red-100 px-5 py-3 shadow-lg transition-all hover:shadow-xl dark:border-rose-800/70 dark:bg-gradient-to-r dark:from-rose-950/60 dark:via-red-950/70 dark:to-orange-950/60";
export const URGENT_TASKS_CONTAINER = "space-y-4 rounded-2xl border-2 border-rose-400/60 bg-gradient-to-br from-rose-50/80 via-orange-50/60 to-red-50/80 p-6 shadow-xl dark:border-rose-800/70 dark:bg-gradient-to-br dark:from-rose-950/40 dark:via-red-950/50 dark:to-orange-950/40";
export const URGENT_COUNT_BADGE = "flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-sm font-bold text-white shadow-md dark:bg-rose-700";
export const URGENT_TITLE = "text-base font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2";
export const URGENT_SUBTITLE = "text-xs font-medium text-rose-600/80 dark:text-rose-300/70";
export const SECTION_DIVIDER = "my-8 flex items-center gap-4";
export const DIVIDER_LINE = "h-0.5 flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700";
export const DIVIDER_TEXT = "text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400";

// ===== EXPORT BUTTON =====
export const EXPORT_BUTTON = "inline-flex items-center gap-2 rounded-xl border-2 border-emerald-400/70 bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-3 text-sm font-bold text-emerald-800 shadow-md transition hover:border-emerald-500 hover:from-emerald-100 hover:to-teal-100 hover:shadow-lg dark:border-emerald-700/70 dark:bg-gradient-to-r dark:from-emerald-900/60 dark:to-teal-900/60 dark:text-emerald-200 dark:hover:border-emerald-600 dark:hover:from-emerald-900/80 dark:hover:to-teal-900/80";
export const EXPORT_DROPDOWN = "absolute right-0 top-full z-[100] mt-2 w-48 overflow-hidden rounded-xl border-2 border-slate-200/60 bg-white shadow-xl dark:border-stone-700/60 dark:bg-stone-900/95";
export const EXPORT_OPTION_BASE = "flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition dark:text-amber-100";
export const EXPORT_OPTION_CSV = "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/40 dark:hover:to-teal-900/40";
export const EXPORT_OPTION_PDF = "hover:bg-gradient-to-r hover:from-rose-50 hover:to-orange-50 dark:hover:from-rose-900/40 dark:hover:to-orange-900/40";
export const EXPORT_ICON_CONTAINER = "flex h-8 w-8 items-center justify-center rounded-lg";
export const EXPORT_ICON_CSV = "bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-800/50 dark:to-teal-800/50";
export const EXPORT_ICON_PDF = "bg-gradient-to-br from-rose-100 to-orange-100 dark:from-rose-800/50 dark:to-orange-800/50";
export const EXPORT_OPTION_TITLE = "font-bold";
export const EXPORT_OPTION_SUBTITLE = "text-xs text-slate-500 dark:text-amber-300/60";
export const EXPORT_SEPARATOR = "mx-3 my-1 border-t border-slate-200 dark:border-stone-700";

// ===== UPCOMING TASKS =====
export const UPCOMING_CONTAINER = "rounded-2xl border-2 border-cyan-300/60 bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 p-5 shadow-lg dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30";
export const UPCOMING_TITLE = "mb-4 flex items-center gap-2 text-base font-bold text-slate-900 dark:text-amber-50";
export const UPCOMING_EMPTY = "text-sm text-slate-600 dark:text-amber-300/70";
export const UPCOMING_TASK_ITEM = "group w-full cursor-pointer rounded-xl border border-slate-200/60 bg-white/50 p-3 text-left transition hover:border-cyan-400/60 hover:bg-white/80 hover:shadow-md dark:border-stone-700/60 dark:bg-stone-900/30 dark:hover:border-amber-700/60 dark:hover:bg-stone-900/50";
export const UPCOMING_TASK_TITLE = "line-clamp-2 text-sm font-semibold text-slate-900 dark:text-amber-50";
export const UPCOMING_TASK_TIME = "text-xs font-bold";
export const UPCOMING_TASK_PRIORITY = "text-xs font-medium text-slate-500 dark:text-amber-300/60";
export const UPCOMING_DELETE_BUTTON = "flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-500 hover:text-white dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white";

// ===== TASK FILTERS =====
export const NEW_TASK_BUTTON = "inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-orange-500 px-7 py-3.5 text-base font-bold text-white shadow-lg transition hover:shadow-xl hover:from-cyan-400 hover:via-teal-400 hover:to-orange-400 dark:from-amber-600 dark:via-orange-600 dark:to-rose-600 dark:hover:from-amber-500 dark:hover:via-orange-500 dark:hover:to-rose-500";
export const SEARCH_COMPACT_BUTTON = "group flex items-center gap-2 rounded-xl border-2 border-cyan-400/70 bg-gradient-to-r from-white to-cyan-50/50 px-4 py-3 shadow-md transition-all hover:border-cyan-500 hover:shadow-lg dark:border-stone-700/70 dark:bg-gradient-to-r dark:from-stone-900/80 dark:to-slate-900/80 dark:hover:border-stone-600";
export const SEARCH_INPUT = "w-full rounded-xl border-2 border-cyan-400/70 bg-gradient-to-r from-white to-cyan-50/30 py-3 pl-12 pr-24 text-sm font-medium text-slate-800 placeholder-slate-500 shadow-md outline-none ring-cyan-400/60 transition focus:border-cyan-500 focus:ring-2 dark:border-stone-700/70 dark:bg-gradient-to-r dark:from-stone-900/80 dark:to-slate-900/80 dark:text-amber-50 dark:placeholder-amber-300/50 dark:ring-amber-700/60 dark:focus:border-stone-600";
export const SEARCH_COUNT_BADGE = "rounded-full bg-cyan-500 px-2.5 py-1 text-xs font-bold text-white dark:bg-amber-600";
export const SEARCH_CLEAR_BUTTON = "absolute inset-y-0 right-3 flex items-center justify-center rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 dark:text-amber-400 dark:hover:bg-stone-800 dark:hover:text-amber-300";
export const SELECT_BASE = "rounded-xl border-2 px-5 py-3 text-sm font-bold shadow-md outline-none transition focus:ring-2 [&>option]:bg-white [&>option]:text-slate-800 dark:[&>option]:bg-stone-800 dark:[&>option]:text-amber-50";
export const SELECT_STATUS = "border-cyan-400/70 bg-gradient-to-br from-cyan-50 to-teal-50 text-slate-800 ring-cyan-400/60 hover:border-cyan-500 dark:border-stone-700/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80 dark:text-amber-50 dark:ring-amber-700/60 dark:hover:border-stone-600";
export const SELECT_PRIORITY = "border-orange-400/70 bg-gradient-to-br from-orange-50 to-amber-50 text-slate-800 ring-orange-400/60 hover:border-orange-500 dark:border-stone-700/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80 dark:text-amber-50 dark:ring-amber-700/60 dark:hover:border-stone-600";
export const SEARCH_NO_RESULTS = "mt-3 text-sm font-medium text-rose-600 dark:text-rose-400";
export const SEARCH_RESULTS_INFO = "mt-3 text-sm font-medium text-slate-600 dark:text-amber-300/80";

// ===== STATS CARDS =====
export const STAT_CARD_BASE = "relative overflow-hidden rounded-2xl px-6 py-5 text-left shadow-lg ring-2 transition-all hover:scale-[1.02] hover:shadow-xl";
export const STAT_CARD_HALO = "pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full";
export const STAT_CARD_LABEL = "text-sm font-bold uppercase tracking-wide";
export const STAT_CARD_VALUE = "mt-3 text-4xl font-bold";
export const STAT_CARD_SUBTITLE = "mt-2 text-xs font-semibold uppercase tracking-wider";
export const STAT_CARD_VARIANTS = {
  ALL: {
    bg: "bg-gradient-to-br from-slate-100 to-slate-200 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80",
    halo: "bg-gradient-to-br from-slate-200 to-slate-300 dark:bg-gradient-to-br dark:from-stone-800/60 dark:to-slate-800/60",
    ringActive: "ring-slate-500 dark:ring-stone-600",
    ringInactive: "ring-slate-400/50 dark:ring-stone-700/70",
    label: "text-slate-700 dark:text-amber-200/80",
    value: "text-slate-900 dark:text-amber-50",
    subtitle: "text-slate-600 dark:text-amber-300/70"
  },
  TODO: {
    bg: "bg-gradient-to-br from-cyan-100 to-teal-200 dark:bg-gradient-to-br dark:from-cyan-900/70 dark:to-teal-900/70",
    halo: "bg-gradient-to-br from-cyan-200 to-teal-300 dark:bg-gradient-to-br dark:from-cyan-800/60 dark:to-teal-800/60",
    ringActive: "ring-cyan-500 dark:ring-cyan-700",
    ringInactive: "ring-cyan-400/60 dark:ring-cyan-800/70",
    label: "text-cyan-900 dark:text-cyan-200",
    value: "text-cyan-900 dark:text-cyan-50",
    subtitle: "text-cyan-800 dark:text-cyan-300/80"
  },
  IN_PROGRESS: {
    bg: "bg-gradient-to-br from-orange-100 to-orange-200 dark:bg-gradient-to-br dark:from-orange-900/70 dark:to-amber-900/70",
    halo: "bg-gradient-to-br from-orange-200 to-orange-300 dark:bg-gradient-to-br dark:from-orange-800/60 dark:to-amber-800/60",
    ringActive: "ring-orange-500 dark:ring-orange-700",
    ringInactive: "ring-orange-400/60 dark:ring-orange-800/70",
    label: "text-orange-900 dark:text-orange-200",
    value: "text-orange-900 dark:text-orange-50",
    subtitle: "text-orange-800 dark:text-orange-300/80"
  },
  DONE: {
    bg: "bg-gradient-to-br from-teal-100 to-emerald-200 dark:bg-gradient-to-br dark:from-teal-900/70 dark:to-emerald-900/70",
    halo: "bg-gradient-to-br from-teal-200 to-emerald-300 dark:bg-gradient-to-br dark:from-teal-800/60 dark:to-emerald-800/60",
    ringActive: "ring-teal-500 dark:ring-teal-700",
    ringInactive: "ring-teal-400/60 dark:ring-teal-800/70",
    label: "text-teal-900 dark:text-teal-200",
    value: "text-teal-900 dark:text-teal-50",
    subtitle: "text-teal-800 dark:text-teal-300/80"
  }
};

// ===== RECENT ACTIVITY =====
export const ACTIVITY_CONTAINER = UPCOMING_CONTAINER;
export const ACTIVITY_TITLE = UPCOMING_TITLE;
export const ACTIVITY_EMPTY = UPCOMING_EMPTY;
export const ACTIVITY_ITEM = "flex w-full items-start gap-3 rounded-xl border border-slate-200/60 bg-white/50 p-3 text-left transition hover:border-cyan-400/60 hover:bg-white/80 hover:shadow-md dark:border-stone-700/60 dark:bg-stone-900/30 dark:hover:border-amber-700/60 dark:hover:bg-stone-900/50";
export const ACTIVITY_ICON_CONTAINER = "mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/40 dark:to-teal-900/40";
export const ACTIVITY_TITLE_TEXT = "truncate text-sm font-semibold text-slate-900 dark:text-amber-50";
export const ACTIVITY_TYPE_TEXT = "font-medium text-slate-600 dark:text-amber-300/70";
export const ACTIVITY_TIME_TEXT = "text-slate-500 dark:text-amber-300/50";

// ===== IN-APP NOTIFICATIONS =====
export const NOTIFICATIONS_CONTAINER = "fixed left-6 bottom-6 z-50 space-y-3 max-w-sm";
export const NOTIFICATION_ITEM = "relative flex items-start gap-3 rounded-2xl border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-100 to-teal-100 px-5 py-4 shadow-xl backdrop-blur-sm dark:border-amber-800/70 dark:bg-gradient-to-br dark:from-amber-950/80 dark:to-stone-950/80 dark:text-amber-50";
export const NOTIFICATION_ICON_CONTAINER = "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-200 to-teal-200 dark:bg-gradient-to-br dark:from-amber-900/60 dark:to-orange-900/60";
export const NOTIFICATION_TITLE = "mb-1.5 text-sm font-bold text-slate-800 dark:text-amber-50";
export const NOTIFICATION_MESSAGE = "text-xs leading-relaxed text-slate-700 dark:text-amber-100/80";
export const NOTIFICATION_CLOSE_BUTTON = "flex-shrink-0 rounded-full p-1.5 text-cyan-600 transition hover:bg-cyan-200 hover:text-cyan-800 dark:text-amber-300/70 dark:hover:bg-amber-900/60 dark:hover:text-amber-50";

// ===== EMPTY STATE =====
export const EMPTY_STATE_CONTAINER = "rounded-2xl border-2 border-slate-400/50 bg-gradient-to-br from-slate-100 to-slate-200 p-12 text-center shadow-lg dark:border-stone-800/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80";
export const EMPTY_STATE_TEXT = "text-base font-semibold text-slate-700 dark:text-amber-300/80";
