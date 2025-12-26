// src/constants/styles/dashboard.js

// ==========================================
// DASHBOARD HEADER - RESPONSIVE
// ==========================================

export const DASHBOARD_HEADER_CONTAINER = `
  flex flex-col gap-2
  sm:flex-row sm:items-start sm:justify-between sm:gap-4
  mb-3 sm:mb-4 md:mb-6
`;

export const DASHBOARD_HEADER_TITLE = `
  text-xl leading-tight
  sm:text-2xl sm:leading-tight
  md:text-3xl md:leading-tight
  lg:text-4xl lg:leading-tight
  font-black
  bg-gradient-to-r from-cyan-600 via-teal-500 to-orange-500
  bg-clip-text text-transparent
  dark:from-amber-400 dark:via-orange-400 dark:to-rose-400
`;

export const DASHBOARD_HEADER_SUBTITLE = `
  mt-0.5 text-xs
  sm:mt-1 sm:text-sm
  md:text-base
  font-medium text-slate-700/90 dark:text-amber-200/80
`;

export const DASHBOARD_HEADER_SECTION = "mb-6 sm:mb-8";

// ==========================================
// NOTIFICATION BELL & PANEL STYLES
// ==========================================

// Bouton cloche
export const NOTIF_BELL_BUTTON = `
  relative p-2 rounded-xl
  bg-white/80 dark:bg-stone-800/80
  border border-slate-200 dark:border-stone-700
  text-slate-600 dark:text-amber-300
  hover:bg-cyan-50 dark:hover:bg-amber-900/30
  hover:border-cyan-300 dark:hover:border-amber-600
  hover:text-cyan-600 dark:hover:text-amber-400
  transition-all duration-200
  shadow-sm hover:shadow-md
`;

export const NOTIF_BELL_ICON = "w-5 h-5";

// Badge rouge
export const NOTIF_BADGE = `
  absolute -top-1 -right-1
  min-w-[18px] h-[18px]
  flex items-center justify-center
  px-1 rounded-full
  bg-gradient-to-r from-rose-500 to-red-500
  text-white text-[10px] font-bold
  shadow-lg shadow-rose-500/30
  animate-pulse
`;

// Panneau dropdown
export const NOTIF_PANEL = `
  absolute right-0 top-full mt-2
  w-80 sm:w-96
  max-h-[70vh]
  bg-white dark:bg-stone-900
  border border-slate-200 dark:border-stone-700
  rounded-xl shadow-2xl
  overflow-hidden
  z-50
  animate-in fade-in slide-in-from-top-2 duration-200
`;

export const NOTIF_PANEL_HEADER = `
  flex items-center justify-between
  px-4 py-3
  bg-gradient-to-r from-slate-50 to-cyan-50/50
  dark:from-stone-800 dark:to-amber-900/20
  border-b border-slate-200 dark:border-stone-700
`;

export const NOTIF_PANEL_TITLE = `
  text-sm font-bold text-slate-800 dark:text-amber-100
`;

export const NOTIF_PANEL_ACTIONS = `
  flex items-center gap-2
`;

export const NOTIF_MARK_ALL_BUTTON = `
  flex items-center gap-1
  px-2 py-1 rounded-lg
  text-xs font-medium
  text-cyan-600 dark:text-amber-400
  hover:bg-cyan-100 dark:hover:bg-amber-900/40
  transition-colors
`;

export const NOTIF_CLOSE_BUTTON = `
  p-1 rounded-lg
  text-slate-400 dark:text-stone-500
  hover:bg-slate-100 dark:hover:bg-stone-800
  hover:text-slate-600 dark:hover:text-stone-300
  transition-colors
`;

// Liste des notifications
export const NOTIF_LIST = `
  max-h-[50vh] overflow-y-auto
  divide-y divide-slate-100 dark:divide-stone-800
`;

// Item de notification
export const NOTIF_ITEM = `
  group flex items-start gap-3
  px-4 py-3
  cursor-pointer
  hover:bg-slate-50 dark:hover:bg-stone-800/50
  transition-colors
`;

export const NOTIF_ITEM_UNREAD = `
  bg-cyan-50/50 dark:bg-amber-900/20
  border-l-2 border-cyan-500 dark:border-amber-500
`;

export const NOTIF_ITEM_ICON = `
  flex-shrink-0 mt-0.5
`;

