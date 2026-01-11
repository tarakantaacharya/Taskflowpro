import { Task } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatDate, getPriorityColor, getStatusColor } from '../../utils/helpers';
import { Calendar, Flag, CheckCircle2, Edit, Trash2, Tag } from 'lucide-react';

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
  emptyMessage?: string;
}

export const TaskList = ({ tasks, onEdit, onDelete, onStatusChange, emptyMessage }: Props) => {
  if (tasks.length === 0) {
    return (
      <Card className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">{emptyMessage || 'No tasks found.'}</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map(task => (
        <Card key={task.id} hoverable className="overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3>
              {task.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                aria-label="Edit"
                className="px-2 py-2"
                onClick={() => onEdit(task)}
              >
                <Edit size={16} />
              </Button>
              <Button
                variant={task.status === 'completed' ? 'secondary' : 'primary'}
                size="sm"
                aria-label={task.status === 'completed' ? 'Mark Todo' : 'Complete'}
                className="px-2 py-2"
                onClick={() => onStatusChange(task.id, task.status === 'completed' ? 'todo' : 'completed')}
              >
                <CheckCircle2 size={16} />
              </Button>
              <Button
                variant="danger"
                size="sm"
                aria-label="Delete"
                className="px-2 py-2"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>

          {/* Meta */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <Flag className="text-orange-500" size={16} />
              <span className={`text-xs font-medium px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>{task.priority}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <Calendar className="text-primary-600 dark:text-primary-300" size={16} />
              <span className="text-sm text-gray-700 dark:text-gray-300">{formatDate(task.dueDate)}</span>
            </div>
          </div>

          {/* Tags */}
          {task.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {task.tags.map(t => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                >
                  <Tag size={12} className="text-gray-500 dark:text-gray-400" />
                  {t}
                </span>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};
