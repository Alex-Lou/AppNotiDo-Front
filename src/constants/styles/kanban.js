// src/constants/styles/kanban.js

// ==========================================
// KANBAN BOARD - RESPONSIVE OPTIMISÉ
// ==========================================
export const KANBAN_CONTAINER = `
  flex flex-col gap-3
  sm:flex-row sm:gap-2
  md:gap-3
  lg:gap-4
  w-full
  overflow-x-hidden
`;

export const KANBAN_COLUMN = `
  w-full
  sm:flex-1 sm:min-w-0
  flex flex-col
  rounded-xl sm:rounded-2xl
  bg-slate-100/80 dark:bg-stone-800/50
  border border-slate-200 dark:border-stone-700
  max-h-[250px] sm:max-h-[400px] md:max-h-none
  sm:min-h-[350px] md:min-h-[400px] lg:min-h-[500px]
`;

export const KANBAN_COLUMN_HEADER = `
  flex items-center justify-between
  px-2 py-1.5
  sm:px-2.5 sm:py-2
  md:px-3 md:py-2.5
  border-b border-slate-200 dark:border-stone-700
  flex-shrink-0
`;

export const KANBAN_COLUMN_TITLE = `
  text-xs font-bold text-slate-700 dark:text-amber-100
  truncate
`;

export const KANBAN_COLUMN_COUNT = `
  flex items-center justify-center
  w-4 h-4 sm:w-5 sm:h-5 rounded-full
  bg-slate-200 dark:bg-stone-700
  text-[10px] sm:text-xs font-bold text-slate-600 dark:text-amber-300
  flex-shrink-0 ml-1.5
`;

export const KANBAN_COLUMN_CONTENT = `
  flex-1 
  p-1.5 sm:p-2 md:p-2.5
  flex flex-col gap-1.5 sm:gap-2
  overflow-y-auto
  transition-colors duration-200
`;

export const KANBAN_COLUMN_EMPTY = `
  flex items-center justify-center
  h-12 sm:h-16 md:h-20 
  rounded-lg
  border-2 border-dashed border-slate-300 dark:border-stone-600
  text-[10px] sm:text-xs text-slate-400 dark:text-stone-500
`;

export const KANBAN_DROP_ZONE = `
  flex items-center justify-center
  h-8 sm:h-10 md:h-12 
  rounded-lg
  border-2 border-dashed border-cyan-400 dark:border-amber-500
  bg-cyan-50/50 dark:bg-amber-900/20
  text-[10px] sm:text-xs font-medium text-cyan-600 dark:text-amber-400
  transition-all duration-200
`;

export const KANBAN_DROP_ZONE_ACTIVE = `
  bg-cyan-50/30 dark:bg-amber-900/10
`;

// ==========================================
// KANBAN CARD - COMPACT
// ==========================================
export const KANBAN_CARD = `
  relative
  p-1.5 sm:p-2 md:p-2.5 
  rounded-lg
  bg-white dark:bg-stone-900
  border border-slate-200 dark:border-stone-700
  shadow-sm hover:shadow-md
  cursor-grab active:cursor-grabbing
  transition-all duration-200
`;

export const KANBAN_CARD_DRAGGING = `
  opacity-50 scale-95 rotate-1
  shadow-lg
`;

export const KANBAN_CARD_DRAG_OVER = `
  ring-2 ring-cyan-400 dark:ring-amber-500
`;

export const KANBAN_CARD_LOCKED = `
  cursor-not-allowed opacity-75
  border-slate-300 dark:border-stone-600
  bg-slate-50 dark:bg-stone-800
`;

export const KANBAN_CARD_DONE = `
  opacity-70
  bg-emerald-50/50 dark:bg-emerald-900/20
`;

export const KANBAN_CARD_HEADER = `
  pr-5 sm:pr-6
`;

export const KANBAN_CARD_TITLE = `
  text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-amber-50
  line-clamp-2
`;

export const KANBAN_CARD_DESCRIPTION = `
  mt-0.5 sm:mt-1 
  text-[10px] sm:text-xs text-slate-500 dark:text-amber-300/70
  line-clamp-1
  hidden sm:block
`;

export const KANBAN_CARD_METADATA = `
  mt-1 sm:mt-1.5 
  flex items-center gap-1 sm:gap-1.5 
  flex-wrap
`;

export const KANBAN_CARD_DATE = `
  flex items-center gap-0.5
  text-[10px] sm:text-xs font-medium
`;

export const KANBAN_CARD_BADGES = `
  mt-1 sm:mt-1.5 
  flex items-center gap-1
`;

export const KANBAN_CARD_BADGE = `
  text-[10px] sm:text-xs
`;

