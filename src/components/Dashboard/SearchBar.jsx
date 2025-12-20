import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

function SearchBar({ searchQuery, onSearchChange, onClear, resultCount, totalCount }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSearch = searchQuery.trim().length > 0;

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    if (!hasSearch) {
      setIsExpanded(false);
    }
  };

  const handleClear = () => {
    onClear();
    setIsExpanded(false);
  };

  return (
    <div className="mb-6">
      <div className="relative flex items-center justify-end">
        {/* Version compacte - bouton avec loupe */}
        {!isExpanded && (
          <button
            onClick={handleExpand}
            className="group flex items-center gap-3 rounded-xl border-2 border-cyan-400/70 bg-gradient-to-r from-white to-cyan-50/50 px-5 py-3 shadow-md transition-all hover:border-cyan-500 hover:shadow-lg dark:border-stone-700/70 dark:bg-gradient-to-r dark:from-stone-900/80 dark:to-slate-900/80 dark:hover:border-stone-600"
          >
            <FiSearch className="h-5 w-5 text-cyan-600 transition-transform group-hover:scale-110 dark:text-amber-400" />
            <span className="text-sm font-medium text-slate-500 dark:text-amber-300/70">
              Votre tâche ici...
            </span>
          </button>
        )}

        {/* Version étendue - barre de recherche complète */}
        {isExpanded && (
          <div 
            className="w-full animate-expand-search"
            style={{
              animation: 'expandSearch 0.3s ease-out forwards'
            }}
          >
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <FiSearch className="h-5 w-5 text-cyan-600 dark:text-amber-400" />
              </div>
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onBlur={handleCollapse}
                autoFocus
                placeholder="Rechercher par titre ou description..."
                className="w-full rounded-xl border-2 border-cyan-400/70 bg-gradient-to-r from-white to-cyan-50/30 py-3.5 pl-12 pr-24 text-sm font-medium text-slate-800 placeholder-slate-500 shadow-md outline-none ring-cyan-400/60 transition focus:border-cyan-500 focus:ring-2 dark:border-stone-700/70 dark:bg-gradient-to-r dark:from-stone-900/80 dark:to-slate-900/80 dark:text-amber-50 dark:placeholder-amber-300/50 dark:ring-amber-700/60 dark:focus:border-stone-600"
              />

              {hasSearch && (
                <>
                  <div className="absolute inset-y-0 right-14 flex items-center">
                    <span className="rounded-full bg-cyan-500 px-2.5 py-1 text-xs font-bold text-white dark:bg-amber-600">
                      {resultCount} / {totalCount}
                    </span>
                  </div>
                  
                  <button
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleClear();
                    }}
                    className="absolute inset-y-0 right-3 flex items-center justify-center rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 dark:text-amber-400 dark:hover:bg-stone-800 dark:hover:text-amber-300"
                    title="Effacer la recherche"
                  >
                    <FiX size={20} />
                  </button>
                </>
              )}
            </div>

            {hasSearch && resultCount === 0 && (
              <p className="mt-3 text-sm font-medium text-rose-600 dark:text-rose-400">
                Aucun résultat trouvé pour "{searchQuery}"
              </p>
            )}

            {hasSearch && resultCount > 0 && (
              <p className="mt-3 text-sm font-medium text-slate-600 dark:text-amber-300/80">
                {resultCount} tâche{resultCount > 1 ? 's' : ''} trouvée{resultCount > 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes expandSearch {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default SearchBar;