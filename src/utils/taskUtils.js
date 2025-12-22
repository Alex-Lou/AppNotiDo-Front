// src/utils/taskUtils.js

export const formatDate = (dateString) => {
  if (!dateString) {
    return { 
      text: 'À définir', 
      color: 'text-slate-400 dark:text-slate-500', 
      emoji: '📋', 
      isOverdue: false 
    };
  }
  
  const date = new Date(dateString);
  const now = new Date();
  
  // Normaliser les dates à minuit pour comparer uniquement le jour
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const diffTime = dateOnly - nowOnly;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  // Si la date est passée (même avec l'heure)
  if (date < now) {
    return { text: 'Échue', color: 'text-rose-500 dark:text-rose-400', emoji: '🔴', isOverdue: true };
  }
  
  // Comparaison basée sur le jour calendaire
  if (diffDays === 0) {
    return { text: "Aujourd'hui", color: 'text-amber-500 dark:text-amber-300', emoji: '⚠️', isOverdue: false };
  }
  if (diffDays === 1) {
    return { text: 'Demain', color: 'text-amber-500 dark:text-amber-300', emoji: '⏰', isOverdue: false };
  }
  if (diffDays > 1 && diffDays <= 7) {
    return { text: `Dans ${diffDays} jours`, color: 'text-sky-600 dark:text-sky-300', emoji: '📅', isOverdue: false };
  }
  
  return { 
    text: date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }), 
    color: 'text-slate-500 dark:text-slate-400', 
    emoji: '📅', 
    isOverdue: false 
  };
};

export const formatDuration = (minutes) => {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
};

export const calculateProgress = (task) => {
  if (!task.dueDate || !task.estimatedDuration) return null;

  const now = new Date();
  const dueDate = new Date(task.dueDate);
  const startDate = new Date(dueDate.getTime() - task.estimatedDuration * 60 * 1000);

  if (now < startDate) {
    return { percentage: 0, color: 'from-cyan-500 to-teal-500 dark:from-cyan-600 dark:to-teal-600', status: 'not-started' };
  }

  if (now > dueDate) {
    return { percentage: 100, color: 'from-rose-500 to-orange-500 dark:from-rose-600 dark:to-orange-600', status: 'overdue' };
  }

  const totalDuration = dueDate - startDate;
  const elapsed = now - startDate;
  const percentage = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

  let color;
  if (percentage < 50) {
    color = 'from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600';
  } else if (percentage < 80) {
    color = 'from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600';
  } else {
    color = 'from-orange-500 to-rose-500 dark:from-orange-600 dark:to-rose-600';
  }

  return { percentage, color, status: 'in-progress' };
};
