// src/components/Kanban/KanbanColumn.jsx
import { useState } from 'react';
import { 
  FiX,
  FiEyeOff,
  FiMoreVertical
} from 'react-icons/fi';
import KanbanCard from './KanbanCard';
import {
  KANBAN_COLUMN_HEADER,
  KANBAN_COLUMN_TITLE,
  KANBAN_COLUMN_COUNT,
  KANBAN_COLUMN_CONTENT,
  KANBAN_COLUMN_EMPTY,
  KANBAN_DROP_ZONE,
  KANBAN_DROPDOWN_MENU,
  KANBAN_DROPDOWN_ITEM,
  KANBAN_DROPDOWN_ITEM_DEFAULT,
  KANBAN_DROPDOWN_ITEM_DANGER,
  KANBAN_COLUMN_DYNAMIC,
  KANBAN_COLUMN_DROP_TARGET,
  KANBAN_COLUMN_BORDER_CYAN,
  KANBAN_COLUMN_BORDER_AMBER,
  KANBAN_COLUMN_BORDER_EMERALD,
  KANBAN_COLUMN_BORDER_PURPLE,
  KANBAN_COLUMN_MENU_BUTTON
} from '../../constants/styles';


const COLUMN_BORDER_COLORS = {
  cyan: KANBAN_COLUMN_BORDER_CYAN,
  amber: KANBAN_COLUMN_BORDER_AMBER,
  emerald: KANBAN_COLUMN_BORDER_EMERALD,
  purple: KANBAN_COLUMN_BORDER_PURPLE
};


function KanbanColumn({ 
  column, 
  tasks,
  draggedTaskId,
  dragOverColumn,
  highlightedTaskId,
  activeTagColumns,
  onDragStart,
  onDragEnd,
  onDragOverColumn,
  onDropOnColumn,
  onEdit,
  onDelete,
  onTaskUpdate,
  onToggleVisibility,
  onRemoveColumn,
  onNavigateToColumn
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
      id={`kanban-column-${column.id}`}
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
      <div className={KANBAN_COLUMN_HEADER}>
        <div className="flex items-center gap-2 min-w-0">
          <h3 className={KANBAN_COLUMN_TITLE}>{column.title}</h3>
          <span className={KANBAN_COLUMN_COUNT}>{tasks.length}</span>
        </div>


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


      <div className={KANBAN_COLUMN_CONTENT}>
        {tasks.length === 0 ? (
          <div className={KANBAN_COLUMN_EMPTY}>
            <p>Aucune tâche</p>
          </div>
        ) : (
          tasks.map((task) => (
            <KanbanCard
              key={`${column.id}-${task.id}`}
              task={task}
              columnType={column.type}
              columnId={column.id}
              activeTagColumns={activeTagColumns}
              isDragging={draggedTaskId === task.id}
              isHighlighted={highlightedTaskId === task.id}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onEdit={onEdit}
              onDelete={onDelete}
              onTaskUpdate={onTaskUpdate}
              onNavigateToColumn={onNavigateToColumn}
            />
          ))
        )}


        {isDropTarget && (
          <div className={KANBAN_DROP_ZONE}>
            Déposer ici
          </div>
        )}
      </div>
    </div>
  );
}


export default KanbanColumn;