export const KANBAN_CARD_ACTIONS = `
  absolute 
  top-1 right-1
  sm:top-1.5 sm:right-1.5
  flex items-center gap-0.5
`;

export const KANBAN_CARD_ACTION_BUTTON = `
  p-0.5 sm:p-1 
  rounded
  text-slate-400 dark:text-stone-500
  transition-colors duration-150
`;

export const KANBAN_CARD_LOCKED_INDICATOR = `
  absolute 
  top-1 right-1
  sm:top-1.5 sm:right-1.5
  p-0.5 sm:p-1 
  rounded-full
  bg-slate-200 dark:bg-stone-700
  text-slate-500 dark:text-stone-400
`;

// ==========================================
// KANBAN TOOLBAR - COMPACT
// ==========================================
export const KANBAN_TOOLBAR = `
  flex items-center justify-between 
  flex-wrap gap-1.5 
  mb-2 sm:mb-3
`;

export const KANBAN_TOOLBAR_LEFT = `
  flex items-center gap-1 sm:gap-1.5
`;

export const KANBAN_TOOLBAR_BUTTON = `
  flex items-center gap-1 sm:gap-1.5 
  px-2 sm:px-2.5 
  py-1 sm:py-1.5 
  rounded-lg 
  text-[10px] sm:text-xs 
  transition-colors
`;

export const KANBAN_TOOLBAR_BUTTON_DEFAULT = `
  bg-slate-100 dark:bg-stone-800 
  text-slate-600 dark:text-stone-300 
  hover:bg-slate-200 dark:hover:bg-stone-700
`;

export const KANBAN_TOOLBAR_BUTTON_GHOST = `
  text-slate-500 dark:text-stone-400 
  hover:bg-slate-100 dark:hover:bg-stone-800
`;

export const KANBAN_TOOLBAR_BUTTON_PRIMARY = `
  bg-cyan-500 dark:bg-amber-500 
  text-white font-medium 
  hover:bg-cyan-600 dark:hover:bg-amber-600 
  shadow-sm
`;

// ==========================================
// KANBAN DROPDOWN MENU - COMPACT
// ==========================================
export const KANBAN_DROPDOWN_MENU = `
  absolute left-0 top-full mt-1 z-20 
  bg-white dark:bg-stone-800 
  rounded-lg 
  shadow-xl 
  border border-slate-200 dark:border-stone-700 
  py-0.5 
  min-w-[120px] sm:min-w-[140px]
`;

export const KANBAN_DROPDOWN_ITEM = `
  w-full 
  flex items-center gap-1.5 
  px-2 py-1.5 
  text-[10px] sm:text-xs 
  transition-colors
`;

export const KANBAN_DROPDOWN_ITEM_DEFAULT = `
  text-slate-600 dark:text-stone-300 
  hover:bg-slate-100 dark:hover:bg-stone-700
`;

export const KANBAN_DROPDOWN_ITEM_DANGER = `
  text-red-600 dark:text-red-400 
  hover:bg-red-50 dark:hover:bg-red-900/20
`;

// ==========================================
// KANBAN BOARD DYNAMIC - FLUIDE
// ==========================================
export const KANBAN_BOARD_CONTAINER = `
  flex gap-2 sm:gap-3 
  overflow-x-auto 
  pb-2 
  snap-x snap-mandatory
  w-full
`;

export const KANBAN_COLUMN_DYNAMIC = `
  flex flex-col 
  min-w-[160px]
  w-full
  flex-1
  max-w-[320px]
  flex-shrink
  snap-start
  rounded-lg sm:rounded-xl
  bg-slate-100/80 dark:bg-stone-800/50
  border border-slate-200 dark:border-stone-700
  transition-all duration-200
`;

export const KANBAN_COLUMN_DROP_TARGET = `
  ring-2 ring-cyan-500 dark:ring-amber-500 
  bg-cyan-50/50 dark:bg-amber-900/20
`;

export const KANBAN_COLUMN_BORDER_CYAN = `border-t-[3px] border-t-cyan-500`;
export const KANBAN_COLUMN_BORDER_AMBER = `border-t-[3px] border-t-amber-500`;
export const KANBAN_COLUMN_BORDER_EMERALD = `border-t-[3px] border-t-emerald-500`;
export const KANBAN_COLUMN_BORDER_PURPLE = `border-t-[3px] border-t-purple-500`;

export const KANBAN_COLUMN_MENU_BUTTON = `
  p-0.5 sm:p-1 
  rounded 
  hover:bg-slate-200 dark:hover:bg-stone-700 
  text-slate-400 dark:text-stone-500 
  transition-colors
`;

