import { useMemo, useState } from 'react';
import { FilterOption, FilterState, Task, TaskPriority, TaskStatus } from '../types';
import { filterTasks } from '../utils/helpers';

export function useFilters(tasks: Task[]) {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedPriorities: [],
    selectedStatuses: [],
    selectedTags: [],
    dateFilter: 'all',
  });

  const filteredTasks = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);

  const updateSearchQuery = (query: string) => setFilters(prev => ({ ...prev, searchQuery: query }));
  const togglePriority = (p: TaskPriority) => setFilters(prev => {
    const exists = prev.selectedPriorities.includes(p);
    return { ...prev, selectedPriorities: exists ? prev.selectedPriorities.filter(x => x !== p) : [...prev.selectedPriorities, p] };
  });
  const toggleStatus = (s: TaskStatus) => setFilters(prev => {
    const exists = prev.selectedStatuses.includes(s);
    return { ...prev, selectedStatuses: exists ? prev.selectedStatuses.filter(x => x !== s) : [...prev.selectedStatuses, s] };
  });
  const toggleTag = (tag: string) => setFilters(prev => {
    const exists = prev.selectedTags.includes(tag);
    return { ...prev, selectedTags: exists ? prev.selectedTags.filter(x => x !== tag) : [...prev.selectedTags, tag] };
  });
  const setDateFilter = (opt: FilterOption) => setFilters(prev => ({ ...prev, dateFilter: opt }));
  const clearFilters = () => setFilters({ searchQuery: '', selectedPriorities: [], selectedStatuses: [], selectedTags: [], dateFilter: 'all' });
  const hasActiveFilters = filters.searchQuery !== '' || filters.selectedPriorities.length > 0 || filters.selectedStatuses.length > 0 || filters.selectedTags.length > 0 || filters.dateFilter !== 'all';

  return { filters, filteredTasks, updateSearchQuery, togglePriority, toggleStatus, toggleTag, setDateFilter, clearFilters, hasActiveFilters };
}
