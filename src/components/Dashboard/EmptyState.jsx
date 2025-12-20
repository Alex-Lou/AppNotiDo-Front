function EmptyState({ hasFilters }) {
  return (
    <div className="rounded-2xl border-2 border-slate-400/50 bg-gradient-to-br from-slate-100 to-slate-200 p-12 text-center shadow-lg dark:border-stone-800/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80">
      <p className="text-base font-semibold text-slate-700 dark:text-amber-300/80">
        {hasFilters
          ? "Aucune tâche ne correspond aux filtres sélectionnés."
          : "Aucune tâche pour le moment. Créez-en une ! 🚀"}
      </p>
    </div>
  );
}

export default EmptyState;