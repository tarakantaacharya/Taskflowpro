import { Task, TaskStatus } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Calendar, Edit, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

const columns: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: 'Todo' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'completed', title: 'Completed' },
];

export const TaskBoard = ({ tasks, onEdit, onDelete, onStatusChange }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map(col => (
        <Card key={col.id} title={col.title} className="bg-gray-50 dark:bg-gray-900">
          <div className="space-y-3">
            {tasks.filter(t => t.status === col.id).map(task => (
              <div key={task.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900 dark:text-white">{task.title}</div>
                    {task.description && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">{task.description}</div>
                    )}
                    <div className="inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <Calendar size={14} className="text-primary-600 dark:text-primary-300" />
                      {formatDate(task.dueDate)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="px-2 py-2" onClick={() => onEdit(task)} aria-label="Edit">
                      <Edit size={16} />
                    </Button>
                    <Button size="sm" variant="danger" className="px-2 py-2" onClick={() => onDelete(task.id)} aria-label="Delete">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {tasks.filter(t => t.status === col.id).length === 0 && (
              <div className="text-sm text-gray-500 dark:text-gray-400">No tasks</div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