export const KANBAN_ADD_COLUMN_PLACEHOLDER = `
  flex flex-col items-center justify-center 
  min-w-[100px] sm:min-w-[120px]
  w-full
  flex-1
  max-w-[200px]
  h-[100px] sm:h-[120px] 
  flex-shrink
  snap-start
  rounded-lg sm:rounded-xl 
  border-2 border-dashed border-slate-300 dark:border-stone-600 
  text-slate-400 dark:text-stone-500 
  hover:border-cyan-500 dark:hover:border-amber-500 
  hover:text-cyan-600 dark:hover:text-amber-400 
  transition-all cursor-pointer
`;

export const KANBAN_LOADING_CONTAINER = `
  flex items-center justify-center h-48
`;

export const KANBAN_LOADING_INNER = `
  flex flex-col items-center gap-2 
  text-slate-400 dark:text-stone-500
`;

export const KANBAN_LOADING_SPINNER = `
  w-6 h-6 
  border-2 border-slate-300 dark:border-stone-600 
  border-t-cyan-500 dark:border-t-amber-500 
  rounded-full animate-spin
`;

// ==========================================
// KANBAN CARD ACTIONS EXTENDED - COMPACT
// ==========================================
export const KANBAN_CARD_ACTIONS_CONTAINER = `
  absolute 
  top-1 right-1
  sm:top-1.5 sm:right-1.5
  flex items-center gap-0.5
  bg-white dark:bg-stone-700 
  rounded 
  shadow-lg 
  p-0.5 
  z-10
`;

export const KANBAN_CARD_ACTION_HOVER_DEFAULT = `
  hover:bg-slate-100 dark:hover:bg-stone-600 
  hover:text-slate-600 dark:hover:text-amber-300
`;

export const KANBAN_CARD_ACTION_HOVER_SUCCESS = `
  hover:bg-emerald-100 dark:hover:bg-emerald-900/30 
  hover:text-emerald-500 dark:hover:text-emerald-400
`;

export const KANBAN_CARD_ACTION_HOVER_WARNING = `
  hover:bg-amber-100 dark:hover:bg-amber-900/30 
  hover:text-amber-500 dark:hover:text-amber-400
`;

export const KANBAN_CARD_ACTION_HOVER_DANGER = `
  hover:bg-red-100 dark:hover:bg-red-900/30 
  hover:text-red-500 dark:hover:text-red-400
`;

// ==========================================
// ADD COLUMN MODAL - COMPACT
// ==========================================
export const ADD_COLUMN_MODAL_OVERLAY = `
  fixed inset-0 z-50 
  flex items-center justify-center 
  bg-black/50 backdrop-blur-sm
  p-3
`;

export const ADD_COLUMN_MODAL_CONTAINER = `
  bg-white dark:bg-stone-900 
  rounded-xl 
  shadow-2xl 
  w-full max-w-sm 
  overflow-hidden 
  border border-slate-200 dark:border-stone-700
`;

export const ADD_COLUMN_MODAL_HEADER = `
  flex items-center justify-between 
  p-2.5 sm:p-3 
  border-b border-slate-200 dark:border-stone-700
`;

export const ADD_COLUMN_MODAL_TITLE = `
  text-sm sm:text-base font-semibold 
  text-slate-800 dark:text-amber-100 
  flex items-center gap-1.5
`;

export const ADD_COLUMN_MODAL_CLOSE = `
  p-1 sm:p-1.5 
  rounded-lg 
  hover:bg-slate-100 dark:hover:bg-stone-800 
  text-slate-500 dark:text-stone-400 
  transition-colors
`;

export const ADD_COLUMN_MODAL_CONTENT = `
  p-2.5 sm:p-3 
  space-y-2.5 sm:space-y-3 
  max-h-[50vh] overflow-y-auto
`;

export const ADD_COLUMN_MODAL_SEARCH_INPUT = `
  w-full 
  pl-8 sm:pl-9 
  pr-2.5 sm:pr-3 
  py-1.5 sm:py-2 
  rounded-lg 
  border border-slate-200 dark:border-stone-700 
  bg-slate-50 dark:bg-stone-800 
  text-xs sm:text-sm text-slate-700 dark:text-amber-100 
  placeholder-slate-400 dark:placeholder-stone-500 
  focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-amber-500 
  transition-all
`;

export const ADD_COLUMN_MODAL_SEARCH_ICON = `
  absolute left-2.5 top-1/2 -translate-y-1/2 
  text-slate-400 dark:text-stone-500
`;

export const ADD_COLUMN_MODAL_TAGS_TITLE = `
  text-[10px] sm:text-xs font-medium 
  text-slate-500 dark:text-stone-400 
  uppercase tracking-wide
`;

