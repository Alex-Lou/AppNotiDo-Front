// components/TaskEditForm.jsx
import { FaSave, FaTimes } from 'react-icons/fa';
import { INPUT_CLASSES } from '../../constants/taskConstants';

function TaskEditForm({ editedTask, setEditedTask, handleSave, handleCancel, handleDateChange }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-50 via-teal-50 to-orange-50 px-6 py-5 shadow-lg transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] dark:border-amber-800/70 dark:bg-gradient-to-br dark:from-amber-950/40 dark:via-stone-950/60 dark:to-slate-950/40">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-200/40 via-teal-200/40 to-orange-200/40 dark:bg-gradient-to-br dark:from-amber-900/20 dark:via-orange-900/20 dark:to-rose-900/20" />
      
      <div className="relative space-y-4">
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          className={`${INPUT_CLASSES} font-semibold`}
          placeholder="Titre de la tâche"
        />
        
        <textarea
          value={editedTask.description || ''}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          className={INPUT_CLASSES}
          placeholder="Description"
          rows="3"
        />

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-amber-200">
            🏷️ Tags
          </label>
          <input
            type="text"
            value={editedTask.tags || ''}
            onChange={(e) => setEditedTask({ ...editedTask, tags: e.target.value })}
            className={INPUT_CLASSES}
            placeholder="dev, urgent, perso"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-amber-200">
            📅 Date d'échéance
          </label>
          <input
            type="datetime-local"
            value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().slice(0, 16) : ''}
            onChange={handleDateChange}
            className={INPUT_CLASSES}
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
              className={INPUT_CLASSES}
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
              className={INPUT_CLASSES}
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
              className={INPUT_CLASSES}
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
              className={INPUT_CLASSES}
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
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-bold text-white shadow-md transition-transform duration-150 hover:from-emerald-400 hover:to-teal-400 active:scale-95 dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500"
          >
            <FaSave size={16} /> Sauvegarder
          </button>
          <button
            onClick={handleCancel}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-200 px-6 py-3 text-sm font-bold text-slate-800 shadow-md transition-transform duration-150 hover:bg-slate-300 active:scale-95 dark:bg-slate-700 dark:text-amber-100 dark:hover:bg-slate-600"
          >
            <FaTimes size={16} /> Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskEditForm;
