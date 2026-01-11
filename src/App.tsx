import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import './index.css';

function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
      <Navbar />
      <main className="flex-1 animate-page-transition">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <AppContent />
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
