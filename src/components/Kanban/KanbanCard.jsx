// src/components/Kanban/KanbanCard.jsx
import { useState } from 'react';
import { 
  FiClock, 
  FiEdit2, 
  FiTrash2, 
  FiPlay, 
  FiCheck, 
  FiRotateCcw,
  FiArrowRight,
  FiArrowLeft,
  FiTag
} from 'react-icons/fi';
import { FaLock } from 'react-icons/fa';
import { formatDate } from '../../utils/taskUtils';
import { PRIORITY_COLORS } from '../../constants/taskConstants';
import TaskTags from '../Task/TaskTags';
import {
  KANBAN_CARD,
  KANBAN_CARD_DRAGGING,
  KANBAN_CARD_LOCKED,
  KANBAN_CARD_DONE,
  KANBAN_CARD_HEADER,
  KANBAN_CARD_TITLE,
  KANBAN_CARD_DESCRIPTION,
  KANBAN_CARD_METADATA,
  KANBAN_CARD_DATE,
  KANBAN_CARD_BADGES,
  KANBAN_CARD_BADGE,
  KANBAN_CARD_ACTION_BUTTON,
  KANBAN_CARD_LOCKED_INDICATOR,
  KANBAN_CARD_ACTIONS_CONTAINER,
  KANBAN_CARD_ACTION_HOVER_DEFAULT,
  KANBAN_CARD_ACTION_HOVER_SUCCESS,
  KANBAN_CARD_ACTION_HOVER_WARNING,
  KANBAN_CARD_ACTION_HOVER_DANGER
} from '../../constants/styles';

const STATUS_LABELS = {
  TODO: { icon: '📋', label: 'À faire' },
  IN_PROGRESS: { icon: '🔄', label: 'En cours' },
  DONE: { icon: '✅', label: 'Terminé' }
};

