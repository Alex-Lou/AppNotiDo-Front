// src/components/Sidebar/Sidebar.jsx
import { useState } from 'react';
import UserProfile from './UserProfile';
import NotificationPermission from './NotificationPermission';
import UrgentTasks from './UrgentTasks';
import QuickViews from './QuickViews';
import SidebarActions from './SidebarActions';
import ProjectList from '../Projects/ProjectList';
import ProjectFormModal from '../Projects/ProjectFormModal';
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