// src/components/Dashboard/GridView.jsx
import { useMemo, useState } from 'react';
import { FiClock, FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
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

// Ordre de tri des priorités
const PRIORITY_ORDER = { HIGH: 0, MEDIUM: 1, LOW: 2 };

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
  onMarkDone
}) {
  const [showActions, setShowActions] = useState(false);
  const isLocked = task.locked || false;
  const isDone = task.status === 'DONE';
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
    isDone && GRID_CARD_DONE
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

  const handleDone = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onMarkDone && !isLocked && !isDone) {
      onMarkDone(task.id);
    }
  };

  return (
    <div 
      className={cardClasses}
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
          {!isDone && (
            <button
              onClick={handleDone}
              className={`${GRID_CARD_ACTION_BUTTON} hover:text-emerald-500 dark:hover:text-emerald-400`}
              title="Marquer comme fait"
              type="button"
            >
              <FiCheck size={14} />
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
  onTaskUpdate,
  onTaskDelete,
  onStartEditing
}) {
  // Trier les tâches par priorité puis par date
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      // D'abord par priorité
      const priorityDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Ensuite par date d'échéance (les plus proches en premier)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      
      return 0;
    });
  }, [tasks]);

  // Marquer une tâche comme faite
  const handleMarkDone = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.locked) return;

    const updatedTask = {
      ...task,
      status: 'DONE'
    };

    await onTaskUpdate(taskId, updatedTask);
  };

  if (sortedTasks.length === 0) {
    return (
      <div className={GRID_EMPTY}>
        <p>Aucune tâche à afficher</p>
      </div>
    );
  }

  return (
    <div className={GRID_CONTAINER}>
      {sortedTasks.map((task) => (
        <GridCard
          key={task.id}
          task={task}
          onEdit={onStartEditing}
          onDelete={onTaskDelete}
          onMarkDone={handleMarkDone}
        />
      ))}
    </div>
  );
}

export default GridView;