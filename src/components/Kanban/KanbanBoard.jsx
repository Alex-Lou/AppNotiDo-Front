// src/components/Kanban/KanbanBoard.jsx
import { useState, useRef, useCallback, useMemo } from 'react';
import { useKanbanConfig } from '../../hooks/useKanbanConfig';
import KanbanToolbar from './KanbanToolbar';
import KanbanColumn from './KanbanColumn';
import AddColumnModal from './AddColumnModal';
import {
  KANBAN_BOARD_CONTAINER,
  KANBAN_LOADING_CONTAINER,
  KANBAN_LOADING_INNER,
  KANBAN_LOADING_SPINNER
} from '../../constants/styles';

function KanbanBoard({
  tasks,
  onTaskUpdate,
  onTaskDelete,
  onStartEditing,
  showAddColumnModal = false,
  onCloseAddColumnModal
}) {
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [highlightedTaskId, setHighlightedTaskId] = useState(null);
  
  const boardContainerRef = useRef(null);

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

  // Liste des tags qui ont des colonnes actives
  const activeTagColumns = useMemo(() => {
    return visibleColumns
      .filter(col => col.type === 'tag')
      .map(col => col.tagValue);
  }, [visibleColumns]);

  // ==========================================
  // NAVIGATION VERS COLONNE (STATUS OU TAG)
  // ==========================================
  const handleNavigateToColumn = useCallback((targetColumnId, taskId, columnType) => {
    // Trouver la colonne cible
    const columnElement = document.getElementById(`kanban-column-${targetColumnId}`);
    
    if (columnElement && boardContainerRef.current) {
      // Scroll horizontal vers la colonne
      const containerRect = boardContainerRef.current.getBoundingClientRect();
      const columnRect = columnElement.getBoundingClientRect();
      
      // Calculer le scroll nécessaire pour centrer la colonne
      const scrollLeft = columnElement.offsetLeft - containerRect.width / 2 + columnRect.width / 2;
      
      boardContainerRef.current.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth'
      });

      // Activer la surbrillance
      setHighlightedTaskId(taskId);

      // Scroll vertical vers la carte dans la colonne cible (après le scroll horizontal)
      setTimeout(() => {
        // Chercher la carte avec l'ID unique (columnId-taskId)
        const targetCardId = `kanban-card-${targetColumnId}-${taskId}`;
        const targetCard = document.getElementById(targetCardId);
        
        if (targetCard) {
          targetCard.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 300);

      // Désactiver la surbrillance après 2.5 secondes
      setTimeout(() => {
        setHighlightedTaskId(null);
      }, 2500);
    }
  }, []);

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

      const newTags = [...currentTags, tagValue].join(',');
      const updatedTask = { 
        ...task, 
        tags: newTags
      };
      await onTaskUpdate(task.id, updatedTask);
    }

    handleDragEnd();
  };

  // Handler pour ajouter une colonne tag
  const handleAddTagColumn = (tag) => {
    addTagColumn(tag);
    if (onCloseAddColumnModal) {
      onCloseAddColumnModal();
    }
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
      {/* Toolbar - visible seulement si colonnes masquées */}
      <KanbanToolbar
        hiddenStatusColumns={hiddenStatusColumns}
        onToggleStatusColumn={toggleStatusColumn}
      />

      {/* Colonnes */}
      <div ref={boardContainerRef} className={KANBAN_BOARD_CONTAINER}>
        {visibleColumns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={getTasksForColumn(column, tasks)}
            draggedTaskId={draggedTaskId}
            dragOverColumn={dragOverColumn}
            highlightedTaskId={highlightedTaskId}
            activeTagColumns={activeTagColumns}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOverColumn={handleDragOverColumn}
            onDropOnColumn={handleDropOnColumn}
            onEdit={onStartEditing}
            onDelete={onTaskDelete}
            onTaskUpdate={onTaskUpdate}
            onToggleVisibility={toggleStatusColumn}
            onRemoveColumn={removeTagColumn}
            onNavigateToColumn={handleNavigateToColumn}
          />
        ))}
      </div>

      {/* Modal ajout colonne - contrôlé par le parent */}
      {showAddColumnModal && (
        <AddColumnModal
          availableTags={availableTags}
          onAddTag={handleAddTagColumn}
          onClose={onCloseAddColumnModal}
        />
      )}
    </div>
  );
}

export default KanbanBoard;