// src/components/Dashboard/InvitationBell.jsx
import { useState, useRef, useEffect } from 'react';
import { Mail, Check, X, Loader2, Crown, Shield, User, Eye, MessageSquare, Trash2, CheckCheck } from 'lucide-react';
import projectMemberService from '../../services/projectMemberService';
import messageService from '../../services/messageService';
import {
  NOTIF_BELL_BUTTON,
  NOTIF_BELL_ICON,
  NOTIF_BADGE,
  NOTIF_PANEL,
  NOTIF_PANEL_HEADER,
  NOTIF_PANEL_ACTIONS,
  NOTIF_CLOSE_BUTTON,
  NOTIF_LIST,
  NOTIF_EMPTY,
  NOTIF_LOADING
} from '../../constants/styles';

const ROLE_CONFIG = {
  OWNER: { label: 'Propriétaire', icon: Crown, color: 'text-amber-500' },
  ADMIN: { label: 'Admin', icon: Shield, color: 'text-violet-500' },
  MEMBER: { label: 'Membre', icon: User, color: 'text-blue-500' },
  VIEWER: { label: 'Lecteur', icon: Eye, color: 'text-gray-500' }
};

const MESSAGE_ICONS = {
  INVITATION_RECEIVED: '📨',
  INVITATION_ACCEPTED: '✅',
  INVITATION_DECLINED: '❌',
  MEMBER_JOINED: '👋',
  MEMBER_REMOVED: '🚫',
  MEMBER_LEFT: '👋',
  MEMBER_ROLE_CHANGED: '🔄',
  OWNERSHIP_TRANSFERRED: '📋',
  OWNERSHIP_RECEIVED: '👑',
  PROJECT_ARCHIVED: '📦',
  PROJECT_DELETED: '🗑️',
  SYSTEM_MESSAGE: '💬'
};

function formatRelativeTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function InvitationBell({ onInvitationAccepted }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('invitations');

  // Invitations
  const [invitations, setInvitations] = useState([]);
  const [loadingInvitations, setLoadingInvitations] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  // Messages
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  // Charger au montage + toutes les 30 secondes
  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fermer si clic à l'extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const fetchAll = async () => {
    await Promise.all([fetchInvitations(), fetchMessages()]);
  };

  const fetchInvitations = async () => {
    try {
      setLoadingInvitations(true);
      const data = await projectMemberService.getMyPendingInvitations();
      setInvitations(data);
    } catch (err) {
      console.error('Erreur invitations:', err);
    } finally {
      setLoadingInvitations(false);
    }
  };

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const data = await messageService.getUnreadMessages();
      setMessages(data);
      setUnreadMessagesCount(data.length);
    } catch (err) {
      console.error('Erreur messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleToggle = () => {
    if (!isOpen) fetchAll();
    setIsOpen(!isOpen);
  };

  const handleAccept = async (memberId) => {
    try {
      setProcessingId(memberId);
      await projectMemberService.acceptInvitation(memberId);
      await fetchAll();
      if (onInvitationAccepted) onInvitationAccepted();
    } catch (err) {
      console.error("Erreur acceptation:", err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDecline = async (memberId) => {
    try {
      setProcessingId(memberId);
      await projectMemberService.declineInvitation(memberId);
      await fetchAll();
    } catch (err) {
      console.error('Erreur refus:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleMarkMessageAsRead = async (messageId) => {
    try {
      await messageService.markAsRead(messageId);
      await fetchMessages();
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleMarkAllMessagesAsRead = async () => {
    try {
      await messageService.markAllAsRead();
      await fetchMessages();
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await messageService.deleteMessage(messageId);
      await fetchMessages();
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const totalCount = invitations.length + unreadMessagesCount;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={NOTIF_BELL_BUTTON}
        title="Invitations & Messages"
      >
        <Mail className={NOTIF_BELL_ICON} />
        {totalCount > 0 && (
          <span className={NOTIF_BADGE}>
            {totalCount > 9 ? '9+' : totalCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div ref={panelRef} className={NOTIF_PANEL}>
          {/* Header avec onglets */}
          <div className={NOTIF_PANEL_HEADER}>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('invitations')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeTab === 'invitations'
                    ? 'bg-cyan-100 text-cyan-700 dark:bg-amber-800 dark:text-amber-200'
                    : 'text-slate-500 hover:bg-slate-100 dark:text-amber-400/70 dark:hover:bg-amber-900/50'
                }`}
              >
                <Mail size={14} />
                Invitations
                {invitations.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-cyan-500 text-white dark:bg-amber-500">
                    {invitations.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeTab === 'messages'
                    ? 'bg-cyan-100 text-cyan-700 dark:bg-amber-800 dark:text-amber-200'
                    : 'text-slate-500 hover:bg-slate-100 dark:text-amber-400/70 dark:hover:bg-amber-900/50'
                }`}
              >
                <MessageSquare size={14} />
                Messages
                {unreadMessagesCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500 text-white dark:bg-emerald-600">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>
            </div>

            <div className={NOTIF_PANEL_ACTIONS}>
              {activeTab === 'messages' && unreadMessagesCount > 0 && (
                <button
                  onClick={handleMarkAllMessagesAsRead}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition dark:hover:bg-emerald-900/30"
                  title="Tout marquer comme lu"
                >
                  <CheckCheck size={16} />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className={NOTIF_CLOSE_BUTTON}
                title="Fermer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Contenu */}
          <div className={NOTIF_LIST}>
            {/* === ONGLET INVITATIONS === */}
            {activeTab === 'invitations' && (
              <>
                {loadingInvitations ? (
                  <div className={NOTIF_LOADING}>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-cyan-500 border-t-transparent dark:border-amber-500" />
                    <span>Chargement...</span>
                  </div>
                ) : invitations.length === 0 ? (
                  <div className={NOTIF_EMPTY}>
                    <Mail size={32} className="text-slate-300 dark:text-stone-600 mb-2" />
                    <p>Aucune invitation</p>
                  </div>
                ) : (
                  invitations.map((invitation) => {
                    const roleConfig = ROLE_CONFIG[invitation.role];
                    const RoleIcon = roleConfig?.icon || User;
                    const isProcessing = processingId === invitation.id;

                    return (
                      <div
                        key={invitation.id}
                        className="flex flex-col gap-2 p-3 rounded-lg border border-cyan-200/50 bg-white/60 hover:bg-white/80 transition dark:bg-amber-900/30 dark:border-amber-800/50 dark:hover:bg-amber-900/50"
                      >
                        <div className="flex items-start gap-2">
                          <div className="flex items-center justify-center flex-shrink-0 h-10 w-10 rounded-lg text-sm font-bold text-white bg-gradient-to-br from-cyan-500 to-teal-500 dark:from-amber-600 dark:to-orange-600">
                            {invitation.projectName?.charAt(0).toUpperCase() || 'P'}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate text-slate-800 dark:text-amber-50">
                              {invitation.projectName}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-amber-300/60">
                              {formatRelativeTime(invitation.joinedAt)}
                            </p>
                          </div>

                          <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${roleConfig?.color || 'text-slate-500'}`}>
                            <RoleIcon size={12} />
                            <span className="hidden sm:inline">{roleConfig?.label || 'Membre'}</span>
                          </div>
                        </div>

                        {invitation.invitedByUsername && (
                          <div className="flex items-center gap-2 px-2 py-1 rounded bg-slate-50 dark:bg-amber-950/50">
                            <div className="flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold text-white bg-gradient-to-br from-violet-500 to-purple-500">
                              {invitation.invitedByUsername.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-xs text-slate-600 dark:text-amber-300/70">
                              Invité par <strong>{invitation.invitedByUsername}</strong>
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleAccept(invitation.id)}
                            disabled={isProcessing}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isProcessing ? <Loader2 className="animate-spin" size={12} /> : <Check size={12} />}
                            Accepter
                          </button>

                          <button
                            onClick={() => handleDecline(invitation.id)}
                            disabled={isProcessing}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <X size={12} />
                            Refuser
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </>
            )}

            {/* === ONGLET MESSAGES === */}
            {activeTab === 'messages' && (
              <>
                {loadingMessages ? (
                  <div className={NOTIF_LOADING}>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-cyan-500 border-t-transparent dark:border-amber-500" />
                    <span>Chargement...</span>
                  </div>
                ) : messages.length === 0 ? (
                  <div className={NOTIF_EMPTY}>
                    <MessageSquare size={32} className="text-slate-300 dark:text-stone-600 mb-2" />
                    <p>Aucun message</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className="flex flex-col gap-2 p-3 rounded-lg border border-emerald-200/50 bg-emerald-50/50 hover:bg-emerald-50 transition dark:bg-emerald-900/20 dark:border-emerald-800/50 dark:hover:bg-emerald-900/30"
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex items-center justify-center flex-shrink-0 h-10 w-10 rounded-lg text-lg bg-slate-100 dark:bg-stone-800">
                          {MESSAGE_ICONS[message.type] || '💬'}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 dark:text-amber-50">
                            {message.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-amber-300/60 mt-0.5">
                            {formatRelativeTime(message.createdAt)}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMarkMessageAsRead(message.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-emerald-100 transition dark:hover:bg-emerald-900/50"
                            title="Marquer comme lu"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition dark:hover:bg-red-900/30"
                            title="Supprimer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-amber-200/80 leading-relaxed">
                        {message.content}
                      </p>

                      {message.projectName && (
                        <div className="flex items-center gap-2 px-2 py-1 rounded bg-slate-100 dark:bg-stone-800/50">
                          <div className="flex items-center justify-center h-5 w-5 rounded text-[10px] font-bold text-white bg-gradient-to-br from-cyan-500 to-teal-500 dark:from-amber-600 dark:to-orange-600">
                            {message.projectName.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-xs text-slate-500 dark:text-amber-300/60">
                            {message.projectName}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default InvitationBell;