// src/pages/DashboardNew.jsx
import { useMemo, useState } from 'react';
import TaskForm from '../components/Task/TaskForm';
import Sidebar from '../components/Sidebar/Sidebar';
import RightSidebar from '../components/Sidebar/RightSidebar';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import StatsCards from '../components/Dashboard/StatsCards';
import TaskFilters from '../components/Task/TaskFilters';
import InAppNotifications from '../components/Dashboard/InAppNotifications';
import EmptyState from '../components/Dashboard/EmptyState';
import UrgentTasksSection from '../components/Task/UrgentTasksSection';
import TaskList from '../components/Task/TaskList';
import GridView from '../components/Grid/GridView';
import CalendarView from '../components/Dashboard/CalendarView';
import TaskEditModal from '../components/Task/TaskEditModal';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import ProfileModal from '../components/Skeleton/ProfileModal';
import DashboardSkeleton from '../components/Skeleton/DashboardSkeleton';
import { useDashboard } from '../hooks/useDashboard';
import { useProjects } from '../hooks/useProjects';
import TaskSuggestionsModal from '../components/Task/TaskSuggestionsModal';
import { useTaskSuggestions } from '../hooks/useTaskSuggestions';
import { KanbanBoard } from '../components/Kanban';
import {
  DASHBOARD_HEADER_SECTION,
  DASHBOARD_TASK_FORM_CONTAINER,
  DASHBOARD_TASKS_SECTION
} from '../constants/styles';

