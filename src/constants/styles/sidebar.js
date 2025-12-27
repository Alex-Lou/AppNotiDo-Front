// src/constants/styles/sidebar.js


// ==========================================
// SIDEBARS - RESPONSIVE & COLLAPSIBLE
// ==========================================


export const SIDEBAR_CONTAINER = `
  fixed left-0 top-0 z-[60] flex h-full flex-col 
  border-r border-cyan-400/50
  bg-gradient-to-b from-cyan-200 via-teal-200 to-orange-200 
  pl-3 pr-3 py-4
  dark:border-amber-800/50
  dark:bg-gradient-to-b dark:from-amber-950/80 dark:via-stone-950/90 dark:to-slate-950/80
  transition-all duration-300 ease-in-out
  overflow-y-auto scrollbar-none
  sm:pl-1 sm:pr-1 sm:py-5
  xl:pl-1 xl:pr-1 xl:py-5
`;

// ==========================================
// QUOTE ACTION BUTTONS
// ==========================================

export const QUOTE_ACTIONS = `
  flex items-center gap-1
`;

export const QUOTE_BUTTON_BASE = `
  flex items-center justify-center w-7 h-7 rounded-lg
  transition-all duration-200 ease-out
  hover:scale-110 active:scale-95
`;

export const QUOTE_BUTTON_DEFAULT = `
  text-amber-600 dark:text-amber-400
  hover:bg-amber-200/50 dark:hover:bg-amber-800/50
`;

export const QUOTE_BUTTON_PINNED = `
  text-amber-700 dark:text-amber-300
  bg-amber-200/60 dark:bg-amber-800/60
`;


// Sidebar plus fine
export const getSidebarWidth = (isCollapsed) =>
  isCollapsed ? 'w-14' : 'w-52';


export const RIGHT_SIDEBAR_CONTAINER = `
  fixed right-0 top-0 z-[65] h-full overflow-y-auto 
  scrollbar-none
  border-l-2 border-cyan-300/60 
  bg-gradient-to-b from-cyan-100/30 via-teal-100/20 to-orange-100/30 
  px-4 py-5
  dark:border-amber-900/60 
  dark:bg-gradient-to-b dark:from-slate-950/60 dark:via-stone-950/50 dark:to-slate-950/60
  transition-all duration-300 ease-in-out
  sm:px-4 sm:py-6
  xl:px-5 xl:py-8
`;


export const RIGHT_SIDEBAR = RIGHT_SIDEBAR_CONTAINER;


// Right sidebar un peu plus fine aussi
export const getRightSidebarWidth = (isCollapsed) =>
  isCollapsed ? 'w-14' : 'w-60';


export const SIDEBAR_OVERLAY = `
  fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm
  transition-opacity duration-300
  xl:hidden
`;


// ==========================================
// WIDGET COMMON STYLES (Right Sidebar)
// ==========================================

export const WIDGET_HEADER = `
  flex items-center justify-between
`;

export const WIDGET_TITLE = `
  text-sm font-bold text-slate-800 dark:text-amber-50 capitalize
`;

export const WIDGET_COLLAPSE_BTN = `
  p-1.5 rounded-lg 
  text-slate-500 dark:text-amber-400
  hover:bg-white/60 dark:hover:bg-stone-800/60 
  transition-colors
`;

// ==========================================
// COLLAPSE BUTTONS
// ==========================================


export const COLLAPSE_BUTTON = `
  absolute top-3 flex h-7 w-7 items-center justify-center 
  rounded-lg bg-white/90 dark:bg-stone-800/90
  shadow-lg hover:shadow-xl
  text-slate-600 dark:text-amber-400
  hover:scale-110 active:scale-95
  transition-all duration-200
  z-[70]
  border-2 border-cyan-400/50 dark:border-amber-600/50
`;


export const COLLAPSE_BUTTON_LEFT = `
  ${COLLAPSE_BUTTON}
  right-1
`;


export const COLLAPSE_BUTTON_RIGHT = `
  ${COLLAPSE_BUTTON}
  left-1
`;


// ==========================================
// HAMBURGER & TOGGLE BUTTONS
// ==========================================


