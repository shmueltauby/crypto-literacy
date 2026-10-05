import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, use, useEffect, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'progress-v1';

type Saved = {
  completed: string[];
  name: string;
  onboarded: boolean;
};

type Progress = Saved & {
  /** False until saved progress has been read from the device. */
  loaded: boolean;
  completeLesson: (lessonId: string) => void;
  finishOnboarding: (name: string) => void;
};

const empty: Saved = { completed: [], name: '', onboarded: false };

const ProgressContext = createContext<Progress>({
  ...empty,
  loaded: false,
  completeLesson: () => {},
  finishOnboarding: () => {},
});

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<Saved>(empty);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored) {
          const { completed, name, onboarded } = { ...empty, ...JSON.parse(stored) };
          setSaved({ completed, name, onboarded });
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const save = (next: Saved) => {
    setSaved(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  };

  const completeLesson = (lessonId: string) => {
    if (saved.completed.includes(lessonId)) return;
    save({ ...saved, completed: [...saved.completed, lessonId] });
  };

  const finishOnboarding = (name: string) => {
    save({ ...saved, name, onboarded: true });
  };

  return (
    <ProgressContext value={{ ...saved, loaded, completeLesson, finishOnboarding }}>
      {children}
    </ProgressContext>
  );
}

export function useProgress() {
  return use(ProgressContext);
}
