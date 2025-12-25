// src/constants/styles/index.js

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

export const getMainClasses = (isLeftCollapsed, isRightCollapsed) => {
  let leftMargin = 'xl:ml-64';  // ← Largeur normale sidebar gauche
  let rightMargin = 'xl:mr-80'; // ← Largeur normale sidebar droite
  
  if (isLeftCollapsed) leftMargin = 'xl:ml-16';  // ← Largeur collapsed
  if (isRightCollapsed) rightMargin = 'xl:mr-16'; // ← Largeur collapsed
  
  return `${leftMargin} ${rightMargin}`;
};

// ==========================================
// SIDEBARS - RESPONSIVE & COLLAPSIBLE
// ==========================================

export const SIDEBAR_CONTAINER = `
  fixed left-0 top-0 z-[60] flex h-full flex-col 
  border-r-2 border-cyan-300/60 
  bg-gradient-to-b from-cyan-200 via-teal-200 to-orange-200 
  px-5 py-5 
  dark:border-amber-900/60 
  dark:bg-gradient-to-b dark:from-amber-950/80 dark:via-stone-950/90 dark:to-slate-950/80
  transition-all duration-300 ease-in-out
  overflow-y-auto
  sm:px-6 sm:py-6
  xl:px-7 xl:py-7
`;

export const getSidebarWidth = (isCollapsed) => 
  isCollapsed ? 'w-16' : 'w-64'; // ← Normale: 256px (au lieu de 224px)

export const RIGHT_SIDEBAR_CONTAINER = `
  fixed right-0 top-0 z-[65] h-full overflow-y-auto 
  border-l-2 border-cyan-300/60 
  bg-gradient-to-b from-cyan-100/30 via-teal-100/20 to-orange-100/30 
  px-4 py-6
  dark:border-amber-900/60 
  dark:bg-gradient-to-b dark:from-slate-950/60 dark:via-stone-950/50 dark:to-slate-950/60
  transition-all duration-300 ease-in-out
  sm:px-5 sm:py-8
  xl:px-6 xl:py-10
`;

// Alias pour compatibilité (ancien nom)
export const RIGHT_SIDEBAR = RIGHT_SIDEBAR_CONTAINER;

export const getRightSidebarWidth = (isCollapsed) => 
  isCollapsed ? 'w-16' : 'w-80'; // ← Normale: 320px (comme avant)

export const SIDEBAR_OVERLAY = `
  fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm
  transition-opacity duration-300
  xl:hidden
`;


// ==========================================
// COLLAPSE BUTTONS
// ==========================================

export const COLLAPSE_BUTTON = `
  absolute top-4 flex h-7 w-7 items-center justify-center 
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
  fixed left-4 top-4 z-[70] flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center 
  rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 
  shadow-lg transition-all hover:scale-105 active:scale-95
  dark:from-amber-600 dark:to-orange-600
  xl:hidden
`;

export const TOGGLE_RIGHT_SIDEBAR_BUTTON = `
  fixed right-4 top-4 z-[70] flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center 
  rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 
  shadow-lg transition-all hover:scale-105 active:scale-95
  dark:from-rose-600 dark:to-red-600
  xl:hidden
`;

export const HAMBURGER_ICON = "text-white w-5 h-5 sm:w-6 sm:h-6";


// ==========================================
// SIDEBAR HEADER - RESPONSIVE
// ==========================================

export const SIDEBAR_HEADER = "mb-8 sm:mb-10 relative";

export const SIDEBAR_LOGO_CONTAINER = "flex items-center gap-3";

export const SIDEBAR_LOGO = `
  h-8 w-8 rounded-2xl shadow-md shadow-cyan-300/40 
  sm:h-9 sm:w-9
  dark:shadow-amber-700/40 transition-transform duration-200 ease-out 
  hover:scale-105 hover:-rotate-2
`;

export const SIDEBAR_TITLE = `
  bg-gradient-to-r from-cyan-700 via-teal-700 to-orange-600 
  bg-clip-text text-lg font-bold tracking-tight text-transparent
  sm:text-xl
  dark:from-amber-500 dark:via-orange-500 dark:to-rose-500
`;

export const SIDEBAR_SUBTITLE = "mt-1 text-sm sm:text-base font-script italic text-slate-800/90 dark:text-amber-200/80";

// ==========================================
// DASHBOARD HEADER - RESPONSIVE
// ==========================================

export const DASHBOARD_HEADER_CONTAINER = `
  flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4
  mb-4 sm:mb-6
`;

export const DASHBOARD_HEADER_TITLE = `
  text-2xl sm:text-3xl md:text-4xl font-black
  bg-gradient-to-r from-cyan-600 via-teal-500 to-orange-500
  bg-clip-text text-transparent
  dark:from-amber-400 dark:via-orange-400 dark:to-rose-400
  leading-tight
`;

export const DASHBOARD_HEADER_SUBTITLE = `
  mt-1 sm:mt-2 text-sm font-medium text-slate-700/90 dark:text-amber-200/80
  sm:text-base
`;

export const DASHBOARD_HEADER_SECTION = "mb-6 sm:mb-8";


// ==========================================
// STATS CARDS - RESPONSIVE COMPACT
// ==========================================

export const STATS_GRID = `
  grid gap-2 mb-4
  grid-cols-2
  sm:grid-cols-2
  lg:grid-cols-4
  sm:gap-3
  sm:mb-6
`;

export const STAT_CARD_BASE = `
  relative overflow-hidden rounded-xl 
  px-2 py-2.5
  sm:px-4 sm:py-3
  lg:px-5 lg:py-3.5
  text-center
  shadow-md ring-2 transition-all 
  hover:scale-[1.02] hover:shadow-lg
  min-h-[90px]
  sm:min-h-[100px]
  flex flex-col items-center justify-center
`;

