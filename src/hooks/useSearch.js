import { useState, useMemo } from 'react';

export const useSearch = (tasks) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchedTasks = useMemo(() => {
    if (!searchQuery.trim()) {
      return tasks;
    }

    const query = searchQuery.toLowerCase().trim();
    
    return tasks.filter(task => {
      const titleMatch = task.title?.toLowerCase().includes(query);
      const descriptionMatch = task.description?.toLowerCase().includes(query);
      return titleMatch || descriptionMatch;
    });
  }, [tasks, searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return {
    searchQuery,
    setSearchQuery,
    searchedTasks,
    clearSearch,
    hasActiveSearch: searchQuery.trim().length > 0,
    resultCount: searchedTasks.length,
  };
};