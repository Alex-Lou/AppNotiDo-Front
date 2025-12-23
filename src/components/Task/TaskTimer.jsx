// src/components/Task/TaskTimer.jsx
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import {
  TASK_TIMER_COMPACT_CONTAINER,
  TASK_TIMER_COMPACT_TIME,
  TASK_TIMER_COMPACT_PLAY,
  TASK_TIMER_COMPACT_PAUSE,
  TASK_TIMER_COMPACT_STOP
} from '../../constants/styles';

function TaskTimer({
  task,
  formatTime,
  handleStart,
  handlePause,
  handleStop,
  isRunning
}) {
  // Ne rien afficher pour une tâche terminée
  if (task.status === 'DONE') return null;

  return (
    <div className={TASK_TIMER_COMPACT_CONTAINER}>
      {/* Temps en chiffres uniquement */}
      <span className={TASK_TIMER_COMPACT_TIME}>
        {formatTime()}
      </span>

      {/* Boutons minimalistes, icônes seules */}
      {!isRunning ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleStart();
          }}
          aria-label="Démarrer"
          title="Démarrer"
          className={TASK_TIMER_COMPACT_PLAY}
        >
          <FaPlay size={14} />
        </button>
      ) : (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePause();
            }}
            aria-label="Pause"
            title="Pause"
            className={TASK_TIMER_COMPACT_PAUSE}
          >
            <FaPause size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Terminer cette tâche et arrêter le chronomètre ?')) {
                handleStop();
              }
            }}
            aria-label="Stopper"
            title="Stopper"
            className={TASK_TIMER_COMPACT_STOP}
          >
            <FaStop size={14} />
          </button>
        </>
      )}
    </div>
  );
}

export default TaskTimer;
