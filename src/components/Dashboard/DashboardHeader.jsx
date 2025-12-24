import { FiDownload } from 'react-icons/fi';
import { DASHBOARD_HEADER_CONTAINER, DASHBOARD_HEADER_TITLE, DASHBOARD_HEADER_SUBTITLE } from '../../constants/styles';
import { getContextualGreeting, getContextualSubtitle, getCurrentHour } from '../../utils/greetingMessages';
import ExportButton from './ExportButton';


function DashboardHeader({ username, completedCount, totalCount, onExportCSV, onExportPDF }) {
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
      
      {/* Bouton Export à droite */}
      <div className="flex-shrink-0">
        <ExportButton 
          onExportCSV={onExportCSV}
          onExportPDF={onExportPDF}
        />
      </div>
    </div>
  );
}


export default DashboardHeader;
