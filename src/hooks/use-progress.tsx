import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, use, useEffect, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'completed-lessons';

type Progress = {
  completed: string[];
  markCompleted: (lessonId: string) => void;
};

const ProgressContext = createContext<Progress>({ completed: [], markCompleted: () => {} });

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored) setCompleted(JSON.parse(stored));
      })
      .catch(() => {});
  }, []);

  const markCompleted = (lessonId: string) => {
    if (completed.includes(lessonId)) return;
    const next = [...completed, lessonId];
    setCompleted(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  };

  return <ProgressContext value={{ completed, markCompleted }}>{children}</ProgressContext>;
}

export function useProgress() {
  return use(ProgressContext);
}
