export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed';
export type ViewMode = 'list' | 'board' | 'calendar';
export type FilterOption = 'all' | 'today' | 'week' | 'overdue';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  assignee?: string;
  estimatedHours?: number;
  completedAt?: Date;
}

export interface Column {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
  completionRate: number;
}

export interface FilterState {
  searchQuery: string;
  selectedPriorities: TaskPriority[];
  selectedStatuses: TaskStatus[];
  selectedTags: string[];
  dateFilter: FilterOption;
}
