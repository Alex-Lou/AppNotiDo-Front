import api from './api';

const projectMemberService = {
    // Récupérer tous les membres d'un projet
    getProjectMembers: async (projectId) => {
        const response = await api.get(`/projects/${projectId}/members`);
        return response.data;
    },

    // Récupérer les membres actifs uniquement
    getActiveMembers: async (projectId) => {
        const response = await api.get(`/projects/${projectId}/members/active`);
        return response.data;
    },

    // Inviter un membre
    inviteMember: async (projectId, usernameOrEmail, role = 'MEMBER') => {
        const response = await api.post(`/projects/${projectId}/members`, {
            usernameOrEmail,
            role
        });
        return response.data;
    },

    // Modifier le rôle d'un membre
    updateMemberRole: async (projectId, userId, role) => {
        const response = await api.put(`/projects/${projectId}/members/${userId}/role`, {
            role
        });
        return response.data;
    },

    // Retirer un membre
    removeMember: async (projectId, userId) => {
        await api.delete(`/projects/${projectId}/members/${userId}`);
    },

    // Transférer la propriété
    transferOwnership: async (projectId, newOwnerId) => {
        await api.post(`/projects/${projectId}/members/transfer-ownership`, {
            newOwnerId
        });
    },

    // Récupérer mes invitations en attente
    getMyPendingInvitations: async () => {
        const response = await api.get('/invitations');
        return response.data;
    },

    // Accepter une invitation
    acceptInvitation: async (memberId) => {
        const response = await api.post(`/invitations/${memberId}/accept`);
        return response.data;
    },

    // Refuser une invitation
    declineInvitation: async (memberId) => {
        await api.post(`/invitations/${memberId}/decline`);
    }
};

export default projectMemberService;