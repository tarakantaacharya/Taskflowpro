import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white dark:text-white font-bold text-lg mb-4">TaskFlow Pro</h3>
            <p className="text-sm leading-relaxed">
              A modern, professional task management dashboard built with React 18, TypeScript,
              and Tailwind CSS. Demonstrating advanced frontend engineering skills.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white dark:text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-primary-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-primary-400 transition-colors">Dashboard</a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary-400 transition-colors">About</a>
              </li>
              <li>
                <a href="/settings" className="hover:text-primary-400 transition-colors">Settings</a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white dark:text-white font-bold text-lg mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:contact@taskflowpro.com"
                className="hover:text-primary-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-center sm:text-left">
            © {currentYear} TaskFlow Pro. Built with{' '}
            <Heart size={14} className="inline text-red-500" /> by Frontend Engineers.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-600">
            React 18 • TypeScript • Tailwind CSS • Vite
          </p>
        </div>
      </div>
    </footer>
  );
};
