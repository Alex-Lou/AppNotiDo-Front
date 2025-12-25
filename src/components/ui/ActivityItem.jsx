// src/components/ui/ActivityItem.jsx
import { FiCheck, FiPlus, FiEdit3 } from 'react-icons/fi';
import { 
  ACTIVITY_ITEM, 
  ACTIVITY_ICON_CONTAINER, 
  ACTIVITY_TITLE_TEXT, 
  ACTIVITY_TYPE_TEXT, 
  ACTIVITY_TIME_TEXT 
} from '../../constants/styles';

const getActivityIcon = (task) => {
  if (task.status === 'DONE') {
    return <FiCheck className="text-teal-600 dark:text-teal-400" size={14} />;
  }
  if (task.createdAt === task.updatedAt) {
    return <FiPlus className="text-cyan-600 dark:text-cyan-400" size={14} />;
  }
  return <FiEdit3 className="text-orange-600 dark:text-orange-400" size={14} />;
};

const getActivityText = (task) => {
  if (task.status === 'DONE') return 'Terminée';
  if (task.createdAt === task.updatedAt) return 'Créée';
  return 'Modifiée';
};

function ActivityItem({ task, timeAgo, onClick }) {
  return (
    <button onClick={onClick} className={ACTIVITY_ITEM}>
      <div className={ACTIVITY_ICON_CONTAINER}>
        {getActivityIcon(task)}
      </div>
      <div className="flex-1 min-w-0">
        <p className={ACTIVITY_TITLE_TEXT}>{task.title}</p>
        <p className={ACTIVITY_TYPE_TEXT}>
          {getActivityText(task)} · <span className={ACTIVITY_TIME_TEXT}>{timeAgo}</span>
        </p>
      </div>
    </button>
  );
}

export default ActivityItem;