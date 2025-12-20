import { useState } from 'react';
import { FaTrash, FaEdit, FaSave, FaTimes, FaClock } from 'react-icons/fa';

function TaskItem({ task, onUpdate, onDelete, onDragStart, onDragEnter, onDragEnd, isDragging, isDragOver }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const priorityColors = {
    LOW: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    HIGH: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };

  const statusColors = {
    TODO: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    IN_PROGRESS: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    DONE: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  };

  const statusLabels = {
    TODO: '📝 À faire',
    IN_PROGRESS: '⏳ En cours',
    DONE: '✅ Terminé',
  };

  const priorityLabels = {
    LOW: '🟢 Basse',
    MEDIUM: '🟡 Moyenne',
    HIGH: '🔴 Haute',
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diff = date - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (diff < 0) return { text: 'Échue', color: 'text-red-600 dark:text-red-400', emoji: '🔴', isOverdue: true };
    if (days === 0) return { text: "Aujourd'hui", color: 'text-orange-600 dark:text-orange-400', emoji: '⚠️', isOverdue: false };
    if (days === 1) return { text: 'Demain', color: 'text-yellow-600 dark:text-yellow-400', emoji: '⏰', isOverdue: false };
    if (days <= 7) return { text: `Dans ${days} jours`, color: 'text-blue-600 dark:text-blue-400', emoji: '📅', isOverdue: false };
    return { text: date.toLocaleDateString('fr-FR'), color: 'text-gray-600 dark:text-gray-400', emoji: '📅', isOverdue: false };
  };

  const formatDuration = (minutes) => {
    if (!minutes) return null;
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    
    if (!newDate) {
      setEditedTask({ ...editedTask, dueDate: null });
      return;
    }

    const selectedDate = new Date(newDate);
    const now = new Date();

    if (selectedDate < now) {
      alert('⚠️ Impossible de définir une échéance dans le passé. Veuillez choisir une date future.');
      return;
    }

    const updatedTask = {
      ...editedTask,
      dueDate: selectedDate.toISOString(),
      notified: false,
    };

    setEditedTask(updatedTask);
  };

  const handleSave = async () => {
    await onUpdate(task.id, editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="border-2 border-blue-400 dark:border-blue-600 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
        <div className="space-y-3">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Titre"
          />
          
          <textarea
            value={editedTask.description || ''}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
            rows="2"
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              📅 Date d'échéance
            </label>
            <input
              type="datetime-local"
              value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().slice(0, 16) : ''}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                ⏱️ Durée (min)
              </label>
              <input
                type="number"
                value={editedTask.estimatedDuration || ''}
                onChange={(e) => setEditedTask({ ...editedTask, estimatedDuration: e.target.value ? parseInt(e.target.value) : null })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 60"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                🔔 Rappel (min)
              </label>
              <select
                value={editedTask.reminderMinutes || 15}
                onChange={(e) => setEditedTask({ ...editedTask, reminderMinutes: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="5">5 min</option>
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="60">1h</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select
              value={editedTask.priority}
              onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="LOW">🟢 Basse</option>
              <option value="MEDIUM">🟡 Moyenne</option>
              <option value="HIGH">🔴 Haute</option>
            </select>

            <select
              value={editedTask.status}
              onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="TODO">📝 À faire</option>
              <option value="IN_PROGRESS">⏳ En cours</option>
              <option value="DONE">✅ Terminé</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <FaSave /> Sauvegarder
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              <FaTimes /> Annuler
            </button>
          </div>
        </div>
      </div>
    );
  }

  const dateInfo = task.dueDate ? formatDate(task.dueDate) : null;

  return (
    <div
      className={
        `border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition 
         cursor-move 
         ${isDragging ? 'opacity-60 scale-[1.02] shadow-2xl ring-2 ring-blue-400 dark:ring-blue-300' : 'hover:shadow-md'} 
         ${isDragOver ? 'ring-2 ring-dashed ring-blue-400 dark:ring-blue-300' : ''}`
      }
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnter={(e) => onDragEnter(e, task.id)}
      onDragEnd={onDragEnd}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600 dark:text-gray-300 mt-1">{task.description}</p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2 items-center">
            {dateInfo && (
              <p className={`text-sm font-medium ${dateInfo.color}`}>
                {dateInfo.emoji} {dateInfo.text}
              </p>
            )}
            {task.estimatedDuration && (
              <span className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                <FaClock /> {formatDuration(task.estimatedDuration)}
              </span>
            )}
          </div>

          <div className="flex gap-2 mt-2">
            <span className={`px-2 py-1 text-xs rounded ${statusColors[task.status]}`}>
              {statusLabels[task.status]}
            </span>
            <span className={`px-2 py-1 text-xs rounded ${priorityColors[task.priority]}`}>
              {priorityLabels[task.priority]}
            </span>
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-2"
            title="Modifier"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-2"
            title="Supprimer"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
