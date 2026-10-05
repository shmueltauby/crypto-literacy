import { LessonColors } from '@/constants/theme';
import type { LessonColor } from '@/content/lessons';
import { useColorScheme } from '@/hooks/use-color-scheme';

/** The soft background and strong accent for a lesson's colour, in the current light or dark mode. */
export function useLessonTint(color: LessonColor) {
  const scheme = useColorScheme();
  return LessonColors[color][scheme === 'dark' ? 'dark' : 'light'];
}
