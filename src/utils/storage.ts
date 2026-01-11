import { Task } from '../types';

const STORAGE_KEY = 'taskflow_tasks';
const STORAGE_VERSION = '1.0';

export const storage = {
  getTasks: (): Task[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      return parsed.tasks.map((task: Task) => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
    } catch (error) {
      console.error('Error loading tasks from storage:', error);
      return [];
    }
  },

  saveTasks: (tasks: Task[]): void => {
    try {
      const data = {
        version: STORAGE_VERSION,
        tasks,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving tasks to storage:', error);
    }
  },

  clearTasks: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },

  exportTasks: (): string => {
    const tasks = storage.getTasks();
    return JSON.stringify(tasks, null, 2);
  },

  importTasks: (jsonString: string): Task[] => {
    try {
      const tasks = JSON.parse(jsonString);
      if (!Array.isArray(tasks)) {
        throw new Error('Invalid format: expected an array of tasks');
      }
      return tasks.map((task: Task) => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
    } catch (error) {
      console.error('Error importing tasks:', error);
      throw error;
    }
  },
};
