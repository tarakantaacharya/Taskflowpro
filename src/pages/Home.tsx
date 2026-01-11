import { Link } from 'react-router-dom';
import { CheckCircle2, Zap, Shield, Smartphone, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Home = () => {
  const features = [
    {
      icon: CheckCircle2,
      title: 'Task Management',
      description: 'Create, organize, and track tasks with priorities, due dates, and tags.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with Vite and optimized for performance. Instant updates and smooth interactions.',
    },
    {
      icon: Shield,
      title: 'Type Safe',
      description: 'Written in TypeScript with strict type checking for reliability and maintainability.',
    },
    {
      icon: Smartphone,
      title: 'Fully Responsive',
      description: 'Works seamlessly across all devices - desktop, tablet, and mobile.',
    },
  ];

  const stats = [
    { value: '100%', label: 'Type Coverage' },
    { value: '<200KB', label: 'Bundle Size' },
    { value: '95+', label: 'Lighthouse Score' },
    { value: 'React 18', label: 'Latest Tech' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-10 dark:opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Star className="text-yellow-500 fill-yellow-500" size={24} />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Professional Frontend Project
              </span>
              <Star className="text-yellow-500 fill-yellow-500" size={24} />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              TaskFlow <span className="text-primary-600">Pro</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced Task Management Dashboard built with React 18, TypeScript, and Tailwind CSS.
              A comprehensive demonstration of modern frontend engineering.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8 py-4">
                  Open Dashboard
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-soft border border-gray-200 dark:border-gray-800 transition-colors">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 transition-colors">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium transition-colors">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need for professional task management in a modern, beautiful interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} hoverable className="text-center">
                  <div className="bg-primary-50 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                    <Icon className="text-primary-600 dark:text-primary-300 transition-colors" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors">
              Leveraging the latest frontend tools and best practices for optimal performance.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { name: 'React 18', color: 'text-blue-500' },
              { name: 'TypeScript', color: 'text-blue-600' },
              { name: 'Tailwind CSS', color: 'text-cyan-500' },
              { name: 'Vite', color: 'text-purple-500' },
              { name: 'Lucide Icons', color: 'text-red-500' },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center p-6 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-800"
              >
                <div className={`text-5xl font-bold ${tech.color} mb-2 transition-colors`}>
                  {tech.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-900 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 dark:text-primary-200 mb-8">
            Experience the power of modern task management. No signup required.
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Try Dashboard Now
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