export const HAMBURGER_BUTTON = `
  fixed top-4 z-[70] flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center 
  rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 
  shadow-lg transition-all hover:scale-105 active:scale-95
  dark:from-amber-600 dark:to-orange-600
  xl:hidden
`;


export const TOGGLE_RIGHT_SIDEBAR_BUTTON = `
  fixed right-4 top-4 z-[70] flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center 
  rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 
  shadow-lg transition-all hover:scale-105 active:scale-95
  dark:from-rose-600 dark:to-red-600
  xl:hidden
`;


export const HAMBURGER_ICON = "text-white w-5 h-5 sm:w-5 sm:h-5";


// ==========================================
// SIDEBAR HEADER - RESPONSIVE
// ==========================================


export const SIDEBAR_HEADER = "mb-5 sm:mb-6 relative";
export const SIDEBAR_LOGO_CONTAINER = "flex items-center gap-2.5";
export const SIDEBAR_LOGO = `
  h-7 w-7 rounded-2xl shadow-md shadow-cyan-300/40 
  sm:h-8 sm:w-8
  dark:shadow-amber-700/40 transition-transform duration-200 ease-out 
  hover:scale-105 hover:-rotate-2
`;
export const SIDEBAR_TITLE = `
  bg-gradient-to-r from-cyan-700 via-teal-700 to-orange-600 
  bg-clip-text text-base font-bold tracking-tight text-transparent
  sm:text-lg
  dark:from-amber-500 dark:via-orange-500 dark:to-rose-500
`;
export const SIDEBAR_SUBTITLE =
  "mt-1 text-xs sm:text-sm font-script italic text-slate-800/90 dark:text-amber-200/80";


// ==========================================
// SIDEBAR COMPONENTS - RESPONSIVE
// ==========================================


export const USER_PROFILE_SIDEBAR_CONTAINER =
  "mb-4 sm:mb-5 rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-100 via-teal-100 to-orange-100 px-3 py-2.5 sm:px-3.5 sm:py-3 shadow-md dark:border-amber-800/70 dark:bg-gradient-to-br dark:from-amber-900/60 dark:via-stone-900/70 dark:to-slate-900/60";
export const USER_PROFILE_SIDEBAR_FLEX =
  "flex items-center gap-2 sm:gap-2.5";
export const USER_PROFILE_SIDEBAR_AVATAR =
  "flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-teal-500 to-orange-500 text-xs sm:text-sm font-bold text-white shadow-md dark:from-amber-600 dark:via-orange-600 dark:to-rose-600";
export const USER_PROFILE_SIDEBAR_INFO = "flex flex-col";
export const USER_PROFILE_SIDEBAR_NAME_ROW =
  "flex items-center gap-1.5 sm:gap-1.5";
export const USER_PROFILE_SIDEBAR_INPUT =
  "w-28 sm:w-32 rounded-md border border-cyan-400/70 bg-white/80 px-1.5 py-0.5 text-[11px] sm:text-xs font-semibold text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-amber-700/70 dark:bg-stone-900/80 dark:text-amber-50 dark:focus:border-amber-500 dark:focus:ring-amber-500";
export const USER_PROFILE_SIDEBAR_NAME =
  "max-w-[6.2rem] sm:max-w-[7.2rem] truncate text-xs sm:text-sm font-bold text-slate-900 dark:text-amber-50";
export const USER_PROFILE_SIDEBAR_BUTTONS = "flex gap-1";
export const USER_PROFILE_SIDEBAR_BUTTON =
  "text-[10px] text-slate-600 transition hover:text-slate-900 dark:text-amber-300 dark:hover:text-amber-100";
export const USER_PROFILE_SIDEBAR_STATUS =
  "mt-0.5 text-[11px] sm:text-xs font-medium text-slate-800/80 dark:text-amber-200/70";


export const URGENT_TASKS_SIDEBAR_CONTAINER =
  "mb-3 sm:mb-4 rounded-2xl border-2 border-red-400/60 bg-gradient-to-br from-red-100 to-orange-100 px-3 py-2.5 sm:px-3.5 sm:py-3 text-red-900 shadow-md dark:border-red-700/70 dark:bg-gradient-to-br dark:from-red-900/70 dark:to-orange-900/70 dark:text-red-100";
export const URGENT_TASKS_SIDEBAR_HEADER =
  "mb-1 flex items-center gap-2";
