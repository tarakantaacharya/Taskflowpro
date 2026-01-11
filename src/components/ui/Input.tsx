import { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = ({
  label,
  error,
  icon,
  className = '',
  ...props
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 transition-colors">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent
            transition-all duration-200 outline-none
            disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 dark:border-red-400' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 transition-colors">{error}</p>
      )}
    </div>
  );
};
