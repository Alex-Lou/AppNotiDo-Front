// src/components/Task/TaskProgressBar.jsx
import {
  TASK_PROGRESS_CONTAINER,
  TASK_PROGRESS_BAR,
  TASK_PROGRESS_BAR_THIN,
  TASK_PROGRESS_FILL,
  TASK_PROGRESS_FILL_NO_TRANSITION,
  TASK_PROGRESS_TEXT
} from '../../constants/styles';

function TaskProgressBar({ progressInfo, dateInfo }) {
  if (progressInfo) {
    return (
      <div className={TASK_PROGRESS_CONTAINER}>
        <div className={TASK_PROGRESS_BAR}>
          <div
            className={`${TASK_PROGRESS_FILL} ${progressInfo.color}`}
            style={{ width: `${progressInfo.percentage}%` }}
          />
        </div>
        <p className={TASK_PROGRESS_TEXT}>
          {progressInfo.status === 'not-started' && 'Pas encore commencée'}
          {progressInfo.status === 'in-progress' && `Progression: ${Math.round(progressInfo.percentage)}%`}
          {progressInfo.status === 'overdue' && 'Temps dépassé'}
        </p>
      </div>
    );
  }

  if (dateInfo) {
    return (
      <div className={TASK_PROGRESS_CONTAINER}>
        <div className={TASK_PROGRESS_BAR_THIN}>
          <div
            className={`${TASK_PROGRESS_FILL_NO_TRANSITION} ${
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
