import { Task, TaskStats, FilterState, FilterOption } from '../types';
import { isToday, isThisWeek, isPast, startOfDay } from 'date-fns';

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const calculateTaskStats = (tasks: Task[]): TaskStats => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const overdue = tasks.filter(t => {
    if (t.status === 'completed' || !t.dueDate) return false;
    return isPast(startOfDay(t.dueDate)) && !isToday(t.dueDate);
  }).length;
  
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, completed, inProgress, overdue, completionRate };
};

export const filterTasks = (tasks: Task[], filters: FilterState): Task[] => {
  return tasks.filter(task => {
    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(query);
      const matchesDescription = task.description.toLowerCase().includes(query);
      const matchesTags = task.tags.some(tag => tag.toLowerCase().includes(query));
      if (!matchesTitle && !matchesDescription && !matchesTags) return false;
    }

    // Priority filter
    if (filters.selectedPriorities.length > 0 && !filters.selectedPriorities.includes(task.priority)) {
      return false;
    }

    // Status filter
    if (filters.selectedStatuses.length > 0 && !filters.selectedStatuses.includes(task.status)) {
      return false;
    }

    // Tags filter
    if (filters.selectedTags.length > 0) {
      const hasMatchingTag = filters.selectedTags.some(tag => task.tags.includes(tag));
      if (!hasMatchingTag) return false;
    }

    // Date filter
    if (filters.dateFilter !== 'all') {
      if (!task.dueDate) return false;
      
      switch (filters.dateFilter) {
        case 'today':
          if (!isToday(task.dueDate)) return false;
          break;
        case 'week':
          if (!isThisWeek(task.dueDate, { weekStartsOn: 1 })) return false;
          break;
        case 'overdue':
          if (!isPast(startOfDay(task.dueDate)) || isToday(task.dueDate) || task.status === 'completed') {
            return false;
          }
          break;
      }
    }

    return true;
  });
};

export const sortTasks = (tasks: Task[], sortBy: 'dueDate' | 'priority' | 'created' = 'dueDate'): Task[] => {
  const priorityWeight = { urgent: 4, high: 3, medium: 2, low: 1 };
  
  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      case 'created':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'dueDate':
      default:
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();
    }
  });
};

export const getAllTags = (tasks: Task[]): string[] => {
  const tagSet = new Set<string>();
  tasks.forEach(task => {
    task.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'urgent':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'high':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'low':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'in-progress':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'review':
      return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'todo':
      return 'text-gray-600 bg-gray-50 border-gray-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export const formatDate = (date: Date | null): string => {
  if (!date) return 'No due date';
  
  const today = startOfDay(new Date());
  const targetDate = startOfDay(date);
  
  if (isToday(date)) return 'Today';
  
  const diffDays = Math.floor((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays < -1) return `${Math.abs(diffDays)} days overdue`;
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const isOverdue = (task: Task): boolean => {
  if (!task.dueDate || task.status === 'completed') return false;
  return isPast(startOfDay(task.dueDate)) && !isToday(task.dueDate);
};
