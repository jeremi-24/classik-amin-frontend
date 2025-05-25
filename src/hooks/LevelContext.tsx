"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Level = 'primary' | 'college' | 'lycee' | null;

interface LevelContextType {
  selectedLevel: Level;
  setSelectedLevel: (level: Level) => void;
}

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export const LevelProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLevel, setSelectedLevel] = useState<Level>(() => {
    // Lire depuis localStorage au chargement initial
    if (typeof window !== 'undefined') { // Vérifie que l'on est côté client
      const storedLevel = localStorage.getItem('selectedLevel');
      return storedLevel as Level || null;
    }
    return null;
  });

  useEffect(() => {
    // Écrire dans localStorage à chaque changement de selectedLevel
    if (typeof window !== 'undefined') {
      if (selectedLevel) {
        localStorage.setItem('selectedLevel', selectedLevel);
      } else {
        localStorage.removeItem('selectedLevel');
      }
    }
  }, [selectedLevel]);

  return (
    <LevelContext.Provider value={{ selectedLevel, setSelectedLevel }}>
      {children}
    </LevelContext.Provider>
  );
};

export const useLevel = () => {
  const context = useContext(LevelContext);
  if (context === undefined) {
    throw new Error('useLevel must be used within a LevelProvider');
  }
  return context;
};