// src/constants/styles/calendar.js

// ==========================================
// CALENDAR VIEW - RESPONSIVE
// ==========================================
export const CALENDAR_CONTAINER = `
  w-full
  bg-white dark:bg-stone-900
  rounded-2xl
  border border-slate-200 dark:border-stone-700
  shadow-lg
  overflow-hidden
`;

export const CALENDAR_HEADER = `
  flex items-center justify-center gap-2
  px-3 py-3
  sm:px-6 sm:py-4
  bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500
  dark:from-amber-600 dark:via-orange-600 dark:to-rose-600
`;

export const CALENDAR_NAV_BUTTON = `
  p-1.5 sm:p-2
  rounded-lg
  bg-white/20 hover:bg-white/30
  text-white
  transition-colors duration-200
`;

export const CALENDAR_TITLE = `
  flex-1
  text-center
  text-base sm:text-xl font-bold text-white
`;

export const CALENDAR_TODAY_BUTTON = `
  px-2 py-1
  sm:px-3 sm:py-1.5
  rounded-lg
  bg-white/20 hover:bg-white/30
  text-xs sm:text-sm font-medium text-white
  transition-colors duration-200
`;

export const CALENDAR_WEEKDAYS = `
  grid grid-cols-7
  bg-slate-50 dark:bg-stone-800
  border-b border-slate-200 dark:border-stone-700
`;

export const CALENDAR_WEEKDAY = `
  py-2 sm:py-3
  text-center
  text-xs sm:text-sm font-semibold
  text-slate-600 dark:text-amber-300
`;

export const CALENDAR_GRID = `
  grid grid-cols-7
`;

export const CALENDAR_DAY = `
  relative
  min-h-[60px] sm:min-h-[80px] md:min-h-[100px]
  p-1 sm:p-2
  border-b border-r border-slate-100 dark:border-stone-800
  cursor-pointer
  transition-all duration-200
  hover:bg-slate-50 dark:hover:bg-stone-800/50
`;

export const CALENDAR_DAY_OTHER_MONTH = `
  bg-slate-50/50 dark:bg-stone-900/50
  opacity-50
`;

export const CALENDAR_DAY_TODAY = `
  bg-cyan-50 dark:bg-amber-900/20
  ring-2 ring-inset ring-cyan-400 dark:ring-amber-500
`;

export const CALENDAR_DAY_SELECTED = `
  bg-cyan-100 dark:bg-amber-900/40
`;

export const CALENDAR_DAY_HAS_TASKS = `
  font-semibold
`;

export const CALENDAR_DAY_NUMBER = `
  block
  text-xs sm:text-sm font-medium
  text-slate-700 dark:text-amber-100
  mb-1
`;

export const CALENDAR_DAY_TASKS = `
  flex flex-wrap gap-0.5 sm:gap-1
`;

export const CALENDAR_TASK_DOT = `
  w-2 h-2 sm:w-2.5 sm:h-2.5
  rounded-full
  flex-shrink-0
`;

export const CALENDAR_TASK_DOT_HIGH = `
  bg-red-500
`;

export const CALENDAR_TASK_DOT_MEDIUM = `
  bg-amber-500
`;

export const CALENDAR_TASK_DOT_LOW = `
  bg-emerald-500
`;

// ==========================================
// CALENDAR MODAL
// ==========================================
export const CALENDAR_MODAL_OVERLAY = `
  fixed inset-0 z-50
  flex items-center justify-center
  bg-black/50 backdrop-blur-sm
  p-4
`;

export const CALENDAR_MODAL = `
  w-full max-w-md
  max-h-[80vh]
  bg-white dark:bg-stone-900
  rounded-2xl
  shadow-2xl
  overflow-hidden
  flex flex-col
`;

export const CALENDAR_MODAL_HEADER = `
  flex items-center justify-between
  px-4 py-3 sm:px-6 sm:py-4
  bg-gradient-to-r from-cyan-500 to-teal-500
  dark:from-amber-600 dark:to-orange-600
`;

export const CALENDAR_MODAL_TITLE = `
  text-base sm:text-lg font-bold text-white
  flex items-center
`;

export const CALENDAR_MODAL_CLOSE = `
  p-1.5
  rounded-lg
  bg-white/20 hover:bg-white/30
  text-white
  transition-colors duration-200
`;

export const CALENDAR_MODAL_CONTENT = `
  flex-1
  overflow-y-auto
  p-3 sm:p-4
  space-y-2 sm:space-y-3
`;

export const CALENDAR_MODAL_TASK = `
  flex items-start gap-3
  p-3 sm:p-4
  rounded-xl
  bg-slate-50 dark:bg-stone-800
  border border-slate-200 dark:border-stone-700
  transition-all duration-200
  hover:shadow-md
`;

export const CALENDAR_MODAL_TASK_DONE = `
  opacity-60
  bg-emerald-50 dark:bg-emerald-900/20
`;

export const CALENDAR_MODAL_TASK_TITLE = `
  text-sm sm:text-base font-semibold
  text-slate-800 dark:text-amber-50
  line-clamp-2
`;

export const CALENDAR_MODAL_TASK_META = `
  flex items-center gap-2 sm:gap-3
  mt-1
  text-xs sm:text-sm
  text-slate-500 dark:text-amber-300/70
`;

export const CALENDAR_MODAL_TASK_ACTIONS = `
  flex items-center gap-1
  flex-shrink-0
`;

export const CALENDAR_MODAL_TASK_ACTION = `
  p-1.5 sm:p-2
  rounded-lg
  text-slate-400 dark:text-stone-500
  hover:bg-slate-200 dark:hover:bg-stone-700
  hover:text-slate-600 dark:hover:text-amber-300
  transition-colors duration-150
`;

export const CALENDAR_MODAL_EMPTY = `
  flex items-center justify-center
  h-32
  text-sm text-slate-400 dark:text-stone-500
`;

export const CALENDAR_MODAL_ADD_BUTTON = `
  flex items-center justify-center gap-2
  w-full
  mt-3 px-4 py-3
  rounded-xl
  text-sm font-medium
  text-cyan-600 dark:text-amber-400
  bg-cyan-50 dark:bg-amber-900/20
  border-2 border-dashed border-cyan-300 dark:border-amber-600
  hover:bg-cyan-100 dark:hover:bg-amber-900/40
  hover:border-cyan-400 dark:hover:border-amber-500
  transition-all duration-200
`;

export const CALENDAR_MODAL_TASK_CONTENT = `
  flex-1 min-w-0
`;

export const CALENDAR_MODAL_EMPTY_TEXT = `
  mb-4
`;

export const CALENDAR_MODAL_LOCKED_ICON = `
  text-slate-400 dark:text-stone-500
  flex-shrink-0
`;

export const CALENDAR_LEGEND_CONTAINER = `
  mt-4
  flex items-center justify-center gap-4
  text-xs text-slate-500 dark:text-amber-300/70
  pb-4
`;

export const CALENDAR_LEGEND_ITEM = `
  flex items-center gap-1
`;