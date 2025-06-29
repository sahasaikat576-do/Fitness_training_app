import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Trophy,
  Zap,
  Target,
  TrendingUp,
  Plus,
  Crown
} from 'lucide-react';

const SocialHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const socialFeed = [
    {
      id: 1,
      user: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      time: '2h ago',
      type: 'achievement',
      content: 'Just completed the Cyber Sprint Challenge! 🚀 New personal record: 23:45',
      likes: 47,
      comments: 12,
      achievement: 'Speed Demon',
      stats: { distance: '5.2km', time: '23:45', calories: 312 }
    },
    {
      id: 2,
      user: 'Maya Rodriguez',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
      time: '4h ago',
      type: 'workout',
      content: 'Virtual Reality strength training session in the Space Station environment was incredible! The zero-gravity simulation really challenged my core.',
      likes: 89,
      comments: 23,
      workout: 'Quantum Strength Protocol',
      stats: { duration: '35 min', volume: '2,840 lbs', calories: 387 }
    },
    {
      id: 3,
      user: 'Jordan Kim',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      time: '6h ago',
      type: 'milestone',
      content: 'Hit my 100-day streak today! The AI coach has been amazing at keeping me motivated and adjusting my workouts.',
      likes: 156,
      comments: 34,
      milestone: '100 Day Streak',
      stats: { streak: 100, totalWorkouts: 127, totalTime: '84h 32m' }
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Saikat', score: 2847, change: '+23', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', badge: 'Neural Champion' },
    { rank: 2, name: 'Alex Chen', score: 2834, change: '+12', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg', badge: 'Speed Demon' },
    { rank: 3, name: 'Maya Rodriguez', score: 2801, change: '+8', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg', badge: 'VR Master' },
    { rank: 4, name: 'Jordan Kim', score: 2789, change: '+15', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', badge: 'Consistency King' },
    { rank: 5, name: 'Sam Wilson', score: 2756, change: '-5', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg', badge: 'Power Lifter' }
  ];

  const challenges = [
    {
      name: 'Global Fitness Olympics',
      participants: 15420,
      timeLeft: '12d 8h',
      reward: '10,000 FitCoins + Exclusive Avatar',
      difficulty: 'Elite',
      progress: 34,
      type: 'competition'
    },
    {
      name: 'Team Endurance Challenge',
      participants: 2847,
      timeLeft: '3d 14h',
      reward: 'Team Badge + VR Environment',
      difficulty: 'Advanced',
      progress: 67,
      type: 'team'
    },
    {
      name: 'AI Coach Beta Test',
      participants: 892,
      timeLeft: '8d 2h',
      reward: 'Early Access + Premium Features',
      difficulty: 'Intermediate',
      progress: 89,
      type: 'beta'
    }
  ];

  const tabs = [
    { id: 'feed', label: 'Social Feed', icon: MessageCircle },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'challenges', label: 'Challenges', icon: Target }
  ];

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
          <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 rounded-3xl p-8 backdrop-blur-xl border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Social Fitness Hub</h1>
                  <p className="text-gray-300">Connect, compete, and celebrate with the fitness community</p>
                </div>
              </div>
              <motion.button
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="h-4 w-4 mr-2 inline" />
                Share Workout
              </motion.button>
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

        {/* Social Feed */}
        {activeTab === 'feed' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {socialFeed.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <img 
                    src={post.avatar} 
                    alt={post.user}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-white">{post.user}</h3>
                      <span className="text-gray-400 text-sm">{post.time}</span>
                      {post.type === 'achievement' && (
                        <div className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs">
                          Achievement
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-300 mb-4">{post.content}</p>
                    
                    {/* Stats */}
                    <div className="bg-white/5 rounded-xl p-4 mb-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {Object.entries(post.stats).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-lg font-bold text-cyan-400">{value}</div>
                            <div className="text-xs text-gray-400 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-6">
                      <motion.button
                        className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </motion.button>
                      <motion.button
                        className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.comments}</span>
                      </motion.button>
                      <motion.button
                        className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Share2 className="h-4 w-4" />
                        <span className="text-sm">Share</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Leaderboard */}
        {activeTab === 'leaderboard' && (
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <motion.div
                  key={user.rank}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                    user.name === 'Saikat' 
                      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      user.rank === 1 ? 'bg-yellow-500 text-black' :
                      user.rank === 2 ? 'bg-gray-400 text-black' :
                      user.rank === 3 ? 'bg-orange-600 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {user.rank === 1 ? <Crown className="h-4 w-4" /> : user.rank}
                    </div>
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-white">{user.name}</h3>
                      <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                        {user.badge}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-cyan-400">{user.score.toLocaleString()}</div>
                    <div className={`text-sm ${
                      user.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {user.change}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Challenges */}
        {activeTab === 'challenges' && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-white">{challenge.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    challenge.difficulty === 'Elite' 
                      ? 'bg-red-500/20 text-red-300'
                      : challenge.difficulty === 'Advanced'
                      ? 'bg-orange-500/20 text-orange-300'
                      : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Participants</span>
                    <span className="text-white">{challenge.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Time Left</span>
                    <span className="text-cyan-400">{challenge.timeLeft}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Reward: </span>
                    <span className="text-yellow-400">{challenge.reward}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                </div>
                
                <motion.button
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join Challenge
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SocialHub;