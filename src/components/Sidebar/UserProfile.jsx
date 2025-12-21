// src/components/Sidebar/UserProfile.jsx
import { useState, useEffect } from 'react';
import { FaPencilAlt, FaCog } from 'react-icons/fa';
import api from '../../services/api';
import {
  USER_PROFILE_SIDEBAR_CONTAINER,
  USER_PROFILE_SIDEBAR_FLEX,
  USER_PROFILE_SIDEBAR_AVATAR,
  USER_PROFILE_SIDEBAR_INFO,
  USER_PROFILE_SIDEBAR_NAME_ROW,
  USER_PROFILE_SIDEBAR_INPUT,
  USER_PROFILE_SIDEBAR_NAME,
  USER_PROFILE_SIDEBAR_BUTTONS,
  USER_PROFILE_SIDEBAR_BUTTON,
  USER_PROFILE_SIDEBAR_STATUS
} from '../../constants/styles';

function UserProfile({ username, displayName: initialDisplayName, onOpenProfileModal }) {
  const [displayName, setDisplayName] = useState(initialDisplayName || username);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(displayName);

  useEffect(() => {
    setDisplayName(initialDisplayName || username);
    setTempName(initialDisplayName || username);
  }, [initialDisplayName, username]);

  const firstLetter = (displayName || username || '?').charAt(0).toUpperCase();

  const startEdit = () => {
    setTempName(displayName);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setTempName(displayName);
  };

  const saveEdit = async () => {
    const value = tempName.trim();
    if (!value) {
      cancelEdit();
      return;
    }

    try {
      const res = await api.patch('/users/profile', { displayName: value });
      setDisplayName(res.data.displayName || res.data.username);
    } catch (e) {
    } finally {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <div className={USER_PROFILE_SIDEBAR_CONTAINER}>
      <div className={USER_PROFILE_SIDEBAR_FLEX}>
        <div className={USER_PROFILE_SIDEBAR_AVATAR}>
          {firstLetter}
        </div>
        <div className={USER_PROFILE_SIDEBAR_INFO}>
          <div className={USER_PROFILE_SIDEBAR_NAME_ROW}>
            {isEditing ? (
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={saveEdit}
                maxLength={100}
                className={USER_PROFILE_SIDEBAR_INPUT}
                autoFocus
              />
            ) : (
              <>
                <p className={USER_PROFILE_SIDEBAR_NAME}>
                  {displayName}
                </p>
                <div className={USER_PROFILE_SIDEBAR_BUTTONS}>
                  <button
                    type="button"
                    onClick={startEdit}
                    className={USER_PROFILE_SIDEBAR_BUTTON}
                    title="Modifier le nom d'affichage"
                  >
                    <FaPencilAlt size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={onOpenProfileModal}
                    className={USER_PROFILE_SIDEBAR_BUTTON}
                    title="Gérer le profil complet"
                  >
                    <FaCog size={13} />
                  </button>
                </div>
              </>
            )}
          </div>
          <p className={USER_PROFILE_SIDEBAR_STATUS}>
            Utilisateur actif
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
