// src/components/Task/TaskTags.jsx
import { TASK_TAG_BADGE } from '../../constants/styles';

function TaskTags({ tags }) {
  if (!tags) return null;

  return (
    <>
      {tags.split(',').map((tag) => (
        <span
          key={tag.trim()}
          className={TASK_TAG_BADGE}
        >
          #{tag.trim()}
        </span>
      ))}
    </>
  );
}

export default TaskTags;