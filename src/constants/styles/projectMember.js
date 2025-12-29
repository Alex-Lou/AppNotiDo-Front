// src/constants/styles/projectMember.js

// ==========================================
// PROJECT MEMBERS MODAL - CLEAN & RESPONSIVE
// ==========================================

// Modal Overlay - CENTRÉ
export const MEMBERS_MODAL_OVERLAY = `
  fixed inset-0 z-[70] 
  flex items-center justify-center 
  bg-black/50 backdrop-blur-sm
  p-4
`;

// Modal Content - largeur fixe et centrée
export const MEMBERS_MODAL_CONTENT = `
  relative overflow-hidden
  rounded-2xl border-2 border-cyan-400/50 
  bg-gradient-to-br from-cyan-50 to-teal-50
  shadow-2xl
  dark:border-amber-800/70 dark:bg-gradient-to-br 
  dark:from-amber-950/95 dark:to-stone-950/95
  flex flex-col
  
  w-[320px] max-h-[80vh]
  sm:w-[400px]
  lg:w-[450px]
`;

// Header
export const MEMBERS_HEADER = `
  flex items-center justify-between 
  px-4 py-3
  border-b-2 border-cyan-200/50 dark:border-amber-800/50
  bg-white/30 dark:bg-black/20
`;

export const MEMBERS_HEADER_TITLE = `
  flex items-center gap-2
  text-sm font-bold 
  text-slate-800 dark:text-amber-50
`;

export const MEMBERS_COUNT_BADGE = `
  flex items-center justify-center 
  h-5 w-5 
  rounded-full text-xs font-bold
  bg-cyan-500 text-white
  dark:bg-amber-600
`;

export const MEMBERS_CLOSE_BTN = `
  rounded-full p-1.5
  text-slate-500 hover:text-slate-700 
  hover:bg-cyan-100 transition
  dark:text-amber-300/70 dark:hover:text-amber-50 
  dark:hover:bg-amber-900/60
`;

// Error Message
export const MEMBERS_ERROR = `
  flex items-center justify-between
  mx-4 mt-3 px-3 py-2 
  rounded-xl text-xs
  bg-red-100 text-red-700 border border-red-300
  dark:bg-red-900/30 dark:text-red-300 dark:border-red-800
`;

// Invite Section
export const INVITE_SECTION = `
  px-4 py-3
  border-b-2 border-cyan-200/50 dark:border-amber-800/50
`;

export const INVITE_BTN = `
  flex items-center justify-center gap-2 w-full
  px-4 py-2.5 rounded-xl
  text-sm font-semibold
  bg-gradient-to-r from-cyan-500 to-teal-500 text-white
  hover:from-cyan-600 hover:to-teal-600 
  shadow-lg hover:shadow-xl transition-all
  dark:from-amber-600 dark:to-orange-600
  dark:hover:from-amber-500 dark:hover:to-orange-500
`;

export const INVITE_FORM = "space-y-3";

export const INVITE_INPUTS = "space-y-2";

export const INVITE_INPUT = `
  w-full px-3 py-2.5 rounded-xl
  text-sm border-2 border-cyan-300/50
  bg-white/80 text-slate-800
  placeholder:text-slate-400
  focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200
  dark:bg-amber-950/50 dark:border-amber-700/50 
  dark:text-amber-50 dark:placeholder:text-amber-300/50
  dark:focus:border-amber-500 dark:focus:ring-amber-800
`;

export const INVITE_SELECT = `
  w-full px-3 py-2.5 rounded-xl
  text-sm border-2 border-cyan-300/50
  bg-white/80 text-slate-800
  focus:outline-none focus:border-cyan-500
  dark:bg-amber-950/50 dark:border-amber-700/50 dark:text-amber-50
`;

export const INVITE_ACTIONS = `
  flex justify-end gap-2 pt-1
`;

export const INVITE_CANCEL_BTN = `
  px-4 py-2 rounded-xl text-sm font-medium
  text-slate-600 hover:bg-slate-100 transition
  dark:text-amber-300 dark:hover:bg-amber-900/40
`;

export const INVITE_CONFIRM_BTN = `
  flex items-center gap-2 px-4 py-2 rounded-xl
  text-sm font-semibold
  bg-gradient-to-r from-cyan-500 to-teal-500 text-white
  hover:from-cyan-600 hover:to-teal-600 transition
  disabled:opacity-50 disabled:cursor-not-allowed
  dark:from-amber-600 dark:to-orange-600
`;

// Members List
export const MEMBERS_LIST = `
  flex-1 overflow-y-auto
  px-4 py-3
  space-y-2
`;

// Member Item - LAYOUT EN 2 LIGNES SUR MOBILE
export const MEMBER_ITEM = `
  flex flex-col gap-2
  px-3 py-3 rounded-xl
  bg-white/70 border border-cyan-200/50
  hover:bg-white/90 transition
  dark:bg-amber-900/40 dark:border-amber-800/50
  dark:hover:bg-amber-900/60
`;

export const MEMBER_ITEM_INACTIVE = `
  opacity-60
`;

// Ligne 1 : Avatar + Info + Role icon
export const MEMBER_ROW_TOP = `
  flex items-center gap-3
`;

export const MEMBER_AVATAR = `
  flex items-center justify-center flex-shrink-0
  h-9 w-9 rounded-full
  text-sm font-bold text-white
  bg-gradient-to-br from-cyan-500 to-teal-500
  dark:from-amber-600 dark:to-orange-600
`;

export const MEMBER_INFO = `
  flex-1 min-w-0
`;

export const MEMBER_NAME = `
  text-sm font-semibold truncate
  text-slate-800 dark:text-amber-50
`;

export const MEMBER_EMAIL = `
  text-xs truncate
  text-slate-500 dark:text-amber-300/60
`;

export const MEMBER_STATUS_BADGE = `
  inline-flex ml-2 px-1.5 py-0.5 rounded-full 
  text-[10px] font-semibold text-white
`;

export const MEMBER_ROLE = `
  flex-shrink-0 p-1.5 rounded-lg
  bg-slate-100 dark:bg-amber-900/50
`;

// Ligne 2 : Actions (select + boutons)
export const MEMBER_ACTIONS = `
  flex items-center justify-end gap-2
  pt-1 border-t border-slate-200/50 dark:border-amber-800/30
`;

export const ROLE_SELECT = `
  flex-1 max-w-[140px]
  px-2 py-1.5 rounded-lg text-xs font-medium
  border border-cyan-300/50 bg-white/80
  focus:outline-none focus:border-cyan-500
  dark:bg-amber-950/50 dark:border-amber-700/50 dark:text-amber-50
  cursor-pointer
`;

export const TRANSFER_BTN = `
  p-2 rounded-lg transition
  text-amber-500 hover:text-amber-600 hover:bg-amber-100
  dark:text-amber-400 dark:hover:text-amber-300 dark:hover:bg-amber-900/40
`;

export const REMOVE_BTN = `
  p-2 rounded-lg transition
  text-red-400 hover:text-red-600 hover:bg-red-100
  dark:text-red-400/70 dark:hover:text-red-300 dark:hover:bg-red-900/40
`;

// Loading State
export const LOADING_STATE = `
  flex flex-col items-center justify-center gap-3
  py-10 text-slate-500 dark:text-amber-300/60
  text-sm
`;

export const SPIN_ANIMATION = "animate-spin";