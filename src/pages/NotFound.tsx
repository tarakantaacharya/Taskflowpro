import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button size="lg">
              <Home size={20} className="mr-2" />
              Go Home
            </Button>
          </Link>
          <Button variant="secondary" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft size={20} className="mr-2" />
            Go Back
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
              Home
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link to="/dashboard" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
              Dashboard
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link to="/about" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
              About
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link to="/settings" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