export const ADD_COLUMN_MODAL_TAG_BUTTON = `
  flex items-center gap-1 
  px-2 sm:px-2.5 
  py-0.5 sm:py-1 
  rounded-full 
  text-[10px] sm:text-xs font-medium 
  transition-all duration-200
`;

export const ADD_COLUMN_MODAL_TAG_SELECTED = `
  bg-cyan-500 dark:bg-amber-500 
  text-white 
  shadow-md scale-105
`;

export const ADD_COLUMN_MODAL_TAG_UNSELECTED = `
  bg-slate-100 dark:bg-stone-800 
  text-slate-600 dark:text-stone-300 
  hover:bg-slate-200 dark:hover:bg-stone-700
`;

export const ADD_COLUMN_MODAL_EMPTY_STATE = `
  text-center py-4 sm:py-6
`;

export const ADD_COLUMN_MODAL_EMPTY_ICON = `
  mx-auto text-slate-300 dark:text-stone-600 mb-1.5
`;

export const ADD_COLUMN_MODAL_EMPTY_TEXT = `
  text-slate-500 dark:text-stone-400 text-xs
`;

export const ADD_COLUMN_MODAL_EMPTY_SUBTEXT = `
  text-slate-400 dark:text-stone-500 text-[10px] mt-0.5
`;

export const ADD_COLUMN_MODAL_DIVIDER = `
  relative
`;

export const ADD_COLUMN_MODAL_DIVIDER_LINE = `
  absolute inset-0 flex items-center
`;

export const ADD_COLUMN_MODAL_DIVIDER_LINE_INNER = `
  w-full border-t border-slate-200 dark:border-stone-700
`;

export const ADD_COLUMN_MODAL_DIVIDER_TEXT = `
  relative flex justify-center
`;

export const ADD_COLUMN_MODAL_DIVIDER_TEXT_INNER = `
  px-2 bg-white dark:bg-stone-900 
  text-[10px] text-slate-400 dark:text-stone-500
`;

export const ADD_COLUMN_MODAL_NEW_TAG_BUTTON = `
  w-full 
  flex items-center justify-center gap-1.5 
  px-2.5 sm:px-3 
  py-2 sm:py-2.5 
  rounded-lg 
  border-2 border-dashed border-slate-300 dark:border-stone-600 
  text-xs text-slate-500 dark:text-stone-400 
  hover:border-cyan-500 dark:hover:border-amber-500 
  hover:text-cyan-600 dark:hover:text-amber-400 
  transition-all
`;

export const ADD_COLUMN_MODAL_NEW_TAG_INPUT = `
  flex-1 
  px-2.5 sm:px-3 
  py-1.5 sm:py-2 
  rounded-lg 
  border border-slate-200 dark:border-stone-700 
  bg-slate-50 dark:bg-stone-800 
  text-xs sm:text-sm text-slate-700 dark:text-amber-100 
  placeholder-slate-400 dark:placeholder-stone-500 
  focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-amber-500
`;

export const ADD_COLUMN_MODAL_NEW_TAG_SUBMIT = `
  px-2.5 sm:px-3 
  py-1.5 sm:py-2 
  rounded-lg 
  bg-cyan-500 dark:bg-amber-500 
  text-white font-medium 
  hover:bg-cyan-600 dark:hover:bg-amber-600 
  disabled:opacity-50 disabled:cursor-not-allowed 
  transition-colors
`;

export const ADD_COLUMN_MODAL_FOOTER = `
  flex items-center justify-between 
  p-2.5 sm:p-3 
  border-t border-slate-200 dark:border-stone-700 
  bg-slate-50 dark:bg-stone-800/50
`;

export const ADD_COLUMN_MODAL_CANCEL = `
  px-2.5 sm:px-3 
  py-1 sm:py-1.5 
  rounded-lg 
  text-xs text-slate-600 dark:text-stone-400 
  hover:bg-slate-200 dark:hover:bg-stone-700 
  transition-colors
`;

export const ADD_COLUMN_MODAL_ADD = `
  flex items-center gap-1.5 
  px-3 sm:px-4 
  py-1 sm:py-1.5 
  rounded-lg 
  bg-cyan-500 dark:bg-amber-500 
  text-xs text-white font-medium 
  hover:bg-cyan-600 dark:hover:bg-amber-600 
  disabled:opacity-50 disabled:cursor-not-allowed 
  transition-colors shadow-sm
`;

export const ADD_COLUMN_MODAL_SPINNER = `
  w-3 h-3 
  border-2 border-white/30 border-t-white 
  rounded-full animate-spin
`;