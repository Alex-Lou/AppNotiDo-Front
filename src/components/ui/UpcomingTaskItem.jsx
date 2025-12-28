// src/components/ui/UpcomingTaskItem.jsx
import { useState, useEffect } from 'react';
import { FiAlertCircle, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import { 
  UPCOMING_TASK_ITEM, 
  UPCOMING_TASK_TITLE, 
  UPCOMING_TASK_TIME, 
  UPCOMING_TASK_PRIORITY,
  UPCOMING_DELETE_BUTTON 
} from '../../constants/styles';

const priorityEmojis = {
  HIGH: '🔴',
  MEDIUM: '🟡',
  LOW: '🟢'
};

function UpcomingTaskItem({ task, timeInfo, onTaskClick, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Auto-fermer la confirmation après 3 secondes
  useEffect(() => {
    if (showDeleteConfirm) {
      const timer = setTimeout(() => {
        setShowDeleteConfirm(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showDeleteConfirm]);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async (e) => {
    e.stopPropagation();
    await onDelete(task.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="relative">
      <div onClick={() => onTaskClick(task.id)} className={UPCOMING_TASK_ITEM}>
        <div className="mb-1.5 flex items-start justify-between gap-2">
          <p className={UPCOMING_TASK_TITLE}>
            {task.title}
          </p>
          {timeInfo.urgent && (
            <FiAlertCircle className="flex-shrink-0 text-rose-500 dark:text-rose-400" size={16} />
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`${UPCOMING_TASK_TIME} ${timeInfo.color}`}>
            {timeInfo.text}
          </span>
          <span className={UPCOMING_TASK_PRIORITY}>
            {priorityEmojis[task.priority] || '⚪'}
          </span>
        </div>
        
        {/* Bouton poubelle pour les tâches échues */}
        {timeInfo.isOverdue && (
          <div className="mt-2 flex justify-end">
            {!showDeleteConfirm ? (
              <button
                onClick={handleDeleteClick}
                className={UPCOMING_DELETE_BUTTON}
                title="Supprimer la tâche échue"
              >
                <FiTrash2 size={12} />
                <span>Supprimer</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-rose-100 dark:bg-rose-900/40">
                <span className="text-[10px] font-medium text-rose-700 dark:text-rose-300">
                  Confirmer ?
                </span>
                <button
                  onClick={handleConfirmDelete}
                  className="p-1 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                  title="Confirmer la suppression"
                >
                  <FiCheck size={12} />
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="p-1 rounded bg-slate-400 text-white hover:bg-slate-500 transition-colors"
                  title="Annuler"
                >
                  <FiX size={12} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UpcomingTaskItem;