import { FiLogOut, FiBell, FiBellOff } from 'react-icons/fi';
import ThemeToggle from '../ThemeToggle';

function SidebarActions({ 
  notificationsEnabled, 
  onToggleNotifications, 
  onLogout 
}) {
  return (
    <div className="mt-6 space-y-3">
      <button
        onClick={onToggleNotifications}
        className="flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-teal-100 to-emerald-100 px-5 py-3 text-sm font-bold text-teal-900 shadow-md ring-2 ring-teal-400/70 transition hover:from-teal-200 hover:to-emerald-200 hover:shadow-lg dark:bg-gradient-to-r dark:from-teal-900/60 dark:to-emerald-900/60 dark:text-amber-100 dark:ring-teal-800/70 dark:hover:from-teal-900/80 dark:hover:to-emerald-900/80"
        title={notificationsEnabled ? 'Désactiver les notifications' : 'Activer les notifications'}
      >
        <span>Notifications</span>
        <div className="flex items-center gap-1.5">
          {notificationsEnabled ? (
            <FiBell className="text-teal-700 dark:text-amber-300" size={18} />
          ) : (
            <FiBellOff className="text-teal-500 dark:text-stone-500" size={18} />
          )}
        </div>
      </button>

      <div className="pointer-events-auto">
        <ThemeToggle />
      </div>

      <button
        onClick={onLogout}
        className="flex w-full items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-rose-700 transition hover:bg-gradient-to-r hover:from-rose-100 hover:to-orange-100 hover:shadow-md dark:text-rose-300 dark:hover:bg-gradient-to-r dark:hover:from-rose-900/60 dark:hover:to-orange-900/60"
      >
        <FiLogOut size={18} /> 
        <span>Déconnexion</span>
      </button>
    </div>
  );
}

export default SidebarActions;