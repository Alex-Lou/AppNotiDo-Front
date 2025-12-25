// src/components/Sidebar/SidebarActions.jsx
import { FiLogOut, FiBell, FiBellOff } from 'react-icons/fi';
import ThemeToggle from '../ThemeToggle';
import {
  SIDEBAR_ACTIONS_CONTAINER,
  SIDEBAR_LOGOUT_BUTTON,
  SIDEBAR_TOGGLE_ROW,
  SIDEBAR_ICON_BUTTON
} from '../../constants/styles';

function SidebarActions({
  notificationsEnabled,
  onToggleNotifications,
  onLogout
}) {
  return (
    <div className={SIDEBAR_ACTIONS_CONTAINER}>
      {/* Cloche + Dark Mode côte à côte */}
      <div className={SIDEBAR_TOGGLE_ROW}>
        <button
          onClick={onToggleNotifications}
          className={SIDEBAR_ICON_BUTTON}
          title={notificationsEnabled ? 'Désactiver les notifications' : 'Activer les notifications'}
        >
          {notificationsEnabled ? (
            <FiBell className="text-teal-600 dark:text-amber-400" size={18} />
          ) : (
            <FiBellOff className="text-slate-400 dark:text-stone-500" size={18} />
          )}
        </button>

        <ThemeToggle iconOnly />
      </div>

      <button
        onClick={onLogout}
        className={SIDEBAR_LOGOUT_BUTTON}
      >
        <FiLogOut size={18} />
        <span>Déconnexion</span>
      </button>
    </div>
  );
}

export default SidebarActions;