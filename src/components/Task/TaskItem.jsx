// src/components/Task/TaskItem.jsx
import { useState, useEffect } from 'react';
import { FaTrash, FaLock, FaLockOpen, FaClock } from 'react-icons/fa';
import { FiX, FiCheck, FiClock, FiPauseCircle, FiCheckCircle } from 'react-icons/fi';
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

  // Vérifier si le timer est activé pour cette tâche
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


  const handleCardClick = () => {
    const isLocked = task.locked || false;
    if (!isLocked && !isEditing) {
      onStartEditing(task.id);
    }
  };


  // Fonction pour obtenir l'indicateur de timer à côté du titre
  const getTimerIndicator = () => {
    const isDone = task.status === 'DONE';
    const hasTimeSpent = task.timeSpent > 0;
    
    // Timer stoppé (DONE avec temps enregistré)
    if (isDone && hasTimeSpent) {
      return (
        <span className="inline-flex items-center gap-1 ml-2 px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400" title="Temps enregistré">
          <FiCheckCircle size={12} />
          <span className="text-[10px] font-semibold">{formatTimeSpent(task.timeSpent)}</span>
        </span>
      );
    }
    
    // Timer non activé
    if (!isTimerEnabled) {
      return null;
    }
    
    // Timer en cours
    if (isRunning) {
      return (
        <span className="inline-flex items-center gap-1 ml-2 px-1.5 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400 animate-pulse" title="Timer en cours">
          <FiClock size={12} />
          <span className="text-[10px] font-semibold">En cours</span>
        </span>
      );
    }
    
    // Timer en pause (a du temps mais pas running et pas DONE)
    if (hasTimeSpent && !isDone) {
      return (
        <span className="inline-flex items-center gap-1 ml-2 px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400" title="Timer en pause">
          <FiPauseCircle size={12} />
          <span className="text-[10px] font-semibold">{formatTimeSpent(task.timeSpent)}</span>
        </span>
      );
    }
    
    // Timer présent mais pas démarré
    return (
      <span className="inline-flex items-center ml-2 px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400" title="Timer disponible">
        <FiClock size={12} />
      </span>
    );
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
  const isDone = task.status === 'DONE';
  const progressInfo = calculateProgress(task);


  return (
    <div
      className={getTaskCardClasses(isLocked, isDragging, isDragOver, isDone)}
      draggable={!isLocked}
      onDragStart={(e) => !isLocked && onDragStart(e, task.id)}
      onDragEnter={(e) => !isLocked && onDragEnter(e, task.id)}
      onDragEnd={!isLocked ? onDragEnd : undefined}
      onClick={handleCardClick}
      style={{ cursor: isLocked ? 'default' : 'pointer' }}
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
        
        {/* Bouton Valider - seulement si pas terminé */}
        {!isDone && (
          <button
            onClick={handleMarkDone}
            className={`${TASK_ACTION_BUTTON} ${TASK_ACTION_EDIT}`}
            title="Marquer comme terminé"
          >
            <FiCheck size={16} />
          </button>
        )}
        
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
          {/* Titre avec indicateur de timer */}
          <div className="flex items-center flex-wrap">
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


          {/* Timer - affiché seulement si timerEnabled et pas DONE */}
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


          {/* Temps passé pour tâches terminées - affiché seulement si timeSpent > 0 */}
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
          </div>


          <TaskProgressBar progressInfo={progressInfo} dateInfo={dateInfo} />
        </div>
      </div>
    </div>
  );
}


export default TaskItem;