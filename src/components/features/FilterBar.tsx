import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { FilterOption, FilterState, TaskPriority, TaskStatus } from '../../types';

interface Props {
  filters: FilterState;
  onSearchChange: (q: string) => void;
  onPriorityToggle: (p: TaskPriority) => void;
  onStatusToggle: (s: TaskStatus) => void;
  onTagToggle: (tag: string) => void;
  onDateFilterChange: (opt: FilterOption) => void;
  onClearFilters: () => void;
  availableTags: string[];
  hasActiveFilters: boolean;
}

export const FilterBar = ({ filters, onSearchChange, onPriorityToggle, onStatusToggle, onTagToggle, onDateFilterChange, onClearFilters, availableTags, hasActiveFilters }: Props) => {
  const priorities: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];
  const statuses: TaskStatus[] = ['todo', 'in-progress', 'review', 'completed'];
  const dates: FilterOption[] = ['all', 'today', 'week', 'overdue'];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search tasks..."
          value={filters.searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          {priorities.map(p => (
            <Button
              key={p}
              variant={filters.selectedPriorities.includes(p) ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => onPriorityToggle(p)}
            >
              {p}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {statuses.map(s => (
            <Button
              key={s}
              variant={filters.selectedStatuses.includes(s) ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => onStatusToggle(s)}
            >
              {s}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {dates.map(d => (
            <Button
              key={d}
              variant={filters.dateFilter === d ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => onDateFilterChange(d)}
            >
              {d}
            </Button>
          ))}
        </div>
      </div>

      {availableTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {availableTags.map(tag => (
            <Button
              key={tag}
              variant={filters.selectedTags.includes(tag) ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => onTagToggle(tag)}
            >
              #{tag}
            </Button>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Button variant="ghost" size="sm" onClick={onClearFilters} disabled={!hasActiveFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
};
