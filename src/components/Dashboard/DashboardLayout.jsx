// src/components/Dashboard/DashboardLayout.jsx
import { useState } from 'react';
import { Menu, X, LayoutDashboard, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  DASHBOARD_LAYOUT_CONTAINER,
  DASHBOARD_LAYOUT_MAIN,
  SIDEBAR_CONTAINER,
  RIGHT_SIDEBAR_CONTAINER,
  SIDEBAR_OVERLAY,
  HAMBURGER_BUTTON,
  HAMBURGER_ICON,
  TOGGLE_RIGHT_SIDEBAR_BUTTON,
  COLLAPSE_BUTTON_LEFT,
  COLLAPSE_BUTTON_RIGHT,
  getSidebarWidth,
  getRightSidebarWidth,
  getMainClasses
} from '../../constants/styles';


function DashboardLayout({ children, sidebar, rightSidebar, notifications }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);

  // Toggle avec fermeture automatique de l'autre sidebar (seulement si écran < 545px)
  const toggleSidebar = () => {
    const shouldAutoClose = window.innerWidth < 573;
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen && isRightSidebarOpen && shouldAutoClose) {
      // Si on ouvre la gauche et que la droite est ouverte ET écran petit, fermer la droite
      setIsRightSidebarOpen(false);
    }
  };

  const toggleRightSidebar = () => {
    const shouldAutoClose = window.innerWidth < 545;
    setIsRightSidebarOpen(!isRightSidebarOpen);
    if (!isRightSidebarOpen && isSidebarOpen && shouldAutoClose) {
      // Si on ouvre la droite et que la gauche est ouverte ET écran petit, fermer la gauche
      setIsSidebarOpen(false);
    }
  };

  const toggleLeftCollapse = () => setIsLeftCollapsed(!isLeftCollapsed);
  const toggleRightCollapse = () => setIsRightCollapsed(!isRightCollapsed);

  const closeSidebar = () => setIsSidebarOpen(false);
  const closeRightSidebar = () => setIsRightSidebarOpen(false);

  // Extraire l'initiale du sidebar
  const getUserInitial = () => {
    if (sidebar?.props?.displayName) {
      return sidebar.props.displayName.charAt(0).toUpperCase();
    }
    return 'P';
  };

  // Reste du composant identique...


  return (
    <div className={DASHBOARD_LAYOUT_CONTAINER}>
      {notifications}

      {/* Contenu principal */}
      <main className={`${DASHBOARD_LAYOUT_MAIN} ${getMainClasses(isLeftCollapsed, isRightCollapsed)}`}>
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
      <aside 
        className={`${SIDEBAR_CONTAINER} ${getSidebarWidth(isLeftCollapsed)} ${
          isSidebarOpen 
            ? 'translate-x-0' 
            : '-translate-x-full'
        } xl:translate-x-0`}
      >
        {/* Bouton collapse - desktop only */}
        <button
          onClick={toggleLeftCollapse}
          className={`${COLLAPSE_BUTTON_LEFT} hidden xl:flex`}
          aria-label={isLeftCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isLeftCollapsed ? "Agrandir" : "Réduire"}
        >
          {isLeftCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Contenu normal - toujours visible sur mobile, conditionnel sur desktop */}
        <div className={`xl:${isLeftCollapsed ? 'hidden' : 'block'}`}>
          {sidebar}
        </div>
        
        {/* Version collapsed - desktop only */}
        {isLeftCollapsed && (
          <div className="hidden xl:flex flex-col items-center gap-4 pt-16">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 shadow-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {getUserInitial()}
              </span>
            </div>
          </div>
        )}
      </aside>

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
      <aside 
        className={`${RIGHT_SIDEBAR_CONTAINER} ${getRightSidebarWidth(isRightCollapsed)} ${
          isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } xl:translate-x-0`}
      >
        {/* Bouton collapse - desktop only */}
        <button
          onClick={toggleRightCollapse}
          className={`${COLLAPSE_BUTTON_RIGHT} hidden xl:flex`}
          aria-label={isRightCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isRightCollapsed ? "Agrandir" : "Réduire"}
        >
          {isRightCollapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        {/* Contenu normal - toujours visible sur mobile, conditionnel sur desktop */}
        <div className={`xl:${isRightCollapsed ? 'hidden' : 'block'}`}>
          {rightSidebar}
        </div>

        {/* Version collapsed - desktop only */}
        {isRightCollapsed && (
          <div className="hidden xl:flex flex-col items-center gap-4 pt-16">
            <LayoutDashboard size={24} className="text-slate-600 dark:text-amber-400" />
          </div>
        )}
      </aside>
    </div>
  );
}


export default DashboardLayout;
