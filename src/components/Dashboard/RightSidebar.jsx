import DaySummary from './DaySummary';
import UpcomingTasks from './UpcomingTasks';
import RecentActivity from './RecentActivity';

function RightSidebar({ stats, tasks, urgentCount, onTaskClick, onTaskDelete }) {
  return (
    <aside className="fixed right-0 top-0 h-full w-80 overflow-y-auto border-l-2 border-cyan-300/60 bg-gradient-to-b from-cyan-100/30 via-teal-100/20 to-orange-100/30 px-6 py-10 dark:border-amber-900/60 dark:bg-gradient-to-b dark:from-slate-950/60 dark:via-stone-950/50 dark:to-slate-950/60">
      <div className="space-y-6">
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
    </aside>
  );
}

export default RightSidebar;