// src/components/Dashboard/TaskList.jsx
import TaskItem from '../Task/TaskItem';

function TaskList({
  tasks,
  draggedTaskId,
  dragOverTaskId,
  editingTaskId,
  onTaskUpdate,
  onTaskDelete,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onStartEditing
}) {
  if (tasks.length === 0) return null;

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} id={`task-${task.id}`} onDragOver={(e) => e.preventDefault()}>
          <TaskItem
            task={task}
            onUpdate={onTaskUpdate}
            onDelete={onTaskDelete}
            onDragStart={onDragStart}
            onDragEnter={(e, targetTaskId) => onDragEnter(e, targetTaskId, tasks)}
            onDragEnd={() => onDragEnd(tasks)}
            isDragging={draggedTaskId === task.id}
            isDragOver={dragOverTaskId === task.id}
            editingTaskId={editingTaskId}
            onStartEditing={onStartEditing}
          />
        </div>
      ))}
    </div>
  );
}

export default TaskList;
