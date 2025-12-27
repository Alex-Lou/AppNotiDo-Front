// src/components/Dashboard/RightSidebar.jsx
import { useState, useEffect } from 'react';
import DaySummary from './DaySummary';
import UpcomingTasks from './UpcomingTasks';
import RecentActivity from './RecentActivity';
import DailyQuote from '../Sidebar/DailyQuote';

function RightSidebar({ stats, tasks, urgentCount, onTaskClick, onTaskDelete }) {
  const [showQuote, setShowQuote] = useState(() => {
    const saved = localStorage.getItem('showDailyQuote');
    return saved === null ? true : saved === 'true';
  });
  
  const [isQuotePinned, setIsQuotePinned] = useState(() => {
    const saved = localStorage.getItem('dailyQuotePinned');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('showDailyQuote', showQuote);
  }, [showQuote]);

  useEffect(() => {
    localStorage.setItem('dailyQuotePinned', isQuotePinned);
  }, [isQuotePinned]);

  const handleTogglePin = () => {
    setIsQuotePinned(!isQuotePinned);
  };

  const handleHideQuote = () => {
    setShowQuote(false);
  };

  const handleShowQuote = () => {
    setShowQuote(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Résumé du jour */}
      <DaySummary stats={stats} urgentCount={urgentCount} />

      {/* Tâches à venir */}
      <UpcomingTasks 
        tasks={tasks} 
        onTaskClick={onTaskClick}
        onTaskDelete={onTaskDelete}
      />

      
      {/* Activité récente */}
      <RecentActivity tasks={tasks} onTaskClick={onTaskClick} />

      {/* Citation du jour */}
      {showQuote ? (
        <DailyQuote
          isPinned={isQuotePinned}
          onTogglePin={handleTogglePin}
          onHide={handleHideQuote}
        />
      ) : (
        <button
          onClick={handleShowQuote}
          className="w-full px-3 py-2 text-xs font-medium text-slate-500 dark:text-amber-400/70 hover:bg-slate-100 dark:hover:bg-stone-800 rounded-lg transition-colors text-center"
        >
          💡 Afficher la citation
        </button>
      )}


    </div>
  );
}

export default RightSidebar;