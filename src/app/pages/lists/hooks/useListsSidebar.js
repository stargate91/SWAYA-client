import { useState, useMemo } from 'react';

export function useListsSidebar({ lists = [] }) {
  const [sidebarSearch, setSidebarSearch] = useState('');

  const filteredLists = useMemo(() => {
    if (!sidebarSearch.trim()) return lists;
    const q = sidebarSearch.toLowerCase();
    return lists.filter((l) => {
      const name = l.name || '';
      const desc = l.description || '';
      return (
        name.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q)
      );
    });
  }, [lists, sidebarSearch]);

  return {
    sidebarSearch,
    setSidebarSearch,
    filteredLists,
  };
}
