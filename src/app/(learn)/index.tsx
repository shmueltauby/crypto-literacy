import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { CryptoCan } from '@/components/crypto-can';
import { Screen } from '@/components/screen';
import { SpeechBubble } from '@/components/speech-bubble';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Spacing } from '@/constants/theme';
import { lessons, type Lesson } from '@/content/lessons';
import { useLessonTint } from '@/hooks/use-lesson-tint';
import { useProgress } from '@/hooks/use-progress';
import { useTheme } from '@/hooks/use-theme';

function openLesson(lesson: Lesson) {
  router.push({ pathname: '/lesson/[id]', params: { id: lesson.id } });
}

function FeaturedLesson({ lesson }: { lesson: Lesson }) {
  const tint = useLessonTint(lesson.color);
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => openLesson(lesson)}
      style={({ pressed }) => [styles.featured, { backgroundColor: tint.soft }, pressed && styles.pressed]}>
      <View style={styles.featuredText}>
        <ThemedText type="smallBold" style={{ color: tint.strong }}>
          Up next
        </ThemedText>
        <ThemedText type="smallBold" style={styles.featuredTitle}>
          {lesson.title}
        </ThemedText>
        <ThemedText type="small">{lesson.summary}</ThemedText>
        <View style={[styles.startPill, { backgroundColor: tint.strong }]}>
          <ThemedText type="smallBold" style={styles.startText}>
            Start · {lesson.minutes} min
          </ThemedText>
        </View>
      </View>
      <ThemedText style={styles.featuredEmoji}>{lesson.emoji}</ThemedText>
    </Pressable>
  );
}

function LessonTile({ lesson, done }: { lesson: Lesson; done: boolean }) {
  const theme = useTheme();
  const tint = useLessonTint(lesson.color);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${lesson.title}${done ? ', explored' : ''}`}
      onPress={() => openLesson(lesson)}
      style={({ pressed }) => [styles.tile, { backgroundColor: tint.soft }, pressed && styles.pressed]}>
      <View style={styles.tileTop}>
        <ThemedText style={styles.tileEmoji}>{lesson.emoji}</ThemedText>
        {done && (
          <View style={[styles.doneBadge, { backgroundColor: theme.success }]}>
            <ThemedText type="smallBold" style={styles.doneText}>
              ✓
            </ThemedText>
          </View>
        )}
      </View>
      <ThemedText type="smallBold" style={styles.tileTitle}>
        {lesson.title}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {lesson.minutes} min · {lesson.cards.length} cards
      </ThemedText>
    </Pressable>
  );
}

export default function LearnScreen() {
  const theme = useTheme();
  const { completed, name } = useProgress();

  const next = lessons.find((lesson) => !completed.includes(lesson.id));
  const doneCount = lessons.length - lessons.filter((lesson) => !completed.includes(lesson.id)).length;
  const hello = name ? `, ${name}` : '';
  const greeting = !next
    ? `You’ve explored everything${hello}! Revisit any topic whenever you like.`
    : doneCount === 0
      ? `Hi${hello}! Pick any topic and I’ll show you around.`
      : `Welcome back${hello}! Ready for another one?`;

  return (
    <Screen>
      <View style={styles.hero}>
        <CryptoCan size={92} mood={next ? 'happy' : 'cheer'} />
        <SpeechBubble style={styles.heroBubble}>
          <ThemedText type="smallBold" style={styles.heroText}>
            {greeting}
          </ThemedText>
        </SpeechBubble>
      </View>

      {next && <FeaturedLesson lesson={next} />}

      <View style={styles.sectionHeader}>
        <ThemedText type="smallBold" style={styles.sectionTitle}>
          All topics
        </ThemedText>
        <View style={styles.dots}>
          {lessons.map((lesson) => (
            <View
              key={lesson.id}
              style={[
                styles.dot,
                { backgroundColor: completed.includes(lesson.id) ? theme.success : theme.backgroundSelected },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.grid}>
        {lessons.map((lesson) => (
          <LessonTile key={lesson.id} lesson={lesson} done={completed.includes(lesson.id)} />
        ))}
      </View>

      <ThemedText type="small" themeColor="textSecondary" style={styles.disclaimer}>
        This app is for education only and is not financial advice.
      </ThemedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  heroBubble: {
    flex: 1,
  },
  heroText: {
    fontSize: 16,
    lineHeight: 22,
  },
  featured: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: 28,
    padding: Spacing.four,
  },
  featuredText: {
    flex: 1,
    alignItems: 'flex-start',
    gap: Spacing.one,
  },
  featuredTitle: {
    fontSize: 24,
    lineHeight: 30,
  },
  featuredEmoji: {
    fontFamily: Fonts.sans,
    fontSize: 64,
    lineHeight: 80,
  },
  startPill: {
    marginTop: Spacing.two,
    borderRadius: 999,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  startText: {
    color: '#ffffff',
    fontSize: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.two,
  },
  sectionTitle: {
    fontSize: 20,
    lineHeight: 26,
  },
  dots: {
    flexDirection: 'row',
    gap: Spacing.one + Spacing.half,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: Spacing.two + Spacing.one,
  },
  tile: {
    width: '48.2%',
    borderRadius: 24,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  tileTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  tileEmoji: {
    fontFamily: Fonts.sans,
    fontSize: 38,
    lineHeight: 48,
  },
  tileTitle: {
    fontSize: 16,
    lineHeight: 21,
  },
  doneBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneText: {
    color: '#ffffff',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disclaimer: {
    textAlign: 'center',
    marginTop: Spacing.two,
  },
});
