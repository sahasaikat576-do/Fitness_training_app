import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'fitverse-super-secret-key-2025';

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// In-memory database (replace with real database in production)
const users = new Map();
const workouts = new Map();
const exercises = new Map();
const socialPosts = new Map();
const achievements = new Map();
const biometricData = new Map();

// Initialize sample data
const initializeData = async () => {
  console.log('🔄 Initializing server data...');
  
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
  console.log(`✅ Loaded ${exercises.size} exercises`);

  // Create demo user with hashed password
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const demoUser = {
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
    };
    
    users.set('user1', demoUser);
    console.log('✅ Demo user created successfully');
    console.log('📧 Email:', demoUser.email);
    console.log('🔑 Password: password123');
    console.log('🆔 User ID:', demoUser.id);
  } catch (error) {
    console.error('❌ Error creating demo user:', error);
  }
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('❌ No token provided');
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('❌ Invalid token:', err.message);
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    users: users.size,
    exercises: exercises.size,
    message: 'FitVerse API is running!'
  });
});

// Auth Routes - Login only
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔐 Login attempt for:', email);

    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email (case insensitive)
    const user = Array.from(users.values()).find(u => 
      u.email.toLowerCase() === email.toLowerCase()
    );
    
    if (!user) {
      console.log('❌ User not found for email:', email);
      console.log('📋 Available users:', Array.from(users.values()).map(u => u.email));
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log('👤 User found:', user.email);

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      console.log('❌ Invalid password for user:', email);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log('✅ Password valid for user:', email);

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    console.log('🎫 Token generated for user:', email);

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      level: user.level,
      xp: user.xp,
      fitCoins: user.fitCoins
    };

    res.json({
      token,
      user: userResponse,
      message: 'Login successful'
    });

    console.log('✅ Login successful for:', email);
  } catch (error) {
    console.error('🚨 Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
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
    const xpGained = Math.floor((workout.duration || 30) / 60) * 50; // 50 XP per minute
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

// Social Routes
app.get('/api/social/feed', authenticateToken, (req, res) => {
  const { limit = 20, offset = 0 } = req.query;
  
  // Create some sample posts if none exist
  if (socialPosts.size === 0) {
    const samplePosts = [
      {
        id: uuidv4(),
        userId: 'user1',
        userName: 'Saikat',
        content: 'Just completed an amazing VR workout in the Cyberpunk City! 🚀',
        likes: 23,
        comments: [],
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: uuidv4(),
        userId: 'user1',
        userName: 'Saikat',
        content: 'Hit a new personal record on deadlifts today! The AI coach really helped optimize my form.',
        likes: 45,
        comments: [],
        createdAt: new Date(Date.now() - 7200000).toISOString()
      }
    ];
    
    samplePosts.forEach(post => socialPosts.set(post.id, post));
  }
  
  const posts = Array.from(socialPosts.values())
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(parseInt(offset), parseInt(offset) + parseInt(limit));

  res.json(posts);
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

// Analytics Routes
app.get('/api/analytics/dashboard', authenticateToken, (req, res) => {
  const userWorkouts = Array.from(workouts.values()).filter(w => w.userId === req.user.userId);
  const userBiometric = Array.from(biometricData.values()).filter(d => d.userId === req.user.userId);
  
  const analytics = {
    totalWorkouts: userWorkouts.length,
    totalDuration: userWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0),
    averageWorkoutTime: userWorkouts.length > 0 ? 
      Math.round(userWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0) / userWorkouts.length) : 0,
    currentStreak: Math.floor(Math.random() * 15) + 5, // Simulated streak
    weeklyProgress: [
      { week: 'Week 1', workouts: 3, duration: 180, volume: 8500 },
      { week: 'Week 2', workouts: 4, duration: 210, volume: 9200 },
      { week: 'Week 3', workouts: 3, duration: 165, volume: 8800 },
      { week: 'Week 4', workouts: 5, duration: 245, volume: 10500 }
    ]
  };

  res.json(analytics);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🚨 Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Initialize data and start server
initializeData().then(() => {
  app.listen(PORT, () => {
    console.log('🚀 FitVerse API Server started successfully!');
    console.log(`🌐 Server running on: http://localhost:${PORT}`);
    console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📊 Demo Account Credentials:`);
    console.log(`   📧 Email: saikat@fitverse.com`);
    console.log(`   🔑 Password: password123`);
    console.log(`🔐 Login endpoint: POST http://localhost:${PORT}/api/auth/login`);
    console.log('✅ Server ready to accept connections!');
  });
}).catch(error => {
  console.error('❌ Failed to initialize server:', error);
  process.exit(1);
});

export default app;