// src/pages/DashboardNew.jsx
import TaskForm from '../components/Task/TaskForm';
import Sidebar from '../components/Sidebar/Sidebar';
import RightSidebar from '../components/Dashboard/RightSidebar';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import StatsCards from '../components/Dashboard/StatsCards';
import TaskFilters from '../components/Dashboard/TaskFilters';
import InAppNotifications from '../components/Dashboard/InAppNotifications';
import EmptyState from '../components/Dashboard/EmptyState';
import UrgentTasksSection from '../components/Dashboard/UrgentTasksSection';
import TaskList from '../components/Dashboard/TaskList';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import ProfileModal from '../components/Skeleton/ProfileModal';
import DashboardSkeleton from '../components/Skeleton/DashboardSkeleton';
import { useDashboard } from '../hooks/useDashboard';
import {
  DASHBOARD_HEADER_SECTION,
  DASHBOARD_TASK_FORM_CONTAINER,
  DASHBOARD_TASKS_SECTION
} from '../constants/styles';

function DashboardNew({ setUsername }) {
  const dashboard = useDashboard(setUsername);

  if (dashboard.loading || !dashboard.displayName) {
    return <DashboardSkeleton />;
  }

  const handleNewTask = () => {
    dashboard.setShowTaskForm(true);
  };

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
        <DashboardHeader username={dashboard.displayName} />

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
        />
      </div>

      {dashboard.showTaskForm && (
        <div className={DASHBOARD_TASK_FORM_CONTAINER}>
          <TaskForm 
            onTaskCreated={dashboard.onTaskCreated}
            onClose={() => dashboard.setShowTaskForm(false)}
          />
        </div>
      )}

      <div className={DASHBOARD_TASKS_SECTION}>
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

        {dashboard.normalToDisplay.length === 0 && dashboard.urgentToDisplay.length === 0 ? (
          <EmptyState 
            hasFilters={dashboard.hasFilters} 
            onNewTask={handleNewTask}
          />
        ) : (
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
        )}
      </div>

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