export const STAT_CARD_HALO = "pointer-events-none absolute -right-6 -top-6 h-12 w-12 sm:-right-8 sm:-top-8 sm:h-16 sm:w-16 lg:h-18 lg:w-18 rounded-full";

export const STAT_CARD_LABEL = `
  text-[8px] leading-[1.1]
  sm:text-[10px] sm:leading-normal
  lg:text-xs 
  font-bold uppercase 
  tracking-[0.02em]
  sm:tracking-wide
  w-full
  max-w-full
  overflow-hidden
  text-ellipsis
`;

export const STAT_CARD_VALUE = `
  mt-1 text-xl
  sm:mt-1.5 sm:text-2xl 
  lg:mt-2 lg:text-3xl 
  font-bold
`;

export const STAT_CARD_SUBTITLE = `
  mt-0.5 text-[7px] leading-[1.1]
  sm:mt-1 sm:text-[10px] sm:leading-normal
  lg:mt-1 lg:text-xs
  font-bold uppercase 
  tracking-[0.02em]
  sm:tracking-wider
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
// TASK FILTERS - RESPONSIVE REDESIGN
// ==========================================

export const TASK_FILTERS_CONTAINER = `
  mb-4 sm:mb-6 flex flex-col gap-3
  sm:gap-4
`;

export const FILTERS_ROW_TOP = `
  flex flex-col gap-3
  sm:flex-row sm:items-center sm:gap-4
`;

export const FILTERS_ROW_BOTTOM = `
  flex flex-col gap-2
  sm:flex-row sm:items-center sm:gap-3
`;

export const FILTERS_GROUP = `
  flex flex-col gap-2
  sm:flex-row sm:items-center sm:gap-3
  w-full
  sm:w-auto
  sm:flex-1
`;

export const NEW_TASK_BUTTON = `
  w-full
  sm:w-auto
  sm:flex-shrink-0
  inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl 
  bg-gradient-to-r from-cyan-500 via-teal-500 to-orange-500 
  px-5 py-3 sm:px-7 sm:py-3.5 
  text-sm sm:text-base font-bold text-white shadow-lg 
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
  sm:min-w-[180px]
  rounded-lg
  px-4 py-2.5 
  sm:px-5 sm:py-3
  text-xs sm:text-sm font-semibold
  outline-none 
  transition-all duration-200
  [&>option]:bg-white [&>option]:text-slate-800 
  dark:[&>option]:bg-stone-800 dark:[&>option]:text-amber-50
  appearance-none
  cursor-pointer
`;

export const SELECT_STATUS = `
  bg-slate-100 
  text-slate-700
  hover:bg-slate-200
  focus:bg-slate-200
  focus:ring-2 focus:ring-cyan-400/30
  dark:bg-stone-800/50
  dark:text-amber-100
  dark:hover:bg-stone-800
  dark:focus:bg-stone-800
  dark:focus:ring-amber-500/30
`;
export const SELECT_PRIORITY = `
  bg-slate-100
  text-slate-700
  hover:bg-slate-200
  focus:bg-slate-200
  focus:ring-2 focus:ring-orange-400/30
  dark:bg-stone-800/50
  dark:text-amber-100
  dark:hover:bg-stone-800
  dark:focus:bg-stone-800
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


// ==========================================
// VIEW SWITCHER - RESPONSIVE
// ==========================================
export const VIEW_SWITCHER_CONTAINER = `
  flex items-center gap-0.5 sm:gap-1 
  rounded-lg sm:rounded-xl border-2 border-slate-200 
  bg-white/80 p-0.5 sm:p-1 shadow-md
  dark:border-stone-700 dark:bg-stone-800/80
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
// KANBAN BOARD - RESPONSIVE
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
  px-2.5 py-2
  sm:px-3 sm:py-2.5
  md:px-4 md:py-3
  border-b border-slate-200 dark:border-stone-700
  flex-shrink-0
`;

export const KANBAN_COLUMN_TITLE = `
  text-xs sm:text-sm font-bold text-slate-700 dark:text-amber-100
  truncate
`;

export const KANBAN_COLUMN_COUNT = `
  flex items-center justify-center
  w-5 h-5 sm:w-6 sm:h-6 rounded-full
  bg-slate-200 dark:bg-stone-700
  text-xs font-bold text-slate-600 dark:text-amber-300
  flex-shrink-0 ml-2
`;

export const KANBAN_COLUMN_CONTENT = `
  flex-1 
  p-2 sm:p-2.5 md:p-3
  flex flex-col gap-2 sm:gap-2.5 md:gap-3
  overflow-y-auto
  transition-colors duration-200
`;

export const KANBAN_COLUMN_EMPTY = `
  flex items-center justify-center
  h-14 sm:h-20 md:h-24 
  rounded-lg sm:rounded-xl
  border-2 border-dashed border-slate-300 dark:border-stone-600
  text-xs sm:text-sm text-slate-400 dark:text-stone-500
`;

export const KANBAN_DROP_ZONE = `
  flex items-center justify-center
  h-10 sm:h-14 md:h-16 
  rounded-lg sm:rounded-xl
  border-2 border-dashed border-cyan-400 dark:border-amber-500
  bg-cyan-50/50 dark:bg-amber-900/20
  text-xs sm:text-sm font-medium text-cyan-600 dark:text-amber-400
  transition-all duration-200
`;

export const KANBAN_DROP_ZONE_ACTIVE = `
  bg-cyan-50/30 dark:bg-amber-900/10
`;

// ==========================================
// KANBAN CARD - RESPONSIVE
// ==========================================
export const KANBAN_CARD = `
  relative
  p-2 sm:p-2.5 md:p-3 
  rounded-lg sm:rounded-xl
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
  pr-6 sm:pr-7 md:pr-8
`;

