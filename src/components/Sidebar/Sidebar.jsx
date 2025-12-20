import { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import NotificationPermission from './NotificationPermission';
import UrgentTasks from './UrgentTasks';
import QuickViews from './QuickViews';
import DailyQuote from './DailyQuote';
import SidebarActions from './SidebarActions';
import logonote from '../../assets/logonote.png';

function Sidebar({
  username,
  displayName,
  notificationPermission,
  notificationsEnabled,
  urgentTasks,
  onRequestNotificationPermission,
  onToggleNotifications,
  onLogout,
  onQuickViewClick,
  activeQuickView,
}) {
  const [showQuote, setShowQuote] = useState(() => {
    const saved = localStorage.getItem('showDailyQuote');
    return saved === null ? true : saved === 'true';
  });

  const [isQuotePinned, setIsQuotePinned] = useState(() => {
    const saved = localStorage.getItem('dailyQuotePinned');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('showDailyQuote', showQuote);
  }, [showQuote]);

  useEffect(() => {
    localStorage.setItem('dailyQuotePinned', isQuotePinned);
  }, [isQuotePinned]);

  const handleTogglePin = () => {
    setIsQuotePinned(!isQuotePinned);
  };

  const handleHideQuote = () => {
    setShowQuote(false);
  };

  const handleShowQuote = () => {
    setShowQuote(true);
  };

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
          <img
            src={logonote}
            alt="AppNotiDo"
            className="
              h-9 w-9 rounded-2xl
              shadow-md shadow-cyan-300/40 dark:shadow-amber-700/40
              transition-transform duration-200 ease-out
              hover:scale-105 hover:-rotate-2
            "
          />
          <h1 className="bg-gradient-to-r from-cyan-700 via-teal-700 to-orange-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-amber-500 dark:via-orange-500 dark:to-rose-500">
            AppNotiDo
          </h1>
        </div>
        <p className="mt-2 text-sm font-medium text-slate-800/90 dark:text-amber-200/80">
          Organisez votre journée
        </p>
      </div>

      {/* User Profile and display name*/}
      <UserProfile username={username} displayName={displayName} />

      {/* Notification Permission */}
      {notificationPermission !== 'granted' && notificationsEnabled && (
        <NotificationPermission onRequestPermission={onRequestNotificationPermission} />
      )}

      {/* Urgent Tasks Alert */}
      <UrgentTasks urgentTasks={urgentTasks} />

      {/* Citation du jour (en haut si épinglée) */}
      {showQuote && isQuotePinned && (
        <DailyQuote
          isPinned={isQuotePinned}
          onTogglePin={handleTogglePin}
          onHide={handleHideQuote}
        />
      )}

      {/* Quick Views */}
      <QuickViews
        onViewClick={onQuickViewClick}
        activeView={activeQuickView}
      />

      {/* Citation du jour (en bas si non épinglée) */}
      {showQuote && !isQuotePinned && (
        <div className="mt-auto">
          <DailyQuote
            isPinned={isQuotePinned}
            onTogglePin={handleTogglePin}
            onHide={handleHideQuote}
          />
        </div>
      )}

      {/* Bouton pour réafficher la citation si masquée */}
      {!showQuote && (
        <div className="mt-auto">
          <button
            onClick={handleShowQuote}
            className="w-full rounded-xl border-2 border-amber-400/60 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2.5 text-sm font-semibold text-amber-700 transition hover:from-amber-100 hover:to-orange-100 dark:border-amber-700/70 dark:bg-gradient-to-r dark:from-amber-900/40 dark:to-orange-900/40 dark:text-amber-300 dark:hover:from-amber-900/60 dark:hover:to-orange-900/60"
          >
            💡 Afficher la citation
          </button>
        </div>
      )}

      {/* Actions (Notifications toggle, Theme, Logout) */}
      <div className={isQuotePinned || !showQuote ? 'mt-auto' : 'mt-6'}>
        <SidebarActions
          notificationsEnabled={notificationsEnabled}
          onToggleNotifications={onToggleNotifications}
          onLogout={onLogout}
        />
      </div>
    </aside>
  );
}

export default Sidebar;
