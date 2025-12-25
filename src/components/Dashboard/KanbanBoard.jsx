// src/components/Dashboard/KanbanBoard.jsx
import { useState } from 'react';
import { 
  FiClock, 
  FiEdit2, 
  FiTrash2, 
  FiPlay, 
  FiCheck, 
  FiRotateCcw,
  FiPlus,
  FiX,
  FiEye,
  FiEyeOff,
  FiMoreVertical,
  FiRefreshCw
} from 'react-icons/fi';
import { FaLock } from 'react-icons/fa';
import { formatDate } from '../../utils/taskUtils';
import { PRIORITY_COLORS } from '../../constants/taskConstants';
import TaskTags from '../Task/TaskTags';
import AddColumnModal from './AddColumnModal';
import { useKanbanConfig } from '../../hooks/useKanbanConfig';
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
  KANBAN_CARD_ACTION_HOVER_DANGER,
  KANBAN_COLUMN_HEADER,
  KANBAN_COLUMN_TITLE,
  KANBAN_COLUMN_COUNT,
  KANBAN_COLUMN_CONTENT,
  KANBAN_COLUMN_EMPTY,
  KANBAN_DROP_ZONE,
  KANBAN_TOOLBAR,
  KANBAN_TOOLBAR_LEFT,
  KANBAN_TOOLBAR_BUTTON,
  KANBAN_TOOLBAR_BUTTON_DEFAULT,
  KANBAN_TOOLBAR_BUTTON_GHOST,
  KANBAN_TOOLBAR_BUTTON_PRIMARY,
  KANBAN_DROPDOWN_MENU,
  KANBAN_DROPDOWN_ITEM,
  KANBAN_DROPDOWN_ITEM_DEFAULT,
  KANBAN_DROPDOWN_ITEM_DANGER,
  KANBAN_BOARD_CONTAINER,
  KANBAN_COLUMN_DYNAMIC,
  KANBAN_COLUMN_DROP_TARGET,
  KANBAN_COLUMN_BORDER_CYAN,
  KANBAN_COLUMN_BORDER_AMBER,
  KANBAN_COLUMN_BORDER_EMERALD,
  KANBAN_COLUMN_BORDER_PURPLE,
  KANBAN_COLUMN_MENU_BUTTON,
  KANBAN_ADD_COLUMN_PLACEHOLDER,
  KANBAN_LOADING_CONTAINER,
  KANBAN_LOADING_INNER,
  KANBAN_LOADING_SPINNER
} from '../../constants/styles';

const COLUMN_BORDER_COLORS = {
  cyan: KANBAN_COLUMN_BORDER_CYAN,
  amber: KANBAN_COLUMN_BORDER_AMBER,
  emerald: KANBAN_COLUMN_BORDER_EMERALD,
  purple: KANBAN_COLUMN_BORDER_PURPLE
};

// ==========================================
// KANBAN CARD COMPONENT
// ==========================================
function KanbanCard({ 
  task, 
  isDragging, 
  onDragStart, 
  onDragEnd,
  onEdit,
  onDelete,
  onTaskUpdate
}) {
  const [showActions, setShowActions] = useState(false);
  const isLocked = task.locked || false;
  const isDone = task.status === 'DONE';
  const isTodo = task.status === 'TODO';
  const isInProgress = task.status === 'IN_PROGRESS';
  const dateInfo = task.dueDate ? formatDate(task.dueDate) : null;

  const cardClasses = [
    KANBAN_CARD,
    isDragging && KANBAN_CARD_DRAGGING,
    isLocked && KANBAN_CARD_LOCKED,
    isDone && KANBAN_CARD_DONE
  ].filter(Boolean).join(' ');

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

      {/* Header avec titre */}
      <div className={KANBAN_CARD_HEADER}>
        <h4 className={KANBAN_CARD_TITLE}>{task.title}</h4>
      </div>

      {/* Description tronquée */}
      {task.description && (
        <p className={KANBAN_CARD_DESCRIPTION}>
          {task.description.length > 60 
            ? `${task.description.substring(0, 60)}...` 
            : task.description}
        </p>
      )}

      {/* Tags */}
      <TaskTags tags={task.tags} compact />

      {/* Metadata et Badge */}
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
    </div>
  );
}