export const KANBAN_CARD_TITLE = `
  text-xs sm:text-sm font-semibold text-slate-800 dark:text-amber-50
  line-clamp-2
`;

export const KANBAN_CARD_DESCRIPTION = `
  mt-1 sm:mt-1.5 
  text-xs text-slate-500 dark:text-amber-300/70
  line-clamp-1 sm:line-clamp-2
  hidden xs:block
`;

export const KANBAN_CARD_METADATA = `
  mt-1.5 sm:mt-2 
  flex items-center gap-1.5 sm:gap-2 
  flex-wrap
`;

export const KANBAN_CARD_DATE = `
  flex items-center gap-0.5 sm:gap-1
  text-xs font-medium
`;

export const KANBAN_CARD_BADGES = `
  mt-1.5 sm:mt-2 
  flex items-center gap-1 sm:gap-1.5
`;

export const KANBAN_CARD_BADGE = `
  text-xs
`;

export const KANBAN_CARD_ACTIONS = `
  absolute 
  top-1.5 right-1.5
  sm:top-2 sm:right-2
  flex items-center gap-0.5 sm:gap-1
`;

export const KANBAN_CARD_ACTION_BUTTON = `
  p-1 sm:p-1.5 
  rounded-md sm:rounded-lg
  text-slate-400 dark:text-stone-500
  hover:bg-slate-100 dark:hover:bg-stone-800
  hover:text-slate-600 dark:hover:text-amber-300
  transition-colors duration-150
`;

export const KANBAN_CARD_LOCKED_INDICATOR = `
  absolute 
  top-1.5 right-1.5
  sm:top-2 sm:right-2
  p-1 sm:p-1.5 
  rounded-full
  bg-slate-200 dark:bg-stone-700
  text-slate-500 dark:text-stone-400
`;


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

// ==========================================
// EXPORT BUTTON
// ==========================================

