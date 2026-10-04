import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, use, useEffect, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'progress-v1';

type Saved = {
  completed: string[];
  xp: number;
  streak: number;
  /** Local date (YYYY-MM-DD) a lesson was last completed. */
  lastActive: string | null;
  name: string;
  onboarded: boolean;
};

type Progress = Saved & {
  /** False until saved progress has been read from the device. */
  loaded: boolean;
  completeLesson: (lessonId: string, xpEarned: number) => void;
  finishOnboarding: (name: string) => void;
};

const empty: Saved = {
  completed: [],
  xp: 0,
  streak: 0,
  lastActive: null,
  name: '',
  onboarded: false,
};

function dayKey(daysAgo = 0) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

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
          const parsed: Saved = { ...empty, ...JSON.parse(stored) };
          // A streak only survives if the last lesson was today or yesterday.
          const alive = parsed.lastActive === dayKey() || parsed.lastActive === dayKey(1);
          setSaved(alive ? parsed : { ...parsed, streak: 0 });
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const save = (next: Saved) => {
    setSaved(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  };

  const completeLesson = (lessonId: string, xpEarned: number) => {
    const today = dayKey();
    save({
      ...saved,
      completed: saved.completed.includes(lessonId)
        ? saved.completed
        : [...saved.completed, lessonId],
      xp: saved.xp + xpEarned,
      streak: saved.lastActive === today ? Math.max(saved.streak, 1) : saved.streak + 1,
      lastActive: today,
    });
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
