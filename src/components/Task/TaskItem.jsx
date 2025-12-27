// src/components/Task/TaskItem.jsx
import { useState, useEffect } from 'react';
import { FaTrash, FaLock, FaLockOpen, FaClock } from 'react-icons/fa';
import { FiX, FiCheck, FiClock, FiPauseCircle, FiCheckCircle, FiFolder } from 'react-icons/fi';
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
  TASK_TITLE_CONTAINER,
  TASK_DESCRIPTION,
  TASK_METADATA_CONTAINER,
  TASK_DATE_INFO,
  TASK_DURATION_BADGE,
  TASK_DURATION_ICON,
  TASK_BADGES_CONTAINER,
  TASK_TIME_SPENT_CONTAINER,
  TASK_TIME_SPENT_CLOSE,
  TASK_TIME_SPENT_TEXT,
  TASK_CARD_SELECTED,
  TASK_DELETE_CONFIRM,
  TASK_DELETE_CANCEL,
  TASK_SELECT_BUTTON_BASE,
  TASK_SELECT_BUTTON_CHECKED,
  TASK_SELECT_BUTTON_UNCHECKED,
  TASK_SELECT_CHECK_ICON,
  TASK_TIMER_INDICATOR_BASE,
  TASK_TIMER_INDICATOR_TEXT,
  TASK_TIMER_DONE,
  TASK_TIMER_RUNNING,
  TASK_TIMER_PAUSED,
  TASK_TIMER_READY
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
  onStartEditing,
  isSelected,
  onToggleSelect,
  selectionMode,
  projects = []
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [showTimeSpent, setShowTimeSpent] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [, forceUpdate] = useState(0);

  const isTimerEnabled = task.timerEnabled !== false;

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

  useEffect(() => {
    const storageKey = `task-${task.id}-hideTimeSpent`;
    const saved = localStorage.getItem(storageKey);
    
    if (saved === 'hidden') {
      setShowTimeSpent(false);
    } else {
      setShowTimeSpent(true);
    }
  }, [task.id]);

  useEffect(() => {
    if (showDeleteConfirm) {
      const timer = setTimeout(() => {
        setShowDeleteConfirm(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showDeleteConfirm]);

  // Forcer le re-rendu toutes les 30 secondes pour mettre à jour le statut "Échue"
  useEffect(() => {
    // Ne pas activer si pas de date d'échéance ou si terminée
    if (!task.dueDate || task.status === 'DONE') return;

    const interval = setInterval(() => {
      forceUpdate(n => n + 1);
    }, 30000); // 30 secondes

    return () => clearInterval(interval);
  }, [task.dueDate, task.status]);

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

  const handleMarkDone = async (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const updatedTask = {
      ...task,
      status: 'DONE'
    };
    await onUpdate(task.id, updatedTask);
  };

  const handleCloseTimeSpent = (e) => {
    e.stopPropagation();
    const storageKey = `task-${task.id}-hideTimeSpent`;
    localStorage.setItem(storageKey, 'hidden');
    setShowTimeSpent(false);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete(task.id, true);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowDeleteConfirm(false);
  };

  const handleCardClick = () => {
    if (selectionMode && onToggleSelect) {
      onToggleSelect(task.id);
      return;
    }
    const isLocked = task.locked || false;
    if (!isLocked && !isEditing) {
      onStartEditing(task.id);
    }
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    if (onToggleSelect) {
      onToggleSelect(task.id);
    }
  };

  const getTimerIndicator = () => {
    const isDone = task.status === 'DONE';
    const hasTimeSpent = task.timeSpent > 0;
    
    if (isDone && hasTimeSpent) {
      return (
        <span className={`${TASK_TIMER_INDICATOR_BASE} ${TASK_TIMER_DONE}`} title="Temps enregistré">
          <FiCheckCircle size={12} />
          <span className={TASK_TIMER_INDICATOR_TEXT}>{formatTimeSpent(task.timeSpent)}</span>
        </span>
      );
    }
    
    if (!isTimerEnabled) {
      return null;
    }
    
    if (isRunning) {
      return (
        <span className={`${TASK_TIMER_INDICATOR_BASE} ${TASK_TIMER_RUNNING}`} title="Timer en cours">
          <FiClock size={12} />
          <span className={TASK_TIMER_INDICATOR_TEXT}>En cours</span>
        </span>
      );
    }
    
    if (hasTimeSpent && !isDone) {
      return (
        <span className={`${TASK_TIMER_INDICATOR_BASE} ${TASK_TIMER_PAUSED}`} title="Timer en pause">
          <FiPauseCircle size={12} />
          <span className={TASK_TIMER_INDICATOR_TEXT}>{formatTimeSpent(task.timeSpent)}</span>
        </span>
      );
    }
    
    return (
      <span className={`${TASK_TIMER_INDICATOR_BASE} ${TASK_TIMER_READY}`} title="Timer disponible">
        <FiClock size={12} />
      </span>
    );
  };

  // Trouver le projet de la tâche
  const taskProject = task.projectId ? projects.find(p => p.id === task.projectId) : null;

  if (isEditing) {
    return (
      <TaskEditForm
        editedTask={editedTask}
        setEditedTask={setEditedTask}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleDateChange={handleDateChange}
        projects={projects}
      />
    );
  }

  const dateInfo = task.dueDate ? formatDate(task.dueDate) : null;
  const isLocked = task.locked || false;
  const isDone = task.status === 'DONE';
  const progressInfo = calculateProgress(task);

  const cardClasses = `${getTaskCardClasses(isLocked, isDragging, isDragOver, isDone)} ${isSelected ? TASK_CARD_SELECTED : ''}`;

  return (
    <div
      className={cardClasses}
      draggable={!isLocked && !selectionMode}
      onDragStart={(e) => !isLocked && !selectionMode && onDragStart(e, task.id)}
      onDragEnter={(e) => !isLocked && !selectionMode && onDragEnter(e, task.id)}
      onDragEnd={!isLocked && !selectionMode ? onDragEnd : undefined}
      onClick={handleCardClick}
      style={{ cursor: selectionMode ? 'pointer' : (isLocked ? 'default' : 'pointer') }}
    >
      <div className={TASK_HALO} />

      {!isLocked && !selectionMode && (
        <div className={TASK_DRAG_HANDLE}>
          <div className={TASK_DRAG_BAR} />
        </div>
      )}

      {isLocked && (
        <div className={TASK_LOCKED_BADGE}>
          <FaLock className={TASK_LOCKED_ICON} size={12} />
          <span className={TASK_LOCKED_TEXT}>Verrouillée</span>
        </div>
      )}

      <div className={TASK_ACTIONS_CONTAINER}>
        <button
          onClick={handleToggleLock}
          className={`${TASK_ACTION_BUTTON} ${isLocked ? TASK_ACTION_LOCK_LOCKED : TASK_ACTION_LOCK_UNLOCKED}`}
          title={isLocked ? 'Déverrouiller' : 'Verrouiller'}
        >
          {isLocked ? <FaLock size={16} className={TASK_UNLOCK_ICON} /> : <FaLockOpen size={16} />}
        </button>
        
        {!isDone && (
          <button
            onClick={handleMarkDone}
            className={`${TASK_ACTION_BUTTON} ${TASK_ACTION_EDIT}`}
            title="Marquer comme terminé"
          >
            <FiCheck size={16} />
          </button>
        )}
        
        {!showDeleteConfirm ? (
          <button
            onClick={handleDeleteClick}
            className={`${TASK_ACTION_BUTTON} ${TASK_ACTION_DELETE}`}
            title="Supprimer"
          >
            <FaTrash size={16} />
          </button>
        ) : (
          <div className="flex gap-1">
            <button
              onClick={handleConfirmDelete}
              className={`${TASK_ACTION_BUTTON} ${TASK_DELETE_CONFIRM}`}
              title="Confirmer la suppression"
            >
              <FiCheck size={16} />
            </button>
            <button
              onClick={handleCancelDelete}
              className={`${TASK_ACTION_BUTTON} ${TASK_DELETE_CANCEL}`}
              title="Annuler"
            >
              <FiX size={16} />
            </button>
          </div>
        )}
      </div>

      <div className={TASK_CONTENT}>
        <div className={TASK_ITEM_CONTENT_FLEX}>
          <div className={TASK_TITLE_CONTAINER}>
            {selectionMode && (
              <button
                onClick={handleCheckboxClick}
                className={`${TASK_SELECT_BUTTON_BASE} ${isSelected ? TASK_SELECT_BUTTON_CHECKED : TASK_SELECT_BUTTON_UNCHECKED}`}
                title={isSelected ? 'Désélectionner' : 'Sélectionner'}
              >
                {isSelected && <FiCheck size={12} className={TASK_SELECT_CHECK_ICON} />}
              </button>
            )}
            <h3 className={TASK_TITLE}>
              {task.title}
            </h3>
            {getTimerIndicator()}
          </div>

          {task.description && (
            <p className={TASK_DESCRIPTION}>
              {task.description}
            </p>
          )}

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

          {isTimerEnabled && !isDone && (
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
          )}

          {isDone && task.timeSpent > 0 && showTimeSpent && (
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
            {taskProject && (
              <span 
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white shadow-sm"
                style={{ backgroundColor: taskProject.color || '#3B82F6' }}
              >
                <FiFolder size={10} />
                {taskProject.name}
              </span>
            )}
            <TaskTags tags={task.tags} />
          </div>

          <TaskProgressBar progressInfo={progressInfo} dateInfo={dateInfo} />
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
