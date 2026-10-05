import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, type ReactNode } from 'react';
import { Animated, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { CryptoCan } from '@/components/crypto-can';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LessonVisual } from '@/components/visuals';
import { Spacing } from '@/constants/theme';
import { getLesson, lessons } from '@/content/lessons';
import { useLessonTint } from '@/hooks/use-lesson-tint';
import { useProgress } from '@/hooks/use-progress';
import { useTheme } from '@/hooks/use-theme';

export function generateStaticParams() {
  return lessons.map((lesson) => ({ id: lesson.id }));
}

function goBack() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/');
  }
}

/** Fades and lifts each card in as it appears. */
function CardEntrance({ children }: { children: ReactNode }) {
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.spring(progress, {
      toValue: 1,
      friction: 8,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [progress]);

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [16, 0] });
  return (
    <Animated.View style={[styles.card, { opacity: progress, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getLesson(id);
  const theme = useTheme();
  const tint = useLessonTint(lesson?.color ?? 'blue');
  const insets = useSafeAreaInsets();
  const { completeLesson } = useProgress();
  const [index, setIndex] = useState(0);

  const frame = { paddingTop: insets.top + Spacing.three, paddingBottom: insets.bottom + Spacing.three };

  if (!lesson) {
    return (
      <ThemedView style={[styles.screen, frame]}>
        <View style={[styles.column, styles.missing]}>
          <CryptoCan mood="sad" />
          <ThemedText type="subtitle">Topic not found</ThemedText>
          <Button label="Back to topics" onPress={goBack} />
        </View>
      </ThemedView>
    );
  }

  const card = lesson.cards[index];
  const last = index === lesson.cards.length - 1;

  return (
    <ThemedView style={[styles.screen, frame]}>
      <View style={styles.column}>
        <View style={styles.topBar}>
          <View style={styles.segments}>
            {lesson.cards.map((_, position) => (
              <View
                key={position}
                style={[
                  styles.segment,
                  { backgroundColor: position <= index ? tint.strong : theme.backgroundSelected },
                ]}
              />
            ))}
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            hitSlop={12}
            onPress={goBack}
            style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.close}>
              ✕
            </ThemedText>
          </Pressable>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
          <CardEntrance key={index}>
            {last && (
              <View style={styles.finale}>
                <CryptoCan size={110} mood="cheer" />
              </View>
            )}
            <ThemedText type="subtitle">{card.title}</ThemedText>
            {card.text && (
              <ThemedText themeColor="textSecondary" style={styles.text}>
                {card.text}
              </ThemedText>
            )}
            <LessonVisual visual={card.visual} tint={tint} />
          </CardEntrance>
        </ScrollView>

        <View style={styles.footer}>
          {index > 0 && <Button label="Back" variant="quiet" onPress={() => setIndex(index - 1)} />}
          <Button
            label={last ? 'Done' : 'Next'}
            style={styles.next}
            onPress={() => {
              if (last) {
                completeLesson(lesson.id);
                goBack();
              } else {
                setIndex(index + 1);
              }
            }}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  column: {
    flex: 1,
    width: '100%',
    maxWidth: 560,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  missing: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  segments: {
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.one,
  },
  segment: {
    flex: 1,
    height: 5,
    borderRadius: 3,
  },
  close: {
    fontSize: 20,
    lineHeight: 26,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: Spacing.three,
  },
  card: {
    gap: Spacing.three,
  },
  finale: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    lineHeight: 26,
  },
  footer: {
    flexDirection: 'row',
    gap: Spacing.two + Spacing.one,
  },
  next: {
    flex: 1,
  },
  pressed: {
    opacity: 0.6,
  },
});
