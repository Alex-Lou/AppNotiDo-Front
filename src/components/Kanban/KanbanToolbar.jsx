// src/components/Kanban/KanbanToolbar.jsx
import { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import {
  KANBAN_TOOLBAR,
  KANBAN_TOOLBAR_LEFT,
  KANBAN_TOOLBAR_BUTTON,
  KANBAN_TOOLBAR_BUTTON_DEFAULT,
  KANBAN_DROPDOWN_MENU,
  KANBAN_DROPDOWN_ITEM,
  KANBAN_DROPDOWN_ITEM_DEFAULT
} from '../../constants/styles';

function KanbanToolbar({ 
  hiddenStatusColumns,
  onToggleStatusColumn
}) {
  const [showHiddenColumnsMenu, setShowHiddenColumnsMenu] = useState(false);

  // Ne rien afficher si pas de colonnes masquées
  if (hiddenStatusColumns.length === 0) {
    return null;
  }

  return (
    <div className={KANBAN_TOOLBAR}>
      <div className={KANBAN_TOOLBAR_LEFT}>
        {/* Bouton pour afficher les colonnes masquées */}
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
      </div>
    </div>
  );
}

export default KanbanToolbar;