// src/components/Dashboard/UrgentTasksSection.jsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import TaskItem from '../Task/TaskItem';
import api from '../../services/api';

function UrgentTasksSection({
  urgentTasks,
  draggedTaskId,
  dragOverTaskId,
  editingTaskId,
  onTaskUpdate,
  onTaskDelete,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onStartEditing,
  setTasks,
  fetchTasks
}) {
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem('urgentSectionOpen');
    return saved === null ? true : saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('urgentSectionOpen', isOpen);
  }, [isOpen]);

  const handleClearAll = async (e) => {
    e.stopPropagation();
    
    if (!window.confirm(`Supprimer définitivement les ${urgentTasks.length} tâche(s) urgente(s) ?`)) {
      return;
    }

    const count = urgentTasks.length;

    try {
      await Promise.all(
        urgentTasks.map(task => api.delete(`/tasks/${task.id}`))
      );
      
      setTasks(prevTasks => 
        prevTasks.filter(task => 
          !urgentTasks.some(urgentTask => urgentTask.id === task.id)
        )
      );
      
      toast.success(`🗑️ ${count} tâche(s) urgente(s) supprimée(s)`);
      await fetchTasks();
    } catch (error) {
      console.error('Erreur suppression tâches urgentes:', error);
      toast.error('❌ Erreur lors de la suppression');
      fetchTasks();
    }
  };

  if (urgentTasks.length === 0) return null;

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group w-full mb-4 flex items-center justify-between gap-3 rounded-xl border-2 border-rose-400/60 bg-gradient-to-r from-rose-100 via-orange-100 to-red-100 px-5 py-3 shadow-lg transition-all hover:shadow-xl dark:border-rose-800/70 dark:bg-gradient-to-r dark:from-rose-950/60 dark:via-red-950/70 dark:to-orange-950/60"
      >
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10">
            <span className="absolute inset-0 animate-ping-slow opacity-40">
              <span className="flex h-full w-full items-center justify-center text-2xl">⚠️</span>
            </span>
            <span className="absolute inset-0 animate-ping-slow opacity-30" style={{ animationDelay: '0.5s' }}>
              <span className="flex h-full w-full items-center justify-center text-2xl">⚠️</span>
            </span>
            <span className="absolute inset-0 animate-ping-slow opacity-20" style={{ animationDelay: '1s' }}>
              <span className="flex h-full w-full items-center justify-center text-2xl">⚠️</span>
            </span>
            <span className="relative z-10 text-2xl animate-pulse-warning">⚠️</span>
          </div>

          <div className="text-left">
            <h2 className="text-base font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              Urgent - À faire maintenant !
            </h2>
            <p className="text-xs font-medium text-rose-600/80 dark:text-rose-300/70">
              {urgentTasks.length} tâche{urgentTasks.length > 1 ? 's' : ''} avec échéance imminente
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-sm font-bold text-white shadow-md dark:bg-rose-700">
            {urgentTasks.length}
          </div>

          {!isOpen && (
            <button
              onClick={handleClearAll}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-700/20 text-rose-700 transition-all hover:bg-rose-600 hover:text-white hover:scale-110 dark:bg-rose-800/30 dark:text-rose-400 dark:hover:bg-rose-700 dark:hover:text-white"
              title="Supprimer toutes les tâches urgentes"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}

          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <svg className="h-5 w-5 text-rose-700 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-4 rounded-2xl border-2 border-rose-400/60 bg-gradient-to-br from-rose-50/80 via-orange-50/60 to-red-50/80 p-6 shadow-xl dark:border-rose-800/70 dark:bg-gradient-to-br dark:from-rose-950/40 dark:via-red-950/50 dark:to-orange-950/40">
          {urgentTasks.map((task) => (
            <div key={task.id} id={`task-${task.id}`} onDragOver={(e) => e.preventDefault()} className="animate-pulse-subtle">
              <TaskItem
                task={task}
                onUpdate={onTaskUpdate}
                onDelete={onTaskDelete}
                onDragStart={onDragStart}
                onDragEnter={(e, targetTaskId) => onDragEnter(e, targetTaskId, urgentTasks)}
                onDragEnd={() => onDragEnd(urgentTasks)}
                isDragging={draggedTaskId === task.id}
                isDragOver={dragOverTaskId === task.id}
                editingTaskId={editingTaskId}
                onStartEditing={onStartEditing}
              />
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="my-8 flex items-center gap-4">
          <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700"></div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Autres tâches</span>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700"></div>
        </div>
      )}
    </div>
  );
}

export default UrgentTasksSection;
