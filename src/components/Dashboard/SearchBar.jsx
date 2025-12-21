// src/components/Dashboard/SearchBar.jsx
import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { 
  SEARCH_COMPACT_BUTTON,
  SEARCH_INPUT,
  SEARCH_COUNT_BADGE,
  SEARCH_CLEAR_BUTTON,
  SEARCH_NO_RESULTS,
  SEARCH_RESULTS_INFO
} from '../../constants/styles';

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
          <button onClick={handleExpand} className={SEARCH_COMPACT_BUTTON}>
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
                className={SEARCH_INPUT}
              />

              {hasSearch && (
                <>
                  <div className="absolute inset-y-0 right-14 flex items-center">
                    <span className={SEARCH_COUNT_BADGE}>
                      {resultCount} / {totalCount}
                    </span>
                  </div>
                  
                  <button
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleClear();
                    }}
                    className={SEARCH_CLEAR_BUTTON}
                    title="Effacer la recherche"
                  >
                    <FiX size={20} />
                  </button>
                </>
              )}
            </div>

            {hasSearch && resultCount === 0 && (
              <p className={SEARCH_NO_RESULTS}>
                Aucun résultat trouvé pour "{searchQuery}"
              </p>
            )}

            {hasSearch && resultCount > 0 && (
              <p className={SEARCH_RESULTS_INFO}>
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
