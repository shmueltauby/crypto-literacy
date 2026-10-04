import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { lessons } from '@/content/lessons';
import { useProgress } from '@/hooks/use-progress';
import { useTheme } from '@/hooks/use-theme';

export default function LearnScreen() {
  const theme = useTheme();
  const { completed } = useProgress();
  const doneCount = lessons.filter((lesson) => completed.includes(lesson.id)).length;

  return (
    <Screen>
      <ThemedText type="subtitle">Learn crypto</ThemedText>
      <ThemedText themeColor="textSecondary">
        Short lessons in plain language. Free, with no sign-up.
      </ThemedText>

      <View style={styles.progress}>
        <ThemedView type="backgroundElement" style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { backgroundColor: theme.accent, width: `${(doneCount / lessons.length) * 100}%` },
            ]}
          />
        </ThemedView>
        <ThemedText type="small" themeColor="textSecondary">
          {doneCount} of {lessons.length} lessons completed
        </ThemedText>
      </View>

      {lessons.map((lesson, index) => {
        const done = completed.includes(lesson.id);
        return (
          <Link key={lesson.id} href={{ pathname: '/lesson/[id]', params: { id: lesson.id } }} asChild>
            <Pressable style={({ pressed }) => pressed && styles.pressed}>
              <ThemedView type="backgroundElement" style={styles.card}>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: done ? theme.success : theme.backgroundSelected },
                  ]}>
                  <ThemedText type="smallBold" style={done && styles.badgeDoneText}>
                    {done ? '✓' : index + 1}
                  </ThemedText>
                </View>
                <View style={styles.cardText}>
                  <ThemedText type="smallBold" style={styles.cardTitle}>
                    {lesson.title}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {lesson.summary}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {lesson.minutes} min
                  </ThemedText>
                </View>
              </ThemedView>
            </Pressable>
          </Link>
        );
      })}

      <ThemedText type="small" themeColor="textSecondary" style={styles.disclaimer}>
        This app is for education only and is not financial advice.
      </ThemedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  progress: {
    gap: Spacing.two,
  },
  progressTrack: {
    height: Spacing.two,
    borderRadius: Spacing.one,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  cardText: {
    flex: 1,
    gap: Spacing.half,
  },
  cardTitle: {
    fontSize: 16,
  },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDoneText: {
    color: '#ffffff',
  },
  pressed: {
    opacity: 0.7,
  },
  disclaimer: {
    textAlign: 'center',
    marginTop: Spacing.three,
  },
});
