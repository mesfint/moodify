import { useContext } from 'react';
import { MoodifyContext } from '../contexts/MoodifyContext';

export const useMoodify = () => {
  const context = useContext(MoodifyContext);

  if (!context) {
    throw new Error('useMoodify must be used within a MoodifyProvider');
  }
  return context;
};
