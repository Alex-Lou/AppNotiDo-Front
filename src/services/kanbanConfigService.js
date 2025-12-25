// src/services/kanbanConfigService.js
import api from './api';

const kanbanConfigService = {
  getConfig: async () => {
    const response = await api.get('/kanban-config');
    return response.data;
  },

  saveConfig: async (config) => {
    const response = await api.put('/kanban-config', config);
    return response.data;
  },

  addTagColumn: async (tag) => {
    const response = await api.post(`/kanban-config/tags/${encodeURIComponent(tag)}`);
    return response.data;
  },

  removeTagColumn: async (tag) => {
    const response = await api.delete(`/kanban-config/tags/${encodeURIComponent(tag)}`);
    return response.data;
  },

  toggleStatusColumn: async (status) => {
    const response = await api.patch(`/kanban-config/status/${status}/toggle`);
    return response.data;
  },

  resetConfig: async () => {
    const response = await api.post('/kanban-config/reset');
    return response.data;
  }
};

export default kanbanConfigService;