// src/components/Task/TaskBadge.jsx
import { TASK_BADGE_COMPONENT, TASK_BADGE_DOT } from '../../constants/styles';

function TaskBadge({ type, value, colors, labels }) {
  return (
    <span className={`${TASK_BADGE_COMPONENT} ${colors[value]}`}>
      <span className={TASK_BADGE_DOT} />
      {labels[value]}
    </span>
  );
}

export default TaskBadge;
