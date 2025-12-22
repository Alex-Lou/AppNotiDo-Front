// src/components/Task/TaskTimer.jsx
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

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
    <div className="mt-2 inline-flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
      {/* Temps en chiffres uniquement */}
      <span className="tabular-nums font-semibold">
        {formatTime()}
      </span>

      {/* Boutons compacts, sans cadre ni label texte */}
      {!isRunning ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleStart();
          }}
          aria-label="Démarrer"
          title="Démarrer"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-500 active:scale-95 transition"
        >
          <FaPlay size={12} />
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
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white hover:bg-amber-400 active:scale-95 transition"
          >
            <FaPause size={12} />
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
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-600 text-white hover:bg-rose-500 active:scale-95 transition"
          >
            <FaStop size={12} />
          </button>
        </>
      )}
    </div>
  );
}

export default TaskTimer;
