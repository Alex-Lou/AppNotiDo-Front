// src/components/Dashboard/RecentActivity.jsx
import ActivityItem from '../ui/ActivityItem';
import { ACTIVITY_CONTAINER, ACTIVITY_TITLE, ACTIVITY_EMPTY } from '../../constants/styles';

function RecentActivity({ tasks, onTaskClick }) {
  // Trier les tâches par date de mise à jour
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return past.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  if (recentTasks.length === 0) {
    return (
      <div className={ACTIVITY_CONTAINER}>
        <h3 className={ACTIVITY_TITLE}>
          Activité récente
        </h3>
        <p className={ACTIVITY_EMPTY}>
          Aucune activité récente
        </p>
      </div>
    );
  }

  return (
    <div className={ACTIVITY_CONTAINER}>
      <h3 className={ACTIVITY_TITLE}>
        Activité récente
      </h3>

      <div className="space-y-3">
        {recentTasks.map(task => (
          <ActivityItem
            key={task.id}
            task={task}
            timeAgo={getTimeAgo(task.updatedAt)}
            onClick={() => onTaskClick(task.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
