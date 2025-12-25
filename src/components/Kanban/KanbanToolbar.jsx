// src/components/Kanban/KanbanToolbar.jsx
import { useState } from 'react';
import { 
  FiPlus,
  FiEye,
  FiRefreshCw
} from 'react-icons/fi';
import {
  KANBAN_TOOLBAR,
  KANBAN_TOOLBAR_LEFT,
  KANBAN_TOOLBAR_BUTTON,
  KANBAN_TOOLBAR_BUTTON_DEFAULT,
  KANBAN_TOOLBAR_BUTTON_GHOST,
  KANBAN_TOOLBAR_BUTTON_PRIMARY,
  KANBAN_DROPDOWN_MENU,
  KANBAN_DROPDOWN_ITEM,
  KANBAN_DROPDOWN_ITEM_DEFAULT
} from '../../constants/styles';

function KanbanToolbar({ 
  hiddenStatusColumns,
  onToggleStatusColumn,
  onResetConfig,
  onAddColumnClick
}) {
  const [showHiddenColumnsMenu, setShowHiddenColumnsMenu] = useState(false);

  return (
    <div className={KANBAN_TOOLBAR}>
      <div className={KANBAN_TOOLBAR_LEFT}>
        {/* Bouton pour afficher les colonnes masquées */}
        {hiddenStatusColumns.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowHiddenColumnsMenu(!showHiddenColumnsMenu)}
              className={`${KANBAN_TOOLBAR_BUTTON} ${KANBAN_TOOLBAR_BUTTON_DEFAULT}`}
            >
              <FiEye size={14} />
              <span className="hidden xs:inline">Masquées</span>
              <span>({hiddenStatusColumns.length})</span>
            </button>

            {showHiddenColumnsMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowHiddenColumnsMenu(false)} 
                />
                <div className={KANBAN_DROPDOWN_MENU}>
                  {hiddenStatusColumns.map(col => (
                    <button
                      key={col.id}
                      onClick={() => {
                        onToggleStatusColumn(col.id);
                        setShowHiddenColumnsMenu(false);
                      }}
                      className={`${KANBAN_DROPDOWN_ITEM} ${KANBAN_DROPDOWN_ITEM_DEFAULT}`}
                    >
                      <FiEye size={14} />
                      {col.title}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Bouton reset */}
        <button
          onClick={onResetConfig}
          className={`${KANBAN_TOOLBAR_BUTTON} ${KANBAN_TOOLBAR_BUTTON_GHOST}`}
          title="Réinitialiser les colonnes"
        >
          <FiRefreshCw size={14} />
        </button>
      </div>

      {/* Bouton ajouter colonne */}
      <button
        onClick={onAddColumnClick}
        className={`${KANBAN_TOOLBAR_BUTTON} ${KANBAN_TOOLBAR_BUTTON_PRIMARY}`}
      >
        <FiPlus size={14} />
        <span className="hidden sm:inline">Ajouter colonne</span>
        <span className="sm:hidden">Colonne</span>
      </button>
    </div>
  );
}

export default KanbanToolbar;