export const EXPORT_BUTTON = `
  inline-flex items-center justify-center gap-2 rounded-lg border-2 border-emerald-400/70 
  bg-gradient-to-r from-emerald-50 to-teal-50 
  px-3 py-2 sm:px-4 sm:py-2.5 
  text-xs sm:text-sm font-bold text-emerald-800 shadow-md 
  transition hover:border-emerald-500 hover:from-emerald-100 hover:to-teal-100 hover:shadow-lg 
  dark:border-emerald-700/70 dark:bg-gradient-to-r dark:from-emerald-900/60 dark:to-teal-900/60 
  dark:text-emerald-200 dark:hover:border-emerald-600 dark:hover:from-emerald-900/80 dark:hover:to-teal-900/80 
  whitespace-nowrap
  w-full sm:w-auto
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
// Conteneur flex-1 interne
export const TASK_ITEM_CONTENT_FLEX = "flex-1";

// Conteneur des métadonnées (date + durée)
export const TASK_METADATA_CONTAINER = "mt-3 flex flex-wrap items-center gap-3";

// Icône dans le badge de durée
export const TASK_DURATION_ICON = "h-3.5 w-3.5 text-cyan-600 dark:text-amber-400";

// Icône du badge verrouillé
export const TASK_LOCKED_ICON = "text-amber-600 dark:text-amber-400 animate-pulse";
export const TASK_LOCKED_TEXT = "text-xs font-bold text-amber-700 dark:text-amber-300";

// Icône de déverrouillage
export const TASK_UNLOCK_ICON = "animate-pulse";

// Boutons d'action avec états conditionnels
export const TASK_ACTION_LOCK_LOCKED = "text-amber-600 hover:bg-amber-500 hover:text-white dark:bg-amber-900/80 dark:text-amber-300 dark:hover:bg-amber-600";
export const TASK_ACTION_LOCK_UNLOCKED = "text-slate-500 hover:bg-amber-500 hover:text-white dark:bg-slate-800/80 dark:text-slate-400 dark:hover:bg-amber-600";
export const TASK_ACTION_EDIT = "text-cyan-600 hover:bg-cyan-500 hover:text-white dark:bg-amber-900/80 dark:text-amber-300 dark:hover:bg-amber-600 dark:hover:text-white";
export const TASK_ACTION_DELETE = "text-rose-500 hover:bg-rose-500 hover:text-white dark:bg-rose-900/80 dark:text-rose-300 dark:hover:bg-rose-600 dark:hover:text-white";

// Texte du temps passé pour tâches terminées
export const TASK_TIME_SPENT_TEXT = "text-xs font-semibold text-emerald-700 dark:text-emerald-300";

// Task Timer
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

// Task Form
export const EDIT_FORM_CONTAINER = "relative overflow-hidden rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-50 via-teal-50 to-orange-50 px-4 py-4 sm:px-6 sm:py-5 shadow-lg transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] dark:border-amber-800/70 dark:bg-gradient-to-br dark:from-amber-950/40 dark:via-stone-950/60 dark:to-slate-950/40";
export const DECORATIVE_HALO = "pointer-events-none absolute -right-12 -top-12 sm:-right-16 sm:-top-16 h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-gradient-to-br from-cyan-200/40 via-teal-200/40 to-orange-200/40 dark:bg-gradient-to-br dark:from-amber-900/20 dark:via-orange-900/20 dark:to-rose-900/20";
export const FORM_CONTAINER = "bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 mb-4 sm:mb-6";
export const FORM_TITLE = "text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white";
export const TASK_TIME_SPENT_CONTAINER = "mt-2 sm:mt-3 relative rounded-lg bg-emerald-50/80 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs dark:bg-emerald-900/20";
export const TASK_TIME_SPENT_CLOSE = "absolute right-1 top-1 text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200 transition-colors";

// ==========================================
// RIGHT SIDEBAR COMPONENTS - RESPONSIVE
// ==========================================

export const DAY_SUMMARY_CONTAINER = "rounded-2xl border-2 border-cyan-300/60 bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 p-4 sm:p-5 shadow-lg dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30";
export const DAY_SUMMARY_DATE_ICON = "text-cyan-600 dark:text-amber-400";
export const DAY_SUMMARY_DATE_TEXT = "text-sm sm:text-base font-bold capitalize text-slate-900 dark:text-amber-50";
export const PROGRESS_LABEL = "text-xs sm:text-sm font-semibold text-slate-700 dark:text-amber-200";
export const PROGRESS_PERCENTAGE = "text-xs sm:text-sm font-bold text-cyan-600 dark:text-amber-400";
export const PROGRESS_BAR_BG = "h-2 sm:h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800";
export const PROGRESS_BAR_FILL = "h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-500 dark:from-amber-500 dark:to-orange-500";
export const MINI_STAT_CARD = "flex items-center gap-2 rounded-xl p-2.5 sm:p-3";
export const MINI_STAT_SUCCESS = "bg-gradient-to-br from-cyan-100/50 to-teal-100/50 dark:from-cyan-900/20 dark:to-teal-900/20";
export const MINI_STAT_WARNING = "bg-gradient-to-br from-orange-100/50 to-amber-100/50 dark:from-orange-900/20 dark:to-amber-900/20";
export const MINI_STAT_LABEL = "text-xs font-medium text-slate-600 dark:text-amber-300/70";
export const MINI_STAT_VALUE = "text-base sm:text-lg font-bold text-slate-900 dark:text-amber-50";
export const URGENT_ALERT = "mt-3 sm:mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-100 to-orange-100 p-2.5 sm:p-3 dark:from-rose-900/30 dark:to-orange-900/30";
export const URGENT_ALERT_TEXT = "text-xs sm:text-sm font-bold text-rose-800 dark:text-rose-300";

export const UPCOMING_CONTAINER = "rounded-2xl border-2 border-cyan-300/60 bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 p-4 sm:p-5 shadow-lg dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30";
export const UPCOMING_TITLE = "mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 dark:text-amber-50";
export const UPCOMING_EMPTY = "text-xs sm:text-sm text-slate-600 dark:text-amber-300/70";
export const UPCOMING_TASK_ITEM = "group w-full cursor-pointer rounded-xl border border-slate-200/60 bg-white/50 p-2.5 sm:p-3 text-left transition hover:border-cyan-400/60 hover:bg-white/80 hover:shadow-md dark:border-stone-700/60 dark:bg-stone-900/30 dark:hover:border-amber-700/60 dark:hover:bg-stone-900/50";
export const UPCOMING_TASK_TITLE = "line-clamp-2 text-xs sm:text-sm font-semibold text-slate-900 dark:text-amber-50";
export const UPCOMING_TASK_TIME = "text-xs font-bold";
export const UPCOMING_TASK_PRIORITY = "text-xs font-medium text-slate-500 dark:text-amber-300/60";
export const UPCOMING_DELETE_BUTTON = "flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-2 py-1 sm:px-2.5 sm:py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-500 hover:text-white dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white";

export const ACTIVITY_CONTAINER = UPCOMING_CONTAINER;
export const ACTIVITY_TITLE = UPCOMING_TITLE;
export const ACTIVITY_EMPTY = UPCOMING_EMPTY;
export const ACTIVITY_ITEM = "flex w-full items-start gap-2 sm:gap-3 rounded-xl border border-slate-200/60 bg-white/50 p-2.5 sm:p-3 text-left transition hover:border-cyan-400/60 hover:bg-white/80 hover:shadow-md dark:border-stone-700/60 dark:bg-stone-900/30 dark:hover:border-amber-700/60 dark:hover:bg-stone-900/50";
export const ACTIVITY_ICON_CONTAINER = "mt-0.5 flex h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/40 dark:to-teal-900/40";
export const ACTIVITY_TITLE_TEXT = "truncate text-xs sm:text-sm font-semibold text-slate-900 dark:text-amber-50";
export const ACTIVITY_TYPE_TEXT = "font-medium text-slate-600 dark:text-amber-300/70 text-xs";
export const ACTIVITY_TIME_TEXT = "text-slate-500 dark:text-amber-300/50 text-xs";

export const DAY_SUMMARY_DATE_CONTAINER = "mb-4 flex items-center gap-2";

export const DAY_SUMMARY_PROGRESS_SECTION = "mb-4";
export const DAY_SUMMARY_PROGRESS_HEADER = "mb-2 flex items-center justify-between";

export const DAY_SUMMARY_STATS_GRID = "grid grid-cols-2 gap-3";

// ==========================================
// SIDEBAR COMPONENTS - RESPONSIVE
// ==========================================

export const USER_PROFILE_SIDEBAR_CONTAINER = "mb-6 sm:mb-8 rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-100 via-teal-100 to-orange-100 px-4 py-3 sm:px-5 sm:py-4 shadow-md dark:border-amber-800/70 dark:bg-gradient-to-br dark:from-amber-900/60 dark:via-stone-900/70 dark:to-slate-900/60";
export const USER_PROFILE_SIDEBAR_FLEX = "flex items-center gap-2 sm:gap-3";
export const USER_PROFILE_SIDEBAR_AVATAR = "flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-teal-500 to-orange-500 text-sm sm:text-base font-bold text-white shadow-md dark:from-amber-600 dark:via-orange-600 dark:to-rose-600";
export const USER_PROFILE_SIDEBAR_INFO = "flex flex-col";
export const USER_PROFILE_SIDEBAR_NAME_ROW = "flex items-center gap-1.5 sm:gap-2";
export const USER_PROFILE_SIDEBAR_INPUT = "w-28 sm:w-36 rounded-md border border-cyan-400/70 bg-white/80 px-1.5 py-0.5 sm:px-2 text-xs sm:text-sm font-semibold text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-amber-700/70 dark:bg-stone-900/80 dark:text-amber-50 dark:focus:border-amber-500 dark:focus:ring-amber-500";
export const USER_PROFILE_SIDEBAR_NAME = "max-w-[7rem] sm:max-w-[9rem] truncate text-sm sm:text-base font-bold text-slate-900 dark:text-amber-50";
export const USER_PROFILE_SIDEBAR_BUTTONS = "flex gap-1";
export const USER_PROFILE_SIDEBAR_BUTTON = "text-xs text-slate-600 transition hover:text-slate-900 dark:text-amber-300 dark:hover:text-amber-100";
export const USER_PROFILE_SIDEBAR_STATUS = "text-xs font-medium text-slate-800/80 dark:text-amber-200/70";

export const URGENT_TASKS_SIDEBAR_CONTAINER = "mb-4 sm:mb-5 rounded-2xl border-2 border-red-400/60 bg-gradient-to-br from-red-100 to-orange-100 px-3 py-3 sm:px-4 sm:py-4 text-red-900 shadow-md dark:border-red-700/70 dark:bg-gradient-to-br dark:from-red-900/70 dark:to-orange-900/70 dark:text-red-100";
export const URGENT_TASKS_SIDEBAR_HEADER = "mb-1.5 flex items-center gap-2";
export const URGENT_TASKS_SIDEBAR_ICON = "text-red-700 dark:text-red-300";
export const URGENT_TASKS_SIDEBAR_TITLE = "text-xs sm:text-sm font-bold";
export const URGENT_TASKS_SIDEBAR_DESCRIPTION = "text-xs font-medium leading-relaxed text-red-800/90 dark:text-red-200/80";

export const NOTIFICATION_PERMISSION_CONTAINER = "mb-4 sm:mb-5 rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-100 to-orange-100 px-3 py-3 sm:px-4 sm:py-4 text-amber-900 shadow-md dark:border-amber-700/70 dark:bg-gradient-to-br dark:from-amber-900/70 dark:to-orange-900/70 dark:text-amber-50";
export const NOTIFICATION_PERMISSION_HEADER = "mb-2 sm:mb-3 flex items-start gap-2";
export const NOTIFICATION_PERMISSION_ICON = "mt-0.5 text-amber-700 dark:text-amber-300";
export const NOTIFICATION_PERMISSION_TITLE = "mb-1.5 text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-100";
export const NOTIFICATION_PERMISSION_DESCRIPTION = "text-xs leading-relaxed text-amber-800/90 dark:text-amber-200/80";
export const NOTIFICATION_PERMISSION_BUTTON = "w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition hover:from-amber-400 hover:to-orange-400 dark:from-amber-600 dark:to-orange-600 dark:hover:from-amber-500 dark:hover:to-orange-500";

export const QUICK_VIEWS_NAV = "mt-3 sm:mt-4 space-y-1.5 sm:space-y-2";
export const QUICK_VIEWS_TITLE = "mb-2 sm:mb-3 px-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-amber-300/70";
export const QUICK_VIEW_BUTTON_BASE = "flex w-full items-center gap-2 sm:gap-3 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 dark:focus-visible:ring-amber-500/70";
export const QUICK_VIEW_BUTTON_ACTIVE = "bg-gradient-to-r from-cyan-100 to-teal-100 text-cyan-900 shadow-md ring-2 ring-cyan-400/70 dark:bg-gradient-to-r dark:from-amber-900/60 dark:to-stone-900/60 dark:text-amber-50 dark:ring-amber-800/70 translate-x-0.5";
export const QUICK_VIEW_BUTTON_INACTIVE = "text-slate-700 hover:bg-slate-100/70 hover:translate-x-0.5 dark:text-amber-200/80 dark:hover:bg-stone-800/60";
export const QUICK_VIEW_ICON_CONTAINER_BASE = "flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white/80 shadow-sm dark:bg-stone-900/80 transition-transform duration-150";
export const QUICK_VIEW_ICON_CONTAINER_ACTIVE = "scale-105";
export const QUICK_VIEW_ICON_CONTAINER_INACTIVE = "scale-100";

export const QUOTE_CONTAINER = "relative mt-4 sm:mt-6 rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-3 sm:p-4 shadow-lg dark:border-amber-700/70 dark:bg-gradient-to-br dark:from-amber-900/40 dark:via-orange-900/40 dark:to-rose-900/40";
export const QUOTE_HEADER = "mb-2 sm:mb-3 flex items-center justify-between";
export const QUOTE_LABEL = "text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300";
export const QUOTE_ACTIONS = "flex gap-1";
export const QUOTE_BUTTON_BASE = "rounded-lg p-1 sm:p-1.5 transition";
export const QUOTE_BUTTON_DEFAULT = "text-amber-600 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/40";
export const QUOTE_BUTTON_PINNED = "bg-amber-200 text-amber-700 dark:bg-amber-800/60 dark:text-amber-300";
export const QUOTE_TEXT = "mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium italic leading-relaxed text-amber-900 dark:text-amber-100";
export const QUOTE_AUTHOR = "text-right text-xs font-bold text-amber-700 dark:text-amber-300";

export const SHOW_QUOTE_BUTTON = "w-full rounded-xl border-2 border-amber-400/60 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-amber-700 transition hover:from-amber-100 hover:to-orange-100 dark:border-amber-700/70 dark:bg-gradient-to-r dark:from-amber-900/40 dark:to-orange-900/40 dark:text-amber-300 dark:hover:from-amber-900/60 dark:hover:to-orange-900/60";

export const SIDEBAR_ACTIONS_CONTAINER = "mt-4 sm:mt-6 space-y-2 sm:space-y-3";
export const SIDEBAR_NOTIFICATIONS_BUTTON = "flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-teal-100 to-emerald-100 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold text-teal-900 shadow-md ring-2 ring-teal-400/70 transition hover:from-teal-200 hover:to-emerald-200 hover:shadow-lg dark:bg-gradient-to-r dark:from-teal-900/60 dark:to-emerald-900/60 dark:text-amber-100 dark:ring-teal-800/70 dark:hover:from-teal-900/80 dark:hover:to-emerald-900/80";
export const SIDEBAR_LOGOUT_BUTTON = "flex w-full items-center gap-2 rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold text-rose-700 transition hover:bg-gradient-to-r hover:from-rose-100 hover:to-orange-100 hover:shadow-md dark:text-rose-300 dark:hover:bg-gradient-to-r dark:hover:from-rose-900/60 dark:hover:to-orange-900/60";
export const SIDEBAR_NAV = "mt-3 sm:mt-4 flex-1 space-y-2 sm:space-y-3";
export const SIDEBAR_NAV_BUTTON = "flex w-full items-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-cyan-100 to-teal-100 px-4 py-3 sm:px-5 sm:py-3.5 text-sm sm:text-base font-bold text-cyan-900 shadow-md ring-2 ring-cyan-400/70 transition hover:from-cyan-200 hover:to-teal-200 hover:shadow-lg dark:bg-gradient-to-r dark:from-amber-900/60 dark:to-stone-900/60 dark:text-amber-50 dark:ring-amber-800/70 dark:hover:from-amber-900/80 dark:hover:to-stone-900/80";
export const SIDEBAR_NOTIFICATIONS_BUTTON_FLEX = "flex items-center gap-1.5";
export const SIDEBAR_NOTIFICATION_ICON_ENABLED = "text-teal-700 dark:text-amber-300";
export const SIDEBAR_NOTIFICATION_ICON_DISABLED = "text-teal-500 dark:text-stone-500";
export const SIDEBAR_THEME_TOGGLE_CONTAINER = "pointer-events-auto";
export const SIDEBAR_NAV_BUTTON_ICON = "text-cyan-700 dark:text-amber-300";


// ==========================================
// IN-APP NOTIFICATIONS - RESPONSIVE
// ==========================================

export const NOTIFICATIONS_CONTAINER = `
  fixed left-4 bottom-4 z-50 space-y-2 sm:space-y-3 
  max-w-[calc(100vw-2rem)]
  sm:max-w-sm
  sm:left-6 sm:bottom-6
