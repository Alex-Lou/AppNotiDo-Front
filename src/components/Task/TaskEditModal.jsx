// src/components/Dashboard/TaskEditModal.jsx
import { useState, useEffect } from 'react';
import { 
  FiX, 
  FiSave, 
  FiCalendar, 
  FiClock, 
  FiTag,
  FiAlertCircle,
  FiCheckCircle,
  FiLoader,
  FiPlus,
  FiBell,
  FiFolder
} from 'react-icons/fi';
import {
  TASK_EDIT_MODAL_OVERLAY,
  TASK_EDIT_MODAL,
  TASK_EDIT_MODAL_HEADER,
  TASK_EDIT_MODAL_TITLE,
  TASK_EDIT_MODAL_CLOSE,
  TASK_EDIT_MODAL_CONTENT,
  TASK_EDIT_MODAL_FIELD,
  TASK_EDIT_MODAL_LABEL,
  TASK_EDIT_MODAL_INPUT,
  TASK_EDIT_MODAL_TEXTAREA,
  TASK_EDIT_MODAL_SELECT,
  TASK_EDIT_MODAL_ROW,
  TASK_EDIT_MODAL_FOOTER,
  TASK_EDIT_MODAL_BUTTON_CANCEL,
  TASK_EDIT_MODAL_BUTTON_SAVE
} from '../../constants/styles';

const STATUS_OPTIONS = [
  { value: 'TODO', label: '📝 À faire' },
  { value: 'IN_PROGRESS', label: '⏳ En cours' },
  { value: 'DONE', label: '✅ Terminé' }
];

const PRIORITY_OPTIONS = [
  { value: 'LOW', label: '🟢 Basse' },
  { value: 'MEDIUM', label: '🟡 Moyenne' },
  { value: 'HIGH', label: '🔴 Haute' }
];

const REMINDER_OPTIONS = [
  { value: 5, label: '5 minutes' },
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 heure' }
];

// Template pour une nouvelle tâche
const getEmptyTask = (defaultDate = null, defaultProjectId = null) => ({
  title: '',
  description: '',
  status: 'TODO',
  priority: 'MEDIUM',
  dueDate: defaultDate ? defaultDate.toISOString() : null,
  estimatedDuration: '',
  reminderMinutes: 15,
  tags: [],
  reactivable: false,
  timerEnabled: false,
  projectId: defaultProjectId
});

