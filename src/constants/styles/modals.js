// src/constants/styles/modals.js

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