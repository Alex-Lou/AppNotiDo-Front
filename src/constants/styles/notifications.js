// src/constants/styles/notifications.js

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