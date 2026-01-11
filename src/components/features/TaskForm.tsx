import { useEffect, useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Task, TaskPriority, TaskStatus } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  initialTask?: Task;
  mode: 'create' | 'edit';
}

export const TaskForm = ({ isOpen, onClose, onSubmit, initialTask, mode }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [dueDate, setDueDate] = useState<string>('');
  const [tags, setTags] = useState<string>('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setPriority(initialTask.priority);
      setStatus(initialTask.status);
      setDueDate(initialTask.dueDate ? initialTask.dueDate.toISOString().split('T')[0] : '');
      setTags(initialTask.tags.join(', '));
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setStatus('todo');
      setDueDate('');
      setTags('');
    }
  }, [initialTask, isOpen]);

  const handleSubmit = () => {
    const task: Task = {
      id: initialTask?.id || '',
      title,
      description,
      priority,
      status,
      dueDate: dueDate ? new Date(dueDate) : null,
      createdAt: initialTask?.createdAt || new Date(),
      updatedAt: new Date(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    onSubmit(task);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'edit' ? 'Edit Task' : 'Create Task'}
      footer={(
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{mode === 'edit' ? 'Save' : 'Create'}</Button>
        </>
      )}
      size="lg"
    >
      <div className="space-y-4">
        <Input label="Title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" />
        <Textarea label="Description" value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Task description" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Priority"
            value={priority}
            onChange={e => setPriority(e.target.value as TaskPriority)}
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
              { value: 'urgent', label: 'Urgent' },
            ]}
          />
          <Select
            label="Status"
            value={status}
            onChange={e => setStatus(e.target.value as TaskStatus)}
            options={[
              { value: 'todo', label: 'Todo' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'review', label: 'Review' },
              { value: 'completed', label: 'Completed' },
            ]}
          />
          <Input label="Due Date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        </div>
        <Input label="Tags" value={tags} onChange={e => setTags(e.target.value)} placeholder="comma,separated,tags" />
      </div>
    </Modal>
  );
};
