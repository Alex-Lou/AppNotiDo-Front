export const getContextualGreeting = (hour, completedCount, totalCount, username) => {
  const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  // Matin (5h-12h)
  if (hour >= 5 && hour < 12) {
    if (completionRate >= 50 && totalCount > 0) {
      return `Super démarrage, ${username} ! 🚀`;
    }
    return `Bonjour, ${username} ! ☀️`;
  }
  
  // Après-midi (12h-18h)
  if (hour >= 12 && hour < 18) {
    if (completionRate === 100 && totalCount > 0) {
      return `Incroyable ${username} ! Tout est terminé ! 🎉`;
    }
    if (completionRate >= 70) {
      return `Belle progression, ${username} ! 💪`;
    }
    return `Bon après-midi, ${username} ! 🌤️`;
  }
  
  // Soir (18h-23h)
  if (hour >= 18 && hour < 23) {
    if (completionRate === 100 && totalCount > 0) {
      return `Journée parfaite, ${username} ! 🌟`;
    }
    if (completionRate >= 80) {
      return `Excellente journée, ${username} ! 👏`;
    }
    return `Bonne soirée, ${username} ! 🌙`;
  }
  
  // Nuit (23h-5h)
  return `Bonsoir, ${username} ! 👋`;
};

export const getContextualSubtitle = (completedCount, totalCount) => {
  if (totalCount === 0) {
    return "Aucune tâche pour aujourd'hui. Profite de ce moment libre ! 🎈";
  }
  
  if (completedCount === totalCount) {
    return `Bravo ! Tu as terminé toutes tes ${totalCount} tâches ! 🎊`;
  }
  
  const remaining = totalCount - completedCount;
  return `Il te reste ${remaining} tâche${remaining > 1 ? 's' : ''} sur ${totalCount} à accomplir.`;
};

export const getCurrentHour = () => new Date().getHours();
