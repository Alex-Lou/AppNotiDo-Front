import { useState, useEffect, useRef } from 'react';

export const useTimer = (task, onUpdate) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef(null);
  const taskIdRef = useRef(task.id);

  useEffect(() => {
    // Nettoyer l'intervalle précédent si l'ID de la tâche change
    if (taskIdRef.current !== task.id) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      taskIdRef.current = task.id;
    }

    // Si le timer n'est pas actif, nettoyer et sortir
    if (!task.isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // Calculer le temps déjà passé même quand en pause
      if (task.startedAt && task.pausedAt) {
        const startTime = new Date(task.startedAt).getTime();
        const pauseTime = new Date(task.pausedAt).getTime();
        const timeSpentSeconds = (task.timeSpent || 0) * 60;
        const sessionSeconds = Math.floor((pauseTime - startTime) / 1000);
        setElapsedSeconds(timeSpentSeconds + sessionSeconds);
      } else if (task.timeSpent) {
        setElapsedSeconds(task.timeSpent * 60);
      }
      
      return;
    }

    // Calculer le temps déjà écoulé depuis le démarrage
    const startTime = new Date(task.startedAt).getTime();
    const now = Date.now();
    const timeSpentSeconds = (task.timeSpent || 0) * 60;
    const currentSessionSeconds = Math.floor((now - startTime) / 1000);
    const totalElapsed = timeSpentSeconds + currentSessionSeconds;
    
    setElapsedSeconds(totalElapsed);

    // Mettre à jour chaque seconde
    intervalRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [task.isRunning, task.id]); // ← DÉPENDANCES RÉDUITES !

  // Recalculer le temps si startedAt ou timeSpent change
  useEffect(() => {
    if (task.isRunning && task.startedAt) {
      const startTime = new Date(task.startedAt).getTime();
      const now = Date.now();
      const timeSpentSeconds = (task.timeSpent || 0) * 60;
      const currentSessionSeconds = Math.floor((now - startTime) / 1000);
      setElapsedSeconds(timeSpentSeconds + currentSessionSeconds);
    }
  }, [task.startedAt, task.timeSpent, task.isRunning]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes.toString().padStart(2, '0')}min ${seconds.toString().padStart(2, '0')}s`;
    }
    return `${minutes}min ${seconds.toString().padStart(2, '0')}s`;
  };

  const handleStart = async () => {
    try {
      await onUpdate(task.id, {
        ...task,
        isRunning: true,
        startedAt: new Date().toISOString(),
        pausedAt: null, // Reset pausedAt
        status: 'IN_PROGRESS',
      });
    } catch (error) {
      console.error('Erreur démarrage timer:', error);
    }
  };

  const handlePause = async () => {
    try {
      const minutesSpent = Math.floor(elapsedSeconds / 60);
      await onUpdate(task.id, {
        ...task,
        isRunning: false,
        pausedAt: new Date().toISOString(),
        timeSpent: minutesSpent,
      });
    } catch (error) {
      console.error('Erreur pause timer:', error);
    }
  };

  const handleStop = async () => {
    try {
      const minutesSpent = Math.floor(elapsedSeconds / 60);
      await onUpdate(task.id, {
        ...task,
        isRunning: false,
        startedAt: null,
        pausedAt: null,
        timeSpent: minutesSpent,
        status: 'DONE',
      });
    } catch (error) {
      console.error('Erreur stop timer:', error);
    }
  };

  const getProgress = () => {
    if (!task.estimatedDuration) return null;
    
    const estimatedSeconds = task.estimatedDuration * 60;
    const percentage = Math.min(100, (elapsedSeconds / estimatedSeconds) * 100);
    
    return {
      percentage,
      isOvertime: elapsedSeconds > estimatedSeconds,
    };
  };

  return {
    elapsedSeconds,
    formatTime: () => formatTime(elapsedSeconds),
    handleStart,
    handlePause,
    handleStop,
    getProgress,
    isRunning: task.isRunning,
  };
};