// src/components/Dashboard/DashboardLayout.jsx
import { useState } from 'react';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import {
  DASHBOARD_LAYOUT_CONTAINER,
  DASHBOARD_LAYOUT_MAIN,
  SIDEBAR_CONTAINER,
  SIDEBAR_OVERLAY,
  HAMBURGER_BUTTON,
  HAMBURGER_ICON,
  TOGGLE_RIGHT_SIDEBAR_BUTTON
} from '../../constants/styles';

function DashboardLayout({ children, sidebar, rightSidebar, notifications }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen);

  const closeSidebar = () => setIsSidebarOpen(false);
  const closeRightSidebar = () => setIsRightSidebarOpen(false);

  return (
    <div className={DASHBOARD_LAYOUT_CONTAINER}>
      {notifications}

      {/* Contenu principal */}
      <main className={DASHBOARD_LAYOUT_MAIN}>
        {children}
      </main>

      {/* Overlay pour sidebar gauche */}
      {isSidebarOpen && (
        <div
          className={SIDEBAR_OVERLAY}
          onClick={closeSidebar}
        />
      )}

      {/* Bouton hamburger */}
      <button
        onClick={toggleSidebar}
        className={HAMBURGER_BUTTON}
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? (
          <X className={HAMBURGER_ICON} />
        ) : (
          <Menu className={HAMBURGER_ICON} />
        )}
      </button>

      {/* Sidebar gauche */}
      <div 
        className={`${SIDEBAR_CONTAINER} ${
          isSidebarOpen 
            ? 'translate-x-0' 
            : '-translate-x-full'
        } xl:translate-x-0`}
      >
        {sidebar}
      </div>

      {/* Overlay pour right sidebar */}
      {isRightSidebarOpen && (
        <div
          className="fixed inset-0 z-[50] bg-black/50 backdrop-blur-sm transition-opacity duration-300 xl:hidden"
          onClick={closeRightSidebar}
        />
      )}

      {/* Bouton toggle right sidebar */}
      <button
        onClick={toggleRightSidebar}
        className={TOGGLE_RIGHT_SIDEBAR_BUTTON}
        aria-label="Toggle statistics"
      >
        <LayoutDashboard className={HAMBURGER_ICON} />
      </button>

      {/* Right sidebar */}
      <div 
        className={`
          fixed right-0 top-0 z-[65] h-full w-80 overflow-y-auto 
          border-l-2 border-cyan-300/60 
          bg-gradient-to-b from-cyan-100/30 via-teal-100/20 to-orange-100/30 
          px-4 py-6
          dark:border-amber-900/60 
          dark:bg-gradient-to-b dark:from-slate-950/60 dark:via-stone-950/50 dark:to-slate-950/60
          transition-transform duration-300 ease-in-out
          ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          xl:translate-x-0
          sm:px-5 sm:py-8
          xl:px-6 xl:py-10
        `}
      >
        {rightSidebar}
      </div>
    </div>
  );
}

export default DashboardLayout;