// src/components/Dashboard/TaskFilters.jsx
import { useState } from 'react';
import { FiPlus, FiSearch, FiX, FiList, FiGrid, FiColumns, FiCalendar } from 'react-icons/fi';
import ExportButton from './ExportButton';
import FilterSelect from '../ui/FilterSelect';
import { 
  TASK_FILTERS_CONTAINER,
  FILTERS_ROW_TOP,
  FILTERS_ROW_BOTTOM,
  FILTERS_GROUP,
  NEW_TASK_BUTTON,
  TASK_FILTERS_SEARCH_CONTAINER,
  SEARCH_COMPACT_BUTTON,
  TASK_FILTERS_COMPACT_ICON,
  TASK_FILTERS_COMPACT_TEXT,
  TASK_FILTERS_SEARCH_EXPANDED,
  TASK_FILTERS_SEARCH_INPUT_WRAPPER,
  TASK_FILTERS_SEARCH_ICON_CONTAINER,
  TASK_FILTERS_SEARCH_ICON,
  SEARCH_INPUT,
  TASK_FILTERS_COUNT_CONTAINER,
  SEARCH_COUNT_BADGE,
  SEARCH_CLEAR_BUTTON,
  TASK_FILTERS_CLEAR_ICON,
  SEARCH_NO_RESULTS,
  SEARCH_RESULTS_INFO,
  VIEW_SWITCHER_CONTAINER,
  VIEW_SWITCHER_BUTTON,
  VIEW_SWITCHER_BUTTON_ACTIVE
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

const viewModes = [
  { value: 'list', icon: FiList, label: 'Liste' },
  { value: 'kanban', icon: FiColumns, label: 'Kanban' },
  { value: 'grid', icon: FiGrid, label: 'Grille' },
  { value: 'calendar', icon: FiCalendar, label: 'Calendrier' }
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
  onExportPDF,
  viewMode,
  setViewMode
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
      {/* LIGNE 1 : Bouton nouvelle tâche + View Switcher + Recherche */}
      <div className={FILTERS_ROW_TOP}>
        {/* Bouton Nouvelle tâche */}
        <button onClick={onNewTask} className={NEW_TASK_BUTTON}>
          <FiPlus size={20} /> 
          <span>Nouvelle tâche</span>
        </button>

        {/* View Switcher */}
        <div className={VIEW_SWITCHER_CONTAINER}>
          {viewModes.map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              onClick={() => setViewMode(value)}
              className={`${VIEW_SWITCHER_BUTTON} ${viewMode === value ? VIEW_SWITCHER_BUTTON_ACTIVE : ''}`}
              title={label}
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Recherche compacte ou étendue */}
        <div className={TASK_FILTERS_SEARCH_CONTAINER}>
          {!isSearchExpanded ? (
            <button onClick={handleExpandSearch} className={SEARCH_COMPACT_BUTTON}>
              <FiSearch className={TASK_FILTERS_COMPACT_ICON} />
              <span className={TASK_FILTERS_COMPACT_TEXT}>
                Votre tâche ici...
              </span>
            </button>
          ) : (
            <div className={TASK_FILTERS_SEARCH_EXPANDED}>
              <div className={TASK_FILTERS_SEARCH_INPUT_WRAPPER}>
                <div className={TASK_FILTERS_SEARCH_ICON_CONTAINER}>
                  <FiSearch className={TASK_FILTERS_SEARCH_ICON} />
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
                    <div className={TASK_FILTERS_COUNT_CONTAINER}>
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
                      <FiX size={18} className={TASK_FILTERS_CLEAR_ICON} />
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