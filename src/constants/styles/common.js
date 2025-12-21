// src/constants/styles/common.js

// ===== INPUTS =====
export const INPUT_BASE = "w-full rounded-xl border-2 px-4 py-3 text-sm font-medium outline-none transition-shadow duration-150 focus:ring-2 focus:shadow-md";
export const INPUT_LIGHT = "border-cyan-300/60 bg-white/90 text-slate-900 ring-cyan-500/60";
export const INPUT_DARK = "dark:border-amber-700/60 dark:bg-slate-900/80 dark:text-amber-50 dark:ring-amber-500/60";
export const INPUT_CLASSES = `${INPUT_BASE} ${INPUT_LIGHT} ${INPUT_DARK}`;

// ===== LABELS =====
export const LABEL_CLASSES = "mb-2 block text-sm font-bold text-slate-700 dark:text-amber-200";

// ===== BUTTONS =====
export const BUTTON_BASE = "inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold shadow-md transition-transform duration-150 active:scale-95";
export const BUTTON_PRIMARY = `${BUTTON_BASE} bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400 dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500`;
export const BUTTON_SECONDARY = `${BUTTON_BASE} bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-amber-100 dark:hover:bg-slate-600`;
export const BUTTON_SUBMIT = "w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50";

// ===== ICON BUTTONS =====
export const ICON_BUTTON_BASE = "flex h-8 w-8 items-center justify-center rounded-full transition-all hover:scale-110";
export const ICON_BUTTON_DANGER = "bg-rose-700/20 text-rose-700 hover:bg-rose-600 hover:text-white dark:bg-rose-800/30 dark:text-rose-400 dark:hover:bg-rose-700 dark:hover:text-white";
export const ICON_BUTTON_PRIMARY = "bg-blue-700/20 text-blue-700 hover:bg-blue-600 hover:text-white dark:bg-blue-800/30 dark:text-blue-400 dark:hover:bg-blue-700";
export const ICON_BUTTON_SUCCESS = "bg-emerald-700/20 text-emerald-700 hover:bg-emerald-600 hover:text-white dark:bg-emerald-800/30 dark:text-emerald-400 dark:hover:bg-emerald-700";

// ===== CONTAINERS =====
export const CARD_CONTAINER = "rounded-2xl border-2 border-cyan-300/60 bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 p-5 shadow-lg dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30";


// ===== FORM FIELD =====
export const FORM_FIELD_CONTAINER = "";
export const FORM_FIELD_LABEL = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";


// ===== THEME TOGGLE =====
export const THEME_TOGGLE_BUTTON = "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium border border-slate-700/80 bg-slate-900/80 text-slate-200 shadow-sm backdrop-blur-sm transition-all duration-150 hover:border-sky-500/60 hover:bg-slate-800";
export const THEME_TOGGLE_ICON_LIGHT = "h-4 w-4 text-amber-300";
export const THEME_TOGGLE_ICON_DARK = "h-4 w-4 text-sky-300";