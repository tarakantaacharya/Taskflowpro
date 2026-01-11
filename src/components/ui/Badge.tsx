import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'gray';
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

export const Badge = ({
  children,
  variant = 'gray',
  removable = false,
  onRemove,
  className = '',
}: BadgeProps) => {
  const variants: Record<string, string> = {
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-colors"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
};
