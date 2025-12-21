// components/TaskBadge.jsx
function TaskBadge({ type, value, colors, labels }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-bold shadow-sm text-xs ${colors[value]}`}>
      <span className="h-2 w-2 rounded-full bg-current/80" />
      {labels[value]}
    </span>
  );
}

export default TaskBadge;
