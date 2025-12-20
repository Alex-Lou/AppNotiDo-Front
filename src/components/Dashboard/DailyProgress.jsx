import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';


function DailyProgress({ tasks }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Filtrer les tâches d'aujourd'hui
  const getTodayTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
    });
  };

  const todayTasks = getTodayTasks();
  const totalToday = todayTasks.length;
  const completedToday = todayTasks.filter(t => t.status === 'DONE').length;
  const percentage = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;
  const isComplete = percentage === 100 && totalToday > 0;

  // Gérer l'affichage et la disparition du bloc
  useEffect(() => {
    const today = new Date().toDateString();
    const storedData = localStorage.getItem('dailyCelebration');
    
    if (storedData) {
      try {
        const { date, completionTime } = JSON.parse(storedData);
        
        // Si c'est aujourd'hui et que 100% a été atteint
        if (date === today && completionTime) {
          const elapsed = Date.now() - completionTime;
          
          // Si plus de 12 secondes se sont écoulées, cacher directement
          if (elapsed >= 12000) {
            setIsVisible(false);
            return;
          }
          
          // Sinon, calculer le temps restant
          const remainingToFade = Math.max(0, 10000 - elapsed);
          const remainingToHide = Math.max(0, 12000 - elapsed);
          
          // Si on doit déjà être en fade-out
          if (remainingToFade === 0) {
            setIsFadingOut(true);
          }
          
          // Programmer le fade-out si nécessaire
          if (remainingToFade > 0) {
            const fadeTimer = setTimeout(() => {
              setIsFadingOut(true);
            }, remainingToFade);
            
            const hideTimer = setTimeout(() => {
              setIsVisible(false);
            }, remainingToHide);
            
            return () => {
              clearTimeout(fadeTimer);
              clearTimeout(hideTimer);
            };
          } else {
            // Juste programmer la disparition
            const hideTimer = setTimeout(() => {
              setIsVisible(false);
            }, remainingToHide);
            
            return () => clearTimeout(hideTimer);
          }
        }
      } catch (e) {
        // En cas d'erreur de parsing, nettoyer le localStorage
        localStorage.removeItem('dailyCelebration');
      }
    }

    // Si 100% atteint pour la première fois aujourd'hui
    if (isComplete && (!storedData || JSON.parse(storedData).date !== today)) {
      // Enregistrer le timestamp de complétion
      localStorage.setItem('dailyCelebration', JSON.stringify({
        date: today,
        completionTime: Date.now()
      }));

      // Lancer les confettis
      setTimeout(() => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        
        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            clearInterval(interval);
            return;
          }

          confetti({
            particleCount: 3,
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
            colors: ['#06b6d4', '#14b8a6', '#f97316', '#fb923c', '#fbbf24'],
          });
        }, 30);
      }, 500);

      // Démarrer le fade-out après 10 secondes
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 10000);

      // Masquer complètement après 12 secondes
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 12000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isComplete]);

  // Ne rien afficher si pas visible ou pas de tâches
  if (!isVisible || totalToday === 0) {
    return null;
  }

  // Déterminer la couleur de la barre selon le pourcentage
  let barColor;
  if (percentage === 100) {
    barColor = 'from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-600 dark:via-teal-600 dark:to-cyan-600';
  } else if (percentage >= 70) {
    barColor = 'from-amber-500 via-orange-500 to-yellow-500 dark:from-amber-600 dark:via-orange-600 dark:to-yellow-600';
  } else if (percentage >= 40) {
    barColor = 'from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-600 dark:via-amber-600 dark:to-yellow-600';
  } else {
    barColor = 'from-cyan-500 via-teal-500 to-blue-500 dark:from-cyan-600 dark:via-teal-600 dark:to-blue-600';
  }

  return (
    <div 
      className={`mb-6 overflow-hidden rounded-2xl border-2 border-cyan-300/60 bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 p-5 shadow-lg dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30 transition-opacity duration-2000 ease-out ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📅</span>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-amber-50">
              Tâches du jour
            </h3>
            <p className="text-xs font-medium text-slate-600 dark:text-amber-300/70">
              {completedToday} / {totalToday} terminées
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            {isComplete && (
              <span className="animate-bounce text-2xl">🎉</span>
            )}
          </div>
          <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200 shadow-inner dark:bg-slate-800/60">
        <div
          className={`h-full rounded-full bg-gradient-to-r shadow-md transition-all duration-1000 ease-out ${barColor}`}
          style={{ width: `${percentage}%` }}
        >
          <div className="h-full w-full animate-shimmer-bar bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%]" />
        </div>
      </div>

      {/* Message de progression */}
      <div className="mt-3 space-y-2">
        <p className="text-xs font-medium text-slate-600 dark:text-amber-300/70">
          {isComplete ? (
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              ✨ Bravo ! Toutes les tâches du jour sont terminées !
            </span>
          ) : percentage >= 70 ? (
            "Presque terminé ! Encore un petit effort ! 💪"
          ) : percentage >= 40 ? (
            "Bon rythme ! Continue comme ça ! 🚀"
          ) : (
            "C'est parti ! Avance à ton rythme ! 📝"
          )}
        </p>
      </div>
    </div>
  );
}

export default DailyProgress;
