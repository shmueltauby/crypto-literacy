import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { getLesson, lessons } from '@/content/lessons';
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

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getLesson(id);
  const theme = useTheme();
  const { markCompleted } = useProgress();
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const backButton = (
    <Pressable onPress={goBack} style={({ pressed }) => [styles.back, pressed && styles.pressed]}>
      <ThemedText type="smallBold" style={{ color: theme.accent }}>
        ‹ All lessons
      </ThemedText>
    </Pressable>
  );

  if (!lesson) {
    return (
      <Screen>
        {backButton}
        <ThemedText type="subtitle">Lesson not found</ThemedText>
      </Screen>
    );
  }

  const allAnswered = lesson.quiz.every((_, index) => answers[index] !== undefined);
  const correctCount = lesson.quiz.filter((q, index) => answers[index] === q.answerIndex).length;

  return (
    <Screen>
      {backButton}
      <ThemedText type="subtitle">{lesson.title}</ThemedText>

      {lesson.sections.map((section) => (
        <View key={section.heading} style={styles.section}>
          <ThemedText type="smallBold" style={styles.heading}>
            {section.heading}
          </ThemedText>
          <ThemedText themeColor="textSecondary">{section.body}</ThemedText>
        </View>
      ))}

      <ThemedText type="smallBold" style={[styles.heading, styles.quizTitle]}>
        Check your understanding
      </ThemedText>

      {lesson.quiz.map((q, qIndex) => {
        const picked = answers[qIndex];
        const answered = picked !== undefined;
        return (
          <ThemedView key={q.question} type="backgroundElement" style={styles.question}>
            <ThemedText type="smallBold">{q.question}</ThemedText>
            {q.options.map((option, oIndex) => {
              const isCorrect = oIndex === q.answerIndex;
              const borderColor = !answered
                ? theme.backgroundSelected
                : isCorrect
                  ? theme.success
                  : oIndex === picked
                    ? theme.danger
                    : theme.backgroundSelected;
              return (
                <Pressable
                  key={option}
                  disabled={answered}
                  onPress={() => setAnswers({ ...answers, [qIndex]: oIndex })}
                  style={({ pressed }) => [styles.option, { borderColor }, pressed && styles.pressed]}>
                  <ThemedText type="small">{option}</ThemedText>
                </Pressable>
              );
            })}
            {answered && (
              <ThemedText type="small" themeColor="textSecondary">
                {picked === q.answerIndex ? 'Correct. ' : 'Not quite. '}
                {q.explanation}
              </ThemedText>
            )}
          </ThemedView>
        );
      })}

      {allAnswered && (
        <View style={styles.finish}>
          <ThemedText type="small" themeColor="textSecondary">
            You got {correctCount} of {lesson.quiz.length} right.
          </ThemedText>
          <Pressable
            onPress={() => {
              markCompleted(lesson.id);
              goBack();
            }}
            style={({ pressed }) => [
              styles.finishButton,
              { backgroundColor: theme.accent },
              pressed && styles.pressed,
            ]}>
            <ThemedText type="smallBold" style={styles.finishText}>
              Complete lesson
            </ThemedText>
          </Pressable>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.one,
  },
  section: {
    gap: Spacing.one,
  },
  heading: {
    fontSize: 18,
    lineHeight: 26,
  },
  quizTitle: {
    marginTop: Spacing.three,
  },
  question: {
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  option: {
    borderWidth: 2,
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  finish: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  finishButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
  },
  finishText: {
    color: '#ffffff',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
  },
});