function KanbanCard({ 
  task, 
  isDragging,
  isHighlighted,
  columnType,
  columnId,
  activeTagColumns,
  onDragStart, 
  onDragEnd,
  onEdit,
  onDelete,
  onTaskUpdate,
  onNavigateToColumn
}) {
  const [showActions, setShowActions] = useState(false);
  const [showTagMenu, setShowTagMenu] = useState(false);
  
  const isLocked = task.locked || false;
  const isDone = task.status === 'DONE';
  const isTodo = task.status === 'TODO';
  const isInProgress = task.status === 'IN_PROGRESS';
  const dateInfo = task.dueDate ? formatDate(task.dueDate) : null;

  const taskTags = task.tags 
    ? (Array.isArray(task.tags) ? task.tags : task.tags.split(',').map(t => t.trim()).filter(Boolean))
    : [];
  
  const matchingTagColumns = activeTagColumns?.filter(tag => taskTags.includes(tag)) || [];

  const showStatusNavigator = columnType === 'tag' && onNavigateToColumn;
  const showTagNavigator = columnType === 'status' && matchingTagColumns.length > 0 && onNavigateToColumn;

  const cardClasses = [
    KANBAN_CARD,
    isDragging && KANBAN_CARD_DRAGGING,
    isLocked && KANBAN_CARD_LOCKED,
    isDone && KANBAN_CARD_DONE,
    isHighlighted && 'ring-2 ring-cyan-500 dark:ring-amber-500 bg-cyan-50/50 dark:bg-amber-900/30 animate-pulse'
  ].filter(Boolean).join(' ');

  const handleCardClick = () => {
    if (!isLocked && onEdit) {
      onEdit(task.id);
    }
  };

  const handleStartTask = async (e) => {
    e.stopPropagation();
    const updatedTask = { ...task, status: 'IN_PROGRESS' };
    await onTaskUpdate(task.id, updatedTask);
  };

  const handleCompleteTask = async (e) => {
    e.stopPropagation();
    const updatedTask = { ...task, status: 'DONE' };
    await onTaskUpdate(task.id, updatedTask);
  };

  const handleReopenTask = async (e) => {
    e.stopPropagation();
    const updatedTask = { ...task, status: 'IN_PROGRESS' };
    await onTaskUpdate(task.id, updatedTask);
  };

  const handleNavigateToStatus = (e) => {
    e.stopPropagation();
    if (onNavigateToColumn) {
      onNavigateToColumn(task.status, task.id, 'status');
    }
  };

  const handleNavigateToTag = (e, tag) => {
    e.stopPropagation();
    setShowTagMenu(false);
    if (onNavigateToColumn) {
      onNavigateToColumn(`tag_${tag}`, task.id, 'tag');
    }
  };

  const handleTagIndicatorClick = (e) => {
    e.stopPropagation();
    if (matchingTagColumns.length === 1) {
      handleNavigateToTag(e, matchingTagColumns[0]);
    } else {
      setShowTagMenu(!showTagMenu);
    }
  };

  return (
    <div
      id={`kanban-card-${columnId}-${task.id}`}
      className={cardClasses}
      draggable={!isLocked}
      onDragStart={(e) => !isLocked && onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      onClick={handleCardClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setShowTagMenu(false);
      }}
      onTouchStart={() => setShowActions(true)}
      onTouchEnd={() => setTimeout(() => setShowActions(false), 2000)}
      style={{ cursor: isLocked ? 'default' : 'pointer' }}
    >
      {isLocked && (
        <div className={KANBAN_CARD_LOCKED_INDICATOR}>
          <FaLock size={10} />
        </div>
      )}

      {showActions && !isLocked && (
        <div className={KANBAN_CARD_ACTIONS_CONTAINER}>
          {isTodo && (
            <button
              onClick={handleStartTask}
              className={`${KANBAN_CARD_ACTION_BUTTON} ${KANBAN_CARD_ACTION_HOVER_SUCCESS}`}
              title="Démarrer la tâche"
            >
              <FiPlay size={12} />
            </button>
          )}

          {isInProgress && (
            <button
              onClick={handleCompleteTask}
              className={`${KANBAN_CARD_ACTION_BUTTON} ${KANBAN_CARD_ACTION_HOVER_SUCCESS}`}
              title="Marquer comme terminé"
            >
              <FiCheck size={12} />
            </button>
          )}

          {isDone && (
            <button
              onClick={handleReopenTask}
              className={`${KANBAN_CARD_ACTION_BUTTON} ${KANBAN_CARD_ACTION_HOVER_WARNING}`}
              title="Rouvrir la tâche"
            >
              <FiRotateCcw size={12} />
            </button>
          )}
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task.id);
            }}
            className={`${KANBAN_CARD_ACTION_BUTTON} ${KANBAN_CARD_ACTION_HOVER_DEFAULT}`}
            title="Modifier"
          >
            <FiEdit2 size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className={`${KANBAN_CARD_ACTION_BUTTON} ${KANBAN_CARD_ACTION_HOVER_DANGER}`}
            title="Supprimer"
          >
            <FiTrash2 size={12} />
          </button>
        </div>
      )}

      <div className={KANBAN_CARD_HEADER}>
        <h4 className={KANBAN_CARD_TITLE}>{task.title}</h4>
      </div>

      {task.description && (
        <p className={KANBAN_CARD_DESCRIPTION}>
          {task.description.length > 60 
            ? `${task.description.substring(0, 60)}...` 
            : task.description}
        </p>
      )}

      <TaskTags tags={task.tags} compact />

      <div className={KANBAN_CARD_METADATA}>
        {dateInfo && (
          <span className={`${KANBAN_CARD_DATE} ${dateInfo.color}`}>
            <FiClock size={10} />
            <span className="truncate max-w-[80px] sm:max-w-none">{dateInfo.text}</span>
          </span>
        )}
      </div>

      <div className={KANBAN_CARD_BADGES}>
        <span className={`${KANBAN_CARD_BADGE} ${PRIORITY_COLORS[task.priority]}`}>
          {task.priority === 'HIGH' && '🔴'}
          {task.priority === 'MEDIUM' && '🟡'}
          {task.priority === 'LOW' && '🟢'}
        </span>
      </div>

      {showStatusNavigator && (
        <button
          onClick={handleNavigateToStatus}
          className="
            absolute bottom-1.5 right-1.5
            flex items-center gap-1
            px-1.5 py-0.5
            rounded-md
            bg-slate-100 dark:bg-stone-800
            text-slate-500 dark:text-stone-400
            hover:bg-cyan-100 dark:hover:bg-amber-900/50
            hover:text-cyan-600 dark:hover:text-amber-400
            transition-all duration-200
            text-[9px] sm:text-[10px]
            cursor-pointer
            group
          "
          title={`Voir dans "${STATUS_LABELS[task.status]?.label}"`}
        >
          <span>{STATUS_LABELS[task.status]?.icon}</span>
          <FiArrowRight 
            size={10} 
            className="group-hover:translate-x-0.5 transition-transform" 
          />
        </button>
      )}

      {showTagNavigator && (
        <div className="absolute bottom-1.5 right-1.5">
          <button
            onClick={handleTagIndicatorClick}
            className="
              flex items-center gap-1
              px-1.5 py-0.5
              rounded-md
              bg-purple-100 dark:bg-purple-900/40
              text-purple-600 dark:text-purple-400
              hover:bg-purple-200 dark:hover:bg-purple-900/60
              hover:text-purple-700 dark:hover:text-purple-300
              transition-all duration-200
              text-[9px] sm:text-[10px]
              cursor-pointer
              group
            "
            title={matchingTagColumns.length === 1 
              ? `Voir dans "${matchingTagColumns[0]}"` 
              : `Voir dans ${matchingTagColumns.length} colonnes tag`
            }
          >
            <FiTag size={10} />
            {matchingTagColumns.length > 1 && (
              <span className="font-bold">{matchingTagColumns.length}</span>
            )}
            <FiArrowLeft 
              size={10} 
              className="group-hover:-translate-x-0.5 transition-transform" 
            />
          </button>

          {showTagMenu && matchingTagColumns.length > 1 && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTagMenu(false);
                }} 
              />
              <div className="
                absolute bottom-full right-0 mb-1 z-20
                bg-white dark:bg-stone-800
                rounded-lg shadow-xl
                border border-slate-200 dark:border-stone-700
                py-1
                min-w-[120px]
              ">
                {matchingTagColumns.map(tag => (
                  <button
                    key={tag}
                    onClick={(e) => handleNavigateToTag(e, tag)}
                    className="
                      w-full flex items-center gap-2
                      px-3 py-1.5
                      text-[11px] sm:text-xs
                      text-slate-600 dark:text-stone-300
                      hover:bg-purple-50 dark:hover:bg-purple-900/30
                      hover:text-purple-600 dark:hover:text-purple-400
                      transition-colors
                    "
                  >
                    <FiTag size={12} />
                    <span className="truncate">{tag}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default KanbanCard;