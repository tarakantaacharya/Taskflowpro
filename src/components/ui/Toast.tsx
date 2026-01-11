import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { ReactNode } from 'react';

interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose: () => void;
}

export const Toast = ({ type, message, onClose }: ToastProps) => {
  const configs = {
    success: {
      icon: CheckCircle2,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-500',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-500',
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-500',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-500',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border shadow-medium
        ${config.bgColor} ${config.borderColor}
        animate-slide-in-right
      `}
    >
      <Icon className={`flex-shrink-0 ${config.iconColor}`} size={20} />
      <p className={`flex-1 text-sm font-medium ${config.textColor}`}>
        {message}
      </p>
      <button
        onClick={onClose}
        className={`flex-shrink-0 ${config.textColor} opacity-70 hover:opacity-100 transition-opacity`}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export const ToastContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {children}
    </div>
  );
};
