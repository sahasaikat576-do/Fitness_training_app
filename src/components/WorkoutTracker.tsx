import React, { useState } from 'react';
import { Play, Pause, Square, Plus, Trash2, Timer, Target } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';
import { exercises } from '../data/exercises';
import { WorkoutSet } from '../types/fitness';

const WorkoutTracker: React.FC = () => {
  const [activeWorkout, setActiveWorkout] = useState<boolean>(false);
  const [workoutSets, setWorkoutSets] = useState<WorkoutSet[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const { time, isActive, start, pause, reset, formatTime } = useTimer();
  const [currentSet, setCurrentSet] = useState({ reps: 0, weight: 0, restTime: 60 });

  const startWorkout = () => {
    setActiveWorkout(true);
    start();
  };

  const endWorkout = () => {
    setActiveWorkout(false);
    pause();
    reset();
    setWorkoutSets([]);
  };

  const addSet = () => {
    if (!selectedExercise) return;
    
    const newSet: WorkoutSet = {
      id: Date.now().toString(),
      exerciseId: selectedExercise,
      reps: currentSet.reps,
      weight: currentSet.weight,
      restTime: currentSet.restTime,
      completed: false
    };
    
    setWorkoutSets([...workoutSets, newSet]);
    setCurrentSet({ reps: 0, weight: 0, restTime: 60 });
  };

  const toggleSetComplete = (setId: string) => {
    setWorkoutSets(sets =>
      sets.map(set =>
        set.id === setId ? { ...set, completed: !set.completed } : set
      )
    );
  };

  const removeSet = (setId: string) => {
    setWorkoutSets(sets => sets.filter(set => set.id !== setId));
  };

  const getExerciseName = (exerciseId: string) => {
    return exercises.find(ex => ex.id === exerciseId)?.name || 'Unknown Exercise';
  };

  const getTotalVolume = () => {
    return workoutSets.reduce((total, set) => total + (set.reps * set.weight), 0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Workout Tracker</h1>
        <p className="text-gray-600">Track your sets, reps, and progress in real-time</p>
      </div>

      {/* Workout Timer */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">{formatTime()}</div>
              <div className="text-sm text-gray-600">Workout Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{workoutSets.length}</div>
              <div className="text-sm text-gray-600">Sets Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{getTotalVolume().toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Volume (lbs)</div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            {!activeWorkout ? (
              <button
                onClick={startWorkout}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>Start Workout</span>
              </button>
            ) : (
              <>
                <button
                  onClick={isActive ? pause : start}
                  className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  onClick={endWorkout}
                  className="bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Square className="h-4 w-4" />
                  <span>End</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {activeWorkout && (
        <>
          {/* Add Set Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Set</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exercise</label>
                <select
                  value={selectedExercise}
                  onChange={(e) => setSelectedExercise(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Exercise</option>
                  {exercises.map(exercise => (
                    <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reps</label>
                <input
                  type="number"
                  value={currentSet.reps}
                  onChange={(e) => setCurrentSet({...currentSet, reps: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (lbs)</label>
                <input
                  type="number"
                  value={currentSet.weight}
                  onChange={(e) => setCurrentSet({...currentSet, weight: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="135"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rest (sec)</label>
                <input
                  type="number"
                  value={currentSet.restTime}
                  onChange={(e) => setCurrentSet({...currentSet, restTime: parseInt(e.target.value) || 60})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="60"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={addSet}
                  disabled={!selectedExercise || !currentSet.reps}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Set</span>
                </button>
              </div>
            </div>
          </div>

          {/* Current Sets */}
          {workoutSets.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Sets</h2>
              <div className="space-y-3">
                {workoutSets.map((set, index) => (
                  <div
                    key={set.id}
                    className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 ${
                      set.completed 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium text-gray-500">#{index + 1}</div>
                      <div>
                        <div className="font-medium text-gray-900">{getExerciseName(set.exerciseId)}</div>
                        <div className="text-sm text-gray-600">
                          {set.reps} reps × {set.weight} lbs
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Timer className="h-4 w-4" />
                        <span>{set.restTime}s</span>
                      </div>
                      <button
                        onClick={() => toggleSetComplete(set.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                          set.completed
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        }`}
                      >
                        {set.completed ? 'Completed' : 'Complete'}
                      </button>
                      <button
                        onClick={() => removeSet(set.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WorkoutTracker;