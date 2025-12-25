// src/hooks/useKanbanConfig.js
import { useState, useEffect, useCallback } from 'react';
import kanbanConfigService from '../services/kanbanConfigService';

const DEFAULT_CONFIG = {
  visibleStatusColumns: ['TODO', 'IN_PROGRESS', 'DONE'],
  activeTagColumns: [],
  columnsOrder: ['TODO', 'IN_PROGRESS', 'DONE']
};

const STATUS_COLUMNS = [
  { id: 'TODO', title: '📝 À faire', type: 'status', color: 'cyan' },
  { id: 'IN_PROGRESS', title: '⏳ En cours', type: 'status', color: 'amber' },
  { id: 'DONE', title: '✅ Terminé', type: 'status', color: 'emerald' }
];

export const useKanbanConfig = (tasks = []) => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const extractAllTags = useCallback(() => {
    const tagsSet = new Set();
    
    tasks.forEach(task => {
      if (task.tags) {
        const taskTags = Array.isArray(task.tags) 
          ? task.tags 
          : task.tags.split(',').map(t => t.trim()).filter(Boolean);
        
        taskTags.forEach(tag => tagsSet.add(tag));
      }
    });
    
    return Array.from(tagsSet).sort();
  }, [tasks]);

  const availableTags = extractAllTags().filter(
    tag => !config.activeTagColumns.includes(tag)
  );

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await kanbanConfigService.getConfig();
      setConfig(data);
    } catch (err) {
      console.error('Erreur chargement config Kanban:', err);
      setError(err);
      setConfig(DEFAULT_CONFIG);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const addTagColumn = async (tag) => {
    try {
      const newConfig = await kanbanConfigService.addTagColumn(tag);
      setConfig(newConfig);
      return true;
    } catch (err) {
      console.error('Erreur ajout colonne tag:', err);
      setError(err);
      return false;
    }
  };

  const removeTagColumn = async (tag) => {
    try {
      const newConfig = await kanbanConfigService.removeTagColumn(tag);
      setConfig(newConfig);
      return true;
    } catch (err) {
      console.error('Erreur suppression colonne tag:', err);
      setError(err);
      return false;
    }
  };

  const toggleStatusColumn = async (status) => {
    try {
      const newConfig = await kanbanConfigService.toggleStatusColumn(status);
      setConfig(newConfig);
      return true;
    } catch (err) {
      console.error('Erreur toggle colonne status:', err);
      setError(err);
      return false;
    }
  };

  const resetConfig = async () => {
    try {
      const newConfig = await kanbanConfigService.resetConfig();
      setConfig(newConfig);
      return true;
    } catch (err) {
      console.error('Erreur reset config:', err);
      setError(err);
      return false;
    }
  };

  const saveColumnsOrder = async (newOrder) => {
    try {
      const newConfig = await kanbanConfigService.saveConfig({
        ...config,
        columnsOrder: newOrder
      });
      setConfig(newConfig);
      return true;
    } catch (err) {
      console.error('Erreur sauvegarde ordre colonnes:', err);
      setError(err);
      return false;
    }
  };

  const getVisibleColumns = useCallback(() => {
    const columns = [];

    STATUS_COLUMNS.forEach(statusCol => {
      if (config.visibleStatusColumns.includes(statusCol.id)) {
        columns.push({
          ...statusCol,
          isVisible: true,
          canHide: config.visibleStatusColumns.length > 1,
          canDelete: false
        });
      }
    });

    config.activeTagColumns.forEach(tag => {
      columns.push({
        id: `tag_${tag}`,
        tagValue: tag,
        title: `🏷️ ${tag}`,
        type: 'tag',
        color: 'purple',
        isVisible: true,
        canHide: false,
        canDelete: true
      });
    });

    if (config.columnsOrder && config.columnsOrder.length > 0) {
      columns.sort((a, b) => {
        const aKey = a.type === 'tag' ? a.tagValue : a.id;
        const bKey = b.type === 'tag' ? b.tagValue : b.id;
        const aIndex = config.columnsOrder.indexOf(aKey);
        const bIndex = config.columnsOrder.indexOf(bKey);
        
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        
        return aIndex - bIndex;
      });
    }

    return columns;
  }, [config]);

  const getTasksForColumn = useCallback((column, allTasks) => {
    if (column.type === 'status') {
      return allTasks.filter(task => task.status === column.id);
    }
    
    if (column.type === 'tag') {
      return allTasks.filter(task => {
        if (!task.tags) return false;
        
        const taskTags = Array.isArray(task.tags) 
          ? task.tags 
          : task.tags.split(',').map(t => t.trim()).filter(Boolean);
        
        return taskTags.includes(column.tagValue);
      });
    }
    
    return [];
  }, []);

  const hiddenStatusColumns = STATUS_COLUMNS.filter(
    col => !config.visibleStatusColumns.includes(col.id)
  );

  return {
    config,
    loading,
    error,
    visibleColumns: getVisibleColumns(),
    hiddenStatusColumns,
    statusColumns: STATUS_COLUMNS,
    allTags: extractAllTags(),
    availableTags,
    activeTagColumns: config.activeTagColumns,
    addTagColumn,
    removeTagColumn,
    toggleStatusColumn,
    resetConfig,
    saveColumnsOrder,
    refreshConfig: fetchConfig,
    getTasksForColumn
  };
};