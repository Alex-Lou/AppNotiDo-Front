// src/components/Sidebar/Sidebar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import UserProfile from './UserProfile';
import NotificationPermission from './NotificationPermission';
import UrgentTasks from './UrgentTasks';
import QuickViews from './QuickViews';
import SidebarActions from './SidebarActions';
import ProjectList from '../Projects/ProjectList';
import ProjectFormModal from '../Projects/ProjectFormModal';
import { useAdmin } from '../../hooks/useAdmin';
import logonote from '../../assets/logonote.png';
import {
  SIDEBAR_HEADER,
  SIDEBAR_LOGO_CONTAINER,
  SIDEBAR_LOGO,
  SIDEBAR_TITLE
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
  // Props pour les projets
  projects = [],
  activeProject,
  onSelectProject,
  onCreateProject,
  onUpdateProject,
  onArchiveProject,
  onDeleteProject,
  projectsLoading = false
}) {
  const navigate = useNavigate();
  const { isSuperAdmin } = useAdmin();
  
  // État pour le modal de projet
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Handlers pour les projets
  const handleOpenCreateProject = () => {
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProject = (project) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const handleSubmitProject = async (projectData) => {
    if (editingProject) {
      await onUpdateProject(projectData.id, projectData);
    } else {
      await onCreateProject(projectData);
    }
  };

  return (
    <div className="flex flex-col h-full">
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

      <QuickViews
        onViewClick={onQuickViewClick}
        activeView={activeQuickView}
      />

      {/* Section Projets */}
      <ProjectList
        projects={projects}
        activeProject={activeProject}
        onSelectProject={onSelectProject}
        onCreateProject={handleOpenCreateProject}
        onEditProject={handleOpenEditProject}
        onArchiveProject={onArchiveProject}
        onDeleteProject={onDeleteProject}
        loading={projectsLoading}
      />

      <div className="mt-auto">
        {/* ✅ NOUVEAU : Bouton Admin (visible seulement pour SUPER_ADMIN) */}
        {isSuperAdmin && (
          <div className="px-3 mb-2">
            <button
              onClick={() => navigate('/admin')}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold
                       bg-gradient-to-r from-red-500/10 to-rose-500/10 
                       text-red-600 hover:from-red-500/20 hover:to-rose-500/20
                       border border-red-200/50 hover:border-red-300/50
                       transition-all duration-200
                       dark:from-red-900/30 dark:to-rose-900/30 
                       dark:text-red-400 dark:border-red-800/50
                       dark:hover:from-red-900/50 dark:hover:to-rose-900/50"
            >
              <Shield size={16} />
              Administration
            </button>
          </div>
        )}
        
        <SidebarActions
          notificationsEnabled={notificationsEnabled}
          onToggleNotifications={onToggleNotifications}
          onLogout={onLogout}
        />
      </div>

      {/* Modal création/édition projet */}
      <ProjectFormModal
        isOpen={isProjectModalOpen}
        onClose={handleCloseProjectModal}
        onSubmit={handleSubmitProject}
        project={editingProject}
      />
    </div>
  );
}

export default Sidebar;