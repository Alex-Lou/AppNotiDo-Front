// src/components/ui/NotificationItem.jsx
import { FiBell, FiX } from 'react-icons/fi';
import { 
  NOTIFICATION_ITEM, 
  NOTIFICATION_ICON_CONTAINER, 
  NOTIFICATION_TITLE, 
  NOTIFICATION_MESSAGE, 
  NOTIFICATION_CLOSE_BUTTON 
} from '../../constants/styles';

function NotificationItem({ notification, onRemove }) {
  return (
    <div className={NOTIFICATION_ITEM}>
      <div className="flex-shrink-0">
        <div className={NOTIFICATION_ICON_CONTAINER}>
          <FiBell className="text-cyan-700 dark:text-amber-300" size={20} />
        </div>
      </div>
      
      <div className="flex-1">
        <h4 className={NOTIFICATION_TITLE}>
          {notification.title}
        </h4>
        <p className={NOTIFICATION_MESSAGE}>
          {notification.message}
        </p>
      </div>
      
      <button
        onClick={() => onRemove(notification.id)}
        className={NOTIFICATION_CLOSE_BUTTON}
      >
        <FiX size={16} />
      </button>
    </div>
  );
}

export default NotificationItem;