function DashboardNew({ setUsername }) {
  const dashboard = useDashboard(setUsername);
  const taskSuggestions = useTaskSuggestions();
  
  // State pour le modal d'ajout de colonne Kanban
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  
  // Hook pour les projets
  const {
    projects,
    activeProject,
    loading: projectsLoading,
    createProject,
    updateProject,
    archiveProject,
    deleteProject,
    selectProject
  } = useProjects();

  // Filtrer les tâches par projet actif
  const filteredByProject = useMemo(() => {
    if (!activeProject) {
      // Aucun projet sélectionné → afficher toutes les tâches
      return {
        allTasksToDisplay: dashboard.allTasksToDisplay,
        normalToDisplay: dashboard.normalToDisplay,
        urgentToDisplay: dashboard.urgentToDisplay
      };
    }

    // Filtrer par projectId
    return {
      allTasksToDisplay: dashboard.allTasksToDisplay.filter(t => t.projectId === activeProject.id),
      normalToDisplay: dashboard.normalToDisplay.filter(t => t.projectId === activeProject.id),
      urgentToDisplay: dashboard.urgentToDisplay.filter(t => t.projectId === activeProject.id)
    };
  }, [activeProject, dashboard.allTasksToDisplay, dashboard.normalToDisplay, dashboard.urgentToDisplay]);

  if (dashboard.loading || !dashboard.displayName) {
    return <DashboardSkeleton />;
  }

  const handleNewTask = () => {
    dashboard.setShowTaskForm(true);
  };

  const handleTaskCreation = async (taskData) => {
    await dashboard.onTaskCreated(taskData);
    dashboard.setShowTaskForm(false);
    taskSuggestions.fetchSuggestions();
  };

  // Ouvrir le modal d'ajout de colonne Kanban
  const handleAddKanbanColumn = () => {
    setShowAddColumnModal(true);
  };

  // Rendu de la section des tâches selon le viewMode
  const renderTasksSection = () => {
    const isEmpty = filteredByProject.normalToDisplay.length === 0 && filteredByProject.urgentToDisplay.length === 0;

    // Le calendrier s'affiche même s'il n'y a pas de tâches
    if (dashboard.viewMode === 'calendar') {
      return (
        <CalendarView
          tasks={filteredByProject.allTasksToDisplay}
          onTaskUpdate={dashboard.handleTaskUpdate}
          onTaskDelete={dashboard.handleTaskDelete}
          onStartEditing={dashboard.openEditModal}
          onCreateTask={dashboard.openCreateModal}
        />
      );
    }

    if (isEmpty) {
      return (
        <EmptyState 
          hasFilters={dashboard.hasFilters || activeProject !== null} 
          onNewTask={handleNewTask}
          customMessage={activeProject ? `Aucune tâche dans le projet "${activeProject.name}"` : null}
        />
      );
    }

    switch (dashboard.viewMode) {
      case 'kanban':
        return (
          <KanbanBoard
            tasks={filteredByProject.allTasksToDisplay}
            onTaskUpdate={dashboard.handleTaskUpdate}
            onTaskDelete={dashboard.handleTaskDelete}
            onStartEditing={dashboard.openEditModal}
            projects={projects}
            showAddColumnModal={showAddColumnModal}
            onCloseAddColumnModal={() => setShowAddColumnModal(false)}
          />
        );

      case 'grid':
        return (
          <GridView
            tasks={dashboard.tasks}
            filteredTasks={filteredByProject.allTasksToDisplay}
            onTaskUpdate={dashboard.handleTaskUpdate}
            onTaskDelete={dashboard.handleTaskDelete}
            onStartEditing={dashboard.openEditModal}
            draggedTaskId={dashboard.draggedTaskId}
            dragOverTaskId={dashboard.dragOverTaskId}
            onDragStart={dashboard.handleDragStart}
            onDragEnter={dashboard.handleDragEnter}
            onDragEnd={dashboard.handleDragEnd}
            setTasks={dashboard.setTasks}
            projects={projects}
          />
        );

      case 'list':
      default:
        return (
          <>
            <UrgentTasksSection
              urgentTasks={filteredByProject.urgentToDisplay}
              draggedTaskId={dashboard.draggedTaskId}
              dragOverTaskId={dashboard.dragOverTaskId}
              editingTaskId={dashboard.editingTaskId}
              onTaskUpdate={dashboard.handleTaskUpdate}
              onTaskDelete={dashboard.handleTaskDelete}
              onDragStart={dashboard.handleDragStart}
              onDragEnter={dashboard.handleDragEnter}
              onDragEnd={dashboard.handleDragEnd}
              onStartEditing={dashboard.setEditingTaskId}
              setTasks={dashboard.setTasks}
              fetchTasks={dashboard.fetchTasks}
              projects={projects}
            />

            <TaskList
              tasks={filteredByProject.normalToDisplay}
              draggedTaskId={dashboard.draggedTaskId}
              dragOverTaskId={dashboard.dragOverTaskId}
              editingTaskId={dashboard.editingTaskId}
              onTaskUpdate={dashboard.handleTaskUpdate}
              onTaskDelete={dashboard.handleTaskDelete}
              onDragStart={dashboard.handleDragStart}
              onDragEnter={dashboard.handleDragEnter}
              onDragEnd={dashboard.handleDragEnd}
              onStartEditing={dashboard.setEditingTaskId}
              projects={projects}
            />
          </>
        );
    }
  };

  // Déterminer si on doit afficher le modal d'édition/création
  const showEditModal = (dashboard.taskToEdit || dashboard.isCreatingTask) && dashboard.viewMode !== 'list';

  return (
    <DashboardLayout
      notifications={
        <InAppNotifications
          notifications={dashboard.inAppNotifications}
          onRemove={dashboard.removeInAppNotification}
          enabled={dashboard.notificationsEnabled}
        />
      }
      sidebar={
        <Sidebar
          username={dashboard.username}
          displayName={dashboard.displayName}
          notificationPermission={dashboard.notificationPermission}
          notificationsEnabled={dashboard.notificationsEnabled}
          urgentTasks={dashboard.allUrgentTasks}
          onRequestNotificationPermission={dashboard.handleRequestNotificationPermission}
          onToggleNotifications={dashboard.toggleNotifications}
          onLogout={dashboard.handleLogout}
          onQuickViewClick={dashboard.handleQuickViewClick}
          activeQuickView={dashboard.activeQuickView}
          onOpenProfileModal={() => dashboard.setIsProfileModalOpen(true)}
          // Props pour les projets
          projects={projects}
          activeProject={activeProject}
          onSelectProject={selectProject}
          onCreateProject={createProject}
          onUpdateProject={updateProject}
          onArchiveProject={archiveProject}
          onDeleteProject={deleteProject}
          projectsLoading={projectsLoading}
        />
      }
      rightSidebar={
        <RightSidebar
          stats={dashboard.stats}
          tasks={dashboard.tasks}
          urgentCount={dashboard.allUrgentTasks.length}
          onTaskClick={dashboard.handleTaskClick}
          onTaskDelete={dashboard.handleTaskDelete}
        />
      }
    >

      <div className={DASHBOARD_HEADER_SECTION}>
        <DashboardHeader 
          username={dashboard.displayName}
          completedCount={dashboard.stats.done}
          totalCount={dashboard.stats.total}
          onExportCSV={dashboard.exportToCSV}
          onExportPDF={dashboard.exportToPDF}
        />

        <StatsCards
          stats={dashboard.stats}
          onFilterClick={dashboard.handleStatsCardClick}
          activeFilter={dashboard.statusFilter}
        />

        <TaskFilters
          statusFilter={dashboard.statusFilter}
          setStatusFilter={dashboard.setStatusFilter}
          priorityFilter={dashboard.priorityFilter}
          setPriorityFilter={dashboard.setPriorityFilter}
          onNewTask={handleNewTask}
          searchQuery={dashboard.searchQuery}
          onSearchChange={dashboard.setSearchQuery}
          onClearSearch={dashboard.clearSearch}
          searchResultCount={dashboard.searchResultCount}
          totalCount={dashboard.tasks.length}
          onExportCSV={dashboard.exportToCSV}
          onExportPDF={dashboard.exportToPDF}
          viewMode={dashboard.viewMode}
          setViewMode={dashboard.setViewMode}
          onAddKanbanColumn={handleAddKanbanColumn}
        />
      </div>

      {dashboard.showTaskForm && (
        <div className={DASHBOARD_TASK_FORM_CONTAINER}>
          <TaskForm 
            onTaskCreated={handleTaskCreation}
            onClose={() => dashboard.setShowTaskForm(false)}
            projects={projects}
            activeProject={activeProject}
          />
        </div>
      )}

      <div className={DASHBOARD_TASKS_SECTION}>
        {renderTasksSection()}
      </div>

      {/* Modal d'édition/création global */}
      {showEditModal && (
        <TaskEditModal
          task={dashboard.taskToEdit}
          isCreating={dashboard.isCreatingTask}
          defaultDate={dashboard.createTaskDefaultDate}
          onSave={dashboard.handleEditModalSave}
          onCreate={dashboard.handleCreateModalSave}
          onClose={dashboard.closeEditModal}
          projects={projects}
          activeProject={activeProject}
        />
      )}

      {taskSuggestions.showModal && (
        <TaskSuggestionsModal
          suggestions={taskSuggestions.suggestions}
          onClose={() => taskSuggestions.setShowModal(false)}
          onMoveTasks={async (taskIds) => {
            const success = await taskSuggestions.moveTasksToToday(taskIds);
            if (success) {
              await dashboard.fetchTasks();
              taskSuggestions.fetchSuggestions();
            }
          }}
        />
      )}

      {dashboard.isProfileModalOpen && (
        <ProfileModal
          onClose={() => dashboard.setIsProfileModalOpen(false)}
          initialEmail={dashboard.profileEmail}
        />
      )}
    </DashboardLayout>
  );
}

export default DashboardNew;