import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (replace with real database in production)
const users = new Map();
const workouts = new Map();
const exercises = new Map();
const socialPosts = new Map();
const achievements = new Map();
const biometricData = new Map();

// Initialize sample data
const initializeData = () => {
  // Sample exercises
  const sampleExercises = [
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
        'Press the bar back up to starting position'
      ],
      calories_per_minute: 8
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
        'Drive through heels to lift the bar'
      ],
      calories_per_minute: 10
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
        'Push through heels to return to start'
      ],
      calories_per_minute: 6
    }
  ];

  sampleExercises.forEach(exercise => exercises.set(exercise.id, exercise));

  // Sample user
  const hashedPassword = bcrypt.hashSync('password123', 10);
  users.set('user1', {
    id: 'user1',
    email: 'saikat@fitverse.com',
    password: hashedPassword,
    name: 'Saikat',
    level: 47,
    xp: 23847,
    fitCoins: 12450,
    createdAt: new Date().toISOString(),
    profile: {
      age: 25,
      height: 175,
      weight: 75,
      fitnessGoals: ['Build muscle', 'Lose fat', 'Improve endurance']
    }
  });
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = Array.from(users.values()).find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = uuidv4();
    const user = {
      id: userId,
      email,
      password: hashedPassword,
      name,
      level: 1,
      xp: 0,
      fitCoins: 100,
      createdAt: new Date().toISOString(),
      profile: {
        age: null,
        height: null,
        weight: null,
        fitnessGoals: []
      }
    };

    users.set(userId, user);

    // Generate token
    const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        level: user.level,
        xp: user.xp,
        fitCoins: user.fitCoins
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = Array.from(users.values()).find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        level: user.level,
        xp: user.xp,
        fitCoins: user.fitCoins
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// User Routes
app.get('/api/user/profile', authenticateToken, (req, res) => {
  const user = users.get(req.user.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { password, ...userProfile } = user;
  res.json(userProfile);
});

app.put('/api/user/profile', authenticateToken, (req, res) => {
  const user = users.get(req.user.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const updates = req.body;
  const updatedUser = { ...user, ...updates, id: user.id };
  users.set(req.user.userId, updatedUser);

  const { password, ...userProfile } = updatedUser;
  res.json(userProfile);
});

// Exercise Routes
app.get('/api/exercises', (req, res) => {
  const { category, difficulty, muscle } = req.query;
  let exerciseList = Array.from(exercises.values());

  if (category) {
    exerciseList = exerciseList.filter(ex => ex.category.toLowerCase() === category.toLowerCase());
  }
  if (difficulty) {
    exerciseList = exerciseList.filter(ex => ex.difficulty === difficulty);
  }
  if (muscle) {
    exerciseList = exerciseList.filter(ex => 
      ex.muscle.some(m => m.toLowerCase().includes(muscle.toLowerCase()))
    );
  }

  res.json(exerciseList);
});

app.get('/api/exercises/:id', (req, res) => {
  const exercise = exercises.get(req.params.id);
  if (!exercise) {
    return res.status(404).json({ error: 'Exercise not found' });
  }
  res.json(exercise);
});

// Workout Routes
app.post('/api/workouts', authenticateToken, (req, res) => {
  const workoutId = uuidv4();
  const workout = {
    id: workoutId,
    userId: req.user.userId,
    ...req.body,
    createdAt: new Date().toISOString()
  };

  workouts.set(workoutId, workout);

  // Award XP and coins
  const user = users.get(req.user.userId);
  if (user) {
    const xpGained = Math.floor(workout.duration / 60) * 50; // 50 XP per minute
    const coinsGained = Math.floor(xpGained / 10);
    
    user.xp += xpGained;
    user.fitCoins += coinsGained;
    
    // Level up logic
    const newLevel = Math.floor(user.xp / 1000) + 1;
    if (newLevel > user.level) {
      user.level = newLevel;
      user.fitCoins += 500; // Bonus coins for leveling up
    }
    
    users.set(req.user.userId, user);
  }

  res.status(201).json(workout);
});

app.get('/api/workouts', authenticateToken, (req, res) => {
  const userWorkouts = Array.from(workouts.values())
    .filter(w => w.userId === req.user.userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  res.json(userWorkouts);
});

app.get('/api/workouts/:id', authenticateToken, (req, res) => {
  const workout = workouts.get(req.params.id);
  if (!workout || workout.userId !== req.user.userId) {
    return res.status(404).json({ error: 'Workout not found' });
  }
  res.json(workout);
});

// Biometric Data Routes
app.post('/api/biometric', authenticateToken, (req, res) => {
  const dataId = uuidv4();
  const biometricEntry = {
    id: dataId,
    userId: req.user.userId,
    ...req.body,
    timestamp: new Date().toISOString()
  };

  biometricData.set(dataId, biometricEntry);
  res.status(201).json(biometricEntry);
});

app.get('/api/biometric', authenticateToken, (req, res) => {
  const { type, days = 30 } = req.query;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));

  let userBiometricData = Array.from(biometricData.values())
    .filter(data => 
      data.userId === req.user.userId && 
      new Date(data.timestamp) >= cutoffDate
    )
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  if (type) {
    userBiometricData = userBiometricData.filter(data => data.type === type);
  }

  res.json(userBiometricData);
});

// Social Routes
app.post('/api/social/posts', authenticateToken, (req, res) => {
  const postId = uuidv4();
  const user = users.get(req.user.userId);
  
  const post = {
    id: postId,
    userId: req.user.userId,
    userName: user.name,
    ...req.body,
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString()
  };

  socialPosts.set(postId, post);
  res.status(201).json(post);
});

app.get('/api/social/feed', authenticateToken, (req, res) => {
  const { limit = 20, offset = 0 } = req.query;
  
  const posts = Array.from(socialPosts.values())
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(parseInt(offset), parseInt(offset) + parseInt(limit));

  res.json(posts);
});

app.post('/api/social/posts/:id/like', authenticateToken, (req, res) => {
  const post = socialPosts.get(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  post.likes += 1;
  socialPosts.set(req.params.id, post);
  res.json({ likes: post.likes });
});

// Leaderboard Routes
app.get('/api/leaderboard', authenticateToken, (req, res) => {
  const { type = 'xp', limit = 50 } = req.query;
  
  let leaderboard = Array.from(users.values())
    .map(user => ({
      id: user.id,
      name: user.name,
      level: user.level,
      xp: user.xp,
      fitCoins: user.fitCoins
    }));

  // Sort based on type
  switch (type) {
    case 'xp':
      leaderboard.sort((a, b) => b.xp - a.xp);
      break;
    case 'level':
      leaderboard.sort((a, b) => b.level - a.level);
      break;
    case 'coins':
      leaderboard.sort((a, b) => b.fitCoins - a.fitCoins);
      break;
  }

  res.json(leaderboard.slice(0, parseInt(limit)));
});

// AI Coach Routes
app.post('/api/ai/chat', authenticateToken, (req, res) => {
  const { message } = req.body;
  const user = users.get(req.user.userId);
  
  // Simple AI response simulation
  const responses = [
    `Great question, ${user.name}! Based on your current level ${user.level}, I recommend focusing on progressive overload.`,
    `I've analyzed your workout history. Your consistency is improving! Try adding 10% more intensity to your next session.`,
    `Your biometric data shows good recovery. This is an optimal time for a high-intensity workout.`,
    `Based on your goals, I suggest incorporating more compound movements like deadlifts and squats.`,
    `Your progress is excellent! You've gained ${user.xp} XP. Consider adding some cardio to balance your routine.`
  ];

  const aiResponse = {
    id: uuidv4(),
    message: responses[Math.floor(Math.random() * responses.length)],
    timestamp: new Date().toISOString(),
    confidence: Math.floor(Math.random() * 20) + 80 // 80-100%
  };

  res.json(aiResponse);
});

app.get('/api/ai/recommendations', authenticateToken, (req, res) => {
  const user = users.get(req.user.userId);
  const userWorkouts = Array.from(workouts.values()).filter(w => w.userId === req.user.userId);
  
  const recommendations = [
    {
      type: 'workout',
      title: 'Strength Focus Day',
      description: `Based on your level ${user.level}, try increasing your bench press by 5lbs`,
      priority: 'high',
      estimatedBenefit: '+50 XP'
    },
    {
      type: 'nutrition',
      title: 'Protein Timing',
      description: 'Consider having protein within 30 minutes post-workout for optimal recovery',
      priority: 'medium',
      estimatedBenefit: 'Better Recovery'
    },
    {
      type: 'recovery',
      title: 'Sleep Optimization',
      description: 'Your workout intensity suggests you need 7-8 hours of sleep tonight',
      priority: 'high',
      estimatedBenefit: 'Enhanced Performance'
    }
  ];

  res.json(recommendations);
});

// Analytics Routes
app.get('/api/analytics/dashboard', authenticateToken, (req, res) => {
  const userWorkouts = Array.from(workouts.values()).filter(w => w.userId === req.user.userId);
  const userBiometric = Array.from(biometricData.values()).filter(d => d.userId === req.user.userId);
  
  const analytics = {
    totalWorkouts: userWorkouts.length,
    totalDuration: userWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0),
    averageWorkoutTime: userWorkouts.length > 0 ? 
      Math.round(userWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0) / userWorkouts.length) : 0,
    currentStreak: calculateStreak(userWorkouts),
    weeklyProgress: getWeeklyProgress(userWorkouts),
    biometricTrends: getBiometricTrends(userBiometric)
  };

  res.json(analytics);
});