function TaskEditModal({ 
  task, 
  isCreating = false,
  defaultDate = null,
  onSave, 
  onCreate,
  onClose,
  projects = [],
  activeProject = null
}) {
  const [editedTask, setEditedTask] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [tagsInput, setTagsInput] = useState('');

  // Initialiser le formulaire
  useEffect(() => {
    if (isCreating) {
      const defaultProjectId = activeProject?.id || null;
      const newTask = getEmptyTask(defaultDate, defaultProjectId);
      setEditedTask(newTask);
      setTagsInput('');
    } else if (task) {
      setEditedTask({ ...task });
      // Gérer les deux formats de tags : string ou array
      if (task.tags) {
        if (Array.isArray(task.tags)) {
          setTagsInput(task.tags.join(', '));
        } else {
          setTagsInput(task.tags);
        }
      } else {
        setTagsInput('');
      }
    }
  }, [task, isCreating, defaultDate, activeProject]);

  if (!editedTask) return null;

  const handleChange = (field, value) => {
    setEditedTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    
    if (!newDate) {
      handleChange('dueDate', null);
      return;
    }

    const selectedDate = new Date(newDate);
    handleChange('dueDate', selectedDate.toISOString());
    handleChange('notified', false);
  };

  const handleTagsChange = (e) => {
    setTagsInput(e.target.value);
  };

  const handleProjectChange = (e) => {
    const value = e.target.value;
    handleChange('projectId', value ? Number(value) : null);
  };

  // Préparer les données - tags en STRING pas en Array
  const prepareTaskData = () => {
    // Nettoyer et joindre les tags en String
    const tagsString = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .join(',');

    const data = {
      title: editedTask.title,
      description: editedTask.description || '',
      priority: editedTask.priority,
      status: editedTask.status,
      dueDate: editedTask.dueDate || null,
      estimatedDuration: editedTask.estimatedDuration ? parseInt(editedTask.estimatedDuration) : null,
      reminderMinutes: parseInt(editedTask.reminderMinutes) || 15,
      reactivable: editedTask.reactivable || false,
      timerEnabled: editedTask.timerEnabled !== false,
      tags: tagsString || null,
      projectId: editedTask.projectId || null
    };

    return data;
  };

  const handleSave = async () => {
    if (!editedTask.title?.trim()) {
      alert('⚠️ Le titre est requis.');
      return;
    }

    setIsSaving(true);
    
    const taskData = prepareTaskData();

    try {
      if (isCreating) {
        await onCreate(taskData);
      } else {
        await onSave(task.id, taskData);
      }
      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  };

  // Formater la date pour l'input datetime-local
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  const modalTitle = isCreating ? '➕ Nouvelle tâche' : '✏️ Modifier la tâche';
  const saveButtonText = isCreating ? 'Créer la tâche' : 'Sauvegarder';
  const savingButtonText = isCreating ? 'Création...' : 'Sauvegarde...';

  // Trouver le projet actuel pour afficher sa couleur
  const currentProject = projects.find(p => p.id === editedTask.projectId);

  return (
    <div 
      className={TASK_EDIT_MODAL_OVERLAY} 
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div 
        className={TASK_EDIT_MODAL} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={TASK_EDIT_MODAL_HEADER}>
          <h3 className={TASK_EDIT_MODAL_TITLE}>
            {modalTitle}
          </h3>
          <button onClick={onClose} className={TASK_EDIT_MODAL_CLOSE}>
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className={TASK_EDIT_MODAL_CONTENT}>
          {/* Titre */}
          <div className={TASK_EDIT_MODAL_FIELD}>
            <label className={TASK_EDIT_MODAL_LABEL}>
              Titre *
            </label>
            <input
              type="text"
              value={editedTask.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className={TASK_EDIT_MODAL_INPUT}
              placeholder="Ex: Acheter du lait"
              autoFocus
            />
          </div>

          {/* Description */}
          <div className={TASK_EDIT_MODAL_FIELD}>
            <label className={TASK_EDIT_MODAL_LABEL}>
              Description
            </label>
            <textarea
              value={editedTask.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              className={TASK_EDIT_MODAL_TEXTAREA}
              placeholder="Détails de la tâche (optionnel)"
              rows={3}
            />
          </div>

          {/* Projet */}
          {projects.length > 0 && (
            <div className={TASK_EDIT_MODAL_FIELD}>
              <label className={TASK_EDIT_MODAL_LABEL}>
                <FiFolder className="inline mr-1" size={14} />
                Projet
              </label>
              <div className="relative">
                <select
                  value={editedTask.projectId || ''}
                  onChange={handleProjectChange}
                  className={TASK_EDIT_MODAL_SELECT}
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

          {/* Tags - juste après Projet */}
          <div className={TASK_EDIT_MODAL_FIELD}>
            <label className={TASK_EDIT_MODAL_LABEL}>
              <FiTag className="inline mr-1" size={14} />
              Tags (séparés par des virgules)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={handleTagsChange}
              className={TASK_EDIT_MODAL_INPUT}
              placeholder="travail, urgent, projet"
            />
          </div>

          {/* Statut et Priorité */}
          <div className={TASK_EDIT_MODAL_ROW}>
            <div className={TASK_EDIT_MODAL_FIELD}>
              <label className={TASK_EDIT_MODAL_LABEL}>
                <FiCheckCircle className="inline mr-1" size={14} />
                Statut
              </label>
              <select
                value={editedTask.status || 'TODO'}
                onChange={(e) => handleChange('status', e.target.value)}
                className={TASK_EDIT_MODAL_SELECT}
              >
                {STATUS_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={TASK_EDIT_MODAL_FIELD}>
              <label className={TASK_EDIT_MODAL_LABEL}>
                <FiAlertCircle className="inline mr-1" size={14} />
                Priorité
              </label>
              <select
                value={editedTask.priority || 'MEDIUM'}
                onChange={(e) => handleChange('priority', e.target.value)}
                className={TASK_EDIT_MODAL_SELECT}
              >
                {PRIORITY_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date et Durée */}
          <div className={TASK_EDIT_MODAL_ROW}>
            <div className={TASK_EDIT_MODAL_FIELD}>
              <label className={TASK_EDIT_MODAL_LABEL}>
                <FiCalendar className="inline mr-1" size={14} />
                Échéance
              </label>
              <input
                type="datetime-local"
                value={formatDateForInput(editedTask.dueDate)}
                onChange={handleDateChange}
                className={TASK_EDIT_MODAL_INPUT}
              />
            </div>

            <div className={TASK_EDIT_MODAL_FIELD}>
              <label className={TASK_EDIT_MODAL_LABEL}>
                <FiClock className="inline mr-1" size={14} />
                Durée estimée (min)
              </label>
              <input
                type="number"
                value={editedTask.estimatedDuration || ''}
                onChange={(e) => handleChange('estimatedDuration', e.target.value)}
                className={TASK_EDIT_MODAL_INPUT}
                placeholder="30"
                min="1"
              />
            </div>
          </div>

          {/* Rappel */}
          <div className={TASK_EDIT_MODAL_FIELD}>
            <label className={TASK_EDIT_MODAL_LABEL}>
              <FiBell className="inline mr-1" size={14} />
              Rappel (minutes avant)
            </label>
            <select
              value={editedTask.reminderMinutes || 15}
              onChange={(e) => handleChange('reminderMinutes', parseInt(e.target.value))}
              className={TASK_EDIT_MODAL_SELECT}
            >
              {REMINDER_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Chronométrer cette tâche */}
          <div className={TASK_EDIT_MODAL_FIELD}>
            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-slate-50 dark:bg-stone-800 border border-slate-200 dark:border-stone-700 hover:bg-slate-100 dark:hover:bg-stone-700 transition-colors">
              <input
                type="checkbox"
                checked={editedTask.timerEnabled !== false}
                onChange={(e) => handleChange('timerEnabled', e.target.checked)}
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

          {/* Réactivable */}
          <div className={TASK_EDIT_MODAL_FIELD}>
            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-slate-50 dark:bg-stone-800 border border-slate-200 dark:border-stone-700 hover:bg-slate-100 dark:hover:bg-stone-700 transition-colors">
              <input
                type="checkbox"
                checked={editedTask.reactivable || false}
                onChange={(e) => handleChange('reactivable', e.target.checked)}
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
        </div>

        {/* Footer */}
        <div className={TASK_EDIT_MODAL_FOOTER}>
          <button 
            onClick={onClose} 
            className={TASK_EDIT_MODAL_BUTTON_CANCEL}
            disabled={isSaving}
          >
            Annuler
          </button>
          <button 
            onClick={handleSave} 
            className={TASK_EDIT_MODAL_BUTTON_SAVE}
            disabled={isSaving || !editedTask.title?.trim()}
          >
            {isSaving ? (
              <>
                <FiLoader className="animate-spin" size={16} />
                {savingButtonText}
              </>
            ) : (
              <>
                {isCreating ? <FiPlus size={16} /> : <FiSave size={16} />}
                {saveButtonText}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskEditModal;