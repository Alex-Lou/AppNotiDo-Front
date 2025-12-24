// src/components/Dashboard/GridView.jsx
import { useState } from 'react';
import { FiClock, FiEdit2, FiTrash2, FiCheck, FiPlay, FiRotateCcw } from 'react-icons/fi';
import { FaLock } from 'react-icons/fa';
import { formatDate } from '../../utils/taskUtils';
import TaskTags from '../Task/TaskTags';
import {
  GRID_CONTAINER,
  GRID_CARD,
  GRID_CARD_LOCKED,
  GRID_CARD_DONE,
  GRID_CARD_PRIORITY_HIGH,
  GRID_CARD_PRIORITY_MEDIUM,
  GRID_CARD_PRIORITY_LOW,
  GRID_CARD_HEADER,
  GRID_CARD_TITLE,
  GRID_CARD_DESCRIPTION,
  GRID_CARD_METADATA,
  GRID_CARD_DATE,
  GRID_CARD_FOOTER,
  GRID_CARD_STATUS_BADGE,
  GRID_CARD_ACTIONS,
  GRID_CARD_ACTION_BUTTON,
  GRID_CARD_LOCKED_INDICATOR,
  GRID_EMPTY
} from '../../constants/styles';


// Labels sans emoji (on les ajoute manuellement)
const STATUS_TEXT = {
  TODO: 'À faire',
  IN_PROGRESS: 'En cours',
  DONE: 'Terminé'
};


const STATUS_EMOJI = {
  TODO: '📝',
  IN_PROGRESS: '⏳',
  DONE: '✅'
};


