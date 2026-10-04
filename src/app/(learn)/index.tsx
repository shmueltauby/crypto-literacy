import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { CryptoCan } from '@/components/crypto-can';
import { Screen } from '@/components/screen';
import { SpeechBubble } from '@/components/speech-bubble';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { lessons } from '@/content/lessons';
import { useProgress } from '@/hooks/use-progress';
import { useTheme } from '@/hooks/use-theme';

// Sideways shift of each stop on the path, so it winds like a trail.
const PATH_OFFSETS = [0, 56, 84, 56, 0, -56, -84, -56];
const NODE_SIZE = 76;

export default function LearnScreen() {
  const theme = useTheme();
  const { completed, xp, streak, name } = useProgress();

  const nextIndex = lessons.findIndex((lesson) => !completed.includes(lesson.id));
  const allDone = nextIndex === -1;
  const greeting = allDone
    ? 'You finished every lesson! Tap any stop to practise again.'
    : completed.length === 0
      ? `${name ? `Hi ${name}! ` : ''}Tap the green circle to start your first lesson.`
      : `${name ? `Nice work, ${name}! ` : 'Nice work! '}Next up: ${lessons[nextIndex].title}`;

  return (
    <Screen>
      <View style={styles.stats}>
        <View style={[styles.stat, { borderColor: theme.border }]}>
          <ThemedText type="smallBold" style={styles.statText}>
            🔥 {streak} day streak
          </ThemedText>
        </View>
        <View style={[styles.stat, { borderColor: theme.border }]}>
          <ThemedText type="smallBold" style={styles.statText}>
            ⚡ {xp} XP
          </ThemedText>
        </View>
      </View>

      <View style={styles.hero}>
        <CryptoCan size={96} mood={allDone ? 'cheer' : 'happy'} />
        <SpeechBubble style={styles.heroBubble}>
          <ThemedText type="smallBold" style={styles.heroText}>
            {greeting}
          </ThemedText>
        </SpeechBubble>
      </View>

      <View style={[styles.unit, { backgroundColor: theme.primary, borderColor: theme.primaryShade }]}>
        <ThemedText type="smallBold" style={styles.unitLabel}>
          UNIT 1
        </ThemedText>
        <ThemedText type="smallBold" style={styles.unitTitle}>
          Crypto basics
        </ThemedText>
        <ThemedText type="small" style={styles.unitLabel}>
          {completed.length} of {lessons.length} lessons complete
        </ThemedText>
      </View>

      <View style={styles.path}>
        {lessons.map((lesson, index) => {
          const done = completed.includes(lesson.id);
          const current = index === nextIndex;
          const locked = !done && !current;
          const colors = done
            ? { face: theme.gold, edge: theme.goldShade }
            : current
              ? { face: theme.primary, edge: theme.primaryShade }
              : { face: theme.backgroundSelected, edge: theme.border };

          return (
            <View
              key={lesson.id}
              style={[styles.stop, { left: PATH_OFFSETS[index % PATH_OFFSETS.length] }]}>
              {current && (
                <View style={[styles.startTag, { backgroundColor: theme.background, borderColor: theme.border }]}>
                  <ThemedText type="smallBold" style={{ color: theme.primary }}>
                    START
                  </ThemedText>
                </View>
              )}
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${lesson.title}${locked ? ', locked' : ''}`}
                disabled={locked}
                onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: lesson.id } })}
                style={({ pressed }) => [
                  styles.node,
                  { backgroundColor: colors.face, borderColor: colors.edge },
                  pressed && styles.nodePressed,
                ]}>
                <ThemedText style={[styles.nodeEmoji, locked && styles.locked]}>
                  {locked ? '🔒' : lesson.emoji}
                </ThemedText>
              </Pressable>
              <ThemedText
                type="smallBold"
                themeColor={locked ? 'textSecondary' : 'text'}
                style={styles.stopTitle}>
                {lesson.title}
              </ThemedText>
            </View>
          );
        })}
      </View>

      <ThemedText type="small" themeColor="textSecondary" style={styles.disclaimer}>
        This app is for education only and is not financial advice.
      </ThemedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  stat: {
    borderWidth: 2,
    borderRadius: Spacing.three,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
  },
  statText: {
    fontSize: 15,
  },
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
  unit: {
    borderRadius: Spacing.three,
    borderBottomWidth: 4,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  unitLabel: {
    color: '#ffffff',
    opacity: 0.9,
  },
  unitTitle: {
    color: '#ffffff',
    fontSize: 22,
    lineHeight: 30,
  },
  path: {
    alignItems: 'center',
    gap: Spacing.four,
    paddingVertical: Spacing.three,
  },
  stop: {
    alignItems: 'center',
    gap: Spacing.two,
    width: 180,
  },
  startTag: {
    borderWidth: 2,
    borderRadius: Spacing.two,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
  node: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: NODE_SIZE / 2,
    borderBottomWidth: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodePressed: {
    borderBottomWidth: 2,
    height: NODE_SIZE - 5,
    marginTop: 5,
  },
  nodeEmoji: {
    fontSize: 30,
    lineHeight: 38,
  },
  locked: {
    opacity: 0.5,
  },
  stopTitle: {
    textAlign: 'center',
  },
  disclaimer: {
    textAlign: 'center',
  },
});
