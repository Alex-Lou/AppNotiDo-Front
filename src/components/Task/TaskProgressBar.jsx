// components/TaskProgressBar.jsx
function TaskProgressBar({ progressInfo, dateInfo }) {
  if (progressInfo) {
    return (
      <div className="mt-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-slate-800/60">
          <div
            className={`h-full rounded-full bg-gradient-to-r shadow-sm transition-all duration-500 ${progressInfo.color}`}
            style={{ width: `${progressInfo.percentage}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs font-medium text-slate-600 dark:text-amber-300/70">
          {progressInfo.status === 'not-started' && 'Pas encore commencée'}
          {progressInfo.status === 'in-progress' && `Progression: ${Math.round(progressInfo.percentage)}%`}
          {progressInfo.status === 'overdue' && 'Temps dépassé'}
        </p>
      </div>
    );
  }

  if (dateInfo) {
    return (
      <div className="mt-4">
        <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-slate-800/60">
          <div
            className={`h-full rounded-full shadow-sm ${
              dateInfo.isOverdue 
                ? 'bg-gradient-to-r from-rose-500 to-orange-500 dark:from-rose-600 dark:to-orange-600' 
                : 'bg-gradient-to-r from-cyan-500 to-teal-500 dark:from-amber-600 dark:to-orange-600'
            }`}
            style={{ width: dateInfo.isOverdue ? '100%' : '45%' }}
          />
        </div>
      </div>
    );
  }

  return null;
}

export default TaskProgressBar;
