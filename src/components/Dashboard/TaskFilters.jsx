// src/components/Dashboard/TaskFilters.jsx
import { useState } from 'react';
import { FiPlus, FiSearch, FiX } from 'react-icons/fi';
import ExportButton from './ExportButton';
import FilterSelect from '../ui/FilterSelect';
import { 
  TASK_FILTERS_CONTAINER,
  FILTERS_ROW_TOP,
  FILTERS_ROW_BOTTOM,
  FILTERS_GROUP,
  NEW_TASK_BUTTON,
  SEARCH_COMPACT_BUTTON,
  SEARCH_INPUT,
  SEARCH_COUNT_BADGE,
  SEARCH_CLEAR_BUTTON,
  SEARCH_NO_RESULTS,
  SEARCH_RESULTS_INFO
} from '../../constants/styles';

const statusOptions = [
  { value: 'ALL', label: '📋 Tous les statuts' },
  { value: 'TODO', label: '📝 À faire' },
  { value: 'IN_PROGRESS', label: '⏳ En cours' },
  { value: 'DONE', label: '✅ Terminé' }
];

const priorityOptions = [
  { value: 'ALL', label: '🎯 Toutes priorités' },
  { value: 'LOW', label: '🟢 Basse' },
  { value: 'MEDIUM', label: '🟡 Moyenne' },
  { value: 'HIGH', label: '🔴 Haute' }
];

function TaskFilters({ 
  statusFilter, 
  setStatusFilter, 
  priorityFilter, 
  setPriorityFilter,
  onNewTask,
  searchQuery,
  onSearchChange,
  onClearSearch,
  searchResultCount,
  totalCount,
  onExportCSV,
  onExportPDF
}) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const hasSearch = searchQuery.trim().length > 0;

  const handleExpandSearch = () => {
    setIsSearchExpanded(true);
  };

  const handleCollapseSearch = () => {
    if (!hasSearch) {
      setIsSearchExpanded(false);
    }
  };

  const handleClear = () => {
    onClearSearch();
    setIsSearchExpanded(false);
  };

  return (
    <div className={TASK_FILTERS_CONTAINER}>
      {/* LIGNE 1 : Bouton nouvelle tâche + Recherche */}
      <div className={FILTERS_ROW_TOP}>
        {/* Bouton Nouvelle tâche */}
        <button onClick={onNewTask} className={NEW_TASK_BUTTON}>
          <FiPlus size={20} /> 
          <span>Nouvelle tâche</span>
        </button>

        {/* Recherche compacte ou étendue */}
        <div className="w-full sm:flex-1 sm:max-w-md">
          {!isSearchExpanded ? (
            <button onClick={handleExpandSearch} className={SEARCH_COMPACT_BUTTON}>
              <FiSearch className="h-5 w-5 text-cyan-600 transition-transform group-hover:scale-110 dark:text-amber-400" />
              <span className="text-sm font-medium text-slate-500 dark:text-amber-300/70">
                Votre tâche ici...
              </span>
            </button>
          ) : (
            <div className="animate-expand-search">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4">
                  <FiSearch className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-600 dark:text-amber-400" />
                </div>
                
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onBlur={handleCollapseSearch}
                  autoFocus
                  placeholder="Rechercher..."
                  className={SEARCH_INPUT}
                />

                {hasSearch && (
                  <>
                    <div className="absolute inset-y-0 right-12 sm:right-14 flex items-center">
                      <span className={SEARCH_COUNT_BADGE}>
                        {searchResultCount} / {totalCount}
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
                      <FiX size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LIGNE 2 : Filtres + Export */}
      <div className={FILTERS_ROW_BOTTOM}>
        {/* Filtres */}
        <div className={FILTERS_GROUP}>
          <FilterSelect
            variant="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
          />

          <FilterSelect
            variant="priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            options={priorityOptions}
          />
        </div>

        {/* Bouton Export */}
        <ExportButton 
          onExportCSV={onExportCSV}
          onExportPDF={onExportPDF}
        />
      </div>

      {/* Messages de recherche en dessous */}
      {hasSearch && searchResultCount === 0 && (
        <p className={SEARCH_NO_RESULTS}>
          Aucun résultat trouvé pour "{searchQuery}"
        </p>
      )}

      {hasSearch && searchResultCount > 0 && (
        <p className={SEARCH_RESULTS_INFO}>
          {searchResultCount} tâche{searchResultCount > 1 ? 's' : ''} trouvée{searchResultCount > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}

export default TaskFilters;