import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Users, UserPlus, Crown, Shield, User, Eye, X, Check, Loader2 } from 'lucide-react';
import projectMemberService from '../../services/projectMemberService';
import * as styles from '../../constants/styles/projectMember';

const ROLE_CONFIG = {
    OWNER: { label: 'Propriétaire', icon: Crown, color: 'text-amber-500' },
    ADMIN: { label: 'Admin', icon: Shield, color: 'text-violet-500' },
    MEMBER: { label: 'Membre', icon: User, color: 'text-blue-500' },
    VIEWER: { label: 'Lecteur', icon: Eye, color: 'text-gray-500' }
};

const STATUS_CONFIG = {
    ACTIVE: { label: 'Actif', bg: 'bg-emerald-500' },
    PENDING: { label: 'En attente', bg: 'bg-amber-500' },
    DECLINED: { label: 'Refusé', bg: 'bg-red-500' },
    REMOVED: { label: 'Retiré', bg: 'bg-gray-500' }
};

const ProjectMembers = ({ projectId, currentUserRole, onClose }) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showInviteForm, setShowInviteForm] = useState(false);
    const [inviteData, setInviteData] = useState({ usernameOrEmail: '', role: 'MEMBER' });
    const [inviting, setInviting] = useState(false);

    const canManageMembers = currentUserRole === 'OWNER' || currentUserRole === 'ADMIN';
    const isOwner = currentUserRole === 'OWNER';

    useEffect(() => {
        loadMembers();
    }, [projectId]);

    const loadMembers = async () => {
        try {
            setLoading(true);
            const data = await projectMemberService.getProjectMembers(projectId);
            setMembers(data);
            setError(null);
        } catch (err) {
            setError('Erreur lors du chargement des membres');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInvite = async (e) => {
        e.preventDefault();
        if (!inviteData.usernameOrEmail.trim()) return;

        try {
            setInviting(true);
            await projectMemberService.inviteMember(projectId, inviteData.usernameOrEmail, inviteData.role);
            setInviteData({ usernameOrEmail: '', role: 'MEMBER' });
            setShowInviteForm(false);
            await loadMembers();
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de l'invitation");
        } finally {
            setInviting(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await projectMemberService.updateMemberRole(projectId, userId, newRole);
            await loadMembers();
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors du changement de rôle');
        }
    };

    const handleRemoveMember = async (userId, username) => {
        if (!window.confirm(`Retirer ${username} du projet ?`)) return;

        try {
            await projectMemberService.removeMember(projectId, userId);
            await loadMembers();
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors du retrait du membre');
        }
    };

    const handleTransferOwnership = async (userId, username) => {
        if (!window.confirm(`Transférer la propriété à ${username} ? Vous deviendrez Admin.`)) return;

        try {
            await projectMemberService.transferOwnership(projectId, userId);
            await loadMembers();
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors du transfert');
        }
    };

    // Contenu de la modal
    const modalContent = (
        <div className={styles.MEMBERS_MODAL_OVERLAY} onClick={onClose}>
            <div className={styles.MEMBERS_MODAL_CONTENT} onClick={(e) => e.stopPropagation()}>
                {loading ? (
                    <div className={styles.LOADING_STATE}>
                        <Loader2 className={styles.SPIN_ANIMATION} size={24} />
                        <span>Chargement...</span>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className={styles.MEMBERS_HEADER}>
                            <div className={styles.MEMBERS_HEADER_TITLE}>
                                <Users size={18} />
                                <span>Membres du projet</span>
                                <span className={styles.MEMBERS_COUNT_BADGE}>
                                    {members.filter(m => m.status === 'ACTIVE').length}
                                </span>
                            </div>
                            <button className={styles.MEMBERS_CLOSE_BTN} onClick={onClose}>
                                <X size={18} />
                            </button>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className={styles.MEMBERS_ERROR}>
                                <span>{error}</span>
                                <button onClick={() => setError(null)} className="font-bold text-lg leading-none">×</button>
                            </div>
                        )}

                        {/* Invite Section */}
                        {canManageMembers && (
                            <div className={styles.INVITE_SECTION}>
                                {!showInviteForm ? (
                                    <button className={styles.INVITE_BTN} onClick={() => setShowInviteForm(true)}>
                                        <UserPlus size={16} />
                                        Inviter un membre
                                    </button>
                                ) : (
                                    <form onSubmit={handleInvite} className={styles.INVITE_FORM}>
                                        <div className={styles.INVITE_INPUTS}>
                                            <input
                                                type="text"
                                                placeholder="Username ou email"
                                                value={inviteData.usernameOrEmail}
                                                onChange={(e) => setInviteData({ ...inviteData, usernameOrEmail: e.target.value })}
                                                className={styles.INVITE_INPUT}
                                                autoFocus
                                            />
                                            <select
                                                value={inviteData.role}
                                                onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                                                className={styles.INVITE_SELECT}
                                            >
                                                <option value="MEMBER">Membre</option>
                                                <option value="ADMIN">Admin</option>
                                                <option value="VIEWER">Lecteur</option>
                                            </select>
                                        </div>
                                        <div className={styles.INVITE_ACTIONS}>
                                            <button
                                                type="button"
                                                className={styles.INVITE_CANCEL_BTN}
                                                onClick={() => setShowInviteForm(false)}
                                            >
                                                Annuler
                                            </button>
                                            <button
                                                type="submit"
                                                className={styles.INVITE_CONFIRM_BTN}
                                                disabled={inviting}
                                            >
                                                {inviting ? <Loader2 className={styles.SPIN_ANIMATION} size={14} /> : <Check size={14} />}
                                                Inviter
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        )}

                        {/* Members List */}
                        <div className={styles.MEMBERS_LIST}>
                            {members.map((member) => {
                                const roleConfig = ROLE_CONFIG[member.role];
                                const statusConfig = STATUS_CONFIG[member.status];
                                const RoleIcon = roleConfig.icon;
                                const showActions = canManageMembers && member.role !== 'OWNER';

                                return (
                                    <div
                                        key={member.id}
                                        className={`${styles.MEMBER_ITEM} ${member.status !== 'ACTIVE' ? styles.MEMBER_ITEM_INACTIVE : ''}`}
                                    >
                                        {/* Ligne 1 : Avatar + Info + Role */}
                                        <div className={styles.MEMBER_ROW_TOP}>
                                            <div className={styles.MEMBER_AVATAR}>
                                                {member.displayName?.charAt(0).toUpperCase() || member.username.charAt(0).toUpperCase()}
                                            </div>

                                            <div className={styles.MEMBER_INFO}>
                                                <div className={styles.MEMBER_NAME}>
                                                    {member.displayName || member.username}
                                                    {member.status === 'PENDING' && (
                                                        <span className={`${styles.MEMBER_STATUS_BADGE} ${statusConfig.bg}`}>
                                                            En attente
                                                        </span>
                                                    )}
                                                </div>
                                                <div className={styles.MEMBER_EMAIL}>
                                                    {member.email}
                                                </div>
                                            </div>

                                            <div className={`${styles.MEMBER_ROLE} ${roleConfig.color}`} title={roleConfig.label}>
                                                <RoleIcon size={14} />
                                            </div>
                                        </div>

                                        {/* Ligne 2 : Actions */}
                                        {showActions && (
                                            <div className={styles.MEMBER_ACTIONS}>
                                                {member.status === 'ACTIVE' && isOwner && (
                                                    <select
                                                        value={member.role}
                                                        onChange={(e) => handleRoleChange(member.userId, e.target.value)}
                                                        className={styles.ROLE_SELECT}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <option value="ADMIN">Admin</option>
                                                        <option value="MEMBER">Membre</option>
                                                        <option value="VIEWER">Lecteur</option>
                                                    </select>
                                                )}

                                                {member.status === 'ACTIVE' && isOwner && (
                                                    <button
                                                        className={styles.TRANSFER_BTN}
                                                        onClick={() => handleTransferOwnership(member.userId, member.username)}
                                                        title="Transférer la propriété"
                                                    >
                                                        <Crown size={14} />
                                                    </button>
                                                )}

                                                <button
                                                    className={styles.REMOVE_BTN}
                                                    onClick={() => handleRemoveMember(member.userId, member.username)}
                                                    title={member.status === 'PENDING' ? "Annuler l'invitation" : 'Retirer du projet'}
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {members.length === 0 && (
                                <div className={styles.LOADING_STATE}>
                                    <Users size={24} className="text-slate-400 dark:text-amber-400/50" />
                                    <span>Aucun membre</span>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    // ✅ PORTAL : Rendre la modal à la racine du DOM
    return createPortal(modalContent, document.body);
};

export default ProjectMembers;