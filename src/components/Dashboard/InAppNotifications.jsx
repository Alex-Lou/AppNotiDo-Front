// src/components/Dashboard/InAppNotifications.jsx
import NotificationItem from '../ui/NotificationItem';
import { NOTIFICATIONS_CONTAINER } from '../../constants/styles';

function InAppNotifications({ notifications, onRemove, enabled }) {
  if (!enabled || notifications.length === 0) return null;

  return (
    <div className={NOTIFICATIONS_CONTAINER}>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default InAppNotifications;
