import { useState } from 'react';
import { Save, RefreshCw, Moon, Bell, Globe, Palette } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useTheme } from '../context/ThemeContext';

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    username: 'Demo User',
    email: 'demo@taskflowpro.com',
    language: 'en',
    notifications: 'all',
    timezone: 'UTC',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setSettings({
      username: 'Demo User',
      email: 'demo@taskflowpro.com',
      language: 'en',
      notifications: 'all',
      timezone: 'UTC',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your application preferences and account settings.</p>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-100 transition-colors">
            ✓ Settings saved successfully!
          </div>
        )}

        {/* Profile Settings */}
        <Card className="mb-6 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2 transition-colors">
            <Globe className="text-primary-600" size={24} />
            Profile Settings
          </h2>
          <div className="space-y-4">
            <Input
              label="Username"
              value={settings.username}
              onChange={(e) => setSettings({ ...settings, username: e.target.value })}
              placeholder="Enter your username"
            />
            <Input
              label="Email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>
        </Card>

        {/* Appearance */}
        <Card className="mb-6 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2 transition-colors">
            <Palette className="text-primary-600" size={24} />
            Appearance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Moon className="text-primary-600" size={20} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Currently: {theme === 'dark' ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
              <Button
                onClick={toggleTheme}
                variant="primary"
                size="sm"
              >
                {theme === 'light' ? 'Enable Dark' : 'Disable Dark'}
              </Button>
            </div>
            <Select
              label="Language"
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish (Coming Soon)' },
                { value: 'fr', label: 'French (Coming Soon)' },
                { value: 'de', label: 'German (Coming Soon)' },
              ]}
            />
          </div>
        </Card>

        {/* Notifications */}
        <Card className="mb-6 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2 transition-colors">
            <Bell className="text-primary-600" size={24} />
            Notifications
          </h2>
          <div className="space-y-4">
            <Select
              label="Notification Preferences"
              value={settings.notifications}
              onChange={(e) => setSettings({ ...settings, notifications: e.target.value })}
              options={[
                { value: 'all', label: 'All Notifications' },
                { value: 'important', label: 'Important Only' },
                { value: 'none', label: 'None' },
              ]}
            />
            <Select
              label="Timezone"
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              options={[
                { value: 'UTC', label: 'UTC' },
                { value: 'EST', label: 'Eastern Time' },
                { value: 'PST', label: 'Pacific Time' },
                { value: 'GMT', label: 'GMT' },
              ]}
            />
          </div>
        </Card>

        {/* Data Management */}
        <Card className="mb-6 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors">Data Management</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Your data is stored locally in your browser. Use the Dashboard to export or import your tasks.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary">
              Export Data
            </Button>
            <Button variant="secondary">
              Import Data
            </Button>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleSave}>
            <Save size={18} className="mr-2" />
            Save Settings
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            <RefreshCw size={18} className="mr-2" />
            Reset to Defaults
          </Button>
        </div>

        {/* Note */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors">
          <p className="text-sm text-blue-800 dark:text-blue-100">
            <strong>Note:</strong> This is a demo settings page. Changes are not persisted and are for
            demonstration purposes only. In a production app, these would be saved to a backend.
          </p>
        </div>
      </div>
    </div>
  );
};
