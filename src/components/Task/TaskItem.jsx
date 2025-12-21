// src/components/Task/TaskItem.jsx
import { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaClock, FaLock, FaLockOpen } from 'react-icons/fa';
import { useTimer } from '../../hooks/useTimer';
import { formatDate, formatDuration, calculateProgress } from '../../utils/taskUtils';
import { PRIORITY_COLORS, STATUS_COLORS, STATUS_LABELS, PRIORITY_LABELS } from '../../constants/taskConstants';
import { 
  TASK_HALO, 
  TASK_DRAG_HANDLE, 
  TASK_DRAG_BAR,
  TASK_LOCKED_BADGE,
  TASK_ACTIONS_CONTAINER,
  TASK_ACTION_BUTTON,
  TASK_CONTENT,
  TASK_TITLE,
  TASK_DESCRIPTION,
  TASK_DATE_INFO,
  TASK_DURATION_BADGE,
  TASK_BADGES_CONTAINER,
  TASK_BADGE,
  TASK_TIME_SPENT
} from '../../constants/styles';
import { getTaskCardClasses } from '../../utils/getTaskCardClasses';
import TaskEditForm from './TaskEditForm';
import TaskTimer from './TaskTimer';
import TaskBadge from './TaskBadge';
import TaskTags from './TaskTags';
import TaskProgressBar from './TaskProgressBar';;

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
      className={getTaskCardClasses(isLocked, isDragging, isDragOver, task.status === 'DONE')}
      draggable={!isLocked}
      onDragStart={(e) => !isLocked && onDragStart(e, task.id)}
      onDragEnter={(e) => !isLocked && onDragEnter(e, task.id)}
      onDragEnd={!isLocked ? onDragEnd : undefined}
    >
      {/* Halo décoratif */}
      <div className={TASK_HALO} />

      {/* Handle drag */}
      {!isLocked && (
        <div className={TASK_DRAG_HANDLE}>
          <div className={TASK_DRAG_BAR} />
        </div>
      )}

      {/* Badge verrouillé */}
      {isLocked && (
        <div className={TASK_LOCKED_BADGE}>
          <FaLock className="text-amber-600 dark:text-amber-400 animate-pulse" size={12} />
          <span className="text-xs font-bold text-amber-700 dark:text-amber-300">Verrouillée</span>
        </div>
      )}

      {/* Actions flottantes */}
      <div className={TASK_ACTIONS_CONTAINER}>
        <button
          onClick={handleToggleLock}
          className={`${TASK_ACTION_BUTTON} ${
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
          className={`${TASK_ACTION_BUTTON} text-cyan-600 hover:bg-cyan-500 hover:text-white dark:bg-amber-900/80 dark:text-amber-300 dark:hover:bg-amber-600 dark:hover:text-white`}
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
          className={`${TASK_ACTION_BUTTON} text-rose-500 hover:bg-rose-500 hover:text-white dark:bg-rose-900/80 dark:text-rose-300 dark:hover:bg-rose-600 dark:hover:text-white`}
          title="Supprimer"
        >
          <FaTrash size={16} />
        </button>
      </div>

      <div className={TASK_CONTENT}>
        <div className="flex-1">
          <h3 className={TASK_TITLE}>
            {task.title}
          </h3>
          {task.description && (
            <p className={TASK_DESCRIPTION}>
              {task.description}
            </p>
          )}

          <TaskTags tags={task.tags} />

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {dateInfo && (
              <p className={`${TASK_DATE_INFO} ${dateInfo.color}`}>
                <span className="text-base">{dateInfo.emoji}</span> {dateInfo.text}
              </p>
            )}
            {task.estimatedDuration && (
              <span className={TASK_DURATION_BADGE}>
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
            <div className={TASK_TIME_SPENT}>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                ✅ Temps passé : {formatDuration(task.timeSpent)}
              </p>
            </div>
          )}

          <div className={TASK_BADGES_CONTAINER}>
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
