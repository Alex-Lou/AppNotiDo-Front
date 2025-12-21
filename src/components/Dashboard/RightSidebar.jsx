// src/components/Dashboard/RightSidebar.jsx
import DaySummary from './DaySummary';
import UpcomingTasks from './UpcomingTasks';
import RecentActivity from './RecentActivity';

function RightSidebar({ stats, tasks, urgentCount, onTaskClick, onTaskDelete }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Résumé du jour */}
      <DaySummary stats={stats} urgentCount={urgentCount} />

      {/* Tâches à venir */}
      <UpcomingTasks 
        tasks={tasks} 
        onTaskClick={onTaskClick}
        onTaskDelete={onTaskDelete}
      />

      {/* Activité récente */}
      <RecentActivity tasks={tasks} onTaskClick={onTaskClick} />
    </div>
  );
}

export default RightSidebar;