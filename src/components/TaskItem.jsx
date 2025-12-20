import { useState } from 'react';
import { FaTrash, FaEdit, FaSave, FaTimes, FaClock, FaLock, FaLockOpen } from 'react-icons/fa';

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

  const handleToggleLock = async (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    console.log('Toggle lock clicked! Current locked state:', task.locked);
    const updatedTask = {
      ...task,
      locked: !task.locked,
    };
    console.log('Sending update with locked:', updatedTask.locked);
    await onUpdate(task.id, updatedTask);
  };

  if (isEditing) {
    return (
      <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-50 via-teal-50 to-orange-50 px-6 py-5 shadow-lg dark:border-amber-800/70 dark:bg-gradient-to-br dark:from-amber-950/40 dark:via-stone-950/60 dark:to-slate-950/40">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-200/40 via-teal-200/40 to-orange-200/40 dark:bg-gradient-to-br dark:from-amber-900/20 dark:via-orange-900/20 dark:to-rose-900/20" />
        <div className="relative space-y-4">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full rounded-xl border-2 border-cyan-300/60 bg-white/90 px-4 py-3 text-base font-semibold text-slate-900 outline-none ring-cyan-500/60 focus:ring-2 dark:border-amber-700/60 dark:bg-slate-900/80 dark:text-amber-50 dark:ring-amber-500/60"
            placeholder="Titre de la tâche"
          />
          
          <textarea
            value={editedTask.description || ''}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full rounded-xl border-2 border-cyan-300/60 bg-white/90 px-4 py-3 text-sm font-medium leading-relaxed text-slate-900 outline-none ring-cyan-500/60 focus:ring-2 dark:border-amber-700/60 dark:bg-slate-900/80 dark:text-amber-50 dark:ring-amber-500/60"
            placeholder="Description"
            rows="3"
          />

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-amber-200">
              📅 Date d'échéance
            </label>
            <input
              type="datetime-local"
              value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().slice(0, 16) : ''}
              onChange={handleDateChange}
              className="w-full rounded-xl border-2 border-cyan-300/60 bg-white/90 px-4 py-3 text-sm font-medium text-slate-900 outline-none ring-cyan-500/60 focus:ring-2 dark:border-amber-700/60 dark:bg-slate-900/80 dark:text-amber-50 dark:ring-amber-500/60"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-amber-200">
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
                className="w-full rounded-xl border-2 border-cyan-300/60 bg-white/90 px-4 py-3 text-sm font-medium text-slate-900 outline-none ring-cyan-500/60 focus:ring-2 dark:border-amber-700/60 dark:bg-slate-900/80 dark:text-amber-50 dark:ring-amber-500/60"
                placeholder="Ex: 60"
                min="1"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-amber-200">
                🔔 Rappel (min)
              </label>
              <select
                value={editedTask.reminderMinutes || 15}
                onChange={(e) => setEditedTask({ ...editedTask, reminderMinutes: parseInt(e.target.value) })}
                className="w-full rounded-xl border-2 border-cyan-300/60 bg-white/90 px-4 py-3 text-sm font-medium text-slate-900 outline-none ring-cyan-500/60 focus:ring-2 dark:border-amber-700/60 dark:bg-slate-900/80 dark:text-amber-50 dark:ring-amber-500/60"
              >
                <option value="5">5 min</option>
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="60">1h</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-amber-200">
                🎯 Priorité
              </label>
              <select
                value={editedTask.priority}
                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                className="w-full rounded-xl border-2 border-cyan-300/60 bg-white/90 px-4 py-3 text-sm font-medium text-slate-900 outline-none ring-cyan-500/60 focus:ring-2 dark:border-amber-700/60 dark:bg-slate-900/80 dark:text-amber-50 dark:ring-amber-500/60"
              >
                <option value="LOW">🟢 Basse</option>
                <option value="MEDIUM">🟡 Moyenne</option>
                <option value="HIGH">🔴 Haute</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-amber-200">
                📌 Statut
              </label>
              <select
                value={editedTask.status}
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                className="w-full rounded-xl border-2 border-cyan-300/60 bg-white/90 px-4 py-3 text-sm font-medium text-slate-900 outline-none ring-cyan-500/60 focus:ring-2 dark:border-amber-700/60 dark:bg-slate-900/80 dark:text-amber-50 dark:ring-amber-500/60"
              >
                <option value="TODO">📝 À faire</option>
                <option value="IN_PROGRESS">⏳ En cours</option>
                <option value="DONE">✅ Terminé</option>
              </select>
            </div>
          </div>

          <div className="mt-2 flex gap-3">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:from-emerald-400 hover:to-teal-400 dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500"
            >
              <FaSave size={16} /> Sauvegarder
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-200 px-6 py-3 text-sm font-bold text-slate-800 shadow-md transition hover:bg-slate-300 dark:bg-slate-700 dark:text-amber-100 dark:hover:bg-slate-600"
            >
              <FaTimes size={16} /> Annuler
            </button>
          </div>
        </div>
      </div>
    );
  }

  const dateInfo = task.dueDate ? formatDate(task.dueDate) : null;
  const isLocked = task.locked || false;

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl border-2
        bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30
        px-6 py-5 shadow-lg transition-all duration-200
        ${isLocked ? 'cursor-not-allowed opacity-90' : 'cursor-move'}
        border-cyan-300/70
        hover:shadow-xl hover:border-cyan-400 hover:from-cyan-50/40 hover:to-orange-50/40
        dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30
        dark:hover:border-amber-800/80 dark:hover:from-amber-950/40 dark:hover:to-slate-950/40 dark:hover:shadow-xl
        ${isDragging ? 'opacity-70 scale-[1.02] shadow-2xl ring-2 ring-cyan-500/60 dark:ring-amber-500/60' : ''}
        ${isDragOver ? 'ring-2 ring-dashed ring-cyan-400/80 dark:ring-amber-400/80' : ''}
        ${isLocked ? 'ring-2 ring-amber-500/40 dark:ring-amber-600/40' : ''}
      `}
      draggable={!isLocked}
      onDragStart={(e) => !isLocked && onDragStart(e, task.id)}
      onDragEnter={(e) => !isLocked && onDragEnter(e, task.id)}
      onDragEnd={!isLocked ? onDragEnd : undefined}
    >
      {/* halo décoratif avec dégradé */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br from-cyan-200/40 via-teal-200/40 to-orange-200/40 dark:bg-gradient-to-br dark:from-amber-900/30 dark:via-orange-900/30 dark:to-rose-900/30" />

      {/* handle visuelle de drag - cachée si verrouillée */}
      {!isLocked && (
        <div className="pointer-events-none absolute inset-x-6 top-3 flex justify-center">
          <div className="h-2 w-12 rounded-full bg-gradient-to-r from-cyan-300 via-teal-300 to-orange-300 transition-opacity group-hover:opacity-100 opacity-60 dark:bg-gradient-to-r dark:from-amber-700/60 dark:via-orange-700/60 dark:to-rose-700/60 dark:group-hover:opacity-100 dark:opacity-70" />
        </div>
      )}

      {/* Badge verrouillé visible en permanence si la tâche est verrouillée */}
      {isLocked && (
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 backdrop-blur-sm dark:bg-amber-600/20">
          <FaLock className="text-amber-600 dark:text-amber-400 animate-pulse" size={12} />
          <span className="text-xs font-bold text-amber-700 dark:text-amber-300">Verrouillée</span>
        </div>
      )}

      {/* actions flottantes */}
      <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleToggleLock(e);
          }}
          className={`rounded-full bg-white/90 p-2 shadow-lg transition hover:scale-110 ${
            isLocked 
              ? 'text-amber-600 hover:bg-amber-500 hover:text-white dark:bg-amber-900/80 dark:text-amber-300 dark:hover:bg-amber-600'
              : 'text-slate-500 hover:bg-amber-500 hover:text-white dark:bg-slate-800/80 dark:text-slate-400 dark:hover:bg-amber-600'
          }`}
          title={isLocked ? 'Déverrouiller' : 'Verrouiller'}
        >
          {isLocked ? (
            <FaLock size={16} className="animate-pulse" />
          ) : (
            <FaLockOpen size={16} />
          )}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsEditing(true);
          }}
          className="rounded-full bg-white/90 p-2 text-cyan-600 shadow-lg transition hover:bg-cyan-500 hover:text-white hover:scale-110 dark:bg-amber-900/80 dark:text-amber-300 dark:hover:bg-amber-600 dark:hover:text-white"
          title="Modifier"
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete(task.id);
          }}
          className="rounded-full bg-white/90 p-2 text-rose-500 shadow-lg transition hover:bg-rose-500 hover:text-white hover:scale-110 dark:bg-rose-900/80 dark:text-rose-300 dark:hover:bg-rose-600 dark:hover:text-white"
          title="Supprimer"
        >
          <FaTrash size={16} />
        </button>
      </div>

      <div className="mt-5 flex justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-base font-bold leading-snug text-slate-900 dark:text-amber-50">
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700 dark:text-amber-200/80">
              {task.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {dateInfo && (
              <p className={`inline-flex items-center gap-1.5 text-xs font-bold ${dateInfo.color}`}>
                <span className="text-base">{dateInfo.emoji}</span> {dateInfo.text}
              </p>
            )}
            {task.estimatedDuration && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-100 to-teal-100 px-3 py-1.5 text-xs font-bold text-cyan-800 shadow-sm dark:bg-gradient-to-r dark:from-amber-900/60 dark:to-orange-900/60 dark:text-amber-200">
                <FaClock className="h-3.5 w-3.5 text-cyan-600 dark:text-amber-400" /> {formatDuration(task.estimatedDuration)}
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2.5 text-xs">
            <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-bold shadow-sm ${statusColors[task.status]}`}>
              <span className="h-2 w-2 rounded-full bg-current/80" />
              {statusLabels[task.status]}
            </span>
            <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-bold shadow-sm ${priorityColors[task.priority]}`}>
              <span className="h-2 w-2 rounded-full bg-current/80" />
              {priorityLabels[task.priority]}
            </span>
          </div>

          {dateInfo && (
            <div className="mt-4">
              <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-slate-800/60">
                <div
                  className={`h-full rounded-full shadow-sm ${
                    dateInfo.isOverdue 
                      ? 'bg-gradient-to-r from-rose-500 to-orange-500 dark:from-rose-600 dark:to-orange-600' 
                      : 'bg-gradient-to-r from-cyan-500 to-teal-500 dark:from-amber-600 dark:to-orange-600'
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