// src/components/Task/TaskTags.jsx
import { TASK_TAGS_CONTAINER, TASK_TAG_BADGE } from '../../constants/styles';

function TaskTags({ tags }) {
  if (!tags) return null;

  return (
    <div className={TASK_TAGS_CONTAINER}>
      {tags.split(',').map((tag) => (
        <span
          key={tag.trim()}
          className={TASK_TAG_BADGE}
        >
          #{tag.trim()}
        </span>
      ))}
    </div>
  );
}

export default TaskTags;
