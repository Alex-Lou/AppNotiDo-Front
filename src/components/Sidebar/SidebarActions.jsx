// src/components/Sidebar/SidebarActions.jsx
import { FiLogOut, FiBell, FiBellOff } from 'react-icons/fi';
import ThemeToggle from '../ThemeToggle';
import { 
  SIDEBAR_ACTIONS_CONTAINER,
  SIDEBAR_NOTIFICATIONS_BUTTON,
  SIDEBAR_LOGOUT_BUTTON
} from '../../constants/styles';

function SidebarActions({ 
  notificationsEnabled, 
  onToggleNotifications, 
  onLogout 
}) {
  return (
    <div className={SIDEBAR_ACTIONS_CONTAINER}>
      <button
        onClick={onToggleNotifications}
        className={SIDEBAR_NOTIFICATIONS_BUTTON}
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
        className={SIDEBAR_LOGOUT_BUTTON}
      >
        <FiLogOut size={18} /> 
        <span>Déconnexion</span>
      </button>
    </div>
  );
}

export default SidebarActions;