`;

export const NOTIFICATION_ITEM = `
  relative flex items-start gap-2 sm:gap-3 rounded-2xl border-2 
  border-cyan-400/50 bg-gradient-to-br from-cyan-100 to-teal-100 
  px-4 py-3 
  sm:px-5 sm:py-4
  shadow-xl backdrop-blur-sm 
  dark:border-amber-800/70 dark:bg-gradient-to-br 
  dark:from-amber-950/80 dark:to-stone-950/80 dark:text-amber-50
`;

export const NOTIFICATION_ICON_CONTAINER = "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-200 to-teal-200 dark:bg-gradient-to-br dark:from-amber-900/60 dark:to-orange-900/60";
export const NOTIFICATION_TITLE = "mb-1 sm:mb-1.5 text-xs sm:text-sm font-bold text-slate-800 dark:text-amber-50";
export const NOTIFICATION_MESSAGE = "text-xs leading-relaxed text-slate-700 dark:text-amber-100/80";
export const NOTIFICATION_CLOSE_BUTTON = "flex-shrink-0 rounded-full p-1 sm:p-1.5 text-cyan-600 transition hover:bg-cyan-200 hover:text-cyan-800 dark:text-amber-300/70 dark:hover:bg-amber-900/60 dark:hover:text-amber-50";

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

// ==========================================
// SKELETON LOADER - RESPONSIVE
// ==========================================

export const DASHBOARD_SKELETON_CONTAINER = DASHBOARD_LAYOUT_CONTAINER;
export const DASHBOARD_SKELETON_SIDEBAR = SIDEBAR_CONTAINER;
export const DASHBOARD_SKELETON_SIDEBAR_HEADER = SIDEBAR_HEADER;
export const DASHBOARD_SKELETON_MAIN = DASHBOARD_LAYOUT_MAIN;
export const DASHBOARD_SKELETON_HEADER = DASHBOARD_HEADER_SECTION;
export const DASHBOARD_SKELETON_STATS_GRID = STATS_GRID;
export const DASHBOARD_SKELETON_TASK_LIST = "space-y-3 sm:space-y-4";
export const DASHBOARD_SKELETON_RIGHT_SIDEBAR = RIGHT_SIDEBAR;

export const SKELETON_BASE = "bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800";
export const SKELETON_ANIMATION = "animate-shimmer bg-[length:200%_100%]";
export const SKELETON_ROUNDED = "rounded-lg";
export const SKELETON_CIRCLE = "rounded-full";
export const SKELETON_ROUNDED_XL = "rounded-xl";
export const SKELETON_ROUNDED_2XL = "rounded-2xl";

export const TASK_ITEM_SKELETON_CONTAINER = TASK_CARD_BASE + " " + TASK_CARD_GRADIENT + " " + TASK_CARD_BORDER;
export const TASK_ITEM_SKELETON_HALO = TASK_HALO;
export const TASK_ITEM_SKELETON_DRAG_HANDLE_CONTAINER = TASK_DRAG_HANDLE;
export const TASK_ITEM_SKELETON_DRAG_HANDLE = TASK_DRAG_BAR;
export const TASK_ITEM_SKELETON_CONTENT = "mt-4 sm:mt-5 flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4";
export const TASK_ITEM_SKELETON_MAIN = "flex-1 space-y-2 sm:space-y-3";
export const TASK_ITEM_SKELETON_TAGS = "flex gap-1.5 sm:gap-2";
export const TASK_ITEM_SKELETON_DATE_DURATION = "flex gap-2 sm:gap-3";
export const TASK_ITEM_SKELETON_BADGES = "flex gap-1.5 sm:gap-2";

// ==========================================
// PROFILE MODAL - RESPONSIVE
// ==========================================

export const PROFILE_MODAL_OVERLAY = "fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4";
export const PROFILE_MODAL_CONTAINER = "relative w-full max-w-lg sm:max-w-xl rounded-2xl border border-cyan-300/70 bg-gradient-to-br from-cyan-50 via-teal-50 to-orange-50 p-5 sm:p-6 shadow-2xl dark:border-amber-800/70 dark:bg-gradient-to-br dark:from-slate-950/90 dark:via-stone-950/90 dark:to-amber-950/80";
export const PROFILE_MODAL_CLOSE_BUTTON = "absolute right-3 top-3 sm:right-4 sm:top-4 text-slate-500 transition hover:text-slate-800 dark:text-amber-300 dark:hover:text-amber-100";
export const PROFILE_MODAL_TITLE = "mb-1 text-lg sm:text-xl font-bold text-slate-900 dark:text-amber-50";
export const PROFILE_MODAL_SUBTITLE = "mb-3 sm:mb-4 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-amber-300/70";
export const PROFILE_MODAL_SECTIONS = "space-y-4 sm:space-y-6";
export const PROFILE_MODAL_SECTION = "rounded-xl border border-cyan-200/70 bg-white/70 p-3 sm:p-4 shadow-sm dark:border-amber-800/60 dark:bg-stone-950/70";
export const PROFILE_MODAL_SECTION_TITLE = "mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold text-slate-900 dark:text-amber-50";
export const PROFILE_MODAL_SECTION_DESCRIPTION = "mb-2 sm:mb-3 text-xs text-slate-500 dark:text-amber-200/70";
export const PROFILE_MODAL_INPUT_CONTAINER = "space-y-1.5 sm:space-y-2";
export const PROFILE_MODAL_LABEL = "block text-xs font-medium text-slate-700 dark:text-amber-200";
export const PROFILE_MODAL_INPUT = "w-full rounded-lg border border-cyan-300/70 bg-white/90 px-2.5 py-1.5 sm:px-3 text-xs sm:text-sm text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-amber-700/70 dark:bg-slate-900/80 dark:text-amber-50 dark:focus:border-amber-500 dark:focus:ring-amber-500";
export const PROFILE_MODAL_INPUT_MT = "mt-1 w-full rounded-lg border border-cyan-300/70 bg-white/90 px-2.5 py-1.5 sm:px-3 text-xs sm:text-sm text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-amber-700/70 dark:bg-slate-900/80 dark:text-amber-50 dark:focus:border-amber-500 dark:focus:ring-amber-500";
export const PROFILE_MODAL_BUTTON_CONTAINER = "mt-2 sm:mt-3 flex justify-end";
export const PROFILE_MODAL_SAVE_BUTTON = "rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 px-3 py-1.5 sm:px-4 text-xs font-semibold text-white shadow-sm transition hover:from-cyan-600 hover:to-teal-600 disabled:cursor-not-allowed disabled:opacity-60 dark:from-amber-600 dark:to-orange-600 dark:hover:from-amber-700 dark:hover:to-orange-700";
export const PROFILE_MODAL_PASSWORD_BUTTON = "rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 px-3 py-1.5 sm:px-4 text-xs font-semibold text-white shadow-sm transition hover:from-teal-600 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-700 dark:hover:to-teal-700";
export const PROFILE_MODAL_PASSWORD_INPUTS = "space-y-2 sm:space-y-3";
export const PROFILE_MODAL_DANGER_ZONE = "rounded-xl border border-red-200/70 bg-red-50/80 p-3 sm:p-4 shadow-sm dark:border-red-800/70 dark:bg-red-950/60";
export const PROFILE_MODAL_DANGER_TITLE = "mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold text-red-800 dark:text-red-200";
export const PROFILE_MODAL_DANGER_DESCRIPTION = "mb-2 sm:mb-3 text-xs text-red-700/90 dark:text-red-200/80";
export const PROFILE_MODAL_DELETE_BUTTON = "rounded-lg border border-red-500/70 bg-gradient-to-r from-red-600 to-rose-600 px-3 py-1.5 sm:px-4 text-xs font-semibold text-red-50 shadow-sm transition hover:from-red-700 hover:to-rose-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/80 dark:from-red-700 dark:to-rose-700 dark:hover:from-red-800 dark:hover:to-rose-800";

// ==========================================
// AUTH PAGE - RESPONSIVE
// ==========================================

export const AUTH_CONTAINER = "min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4";
export const AUTH_CARD = "bg-white rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-md";
export const AUTH_TITLE = "text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2";
export const AUTH_SUBTITLE = "text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base";
export const AUTH_TABS_CONTAINER = "flex mb-4 sm:mb-6 border-b border-gray-200";
export const AUTH_TAB_BASE = "flex-1 pb-2 sm:pb-3 text-center font-semibold transition text-sm sm:text-base";
export const AUTH_TAB_ACTIVE = "border-b-2 border-blue-600 text-blue-600";
export const AUTH_TAB_INACTIVE = "text-gray-500 hover:text-gray-700";
export const AUTH_ERROR_BOX = "bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded mb-3 sm:mb-4 text-xs sm:text-sm";
export const AUTH_FORM = "space-y-3 sm:space-y-4";
export const AUTH_LABEL = "block text-gray-700 font-semibold mb-1.5 sm:mb-2 text-sm";
export const AUTH_INPUT = "w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base";
export const AUTH_SUBMIT_BUTTON = "w-full bg-blue-600 text-white font-bold py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 text-sm sm:text-base";

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

export const FORM_FIELD_CONTAINER = "";
export const FORM_FIELD_LABEL = "block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2";

export const THEME_TOGGLE_BUTTON = "inline-flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-medium border border-slate-700/80 bg-slate-900/80 text-slate-200 shadow-sm backdrop-blur-sm transition-all duration-150 hover:border-sky-500/60 hover:bg-slate-800";
export const THEME_TOGGLE_ICON_LIGHT = "h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-300";
export const THEME_TOGGLE_ICON_DARK = "h-3.5 w-3.5 sm:h-4 sm:w-4 text-sky-300";
export const FORM_HEADER = "flex items-center justify-between mb-6";
export const FORM_CLOSE_BUTTON = "p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-all duration-200 group";
export const FORM_CLOSE_ICON = "w-5 h-5 group-hover:scale-110 transition-transform";
export const FORM_FIELDS_CONTAINER = "space-y-4";
export const FORM_GRID_2_COLS = "grid grid-cols-2 gap-4";
export const FORM_REACTIVABLE_CONTAINER = "flex items-center gap-3 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700";
export const FORM_REACTIVABLE_CHECKBOX = "w-4 h-4 text-teal-600 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-teal-500";
export const FORM_REACTIVABLE_LABEL = "flex-1 cursor-pointer";
export const FORM_REACTIVABLE_TITLE = "font-medium text-slate-700 dark:text-slate-200";
export const FORM_REACTIVABLE_DESCRIPTION = "text-sm text-slate-500 dark:text-slate-400";


// ==========================================
// TASK EDIT MODAL - RESPONSIVE
// ==========================================
export const TASK_EDIT_MODAL_OVERLAY = `
  fixed inset-0 z-50
  flex items-center justify-center
  bg-black/50 backdrop-blur-sm
  p-4
