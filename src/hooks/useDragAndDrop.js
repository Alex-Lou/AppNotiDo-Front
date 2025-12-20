import { useState } from 'react';

export const useDragAndDrop = (tasks, setTasks) => {
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverTaskId, setDragOverTaskId] = useState(null);
  const [tempFilteredTasks, setTempFilteredTasks] = useState([]);

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e, targetTaskId, filteredTasks) => {
    e.preventDefault();
    if (draggedTaskId === null || draggedTaskId === targetTaskId) return;
    setDragOverTaskId(targetTaskId);

    const currentIndex = filteredTasks.findIndex((t) => t.id === draggedTaskId);
    const targetIndex = filteredTasks.findIndex((t) => t.id === targetTaskId);
    if (currentIndex === -1 || targetIndex === -1) return;

    const updated = [...filteredTasks];
    const [moved] = updated.splice(currentIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setTempFilteredTasks(updated);
  };

  const handleDragEnd = (filteredTasks) => {
    if (draggedTaskId == null) {
      setDraggedTaskId(null);
      setDragOverTaskId(null);
      setTempFilteredTasks([]);
      return;
    }

    const tasksToUse = tempFilteredTasks.length > 0 ? tempFilteredTasks : filteredTasks;
    const idsInNewOrder = tasksToUse.map((t) => t.id);
    const ordered = [...tasks].sort(
      (a, b) => idsInNewOrder.indexOf(a.id) - idsInNewOrder.indexOf(b.id)
    );
    setTasks(ordered);

    setDraggedTaskId(null);
    setDragOverTaskId(null);
    setTempFilteredTasks([]);
  };

  return {
    draggedTaskId,
    dragOverTaskId,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  };
};