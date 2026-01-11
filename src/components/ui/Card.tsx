import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  children: ReactNode;
  title?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card = ({
  children,
  title,
  icon: Icon,
  action,
  className = '',
  onClick,
  hoverable = false,
}: CardProps) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-soft transition-colors
        ${hoverable ? 'hover:shadow-medium transition-shadow duration-200' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {(title || action) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 transition-colors">
          <div className="flex items-center gap-2">
            {Icon && <Icon size={20} className="text-gray-600 dark:text-gray-400" />}
            {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">{title}</h3>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={title || action ? 'p-6' : 'p-6'}>
        {children}
      </div>
    </div>
  );
};
