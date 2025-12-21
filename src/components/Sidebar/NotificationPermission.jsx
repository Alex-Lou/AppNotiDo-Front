// src/components/Sidebar/NotificationPermission.jsx
import { FiBell } from 'react-icons/fi';
import { 
  NOTIFICATION_PERMISSION_CONTAINER,
  NOTIFICATION_PERMISSION_HEADER,
  NOTIFICATION_PERMISSION_ICON,
  NOTIFICATION_PERMISSION_TITLE,
  NOTIFICATION_PERMISSION_DESCRIPTION,
  NOTIFICATION_PERMISSION_BUTTON
} from '../../constants/styles';

function NotificationPermission({ onRequestPermission }) {
  return (
    <div className={NOTIFICATION_PERMISSION_CONTAINER}>
      <div className={NOTIFICATION_PERMISSION_HEADER}>
        <FiBell className={NOTIFICATION_PERMISSION_ICON} size={18} />
        <div className="flex-1">
          <p className={NOTIFICATION_PERMISSION_TITLE}>
            Activer les notifications
          </p>
          <p className={NOTIFICATION_PERMISSION_DESCRIPTION}>
            Recevez des alertes pour vos tâches importantes.
          </p>
        </div>
      </div>
      <button
        onClick={onRequestPermission}
        className={NOTIFICATION_PERMISSION_BUTTON}
      >
        Autoriser
      </button>
    </div>
  );
}

export default NotificationPermission;
