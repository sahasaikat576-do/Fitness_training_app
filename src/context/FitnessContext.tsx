import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FitnessContextType {
  user: {
    name: string;
    level: number;
    xp: number;
    fitCoins: number;
  };
  updateUser: (updates: Partial<FitnessContextType['user']>) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Saikat',
    level: 47,
    xp: 23847,
    fitCoins: 12450
  });

  const updateUser = (updates: Partial<typeof user>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <FitnessContext.Provider value={{ user, updateUser }}>
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (context === undefined) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};