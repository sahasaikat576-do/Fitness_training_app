import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import AICoach from './components/AICoach';
import VirtualGym from './components/VirtualGym';
import SocialHub from './components/SocialHub';
import BiometricTracker from './components/BiometricTracker';
import GamificationCenter from './components/GamificationCenter';
import Login from './components/Login';
import { FitnessProvider } from './context/FitnessContext';
import { AuthProvider, useAuth } from './hooks/useAuth';

const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const renderActiveView = () => {
    const views = {
      dashboard: <Dashboard />,
      aicoach: <AICoach />,
      virtualgym: <VirtualGym />,
      social: <SocialHub />,
      biometric: <BiometricTracker />,
      gamification: <GamificationCenter />
    };
    return views[activeView as keyof typeof views] || <Dashboard />;
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-white mb-2">FitVerse</h1>
          <p className="text-cyan-300">Initializing your fitness universe...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <FitnessProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navigation activeView={activeView} setActiveView={setActiveView} />
        <main className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3 }}
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </FitnessProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;