import { Exercise } from '../types/fitness';

export const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Bench Press',
    category: 'Strength',
    muscle: ['Chest', 'Shoulders', 'Triceps'],
    equipment: 'Barbell',
    difficulty: 'intermediate',
    instructions: [
      'Lie flat on a bench with your feet firmly planted on the ground',
      'Grip the barbell with hands slightly wider than shoulder-width',
      'Lower the bar to your chest with control',
      'Press the bar back up to starting position',
      'Keep your core engaged throughout the movement'
    ]
  },
  {
    id: '2',
    name: 'Deadlift',
    category: 'Strength',
    muscle: ['Back', 'Glutes', 'Hamstrings'],
    equipment: 'Barbell',
    difficulty: 'advanced',
    instructions: [
      'Stand with feet hip-width apart, bar close to shins',
      'Hinge at hips and knees to grip the bar',
      'Keep chest up and back straight',
      'Drive through heels to lift the bar',
      'Stand tall, then lower with control'
    ]
  },
  {
    id: '3',
    name: 'Squats',
    category: 'Strength',
    muscle: ['Quadriceps', 'Glutes', 'Core'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body as if sitting back into a chair',
      'Keep knees aligned with toes',
      'Lower until thighs are parallel to ground',
      'Push through heels to return to start'
    ]
  },
  {
    id: '4',
    name: 'Pull-ups',
    category: 'Strength',
    muscle: ['Back', 'Biceps'],
    equipment: 'Pull-up Bar',
    difficulty: 'intermediate',
    instructions: [
      'Hang from bar with palms facing away',
      'Pull your body up until chin clears the bar',
      'Lower yourself with control',
      'Keep core engaged throughout',
      'Avoid swinging or kipping'
    ]
  },
  {
    id: '5',
    name: 'Running',
    category: 'Cardio',
    muscle: ['Legs', 'Core'],
    equipment: 'None',
    difficulty: 'beginner',
    instructions: [
      'Start with a warm-up walk',
      'Maintain steady breathing rhythm',
      'Land on midfoot, not heel',
      'Keep posture upright',
      'Cool down with walking and stretching'
    ]
  },
  {
    id: '6',
    name: 'Push-ups',
    category: 'Strength',
    muscle: ['Chest', 'Shoulders', 'Triceps'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: [
      'Start in plank position with hands under shoulders',
      'Lower chest to ground while keeping body straight',
      'Push back up to starting position',
      'Keep core tight throughout movement',
      'Modify on knees if needed'
    ]
  }
];