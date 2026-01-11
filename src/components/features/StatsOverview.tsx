import { Card } from '../ui/Card';
import { TaskStats } from '../../types';
import { CheckCircle2, Clock, AlertTriangle, Percent } from 'lucide-react';

interface Props {
  stats: TaskStats;
}

export const StatsOverview = ({ stats }: Props) => {
  const items = [
    { title: 'Total Tasks', value: stats.total, icon: Clock },
    { title: 'Completed', value: stats.completed, icon: CheckCircle2 },
    { title: 'In Progress', value: stats.inProgress, icon: Clock },
    { title: 'Overdue', value: stats.overdue, icon: AlertTriangle },
    { title: 'Completion Rate', value: `${stats.completionRate}%`, icon: Percent },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {items.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900">
                <Icon className="text-primary-600 dark:text-primary-300" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