export const NOTIF_ITEM_CONTENT = `
  flex-1 min-w-0
`;

export const NOTIF_ITEM_TITLE = `
  text-sm font-semibold text-slate-800 dark:text-amber-100
  truncate
`;

export const NOTIF_ITEM_MESSAGE = `
  text-xs text-slate-600 dark:text-amber-200/70
  line-clamp-2 mt-0.5
`;

export const NOTIF_ITEM_TIME = `
  text-[10px] text-slate-400 dark:text-stone-500
  mt-1 block
`;

export const NOTIF_ITEM_ACTIONS = `
  flex-shrink-0 flex gap-1
  opacity-0 group-hover:opacity-100
  transition-opacity
`;

export const NOTIF_ITEM_ACTION_BUTTON = `
  p-1 rounded
  text-slate-400 dark:text-stone-500
  hover:bg-slate-100 dark:hover:bg-stone-700
  transition-colors
`;

export const NOTIF_DELETE_ALL_BUTTON = `
  flex items-center gap-1
  px-2 py-1 rounded-lg
  text-xs font-medium
  text-rose-600 dark:text-rose-400
  hover:bg-rose-100 dark:hover:bg-rose-900/40
  transition-colors
`;

// États vides et chargement
export const NOTIF_EMPTY = `
  flex flex-col items-center justify-center
  py-8 px-4
  text-sm text-slate-400 dark:text-stone-500
`;

export const NOTIF_LOADING = `
  flex flex-col items-center justify-center gap-2
  py-8 px-4
  text-sm text-slate-400 dark:text-stone-500
`;

// ==========================================
// STATS CARDS - RESPONSIVE OPTIMIZED
// ==========================================

export const STATS_GRID = `
  grid gap-2 mb-4
  grid-cols-2
  sm:grid-cols-2
  md:grid-cols-4
  sm:gap-3
  sm:mb-6
`;

export const STAT_CARD_BASE = `
  relative overflow-hidden rounded-xl 
  px-2 py-2
  sm:px-3 sm:py-2.5
  md:px-4 md:py-3
  lg:px-5 lg:py-3.5
  text-center
  shadow-md ring-2 transition-all 
  hover:scale-[1.02] hover:shadow-lg
  min-h-[85px]
  sm:min-h-[95px]
  md:min-h-[100px]
  flex flex-col items-center justify-center
`;

export const STAT_CARD_HALO = "pointer-events-none absolute -right-6 -top-6 h-10 w-10 sm:-right-7 sm:-top-7 sm:h-14 sm:w-14 md:-right-8 md:-top-8 md:h-16 md:w-16 lg:h-18 lg:w-18 rounded-full";

export const STAT_CARD_LABEL = `
  text-[7.5px] leading-[1.1]
  sm:text-[9px] sm:leading-tight
  md:text-[10px] md:leading-normal
  lg:text-xs 
  font-bold uppercase 
  tracking-[0.02em]
  sm:tracking-tight
  md:tracking-normal
  w-full
  max-w-full
  overflow-hidden
  text-ellipsis
`;

export const STAT_CARD_VALUE = `
  mt-1 text-xl
  sm:mt-1.5 sm:text-2xl 
  md:mt-2 md:text-2xl
  lg:text-3xl 
  font-bold
`;

export const STAT_CARD_SUBTITLE = `
  mt-0.5 text-[7px] leading-[1.1]
  sm:mt-0.5 sm:text-[8px] sm:leading-tight
  md:mt-1 md:text-[9px] md:leading-normal
  lg:text-xs
  font-bold uppercase 
  tracking-[0.02em]
  sm:tracking-tight
  md:tracking-normal
  w-full
  max-w-full
  overflow-hidden
  text-ellipsis
  whitespace-nowrap
`;

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

// ==========================================
// VIEW SWITCHER - RESPONSIVE
// ==========================================
export const VIEW_SWITCHER_CONTAINER = `
  flex items-center gap-1 sm:gap-1.5 md:gap-2
  w-full sm:w-auto
  overflow-x-auto
  scrollbar-hide
`;

export const VIEW_SWITCHER_BUTTON = `
  flex items-center justify-center gap-1 sm:gap-1.5 
  rounded-md sm:rounded-lg 
  px-2 py-1.5
  sm:px-2.5 sm:py-2
  md:px-3 md:py-2
  text-xs sm:text-sm font-medium 
  text-slate-500 
  transition-all duration-200
  hover:bg-slate-100 hover:text-slate-700
  dark:text-amber-300/70 
  dark:hover:bg-stone-700 dark:hover:text-amber-200
`;

