import { Button } from '../ui/Button';
import { ViewMode } from '../../types';

interface Props {
  currentView: ViewMode;
  onViewChange: (v: ViewMode) => void;
}

export const ViewSwitcher = ({ currentView, onViewChange }: Props) => {
  const options: ViewMode[] = ['list', 'board', 'calendar'];
  return (
    <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {options.map(v => (
        <Button
          key={v}
          variant={currentView === v ? 'primary' : 'ghost'}
          size="sm"
          className="mx-1"
          onClick={() => onViewChange(v)}
        >
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Button>
      ))}
    </div>
  );
};
