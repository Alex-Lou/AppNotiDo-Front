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

    const startTime = new Date(task.startedAt).getTime();
    const now = Date.now();
    const timeSpentSeconds = (task.timeSpent || 0) * 60;
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
  }, [task.isRunning, task.id]);

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
      const response = await api.post(`/tasks/${task.id}/start`);
      const updatedTask = response.data;
      await onUpdate(task.id, updatedTask);
    } catch (error) {
      console.error('Erreur démarrage timer:', error);
    }
  };

  const handlePause = async () => {
    try {
      const response = await api.post(`/tasks/${task.id}/pause`);
      const updatedTask = response.data;
      await onUpdate(task.id, updatedTask);
    } catch (error) {
      console.error('Erreur pause timer:', error);
    }
  };

  const handleStop = async () => {
    try {
      const response = await api.post(`/tasks/${task.id}/stop`);
      const updatedTask = response.data;
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
