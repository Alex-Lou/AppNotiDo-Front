// src/components/Dashboard/SearchBar.jsx
import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { 
  SEARCH_BAR_CONTAINER,
  SEARCH_BAR_WRAPPER,
  SEARCH_COMPACT_BUTTON,
  SEARCH_COMPACT_ICON,
  SEARCH_COMPACT_TEXT,
  SEARCH_EXPANDED_CONTAINER,
  SEARCH_INPUT_WRAPPER,
  SEARCH_INPUT_ICON_CONTAINER,
  SEARCH_INPUT_ICON,
  SEARCH_INPUT,
  SEARCH_COUNT_CONTAINER,
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
    <div className={SEARCH_BAR_CONTAINER}>
      <div className={SEARCH_BAR_WRAPPER}>
        {/* Version compacte - bouton avec loupe */}
        {!isExpanded && (
          <button onClick={handleExpand} className={SEARCH_COMPACT_BUTTON}>
            <FiSearch className={SEARCH_COMPACT_ICON} />
            <span className={SEARCH_COMPACT_TEXT}>
              Votre tâche ici...
            </span>
          </button>
        )}

        {/* Version étendue - barre de recherche complète */}
        {isExpanded && (
          <div 
            className={SEARCH_EXPANDED_CONTAINER}
            style={{
              animation: 'expandSearch 0.3s ease-out forwards'
            }}
          >
            <div className={SEARCH_INPUT_WRAPPER}>
              <div className={SEARCH_INPUT_ICON_CONTAINER}>
                <FiSearch className={SEARCH_INPUT_ICON} />
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
                  <div className={SEARCH_COUNT_CONTAINER}>
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