`;

export const TASK_EDIT_MODAL = `
  w-full max-w-lg
  max-h-[90vh]
  bg-white dark:bg-stone-900
  rounded-2xl
  shadow-2xl
  overflow-hidden
  flex flex-col
`;

export const TASK_EDIT_MODAL_HEADER = `
  flex items-center justify-between
  px-4 py-3 sm:px-6 sm:py-4
  bg-gradient-to-r from-cyan-500 to-teal-500
  dark:from-amber-600 dark:to-orange-600
`;

export const TASK_EDIT_MODAL_TITLE = `
  text-base sm:text-lg font-bold text-white
`;

export const TASK_EDIT_MODAL_CLOSE = `
  p-1.5
  rounded-lg
  bg-white/20 hover:bg-white/30
  text-white
  transition-colors duration-200
`;

export const TASK_EDIT_MODAL_CONTENT = `
  flex-1
  overflow-y-auto
  p-4 sm:p-6
  space-y-4
`;

export const TASK_EDIT_MODAL_FIELD = `
  flex flex-col gap-1.5
`;

export const TASK_EDIT_MODAL_LABEL = `
  text-sm font-medium
  text-slate-700 dark:text-amber-100
`;

export const TASK_EDIT_MODAL_INPUT = `
  w-full
  px-3 py-2.5
  rounded-xl
  border-2 border-slate-200 dark:border-stone-700
  bg-white dark:bg-stone-800
  text-slate-800 dark:text-amber-50
  text-sm
  outline-none
  transition-all duration-200
  focus:border-cyan-400 dark:focus:border-amber-500
  focus:ring-2 focus:ring-cyan-400/20 dark:focus:ring-amber-500/20
  placeholder:text-slate-400 dark:placeholder:text-stone-500
