// src/components/Dashboard/DashboardHeader.jsx
import { DASHBOARD_HEADER_CONTAINER, DASHBOARD_HEADER_TITLE, DASHBOARD_HEADER_SUBTITLE } from '../../constants/styles';

function DashboardHeader({ username }) {
  return (
    <div className={DASHBOARD_HEADER_CONTAINER}>
      <div>
        <h2 className={DASHBOARD_HEADER_TITLE}>
          Bonjour, {username} <span className="align-middle">👋</span>
        </h2>
        <p className={DASHBOARD_HEADER_SUBTITLE}>
          Voici un aperçu de vos tâches pour aujourd'hui.
        </p>
      </div>
    </div>
  );
}

export default DashboardHeader;
