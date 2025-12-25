// src/constants/styles/misc.js

// ==========================================
// SKELETON LOADER - RESPONSIVE
// ==========================================

import { 
  DASHBOARD_LAYOUT_CONTAINER, 
  DASHBOARD_LAYOUT_MAIN 
} from './base';

import { SIDEBAR_CONTAINER } from './sidebar';
import { RIGHT_SIDEBAR_CONTAINER } from './sidebar';
import { DASHBOARD_HEADER_SECTION, STATS_GRID } from './dashboard';
import { TASK_CARD_BASE, TASK_CARD_GRADIENT, TASK_CARD_BORDER, TASK_HALO, TASK_DRAG_HANDLE, TASK_DRAG_BAR } from './tasks';

export const DASHBOARD_SKELETON_CONTAINER = DASHBOARD_LAYOUT_CONTAINER;
export const DASHBOARD_SKELETON_SIDEBAR = SIDEBAR_CONTAINER;
export const DASHBOARD_SKELETON_SIDEBAR_HEADER = "mb-8 sm:mb-10 relative";
export const DASHBOARD_SKELETON_MAIN = DASHBOARD_LAYOUT_MAIN;
export const DASHBOARD_SKELETON_HEADER = DASHBOARD_HEADER_SECTION;
export const DASHBOARD_SKELETON_STATS_GRID = STATS_GRID;
export const DASHBOARD_SKELETON_TASK_LIST = "space-y-3 sm:space-y-4";
export const DASHBOARD_SKELETON_RIGHT_SIDEBAR = RIGHT_SIDEBAR_CONTAINER;

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