export const URGENT_TASKS_SIDEBAR_ICON = "text-red-700 dark:text-red-300";
export const URGENT_TASKS_SIDEBAR_TITLE =
  "text-xs sm:text-[13px] font-bold";
export const URGENT_TASKS_SIDEBAR_DESCRIPTION =
  "text-[11px] sm:text-xs font-medium leading-relaxed text-red-800/90 dark:text-red-200/80";


export const NOTIFICATION_PERMISSION_CONTAINER =
  "mb-3 sm:mb-4 rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-100 to-orange-100 px-3 py-2.5 sm:px-3.5 sm:py-3 text-amber-900 shadow-md dark:border-amber-700/70 dark:bg-gradient-to-br dark:from-amber-900/70 dark:to-orange-900/70 dark:text-amber-50";
export const NOTIFICATION_PERMISSION_HEADER =
  "mb-1.5 sm:mb-2 flex items-start gap-2";
export const NOTIFICATION_PERMISSION_ICON =
  "mt-0.5 text-amber-700 dark:text-amber-300";
export const NOTIFICATION_PERMISSION_TITLE =
  "mb-1 text-xs sm:text-[13px] font-bold text-amber-900 dark:text-amber-100";
export const NOTIFICATION_PERMISSION_DESCRIPTION =
  "text-[11px] sm:text-xs leading-relaxed text-amber-800/90 dark:text-amber-200/80";
export const NOTIFICATION_PERMISSION_BUTTON =
  "w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-[13px] font-bold text-white shadow-md transition hover:from-amber-400 hover:to-orange-400 dark:from-amber-600 dark:to-orange-600 dark:hover:from-amber-500 dark:hover:to-orange-500";
export const NOTIFICATION_TOGGLE_BUTTON = `
  flex items-center justify-center w-10 h-10 rounded-xl
  bg-white/50 dark:bg-stone-800/50
  border border-cyan-300/50 dark:border-amber-700/50
  transition-all duration-200 ease-out
  hover:bg-cyan-100/70 dark:hover:bg-stone-700/70
  hover:scale-105 active:scale-95
  shadow-sm hover:shadow-md
`;

export const QUICK_VIEWS_NAV =
  "mt-2.5 sm:mt-3.5 mb-4 sm:mb-5 space-y-1.5";
export const QUICK_VIEWS_TITLE =
  "mb-1.5 sm:mb-2 px-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-amber-300/70";
export const QUICK_VIEW_BUTTON_BASE =
  "flex w-full items-center gap-2 sm:gap-2.5 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-[11px] sm:text-xs font-semibold transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 dark:focus-visible:ring-amber-500/70";
export const QUICK_VIEW_BUTTON_ACTIVE =
  "bg-gradient-to-r from-cyan-100 to-teal-100 text-cyan-900 shadow-md ring-2 ring-cyan-400/70 dark:bg-gradient-to-r dark:from-amber-900/60 dark:to-stone-900/60 dark:text-amber-50 dark:ring-amber-800/70 translate-x-0.5";
export const QUICK_VIEW_BUTTON_INACTIVE =
  "text-slate-700 hover:bg-slate-100/70 hover:translate-x-0.5 dark:text-amber-200/80 dark:hover:bg-stone-800/60";
export const QUICK_VIEW_ICON_CONTAINER_BASE =
  "flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-white/80 shadow-sm dark:bg-stone-900/80 transition-transform duration-150";
export const QUICK_VIEW_ICON_CONTAINER_ACTIVE = "scale-105";
export const QUICK_VIEW_ICON_CONTAINER_INACTIVE = "scale-100";


export const QUOTE_CONTAINER =
  "relative mt-2.5 sm:mt-3.5 rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-2.5 sm:p-3 shadow-lg dark:border-amber-700/70 dark:bg-gradient-to-br dark:from-amber-900/40 dark:via-orange-900/40 dark:to-rose-900/40";

export const QUOTE_HEADER =
  "mb-1 sm:mb-1.5 flex items-center justify-between";

export const QUOTE_LABEL =
  "text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300";

export const QUOTE_TEXT =
  "mb-1 text-[10px] sm:text-[11px] font-medium italic leading-snug text-amber-900 dark:text-amber-100";