`;

export const TASK_EDIT_MODAL_TEXTAREA = `
  w-full
  px-3 py-2.5
  rounded-xl
  border-2 border-slate-200 dark:border-stone-700
  bg-white dark:bg-stone-800
  text-slate-800 dark:text-amber-50
  text-sm
  outline-none
  transition-all duration-200
  focus:border-cyan-400 dark:focus:border-amber-500
  focus:ring-2 focus:ring-cyan-400/20 dark:focus:ring-amber-500/20
  placeholder:text-slate-400 dark:placeholder:text-stone-500
  resize-none
`;

export const TASK_EDIT_MODAL_SELECT = `
  w-full
  px-3 py-2.5
  rounded-xl
  border-2 border-slate-200 dark:border-stone-700
  bg-white dark:bg-stone-800
  text-slate-800 dark:text-amber-50
  text-sm
  outline-none
  transition-all duration-200
  focus:border-cyan-400 dark:focus:border-amber-500
  cursor-pointer
  appearance-none
`;

export const TASK_EDIT_MODAL_ROW = `
  grid grid-cols-1 sm:grid-cols-2 gap-4
`;

export const TASK_EDIT_MODAL_FOOTER = `
  flex items-center justify-end gap-3
  px-4 py-3 sm:px-6 sm:py-4
  border-t border-slate-200 dark:border-stone-700
  bg-slate-50 dark:bg-stone-800/50
`;

export const TASK_EDIT_MODAL_BUTTON_CANCEL = `
  px-4 py-2
  rounded-xl
  text-sm font-medium
  text-slate-600 dark:text-amber-300
  hover:bg-slate-100 dark:hover:bg-stone-700
  transition-colors duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
`;

export const TASK_EDIT_MODAL_BUTTON_SAVE = `
  flex items-center gap-2
  px-4 py-2
  rounded-xl
  text-sm font-medium
  text-white
  bg-gradient-to-r from-cyan-500 to-teal-500
  dark:from-amber-600 dark:to-orange-600
  hover:from-cyan-400 hover:to-teal-400
  dark:hover:from-amber-500 dark:hover:to-orange-500
  transition-all duration-200
  shadow-md hover:shadow-lg
  disabled:opacity-50 disabled:cursor-not-allowed
`;