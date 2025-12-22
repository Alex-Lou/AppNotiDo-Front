import { DASHBOARD_HEADER_CONTAINER, DASHBOARD_HEADER_TITLE, DASHBOARD_HEADER_SUBTITLE } from '../../constants/styles';
import { getContextualGreeting, getContextualSubtitle, getCurrentHour } from '../../utils/greetingMessages';

function DashboardHeader({ username, completedCount, totalCount }) {
  const currentHour = getCurrentHour();
  const greeting = getContextualGreeting(currentHour, completedCount, totalCount, username);
  const subtitle = getContextualSubtitle(completedCount, totalCount);

  return (
    <div className={DASHBOARD_HEADER_CONTAINER}>
      <div className="w-full">
        <h2 className={`${DASHBOARD_HEADER_TITLE} dashboard-title-responsive`}>
          {greeting}
        </h2>
        <p className={DASHBOARD_HEADER_SUBTITLE}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default DashboardHeader;
