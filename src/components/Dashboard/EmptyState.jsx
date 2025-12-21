// src/components/Dashboard/EmptyState.jsx
import { EMPTY_STATE_CONTAINER, EMPTY_STATE_TEXT } from '../../constants/styles';

function EmptyState({ hasFilters, onNewTask }) {
  return (
    <div className={EMPTY_STATE_CONTAINER}>
      <p className={EMPTY_STATE_TEXT}>
        {hasFilters ? (
          "Aucune tâche ne correspond aux filtres sélectionnés."
        ) : (
          <>
            Aucune tâche pour le moment.{' '}
            <button
              onClick={onNewTask}
              className="font-semibold text-cyan-600 hover:text-cyan-700 dark:text-amber-400 dark:hover:text-amber-500 underline decoration-2 underline-offset-2 transition-colors cursor-pointer"
            >
              Créez-en une
            </button>
            {' '}! 🚀
          </>
        )}
      </p>
    </div>
  );
}

export default EmptyState;