export const VIEW_SWITCHER_BUTTON_ACTIVE = `
  bg-gradient-to-r from-cyan-500 to-teal-500 
  text-white shadow-sm
  hover:from-cyan-400 hover:to-teal-400 hover:text-white
  dark:from-amber-600 dark:to-orange-600
  dark:hover:from-amber-500 dark:hover:to-orange-500
`;

// ==========================================
// EXPORT BUTTON
// ==========================================

export const EXPORT_BUTTON = `
  inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg border-2 border-emerald-400/70 
  bg-gradient-to-r from-emerald-50 to-teal-50 
  px-2.5 py-1.5
  sm:px-3 sm:py-2
  md:px-4 md:py-2.5 
  text-[10px]
  sm:text-xs
  md:text-sm
  font-bold text-emerald-800 shadow-md 
  transition hover:border-emerald-500 hover:from-emerald-100 hover:to-teal-100 hover:shadow-lg 
  dark:border-emerald-700/70 dark:bg-gradient-to-r dark:from-emerald-900/60 dark:to-teal-900/60 
  dark:text-emerald-200 dark:hover:border-emerald-600 dark:hover:from-emerald-900/80 dark:hover:to-teal-900/80 
  whitespace-nowrap
  w-full sm:w-auto
  flex-shrink-0
`;

export const EXPORT_DROPDOWN = "absolute right-0 top-full z-[100] mt-2 w-44 sm:w-48 overflow-hidden rounded-xl border-2 border-slate-200/60 bg-white shadow-xl dark:border-stone-700/60 dark:bg-stone-900/95";
export const EXPORT_OPTION_BASE = "flex w-full items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-slate-700 transition dark:text-amber-100";
export const EXPORT_OPTION_CSV = "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/40 dark:hover:to-teal-900/40";
export const EXPORT_OPTION_PDF = "hover:bg-gradient-to-r hover:from-rose-50 hover:to-orange-50 dark:hover:from-rose-900/40 dark:hover:to-orange-900/40";
export const EXPORT_ICON_CONTAINER = "flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg";
export const EXPORT_ICON_CSV = "bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-800/50 dark:to-teal-800/50";
export const EXPORT_ICON_PDF = "bg-gradient-to-br from-rose-100 to-orange-100 dark:from-rose-800/50 dark:to-orange-800/50";
export const EXPORT_OPTION_TITLE = "font-bold";
export const EXPORT_OPTION_SUBTITLE = "text-xs text-slate-500 dark:text-amber-300/60";
export const EXPORT_SEPARATOR = "mx-2 sm:mx-3 my-1 border-t border-slate-200 dark:border-stone-700";

// ==========================================
// URGENT SECTION - RESPONSIVE
// ==========================================

export const URGENT_HEADER_BUTTON = `
  group w-full mb-3 sm:mb-4 flex items-center justify-between gap-2 sm:gap-3 
  rounded-xl border-2 border-rose-400/60 
  bg-gradient-to-r from-rose-100 via-orange-100 to-red-100 
  px-4 py-2.5 sm:px-5 sm:py-3
  shadow-lg transition-all hover:shadow-xl 
  dark:border-rose-800/70 
  dark:bg-gradient-to-r dark:from-rose-950/60 dark:via-red-950/70 dark:to-orange-950/60
`;

export const URGENT_TASKS_CONTAINER = `
  space-y-3 rounded-2xl border-2 border-rose-400/60 
  bg-gradient-to-br from-rose-50/80 via-orange-50/60 to-red-50/80 
  p-4 shadow-xl
  sm:space-y-4 sm:p-5
  lg:p-6
  dark:border-rose-800/70 dark:bg-gradient-to-br 
  dark:from-rose-950/40 dark:via-red-950/50 dark:to-orange-950/40
`;

export const URGENT_COUNT_BADGE = "flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-rose-600 text-xs sm:text-sm font-bold text-white shadow-md dark:bg-rose-700";
export const URGENT_TITLE = "text-sm sm:text-base font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2";
export const URGENT_SUBTITLE = "text-xs font-medium text-rose-600/80 dark:text-rose-300/70";