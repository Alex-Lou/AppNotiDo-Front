// src/components/Sidebar/NotificationToggle.jsx
import { FiBell, FiBellOff } from 'react-icons/fi';
import { NOTIFICATION_TOGGLE_BUTTON } from '../../constants/styles';

function NotificationToggle({ isEnabled, onToggle, isCollapsed }) {
  return (
    <button
      onClick={onToggle}
      className={NOTIFICATION_TOGGLE_BUTTON}
      title={isEnabled ? 'Notifications activées' : 'Notifications désactivées'}
    >
      {isEnabled ? (
        <FiBell className="text-teal-600 dark:text-amber-400" size={20} />
      ) : (
        <FiBellOff className="text-slate-400 dark:text-stone-500" size={20} />
      )}
      {!isCollapsed && (
        <span className="text-xs font-medium text-slate-700 dark:text-amber-200">
          {isEnabled ? 'Actives' : 'Désactivées'}
        </span>
      )}
    </button>
  );
}

export default NotificationToggle;