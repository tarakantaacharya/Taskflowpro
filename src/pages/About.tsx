import React, { useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { useToast } from '../context/ToastContext';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { 
  CheckCircle2, 
  Target, 
  Zap, 
  Shield, 
  Code2, 
  Sparkles, 
  Cpu, 
  Layout, 
  Layers 
} from 'lucide-react';

export const About: React.FC = () => {
  const { addToast } = useToast();

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 's',
      ctrl: true,
      callback: () => addToast('Keyboard shortcut demo! 🎉', 'success')
    }
  ]);

  const features = [
    {
      icon: CheckCircle2,
      title: 'Task Management',
      description: 'Create, edit, and organize your tasks efficiently with an intuitive interface.',
      color: 'text-blue-500 dark:text-blue-400'
    },
    {
      icon: Target,
      title: 'Priority Levels',
      description: 'Set task priorities (Low, Medium, High) to focus on what matters most.',
      color: 'text-purple-500 dark:text-purple-400'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Your tasks are automatically saved to local storage for seamless experience.',
      color: 'text-yellow-500 dark:text-yellow-400'
    },
    {
      icon: Shield,
      title: 'Data Privacy',
      description: 'All your data stays on your device. No server, no tracking, complete privacy.',
      color: 'text-green-500 dark:text-green-400'
    }
  ];

  const skills = [
    {
      name: 'TypeScript',
      description: 'Type-safe development with interfaces and type checking',
      tags: ['TypeScript', 'Best Practices', 'Type Safety']
    },
    {
      name: 'React 18',
      description: 'Modern React with hooks, context API, and component composition',
      tags: ['React', 'Hooks', 'Context API']
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS with dark mode support and responsive design',
      tags: ['CSS', 'Dark Mode', 'Responsive']
    },
    {
      name: 'State Management',
      description: 'Local storage integration with React state and custom hooks',
      tags: ['State', 'LocalStorage', 'Hooks']
    }
  ];

  const technologies = [
    { name: 'React', version: '18.x', icon: '⚛️', category: 'Frontend Framework' },
    { name: 'TypeScript', version: '5.x', icon: '📘', category: 'Language' },
    { name: 'Tailwind CSS', version: '3.x', icon: '🎨', category: 'Styling' },
    { name: 'Vite', version: '5.x', icon: '⚡', category: 'Build Tool' },
    { name: 'React Router', version: '6.x', icon: '🛣️', category: 'Navigation' },
    { name: 'Context API', version: 'Built-in', icon: '🔄', category: 'State Management' },
    { name: 'LocalStorage', version: 'Built-in', icon: '💾', category: 'Storage' },
    { name: 'Lucide React', version: 'Latest', icon: '🎯', category: 'Icons' },
    { name: 'Date-fns', version: '3.x', icon: '📅', category: 'Utilities' },
    { name: 'ESLint', version: '8.x', icon: '🔍', category: 'Code Quality' }
  ];

  // Group technologies by category
  const groupedTechnologies = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof technologies>);

  const architectureFeatures = [
    {
      title: 'Component Architecture',
      description: 'Modular, reusable components with clear separation of concerns',
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Type Safety',
      description: 'Full TypeScript implementation with strict type checking',
      icon: Cpu,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Responsive Design',
      description: 'Mobile-first approach with Tailwind CSS utilities',
      icon: Layout,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'State Management',
      description: 'Context API for global state and localStorage for persistence',
      icon: Layers,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          About TaskFlow Pro
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A modern, feature-rich task management application built with the latest web technologies.
          Designed to help you stay organized and productive with a clean, intuitive interface.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Try pressing <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+S</kbd> to test keyboard shortcuts!
        </p>
      </div>

      {/* Key Features */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          <Code2 className="inline-block mr-2 mb-1" size={32} />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <Icon className={`${feature.color} mb-4`} size={32} />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Technical Skills */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Technical Implementation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {skill.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Technology Stack - Horizontal layout */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Technology Stack
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {technologies.map((tech, index) => (
            <Card 
              key={index} 
              className="w-44 p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">{tech.icon}</div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {tech.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tech.version}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Architecture Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {architectureFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-2"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Project Info */}
      <Card className="p-8 bg-primary-50 dark:bg-primary-950 border-primary-200 dark:border-primary-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Project Information
        </h2>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            <strong className="text-gray-900 dark:text-white">Version:</strong> 1.0.0
          </p>
          <p>
            <strong className="text-gray-900 dark:text-white">Purpose:</strong> Showcase modern frontend development skills with React, TypeScript, and Tailwind CSS
          </p>
          <p>
            <strong className="text-gray-900 dark:text-white">Features:</strong> Dark mode, toast notifications, keyboard shortcuts, page transitions, local storage persistence
          </p>
          <p>
            <strong className="text-gray-900 dark:text-white">Status:</strong> Production Ready ✅
          </p>
        </div>
      </Card>
    </div>
  );
};
