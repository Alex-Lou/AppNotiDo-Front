// src/components/Task/SubtaskList.jsx
import { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiCheck, 
  FiX, 
  FiTrash2, 
  FiEdit2,
  FiCheckSquare,
  FiSquare,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';
import { useSubtasks } from '../../hooks/useSubtasks';

function SubtaskList({ taskId, initialSubtasks = [], onSubtasksChange }) {
  console.log('SubtaskList taskId:', taskId);
  const [isExpanded, setIsExpanded] = useState(true);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const {
    subtasks,
    loading,
    stats,
    createSubtask,
    toggleSubtask,
    updateSubtask,
    deleteSubtask,
    initializeSubtasks
  } = useSubtasks(taskId);

  // Initialiser avec les sous-tâches existantes
  useEffect(() => {
    if (initialSubtasks && initialSubtasks.length > 0) {
      initializeSubtasks(initialSubtasks);
    }
  }, [initialSubtasks, initializeSubtasks]);

  // Notifier le parent des changements
  useEffect(() => {
    if (onSubtasksChange) {
      onSubtasksChange(subtasks, stats);
    }
  }, [subtasks, stats, onSubtasksChange]);

  const handleAddSubtask = async () => {
    if (!newSubtaskTitle.trim()) return;
    
    const result = await createSubtask(newSubtaskTitle);
    if (result) {
      setNewSubtaskTitle('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddSubtask();
    } else if (e.key === 'Escape') {
      setNewSubtaskTitle('');
      setIsAdding(false);
    }
  };

  const handleToggle = async (subtaskId) => {
    await toggleSubtask(subtaskId);
  };

  const handleStartEdit = (subtask) => {
    setEditingId(subtask.id);
    setEditingTitle(subtask.title);
  };

  const handleSaveEdit = async () => {
    if (!editingTitle.trim() || !editingId) return;
    
    await updateSubtask(editingId, { title: editingTitle.trim() });
    setEditingId(null);
    setEditingTitle('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const handleDelete = async (subtaskId) => {
    await deleteSubtask(subtaskId);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div className="mt-3 rounded-xl border border-slate-200 dark:border-stone-700 bg-slate-50/50 dark:bg-stone-800/30 overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between px-3 py-2 bg-slate-100/80 dark:bg-stone-800/60 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <FiChevronDown size={14} className="text-slate-500 dark:text-amber-400" />
          ) : (
            <FiChevronRight size={14} className="text-slate-500 dark:text-amber-400" />
          )}
          <span className="text-xs font-semibold text-slate-700 dark:text-amber-200">
            Sous-tâches
          </span>
          {stats.total > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600 dark:bg-stone-700 dark:text-amber-300">
              {stats.completed}/{stats.total}
            </span>
          )}
        </div>

        {/* Barre de progression mini */}
        {stats.total > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-stone-700 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 dark:from-emerald-500 dark:to-teal-400 transition-all duration-300"
                style={{ width: `${stats.progress}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-amber-400">
              {stats.progress}%
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-2 space-y-1">
          {/* Liste des sous-tâches */}
          {subtasks.map((subtask) => (
            <div 
              key={subtask.id}
              className={`
                flex items-center gap-2 px-2 py-1.5 rounded-lg group transition-all
                ${subtask.completed 
                  ? 'bg-emerald-50/50 dark:bg-emerald-900/20' 
                  : 'hover:bg-slate-100 dark:hover:bg-stone-700/50'
                }
              `}
            >
              {/* Checkbox */}
              <button
                onClick={() => handleToggle(subtask.id)}
                className={`
                  flex-shrink-0 transition-colors
                  ${subtask.completed 
                    ? 'text-emerald-500 dark:text-emerald-400' 
                    : 'text-slate-400 dark:text-stone-500 hover:text-cyan-500 dark:hover:text-amber-400'
                  }
                `}
              >
                {subtask.completed ? (
                  <FiCheckSquare size={16} />
                ) : (
                  <FiSquare size={16} />
                )}
              </button>

              {/* Titre (édition ou affichage) */}
              {editingId === subtask.id ? (
                <div className="flex-1 flex items-center gap-1">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyDown={handleEditKeyDown}
                    autoFocus
                    className="flex-1 text-xs px-2 py-1 rounded border border-cyan-300 dark:border-amber-600 bg-white dark:bg-stone-800 text-slate-700 dark:text-amber-100 focus:outline-none focus:ring-1 focus:ring-cyan-400 dark:focus:ring-amber-500"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="p-1 rounded bg-emerald-500 text-white hover:bg-emerald-600"
                  >
                    <FiCheck size={12} />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1 rounded bg-slate-400 text-white hover:bg-slate-500"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ) : (
                <>
                  <span 
                    className={`
                      flex-1 text-xs transition-all
                      ${subtask.completed 
                        ? 'line-through text-slate-400 dark:text-stone-500' 
                        : 'text-slate-700 dark:text-amber-100'
                      }
                    `}
                  >
                    {subtask.title}
                  </span>

                  {/* Actions (visibles au hover) */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleStartEdit(subtask)}
                      className="p-1 rounded text-slate-400 hover:text-cyan-500 hover:bg-slate-200 dark:text-stone-500 dark:hover:text-amber-400 dark:hover:bg-stone-700"
                    >
                      <FiEdit2 size={12} />
                    </button>
                    <button
                      onClick={() => handleDelete(subtask.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:text-stone-500 dark:hover:text-rose-400 dark:hover:bg-rose-900/30"
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Input pour ajouter */}
          {isAdding ? (
            <div className="flex items-center gap-1 px-2 py-1">
              <FiSquare size={16} className="text-slate-300 dark:text-stone-600 flex-shrink-0" />
              <input
                type="text"
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => {
                  if (!newSubtaskTitle.trim()) {
                    setIsAdding(false);
                  }
                }}
                autoFocus
                placeholder="Nouvelle sous-tâche..."
                className="flex-1 text-xs px-2 py-1 rounded border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-700 dark:text-amber-100 placeholder-slate-400 dark:placeholder-stone-500 focus:outline-none focus:border-cyan-400 dark:focus:border-amber-500"
              />
              <button
                onClick={handleAddSubtask}
                disabled={!newSubtaskTitle.trim()}
                className="p-1 rounded bg-cyan-500 text-white hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-amber-500 dark:hover:bg-amber-600"
              >
                <FiCheck size={12} />
              </button>
              <button
                onClick={() => {
                  setNewSubtaskTitle('');
                  setIsAdding(false);
                }}
                className="p-1 rounded bg-slate-300 text-slate-600 hover:bg-slate-400 dark:bg-stone-600 dark:text-stone-300 dark:hover:bg-stone-500"
              >
                <FiX size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-xs text-slate-500 dark:text-stone-400 hover:bg-slate-100 dark:hover:bg-stone-700/50 hover:text-cyan-600 dark:hover:text-amber-400 transition-colors"
            >
              <FiPlus size={14} />
              <span>Ajouter une sous-tâche</span>
            </button>
          )}

          {/* Message si vide */}
          {subtasks.length === 0 && !isAdding && (
            <p className="text-[10px] text-slate-400 dark:text-stone-500 text-center py-2 italic">
              Aucune sous-tâche
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SubtaskList;