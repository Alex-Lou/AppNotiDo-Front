import { useState } from 'react';
import { FaTrash, FaEdit, FaSave, FaTimes, FaClock } from 'react-icons/fa';

function TaskItem({ task, onUpdate, onDelete, onDragStart, onDragEnter, onDragEnd, isDragging, isDragOver }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const priorityColors = {
    LOW: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/40',
    MEDIUM: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/40',
    HIGH: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/40',
  };

  const statusColors = {
    TODO: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/40',
    IN_PROGRESS: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/40',
    DONE: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/40',
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
    
    if (diff < 0) return { text: 'Échue', color: 'text-rose-500 dark:text-rose-400', emoji: '🔴', isOverdue: true };
    if (days === 0) return { text: "Aujourd'hui", color: 'text-amber-500 dark:text-amber-300', emoji: '⚠️', isOverdue: false };
    if (days === 1) return { text: 'Demain', color: 'text-amber-500 dark:text-amber-300', emoji: '⏰', isOverdue: false };
    if (days <= 7) return { text: `Dans ${days} jours`, color: 'text-sky-600 dark:text-sky-300', emoji: '📅', isOverdue: false };
    return { text: date.toLocaleDateString('fr-FR'), color: 'text-slate-500 dark:text-slate-400', emoji: '📅', isOverdue: false };
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
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-700/80 dark:bg-slate-900/80">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-100 dark:bg-sky-500/10" />
        <div className="relative space-y-3">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-500/60 focus:ring-2 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-50"
            placeholder="Titre"
          />
          
          <textarea
            value={editedTask.description || ''}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-sky-500/60 focus:ring-2 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-50"
            placeholder="Description"
            rows="2"
          />

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
              📅 Date d'échéance
            </label>
            <input
              type="datetime-local"
              value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().slice(0, 16) : ''}
              onChange={handleDateChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none ring-sky-500/60 focus:ring-2 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                ⏱️ Durée (min)
              </label>
              <input
                type="number"
                value={editedTask.estimatedDuration || ''}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    estimatedDuration: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none ring-sky-500/60 focus:ring-2 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-50"
                placeholder="Ex: 60"
                min="1"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                🔔 Rappel (min)
              </label>
              <select
                value={editedTask.reminderMinutes || 15}
                onChange={(e) => setEditedTask({ ...editedTask, reminderMinutes: parseInt(e.target.value) })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none ring-sky-500/60 focus:ring-2 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-50"
              >
                <option value="5">5 min</option>
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="60">1h</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                🎯 Priorité
              </label>
              <select
                value={editedTask.priority}
                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none ring-sky-500/60 focus:ring-2 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-50"
              >
                <option value="LOW">🟢 Basse</option>
                <option value="MEDIUM">🟡 Moyenne</option>
                <option value="HIGH">🔴 Haute</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                📌 Statut
              </label>
              <select
                value={editedTask.status}
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none ring-sky-500/60 focus:ring-2 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-50"
              >
                <option value="TODO">📝 À faire</option>
                <option value="IN_PROGRESS">⏳ En cours</option>
                <option value="DONE">✅ Terminé</option>
              </select>
            </div>
          </div>

          <div className="mt-1 flex gap-2">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-400"
            >
              <FaSave /> Sauvegarder
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
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
      className={`
        group relative overflow-hidden rounded-2xl border border-slate-200 
        bg-white px-5 py-4 shadow-sm transition-all duration-200
        cursor-move
        hover:shadow-md hover:border-sky-200
        dark:border-slate-800/80 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:shadow-sm
        ${isDragging ? 'opacity-70 scale-[1.02] shadow-2xl ring-2 ring-sky-500/60' : ''}
        ${isDragOver ? 'ring-2 ring-dashed ring-sky-400/80' : ''}
      `}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnter={(e) => onDragEnter(e, task.id)}
      onDragEnd={onDragEnd}
    >
      {/* halo décoratif */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-sky-100 dark:bg-sky-500/10" />

      {/* handle visuelle de drag */}
      <div className="pointer-events-none absolute inset-x-6 top-3 flex justify-center">
        <div className="h-1.5 w-10 rounded-full bg-slate-200 transition-colors group-hover:bg-slate-400 dark:bg-slate-600/70 dark:group-hover:bg-slate-300/80" />
      </div>

      {/* actions flottantes */}
      <div className="absolute right-3 top-3 flex gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        <button
          onClick={() => setIsEditing(true)}
          className="rounded-full bg-white p-1.5 text-sky-500 shadow-sm transition hover:bg-sky-500 hover:text-white dark:bg-slate-900/90 dark:text-sky-300"
          title="Modifier"
        >
          <FaEdit size={13} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-full bg-white p-1.5 text-rose-500 shadow-sm transition hover:bg-rose-500 hover:text-white dark:bg-slate-900/90 dark:text-rose-300"
          title="Supprimer"
        >
          <FaTrash size={13} />
        </button>
      </div>

      <div className="mt-4 flex justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              {task.description}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {dateInfo && (
              <p className={`inline-flex items-center gap-1 text-[11px] font-medium ${dateInfo.color}`}>
                {dateInfo.emoji} {dateInfo.text}
              </p>
            )}
            {task.estimatedDuration && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <FaClock className="h-3 w-3 text-sky-500 dark:text-sky-400" /> {formatDuration(task.estimatedDuration)}
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${statusColors[task.status]}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current/80" />
              {statusLabels[task.status]}
            </span>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${priorityColors[task.priority]}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current/80" />
              {priorityLabels[task.priority]}
            </span>
          </div>

          {dateInfo && (
            <div className="mt-3">
              <div className="h-0.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={`h-full rounded-full ${
                    dateInfo.isOverdue ? 'bg-rose-500' : 'bg-sky-500'
                  }`}
                  style={{ width: dateInfo.isOverdue ? '100%' : '45%' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
