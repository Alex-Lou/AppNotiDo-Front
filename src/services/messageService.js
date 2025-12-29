import api from './api';

const messageService = {
    // Récupérer tous mes messages
    getAllMessages: async () => {
        const response = await api.get('/messages');
        return response.data;
    },

    // Récupérer les messages non lus
    getUnreadMessages: async () => {
        const response = await api.get('/messages/unread');
        return response.data;
    },

    // Compter les messages non lus
    countUnread: async () => {
        const response = await api.get('/messages/count');
        return response.data.count;
    },

    // Marquer un message comme lu
    markAsRead: async (messageId) => {
        const response = await api.put(`/messages/${messageId}/read`);
        return response.data;
    },

    // Marquer tous comme lus
    markAllAsRead: async () => {
        await api.put('/messages/read-all');
    },

    // Supprimer un message
    deleteMessage: async (messageId) => {
        await api.delete(`/messages/${messageId}`);
    },

    // Supprimer tous mes messages
    deleteAllMessages: async () => {
        await api.delete('/messages');
    }
};

export default messageService;