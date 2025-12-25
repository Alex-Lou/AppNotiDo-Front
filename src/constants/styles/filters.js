// src/constants/styles/filters.js

// ==========================================
// TASK FILTERS - RESPONSIVE REDESIGN
// ==========================================

export const TASK_FILTERS_CONTAINER = `
  mb-3 sm:mb-4 md:mb-6 flex flex-col gap-2 sm:gap-3
`;

export const FILTERS_ROW_TOP = `
  flex flex-col gap-2
  sm:flex-row sm:items-center sm:gap-3
  md:gap-4
`;

export const FILTERS_ROW_BOTTOM = `
  flex flex-col gap-2
  sm:flex-row sm:items-center sm:gap-2
  md:gap-3
`;

export const FILTERS_GROUP = `
  flex flex-col gap-2
  sm:flex-row sm:items-center sm:gap-2
  md:gap-3
  w-full
  sm:w-auto
  sm:flex-1
`;

export const NEW_TASK_BUTTON = `
  w-full
  sm:w-auto
  sm:flex-shrink-0
  inline-flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 rounded-xl 
  bg-gradient-to-r from-cyan-500 via-teal-500 to-orange-500 
  px-4 py-2.5
  sm:px-5 sm:py-3
  md:px-7 md:py-3.5 
  text-xs
  sm:text-sm
  md:text-base
  font-bold text-white shadow-lg 
  transition hover:shadow-xl hover:from-cyan-400 hover:via-teal-400 hover:to-orange-400 
  dark:from-amber-600 dark:via-orange-600 dark:to-rose-600 
  dark:hover:from-amber-500 dark:hover:via-orange-500 dark:hover:to-rose-500
  whitespace-nowrap
`;

export const SEARCH_CONTAINER = `
  w-full
  sm:flex-1
`;

export const SEARCH_INPUT = `
  w-full rounded-xl border-2 border-cyan-400/70 
  bg-gradient-to-r from-white to-cyan-50/30 
  py-2.5 pl-10 pr-16
  sm:py-3 sm:pl-12 sm:pr-24
  text-sm font-medium
  text-slate-800 placeholder-slate-500 shadow-md outline-none 
  ring-cyan-400/60 transition focus:border-cyan-500 focus:ring-2 
  dark:border-stone-700/70 dark:bg-gradient-to-r dark:from-stone-900/80 dark:to-slate-900/80 
  dark:text-amber-50 dark:placeholder-amber-300/50 dark:ring-amber-700/60 dark:focus:border-stone-600
`;

export const SELECT_BASE = `
  w-full
  sm:w-auto
  sm:min-w-[140px]
  rounded-full
  px-3 py-1.5
  sm:px-4 sm:py-2
  text-xs font-semibold
  outline-none 
  transition-all duration-200
  [&>option]:bg-white [&>option]:text-slate-800 
  dark:[&>option]:bg-stone-800 dark:[&>option]:text-amber-50
  appearance-none
  cursor-pointer
  border-2
`;

export const SELECT_STATUS = `
  bg-cyan-50/50
  text-cyan-800
  border-cyan-300/60
  hover:bg-cyan-100/70
  hover:border-cyan-400
  focus:bg-cyan-100/70
  focus:border-cyan-500
  focus:ring-2 focus:ring-cyan-400/30
  dark:bg-cyan-900/20
  dark:text-cyan-300
  dark:border-cyan-800/60
  dark:hover:bg-cyan-900/30
  dark:hover:border-cyan-700
  dark:focus:bg-cyan-900/30
  dark:focus:border-cyan-600
  dark:focus:ring-cyan-500/30
`;

export const SELECT_PRIORITY = `
  bg-orange-50/50
  text-orange-800
  border-orange-300/60
  hover:bg-orange-100/70
  hover:border-orange-400
  focus:bg-orange-100/70
  focus:border-orange-500
  focus:ring-2 focus:ring-orange-400/30
  dark:bg-orange-900/20
  dark:text-orange-300
  dark:border-orange-800/60
  dark:hover:bg-orange-900/30
  dark:hover:border-orange-700
  dark:focus:bg-orange-900/30
  dark:focus:border-orange-600
  dark:focus:ring-amber-500/30
`;

export const SEARCH_COMPACT_BUTTON = "group flex items-center gap-2 rounded-xl border-2 border-cyan-400/70 bg-gradient-to-r from-white to-cyan-50/50 px-3 py-2.5 sm:px-4 sm:py-3 shadow-md transition-all hover:border-cyan-500 hover:shadow-lg dark:border-stone-700/70 dark:bg-gradient-to-r dark:from-stone-900/80 dark:to-slate-900/80 dark:hover:border-stone-600 w-full cursor-pointer";

export const SEARCH_COUNT_BADGE = "rounded-full bg-cyan-500 px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-bold text-white dark:bg-amber-600";

export const SEARCH_CLEAR_BUTTON = "absolute inset-y-0 right-2 sm:right-3 flex items-center justify-center rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 dark:text-amber-400 dark:hover:bg-stone-800 dark:hover:text-amber-300";

export const SEARCH_NO_RESULTS = "mt-2 sm:mt-3 text-sm font-medium text-rose-600 dark:text-rose-400";

export const SEARCH_RESULTS_INFO = "mt-2 sm:mt-3 text-sm font-medium text-slate-600 dark:text-amber-300/80";

export const SEARCH_BAR_CONTAINER = "mb-6";

export const SEARCH_BAR_WRAPPER = "relative flex items-center justify-end";

export const SEARCH_COMPACT_ICON = "h-5 w-5 text-cyan-600 transition-transform group-hover:scale-110 dark:text-amber-400";

export const SEARCH_COMPACT_TEXT = "text-sm font-medium text-slate-500 dark:text-amber-300/70";

export const SEARCH_EXPANDED_CONTAINER = "w-full animate-expand-search";

export const SEARCH_INPUT_WRAPPER = "relative";

export const SEARCH_INPUT_ICON_CONTAINER = "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4";
export const SEARCH_INPUT_ICON = "h-5 w-5 text-cyan-600 dark:text-amber-400";

export const SEARCH_COUNT_CONTAINER = "absolute inset-y-0 right-14 flex items-center";

export const TASK_FILTERS_SEARCH_CONTAINER = "w-full sm:flex-1 sm:max-w-md";

export const TASK_FILTERS_SEARCH_EXPANDED = "animate-expand-search";

export const TASK_FILTERS_SEARCH_INPUT_WRAPPER = "relative";

export const TASK_FILTERS_SEARCH_ICON_CONTAINER = "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4";
export const TASK_FILTERS_SEARCH_ICON = "h-4 w-4 sm:h-5 sm:w-5 text-cyan-600 dark:text-amber-400";

export const TASK_FILTERS_COMPACT_ICON = "h-5 w-5 text-cyan-600 transition-transform group-hover:scale-110 dark:text-amber-400";
export const TASK_FILTERS_COMPACT_TEXT = "text-sm font-medium text-slate-500 dark:text-amber-300/70";

export const TASK_FILTERS_COUNT_CONTAINER = "absolute inset-y-0 right-12 sm:right-14 flex items-center";

export const TASK_FILTERS_CLEAR_ICON = "sm:w-5 sm:h-5";