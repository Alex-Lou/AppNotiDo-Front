// hooks/useDashboardLogic.js
import { useState, useEffect } from 'react';
import api from '../services/api';

export function useDashboardLogic(username) {
  const [displayName, setDisplayName] = useState(null);
  const [profileEmail, setProfileEmail] = useState('');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setDisplayName(res.data.displayName || res.data.username);
        setProfileEmail(res.data.email || '');
      } catch (e) {
        console.error('Erreur chargement profil:', e);
        setDisplayName(username);
      }
    };
    fetchProfile();
  }, [username]);

  return {
    displayName,
    profileEmail,
    isProfileModalOpen,
    setIsProfileModalOpen
  };
}
