# FitVerse - AI-Powered Fitness Universe

A comprehensive fitness application with AI coaching, virtual reality workouts, social features, and advanced biometric tracking.

## Features

### 🤖 AI Coach
- Personalized workout recommendations
- Real-time form analysis
- Intelligent conversation system
- Biometric data integration
- Predictive analytics

### 🥽 Virtual Reality Gym
- Immersive workout environments
- Cyberpunk City, Space Station, Mystic Forest, Underwater Palace
- VR-specific workout programs
- Achievement system

### 👥 Social Hub
- Community feed and interactions
- Global leaderboards
- Challenge competitions
- Social achievements

### 📊 Biometric Tracking
- Heart rate monitoring
- Sleep quality analysis
- Stress level tracking
- Recovery optimization
- Wearable device integration

### 🏆 Gamification
- XP and leveling system
- FitCoins currency
- Achievement badges
- Daily quests
- Reward store

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Exercises & Workouts
- `GET /api/exercises` - Get exercise library
- `GET /api/exercises/:id` - Get specific exercise
- `POST /api/workouts` - Create workout
- `GET /api/workouts` - Get user workouts

### Biometric Data
- `POST /api/biometric` - Log biometric data
- `GET /api/biometric` - Get biometric history

### Social Features
- `POST /api/social/posts` - Create social post
- `GET /api/social/feed` - Get social feed
- `POST /api/social/posts/:id/like` - Like a post

### AI Coach
- `POST /api/ai/chat` - Chat with AI coach
- `GET /api/ai/recommendations` - Get AI recommendations

### Analytics
- `GET /api/analytics/dashboard` - Get user analytics
- `GET /api/leaderboard` - Get leaderboards

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd fitverse
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server
```bash
npm run dev
```

5. Start the API server (in a separate terminal)
```bash
npm run server
```

### Demo Credentials
- Email: saikat@fitverse.com
- Password: password123

## Technology Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- Axios for API calls

### Backend
- Node.js with Express
- JWT authentication
- bcryptjs for password hashing
- CORS enabled
- In-memory data store (easily replaceable with database)

## Architecture

### Frontend Structure
```
src/
├── components/          # React components
├── hooks/              # Custom hooks
├── services/           # API services
├── context/            # React context
├── types/              # TypeScript types
└── data/               # Static data
```

### Backend Structure
```
server/
├── index.js            # Main server file
├── routes/             # API routes (future)
├── middleware/         # Custom middleware (future)
└── models/             # Data models (future)
```

## Features in Detail

### AI Coach System
- Natural language processing for workout guidance
- Personalized recommendations based on user data
- Real-time performance analysis
- Adaptive training programs

### Virtual Reality Integration
- Multiple immersive environments
- VR-specific workout tracking
- Environment-based challenges
- Social VR experiences

### Gamification Engine
- XP system with level progression
- Virtual currency (FitCoins)
- Achievement system with rarities
- Daily quest system
- Reward marketplace

### Social Platform
- User-generated content
- Community challenges
- Global leaderboards
- Social achievements
- Friend system

### Biometric Analytics
- Multi-device integration
- Trend analysis
- Health insights
- Recovery optimization
- Performance predictions

## Deployment

### Frontend (Netlify)
The app is configured for easy deployment to Netlify:
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### Backend (Heroku/Railway/Vercel)
The Express server can be deployed to any Node.js hosting platform:
```bash
# Set environment variables
# Deploy server/ directory
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@fitverse.com or join our Discord community.