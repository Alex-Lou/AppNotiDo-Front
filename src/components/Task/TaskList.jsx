// src/components/Dashboard/TaskList.jsx
import { useState } from 'react';
import { FiTrash2, FiX, FiCheckSquare } from 'react-icons/fi';
import TaskItem from '../Task/TaskItem';

function TaskList({
  tasks,
  draggedTaskId,
  dragOverTaskId,
  editingTaskId,
  onTaskUpdate,
  onTaskDelete,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onStartEditing
}) {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (tasks.length === 0) return null;

  const handleToggleSelect = (taskId) => {
    setSelectedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedTasks.size === tasks.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(tasks.map(t => t.id)));
    }
  };

  const handleDeleteSelected = async () => {
    const taskIds = Array.from(selectedTasks);
    
    for (const taskId of taskIds) {
      await onTaskDelete(taskId, true);
      // Petit délai entre chaque requête
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setSelectedTasks(new Set());
    setSelectionMode(false);
    setShowDeleteConfirm(false);
  };

  const handleCancelSelection = () => {
    setSelectionMode(false);
    setSelectedTasks(new Set());
    setShowDeleteConfirm(false);
  };

  const allSelected = selectedTasks.size === tasks.length && tasks.length > 0;

  return (
    <div className="space-y-2">
      {/* Barre de sélection */}
      <div className="flex items-center justify-between mb-3">
        {!selectionMode ? (
          <button
            onClick={() => setSelectionMode(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-amber-300 hover:bg-slate-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
            title="Mode sélection"
          >
            <FiCheckSquare size={14} />
            <span>Sélectionner</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleSelectAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-amber-300 hover:bg-slate-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
            >
              <FiCheckSquare size={14} />
              <span>{allSelected ? 'Désélectionner tout' : 'Tout sélectionner'}</span>
            </button>
            
            <span className="text-xs text-slate-500 dark:text-amber-300/60">
              {selectedTasks.size} sélectionnée{selectedTasks.size > 1 ? 's' : ''}
            </span>

            {selectedTasks.size > 0 && !showDeleteConfirm && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors"
              >
                <FiTrash2 size={14} />
                <span>Supprimer ({selectedTasks.size})</span>
              </button>
            )}

            {showDeleteConfirm && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-100 dark:bg-rose-900/40 rounded-lg">
                <span className="text-xs font-medium text-rose-700 dark:text-rose-300">
                  Confirmer ?
                </span>
                <button
                  onClick={handleDeleteSelected}
                  className="p-1 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                  title="Confirmer la suppression"
                >
                  <FiCheckSquare size={14} />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="p-1 rounded bg-slate-400 text-white hover:bg-slate-500 transition-colors"
                  title="Annuler"
                >
                  <FiX size={14} />
                </button>
              </div>
            )}

            <button
              onClick={handleCancelSelection}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
            >
              <FiX size={14} />
              <span>Annuler</span>
            </button>
          </div>
        )}
      </div>

      {/* Liste des tâches */}
      {tasks.map((task) => (
        <div key={task.id} id={`task-${task.id}`} onDragOver={(e) => e.preventDefault()}>
          <TaskItem
            task={task}
            onUpdate={onTaskUpdate}
            onDelete={onTaskDelete}
            onDragStart={onDragStart}
            onDragEnter={(e, targetTaskId) => onDragEnter(e, targetTaskId, tasks)}
            onDragEnd={() => onDragEnd(tasks)}
            isDragging={draggedTaskId === task.id}
            isDragOver={dragOverTaskId === task.id}
            editingTaskId={editingTaskId}
            onStartEditing={onStartEditing}
            selectionMode={selectionMode}
            isSelected={selectedTasks.has(task.id)}
            onToggleSelect={handleToggleSelect}
          />
        </div>
      ))}
    </div>
  );
}

export default TaskList;