import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Users, 
  Trophy, 
  Zap, 
  Target,
  Play,
  Pause,
  RotateCcw,
  Volume2
} from 'lucide-react';

const VirtualGym: React.FC = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState('cyberpunk');
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutTime, setWorkoutTime] = useState(0);

  const environments = [
    {
      id: 'cyberpunk',
      name: 'Cyberpunk City',
      description: 'Train in a neon-lit futuristic cityscape',
      image: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg',
      difficulty: 'High Intensity',
      participants: 1247
    },
    {
      id: 'space',
      name: 'Space Station',
      description: 'Zero-gravity training environment',
      image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg',
      difficulty: 'Extreme',
      participants: 892
    },
    {
      id: 'forest',
      name: 'Mystic Forest',
      description: 'Peaceful nature setting for mindful workouts',
      image: 'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg',
      difficulty: 'Moderate',
      participants: 2156
    },
    {
      id: 'underwater',
      name: 'Underwater Palace',
      description: 'Aquatic resistance training simulation',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
      difficulty: 'Advanced',
      participants: 743
    }
  ];

  const virtualWorkouts = [
    {
      name: 'Neural Combat Training',
      duration: '25 min',
      calories: '320-450',
      type: 'HIIT + Combat',
      level: 'Advanced',
      rating: 4.9
    },
    {
      name: 'Quantum Strength Protocol',
      duration: '35 min',
      calories: '280-380',
      type: 'Strength + Power',
      level: 'Expert',
      rating: 4.8
    },
    {
      name: 'Zen Flow Dimension',
      duration: '20 min',
      calories: '150-220',
      type: 'Yoga + Meditation',
      level: 'Beginner',
      rating: 4.7
    },
    {
      name: 'Cardio Warp Speed',
      duration: '30 min',
      calories: '400-550',
      type: 'Cardio + Dance',
      level: 'Intermediate',
      rating: 4.9
    }
  ];

  const achievements = [
    { name: 'Virtual Warrior', progress: 87, total: 100, reward: '500 VR Coins' },
    { name: 'Dimension Hopper', progress: 45, total: 50, reward: 'New Environment' },
    { name: 'Cyber Athlete', progress: 23, total: 30, reward: 'Elite Avatar' }
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
          <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-3xl p-8 backdrop-blur-xl border border-white/10">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                <Gamepad2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Virtual Reality Gym</h1>
                <p className="text-gray-300">Immersive fitness experiences in virtual worlds</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400">12</div>
                <div className="text-sm text-gray-300">VR Sessions</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">4.2k</div>
                <div className="text-sm text-gray-300">Calories Burned</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">8h 45m</div>
                <div className="text-sm text-gray-300">Total Time</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">#127</div>
                <div className="text-sm text-gray-300">Global Rank</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Virtual Environments */}
          <motion.div
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Virtual Environments</h2>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">5,038 active users</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {environments.map((env, index) => (
                <motion.div
                  key={env.id}
                  className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedEnvironment === env.id 
                      ? 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-400/25' 
                      : 'hover:scale-105'
                  }`}
                  onClick={() => setSelectedEnvironment(env.id)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: selectedEnvironment === env.id ? 1 : 1.05 }}
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative">
                    <img 
                      src={env.image} 
                      alt={env.name}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold mb-1">{env.name}</h3>
                      <p className="text-gray-300 text-sm mb-2">{env.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white">
                          {env.difficulty}
                        </span>
                        <span className="text-xs text-gray-300">
                          {env.participants.toLocaleString()} users
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Workout Controls */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Workout Session</h3>
                <div className="text-2xl font-mono text-cyan-400">
                  {Math.floor(workoutTime / 60).toString().padStart(2, '0')}:
                  {(workoutTime % 60).toString().padStart(2, '0')}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={() => setIsWorkoutActive(!isWorkoutActive)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isWorkoutActive
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isWorkoutActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isWorkoutActive ? 'Pause' : 'Start'} VR Session</span>
                </motion.button>
                
                <motion.button
                  onClick={() => setWorkoutTime(0)}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="h-4 w-4" />
                </motion.button>
                
                <motion.button
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Volume2 className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Virtual Workouts */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Target className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">VR Workouts</h3>
              </div>
              
              <div className="space-y-3">
                {virtualWorkouts.map((workout, index) => (
                  <motion.div
                    key={index}
                    className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white text-sm">{workout.name}</h4>
                      <div className="flex items-center space-x-1">
                        <Trophy className="h-3 w-3 text-yellow-400" />
                        <span className="text-xs text-yellow-400">{workout.rating}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div className="flex justify-between">
                        <span>{workout.duration}</span>
                        <span>{workout.calories} cal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{workout.type}</span>
                        <span className="text-cyan-400">{workout.level}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Trophy className="h-5 w-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">VR Achievements</h3>
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium text-sm">{achievement.name}</span>
                      <span className="text-xs text-gray-400">
                        {achievement.progress}/{achievement.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-yellow-400">{achievement.reward}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualGym;