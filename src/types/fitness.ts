export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscle: string[];
  equipment: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string[];
  image?: string;
}

export interface WorkoutSet {
  id: string;
  exerciseId: string;
  reps: number;
  weight: number;
  restTime: number;
  completed: boolean;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  duration: number;
  sets: WorkoutSet[];
  totalVolume: number;
  completed: boolean;
}

export interface UserStats {
  totalWorkouts: number;
  totalVolume: number;
  currentStreak: number;
  longestStreak: number;
  favoriteExercise: string;
  averageWorkoutTime: number;
}

export interface BodyMeasurement {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  muscle?: number;
  measurements: {
    chest?: number;
    waist?: number;
    arms?: number;
    thighs?: number;
  };
}

export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: 'strength' | 'cardio' | 'weight' | 'measurement';
  completed: boolean;
}