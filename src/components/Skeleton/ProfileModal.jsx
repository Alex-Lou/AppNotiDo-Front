// src/components/Skeleton/ProfileModal.jsx
import { useState } from 'react';
import { toast } from 'sonner';
import api from '../../services/api';
import {
  PROFILE_MODAL_OVERLAY,
  PROFILE_MODAL_CONTAINER,
  PROFILE_MODAL_CLOSE_BUTTON,
  PROFILE_MODAL_TITLE,
  PROFILE_MODAL_SUBTITLE,
  PROFILE_MODAL_SECTIONS,
  PROFILE_MODAL_SECTION,
  PROFILE_MODAL_SECTION_TITLE,
  PROFILE_MODAL_SECTION_DESCRIPTION,
  PROFILE_MODAL_INPUT_CONTAINER,
  PROFILE_MODAL_LABEL,
  PROFILE_MODAL_INPUT,
  PROFILE_MODAL_INPUT_MT,
  PROFILE_MODAL_BUTTON_CONTAINER,
  PROFILE_MODAL_SAVE_BUTTON,
  PROFILE_MODAL_PASSWORD_BUTTON,
  PROFILE_MODAL_PASSWORD_INPUTS,
  PROFILE_MODAL_DANGER_ZONE,
  PROFILE_MODAL_DANGER_TITLE,
  PROFILE_MODAL_DANGER_DESCRIPTION,
  PROFILE_MODAL_DELETE_BUTTON
} from '../../constants/styles';

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
    <div className={PROFILE_MODAL_OVERLAY}>
      <div className={PROFILE_MODAL_CONTAINER}>
        <button
          type="button"
          onClick={onClose}
          className={PROFILE_MODAL_CLOSE_BUTTON}
          aria-label="Fermer"
        >
          ✕
        </button>

        <h2 className={PROFILE_MODAL_TITLE}>
          Paramètres du profil
        </h2>
        <p className={PROFILE_MODAL_SUBTITLE}>
          Email, mot de passe, compte
        </p>

        <div className={PROFILE_MODAL_SECTIONS}>
          {/* FORMULAIRE EMAIL */}
          <form onSubmit={handleSaveEmail} className={PROFILE_MODAL_SECTION}>
            <h3 className={PROFILE_MODAL_SECTION_TITLE}>
              Email
            </h3>
            <p className={PROFILE_MODAL_SECTION_DESCRIPTION}>
              Modifiez votre adresse de contact utilisée pour votre compte.
            </p>
            <div className={PROFILE_MODAL_INPUT_CONTAINER}>
              <label className={PROFILE_MODAL_LABEL}>
                Adresse email
              </label>
              <input
                type="email"
                className={PROFILE_MODAL_INPUT}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={PROFILE_MODAL_BUTTON_CONTAINER}>
              <button
                type="submit"
                disabled={isSavingEmail}
                className={PROFILE_MODAL_SAVE_BUTTON}
              >
                {isSavingEmail ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>

          {/* FORMULAIRE MOT DE PASSE */}
          <form onSubmit={handleChangePassword} className={PROFILE_MODAL_SECTION}>
            <h3 className={PROFILE_MODAL_SECTION_TITLE}>
              Mot de passe
            </h3>
            <p className={PROFILE_MODAL_SECTION_DESCRIPTION}>
              Choisissez un mot de passe suffisamment long et unique.
            </p>
            <div className={PROFILE_MODAL_PASSWORD_INPUTS}>
              <div>
                <label className={PROFILE_MODAL_LABEL}>
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  className={PROFILE_MODAL_INPUT_MT}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={PROFILE_MODAL_LABEL}>
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  className={PROFILE_MODAL_INPUT_MT}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={PROFILE_MODAL_BUTTON_CONTAINER}>
              <button
                type="submit"
                disabled={isChangingPassword}
                className={PROFILE_MODAL_PASSWORD_BUTTON}
              >
                {isChangingPassword ? 'Modification...' : 'Changer le mot de passe'}
              </button>
            </div>
          </form>

          {/* ZONE DANGEREUSE */}
          <div className={PROFILE_MODAL_DANGER_ZONE}>
            <h3 className={PROFILE_MODAL_DANGER_TITLE}>
              Zone dangereuse
            </h3>
            <p className={PROFILE_MODAL_DANGER_DESCRIPTION}>
              Supprime définitivement votre compte et toutes vos tâches. Cette action est irréversible.
            </p>
            <button
              type="button"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className={PROFILE_MODAL_DELETE_BUTTON}
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
