import React, { useState } from 'react';
import { TrendingUp, Calendar, Target, Scale, Ruler } from 'lucide-react';

const Progress: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const workoutData = [
    { week: 'Week 1', workouts: 3, volume: 8500, duration: 180 },
    { week: 'Week 2', workouts: 4, volume: 9200, duration: 210 },
    { week: 'Week 3', workouts: 3, volume: 8800, duration: 165 },
    { week: 'Week 4', workouts: 5, volume: 10500, duration: 245 }
  ];

  const bodyStats = [
    { date: '2025-01-01', weight: 180, bodyFat: 15, muscle: 70 },
    { date: '2025-01-08', weight: 179, bodyFat: 14.5, muscle: 70.5 },
    { date: '2025-01-15', weight: 178, bodyFat: 14, muscle: 71 },
    { date: '2025-01-22', weight: 177, bodyFat: 13.5, muscle: 71.5 }
  ];

  const goals = [
    { title: 'Bench Press 200lbs', current: 185, target: 200, unit: 'lbs', progress: 92.5 },
    { title: 'Lose 10lbs', current: 7, target: 10, unit: 'lbs lost', progress: 70 },
    { title: 'Workout 5x/week', current: 4, target: 5, unit: 'days', progress: 80 },
    { title: 'Run 5K under 25min', current: 26.5, target: 25, unit: 'minutes', progress: 94.3 }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'workouts', label: 'Workouts', icon: Calendar },
    { id: 'body', label: 'Body Stats', icon: Scale },
    { id: 'goals', label: 'Goals', icon: Target }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Tracking</h1>
        <p className="text-gray-600">Monitor your fitness journey and celebrate achievements</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex space-x-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Progress</h2>
            <div className="space-y-4">
              {workoutData.map((week, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{week.week}</span>
                    <span className="text-sm text-gray-600">{week.workouts} workouts</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Volume: </span>
                      <span className="font-medium text-blue-600">{week.volume.toLocaleString()} lbs</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Time: </span>
                      <span className="font-medium text-green-600">{week.duration} min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">18</div>
                <div className="text-sm text-gray-600">Total Workouts</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">37.2k</div>
                <div className="text-sm text-gray-600">Total Volume</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-1">800</div>
                <div className="text-sm text-gray-600">Minutes Trained</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">12</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{goal.current} {goal.unit}</span>
                  <span>{goal.target} {goal.unit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(goal.progress, 100)}%` }}
                  ></div>
                </div>
                <div className="text-right mt-2">
                  <span className="text-sm font-medium text-blue-600">{goal.progress.toFixed(1)}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">
                  {goal.target - goal.current} {goal.unit} to go
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Body Stats Tab */}
      {activeTab === 'body' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Body Composition Trends</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Weight</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Body Fat</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Muscle</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Change</th>
                </tr>
              </thead>
              <tbody>
                {bodyStats.map((stat, index) => {
                  const prevStat = index > 0 ? bodyStats[index - 1] : null;
                  const weightChange = prevStat ? stat.weight - prevStat.weight : 0;
                  
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{new Date(stat.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{stat.weight} lbs</td>
                      <td className="py-3 px-4 text-gray-600">{stat.bodyFat}%</td>
                      <td className="py-3 px-4 text-gray-600">{stat.muscle} lbs</td>
                      <td className="py-3 px-4">
                        {weightChange !== 0 && (
                          <span className={`text-sm font-medium ${
                            weightChange < 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} lbs
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;