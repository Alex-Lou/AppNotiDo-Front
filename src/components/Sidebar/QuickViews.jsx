import { Star, Calendar, Clock, CheckCircle } from 'lucide-react';

function QuickViews({ onViewClick, activeView }) {
  const views = [
    { id: 'important', label: 'Importantes', icon: Star, color: 'text-amber-600 dark:text-amber-400' },
    { id: 'today', label: "Aujourd'hui", icon: Calendar, color: 'text-cyan-600 dark:text-cyan-400' },
    { id: 'week', label: 'Cette semaine', icon: Clock, color: 'text-teal-600 dark:text-teal-400' },
    { id: 'completed', label: 'Complétées', icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400' },
  ];

  return (
    <nav className="mt-4 space-y-2">
      <h3 className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-amber-300/70">
        Vues rapides
      </h3>
      {views.map((view) => {
        const Icon = view.icon;
        const isActive = activeView === view.id;

        return (
          <button
            key={view.id}
            onClick={() => onViewClick(view.id)}
            className={`
              flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold
              transition-all duration-150 ease-out
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 dark:focus-visible:ring-amber-500/70
              ${isActive
                ? 'bg-gradient-to-r from-cyan-100 to-teal-100 text-cyan-900 shadow-md ring-2 ring-cyan-400/70 dark:bg-gradient-to-r dark:from-amber-900/60 dark:to-stone-900/60 dark:text-amber-50 dark:ring-amber-800/70 translate-x-0.5'
                : 'text-slate-700 hover:bg-slate-100/70 hover:translate-x-0.5 dark:text-amber-200/80 dark:hover:bg-stone-800/60'
              }
            `}
          >
            <span
              className={`
                flex h-7 w-7 items-center justify-center rounded-full bg-white/80 shadow-sm
                dark:bg-stone-900/80
                ${isActive ? 'scale-105' : 'scale-100'}
                transition-transform duration-150
              `}
            >
              <Icon className={view.color} size={18} />
            </span>
            <span>{view.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default QuickViews;
