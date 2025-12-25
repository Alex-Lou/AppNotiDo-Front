// src/constants/styles/base.js

// ==========================================
// RESPONSIVE UTILITIES & BREAKPOINTS
// ==========================================

export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  desktopLg: '1280px',
};

export const HIDE_ON_MOBILE = "hidden sm:block";
export const HIDE_ON_TABLET = "hidden lg:block";
export const SHOW_ON_MOBILE = "block sm:hidden";
export const SHOW_ON_TABLET = "block lg:hidden";

// ==========================================
// DASHBOARD LAYOUT - RESPONSIVE
// ==========================================

export const DASHBOARD_LAYOUT_CONTAINER = `
  min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-orange-200 
  text-slate-700 
  dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 
  dark:text-amber-50
`;

export const DASHBOARD_LAYOUT_MAIN = `
  min-h-screen px-4 py-6 transition-all duration-300
  sm:px-6 sm:py-8
  md:ml-0 md:mr-0 md:px-8
  xl:px-10 xl:py-10
`;

// Avant : ml-64 / mr-80 ; après : ml-52 / mr-60 pour coller aux nouvelles widths
export const getMainClasses = (isLeftCollapsed, isRightCollapsed) => {
  let leftMargin = 'xl:ml-52';
  let rightMargin = 'xl:mr-60';

  if (isLeftCollapsed) leftMargin = 'xl:ml-14';
  if (isRightCollapsed) rightMargin = 'xl:mr-14';

  return `${leftMargin} ${rightMargin}`;
};


// ==========================================
// COMMON COMPONENTS - RESPONSIVE
// ==========================================

export const INPUT_BASE = "w-full rounded-xl border-2 px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium outline-none transition-shadow duration-150 focus:ring-2 focus:shadow-md";
export const INPUT_LIGHT = "border-cyan-300/60 bg-white/90 text-slate-900 ring-cyan-500/60";
export const INPUT_DARK = "dark:border-amber-700/60 dark:bg-slate-900/80 dark:text-amber-50 dark:ring-amber-500/60";
export const INPUT_CLASSES = `${INPUT_BASE} ${INPUT_LIGHT} ${INPUT_DARK}`;

export const LABEL_CLASSES = "mb-1.5 sm:mb-2 block text-xs sm:text-sm font-bold text-slate-700 dark:text-amber-200";

export const BUTTON_BASE = "inline-flex items-center gap-1.5 sm:gap-2 rounded-xl px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold shadow-md transition-transform duration-150 active:scale-95";
export const BUTTON_PRIMARY = `${BUTTON_BASE} bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400 dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500`;
export const BUTTON_SECONDARY = `${BUTTON_BASE} bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-amber-100 dark:hover:bg-slate-600`;
export const BUTTON_SUBMIT = "w-full bg-blue-600 text-white font-bold py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 text-sm sm:text-base";

export const ICON_BUTTON_BASE = "flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full transition-all hover:scale-110";
export const ICON_BUTTON_DANGER = "bg-rose-700/20 text-rose-700 hover:bg-rose-600 hover:text-white dark:bg-rose-800/30 dark:text-rose-400 dark:hover:bg-rose-700 dark:hover:text-white";
export const ICON_BUTTON_PRIMARY = "bg-blue-700/20 text-blue-700 hover:bg-blue-600 hover:text-white dark:bg-blue-800/30 dark:text-blue-400 dark:hover:bg-blue-700";
export const ICON_BUTTON_SUCCESS = "bg-emerald-700/20 text-emerald-700 hover:bg-emerald-600 hover:text-white dark:bg-emerald-800/30 dark:text-emerald-400 dark:hover:bg-emerald-700";

export const CARD_CONTAINER = "rounded-2xl border-2 border-cyan-300/60 bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 p-4 sm:p-5 shadow-lg dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30";

export const THEME_TOGGLE_BUTTON = "inline-flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-medium border border-slate-700/80 bg-slate-900/80 text-slate-200 shadow-sm backdrop-blur-sm transition-all duration-150 hover:border-sky-500/60 hover:bg-slate-800";
export const THEME_TOGGLE_ICON_LIGHT = "h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-300";
export const THEME_TOGGLE_ICON_DARK = "h-3.5 w-3.5 sm:h-4 sm:w-4 text-sky-300";

// ==========================================
// EMPTY STATE & MISC - RESPONSIVE
// ==========================================

export const EMPTY_STATE_CONTAINER = "rounded-2xl border-2 border-slate-400/50 bg-gradient-to-br from-slate-100 to-slate-200 p-8 sm:p-12 text-center shadow-lg dark:border-stone-800/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80";
export const EMPTY_STATE_TEXT = "text-sm sm:text-base font-semibold text-slate-700 dark:text-amber-300/80";

export const SECTION_DIVIDER = "my-6 sm:my-8 flex items-center gap-3 sm:gap-4";
export const DIVIDER_LINE = "h-0.5 flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700";
export const DIVIDER_TEXT = "text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400";

export const DASHBOARD_TASK_FORM_CONTAINER = "mb-6 sm:mb-8 rounded-2xl border-2 border-teal-400/60 bg-gradient-to-br from-teal-50 to-cyan-50 p-4 sm:p-6 shadow-lg dark:border-stone-800/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80";
export const DASHBOARD_TASKS_SECTION = "space-y-3 sm:space-y-4 pb-8 sm:pb-12";