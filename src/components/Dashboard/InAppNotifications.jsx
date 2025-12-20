import { FiBell, FiX } from 'react-icons/fi';

function InAppNotifications({ notifications, onRemove, enabled }) {
  if (!enabled || notifications.length === 0) return null;

  return (
    <div className="fixed left-6 bottom-6 z-50 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="relative flex items-start gap-3 rounded-2xl border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-100 to-teal-100 px-5 py-4 shadow-xl backdrop-blur-sm dark:border-amber-800/70 dark:bg-gradient-to-br dark:from-amber-950/80 dark:to-stone-950/80 dark:text-amber-50"
        >
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-200 to-teal-200 dark:bg-gradient-to-br dark:from-amber-900/60 dark:to-orange-900/60">
              <FiBell className="text-cyan-700 dark:text-amber-300" size={20} />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="mb-1.5 text-sm font-bold text-slate-800 dark:text-amber-50">
              {notification.title}
            </h4>
            <p className="text-xs leading-relaxed text-slate-700 dark:text-amber-100/80">
              {notification.message}
            </p>
          </div>
          <button
            onClick={() => onRemove(notification.id)}
            className="flex-shrink-0 rounded-full p-1.5 text-cyan-600 transition hover:bg-cyan-200 hover:text-cyan-800 dark:text-amber-300/70 dark:hover:bg-amber-900/60 dark:hover:text-amber-50"
          >
            <FiX size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default InAppNotifications;