export const QUOTE_AUTHOR =
  "text-right text-[10px] sm:text-[11px] font-bold text-amber-700 dark:text-amber-300";


export const SHOW_QUOTE_BUTTON =
  "w-full rounded-xl border-2 border-amber-400/60 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-[13px] font-semibold text-amber-700 transition hover:from-amber-100 hover:to-orange-100 dark:border-amber-700/70 dark:bg-gradient-to-r dark:from-amber-900/40 dark:to-orange-900/40 dark:text-amber-300 dark:hover:from-amber-900/60 dark:hover:to-orange-900/60";


export const SIDEBAR_ACTIONS_CONTAINER =
  "mt-3.5 sm:mt-5 space-y-2 sm:space-y-2.5";
export const SIDEBAR_NOTIFICATIONS_BUTTON =
  "flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-teal-100 to-emerald-100 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-[13px] font-bold text-teal-900 shadow-md ring-2 ring-teal-400/70 transition hover:from-teal-200 hover:to-emerald-200 hover:shadow-lg dark:bg-gradient-to-r dark:from-teal-900/60 dark:to-emerald-900/60 dark:text-amber-100 dark:ring-teal-800/70 dark:hover:from-teal-900/80 dark:hover:to-emerald-900/80";
export const SIDEBAR_LOGOUT_BUTTON =
  "flex w-full items-center gap-1.5 sm:gap-2 rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-[13px] font-bold text-rose-700 transition hover:bg-gradient-to-r hover:from-rose-100 hover:to-orange-100 hover:shadow-md dark:text-rose-300 dark:hover:bg-gradient-to-r dark:hover:from-rose-900/60 dark:hover:to-orange-900/60";
export const SIDEBAR_NAV =
  "mt-3 sm:mt-3.5 flex-1 space-y-1.5 sm:space-y-2";
export const SIDEBAR_NAV_BUTTON =
  "flex w-full items-center gap-2 sm:gap-2.5 rounded-xl bg-gradient-to-r from-cyan-100 to-teal-100 px-3.5 py-2.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold text-cyan-900 shadow-md ring-2 ring-cyan-400/70 transition hover:from-cyan-200 hover:to-teal-200 hover:shadow-lg dark:bg-gradient-to-r dark:from-amber-900/60 dark:to-stone-900/60 dark:text-amber-50 dark:ring-amber-800/70 dark:hover:from-amber-900/80 dark:hover:to-stone-900/80";
export const SIDEBAR_NOTIFICATIONS_BUTTON_FLEX =
  "flex items-center gap-1.5";
export const SIDEBAR_NOTIFICATION_ICON_ENABLED =
  "text-teal-700 dark:text-amber-300";
export const SIDEBAR_NOTIFICATION_ICON_DISABLED =
  "text-teal-500 dark:text-stone-500";
export const SIDEBAR_THEME_TOGGLE_CONTAINER = "pointer-events-auto";
export const SIDEBAR_NAV_BUTTON_ICON =
  "text-cyan-700 dark:text-amber-300";
export const SIDEBAR_TOGGLE_ROW = `
  flex items-center justify-start gap-2
`;

export const SIDEBAR_ICON_BUTTON = `
  flex items-center justify-center w-10 h-10 rounded-xl
  bg-white/60 dark:bg-stone-800/60
  border border-cyan-300/50 dark:border-amber-700/50
  transition-all duration-200 ease-out
  hover:bg-cyan-100/80 dark:hover:bg-stone-700/80
  hover:scale-105 active:scale-95
  shadow-sm hover:shadow-md
`;

// ==========================================
// RIGHT SIDEBAR COMPONENTS - RESPONSIVE
// ==========================================


export const DAY_SUMMARY_CONTAINER =
  "mt-2 rounded-2xl border-2 border-cyan-300/60 bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 p-3 sm:p-3.5 shadow-lg dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30";

export const DAY_SUMMARY_DATE_ICON =
  "text-cyan-600 dark:text-amber-400";
export const DAY_SUMMARY_DATE_TEXT =
  "text-sm sm:text-base font-bold capitalize text-slate-900 dark:text-amber-50";
export const PROGRESS_LABEL =
  "text-xs sm:text-sm font-semibold text-slate-700 dark:text-amber-200";
