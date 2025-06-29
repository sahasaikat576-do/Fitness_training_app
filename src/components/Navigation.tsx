import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Brain, 
  Gamepad2, 
  Users, 
  Activity, 
  Trophy,
  Zap,
  LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavigationProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, setActiveView }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Command Center', color: 'from-blue-500 to-cyan-500' },
    { id: 'aicoach', icon: Brain, label: 'AI Coach', color: 'from-purple-500 to-pink-500' },
    { id: 'virtualgym', icon: Gamepad2, label: 'Virtual Gym', color: 'from-green-500 to-emerald-500' },
    { id: 'social', icon: Users, label: 'Social Hub', color: 'from-orange-500 to-red-500' },
    { id: 'biometric', icon: Activity, label: 'Bio Tracker', color: 'from-teal-500 to-blue-500' },
    { id: 'gamification', icon: Trophy, label: 'Achievements', color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <nav className="bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                FitVerse
              </h1>
              <p className="text-xs text-gray-400">AI-Powered Fitness</p>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`relative px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 ${
                    activeView === item.id
                      ? 'bg-white/10 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeView === item.id && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20 rounded-xl`}
                      layoutId="activeTab"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <Icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium text-white">{user?.name}</div>
              <div className="text-xs text-gray-400">Level {user?.level}</div>
            </div>
            <motion.button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="h-5 w-5" />
            </motion.button>
          </div>

          <div className="md:hidden flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    activeView === item.id
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;