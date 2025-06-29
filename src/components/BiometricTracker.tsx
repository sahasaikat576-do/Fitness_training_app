import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Droplets, 
  Brain,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const BiometricTracker: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('heart-rate');

  const biometricData = {
    'heart-rate': {
      current: 72,
      unit: 'BPM',
      status: 'optimal',
      trend: '+2.3%',
      data: [68, 70, 72, 69, 71, 73, 72, 74, 71, 72],
      zones: { resting: '60-70', fat_burn: '70-85', cardio: '85-102', peak: '102+' }
    },
    'sleep': {
      current: 7.8,
      unit: 'hours',
      status: 'good',
      trend: '+12%',
      data: [7.2, 7.5, 8.1, 6.9, 7.8, 8.2, 7.8, 7.6, 8.0, 7.8],
      phases: { deep: '2.1h', light: '4.2h', rem: '1.5h' }
    },
    'stress': {
      current: 23,
      unit: 'stress index',
      status: 'low',
      trend: '-15%',
      data: [28, 25, 23, 30, 26, 22, 23, 21, 24, 23],
      levels: { low: '0-25', moderate: '26-50', high: '51-75', extreme: '76+' }
    },
    'recovery': {
      current: 87,
      unit: 'recovery score',
      status: 'excellent',
      trend: '+8%',
      data: [82, 85, 87, 84, 86, 89, 87, 88, 85, 87],
      factors: { hrv: 'Good', sleep: 'Excellent', activity: 'Moderate' }
    }
  };

  const metrics = [
    { id: 'heart-rate', label: 'Heart Rate', icon: Heart, color: 'from-red-500 to-pink-500' },
    { id: 'sleep', label: 'Sleep Quality', icon: Clock, color: 'from-blue-500 to-cyan-500' },
    { id: 'stress', label: 'Stress Level', icon: Brain, color: 'from-purple-500 to-indigo-500' },
    { id: 'recovery', label: 'Recovery', icon: Activity, color: 'from-green-500 to-emerald-500' }
  ];

  const healthInsights = [
    {
      type: 'warning',
      title: 'Elevated Stress Detected',
      message: 'Your stress levels were higher than usual yesterday. Consider meditation or light exercise.',
      icon: AlertTriangle,
      color: 'text-yellow-400'
    },
    {
      type: 'success',
      title: 'Sleep Quality Improved',
      message: 'Your sleep quality has improved by 12% this week. Great job maintaining consistency!',
      icon: CheckCircle,
      color: 'text-green-400'
    },
    {
      type: 'info',
      title: 'Optimal Training Window',
      message: 'Based on your recovery score, 2-4 PM is your optimal training window today.',
      icon: TrendingUp,
      color: 'text-blue-400'
    }
  ];

  const wearableDevices = [
    { name: 'Apple Watch Series 9', status: 'connected', battery: 87, lastSync: '2 min ago' },
    { name: 'Oura Ring Gen3', status: 'connected', battery: 45, lastSync: '5 min ago' },
    { name: 'Whoop 4.0', status: 'syncing', battery: 92, lastSync: '1 hour ago' },
    { name: 'Garmin Forerunner', status: 'disconnected', battery: 0, lastSync: '2 days ago' }
  ];

  const currentData = biometricData[selectedMetric as keyof typeof biometricData];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
      case 'excellent':
      case 'good':
        return 'text-green-400';
      case 'low':
        return 'text-blue-400';
      case 'moderate':
        return 'text-yellow-400';
      case 'high':
        return 'text-red-400';
      default:
        return 'text-gray-400';
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
          <div className="bg-gradient-to-r from-teal-900/50 to-blue-900/50 rounded-3xl p-8 backdrop-blur-xl border border-white/10">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Biometric Tracker</h1>
                <p className="text-gray-300">Real-time health monitoring and insights</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                const data = biometricData[metric.id as keyof typeof biometricData];
                return (
                  <motion.div
                    key={metric.id}
                    className="bg-white/10 rounded-xl p-4 text-center cursor-pointer hover:bg-white/20 transition-all duration-300"
                    onClick={() => setSelectedMetric(metric.id)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Icon className="h-6 w-6 text-white mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{data.current}</div>
                    <div className="text-sm text-gray-300">{data.unit}</div>
                    <div className={`text-xs ${getStatusColor(data.status)} capitalize`}>
                      {data.status}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <motion.div
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                {metrics.map(metric => {
                  const Icon = metric.icon;
                  return (
                    <motion.button
                      key={metric.id}
                      onClick={() => setSelectedMetric(metric.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        selectedMetric === metric.id
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{metric.label}</span>
                    </motion.button>
                  );
                })}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{currentData.current}</div>
                <div className="text-sm text-gray-400">{currentData.unit}</div>
                <div className={`text-sm ${currentData.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {currentData.trend} vs last week
                </div>
              </div>
            </div>

            {/* Chart Visualization */}
            <div className="bg-white/5 rounded-xl p-6 mb-6">
              <div className="flex items-end space-x-2 h-32">
                {currentData.data.map((value, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-sm flex-1"
                    style={{ height: `${(value / Math.max(...currentData.data)) * 100}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / Math.max(...currentData.data)) * 100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>10 days ago</span>
                <span>Today</span>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(currentData).map(([key, value]) => {
                if (key === 'current' || key === 'unit' || key === 'status' || key === 'trend' || key === 'data') return null;
                return (
                  <div key={key} className="bg-white/5 rounded-xl p-4">
                    <h3 className="text-white font-medium mb-2 capitalize">{key.replace('_', ' ')}</h3>
                    {typeof value === 'object' ? (
                      <div className="space-y-1">
                        {Object.entries(value as Record<string, string>).map(([subKey, subValue]) => (
                          <div key={subKey} className="flex justify-between text-sm">
                            <span className="text-gray-400 capitalize">{subKey.replace('_', ' ')}</span>
                            <span className="text-white">{subValue}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-cyan-400 font-semibold">{value}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Health Insights */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Health Insights</h3>
              </div>
              
              <div className="space-y-4">
                {healthInsights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <motion.div
                      key={index}
                      className="p-4 bg-white/5 rounded-xl border border-white/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className={`h-5 w-5 mt-1 ${insight.color}`} />
                        <div>
                          <h4 className="font-medium text-white mb-1">{insight.title}</h4>
                          <p className="text-gray-300 text-sm">{insight.message}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Connected Devices */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-5 w-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Connected Devices</h3>
              </div>
              
              <div className="space-y-3">
                {wearableDevices.map((device, index) => (
                  <motion.div
                    key={index}
                    className="p-3 bg-white/5 rounded-lg border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white text-sm">{device.name}</h4>
                      <div className={`w-2 h-2 rounded-full ${
                        device.status === 'connected' ? 'bg-green-400' :
                        device.status === 'syncing' ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`} />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Battery: {device.battery}%</span>
                      <span>{device.lastSync}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                      <div 
                        className={`h-1 rounded-full ${
                          device.battery > 50 ? 'bg-green-400' :
                          device.battery > 20 ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`}
                        style={{ width: `${device.battery}%` }}
                      />
                    </div>
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

export default BiometricTracker;