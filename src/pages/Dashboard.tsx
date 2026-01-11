import { useState, useMemo } from 'react';
import { Plus, Download, Upload, Trash2, SlidersHorizontal, Calendar } from 'lucide-react';
import { Task, ViewMode } from '../types';
import { useTasks } from '../hooks/useTasks';
import { useFilters } from '../hooks/useFilters';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from '../context/ToastContext';
import { StatsOverview } from '../components/features/StatsOverview';
import { FilterBar } from '../components/features/FilterBar';
import { ViewSwitcher } from '../components/features/ViewSwitcher';
import { TaskList } from '../components/features/TaskList';
import { TaskBoard } from '../components/features/TaskBoard';
import { TaskForm } from '../components/features/TaskForm';
import { Button } from '../components/ui/Button';
import { TaskCardSkeleton } from '../components/ui/Skeleton';
import { calculateTaskStats, sortTasks, getAllTags } from '../utils/helpers';

export const Dashboard = () => {
  const { addToast } = useToast();
  const {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    clearAllTasks,
    exportTasks,
    importTasks,
  } = useTasks();

  const [currentView, setCurrentView] = useLocalStorage<ViewMode>('taskflow_view', 'list');
  const [showFilters, setShowFilters] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const {
    filters,
    filteredTasks,
    updateSearchQuery,
    togglePriority,
    toggleStatus,
    toggleTag,
    setDateFilter,
    clearFilters,
    hasActiveFilters,
  } = useFilters(tasks);

  const sortedTasks = useMemo(() => sortTasks(filteredTasks), [filteredTasks]);
  const stats = useMemo(() => calculateTaskStats(tasks), [tasks]);
  const availableTags = useMemo(() => getAllTags(tasks), [tasks]);

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (task: Task) => {
    if (editingTask) {
      updateTask(task.id, task);
      addToast(`Task "${task.title}" updated successfully`, 'success');
    } else {
      addTask(task);
      addToast(`Task "${task.title}" created successfully`, 'success');
    }
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  const handleStatusChange = (id: string, status: Task['status']) => {
    updateTask(id, { status, completedAt: status === 'completed' ? new Date() : undefined });
    const statusText = status === 'completed' ? 'completed' : 'updated';
    addToast(`Task marked as ${statusText}`, 'success');
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    addToast('Task deleted successfully', 'info');
  };

  const handleClearTasks = () => {
    clearAllTasks();
    addToast('All tasks cleared', 'warning');
  };

  const handleExportClick = () => {
    const data = exportTasks();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskflow-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast('Tasks exported successfully', 'success');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          const success = importTasks(content);
          if (success) {
            alert('Tasks imported successfully!');
          } else {
            alert('Failed to import tasks. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
      handleClearTasks();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <TaskCardSkeleton key={i} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Stats Overview */}
          <StatsOverview stats={stats} />

          {/* Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button onClick={handleCreateTask}>
                <Plus size={18} className="mr-2" />
                New Task
              </Button>
              <Button variant="ghost" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal size={18} className="mr-2" />
                Filters
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <ViewSwitcher currentView={currentView} onViewChange={setCurrentView} />
              <Button variant="secondary" onClick={handleExportClick} size="sm">
                <Download size={16} className="mr-2" />
                Export
              </Button>
              <Button variant="secondary" onClick={handleImport} size="sm">
                <Upload size={16} className="mr-2" />
                Import
              </Button>
              <Button variant="danger" onClick={handleClearAll} size="sm">
                <Trash2 size={16} className="mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          {showFilters && (
            <FilterBar
              filters={filters}
              onSearchChange={updateSearchQuery}
              onPriorityToggle={togglePriority}
              onStatusToggle={toggleStatus}
              onTagToggle={toggleTag}
              onDateFilterChange={setDateFilter}
              onClearFilters={clearFilters}
              availableTags={availableTags}
              hasActiveFilters={hasActiveFilters}
            />
          )}

          {/* Task Display */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 min-h-[600px] transition-colors">
            {currentView === 'list' && (
              <TaskList
                tasks={sortedTasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
                emptyMessage={
                  hasActiveFilters
                    ? 'No tasks match your filters'
                    : 'No tasks yet. Create your first task to get started!'
                }
              />
            )}
            {currentView === 'board' && (
              <TaskBoard
                tasks={sortedTasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            )}
            {currentView === 'calendar' && (
              <div className="text-center py-20">
                <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Calendar View Coming Soon
                </h3>
                <p className="text-gray-500">
                  This feature is under development. Stay tuned!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(undefined);
        }}
        onSubmit={handleFormSubmit}
        initialTask={editingTask}
        mode={editingTask ? 'edit' : 'create'}
      />
    </div>
  );
};
