import { FiBell } from 'react-icons/fi';

function NotificationPermission({ onRequestPermission }) {
  return (
    <div className="mb-5 rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-100 to-orange-100 px-4 py-4 text-amber-900 shadow-md dark:border-amber-700/70 dark:bg-gradient-to-br dark:from-amber-900/70 dark:to-orange-900/70 dark:text-amber-50">
      <div className="mb-3 flex items-start gap-2">
        <FiBell className="mt-0.5 text-amber-700 dark:text-amber-300" size={18} />
        <div className="flex-1">
          <p className="mb-1.5 text-sm font-bold text-amber-900 dark:text-amber-100">
            Activer les notifications
          </p>
          <p className="text-xs leading-relaxed text-amber-800/90 dark:text-amber-200/80">
            Recevez des alertes pour vos tâches importantes.
          </p>
        </div>
      </div>
      <button
        onClick={onRequestPermission}
        className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:from-amber-400 hover:to-orange-400 dark:from-amber-600 dark:to-orange-600 dark:hover:from-amber-500 dark:hover:to-orange-500"
      >
        Autoriser
      </button>
    </div>
  );
}

export default NotificationPermission;