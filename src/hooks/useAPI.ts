import { useState, useEffect } from 'react';
import { 
  exerciseAPI, 
  workoutAPI, 
  biometricAPI, 
  socialAPI, 
  leaderboardAPI, 
  aiAPI, 
  analyticsAPI 
} from '../services/api';

// Generic API hook
export const useAPI = <T>(apiCall: () => Promise<T>, dependencies: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        setData(result);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

// Specific hooks for different data types
export const useExercises = (filters?: { category?: string; difficulty?: string; muscle?: string }) => {
  return useAPI(() => exerciseAPI.getAll(filters), [filters]);
};

export const useWorkouts = () => {
  return useAPI(() => workoutAPI.getAll());
};

export const useBiometricData = (filters?: { type?: string; days?: number }) => {
  return useAPI(() => biometricAPI.getAll(filters), [filters]);
};

export const useSocialFeed = (limit = 20, offset = 0) => {
  return useAPI(() => socialAPI.getFeed(limit, offset), [limit, offset]);
};

export const useLeaderboard = (type = 'xp', limit = 50) => {
  return useAPI(() => leaderboardAPI.get(type, limit), [type, limit]);
};

export const useAIRecommendations = () => {
  return useAPI(() => aiAPI.getRecommendations());
};

export const useAnalytics = () => {
  return useAPI(() => analyticsAPI.getDashboard());
};

// Mutation hooks for creating/updating data
export const useCreateWorkout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createWorkout = async (workout: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await workoutAPI.create(workout);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to create workout');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createWorkout, loading, error };
};

export const useCreateBiometricData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBiometricData = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await biometricAPI.create(data);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to save biometric data');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createBiometricData, loading, error };
};

export const useCreateSocialPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (post: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await socialAPI.createPost(post);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createPost, loading, error };
};

export const useAIChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await aiAPI.chat(message);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
};