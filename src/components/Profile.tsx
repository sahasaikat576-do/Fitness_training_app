import React, { useState } from 'react';
import { User, Settings, Award, Calendar, Target, Edit2 } from 'lucide-react';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    age: 28,
    height: '5\'10"',
    startWeight: 185,
    currentWeight: 177,
    fitnessLevel: 'intermediate',
    goals: ['Build muscle', 'Lose fat', 'Improve endurance']
  });

  const achievements = [
    { name: 'First Week Champion', description: 'Completed your first week of workouts', date: '2025-01-07', earned: true },
    { name: 'Consistency Master', description: 'Maintained a 10-day workout streak', date: '2025-01-15', earned: true },
    { name: 'Volume Victor', description: 'Lifted over 25,000 lbs total volume', date: '2025-01-20', earned: true },
    { name: 'Goal Getter', description: 'Achieved 3 fitness goals', date: null, earned: false },
    { name: 'Beast Mode', description: 'Complete 50 total workouts', date: null, earned: false }
  ];

  const stats = [
    { label: 'Member Since', value: 'Jan 1, 2025', icon: Calendar },
    { label: 'Total Workouts', value: '18', icon: Target },
    { label: 'Achievements', value: '3/5', icon: Award },
    { label: 'Current Streak', value: '12 days', icon: Settings }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account and track your fitness journey</p>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-white" />
          </div>
          
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email"
                  />
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Age"
                  />
                  <input
                    type="text"
                    value={profile.height}
                    onChange={(e) => setProfile({...profile, height: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Height"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gray-600 mb-2">{profile.email}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Age: {profile.age}</span>
                  <span>Height: {profile.height}</span>
                  <span>Weight: {profile.currentWeight} lbs</span>
                  <span className="capitalize">Level: {profile.fitnessLevel}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h3>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  achievement.earned
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    achievement.earned ? 'bg-yellow-100' : 'bg-gray-200'
                  }`}>
                    <Award className={`h-4 w-4 ${
                      achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      achievement.earned ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${
                      achievement.earned ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                    {achievement.date && (
                      <p className="text-xs text-gray-500 mt-1">
                        Earned on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weight Progress */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Weight Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">{profile.startWeight} lbs</div>
            <div className="text-sm text-gray-600">Starting Weight</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">{profile.currentWeight} lbs</div>
            <div className="text-sm text-gray-600">Current Weight</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {profile.startWeight - profile.currentWeight} lbs
            </div>
            <div className="text-sm text-gray-600">Total Lost</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;