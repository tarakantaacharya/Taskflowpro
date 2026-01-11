import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, Home, LayoutDashboard, Settings, Info, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/about', label: 'About', icon: Info },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <CheckSquare size={28} className="text-primary-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">TaskFlow Pro</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                    ${
                      active
                        ? 'bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-200'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-all ml-2"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}
              <span className="hidden sm:inline text-sm">{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