// ==========================================
// KANBAN COLUMN COMPONENT
// ==========================================
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
  onDelete,
  onTaskUpdate,
  onToggleVisibility,
  onRemoveColumn
}) {
  const [showMenu, setShowMenu] = useState(false);
  const isDropTarget = dragOverColumn === column.id && draggedTaskId;

  const columnClasses = [
    KANBAN_COLUMN_DYNAMIC,
    COLUMN_BORDER_COLORS[column.color] || KANBAN_COLUMN_BORDER_CYAN,
    isDropTarget && KANBAN_COLUMN_DROP_TARGET
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={columnClasses}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOverColumn(column.id);
      }}
      onDragLeave={() => onDragOverColumn(null)}
      onDrop={(e) => {
        e.preventDefault();
        onDropOnColumn(column.id, column.type, column.tagValue);
      }}
    >
      {/* Header colonne */}
      <div className={KANBAN_COLUMN_HEADER}>
        <div className="flex items-center gap-2 min-w-0">
          <h3 className={KANBAN_COLUMN_TITLE}>{column.title}</h3>
          <span className={KANBAN_COLUMN_COUNT}>{tasks.length}</span>
        </div>

        {/* Menu actions colonne */}
        {(column.canHide || column.canDelete) && (
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={KANBAN_COLUMN_MENU_BUTTON}
            >
              <FiMoreVertical size={14} />
            </button>

            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)} 
                />
                <div className={KANBAN_DROPDOWN_MENU}>
                  {column.type === 'status' && column.canHide && (
                    <button
                      onClick={() => {
                        onToggleVisibility(column.id);
                        setShowMenu(false);
                      }}
                      className={`${KANBAN_DROPDOWN_ITEM} ${KANBAN_DROPDOWN_ITEM_DEFAULT}`}
                    >
                      <FiEyeOff size={14} />
                      Masquer
                    </button>
                  )}
                  
                  {column.type === 'tag' && column.canDelete && (
                    <button
                      onClick={() => {
                        onRemoveColumn(column.tagValue);
                        setShowMenu(false);
                      }}
                      className={`${KANBAN_DROPDOWN_ITEM} ${KANBAN_DROPDOWN_ITEM_DANGER}`}
                    >
                      <FiX size={14} />
                      Supprimer
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Contenu colonne */}
      <div className={KANBAN_COLUMN_CONTENT}>
        {tasks.length === 0 ? (
          <div className={KANBAN_COLUMN_EMPTY}>
            <p>Aucune tâche</p>
          </div>
        ) : (
          tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              isDragging={draggedTaskId === task.id}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onEdit={onEdit}
              onDelete={onDelete}
              onTaskUpdate={onTaskUpdate}
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

// ==========================================
// KANBAN BOARD (MAIN COMPONENT)
// ==========================================
function KanbanBoard({
  tasks,
  onTaskUpdate,
  onTaskDelete,
  onStartEditing
}) {
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [showHiddenColumnsMenu, setShowHiddenColumnsMenu] = useState(false);

  const {
    visibleColumns,
    hiddenStatusColumns,
    availableTags,
    addTagColumn,
    removeTagColumn,
    toggleStatusColumn,
    resetConfig,
    getTasksForColumn,
    loading
  } = useKanbanConfig(tasks);

  // ==========================================
  // DRAG & DROP HANDLERS
  // ==========================================
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

  const handleDropOnColumn = async (columnId, columnType, tagValue) => {
    if (!draggedTaskId) return;

    const task = tasks.find(t => t.id === draggedTaskId);
    if (!task || task.locked) {
      handleDragEnd();
      return;
    }

    // Si c'est une colonne STATUS → changer le statut
    if (columnType === 'status') {
      if (task.status === columnId) {
        handleDragEnd();
        return;
      }

      const updatedTask = { ...task, status: columnId };
      await onTaskUpdate(task.id, updatedTask);
    }

    // Si c'est une colonne TAG → ajouter le tag
    if (columnType === 'tag' && tagValue) {
      const currentTags = task.tags 
        ? (Array.isArray(task.tags) ? task.tags : task.tags.split(',').map(t => t.trim()).filter(Boolean))
        : [];

      // Ne rien faire si le tag est déjà présent
      if (currentTags.includes(tagValue)) {
        handleDragEnd();
        return;
      }

      const newTags = [...currentTags, tagValue];
      const updatedTask = { 
        ...task, 
        tags: newTags
      };
      await onTaskUpdate(task.id, updatedTask);
    }

    handleDragEnd();
  };

  // ==========================================
  // RENDER
  // ==========================================
  if (loading) {
    return (
      <div className={KANBAN_LOADING_CONTAINER}>
        <div className={KANBAN_LOADING_INNER}>
          <div className={KANBAN_LOADING_SPINNER} />
          <p className="text-sm">Chargement du Kanban...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Toolbar */}
      <div className={KANBAN_TOOLBAR}>
        <div className={KANBAN_TOOLBAR_LEFT}>
          {/* Bouton pour afficher les colonnes masquées */}
          {hiddenStatusColumns.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowHiddenColumnsMenu(!showHiddenColumnsMenu)}
                className={`${KANBAN_TOOLBAR_BUTTON} ${KANBAN_TOOLBAR_BUTTON_DEFAULT}`}
              >
                <FiEye size={14} />
                <span className="hidden xs:inline">Masquées</span>
                <span>({hiddenStatusColumns.length})</span>
              </button>

              {showHiddenColumnsMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowHiddenColumnsMenu(false)} 
                  />
                  <div className={KANBAN_DROPDOWN_MENU}>
                    {hiddenStatusColumns.map(col => (
                      <button
                        key={col.id}
                        onClick={() => {
                          toggleStatusColumn(col.id);
                          setShowHiddenColumnsMenu(false);
                        }}
                        className={`${KANBAN_DROPDOWN_ITEM} ${KANBAN_DROPDOWN_ITEM_DEFAULT}`}
                      >
                        <FiEye size={14} />
                        {col.title}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Bouton reset */}
          <button
            onClick={resetConfig}
            className={`${KANBAN_TOOLBAR_BUTTON} ${KANBAN_TOOLBAR_BUTTON_GHOST}`}
            title="Réinitialiser les colonnes"
          >
            <FiRefreshCw size={14} />
          </button>
        </div>

        {/* Bouton ajouter colonne */}
        <button
          onClick={() => setShowAddColumnModal(true)}
          className={`${KANBAN_TOOLBAR_BUTTON} ${KANBAN_TOOLBAR_BUTTON_PRIMARY}`}
        >
          <FiPlus size={14} />
          <span className="hidden sm:inline">Ajouter colonne</span>
          <span className="sm:hidden">Colonne</span>
        </button>
      </div>

      {/* Colonnes */}
      <div className={KANBAN_BOARD_CONTAINER}>
        {visibleColumns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={getTasksForColumn(column, tasks)}
            draggedTaskId={draggedTaskId}
            dragOverColumn={dragOverColumn}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOverColumn={handleDragOverColumn}
            onDropOnColumn={handleDropOnColumn}
            onEdit={onStartEditing}
            onDelete={onTaskDelete}
            onTaskUpdate={onTaskUpdate}
            onToggleVisibility={toggleStatusColumn}
            onRemoveColumn={removeTagColumn}
          />
        ))}

        {/* Placeholder pour ajouter une colonne */}
        <button
          onClick={() => setShowAddColumnModal(true)}
          className={KANBAN_ADD_COLUMN_PLACEHOLDER}
        >
          <FiPlus size={24} />
          <span className="mt-2 text-xs sm:text-sm font-medium">Ajouter colonne</span>
        </button>
      </div>

      {/* Modal ajout colonne */}
      {showAddColumnModal && (
        <AddColumnModal
          availableTags={availableTags}
          onAddTag={addTagColumn}
          onClose={() => setShowAddColumnModal(false)}
        />
      )}
    </div>
  );
}

export default KanbanBoard;