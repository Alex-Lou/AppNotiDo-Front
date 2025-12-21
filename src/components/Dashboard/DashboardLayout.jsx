// src/components/Dashboard/DashboardLayout.jsx
import { DASHBOARD_LAYOUT_CONTAINER, DASHBOARD_LAYOUT_MAIN } from '../../constants/styles';

function DashboardLayout({ children, sidebar, rightSidebar, notifications }) {
  return (
    <div className={DASHBOARD_LAYOUT_CONTAINER}>
      {notifications}
      {sidebar}
      {rightSidebar}
      <main className={DASHBOARD_LAYOUT_MAIN}>
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
