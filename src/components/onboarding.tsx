import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { CryptoCan, type Mood } from '@/components/crypto-can';
import { SpeechBubble } from '@/components/speech-bubble';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FontFamily, Spacing } from '@/constants/theme';
import { useProgress } from '@/hooks/use-progress';
import { useTheme } from '@/hooks/use-theme';

const STEP_COUNT = 4;

const perks = [
  { emoji: '🖼️', title: 'Pictures, not jargon', text: 'Every idea comes with a visual.' },
  { emoji: '👆', title: 'Tap and try', text: 'Poke at things to see how they work.' },
  { emoji: '⏱️', title: 'Two minutes a topic', text: 'Short enough for a coffee break.' },
];

export function Onboarding() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { finishOnboarding } = useProgress();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const firstName = name.trim();

  const next = () => setStep(step + 1);

  const mood: Mood = step === 0 ? 'wave' : step === 3 ? 'cheer' : 'happy';
  const speech = [
    'Squawk! Hi, I’m Crypto Can.',
    'What should I call you?',
    firstName ? `Nice to meet you, ${firstName}! Here’s how this works.` : 'Here’s how this works.',
    firstName ? `You’re all set, ${firstName}!` : 'You’re all set!',
  ][step];

  return (
    <ThemedView style={[StyleSheet.absoluteFill, styles.overlay]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[
          styles.container,
          { paddingTop: insets.top + Spacing.four, paddingBottom: insets.bottom + Spacing.four },
        ]}>
        <View style={styles.dots}>
          {Array.from({ length: STEP_COUNT }, (_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index <= step ? theme.primary : theme.backgroundSelected },
              ]}
            />
          ))}
        </View>

        <View style={styles.body}>
          <SpeechBubble tail="bottom" style={styles.bubble}>
            <ThemedText type="smallBold" style={styles.speech}>
              {speech}
            </ThemedText>
          </SpeechBubble>
          <CryptoCan size={170} mood={mood} />

          {step === 0 && (
            <ThemedText themeColor="textSecondary" style={styles.center}>
              I&apos;ll help you understand crypto, one picture at a time. No jargon, no sign-up
              and no real money.
            </ThemedText>
          )}

          {step === 1 && (
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your first name"
              placeholderTextColor={theme.textSecondary}
              autoCorrect={false}
              autoCapitalize="words"
              maxLength={20}
              returnKeyType="done"
              onSubmitEditing={next}
              style={[
                styles.input,
                { color: theme.text, borderColor: theme.border, backgroundColor: theme.backgroundElement },
              ]}
            />
          )}

          {step === 2 && (
            <View style={styles.perks}>
              {perks.map((perk) => (
                <View key={perk.title} style={[styles.perk, { backgroundColor: theme.backgroundElement }]}>
                  <ThemedText style={styles.perkEmoji}>{perk.emoji}</ThemedText>
                  <View style={styles.perkText}>
                    <ThemedText type="smallBold" style={styles.perkTitle}>
                      {perk.title}
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      {perk.text}
                    </ThemedText>
                  </View>
                </View>
              ))}
            </View>
          )}

          {step === 3 && (
            <ThemedText themeColor="textSecondary" style={styles.center}>
              Pick any topic to begin. There are no tests and no wrong turns.
            </ThemedText>
          )}
        </View>

        {step === 0 && <Button label="Get started" onPress={next} />}
        {step === 1 && <Button label={firstName ? 'Continue' : 'Skip'} onPress={next} />}
        {step === 2 && <Button label="Got it" onPress={next} />}
        {step === 3 && (
          <Button label="Start exploring" onPress={() => finishOnboarding(firstName)} />
        )}
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    zIndex: 10,
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  dots: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  dot: {
    flex: 1,
    height: Spacing.two,
    borderRadius: Spacing.one,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  bubble: {
    maxWidth: 320,
  },
  speech: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
  },
  center: {
    textAlign: 'center',
    maxWidth: 340,
  },
  input: {
    alignSelf: 'stretch',
    fontFamily: FontFamily.bold,
    fontSize: 18,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  perks: {
    alignSelf: 'stretch',
    gap: Spacing.two,
  },
  perk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: Spacing.four - Spacing.one,
    padding: Spacing.three,
  },
  perkEmoji: {
    fontSize: 28,
    lineHeight: 36,
  },
  perkText: {
    flex: 1,
  },
  perkTitle: {
    fontSize: 16,
  },
});
