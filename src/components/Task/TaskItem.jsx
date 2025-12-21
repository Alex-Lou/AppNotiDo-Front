// components/TaskItem.jsx
import { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaClock, FaLock, FaLockOpen } from 'react-icons/fa';
import { useTimer } from '../../hooks/useTimer';
import { formatDate, formatDuration, calculateProgress } from '../../utils/taskUtils';
import { PRIORITY_COLORS, STATUS_COLORS, STATUS_LABELS, PRIORITY_LABELS } from '../../constants/taskConstants';
import TaskEditForm from './TaskEditForm';
import TaskTimer from './TaskTimer';
import TaskBadge from './TaskBadge';
import TaskTags from './TaskTags';
import TaskProgressBar from './TaskProgressBar';

function TaskItem({ 
  task, 
  onUpdate, 
  onDelete, 
  onDragStart, 
  onDragEnter, 
  onDragEnd, 
  isDragging, 
  isDragOver,
  editingTaskId,
  onStartEditing
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const { 
    elapsedSeconds, 
    formatTime, 
    handleStart, 
    handlePause, 
    handleStop, 
    getProgress,
    isRunning 
  } = useTimer(task, onUpdate);

  useEffect(() => {
    setIsEditing(editingTaskId === task.id);
    setEditedTask({ ...task });
  }, [editingTaskId, task]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    
    if (!newDate) {
      setEditedTask({ ...editedTask, dueDate: null });
      return;
    }

    const selectedDate = new Date(newDate);
    const now = new Date();

    if (selectedDate < now) {
      alert('⚠️ Impossible de définir une échéance dans le passé. Veuillez choisir une date future.');
      return;
    }

    const updatedTask = {
      ...editedTask,
      dueDate: selectedDate.toISOString(),
      notified: false,
    };

    setEditedTask(updatedTask);
  };

  const handleSave = async () => {
    await onUpdate(task.id, editedTask);
    setIsEditing(false);
    onStartEditing(null);
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
    onStartEditing(null);
  };

  const handleToggleLock = async (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const updatedTask = {
      ...task,
      locked: !task.locked,
    };
    await onUpdate(task.id, updatedTask);
  };

  if (isEditing) {
    return (
      <TaskEditForm
        editedTask={editedTask}
        setEditedTask={setEditedTask}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleDateChange={handleDateChange}
      />
    );
  }

  const dateInfo = task.dueDate ? formatDate(task.dueDate) : null;
  const isLocked = task.locked || false;
  const progressInfo = calculateProgress(task);

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl border-2
        bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30
        px-6 py-5 shadow-lg
        transition-all duration-200 ease-out
        ${isLocked ? 'cursor-not-allowed opacity-90' : 'cursor-move'}
        border-cyan-300/70
        hover:shadow-xl hover:border-cyan-400 hover:from-cyan-50/40 hover:to-orange-50/40
        hover:-translate-y-0.5 hover:scale-[1.01]
        dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30
        dark:hover:border-amber-800/80 dark:hover:from-amber-950/40 dark:hover:to-slate-950/40 dark:hover:shadow-xl
        ${isDragging ? 'opacity-70 scale-[1.02] shadow-2xl ring-2 ring-cyan-500/60 dark:ring-amber-500/60' : ''}
        ${isDragOver ? 'ring-2 ring-dashed ring-cyan-400/80 dark:ring-amber-400/80' : ''}
        ${isLocked ? 'ring-2 ring-amber-500/40 dark:ring-amber-600/40' : ''}
        ${task.status === 'DONE' ? 'animate-[pulse_1.2s_ease-out_1]' : ''}
      `}
      draggable={!isLocked}
      onDragStart={(e) => !isLocked && onDragStart(e, task.id)}
      onDragEnter={(e) => !isLocked && onDragEnter(e, task.id)}
      onDragEnd={!isLocked ? onDragEnd : undefined}
    >
      {/* Halo décoratif */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br from-cyan-200/40 via-teal-200/40 to-orange-200/40 dark:bg-gradient-to-br dark:from-amber-900/30 dark:via-orange-900/30 dark:to-rose-900/30" />

      {/* Handle drag */}
      {!isLocked && (
        <div className="pointer-events-none absolute inset-x-6 top-3 flex justify-center">
          <div className="h-2 w-12 rounded-full bg-gradient-to-r from-cyan-300 via-teal-300 to-orange-300 opacity-60 transition-opacity group-hover:opacity-100 dark:bg-gradient-to-r dark:from-amber-700/60 dark:via-orange-700/60 dark:to-rose-700/60 dark:opacity-70 dark:group-hover:opacity-100" />
        </div>
      )}

      {/* Badge verrouillé */}
      {isLocked && (
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 backdrop-blur-sm dark:bg-amber-600/20">
          <FaLock className="text-amber-600 dark:text-amber-400 animate-pulse" size={12} />
          <span className="text-xs font-bold text-amber-700 dark:text-amber-300">Verrouillée</span>
        </div>
      )}

      {/* Actions flottantes */}
      <div className="absolute right-4 top-4 flex gap-2 opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0">
        <button
          onClick={handleToggleLock}
          className={`rounded-full bg-white/90 p-2 shadow-lg transition-transform duration-150 hover:scale-110 active:scale-95 ${
            isLocked 
              ? 'text-amber-600 hover:bg-amber-500 hover:text-white dark:bg-amber-900/80 dark:text-amber-300 dark:hover:bg-amber-600'
              : 'text-slate-500 hover:bg-amber-500 hover:text-white dark:bg-slate-800/80 dark:text-slate-400 dark:hover:bg-amber-600'
          }`}
          title={isLocked ? 'Déverrouiller' : 'Verrouiller'}
        >
          {isLocked ? <FaLock size={16} className="animate-pulse" /> : <FaLockOpen size={16} />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onStartEditing(task.id);
          }}
          className="rounded-full bg-white/90 p-2 text-cyan-600 shadow-lg transition-transform duration-150 hover:bg-cyan-500 hover:text-white hover:scale-110 active:scale-95 dark:bg-amber-900/80 dark:text-amber-300 dark:hover:bg-amber-600 dark:hover:text-white"
          title="Modifier"
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete(task.id);
          }}
          className="rounded-full bg-white/90 p-2 text-rose-500 shadow-lg transition-transform duration-150 hover:bg-rose-500 hover:text-white hover:scale-110 active:scale-95 dark:bg-rose-900/80 dark:text-rose-300 dark:hover:bg-rose-600 dark:hover:text-white"
          title="Supprimer"
        >
          <FaTrash size={16} />
        </button>
      </div>

      <div className="mt-5 flex justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-base font-bold leading-snug text-slate-900 dark:text-amber-50">
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700 dark:text-amber-200/80">
              {task.description}
            </p>
          )}

          <TaskTags tags={task.tags} />

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {dateInfo && (
              <p className={`inline-flex items-center gap-1.5 text-xs font-bold ${dateInfo.color}`}>
                <span className="text-base">{dateInfo.emoji}</span> {dateInfo.text}
              </p>
            )}
            {task.estimatedDuration && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-100 to-teal-100 px-3 py-1.5 text-xs font-bold text-cyan-800 shadow-sm dark:bg-gradient-to-r dark:from-amber-900/60 dark:to-orange-900/60 dark:text-amber-200">
                <FaClock className="h-3.5 w-3.5 text-cyan-600 dark:text-amber-400" /> {formatDuration(task.estimatedDuration)}
              </span>
            )}
          </div>

          <TaskTimer
            task={task}
            elapsedSeconds={elapsedSeconds}
            formatTime={formatTime}
            handleStart={handleStart}
            handlePause={handlePause}
            handleStop={handleStop}
            getProgress={getProgress}
            isRunning={isRunning}
          />

          {/* Temps passé pour tâches terminées */}
          {task.status === 'DONE' && task.timeSpent > 0 && (
            <div className="mt-3 rounded-lg bg-emerald-50/80 px-3 py-2 dark:bg-emerald-900/20">
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                ✅ Temps passé : {formatDuration(task.timeSpent)}
              </p>
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2.5 text-xs">
            <TaskBadge type="status" value={task.status} colors={STATUS_COLORS} labels={STATUS_LABELS} />
            <TaskBadge type="priority" value={task.priority} colors={PRIORITY_COLORS} labels={PRIORITY_LABELS} />
          </div>

          <TaskProgressBar progressInfo={progressInfo} dateInfo={dateInfo} />
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
