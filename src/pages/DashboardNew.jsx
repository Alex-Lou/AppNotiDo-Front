// src/pages/DashboardNew.jsx
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
import GridView from '../components/Dashboard/GridView';
import CalendarView from '../components/Dashboard/CalendarView';
import TaskEditModal from '../components/Task/TaskEditModal';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import ProfileModal from '../components/Skeleton/ProfileModal';
import DashboardSkeleton from '../components/Skeleton/DashboardSkeleton';
import { useDashboard } from '../hooks/useDashboard';
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

  // Rendu de la section des tâches selon le viewMode
  const renderTasksSection = () => {
    const isEmpty = dashboard.normalToDisplay.length === 0 && dashboard.urgentToDisplay.length === 0;

    // Le calendrier s'affiche même s'il n'y a pas de tâches
    if (dashboard.viewMode === 'calendar') {
      return (
        <CalendarView
          tasks={dashboard.allTasksToDisplay}
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
          hasFilters={dashboard.hasFilters} 
          onNewTask={handleNewTask}
        />
      );
    }

    switch (dashboard.viewMode) {
      case 'kanban':
        return (
          <KanbanBoard
            tasks={dashboard.allTasksToDisplay}
            onTaskUpdate={dashboard.handleTaskUpdate}
            onTaskDelete={dashboard.handleTaskDelete}
            onStartEditing={dashboard.openEditModal}
          />
        );

      case 'grid':
        return (
          <GridView
            tasks={dashboard.tasks}
            filteredTasks={dashboard.allTasksToDisplay}
            onTaskUpdate={dashboard.handleTaskUpdate}
            onTaskDelete={dashboard.handleTaskDelete}
            onStartEditing={dashboard.openEditModal}
            draggedTaskId={dashboard.draggedTaskId}
            dragOverTaskId={dashboard.dragOverTaskId}
            onDragStart={dashboard.handleDragStart}
            onDragEnter={dashboard.handleDragEnter}
            onDragEnd={dashboard.handleDragEnd}
            setTasks={dashboard.setTasks}
          />
        );

      case 'list':
      default:
        return (
          <>
            <UrgentTasksSection
              urgentTasks={dashboard.urgentToDisplay}
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
            />

            <TaskList
              tasks={dashboard.normalToDisplay}
              draggedTaskId={dashboard.draggedTaskId}
              dragOverTaskId={dashboard.dragOverTaskId}
              editingTaskId={dashboard.editingTaskId}
              onTaskUpdate={dashboard.handleTaskUpdate}
              onTaskDelete={dashboard.handleTaskDelete}
              onDragStart={dashboard.handleDragStart}
              onDragEnter={dashboard.handleDragEnter}
              onDragEnd={dashboard.handleDragEnd}
              onStartEditing={dashboard.setEditingTaskId}
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
        />
      </div>

      {dashboard.showTaskForm && (
        <div className={DASHBOARD_TASK_FORM_CONTAINER}>
          <TaskForm 
            onTaskCreated={handleTaskCreation}
            onClose={() => dashboard.setShowTaskForm(false)}
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