// src/components/Sidebar/UrgentTasks.jsx
import { FiBell } from 'react-icons/fi';
import {
  URGENT_TASKS_SIDEBAR_CONTAINER,
  URGENT_TASKS_SIDEBAR_HEADER,
  URGENT_TASKS_SIDEBAR_ICON,
  URGENT_TASKS_SIDEBAR_TITLE,
  URGENT_TASKS_SIDEBAR_DESCRIPTION
} from '../../constants/styles';

function UrgentTasks({ urgentTasks }) {
  if (urgentTasks.length === 0) return null;

  return (
    <div className={URGENT_TASKS_SIDEBAR_CONTAINER}>
      <div className={URGENT_TASKS_SIDEBAR_HEADER}>
        <FiBell className={URGENT_TASKS_SIDEBAR_ICON} size={18} />
        <span className={URGENT_TASKS_SIDEBAR_TITLE}>
          {urgentTasks.length} tâche{urgentTasks.length > 1 ? 's' : ''} urgente{urgentTasks.length > 1 ? 's' : ''}
        </span>
      </div>
      <p className={URGENT_TASKS_SIDEBAR_DESCRIPTION}>
        Priorité HAUTE - Échéance &lt; 1h
      </p>
    </div>
  );
}

export default UrgentTasks;
