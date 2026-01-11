import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = ({
  label,
  error,
  options,
  className = '',
  ...props
}: SelectProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
          focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent
          transition-all duration-200 outline-none
          disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed
          ${error ? 'border-red-500 dark:border-red-400' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 transition-colors">{error}</p>
      )}
    </div>
  );
};
