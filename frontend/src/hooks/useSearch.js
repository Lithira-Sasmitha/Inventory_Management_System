import { useState, useCallback } from 'react';

export default function useSearch(initialValue = '') {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    searchQuery,
    handleSearchChange,
    clearSearch,
    setSearchQuery,
  };
}
