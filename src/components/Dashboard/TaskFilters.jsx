import { useState } from 'react';
import { FiPlus, FiSearch, FiX } from 'react-icons/fi';
import ExportButton from './ExportButton';

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
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4">
        {/* Bouton Nouvelle tâche */}
        <button
          onClick={onNewTask}
          className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-orange-500 px-7 py-3.5 text-base font-bold text-white shadow-lg transition hover:shadow-xl hover:from-cyan-400 hover:via-teal-400 hover:to-orange-400 dark:from-amber-600 dark:via-orange-600 dark:to-rose-600 dark:hover:from-amber-500 dark:hover:via-orange-500 dark:hover:to-rose-500"
        >
          <FiPlus size={20} /> 
          <span>Nouvelle tâche</span>
        </button>

        {/* Zone flexible - Recherche + Export + Filtres */}
        <div className="flex flex-1 items-center justify-end gap-4">
          {/* Recherche compacte ou étendue */}
          {!isSearchExpanded ? (
            <button
              onClick={handleExpandSearch}
              className="group flex items-center gap-2 rounded-xl border-2 border-cyan-400/70 bg-gradient-to-r from-white to-cyan-50/50 px-4 py-3 shadow-md transition-all hover:border-cyan-500 hover:shadow-lg dark:border-stone-700/70 dark:bg-gradient-to-r dark:from-stone-900/80 dark:to-slate-900/80 dark:hover:border-stone-600"
            >
              <FiSearch className="h-5 w-5 text-cyan-600 transition-transform group-hover:scale-110 dark:text-amber-400" />
              <span className="text-sm font-medium text-slate-500 dark:text-amber-300/70">
                Votre tâche ici...
              </span>
            </button>
          ) : (
            <div className="flex-1 animate-expand-search">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <FiSearch className="h-5 w-5 text-cyan-600 dark:text-amber-400" />
                </div>
                
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onBlur={handleCollapseSearch}
                  autoFocus
                  placeholder="Rechercher par titre ou description..."
                  className="w-full rounded-xl border-2 border-cyan-400/70 bg-gradient-to-r from-white to-cyan-50/30 py-3 pl-12 pr-24 text-sm font-medium text-slate-800 placeholder-slate-500 shadow-md outline-none ring-cyan-400/60 transition focus:border-cyan-500 focus:ring-2 dark:border-stone-700/70 dark:bg-gradient-to-r dark:from-stone-900/80 dark:to-slate-900/80 dark:text-amber-50 dark:placeholder-amber-300/50 dark:ring-amber-700/60 dark:focus:border-stone-600"
                />

                {hasSearch && (
                  <>
                    <div className="absolute inset-y-0 right-14 flex items-center">
                      <span className="rounded-full bg-cyan-500 px-2.5 py-1 text-xs font-bold text-white dark:bg-amber-600">
                        {searchResultCount} / {totalCount}
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
            </div>
          )}

          {/* Bouton Export */}
          <ExportButton 
            onExportCSV={onExportCSV}
            onExportPDF={onExportPDF}
          />

          {/* Filtres */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border-2 border-cyan-400/70 bg-gradient-to-br from-cyan-50 to-teal-50 px-5 py-3 text-sm font-bold text-slate-800 shadow-md outline-none ring-cyan-400/60 transition focus:ring-2 hover:border-cyan-500 dark:border-stone-700/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80 dark:text-amber-50 dark:ring-amber-700/60 dark:hover:border-stone-600 [&>option]:bg-white [&>option]:text-slate-800 dark:[&>option]:bg-stone-800 dark:[&>option]:text-amber-50"
          >
            <option value="ALL">📋 Tous les statuts</option>
            <option value="TODO">📝 À faire</option>
            <option value="IN_PROGRESS">⏳ En cours</option>
            <option value="DONE">✅ Terminé</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-xl border-2 border-orange-400/70 bg-gradient-to-br from-orange-50 to-amber-50 px-5 py-3 text-sm font-bold text-slate-800 shadow-md outline-none ring-orange-400/60 transition focus:ring-2 hover:border-orange-500 dark:border-stone-700/70 dark:bg-gradient-to-br dark:from-stone-900/80 dark:to-slate-900/80 dark:text-amber-50 dark:ring-amber-700/60 dark:hover:border-stone-600 [&>option]:bg-white [&>option]:text-slate-800 dark:[&>option]:bg-stone-800 dark:[&>option]:text-amber-50"
          >
            <option value="ALL">🎯 Toutes priorités</option>
            <option value="LOW">🟢 Basse</option>
            <option value="MEDIUM">🟡 Moyenne</option>
            <option value="HIGH">🔴 Haute</option>
          </select>
        </div>
      </div>

      {/* Messages de recherche en dessous */}
      {hasSearch && searchResultCount === 0 && (
        <p className="mt-3 text-sm font-medium text-rose-600 dark:text-rose-400">
          Aucun résultat trouvé pour "{searchQuery}"
        </p>
      )}

      {hasSearch && searchResultCount > 0 && (
        <p className="mt-3 text-sm font-medium text-slate-600 dark:text-amber-300/80">
          {searchResultCount} tâche{searchResultCount > 1 ? 's' : ''} trouvée{searchResultCount > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}

export default TaskFilters;