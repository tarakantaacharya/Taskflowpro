import { ReactNode } from 'react';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
}

export const Dropdown = ({
  isOpen,
  onClose,
  trigger,
  children,
  align = 'right',
}: DropdownProps) => {
  return (
    <div className="relative">
      {trigger}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={onClose}
          />
          <div
            className={`
              absolute z-20 mt-2 py-2 min-w-[200px]
              bg-white rounded-lg shadow-strong border border-gray-200
              ${align === 'right' ? 'right-0' : 'left-0'}
            `}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
};

interface DropdownItemProps {
  onClick?: () => void;
  icon?: ReactNode;
  children: ReactNode;
  danger?: boolean;
}

export const DropdownItem = ({
  onClick,
  icon,
  children,
  danger = false,
}: DropdownItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-2 text-sm
        hover:bg-gray-50 transition-colors text-left
        ${danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export const DropdownDivider = () => {
  return <div className="my-1 border-t border-gray-200" />;
};
