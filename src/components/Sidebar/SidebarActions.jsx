// src/components/Sidebar/SidebarActions.jsx
import { FiLogOut, FiBell, FiBellOff } from 'react-icons/fi';
import ThemeToggle from '../ThemeToggle';
import {
  SIDEBAR_ACTIONS_CONTAINER,
  SIDEBAR_NOTIFICATIONS_BUTTON,
  SIDEBAR_NOTIFICATIONS_BUTTON_FLEX,
  SIDEBAR_NOTIFICATION_ICON_ENABLED,
  SIDEBAR_NOTIFICATION_ICON_DISABLED,
  SIDEBAR_THEME_TOGGLE_CONTAINER,
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
        <div className={SIDEBAR_NOTIFICATIONS_BUTTON_FLEX}>
          {notificationsEnabled ? (
            <FiBell className={SIDEBAR_NOTIFICATION_ICON_ENABLED} size={18} />
          ) : (
            <FiBellOff className={SIDEBAR_NOTIFICATION_ICON_DISABLED} size={18} />
          )}
        </div>
      </button>

      <div className={SIDEBAR_THEME_TOGGLE_CONTAINER}>
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
