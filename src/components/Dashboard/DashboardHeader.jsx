// src/components/Dashboard/DashboardHeader.jsx
import { DASHBOARD_HEADER_CONTAINER, DASHBOARD_HEADER_TITLE, DASHBOARD_HEADER_SUBTITLE } from '../../constants/styles';
import { getContextualGreeting, getContextualSubtitle, getCurrentHour } from '../../utils/greetingMessages';
import ExportButton from './ExportButton';
import NotificationBell from "./NotificationBell";
import InvitationBell from "./InvitationBell";

function DashboardHeader({ username, completedCount, totalCount, onExportCSV, onExportPDF, onInvitationAccepted }) {
  const currentHour = getCurrentHour();
  const greeting = getContextualGreeting(currentHour, completedCount, totalCount, username);
  const subtitle = getContextualSubtitle(completedCount, totalCount);

  return (
    <div className={DASHBOARD_HEADER_CONTAINER}>
      <div className="flex-1">
        <h2 className={`${DASHBOARD_HEADER_TITLE} dashboard-title-responsive`}>
          {greeting}
        </h2>
        <p className={DASHBOARD_HEADER_SUBTITLE}>
          {subtitle}
        </p>
      </div>
      
      {/* Actions à droite : Invitations + Notifications + Export */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <InvitationBell onInvitationAccepted={onInvitationAccepted} />
        <NotificationBell />
        <ExportButton 
          onExportCSV={onExportCSV}
          onExportPDF={onExportPDF}
        />
      </div>
    </div>
  );
}

export default DashboardHeader;
