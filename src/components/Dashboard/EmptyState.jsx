// src/components/Dashboard/EmptyState.jsx
import { EMPTY_STATE_CONTAINER, EMPTY_STATE_TEXT } from '../../constants/styles';

function EmptyState({ hasFilters }) {
  return (
    <div className={EMPTY_STATE_CONTAINER}>
      <p className={EMPTY_STATE_TEXT}>
        {hasFilters
          ? "Aucune tâche ne correspond aux filtres sélectionnés."
          : "Aucune tâche pour le moment. Créez-en une ! 🚀"}
      </p>
    </div>
  );
}

export default EmptyState;
