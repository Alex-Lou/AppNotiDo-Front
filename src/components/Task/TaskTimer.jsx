// components/TaskTimer.jsx
import { FaClock, FaPlay, FaPause, FaStop } from 'react-icons/fa';
import { formatDuration } from '../../utils/taskUtils';

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
    <div className="mt-4 rounded-xl border-2 border-cyan-300/60 bg-white/80 p-4 dark:border-amber-700/60 dark:bg-slate-900/60">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-600 dark:text-amber-300/80 mb-1">
            Temps écoulé
          </p>
          <p className="text-lg font-bold text-cyan-700 dark:text-amber-400">
            {formatTime()}
          </p>
          {timerProgress && (
            <p className={`text-xs font-medium mt-1 ${timerProgress.isOvertime ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'}`}>
              {timerProgress.isOvertime ? '⚠️ Temps dépassé' : `${Math.round(timerProgress.percentage)}% du temps estimé`}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          {!isRunning ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStart();
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:from-emerald-400 hover:to-teal-400 hover:scale-105 active:scale-95 dark:from-emerald-600 dark:to-teal-600"
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
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:from-amber-400 hover:to-orange-400 hover:scale-105 active:scale-95"
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
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:from-rose-400 hover:to-red-400 hover:scale-105 active:scale-95"
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
        <div className="mt-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-slate-800/60">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                timerProgress.isOvertime
                  ? 'bg-gradient-to-r from-rose-500 to-red-500 dark:from-rose-600 dark:to-red-600'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600'
              }`}
              style={{ width: `${Math.min(100, timerProgress.percentage)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskTimer;
