// components/TaskTags.jsx
function TaskTags({ tags }) {
  if (!tags) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {tags.split(',').map((tag) => (
        <span
          key={tag.trim()}
          className="rounded-full bg-cyan-100/90 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-amber-900/60 dark:text-amber-200"
        >
          #{tag.trim()}
        </span>
      ))}
    </div>
  );
}

export default TaskTags;
