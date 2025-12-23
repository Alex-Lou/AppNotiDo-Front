// src/components/Task/TaskItem.jsx
import { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaClock, FaLock, FaLockOpen } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { useTimer } from '../../hooks/useTimer';
import { formatDate, formatDuration, formatTimeSpent, calculateProgress } from '../../utils/taskUtils';
import { PRIORITY_COLORS, STATUS_COLORS, STATUS_LABELS, PRIORITY_LABELS } from '../../constants/taskConstants';
import { 
  TASK_HALO, 
  TASK_DRAG_HANDLE, 
  TASK_DRAG_BAR,
  TASK_LOCKED_BADGE,
  TASK_LOCKED_ICON,
  TASK_LOCKED_TEXT,
  TASK_UNLOCK_ICON,
  TASK_ACTIONS_CONTAINER,
  TASK_ACTION_BUTTON,
  TASK_ACTION_LOCK_LOCKED,
  TASK_ACTION_LOCK_UNLOCKED,
  TASK_ACTION_EDIT,
  TASK_ACTION_DELETE,
  TASK_CONTENT,
  TASK_ITEM_CONTENT_FLEX,
  TASK_TITLE,
  TASK_DESCRIPTION,
  TASK_METADATA_CONTAINER,
  TASK_DATE_INFO,
  TASK_DURATION_BADGE,
  TASK_DURATION_ICON,
  TASK_BADGES_CONTAINER,
  TASK_TIME_SPENT_CONTAINER,
  TASK_TIME_SPENT_CLOSE,
  TASK_TIME_SPENT_TEXT
} from '../../constants/styles';
import { getTaskCardClasses } from '../../utils/getTaskCardClasses';
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
  const [showTimeSpent, setShowTimeSpent] = useState(true);

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

  // Vérifier le localStorage au montage
  useEffect(() => {
    const storageKey = `task-${task.id}-hideTimeSpent`;
    const saved = localStorage.getItem(storageKey);
    
    if (saved === 'hidden') {
      setShowTimeSpent(false);
    } else {
      setShowTimeSpent(true);
    }
  }, [task.id]);

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

  const handleCloseTimeSpent = (e) => {
    e.stopPropagation();
    const storageKey = `task-${task.id}-hideTimeSpent`;
    localStorage.setItem(storageKey, 'hidden');
    setShowTimeSpent(false);
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
          <FaLock className={TASK_LOCKED_ICON} size={12} />
          <span className={TASK_LOCKED_TEXT}>Verrouillée</span>
        </div>
      )}

      {/* Actions flottantes */}
      <div className={TASK_ACTIONS_CONTAINER}>
        <button
          onClick={handleToggleLock}
          className={`${TASK_ACTION_BUTTON} ${
            isLocked ? TASK_ACTION_LOCK_LOCKED : TASK_ACTION_LOCK_UNLOCKED
          }`}
          title={isLocked ? 'Déverrouiller' : 'Verrouiller'}
        >
          {isLocked ? <FaLock size={16} className={TASK_UNLOCK_ICON} /> : <FaLockOpen size={16} />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onStartEditing(task.id);
          }}
          className={`${TASK_ACTION_BUTTON} ${TASK_ACTION_EDIT}`}
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
          className={`${TASK_ACTION_BUTTON} ${TASK_ACTION_DELETE}`}
          title="Supprimer"
        >
          <FaTrash size={16} />
        </button>
      </div>

      <div className={TASK_CONTENT}>
        <div className={TASK_ITEM_CONTENT_FLEX}>
          <h3 className={TASK_TITLE}>
            {task.title}
          </h3>
          {task.description && (
            <p className={TASK_DESCRIPTION}>
              {task.description}
            </p>
          )}

          <TaskTags tags={task.tags} />

          <div className={TASK_METADATA_CONTAINER}>
            {dateInfo && (
              <p className={`${TASK_DATE_INFO} ${dateInfo.color}`}>
                <span className="text-base">{dateInfo.emoji}</span> {dateInfo.text}
              </p>
            )}
            {task.estimatedDuration && (
              <span className={TASK_DURATION_BADGE}>
                <FaClock className={TASK_DURATION_ICON} /> {formatDuration(task.estimatedDuration)}
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

          {/* Temps passé pour tâches terminées - AVEC CROIX ET LOCALSTORAGE */}
          {task.status === 'DONE' && task.timeSpent > 0 && showTimeSpent && (
            <div className={TASK_TIME_SPENT_CONTAINER}>
              <button
                onClick={handleCloseTimeSpent}
                className={TASK_TIME_SPENT_CLOSE}
                title="Masquer"
                aria-label="Masquer le temps passé"
              >
                <FiX size={16} />
              </button>
              <p className={TASK_TIME_SPENT_TEXT}>
                ✅ Temps passé : {formatTimeSpent(task.timeSpent)}
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
