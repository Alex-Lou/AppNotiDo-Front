// src/components/Dashboard/KanbanBoard.jsx
import { useState } from 'react';
import { FiClock, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FaLock } from 'react-icons/fa';
import { formatDate } from '../../utils/taskUtils';
import { PRIORITY_COLORS } from '../../constants/taskConstants';
import TaskTags from '../Task/TaskTags';
import {
  KANBAN_CONTAINER,
  KANBAN_COLUMN,
  KANBAN_COLUMN_HEADER,
  KANBAN_COLUMN_TITLE,
  KANBAN_COLUMN_COUNT,
  KANBAN_COLUMN_CONTENT,
  KANBAN_COLUMN_EMPTY,
  KANBAN_CARD,
  KANBAN_CARD_DRAGGING,
  KANBAN_CARD_DRAG_OVER,
  KANBAN_CARD_LOCKED,
  KANBAN_CARD_DONE,
  KANBAN_CARD_HEADER,
  KANBAN_CARD_TITLE,
  KANBAN_CARD_DESCRIPTION,
  KANBAN_CARD_METADATA,
  KANBAN_CARD_DATE,
  KANBAN_CARD_BADGES,
  KANBAN_CARD_BADGE,
  KANBAN_CARD_ACTIONS,
  KANBAN_CARD_ACTION_BUTTON,
  KANBAN_CARD_LOCKED_INDICATOR,
  KANBAN_DROP_ZONE,
  KANBAN_DROP_ZONE_ACTIVE
} from '../../constants/styles';

const COLUMNS = [
  { id: 'TODO', title: '📝 À faire', color: 'cyan' },
  { id: 'IN_PROGRESS', title: '⏳ En cours', color: 'amber' },
  { id: 'DONE', title: '✅ Terminé', color: 'emerald' }
];

function KanbanCard({ 
  task, 
  isDragging, 
  isDragOver, 
  onDragStart, 
  onDragEnd,
  onEdit,
  onDelete 
}) {
  const [showActions, setShowActions] = useState(false);
  const isLocked = task.locked || false;
  const isDone = task.status === 'DONE';
  const dateInfo = task.dueDate ? formatDate(task.dueDate) : null;

  const cardClasses = [
    KANBAN_CARD,
    isDragging && KANBAN_CARD_DRAGGING,
    isDragOver && KANBAN_CARD_DRAG_OVER,
    isLocked && KANBAN_CARD_LOCKED,
    isDone && KANBAN_CARD_DONE
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      draggable={!isLocked}
      onDragStart={(e) => !isLocked && onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onTouchStart={() => setShowActions(true)}
      onTouchEnd={() => setTimeout(() => setShowActions(false), 2000)}
    >
      {/* Indicateur verrouillé */}
      {isLocked && (
        <div className={KANBAN_CARD_LOCKED_INDICATOR}>
          <FaLock size={10} />
        </div>
      )}

      {/* Actions au hover */}
      {showActions && !isLocked && (
        <div className={KANBAN_CARD_ACTIONS}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task.id);
            }}
            className={KANBAN_CARD_ACTION_BUTTON}
            title="Modifier"
          >
            <FiEdit2 size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className={`${KANBAN_CARD_ACTION_BUTTON} hover:text-red-500 dark:hover:text-red-400`}
            title="Supprimer"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      )}

      {/* Header avec titre */}
      <div className={KANBAN_CARD_HEADER}>
        <h4 className={KANBAN_CARD_TITLE}>{task.title}</h4>
      </div>

      {/* Description tronquée - cachée sur mobile */}
      {task.description && (
        <p className={KANBAN_CARD_DESCRIPTION}>
          {task.description.length > 60 
            ? `${task.description.substring(0, 60)}...` 
            : task.description}
        </p>
      )}

      {/* Tags - version compacte */}
      <TaskTags tags={task.tags} compact />

      {/* Metadata */}
      <div className={KANBAN_CARD_METADATA}>
        {dateInfo && (
          <span className={`${KANBAN_CARD_DATE} ${dateInfo.color}`}>
            <FiClock size={10} className="sm:w-3 sm:h-3" />
            <span className="truncate max-w-[80px] sm:max-w-none">{dateInfo.text}</span>
          </span>
        )}
      </div>

      {/* Badges priorité */}
      <div className={KANBAN_CARD_BADGES}>
        <span className={`${KANBAN_CARD_BADGE} ${PRIORITY_COLORS[task.priority]}`}>
          {task.priority === 'HIGH' && '🔴'}
          {task.priority === 'MEDIUM' && '🟡'}
          {task.priority === 'LOW' && '🟢'}
        </span>
      </div>
    </div>
  );
}

function KanbanColumn({ 
  column, 
  tasks, 
  draggedTaskId,
  dragOverColumn,
  onDragStart,
  onDragEnd,
  onDragOverColumn,
  onDropOnColumn,
  onEdit,
  onDelete
}) {
  const isDropTarget = dragOverColumn === column.id && draggedTaskId;
  const columnTasks = tasks.filter(task => task.status === column.id);

  return (
    <div 
      className={`${KANBAN_COLUMN} kanban-column`}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOverColumn(column.id);
      }}
      onDragLeave={() => onDragOverColumn(null)}
      onDrop={(e) => {
        e.preventDefault();
        onDropOnColumn(column.id);
      }}
    >
      {/* Header colonne */}
      <div className={KANBAN_COLUMN_HEADER}>
        <h3 className={KANBAN_COLUMN_TITLE}>{column.title}</h3>
        <span className={KANBAN_COLUMN_COUNT}>{columnTasks.length}</span>
      </div>

      {/* Contenu colonne */}
      <div className={`${KANBAN_COLUMN_CONTENT} kanban-column-content ${isDropTarget ? KANBAN_DROP_ZONE_ACTIVE : ''}`}>
        {columnTasks.length === 0 ? (
          <div className={KANBAN_COLUMN_EMPTY}>
            <p>Aucune tâche</p>
          </div>
        ) : (
          columnTasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              isDragging={draggedTaskId === task.id}
              isDragOver={false}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}

        {/* Zone de drop visible */}
        {isDropTarget && (
          <div className={KANBAN_DROP_ZONE}>
            Déposer ici
          </div>
        )}
      </div>
    </div>
  );
}

function KanbanBoard({
  tasks,
  onTaskUpdate,
  onTaskDelete,
  onStartEditing
}) {
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  const handleDragOverColumn = (columnId) => {
    if (draggedTaskId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDropOnColumn = async (newStatus) => {
    if (!draggedTaskId) return;

    const task = tasks.find(t => t.id === draggedTaskId);
    if (!task || task.locked) {
      handleDragEnd();
      return;
    }

    // Ne rien faire si même colonne
    if (task.status === newStatus) {
      handleDragEnd();
      return;
    }

    // Update le statut de la tâche
    const updatedTask = {
      ...task,
      status: newStatus
    };

    await onTaskUpdate(task.id, updatedTask);
    handleDragEnd();
  };

  return (
    <div className={`${KANBAN_CONTAINER} kanban-container`}>
      {COLUMNS.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          tasks={tasks}
          draggedTaskId={draggedTaskId}
          dragOverColumn={dragOverColumn}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOverColumn={handleDragOverColumn}
          onDropOnColumn={handleDropOnColumn}
          onEdit={onStartEditing}
          onDelete={onTaskDelete}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;