import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Award, 
  Brain,
  Users,
  Activity,
  Calendar,
  Clock,
  Flame
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { 
      label: 'Neural Score', 
      value: '94.2', 
      icon: Brain, 
      color: 'from-purple-500 to-pink-500',
      change: '+12.3%'
    },
    { 
      label: 'Energy Level', 
      value: '87%', 
      icon: Zap, 
      color: 'from-yellow-500 to-orange-500',
      change: '+5.2%'
    },
    { 
      label: 'Social Rank', 
      value: '#247', 
      icon: Users, 
      color: 'from-green-500 to-emerald-500',
      change: '↑23'
    },
    { 
      label: 'Streak Fire', 
      value: '21 days', 
      icon: Flame, 
      color: 'from-red-500 to-pink-500',
      change: 'New Record!'
    }
  ];

  const aiInsights = [
    {
      type: 'performance',
      title: 'Peak Performance Window',
      message: 'Your optimal workout time is 2:30 PM based on biometric analysis',
      confidence: 94,
      icon: TrendingUp
    },
    {
      type: 'nutrition',
      title: 'Protein Synthesis Alert',
      message: 'Increase protein intake by 15g for optimal muscle recovery',
      confidence: 87,
      icon: Activity
    },
    {
      type: 'recovery',
      title: 'Recovery Optimization',
      message: 'Your sleep quality improved 23% - great job on consistency!',
      confidence: 91,
      icon: Award
    }
  ];

  const virtualChallenges = [
    {
      name: 'Cyber Sprint Challenge',
      participants: 1247,
      timeLeft: '2d 14h',
      reward: '500 FitCoins',
      difficulty: 'Elite',
      progress: 67
    },
    {
      name: 'Neural Network Training',
      participants: 892,
      timeLeft: '5d 8h',
      reward: 'AI Coach Upgrade',
      difficulty: 'Advanced',
      progress: 34
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-3xl p-8 backdrop-blur-xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10" />
            <div className="relative z-10">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Welcome back, <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Saikat</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Your AI fitness companion has analyzed your patterns and prepared personalized recommendations
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                  Start AI Workout
                </button>
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                  View Neural Analysis
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-20`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Insights */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">AI Insights</h2>
            </div>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <motion.div
                    key={index}
                    className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className="h-5 w-5 text-cyan-400 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-medium text-white mb-1">{insight.title}</h3>
                        <p className="text-gray-300 text-sm mb-2">{insight.message}</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-gray-700 rounded-full h-1">
                            <div 
                              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-1 rounded-full"
                              style={{ width: `${insight.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">{insight.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Virtual Challenges */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Virtual Challenges</h2>
            </div>
            <div className="space-y-4">
              {virtualChallenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-white">{challenge.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      challenge.difficulty === 'Elite' 
                        ? 'bg-red-500/20 text-red-300' 
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>{challenge.participants.toLocaleString()} participants</span>
                      <span>{challenge.timeLeft} left</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Reward: {challenge.reward}</span>
                      <span className="text-cyan-400">{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;