function GridCard({ 
  task, 
  onEdit,
  onDelete,
  onTaskUpdate,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isDragging,
  isDragOver
}) {
  const [showActions, setShowActions] = useState(false);
  const isLocked = task.locked || false;
  const isDone = task.status === 'DONE';
  const isTodo = task.status === 'TODO';
  const isInProgress = task.status === 'IN_PROGRESS';
  const dateInfo = task.dueDate ? formatDate(task.dueDate) : null;


  const priorityClass = {
    HIGH: GRID_CARD_PRIORITY_HIGH,
    MEDIUM: GRID_CARD_PRIORITY_MEDIUM,
    LOW: GRID_CARD_PRIORITY_LOW
  }[task.priority] || '';


  const cardClasses = [
    GRID_CARD,
    priorityClass,
    isLocked && GRID_CARD_LOCKED,
    isDone && GRID_CARD_DONE,
    isDragging && 'opacity-50 scale-95 transition-all duration-200',
    isDragOver && 'ring-2 ring-cyan-400 dark:ring-amber-500 scale-105 transition-all duration-200'
  ].filter(Boolean).join(' ');


  const handleEdit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onEdit) {
      onEdit(task.id);
    }
  };


  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onDelete) {
      onDelete(task.id);
    }
  };


  const handleStartTask = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const updatedTask = {
      ...task,
      status: 'IN_PROGRESS'
    };
    await onTaskUpdate(task.id, updatedTask);
  };


  const handleCompleteTask = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const updatedTask = {
      ...task,
      status: 'DONE'
    };
    await onTaskUpdate(task.id, updatedTask);
  };


  const handleReopenTask = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const updatedTask = {
      ...task,
      status: 'IN_PROGRESS'
    };
    await onTaskUpdate(task.id, updatedTask);
  };


  return (
    <div 
      className={cardClasses}
      draggable={!isLocked}
      onDragStart={(e) => !isLocked && onDragStart && onDragStart(e, task.id)}
      onDragEnter={(e) => !isLocked && onDragEnter && onDragEnter(e, task.id)}
      onDragEnd={!isLocked && onDragEnd ? onDragEnd : undefined}
      onDragOver={(e) => !isLocked && e.preventDefault()}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onTouchStart={() => setShowActions(true)}
      onTouchEnd={() => setTimeout(() => setShowActions(false), 3000)}
    >
      {/* Indicateur verrouillé */}
      {isLocked && (
        <div className={GRID_CARD_LOCKED_INDICATOR}>
          <FaLock size={10} />
        </div>
      )}


      {/* Actions au hover */}
      {showActions && !isLocked && (
        <div className={GRID_CARD_ACTIONS}>
          {/* Bouton Play - seulement pour "À faire" */}
          {isTodo && (
            <button
              onClick={handleStartTask}
              className={`${GRID_CARD_ACTION_BUTTON} hover:text-emerald-500 dark:hover:text-emerald-400`}
              title="Démarrer la tâche"
              type="button"
            >
              <FiPlay size={14} />
            </button>
          )}

          {/* Bouton Check - seulement pour "En cours" */}
          {isInProgress && (
            <button
              onClick={handleCompleteTask}
              className={`${GRID_CARD_ACTION_BUTTON} hover:text-emerald-500 dark:hover:text-emerald-400`}
              title="Marquer comme terminé"
              type="button"
            >
              <FiCheck size={14} />
            </button>
          )}

          {/* Bouton Rouvrir - seulement pour "Terminé" */}
          {isDone && (
            <button
              onClick={handleReopenTask}
              className={`${GRID_CARD_ACTION_BUTTON} hover:text-amber-500 dark:hover:text-amber-400`}
              title="Rouvrir la tâche"
              type="button"
            >
              <FiRotateCcw size={14} />
            </button>
          )}

          <button
            onClick={handleEdit}
            className={GRID_CARD_ACTION_BUTTON}
            title="Modifier"
            type="button"
          >
            <FiEdit2 size={14} />
          </button>
          <button
            onClick={handleDelete}
            className={`${GRID_CARD_ACTION_BUTTON} hover:text-red-500 dark:hover:text-red-400`}
            title="Supprimer"
            type="button"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      )}


      {/* Header avec titre */}
      <div className={GRID_CARD_HEADER}>
        <h4 className={GRID_CARD_TITLE}>{task.title}</h4>
      </div>


      {/* Description tronquée */}
      {task.description && (
        <p className={GRID_CARD_DESCRIPTION}>
          {task.description.length > 50 
            ? `${task.description.substring(0, 50)}...` 
            : task.description}
        </p>
      )}


      {/* Tags */}
      <TaskTags tags={task.tags} compact />


      {/* Metadata - Date */}
      {dateInfo && (
        <div className={GRID_CARD_METADATA}>
          <span className={`${GRID_CARD_DATE} ${dateInfo.color}`}>
            <FiClock size={10} />
            <span>{dateInfo.text}</span>
          </span>
        </div>
      )}


      {/* Footer - Status badge */}
      <div className={GRID_CARD_FOOTER}>
        <span className={GRID_CARD_STATUS_BADGE}>
          {STATUS_EMOJI[task.status]} {STATUS_TEXT[task.status]}
        </span>
        <span className="text-xs">
          {task.priority === 'HIGH' && '🔴'}
          {task.priority === 'MEDIUM' && '🟡'}
          {task.priority === 'LOW' && '🟢'}
        </span>
      </div>
    </div>
  );
}


function GridView({
  tasks,
  filteredTasks,
  onTaskUpdate,
  onTaskDelete,
  onStartEditing,
  draggedTaskId,
  dragOverTaskId,
  onDragStart,
  onDragEnter,
  onDragEnd,
  setTasks
}) {
  if (filteredTasks.length === 0) {
    return (
      <div className={GRID_EMPTY}>
        <p>Aucune tâche à afficher</p>
      </div>
    );
  }


  return (
    <div className={GRID_CONTAINER} onDragOver={(e) => e.preventDefault()}>
      {filteredTasks.map((task) => (
        <GridCard
          key={task.id}
          task={task}
          onEdit={onStartEditing}
          onDelete={onTaskDelete}
          onTaskUpdate={onTaskUpdate}
          onDragStart={onDragStart}
          onDragEnter={(e, targetTaskId) => onDragEnter && onDragEnter(e, targetTaskId, filteredTasks)}
          onDragEnd={() => onDragEnd && onDragEnd(filteredTasks)}
          isDragging={draggedTaskId === task.id}
          isDragOver={dragOverTaskId === task.id}
        />
      ))}
    </div>
  );
}


export default GridView;