export const PROGRESS_PERCENTAGE =
  "text-xs sm:text-sm font-bold text-cyan-600 dark:text-amber-400";
export const PROGRESS_BAR_BG =
  "h-2 sm:h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800";
export const PROGRESS_BAR_FILL =
  "h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-500 dark:from-amber-500 dark:to-orange-500";
export const MINI_STAT_CARD =
  "flex items-center gap-2 rounded-xl p-2.5 sm:p-3";
export const MINI_STAT_SUCCESS =
  "bg-gradient-to-br from-cyan-100/50 to-teal-100/50 dark:from-cyan-900/20 dark:to-teal-900/20";
export const MINI_STAT_WARNING =
  "bg-gradient-to-br from-orange-100/50 to-amber-100/50 dark:from-orange-900/20 dark:to-amber-900/20";
export const MINI_STAT_LABEL =
  "text-xs font-medium text-slate-600 dark:text-amber-300/70";
export const MINI_STAT_VALUE =
  "text-base sm:text-lg font-bold text-slate-900 dark:text-amber-50";
export const URGENT_ALERT =
  "mt-3 sm:mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-100 to-orange-100 p-2.5 sm:p-3 dark:from-rose-900/30 dark:to-orange-900/30";
export const URGENT_ALERT_TEXT =
  "text-xs sm:text-sm font-bold text-rose-800 dark:text-rose-300";


export const UPCOMING_CONTAINER =
  "rounded-2xl border-2 border-cyan-300/60 bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 p-4 sm:p-5 shadow-lg dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30";
export const UPCOMING_TITLE =
  "mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 dark:text-amber-50";
export const UPCOMING_EMPTY =
  "text-xs sm:text-sm text-slate-600 dark:text-amber-300/70";
export const UPCOMING_TASK_ITEM =
  "group w-full cursor-pointer rounded-xl border border-slate-200/60 bg-white/50 p-2.5 sm:p-3 text-left transition hover:border-cyan-400/60 hover:bg-white/80 hover:shadow-md dark:border-stone-700/60 dark:bg-stone-900/30 dark:hover:border-amber-700/60 dark:hover:bg-stone-900/50";
export const UPCOMING_TASK_TITLE =
  "line-clamp-2 text-xs sm:text-sm font-semibold text-slate-900 dark:text-amber-50";
export const UPCOMING_TASK_TIME = "text-xs font-bold";
export const UPCOMING_TASK_PRIORITY =
  "text-xs font-medium text-slate-500 dark:text-amber-300/60";
export const UPCOMING_DELETE_BUTTON =
  "flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-2 py-1 sm:px-2.5 sm:py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-500 hover:text-white dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white";


export const ACTIVITY_CONTAINER = UPCOMING_CONTAINER;
export const ACTIVITY_TITLE = UPCOMING_TITLE;
export const ACTIVITY_EMPTY = UPCOMING_EMPTY;
// ==========================================
// ACTIVITY ITEM - COMPACT
// ==========================================

export const ACTIVITY_ITEM = `
  flex w-full items-center gap-2 rounded-lg 
  px-2 py-1.5
  text-left transition-colors
  hover:bg-white/40 dark:hover:bg-stone-800/40
`;

export const ACTIVITY_ICON_CONTAINER = `
  flex h-7 w-7 flex-shrink-0 items-center justify-center 
  rounded-full 
  bg-slate-100 dark:bg-stone-800
`;

export const ACTIVITY_TITLE_TEXT = `
  text-xs font-medium text-slate-800 dark:text-amber-50 
  truncate
`;

export const ACTIVITY_TYPE_TEXT = `
  text-[10px] text-slate-500 dark:text-amber-300/60
`;

export const ACTIVITY_TIME_TEXT = `
  text-[10px] text-slate-400 dark:text-amber-300/40
`;


export const DAY_SUMMARY_DATE_CONTAINER = "mb-2.5 flex items-center gap-2";
export const DAY_SUMMARY_PROGRESS_SECTION = "mb-2.5";
export const DAY_SUMMARY_PROGRESS_HEADER = "mb-2 flex items-center justify-between";
export const DAY_SUMMARY_STATS_GRID =
  "grid grid-cols-2 gap-3";
