// src/components/Task/TaskEditForm.jsx
import { FaSave, FaTimes } from 'react-icons/fa';
import { FiFolder } from 'react-icons/fi';
import { INPUT_CLASSES, LABEL_CLASSES, BUTTON_PRIMARY, BUTTON_SECONDARY, EDIT_FORM_CONTAINER, DECORATIVE_HALO } from '../../constants/styles';


function TaskEditForm({ editedTask, setEditedTask, handleSave, handleCancel, handleDateChange, projects = [] }) {
  // Vérifier si la tâche est terminée avec du temps enregistré
  const isCompletedWithTime = editedTask.status === 'DONE' && editedTask.timeSpent > 0;

  // Vérifier si la tâche est échue et non réactivable
  const isOverdueAndNotReactivable = editedTask.dueDate && 
    new Date(editedTask.dueDate) < new Date() && 
    !editedTask.reactivable &&
    editedTask.status !== 'DONE';

  // Trouver le projet actuel
  const currentProject = projects.find(p => p.id === editedTask.projectId);

  return (
    <div className={EDIT_FORM_CONTAINER}>
      <div className={DECORATIVE_HALO} />
      
      <div className="relative space-y-4">
        {/* Titre */}
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          className={`${INPUT_CLASSES} font-semibold`}
          placeholder="Titre de la tâche"
        />
        
        {/* Description */}
        <textarea
          value={editedTask.description || ''}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          className={INPUT_CLASSES}
          placeholder="Description"
          rows="3"
        />

        {/* Projet */}
        {projects.length > 0 && (
          <div>
            <label className={LABEL_CLASSES}>
              📁 Projet
            </label>
            <div className="relative">
              <select
                value={editedTask.projectId || ''}
                onChange={(e) => setEditedTask({ 
                  ...editedTask, 
                  projectId: e.target.value ? Number(e.target.value) : null 
                })}
                className={INPUT_CLASSES}
              >
                <option value="">Aucun projet</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              {currentProject && (
                <div 
                  className="absolute right-10 top-1/2 -translate-y-1/2 w-3 h-3 rounded"
                  style={{ backgroundColor: currentProject.color || '#3B82F6' }}
                />
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        <div>
          <label className={LABEL_CLASSES}>
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


        {/* Date d'échéance */}
        <div>
          <label className={LABEL_CLASSES}>
            📅 Date d'échéance
          </label>
          <input
            type="datetime-local"
            value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().slice(0, 16) : ''}
            onChange={handleDateChange}
            className={INPUT_CLASSES}
          />
        </div>


        {/* Durée et Rappel */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={LABEL_CLASSES}>
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
            <label className={LABEL_CLASSES}>
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


        {/* Priorité et Statut */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={LABEL_CLASSES}>
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
            <label className={LABEL_CLASSES}>
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


        {/* Chronométrer cette tâche - Caché si DONE avec temps OU échue non réactivable */}
        {!isCompletedWithTime && !isOverdueAndNotReactivable && (
          <div>
            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-slate-50 dark:bg-stone-800 border border-slate-200 dark:border-stone-700 hover:bg-slate-100 dark:hover:bg-stone-700 transition-colors">
              <input
                type="checkbox"
                checked={editedTask.timerEnabled !== false}
                onChange={(e) => setEditedTask({ ...editedTask, timerEnabled: e.target.checked })}
                className="w-5 h-5 mt-0.5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500 dark:border-stone-600 dark:bg-stone-800"
              />
              <div>
                <span className="text-sm font-medium text-slate-700 dark:text-amber-100 block">
                  ⏱️ Chronométrer cette tâche
                </span>
                <span className="text-xs text-slate-500 dark:text-amber-300/70">
                  Afficher le chronomètre pour traquer le temps passé
                </span>
              </div>
            </label>
          </div>
        )}

        {/* Message si tâche terminée avec temps enregistré */}
        {isCompletedWithTime && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700">
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300 block">
              ✅ Tâche chronométrée terminée
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400">
              Temps enregistré : {Math.floor(editedTask.timeSpent / 60)}min {editedTask.timeSpent % 60}s
            </span>
          </div>
        )}


        {/* Réactivable - Caché si échue et non réactivable */}
        {!isOverdueAndNotReactivable && (
          <div>
            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-slate-50 dark:bg-stone-800 border border-slate-200 dark:border-stone-700 hover:bg-slate-100 dark:hover:bg-stone-700 transition-colors">
              <input
                type="checkbox"
                checked={editedTask.reactivable || false}
                onChange={(e) => setEditedTask({ ...editedTask, reactivable: e.target.checked })}
                className="w-5 h-5 mt-0.5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500 dark:border-stone-600 dark:bg-stone-800"
              />
              <div>
                <span className="text-sm font-medium text-slate-700 dark:text-amber-100 block">
                  🔄 Tâche réactivable
                </span>
                <span className="text-xs text-slate-500 dark:text-amber-300/70">
                  Si échue, proposer de la déplacer vers aujourd'hui
                </span>
              </div>
            </label>
          </div>
        )}


        {/* Boutons */}
        <div className="mt-2 flex gap-3">
          <button onClick={handleSave} className={BUTTON_PRIMARY}>
            <FaSave size={16} /> Sauvegarder
          </button>
          <button onClick={handleCancel} className={BUTTON_SECONDARY}>
            <FaTimes size={16} /> Annuler
          </button>
        </div>
      </div>
    </div>
  );
}


export default TaskEditForm;