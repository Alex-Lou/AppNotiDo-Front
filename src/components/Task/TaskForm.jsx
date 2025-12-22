// src/components/Task/TaskForm.jsx
import { FiX } from 'react-icons/fi';
import { useTaskForm } from '../../hooks/useTaskForm';
import FormField from '../FormField';
import { INPUT_CLASSES, FORM_CONTAINER, FORM_TITLE, BUTTON_SUBMIT } from '../../constants/styles';

function TaskForm({ onTaskCreated, onClose }) {
  const { values, handleChange, reset, isSubmitting, setIsSubmitting, prepareTaskData } = useTaskForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const taskData = prepareTaskData();
      await onTaskCreated(taskData);
      reset();
    } catch (error) {
      console.error('Erreur création tâche:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={FORM_CONTAINER}>
      {/* En-tête avec titre et bouton fermer */}
      <div className="flex items-center justify-between mb-6">
        <h3 className={FORM_TITLE}>➕ Nouvelle Tâche</h3>
        
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-all duration-200 group"
            title="Fermer"
          >
            <FiX className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Titre */}
        <FormField label="Titre" required>
          <input
            type="text"
            value={values.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={INPUT_CLASSES}
            placeholder="Ex: Acheter du lait"
            required
          />
        </FormField>

        {/* Description */}
        <FormField label="Description">
          <textarea
            value={values.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className={INPUT_CLASSES}
            placeholder="Détails de la tâche..."
            rows="3"
          />
        </FormField>

        {/* Date d'échéance */}
        <FormField label="Date d'échéance" emoji="📅">
          <input
            type="datetime-local"
            value={values.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
            className={INPUT_CLASSES}
          />
        </FormField>

        {/* Durée estimée et Rappel */}
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Durée estimée (minutes)" emoji="⏱️">
            <input
              type="number"
              value={values.estimatedDuration}
              onChange={(e) => handleChange('estimatedDuration', e.target.value)}
              className={INPUT_CLASSES}
              placeholder="Ex: 60"
              min="1"
            />
          </FormField>

          <FormField label="Rappel (minutes avant)" emoji="🔔">
            <select
              value={values.reminderMinutes}
              onChange={(e) => handleChange('reminderMinutes', e.target.value)}
              className={INPUT_CLASSES}
            >
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 heure</option>
            </select>
          </FormField>
        </div>

        {/* Priorité et Status */}
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Priorité">
            <select
              value={values.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
              className={INPUT_CLASSES}
            >
              <option value="LOW">🟢 Basse</option>
              <option value="MEDIUM">🟡 Moyenne</option>
              <option value="HIGH">🔴 Haute</option>
            </select>
          </FormField>

          <FormField label="Statut">
            <select
              value={values.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className={INPUT_CLASSES}
            >
              <option value="TODO">📝 À faire</option>
              <option value="IN_PROGRESS">⏳ En cours</option>
              <option value="DONE">✅ Terminé</option>
            </select>
          </FormField>
        </div>

                {/* Réactivable */}
        <div className="flex items-center gap-3 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <input
            type="checkbox"
            id="reactivable"
            checked={values.reactivable}
            onChange={(e) => handleChange('reactivable', e.target.checked)}
            className="w-4 h-4 text-teal-600 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-teal-500"
          />
          <label htmlFor="reactivable" className="flex-1 cursor-pointer">
            <div className="font-medium text-slate-700 dark:text-slate-200">
              🔄 Tâche réactivable
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Si échue, proposer de la déplacer vers aujourd'hui (au lieu de la marquer urgente)
            </div>
          </label>
        </div>


        {/* Bouton submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={BUTTON_SUBMIT}
        >
          {isSubmitting ? 'Création...' : '✨ Créer la tâche'}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;