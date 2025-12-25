// src/components/Dashboard/AddColumnModal.jsx
import { useState } from 'react';
import { 
  FiX, 
  FiPlus, 
  FiTag, 
  FiSearch,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi';
import {
  ADD_COLUMN_MODAL_OVERLAY,
  ADD_COLUMN_MODAL_CONTAINER,
  ADD_COLUMN_MODAL_HEADER,
  ADD_COLUMN_MODAL_TITLE,
  ADD_COLUMN_MODAL_CLOSE,
  ADD_COLUMN_MODAL_CONTENT,
  ADD_COLUMN_MODAL_SEARCH_INPUT,
  ADD_COLUMN_MODAL_SEARCH_ICON,
  ADD_COLUMN_MODAL_TAGS_TITLE,
  ADD_COLUMN_MODAL_TAG_BUTTON,
  ADD_COLUMN_MODAL_TAG_SELECTED,
  ADD_COLUMN_MODAL_TAG_UNSELECTED,
  ADD_COLUMN_MODAL_EMPTY_STATE,
  ADD_COLUMN_MODAL_EMPTY_ICON,
  ADD_COLUMN_MODAL_EMPTY_TEXT,
  ADD_COLUMN_MODAL_EMPTY_SUBTEXT,
  ADD_COLUMN_MODAL_DIVIDER,
  ADD_COLUMN_MODAL_DIVIDER_LINE,
  ADD_COLUMN_MODAL_DIVIDER_LINE_INNER,
  ADD_COLUMN_MODAL_DIVIDER_TEXT,
  ADD_COLUMN_MODAL_DIVIDER_TEXT_INNER,
  ADD_COLUMN_MODAL_NEW_TAG_BUTTON,
  ADD_COLUMN_MODAL_NEW_TAG_INPUT,
  ADD_COLUMN_MODAL_NEW_TAG_SUBMIT,
  ADD_COLUMN_MODAL_FOOTER,
  ADD_COLUMN_MODAL_CANCEL,
  ADD_COLUMN_MODAL_ADD,
  ADD_COLUMN_MODAL_SPINNER
} from '../../constants/styles';

function AddColumnModal({ 
  availableTags, 
  onAddTag, 
  onClose 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');
  const [showNewTagInput, setShowNewTagInput] = useState(false);

  const filteredTags = availableTags.filter(tag =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleAddSelected = async () => {
    if (selectedTags.length === 0) return;
    
    setIsAdding(true);
    
    for (const tag of selectedTags) {
      await onAddTag(tag);
    }
    
    setIsAdding(false);
    onClose();
  };

  const handleAddNewTag = async () => {
    const trimmedTag = newTagInput.trim();
    
    if (!trimmedTag) return;
    if (availableTags.includes(trimmedTag)) {
      toggleTag(trimmedTag);
      setNewTagInput('');
      setShowNewTagInput(false);
      return;
    }
    
    setIsAdding(true);
    await onAddTag(trimmedTag);
    setIsAdding(false);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className={ADD_COLUMN_MODAL_OVERLAY}
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div 
        className={ADD_COLUMN_MODAL_CONTAINER}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={ADD_COLUMN_MODAL_HEADER}>
          <h3 className={ADD_COLUMN_MODAL_TITLE}>
            <FiPlus className="text-cyan-500 dark:text-amber-400" size={18} />
            Ajouter une colonne
          </h3>
          <button onClick={onClose} className={ADD_COLUMN_MODAL_CLOSE}>
            <FiX size={18} />
          </button>
        </div>

        {/* Content */}
        <div className={ADD_COLUMN_MODAL_CONTENT}>
          {/* Barre de recherche */}
          <div className="relative">
            <FiSearch className={ADD_COLUMN_MODAL_SEARCH_ICON} size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un tag..."
              className={ADD_COLUMN_MODAL_SEARCH_INPUT}
              autoFocus
            />
          </div>

          {/* Liste des tags disponibles */}
          {filteredTags.length > 0 ? (
            <div className="space-y-2">
              <p className={ADD_COLUMN_MODAL_TAGS_TITLE}>
                Tags existants ({filteredTags.length})
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {filteredTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      ${ADD_COLUMN_MODAL_TAG_BUTTON}
                      ${selectedTags.includes(tag) 
                        ? ADD_COLUMN_MODAL_TAG_SELECTED 
                        : ADD_COLUMN_MODAL_TAG_UNSELECTED
                      }
                    `}
                  >
                    <FiTag size={12} />
                    {tag}
                    {selectedTags.includes(tag) && <FiCheck size={14} />}
                  </button>
                ))}
              </div>
            </div>
          ) : availableTags.length === 0 ? (
            <div className={ADD_COLUMN_MODAL_EMPTY_STATE}>
              <FiAlertCircle className={ADD_COLUMN_MODAL_EMPTY_ICON} size={28} />
              <p className={ADD_COLUMN_MODAL_EMPTY_TEXT}>
                Aucun tag disponible.
              </p>
              <p className={ADD_COLUMN_MODAL_EMPTY_SUBTEXT}>
                Créez des tags dans vos tâches pour les voir ici.
              </p>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className={ADD_COLUMN_MODAL_EMPTY_TEXT}>
                Aucun tag trouvé pour "{searchQuery}"
              </p>
            </div>
          )}

          {/* Séparateur */}
          <div className={ADD_COLUMN_MODAL_DIVIDER}>
            <div className={ADD_COLUMN_MODAL_DIVIDER_LINE}>
              <div className={ADD_COLUMN_MODAL_DIVIDER_LINE_INNER}></div>
            </div>
            <div className={ADD_COLUMN_MODAL_DIVIDER_TEXT}>
              <span className={ADD_COLUMN_MODAL_DIVIDER_TEXT_INNER}>ou</span>
            </div>
          </div>

          {/* Créer un nouveau tag */}
          {!showNewTagInput ? (
            <button
              onClick={() => setShowNewTagInput(true)}
              className={ADD_COLUMN_MODAL_NEW_TAG_BUTTON}
            >
              <FiPlus size={16} />
              Créer un nouveau tag
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddNewTag();
                  if (e.key === 'Escape') {
                    setShowNewTagInput(false);
                    setNewTagInput('');
                  }
                }}
                placeholder="Nom du nouveau tag..."
                className={ADD_COLUMN_MODAL_NEW_TAG_INPUT}
                autoFocus
              />
              <button
                onClick={handleAddNewTag}
                disabled={!newTagInput.trim() || isAdding}
                className={ADD_COLUMN_MODAL_NEW_TAG_SUBMIT}
              >
                <FiPlus size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={ADD_COLUMN_MODAL_FOOTER}>
          <button 
            onClick={onClose} 
            className={ADD_COLUMN_MODAL_CANCEL} 
            disabled={isAdding}
          >
            Annuler
          </button>
          
          <button
            onClick={handleAddSelected}
            disabled={selectedTags.length === 0 || isAdding}
            className={ADD_COLUMN_MODAL_ADD}
          >
            {isAdding ? (
              <>
                <div className={ADD_COLUMN_MODAL_SPINNER} />
                Ajout...
              </>
            ) : (
              <>
                <FiPlus size={14} />
                Ajouter {selectedTags.length > 0 && `(${selectedTags.length})`}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddColumnModal;