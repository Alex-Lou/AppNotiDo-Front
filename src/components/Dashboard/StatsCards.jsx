function StatsCards({ stats }) {
  return (
    <div className="mb-10 grid grid-cols-4 gap-5">
      {/* Carte Total */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 px-6 py-5 shadow-lg ring-2 ring-slate-400/50 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80 dark:ring-stone-700/70">
        <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:bg-gradient-to-br dark:from-stone-800/60 dark:to-slate-800/60" />
        <p className="text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-amber-200/80">
          Total
        </p>
        <p className="mt-3 text-4xl font-bold text-slate-900 dark:text-amber-50">
          {stats.total}
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-amber-300/70">
          Tâches enregistrées
        </p>
      </div>

      {/* Carte À faire */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-100 to-teal-200 px-6 py-5 shadow-lg ring-2 ring-cyan-400/60 dark:bg-gradient-to-br dark:from-cyan-900/70 dark:to-teal-900/70 dark:ring-cyan-800/70">
        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-200 to-teal-300 dark:bg-gradient-to-br dark:from-cyan-800/60 dark:to-teal-800/60" />
        <p className="text-sm font-bold uppercase tracking-wide text-cyan-900 dark:text-cyan-200">
          À faire
        </p>
        <p className="mt-3 text-4xl font-bold text-cyan-900 dark:text-cyan-50">
          {stats.todo}
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-cyan-800 dark:text-cyan-300/80">
          En attente
        </p>
      </div>

      {/* Carte En cours */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 px-6 py-5 shadow-lg ring-2 ring-orange-400/60 dark:bg-gradient-to-br dark:from-orange-900/70 dark:to-amber-900/70 dark:ring-orange-800/70">
        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 dark:bg-gradient-to-br dark:from-orange-800/60 dark:to-amber-800/60" />
        <p className="text-sm font-bold uppercase tracking-wide text-orange-900 dark:text-orange-200">
          En cours
        </p>
        <p className="mt-3 text-4xl font-bold text-orange-900 dark:text-orange-50">
          {stats.inProgress}
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-orange-800 dark:text-orange-300/80">
          En traitement
        </p>
      </div>

      {/* Carte Terminées */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-200 px-6 py-5 shadow-lg ring-2 ring-teal-400/60 dark:bg-gradient-to-br dark:from-teal-900/70 dark:to-emerald-900/70 dark:ring-teal-800/70">
        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-teal-200 to-emerald-300 dark:bg-gradient-to-br dark:from-teal-800/60 dark:to-emerald-800/60" />
        <p className="text-sm font-bold uppercase tracking-wide text-teal-900 dark:text-teal-200">
          Terminées
        </p>
        <p className="mt-3 text-4xl font-bold text-teal-900 dark:text-teal-50">
          {stats.done}
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-teal-800 dark:text-teal-300/80">
          Complétées
        </p>
      </div>
    </div>
  );
}

export default StatsCards;