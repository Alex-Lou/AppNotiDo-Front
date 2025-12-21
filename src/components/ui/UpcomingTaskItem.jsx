// src/components/ui/UpcomingTaskItem.jsx
import { FiAlertCircle, FiTrash2 } from 'react-icons/fi';
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
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Supprimer définitivement cette tâche échue ?')) {
      await onDelete(task.id);
    }
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
            <button
              onClick={handleDelete}
              className={UPCOMING_DELETE_BUTTON}
              title="Supprimer la tâche échue"
            >
              <FiTrash2 size={12} />
              <span>Supprimer</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpcomingTaskItem;
    