import React, { useState, useEffect } from 'react';
import { Mail, Check, X, Loader2, Users, Crown, Shield, User, Eye } from 'lucide-react';
import projectMemberService from '../../services/projectMemberService';
import * as styles from '../../constants/styles/projectMembers';

const ROLE_CONFIG = {
    OWNER: { label: 'Propriétaire', icon: Crown, color: 'text-amber-500' },
    ADMIN: { label: 'Admin', icon: Shield, color: 'text-violet-500' },
    MEMBER: { label: 'Membre', icon: User, color: 'text-blue-500' },
    VIEWER: { label: 'Lecteur', icon: Eye, color: 'text-gray-500' }
};

const Invitations = ({ onClose, onInvitationAccepted }) => {
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        loadInvitations();
    }, []);

    const loadInvitations = async () => {
        try {
            setLoading(true);
            const data = await projectMemberService.getMyPendingInvitations();
            setInvitations(data);
            setError(null);
        } catch (err) {
            setError('Erreur lors du chargement des invitations');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (memberId) => {
        try {
            setProcessingId(memberId);
            await projectMemberService.acceptInvitation(memberId);
            await loadInvitations();
            if (onInvitationAccepted) onInvitationAccepted();
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de l'acceptation");
        } finally {
            setProcessingId(null);
        }
    };

    const handleDecline = async (memberId) => {
        try {
            setProcessingId(memberId);
            await projectMemberService.declineInvitation(memberId);
            await loadInvitations();
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors du refus');
        } finally {
            setProcessingId(null);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).format(date);
    };

    if (loading) {
        return (
            <div className={styles.MEMBERS_MODAL_OVERLAY}>
                <div className={styles.MEMBERS_MODAL_CONTENT}>
                    <div className={styles.LOADING_STATE}>
                        <Loader2 className={styles.SPIN_ANIMATION} size={24} />
                        <span>Chargement des invitations...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.MEMBERS_MODAL_OVERLAY} onClick={onClose}>
            <div className={styles.MEMBERS_MODAL_CONTENT} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className={styles.MEMBERS_HEADER}>
                    <div className={styles.MEMBERS_HEADER_TITLE}>
                        <Mail size={20} />
                        <h3>Mes invitations</h3>
                        {invitations.length > 0 && (
                            <span className={styles.MEMBERS_COUNT_BADGE}>
                                {invitations.length}
                            </span>
                        )}
                    </div>
                    <button className={styles.MEMBERS_CLOSE_BTN} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className={styles.MEMBERS_ERROR}>
                        <span>{error}</span>
                        <button onClick={() => setError(null)}>×</button>
                    </div>
                )}

                {/* Invitations List */}
                <div className={styles.MEMBERS_LIST}>
                    {invitations.length === 0 ? (
                        <div className={styles.LOADING_STATE}>
                            <Mail size={24} />
                            <span>Aucune invitation en attente</span>
                        </div>
                    ) : (
                        invitations.map((invitation) => {
                            const roleConfig = ROLE_CONFIG[invitation.role];
                            const RoleIcon = roleConfig.icon;
                            const isProcessing = processingId === invitation.id;

                            return (
                                <div
                                    key={invitation.id}
                                    className="flex flex-col gap-3 px-4 py-3 sm:px-5 sm:py-4 rounded-xl bg-white/80 border-2 border-cyan-200/50 hover:border-cyan-300 transition dark:bg-amber-900/40 dark:border-amber-800/50 dark:hover:border-amber-700"
                                >
                                    {/* Project Info */}
                                    <div className="flex items-start gap-3">
                                        <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 sm:h-14 sm:w-14 rounded-xl text-lg sm:text-xl font-bold text-white bg-gradient-to-br from-cyan-500 to-teal-500 dark:from-amber-600 dark:to-orange-600 shadow-md">
                                            {invitation.projectName?.charAt(0).toUpperCase() || 'P'}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-base sm:text-lg font-bold truncate text-slate-800 dark:text-amber-50">
                                                {invitation.projectName}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 dark:text-amber-400/50">
                                                <span>Invité le {formatDate(invitation.joinedAt)}</span>
                                            </div>
                                        </div>

                                        {/* Role Badge */}
                                        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium bg-cyan-100 text-cyan-700 border border-cyan-200 dark:bg-amber-900/60 dark:text-amber-300 dark:border-amber-700 ${roleConfig.color}`}>
                                            <RoleIcon size={14} />
                                            <span className="hidden sm:inline">{roleConfig.label}</span>
                                        </div>
                                    </div>

                                    {/* Invited By */}
                                    {invitation.invitedByUsername && (
                                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-amber-950/50">
                                            <div className="flex items-center justify-center flex-shrink-0 h-8 w-8 rounded-full text-xs font-bold text-white bg-gradient-to-br from-violet-500 to-purple-500 dark:from-violet-600 dark:to-purple-700">
                                                {invitation.invitedByUsername.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs text-slate-400 dark:text-amber-400/50">
                                                    Invité par
                                                </span>
                                                <span className="text-sm font-medium truncate text-slate-700 dark:text-amber-200">
                                                    {invitation.invitedByUsername}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <button
                                            onClick={() => handleAccept(invitation.id)}
                                            disabled={isProcessing}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed dark:from-emerald-600 dark:to-green-700 dark:hover:from-emerald-500 dark:hover:to-green-600"
                                        >
                                            {isProcessing ? (
                                                <Loader2 className={styles.SPIN_ANIMATION} size={16} />
                                            ) : (
                                                <Check size={16} />
                                            )}
                                            Accepter
                                        </button>

                                        <button
                                            onClick={() => handleDecline(invitation.id)}
                                            disabled={isProcessing}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed dark:from-red-600 dark:to-rose-700 dark:hover:from-red-500 dark:hover:to-rose-600"
                                        >
                                            {isProcessing ? (
                                                <Loader2 className={styles.SPIN_ANIMATION} size={16} />
                                            ) : (
                                                <X size={16} />
                                            )}
                                            Refuser
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default Invitations;
