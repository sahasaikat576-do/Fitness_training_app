import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Crown, 
  Zap, 
  Target,
  Gift,
  Coins,
  Award,
  TrendingUp,
  Users,
  Calendar,
  Flame
} from 'lucide-react';

const GamificationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('achievements');

  const playerStats = {
    level: 47,
    xp: 23847,
    nextLevelXp: 25000,
    fitCoins: 12450,
    rank: 247,
    totalUsers: 50000,
    streakDays: 21,
    completedChallenges: 34
  };

  const achievements = [
    {
      id: 1,
      name: 'Neural Network Master',
      description: 'Complete 50 AI-guided workouts',
      progress: 47,
      total: 50,
      reward: '1000 FitCoins + Neural Badge',
      rarity: 'legendary',
      unlocked: false,
      category: 'AI Training'
    },
    {
      id: 2,
      name: 'Virtual Reality Pioneer',
      description: 'Spend 100 hours in VR environments',
      progress: 84,
      total: 100,
      reward: 'Exclusive VR Avatar + 2000 FitCoins',
      rarity: 'epic',
      unlocked: false,
      category: 'VR Fitness'
    },
    {
      id: 3,
      name: 'Social Butterfly',
      description: 'Connect with 25 fitness friends',
      progress: 25,
      total: 25,
      reward: 'Social Hub Badge + 500 FitCoins',
      rarity: 'rare',
      unlocked: true,
      category: 'Social'
    },
    {
      id: 4,
      name: 'Biometric Guru',
      description: 'Track health metrics for 30 consecutive days',
      progress: 21,
      total: 30,
      reward: 'Health Insights Pro + 750 FitCoins',
      rarity: 'epic',
      unlocked: false,
      category: 'Health'
    }
  ];

  const rewards = [
    {
      name: 'Premium AI Coach',
      cost: 5000,
      type: 'upgrade',
      description: 'Unlock advanced AI coaching features',
      icon: Crown,
      available: true
    },
    {
      name: 'Cyberpunk Avatar Set',
      cost: 2500,
      type: 'cosmetic',
      description: 'Exclusive futuristic avatar collection',
      icon: Star,
      available: true
    },
    {
      name: 'VR Environment Pack',
      cost: 3000,
      type: 'content',
      description: 'Access to 5 new virtual environments',
      icon: Gift,
      available: false
    },
    {
      name: 'Workout Multiplier',
      cost: 1500,
      type: 'boost',
      description: '2x XP for next 10 workouts',
      icon: Zap,
      available: true
    }
  ];

  const leaderboards = [
    {
      category: 'Weekly XP',
      position: 12,
      score: '2,847 XP',
      change: '+5',
      icon: TrendingUp
    },
    {
      category: 'Monthly Streaks',
      position: 8,
      score: '21 days',
      change: '+3',
      icon: Flame
    },
    {
      category: 'VR Hours',
      position: 23,
      score: '84.2 hours',
      change: '-2',
      icon: Target
    },
    {
      category: 'Social Score',
      position: 15,
      score: '1,456 points',
      change: '+7',
      icon: Users
    }
  ];

  const dailyQuests = [
    {
      name: 'Morning Warrior',
      description: 'Complete a workout before 10 AM',
      reward: '150 XP + 50 FitCoins',
      progress: 0,
      total: 1,
      completed: false,
      timeLeft: '3h 24m'
    },
    {
      name: 'Social Connector',
      description: 'Like 5 posts in the social feed',
      reward: '100 XP + 25 FitCoins',
      progress: 3,
      total: 5,
      completed: false,
      timeLeft: '18h 45m'
    },
    {
      name: 'Biometric Check',
      description: 'Log your daily health metrics',
      reward: '75 XP + 30 FitCoins',
      progress: 1,
      total: 1,
      completed: true,
      timeLeft: 'Completed'
    }
  ];

  const tabs = [
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'rewards', label: 'Rewards Store', icon: Gift },
    { id: 'leaderboards', label: 'Leaderboards', icon: Crown },
    { id: 'quests', label: 'Daily Quests', icon: Target }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-500 to-orange-500';
      case 'epic': return 'from-purple-500 to-pink-500';
      case 'rare': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-3xl p-8 backdrop-blur-xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Gamification Center</h1>
                  <p className="text-gray-300">Level up your fitness journey with rewards and achievements</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-yellow-400">Level {playerStats.level}</div>
                <div className="text-sm text-gray-300">Fitness Champion</div>
              </div>
            </div>

            {/* Player Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{playerStats.fitCoins.toLocaleString()}</div>
                <div className="text-sm text-gray-300 flex items-center justify-center">
                  <Coins className="h-4 w-4 mr-1" />
                  FitCoins
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">#{playerStats.rank}</div>
                <div className="text-sm text-gray-300">Global Rank</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">{playerStats.streakDays}</div>
                <div className="text-sm text-gray-300 flex items-center justify-center">
                  <Flame className="h-4 w-4 mr-1" />
                  Day Streak
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{playerStats.completedChallenges}</div>
                <div className="text-sm text-gray-300">Challenges Won</div>
              </div>
            </div>

            {/* XP Progress */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>Level {playerStats.level}</span>
                <span>{playerStats.xp.toLocaleString()} / {playerStats.nextLevelXp.toLocaleString()} XP</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(playerStats.xp / playerStats.nextLevelXp) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex space-x-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Achievements */}
        {activeTab === 'achievements' && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-white">{achievement.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                        {achievement.rarity}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{achievement.description}</p>
                    <p className="text-yellow-400 text-sm">{achievement.reward}</p>
                  </div>
                  {achievement.unlocked && (
                    <div className="bg-green-500 rounded-full p-2">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{achievement.progress}/{achievement.total}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        achievement.unlocked 
                          ? 'bg-green-500' 
                          : `bg-gradient-to-r ${getRarityColor(achievement.rarity)}`
                      }`}
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-400 bg-white/5 rounded-lg px-3 py-2">
                  Category: {achievement.category}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Rewards Store */}
        {activeTab === 'rewards' && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {rewards.map((reward, index) => {
              const Icon = reward.icon;
              return (
                <motion.div
                  key={index}
                  className={`bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 transition-all duration-300 ${
                    reward.available ? 'hover:bg-white/10' : 'opacity-60'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={reward.available ? { scale: 1.02 } : {}}
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{reward.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{reward.description}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-4">
                      <Coins className="h-4 w-4 text-yellow-400" />
                      <span className="text-xl font-bold text-yellow-400">{reward.cost.toLocaleString()}</span>
                    </div>
                    
                    <motion.button
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                        reward.available && playerStats.fitCoins >= reward.cost
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!reward.available || playerStats.fitCoins < reward.cost}
                      whileHover={reward.available && playerStats.fitCoins >= reward.cost ? { scale: 1.02 } : {}}
                      whileTap={reward.available && playerStats.fitCoins >= reward.cost ? { scale: 0.98 } : {}}
                    >
                      {!reward.available ? 'Coming Soon' : 
                       playerStats.fitCoins < reward.cost ? 'Insufficient Coins' : 'Purchase'}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Leaderboards */}
        {activeTab === 'leaderboards' && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {leaderboards.map((board, index) => {
              const Icon = board.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Icon className="h-5 w-5 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-white">{board.category}</h3>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">#{board.position}</div>
                    <div className="text-xl text-white mb-2">{board.score}</div>
                    <div className={`text-sm ${
                      board.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {board.change} from last week
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Daily Quests */}
        {activeTab === 'quests' && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {dailyQuests.map((quest, index) => (
              <motion.div
                key={index}
                className={`bg-white/5 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 ${
                  quest.completed 
                    ? 'border-green-500/30 bg-green-900/20' 
                    : 'border-white/10 hover:bg-white/10'
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-white">{quest.name}</h3>
                      {quest.completed && (
                        <div className="bg-green-500 rounded-full p-1">
                          <Award className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{quest.description}</p>
                    <p className="text-yellow-400 text-sm">{quest.reward}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-400 mb-2">{quest.timeLeft}</div>
                    <div className="text-lg font-bold text-cyan-400">
                      {quest.progress}/{quest.total}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        quest.completed ? 'bg-green-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                      }`}
                      style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GamificationCenter;