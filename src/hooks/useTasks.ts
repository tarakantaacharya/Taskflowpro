import { useEffect, useState } from 'react';
import { Task } from '../types';
import { storage } from '../utils/storage';
import { mockTasks } from '../utils/mockData';
import { generateId } from '../utils/helpers';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loaded = storage.getTasks();
    if (loaded.length > 0) {
      setTasks(loaded);
    } else {
      setTasks(mockTasks);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      storage.saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  function addTask(task: Task) {
    setTasks(prev => [{ ...task, id: generateId(), createdAt: new Date(), updatedAt: new Date() }, ...prev]);
  }

  function updateTask(id: string, updates: Partial<Task>) {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t)));
  }

  function deleteTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function clearAllTasks() {
    setTasks([]);
    storage.clearTasks();
  }

  function exportTasks(): string {
    return storage.exportTasks();
  }

  function importTasks(json: string): boolean {
    try {
      const imported = storage.importTasks(json);
      setTasks(imported);
      storage.saveTasks(imported);
      return true;
    } catch {
      return false;
    }
  }

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    clearAllTasks,
    exportTasks,
    importTasks,
  };
}
