// src/constants/styles/grid.js

// ==========================================
// GRID VIEW - COMPACT RESPONSIVE
// ==========================================
export const GRID_CONTAINER = `
  grid gap-3
  grid-cols-1
  xs:grid-cols-2
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  xl:grid-cols-5
  w-full
`;

export const GRID_EMPTY = `
  flex items-center justify-center
  h-40 rounded-xl
  border-2 border-dashed border-slate-300 dark:border-stone-600
  text-sm text-slate-400 dark:text-stone-500
`;

// ==========================================
// GRID CARD - COMPACT
// ==========================================
export const GRID_CARD = `
  relative
  flex flex-col
  p-3 sm:p-4
  rounded-xl
  bg-white dark:bg-stone-900
  border border-slate-200 dark:border-stone-700
  shadow-sm hover:shadow-lg
  transition-all duration-200
  overflow-hidden
  group
`;

export const GRID_CARD_PRIORITY_HIGH = `
  border-l-4 border-l-red-500
`;

export const GRID_CARD_PRIORITY_MEDIUM = `
  border-l-4 border-l-amber-500
`;

export const GRID_CARD_PRIORITY_LOW = `
  border-l-4 border-l-emerald-500
`;

export const GRID_CARD_LOCKED = `
  opacity-75
  bg-slate-50 dark:bg-stone-800
`;

export const GRID_CARD_DONE = `
  opacity-60
  bg-emerald-50/50 dark:bg-emerald-900/20
  [&:hover_.grid-actions]:opacity-100
`;

export const GRID_CARD_PRIORITY_INDICATOR = `
  absolute top-0 left-0 right-0 h-1
  bg-gradient-to-r from-transparent via-current to-transparent
  opacity-0
`;

export const GRID_CARD_HEADER = `
  pr-16
  mb-1
`;

export const GRID_CARD_TITLE = `
  text-sm font-semibold text-slate-800 dark:text-amber-50
  line-clamp-2
  leading-tight
`;

export const GRID_CARD_DESCRIPTION = `
  text-xs text-slate-500 dark:text-amber-300/70
  line-clamp-2
  mb-2
`;

export const GRID_CARD_METADATA = `
  flex items-center gap-1.5
  mt-auto
  pt-2
`;

export const GRID_CARD_DATE = `
  flex items-center gap-1
  text-xs font-medium
`;

export const GRID_CARD_FOOTER = `
  flex items-center justify-between
  mt-2 pt-2
  border-t border-slate-100 dark:border-stone-800
`;

export const GRID_CARD_STATUS_BADGE = `
  text-xs font-medium
  text-slate-500 dark:text-amber-300/70
`;

export const GRID_CARD_ACTIONS = `
  absolute 
  top-2 right-2
  flex items-center gap-0.5
  opacity-0 group-hover:opacity-100
  transition-opacity duration-200
  grid-actions
`;

export const GRID_CARD_ACTION_BUTTON = `
  p-1.5
  rounded-lg
  bg-white/80 dark:bg-stone-800/80
  text-slate-400 dark:text-stone-500
  hover:bg-slate-100 dark:hover:bg-stone-700
  hover:text-slate-600 dark:hover:text-amber-300
  transition-colors duration-150
  shadow-sm
`;

export const GRID_CARD_LOCKED_INDICATOR = `
  absolute 
  top-2 right-2
  p-1.5
  rounded-full
  bg-slate-200 dark:bg-stone-700
  text-slate-500 dark:text-stone-400
`;