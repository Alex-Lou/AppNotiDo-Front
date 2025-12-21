// src/components/Sidebar/SidebarNav.jsx
import { FiList } from 'react-icons/fi';
import { SIDEBAR_NAV, SIDEBAR_NAV_BUTTON } from '../../constants/styles';

function SidebarNav() {
  return (
    <nav className={SIDEBAR_NAV}>
      <button className={SIDEBAR_NAV_BUTTON}>
        <FiList className="text-cyan-700 dark:text-amber-300" size={20} /> 
        <span>Toutes les tâches</span>
      </button>
    </nav>
  );
}

export default SidebarNav;
