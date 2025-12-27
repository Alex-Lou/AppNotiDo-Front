// src/components/Projects/ProjectFormModal.jsx
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiFolder, FiCheck } from 'react-icons/fi';

const PRESET_COLORS = [
  '#3B82F6', // Bleu
  '#10B981', // Vert
  '#F59E0B', // Orange
  '#EF4444', // Rouge
  '#8B5CF6', // Violet
  '#EC4899', // Rose
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#F97316', // Orange foncé
  '#6366F1', // Indigo
];

function ProjectFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  project = null // null = création, objet = édition
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#3B82F6');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = project !== null;

  useEffect(() => {
    if (project) {
      setName(project.name || '');
      setDescription(project.description || '');
      setColor(project.color || '#3B82F6');
    } else {
      setName('');
      setDescription('');
      setColor('#3B82F6');
    }
  }, [project, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        id: project?.id,
        name: name.trim(),
        description: description.trim(),
        color
      });
      onClose();
    } catch (error) {
      console.error('Error submitting project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-stone-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-stone-700 bg-gradient-to-r from-slate-50 to-cyan-50/50 dark:from-stone-800 dark:to-amber-900/20">
          <h2 className="text-lg font-bold text-slate-800 dark:text-amber-100">
            {isEditing ? 'Modifier le projet' : 'Nouveau projet'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:text-stone-500 dark:hover:text-amber-300 dark:hover:bg-stone-800 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-amber-200 mb-1.5">
              Nom du projet *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Site Web Client"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-slate-800 dark:text-amber-100 placeholder-slate-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-amber-500 transition-all"
              autoFocus
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-amber-200 mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description optionnelle..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-slate-800 dark:text-amber-100 placeholder-slate-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-amber-500 transition-all resize-none"
            />
          </div>

          {/* Couleur */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-amber-200 mb-2">
              Couleur
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((presetColor) => (
                <button
                  key={presetColor}
                  type="button"
                  onClick={() => setColor(presetColor)}
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center transition-all
                    ${color === presetColor 
                      ? 'ring-2 ring-offset-2 ring-slate-400 dark:ring-amber-500 dark:ring-offset-stone-900 scale-110' 
                      : 'hover:scale-110'
                    }
                  `}
                  style={{ backgroundColor: presetColor }}
                >
                  {color === presetColor && (
                    <FiCheck size={16} className="text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 dark:bg-stone-800">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              <FiFolder size={20} className="text-white" />
            </div>
            <div>
              <p className="font-medium text-slate-800 dark:text-amber-100">
                {name || 'Nom du projet'}
              </p>
              <p className="text-xs text-slate-500 dark:text-amber-300/60">
                {description || 'Aucune description'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-stone-600 text-slate-700 dark:text-amber-200 font-medium hover:bg-slate-100 dark:hover:bg-stone-800 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!name.trim() || isSubmitting}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 dark:from-amber-600 dark:to-orange-600 text-white font-medium hover:from-cyan-600 hover:to-teal-600 dark:hover:from-amber-500 dark:hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? 'En cours...' : (isEditing ? 'Enregistrer' : 'Créer')}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default ProjectFormModal;