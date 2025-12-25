// src/components/Sidebar/Sidebar.jsx
import { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import NotificationPermission from './NotificationPermission';
import UrgentTasks from './UrgentTasks';
import QuickViews from './QuickViews';
import DailyQuote from './DailyQuote';
import SidebarActions from './SidebarActions';
import logonote from '../../assets/logonote.png';
import {
  SIDEBAR_CONTAINER,
  SIDEBAR_HEADER,
  SIDEBAR_LOGO_CONTAINER,
  SIDEBAR_LOGO,
  SIDEBAR_TITLE,
  SIDEBAR_SUBTITLE,
  SHOW_QUOTE_BUTTON
} from '../../constants/styles';

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
  onOpenProfileModal,
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
    <aside className={SIDEBAR_CONTAINER}>
      <div className={SIDEBAR_HEADER}>
        <div className={SIDEBAR_LOGO_CONTAINER}>
          <img
            src={logonote}
            alt="AppNotiDo"
            className={SIDEBAR_LOGO}
          />
          <h1 className={SIDEBAR_TITLE}>
            AppNotiDo
          </h1>
        </div>

        {/* Slogan avec la police NovaQuinta
        <p className={`${SIDEBAR_SUBTITLE} font-nova-quinta`}>
          Organisez votre journée
        </p>
        <p className={`${SIDEBAR_SUBTITLE} ml-[115px] font-nova-quinta`}>
          avec le rythme!
        </p> */}
      </div>


      <UserProfile
        username={username}
        displayName={displayName}
        onOpenProfileModal={onOpenProfileModal}
      />

      {notificationPermission !== 'granted' && notificationsEnabled && (
        <NotificationPermission onRequestPermission={onRequestNotificationPermission} />
      )}

      <UrgentTasks urgentTasks={urgentTasks} />

      {showQuote && isQuotePinned && (
        <DailyQuote
          isPinned={isQuotePinned}
          onTogglePin={handleTogglePin}
          onHide={handleHideQuote}
        />
      )}

      <QuickViews
        onViewClick={onQuickViewClick}
        activeView={activeQuickView}
      />

      {showQuote && !isQuotePinned && (
        <div className="mt-auto">
          <DailyQuote
            isPinned={isQuotePinned}
            onTogglePin={handleTogglePin}
            onHide={handleHideQuote}
          />
        </div>
      )}

      {!showQuote && (
        <div className="mt-auto">
          <button
            onClick={handleShowQuote}
            className={SHOW_QUOTE_BUTTON}
          >
            💡 Afficher la citation
          </button>
        </div>
      )}

      <div className="mt-4">
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
