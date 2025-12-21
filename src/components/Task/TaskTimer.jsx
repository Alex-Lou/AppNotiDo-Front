// src/components/Task/TaskTimer.jsx
import { FaClock, FaPlay, FaPause, FaStop } from 'react-icons/fa';
import { formatDuration } from '../../utils/taskUtils';
import {
  TASK_TIMER_CONTAINER,
  TASK_TIMER_FLEX_CONTAINER,
  TASK_TIMER_INFO,
  TASK_TIMER_LABEL,
  TASK_TIMER_TIME,
  TASK_TIMER_PROGRESS_TEXT_NORMAL,
  TASK_TIMER_PROGRESS_TEXT_OVERTIME,
  TASK_TIMER_BUTTONS,
  TASK_TIMER_START_BUTTON,
  TASK_TIMER_PAUSE_BUTTON,
  TASK_TIMER_STOP_BUTTON,
  TASK_TIMER_PROGRESS_BAR_CONTAINER,
  TASK_TIMER_PROGRESS_BAR,
  TASK_TIMER_PROGRESS_FILL_NORMAL,
  TASK_TIMER_PROGRESS_FILL_OVERTIME
} from '../../constants/styles';

function TaskTimer({ 
  task, 
  elapsedSeconds,
  formatTime, 
  handleStart, 
  handlePause, 
  handleStop, 
  getProgress,
  isRunning 
}) {
  if (task.status === 'DONE' || !task.estimatedDuration) return null;

  const timerProgress = getProgress();

  return (
    <div className={TASK_TIMER_CONTAINER}>
      <div className={TASK_TIMER_FLEX_CONTAINER}>
        <div className={TASK_TIMER_INFO}>
          <p className={TASK_TIMER_LABEL}>
            Temps écoulé
          </p>
          <p className={TASK_TIMER_TIME}>
            {formatTime()}
          </p>
          {timerProgress && (
            <p className={timerProgress.isOvertime ? TASK_TIMER_PROGRESS_TEXT_OVERTIME : TASK_TIMER_PROGRESS_TEXT_NORMAL}>
              {timerProgress.isOvertime ? '⚠️ Temps dépassé' : `${Math.round(timerProgress.percentage)}% du temps estimé`}
            </p>
          )}
        </div>

        <div className={TASK_TIMER_BUTTONS}>
          {!isRunning ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStart();
              }}
              className={TASK_TIMER_START_BUTTON}
              title="Démarrer"
            >
              <FaPlay size={14} /> Démarrer
            </button>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePause();
                }}
                className={TASK_TIMER_PAUSE_BUTTON}
                title="Pause"
              >
                <FaPause size={14} /> Pause
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Terminer cette tâche ?')) {
                    handleStop();
                  }
                }}
                className={TASK_TIMER_STOP_BUTTON}
                title="Stopper et terminer"
              >
                <FaStop size={14} /> Stopper
              </button>
            </>
          )}
        </div>
      </div>

      {/* Barre de progression timer */}
      {timerProgress && (
        <div className={TASK_TIMER_PROGRESS_BAR_CONTAINER}>
          <div className={TASK_TIMER_PROGRESS_BAR}>
            <div
              className={timerProgress.isOvertime ? TASK_TIMER_PROGRESS_FILL_OVERTIME : TASK_TIMER_PROGRESS_FILL_NORMAL}
              style={{ width: `${Math.min(100, timerProgress.percentage)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskTimer;
