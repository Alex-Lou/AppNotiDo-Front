import { useState } from 'react';
import { toast } from 'sonner';
import api from '../../services/api';

function ProfileModal({ onClose, initialEmail }) {
  const [email, setEmail] = useState(initialEmail || '');
  const [isSavingEmail, setIsSavingEmail] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveEmail = async (e) => {
    e.preventDefault();
    setIsSavingEmail(true);
    try {
      await api.patch('/users/profile', { email });
      toast.success('✅ Email mis à jour avec succès !');
    } catch (err) {
      const message = err.response?.data?.message || "Impossible de mettre à jour l'email";
      toast.error(`❌ ${message}`);
    } finally {
      setIsSavingEmail(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsChangingPassword(true);
    try {
      await api.post('/users/change-password', {
        currentPassword,
        newPassword,
      });
      toast.success('✅ Mot de passe mis à jour avec succès !');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur lors du changement de mot de passe';
      toast.error(`❌ ${message}`);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Supprimer définitivement votre compte et toutes vos tâches ?'
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await api.delete('/users/me');
      toast.success('👋 Compte supprimé. Au revoir !');
      setTimeout(() => {
        window.location.href = '/auth';
      }, 1500);
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur lors de la suppression du compte';
      toast.error(`❌ ${message}`);
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-2xl border border-cyan-300/70 bg-gradient-to-br from-cyan-50 via-teal-50 to-orange-50 p-6 shadow-2xl dark:border-amber-800/70 dark:bg-gradient-to-br dark:from-slate-950/90 dark:via-stone-950/90 dark:to-amber-950/80">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-500 transition hover:text-slate-800 dark:text-amber-300 dark:hover:text-amber-100"
          aria-label="Fermer"
        >
          ✕
        </button>

        <h2 className="mb-1 text-xl font-bold text-slate-900 dark:text-amber-50">
          Paramètres du profil
        </h2>
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-amber-300/70">
          Email, mot de passe, compte
        </p>

        <div className="space-y-6">
          {/* FORMULAIRE EMAIL */}
          <form onSubmit={handleSaveEmail} className="rounded-xl border border-cyan-200/70 bg-white/70 p-4 shadow-sm dark:border-amber-800/60 dark:bg-stone-950/70">
            <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-amber-50">
              Email
            </h3>
            <p className="mb-3 text-xs text-slate-500 dark:text-amber-200/70">
              Modifiez votre adresse de contact utilisée pour votre compte.
            </p>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700 dark:text-amber-200">
                Adresse email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-cyan-300/70 bg-white/90 px-3 py-1.5 text-sm text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-amber-700/70 dark:bg-slate-900/80 dark:text-amber-50 dark:focus:border-amber-500 dark:focus:ring-amber-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                disabled={isSavingEmail}
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:from-cyan-600 hover:to-teal-600 disabled:cursor-not-allowed disabled:opacity-60 dark:from-amber-600 dark:to-orange-600 dark:hover:from-amber-700 dark:hover:to-orange-700"
              >
                {isSavingEmail ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>

          {/* FORMULAIRE MOT DE PASSE */}
          <form onSubmit={handleChangePassword} className="rounded-xl border border-cyan-200/70 bg-white/70 p-4 shadow-sm dark:border-amber-800/60 dark:bg-stone-950/70">
            <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-amber-50">
              Mot de passe
            </h3>
            <p className="mb-3 text-xs text-slate-500 dark:text-amber-200/70">
              Choisissez un mot de passe suffisamment long et unique.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-amber-200">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  className="mt-1 w-full rounded-lg border border-cyan-300/70 bg-white/90 px-3 py-1.5 text-sm text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-amber-700/70 dark:bg-slate-900/80 dark:text-amber-50 dark:focus:border-amber-500 dark:focus:ring-amber-500"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-amber-200">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  className="mt-1 w-full rounded-lg border border-cyan-300/70 bg-white/90 px-3 py-1.5 text-sm text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-amber-700/70 dark:bg-slate-900/80 dark:text-amber-50 dark:focus:border-amber-500 dark:focus:ring-amber-500"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                disabled={isChangingPassword}
                className="rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:from-teal-600 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-700 dark:hover:to-teal-700"
              >
                {isChangingPassword ? 'Modification...' : 'Changer le mot de passe'}
              </button>
            </div>
          </form>

          {/* ZONE DANGEREUSE */}
          <div className="rounded-xl border border-red-200/70 bg-red-50/80 p-4 shadow-sm dark:border-red-800/70 dark:bg-red-950/60">
            <h3 className="mb-2 text-sm font-semibold text-red-800 dark:text-red-200">
              Zone dangereuse
            </h3>
            <p className="mb-3 text-xs text-red-700/90 dark:text-red-200/80">
              Supprime définitivement votre compte et toutes vos tâches. Cette action est irréversible.
            </p>
            <button
              type="button"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="rounded-lg border border-red-500/70 bg-gradient-to-r from-red-600 to-rose-600 px-4 py-1.5 text-xs font-semibold text-red-50 shadow-sm transition hover:from-red-700 hover:to-rose-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/80 dark:from-red-700 dark:to-rose-700 dark:hover:from-red-800 dark:hover:to-rose-800"
            >
              {isDeleting ? 'Suppression...' : 'Supprimer mon compte'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;