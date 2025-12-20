import { FiList } from 'react-icons/fi';

function SidebarNav() {
  return (
    <nav className="mt-4 flex-1 space-y-3">
      <button className="flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-100 to-teal-100 px-5 py-3.5 text-base font-bold text-cyan-900 shadow-md ring-2 ring-cyan-400/70 transition hover:from-cyan-200 hover:to-teal-200 hover:shadow-lg dark:bg-gradient-to-r dark:from-amber-900/60 dark:to-stone-900/60 dark:text-amber-50 dark:ring-amber-800/70 dark:hover:from-amber-900/80 dark:hover:to-stone-900/80">
        <FiList className="text-cyan-700 dark:text-amber-300" size={20} /> 
        <span>Toutes les tâches</span>
      </button>
    </nav>
  );
}

export default SidebarNav;