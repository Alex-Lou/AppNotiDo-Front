function DashboardHeader({ username }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h2 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-amber-50">
          Bonjour, {username} <span className="align-middle">👋</span>
        </h2>
        <p className="mt-2 text-base font-medium text-slate-700/90 dark:text-amber-200/80">
          Voici un aperçu de vos tâches pour aujourd'hui.
        </p>
      </div>
    </div>
  );
}

export default DashboardHeader;