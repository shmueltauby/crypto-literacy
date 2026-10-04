import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChunkyButton } from '@/components/chunky-button';
import { CryptoCan } from '@/components/crypto-can';
import { SpeechBubble } from '@/components/speech-bubble';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { getLesson, lessons } from '@/content/lessons';
import { useProgress } from '@/hooks/use-progress';
import { useTheme } from '@/hooks/use-theme';

const LESSON_XP = 10;
const CORRECT_ANSWER_XP = 5;
const PRACTICE_XP = 5;

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

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getLesson(id);
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { completed, completeLesson } = useProgress();
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const frame = { paddingTop: insets.top + Spacing.three, paddingBottom: insets.bottom + Spacing.three };

  if (!lesson) {
    return (
      <ThemedView style={[styles.screen, frame]}>
        <View style={[styles.column, styles.centered]}>
          <CryptoCan mood="sad" />
          <ThemedText type="subtitle">Lesson not found</ThemedText>
          <ChunkyButton label="Back to lessons" onPress={goBack} />
        </View>
      </ThemedView>
    );
  }

  const sectionCount = lesson.sections.length;
  const stepCount = sectionCount + lesson.quiz.length;
  const finished = step >= stepCount;
  const section = step < sectionCount ? lesson.sections[step] : undefined;
  const question = !section && !finished ? lesson.quiz[step - sectionCount] : undefined;
  const isCorrect = question !== undefined && picked === question.answerIndex;
  const xpEarned = completed.includes(lesson.id)
    ? PRACTICE_XP
    : LESSON_XP + correctCount * CORRECT_ANSWER_XP;

  const next = () => {
    setStep(step + 1);
    setPicked(null);
    setChecked(false);
  };

  const check = () => {
    setChecked(true);
    if (isCorrect) setCorrectCount(correctCount + 1);
  };

  return (
    <ThemedView style={[styles.screen, frame]}>
      <View style={styles.column}>
        {!finished && (
          <View style={styles.topBar}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close lesson"
              hitSlop={12}
              onPress={goBack}
              style={({ pressed }) => pressed && styles.pressed}>
              <ThemedText type="smallBold" themeColor="textSecondary" style={styles.close}>
                ✕
              </ThemedText>
            </Pressable>
            <ThemedView type="backgroundSelected" style={styles.track}>
              <View
                style={[
                  styles.trackFill,
                  { backgroundColor: theme.primary, width: `${(step / stepCount) * 100}%` },
                ]}
              />
            </ThemedView>
          </View>
        )}

        <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
          {section && (
            <>
              <View style={styles.teach}>
                <CryptoCan size={84} />
                <SpeechBubble style={styles.teachBubble}>
                  <ThemedText type="smallBold" style={styles.heading}>
                    {section.heading}
                  </ThemedText>
                </SpeechBubble>
              </View>
              <ThemedText style={styles.bodyText}>{section.body}</ThemedText>
            </>
          )}

          {question && (
            <>
              <ThemedText type="smallBold" style={styles.heading}>
                {question.question}
              </ThemedText>
              {question.options.map((option, index) => {
                const selected = index === picked;
                const showCorrect = checked && index === question.answerIndex;
                const showWrong = checked && selected && !isCorrect;
                const colors = showCorrect
                  ? { backgroundColor: theme.successSoft, borderColor: theme.success }
                  : showWrong
                    ? { backgroundColor: theme.dangerSoft, borderColor: theme.danger }
                    : selected
                      ? { backgroundColor: theme.accentSoft, borderColor: theme.accent }
                      : { backgroundColor: theme.background, borderColor: theme.border };
                return (
                  <Pressable
                    key={option}
                    accessibilityRole="button"
                    disabled={checked}
                    onPress={() => setPicked(index)}
                    style={({ pressed }) => [styles.option, colors, pressed && styles.optionPressed]}>
                    <ThemedText type="smallBold" style={styles.optionText}>
                      {option}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </>
          )}

          {finished && (
            <View style={styles.centered}>
              <CryptoCan size={180} mood="cheer" />
              <ThemedText type="subtitle" style={[styles.center, { color: theme.goldShade }]}>
                Lesson complete!
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.center}>
                {lesson.title}
              </ThemedText>
              <View style={styles.results}>
                <View style={[styles.result, { borderColor: theme.gold }]}>
                  <ThemedText type="smallBold" themeColor="textSecondary">
                    XP EARNED
                  </ThemedText>
                  <ThemedText type="smallBold" style={styles.resultValue}>
                    ⚡ {xpEarned}
                  </ThemedText>
                </View>
                <View style={[styles.result, { borderColor: theme.primary }]}>
                  <ThemedText type="smallBold" themeColor="textSecondary">
                    QUIZ SCORE
                  </ThemedText>
                  <ThemedText type="smallBold" style={styles.resultValue}>
                    🎯 {correctCount}/{lesson.quiz.length}
                  </ThemedText>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {question && checked && (
          <View
            style={[
              styles.feedback,
              { backgroundColor: isCorrect ? theme.successSoft : theme.dangerSoft },
            ]}>
            <CryptoCan size={56} mood={isCorrect ? 'cheer' : 'sad'} />
            <View style={styles.feedbackText}>
              <ThemedText
                type="smallBold"
                style={[styles.feedbackTitle, { color: isCorrect ? theme.success : theme.danger }]}>
                {isCorrect ? 'Nice one!' : 'Not quite'}
              </ThemedText>
              <ThemedText type="small">{question.explanation}</ThemedText>
            </View>
          </View>
        )}

        {section && <ChunkyButton label="Continue" onPress={next} />}
        {question && !checked && (
          <ChunkyButton label="Check" disabled={picked === null} onPress={check} />
        )}
        {question && checked && (
          <ChunkyButton
            label={isCorrect ? 'Continue' : 'Got it'}
            variant={isCorrect ? 'primary' : 'danger'}
            onPress={next}
          />
        )}
        {finished && (
          <ChunkyButton
            label="Continue"
            onPress={() => {
              completeLesson(lesson.id, xpEarned);
              goBack();
            }}
          />
        )}
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
    maxWidth: 600,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  close: {
    fontSize: 22,
    lineHeight: 28,
  },
  track: {
    flex: 1,
    height: Spacing.three,
    borderRadius: Spacing.two,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: Spacing.two,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  teach: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  teachBubble: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    lineHeight: 28,
  },
  bodyText: {
    fontSize: 18,
    lineHeight: 28,
  },
  option: {
    borderWidth: 2,
    borderBottomWidth: 4,
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  optionPressed: {
    borderBottomWidth: 2,
    marginTop: 2,
  },
  optionText: {
    fontSize: 16,
    lineHeight: 22,
  },
  feedback: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  feedbackText: {
    flex: 1,
    gap: Spacing.half,
  },
  feedbackTitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  center: {
    textAlign: 'center',
  },
  results: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  result: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: Spacing.three,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    gap: Spacing.half,
  },
  resultValue: {
    fontSize: 20,
    lineHeight: 28,
  },
  pressed: {
    opacity: 0.6,
  },
});
