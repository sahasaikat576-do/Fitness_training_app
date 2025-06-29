import React from 'react';
import { Calendar, Clock, Target, TrendingUp, Award, Flame } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Workouts This Week', value: '4', icon: Calendar, color: 'blue' },
    { label: 'Total Time', value: '3h 45m', icon: Clock, color: 'green' },
    { label: 'Current Streak', value: '12 days', icon: Flame, color: 'orange' },
    { label: 'Goals Achieved', value: '8/10', icon: Target, color: 'purple' }
  ];

  const recentWorkouts = [
    { name: 'Upper Body Strength', date: 'Today', duration: '45 min', volume: '2,340 lbs' },
    { name: 'Cardio HIIT', date: 'Yesterday', duration: '30 min', volume: '285 cal' },
    { name: 'Lower Body Power', date: '2 days ago', duration: '50 min', volume: '3,120 lbs' }
  ];

  const achievements = [
    { name: 'First Week Complete', description: 'Completed 3 workouts in your first week', earned: true },
    { name: 'Consistency King', description: 'Maintained a 7-day workout streak', earned: true },
    { name: 'Heavy Lifter', description: 'Lifted over 10,000 lbs total volume', earned: false }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Saikat!</h1>
        <p className="text-gray-600">Ready to crush your fitness goals today?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Workouts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Workouts</h2>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div className="space-y-4">
            {recentWorkouts.map((workout, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div>
                  <h3 className="font-medium text-gray-900">{workout.name}</h3>
                  <p className="text-sm text-gray-600">{workout.date} • {workout.duration}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">{workout.volume}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
            <Award className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                achievement.earned 
                  ? 'border-yellow-200 bg-yellow-50' 
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    achievement.earned ? 'bg-yellow-100' : 'bg-gray-200'
                  }`}>
                    <Award className={`h-4 w-4 ${
                      achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      achievement.earned ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </h3>
                    <p className={`text-sm ${
                      achievement.earned ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Ready to get started?</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex-1">
            Start Quick Workout
          </button>
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors duration-200 flex-1">
            View Today's Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;