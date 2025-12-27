// src/components/Sidebar/ProjectList.jsx
import { useState } from 'react';
import { 
  FiFolder, 
  FiPlus, 
  FiChevronDown, 
  FiChevronRight,
  FiMoreHorizontal,
  FiEdit2,
  FiArchive,
  FiTrash2,
  FiLayers
} from 'react-icons/fi';

function ProjectList({ 
  projects, 
  activeProject, 
  onSelectProject, 
  onCreateProject,
  onEditProject,
  onArchiveProject,
  onDeleteProject,
  loading 
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const handleProjectClick = (project) => {
    // Si on clique sur le projet actif, on désélectionne (affiche toutes les tâches)
    if (activeProject?.id === project.id) {
      onSelectProject(null);
    } else {
      onSelectProject(project);
    }
    setMenuOpenId(null);
  };

  const handleMenuToggle = (e, projectId) => {
    e.stopPropagation();
    setMenuOpenId(menuOpenId === projectId ? null : projectId);
  };

  const handleEdit = (e, project) => {
    e.stopPropagation();
    onEditProject(project);
    setMenuOpenId(null);
  };

  const handleArchive = (e, project) => {
    e.stopPropagation();
    if (confirm(`Archiver le projet "${project.name}" ?`)) {
      onArchiveProject(project.id);
    }
    setMenuOpenId(null);
  };

  const handleDelete = (e, project) => {
    e.stopPropagation();
    if (confirm(`Supprimer le projet "${project.name}" ? Les tâches seront conservées.`)) {
      onDeleteProject(project.id);
    }
    setMenuOpenId(null);
  };

  return (
    <div className="mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-amber-400/70 hover:text-slate-700 dark:hover:text-amber-300 transition-colors"
        >
          {isExpanded ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
          Projets
        </button>
        <button
          onClick={onCreateProject}
          className="p-1 rounded-lg text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 dark:text-stone-500 dark:hover:text-amber-400 dark:hover:bg-amber-900/30 transition-colors"
          title="Nouveau projet"
        >
          <FiPlus size={16} />
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-1 pr-1">
          {/* Option "Tous" */}
          <div
            onClick={() => onSelectProject(null)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
              ${activeProject === null
                ? 'bg-cyan-100/80 text-cyan-800 dark:bg-amber-900/40 dark:text-amber-200'
                : 'text-slate-600 hover:bg-slate-100/70 dark:text-amber-200/70 dark:hover:bg-stone-800/50'
              }
            `}
          >
            <FiLayers size={16} className="flex-shrink-0" />
            <span className="flex-1 text-left">Tous les projets</span>
          </div>

          {/* Séparateur visuel */}
          {projects.length > 0 && (
            <div className="h-px bg-slate-300/50 dark:bg-stone-700/50 mx-2 my-2" />
          )}

          {/* Liste des projets */}
          {loading ? (
            <div className="px-3 py-2 text-xs text-slate-400 dark:text-stone-500">
              Chargement...
            </div>
          ) : projects.length === 0 ? (
            <div className="px-3 py-2 text-xs text-slate-400 dark:text-stone-500 italic">
              Aucun projet • <button onClick={onCreateProject} className="text-cyan-600 dark:text-amber-400 hover:underline">Créer</button>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="relative">
                <div
                  onClick={() => handleProjectClick(project)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all group cursor-pointer
                    ${activeProject?.id === project.id
                      ? 'bg-cyan-100/80 text-cyan-800 dark:bg-amber-900/40 dark:text-amber-200'
                      : 'text-slate-600 hover:bg-slate-100/70 dark:text-amber-200/70 dark:hover:bg-stone-800/50'
                    }
                  `}
                >
                  {/* Icône colorée */}
                  <div 
                    className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: project.color || '#3B82F6' }}
                  >
                    <FiFolder size={10} className="text-white" />
                  </div>
                  
                  {/* Nom du projet */}
                  <span className="flex-1 text-left truncate">{project.name}</span>
                  
                  {/* Compteur de tâches */}
                  {project.pendingTaskCount > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-200/80 text-slate-600 dark:bg-stone-700/80 dark:text-amber-300">
                      {project.pendingTaskCount}
                    </span>
                  )}

                  {/* Menu */}
                  <button
                    onClick={(e) => handleMenuToggle(e, project.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-200 dark:hover:bg-stone-700 transition-all"
                  >
                    <FiMoreHorizontal size={14} />
                  </button>
                </div>

                {/* Dropdown menu */}
                {menuOpenId === project.id && (
                  <div className="absolute right-2 top-full mt-1 z-50 w-36 bg-white dark:bg-stone-800 rounded-lg shadow-xl border border-slate-200 dark:border-stone-700 py-1">
                    <button
                      onClick={(e) => handleEdit(e, project)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-amber-200 hover:bg-slate-100 dark:hover:bg-stone-700"
                    >
                      <FiEdit2 size={14} />
                      Modifier
                    </button>
                    <button
                      onClick={(e) => handleArchive(e, project)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-amber-200 hover:bg-slate-100 dark:hover:bg-stone-700"
                    >
                      <FiArchive size={14} />
                      Archiver
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, project)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30"
                    >
                      <FiTrash2 size={14} />
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectList;