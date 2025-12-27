// src/components/Task/UrgentTasksSection.jsx
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import TaskItem from './TaskItem';
import api from '../../services/api';
import { 
  URGENT_HEADER_BUTTON, 
  URGENT_TASKS_CONTAINER,
  URGENT_COUNT_BADGE,
  URGENT_TITLE,
  URGENT_SUBTITLE,
  SECTION_DIVIDER,
  DIVIDER_LINE,
  DIVIDER_TEXT
} from '../../constants/styles';

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
  fetchTasks,
  projects = []
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
      <button onClick={() => setIsOpen(!isOpen)} className={URGENT_HEADER_BUTTON}>
        <div className="flex items-center gap-3">
          {/* Animation warning */}
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
            <h2 className={URGENT_TITLE}>
              Urgent - À faire maintenant !
            </h2>
            <p className={URGENT_SUBTITLE}>
              {urgentTasks.length} tâche{urgentTasks.length > 1 ? 's' : ''} avec échéance imminente
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={URGENT_COUNT_BADGE}>
            {urgentTasks.length}
          </div>

          {/* ✅ CHANGEMENT ICI : div au lieu de IconButton */}
          {!isOpen && (
            <div
              onClick={handleClearAll}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-700/20 text-rose-700 transition-all hover:scale-110 hover:bg-rose-600 hover:text-white cursor-pointer dark:bg-rose-800/30 dark:text-rose-400 dark:hover:bg-rose-700 dark:hover:text-white"
              title="Supprimer toutes les tâches urgentes"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          )}

          {/* Flèche rotation */}
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <svg className="h-5 w-5 text-rose-700 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Contenu collapsible */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={URGENT_TASKS_CONTAINER}>
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
                projects={projects}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Séparateur */}
      {isOpen && (
        <div className={SECTION_DIVIDER}>
          <div className={DIVIDER_LINE}></div>
          <span className={DIVIDER_TEXT}>Autres tâches</span>
          <div className={DIVIDER_LINE}></div>
        </div>
      )}
    </div>
  );
}

export default UrgentTasksSection;