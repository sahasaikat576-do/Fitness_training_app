import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import WorkoutTracker from './components/WorkoutTracker';
import ExerciseLibrary from './components/ExerciseLibrary';
import Progress from './components/Progress';
import Profile from './components/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'workout':
        return <WorkoutTracker />;
      case 'exercises':
        return <ExerciseLibrary />;
      case 'progress':
        return <Progress />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;