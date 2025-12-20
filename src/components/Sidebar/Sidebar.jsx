import UserProfile from './UserProfile';
import NotificationPermission from './NotificationPermission';
import UrgentTasks from './UrgentTasks';
import SidebarNav from './SidebarNav';
import SidebarActions from './SidebarActions';

function Sidebar({
  username,
  notificationPermission,
  notificationsEnabled,
  urgentTasks,
  onRequestNotificationPermission,
  onToggleNotifications,
  onLogout,
}) {
  return (
    <aside
      className="
        fixed left-0 top-0 z-20 flex h-full w-72 flex-col
        border-r-2 border-cyan-300/60
        bg-gradient-to-b from-cyan-200 via-teal-200 to-orange-200
        px-7 py-7
        dark:border-amber-900/60 dark:bg-gradient-to-b dark:from-amber-950/80 dark:via-stone-950/90 dark:to-slate-950/80
      "
    >
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📝</span>
          <h1 className="bg-gradient-to-r from-cyan-700 via-teal-700 to-orange-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-amber-500 dark:via-orange-500 dark:to-rose-500">
            AppNotiDo
          </h1>
        </div>
        <p className="mt-2 text-sm font-medium text-slate-800/90 dark:text-amber-200/80">
          Organisez votre journée
        </p>
      </div>

      {/* User Profile */}
      <UserProfile username={username} />

      {/* Notification Permission */}
      {notificationPermission !== 'granted' && notificationsEnabled && (
        <NotificationPermission onRequestPermission={onRequestNotificationPermission} />
      )}

      {/* Urgent Tasks Alert */}
      <UrgentTasks urgentTasks={urgentTasks} />

      {/* Navigation */}
      <SidebarNav />

      {/* Actions (Notifications toggle, Theme, Logout) */}
      <SidebarActions
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={onToggleNotifications}
        onLogout={onLogout}
      />
    </aside>
  );
}

export default Sidebar;