// src/hooks/useTimer.js
import { useState, useEffect, useRef } from 'react';
import api from '../services/api';

export const useTimer = (task, onUpdate) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef(null);
  const taskIdRef = useRef(task.id);

  useEffect(() => {
    if (taskIdRef.current !== task.id) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      taskIdRef.current = task.id;
    }

    if (!task.isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const timeSpentSeconds = task.timeSpent || 0;
      setElapsedSeconds(timeSpentSeconds);
      return;
    }

    const startTime = new Date(task.startedAt).getTime();
    const now = Date.now();
    const timeSpentSeconds = task.timeSpent || 0;
    const currentSessionSeconds = Math.floor((now - startTime) / 1000);
    const totalElapsed = timeSpentSeconds + currentSessionSeconds;

    setElapsedSeconds(totalElapsed);

    intervalRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [task.isRunning, task.id, task.timeSpent]);

  useEffect(() => {
    if (task.isRunning && task.startedAt) {
      const startTime = new Date(task.startedAt).getTime();
      const now = Date.now();
      const timeSpentSeconds = task.timeSpent || 0;
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
      const response = await api.post(`/tasks/${task.id}/start`);
      // Préserver timerEnabled et reactivable de la tâche originale
      const updatedTask = {
        ...response.data,
        timerEnabled: task.timerEnabled,
        reactivable: task.reactivable
      };
      await onUpdate(task.id, updatedTask);
    } catch (error) {
      console.error('Erreur démarrage timer:', error);
    }
  };

  const handlePause = async () => {
    try {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const pauseTime = Date.now();
      const startTime = new Date(task.startedAt).getTime();
      const timeSpentSeconds = task.timeSpent || 0;
      const currentSessionSeconds = Math.floor((pauseTime - startTime) / 1000);
      const exactElapsed = timeSpentSeconds + currentSessionSeconds;

      setElapsedSeconds(exactElapsed);

      const response = await api.post(`/tasks/${task.id}/pause`);
      // Préserver timerEnabled et reactivable de la tâche originale
      const updatedTask = {
        ...response.data,
        timerEnabled: task.timerEnabled,
        reactivable: task.reactivable
      };
      await onUpdate(task.id, updatedTask);
    } catch (error) {
      console.error('Erreur pause timer:', error);
    }
  };

  const handleStop = async () => {
    try {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const response = await api.post(`/tasks/${task.id}/stop`);
      // timerEnabled passe à false après stop
      const updatedTask = {
        ...response.data,
        timerEnabled: false,
        reactivable: task.reactivable
      };
      await onUpdate(task.id, updatedTask);
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