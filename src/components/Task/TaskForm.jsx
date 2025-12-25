// src/components/Task/TaskForm.jsx
import { FiX } from 'react-icons/fi';
import { useTaskForm } from '../../hooks/useTaskForm';
import FormField from '../FormField';
import { 
  INPUT_CLASSES, 
  FORM_CONTAINER, 
  FORM_TITLE,
  FORM_HEADER,
  FORM_CLOSE_BUTTON,
  FORM_CLOSE_ICON,
  FORM_FIELDS_CONTAINER,
  FORM_GRID_2_COLS,
  FORM_REACTIVABLE_CONTAINER,
  FORM_REACTIVABLE_CHECKBOX,
  FORM_REACTIVABLE_LABEL,
  FORM_REACTIVABLE_TITLE,
  FORM_REACTIVABLE_DESCRIPTION,
  BUTTON_SUBMIT 
} from '../../constants/styles';

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
      <div className={FORM_HEADER}>
        <h3 className={FORM_TITLE}>➕ Nouvelle Tâche</h3>
        
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={FORM_CLOSE_BUTTON}
            title="Fermer"
          >
            <FiX className={FORM_CLOSE_ICON} />
          </button>
        )}
      </div>

      <div className={FORM_FIELDS_CONTAINER}>
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

        {/* Tags - juste après Description */}
        <FormField label="Tags" emoji="🏷️">
          <input
            type="text"
            value={values.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
            className={INPUT_CLASSES}
            placeholder="travail, urgent, projet (séparés par des virgules)"
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
        <div className={FORM_GRID_2_COLS}>
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
        <div className={FORM_GRID_2_COLS}>
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

        {/* Chronométrable (Timer) */}
        <div className={FORM_REACTIVABLE_CONTAINER}>
          <input
            type="checkbox"
            id="timerEnabled"
            checked={values.timerEnabled}
            onChange={(e) => handleChange('timerEnabled', e.target.checked)}
            className={FORM_REACTIVABLE_CHECKBOX}
          />
          <label htmlFor="timerEnabled" className={FORM_REACTIVABLE_LABEL}>
            <div className={FORM_REACTIVABLE_TITLE}>
              ⏱️ Chronométrer cette tâche
            </div>
            <div className={FORM_REACTIVABLE_DESCRIPTION}>
              Afficher le chronomètre pour traquer le temps passé sur cette tâche
            </div>
          </label>
        </div>

        {/* Réactivable */}
        <div className={FORM_REACTIVABLE_CONTAINER}>
          <input
            type="checkbox"
            id="reactivable"
            checked={values.reactivable}
            onChange={(e) => handleChange('reactivable', e.target.checked)}
            className={FORM_REACTIVABLE_CHECKBOX}
          />
          <label htmlFor="reactivable" className={FORM_REACTIVABLE_LABEL}>
            <div className={FORM_REACTIVABLE_TITLE}>
              🔄 Tâche réactivable
            </div>
            <div className={FORM_REACTIVABLE_DESCRIPTION}>
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