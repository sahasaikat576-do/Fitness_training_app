import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fitverse_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('fitverse_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('fitverse_token');
  }
};

// User API
export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },
  
  updateProfile: async (updates: any) => {
    const response = await api.put('/user/profile', updates);
    return response.data;
  }
};

// Exercise API
export const exerciseAPI = {
  getAll: async (filters?: { category?: string; difficulty?: string; muscle?: string }) => {
    const response = await api.get('/exercises', { params: filters });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/exercises/${id}`);
    return response.data;
  }
};

// Workout API
export const workoutAPI = {
  create: async (workout: any) => {
    const response = await api.post('/workouts', workout);
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/workouts');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/workouts/${id}`);
    return response.data;
  }
};

// Biometric API
export const biometricAPI = {
  create: async (data: any) => {
    const response = await api.post('/biometric', data);
    return response.data;
  },
  
  getAll: async (filters?: { type?: string; days?: number }) => {
    const response = await api.get('/biometric', { params: filters });
    return response.data;
  }
};

// Social API
export const socialAPI = {
  createPost: async (post: any) => {
    const response = await api.post('/social/posts', post);
    return response.data;
  },
  
  getFeed: async (limit = 20, offset = 0) => {
    const response = await api.get('/social/feed', { params: { limit, offset } });
    return response.data;
  },
  
  likePost: async (postId: string) => {
    const response = await api.post(`/social/posts/${postId}/like`);
    return response.data;
  }
};

// Leaderboard API
export const leaderboardAPI = {
  get: async (type = 'xp', limit = 50) => {
    const response = await api.get('/leaderboard', { params: { type, limit } });
    return response.data;
  }
};

// AI Coach API
export const aiAPI = {
  chat: async (message: string) => {
    const response = await api.post('/ai/chat', { message });
    return response.data;
  },
  
  getRecommendations: async () => {
    const response = await api.get('/ai/recommendations');
    return response.data;
  }
};

// Analytics API
export const analyticsAPI = {
  getDashboard: async () => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  }
};

export default api;