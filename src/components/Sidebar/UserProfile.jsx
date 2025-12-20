import { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import api from '../../services/api';

function UserProfile({ username, displayName: initialDisplayName }) {
  const [displayName, setDisplayName] = useState(initialDisplayName || username);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(displayName);

  // si le parent change le displayName (après reload), on met à jour le state
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
      // option : log
    } finally {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <div className="mb-8 rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-100 via-teal-100 to-orange-100 px-5 py-4 shadow-md dark:border-amber-800/70 dark:bg-gradient-to-br dark:from-amber-900/60 dark:via-stone-900/70 dark:to-slate-900/60">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-teal-500 to-orange-500 text-base font-bold text-white shadow-md dark:from-amber-600 dark:via-orange-600 dark:to-rose-600">
          {firstLetter}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={saveEdit}
                maxLength={100}
                className="w-36 rounded-md border border-cyan-400/70 bg-white/80 px-2 py-0.5 text-sm font-semibold text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-amber-700/70 dark:bg-stone-900/80 dark:text-amber-50 dark:focus:border-amber-500 dark:focus:ring-amber-500"
                autoFocus
              />
            ) : (
              <>
                <p className="max-w-[9rem] truncate text-base font-bold text-slate-900 dark:text-amber-50">
                  {displayName}
                </p>
                <button
                  type="button"
                  onClick={startEdit}
                  className="text-xs text-slate-600 transition hover:text-slate-900 dark:text-amber-300 dark:hover:text-amber-100"
                  title="Modifier le nom d'affichage"
                >
                  <FaPencilAlt size={12} />
                </button>
              </>
            )}
          </div>
          <p className="text-xs font-medium text-slate-800/80 dark:text-amber-200/70">
            Utilisateur actif
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