// Helper functions
const calculateStreak = (workouts) => {
  if (workouts.length === 0) return 0;
  
  const sortedWorkouts = workouts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  let streak = 0;
  let currentDate = new Date();
  
  for (const workout of sortedWorkouts) {
    const workoutDate = new Date(workout.createdAt);
    const daysDiff = Math.floor((currentDate - workoutDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= 1) {
      streak++;
      currentDate = workoutDate;
    } else {
      break;
    }
  }
  
  return streak;
};

const getWeeklyProgress = (workouts) => {
  const weeks = {};
  workouts.forEach(workout => {
    const week = getWeekKey(new Date(workout.createdAt));
    if (!weeks[week]) {
      weeks[week] = { workouts: 0, duration: 0, volume: 0 };
    }
    weeks[week].workouts++;
    weeks[week].duration += workout.duration || 0;
    weeks[week].volume += workout.totalVolume || 0;
  });
  
  return Object.entries(weeks)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-8) // Last 8 weeks
    .map(([week, data]) => ({ week, ...data }));
};

const getBiometricTrends = (biometricData) => {
  const trends = {};
  biometricData.forEach(data => {
    if (!trends[data.type]) {
      trends[data.type] = [];
    }
    trends[data.type].push({
      value: data.value,
      timestamp: data.timestamp
    });
  });
  
  // Sort by timestamp and return last 30 days
  Object.keys(trends).forEach(type => {
    trends[type] = trends[type]
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .slice(-30);
  });
  
  return trends;
};

const getWeekKey = (date) => {
  const year = date.getFullYear();
  const week = Math.ceil(((date - new Date(year, 0, 1)) / 86400000 + 1) / 7);
  return `${year}-W${week.toString().padStart(2, '0')}`;
};

// Initialize data and start server
initializeData();

app.listen(PORT, () => {
  console.log(`🚀 FitVerse API Server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/api/analytics/dashboard`);
  console.log(`🔐 Auth endpoints: /api/auth/login, /api/auth/register`);
});

export default app;