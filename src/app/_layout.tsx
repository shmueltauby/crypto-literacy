import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { StyleSheet, useColorScheme } from 'react-native';

import AppTabs from '@/components/app-tabs';
import { Onboarding } from '@/components/onboarding';
import { ThemedView } from '@/components/themed-view';
import { ProgressProvider, useProgress } from '@/hooks/use-progress';

function OnboardingGate() {
  const { loaded, onboarded } = useProgress();
  // Cover the app until we know whether this person has met Crypto Can yet.
  if (!loaded) return <ThemedView style={StyleSheet.absoluteFill} />;
  if (!onboarded) return <Onboarding />;
  return null;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  useFonts({
    Nunito_600SemiBold: require('@/assets/fonts/Nunito_600SemiBold.ttf'),
    Nunito_800ExtraBold: require('@/assets/fonts/Nunito_800ExtraBold.ttf'),
  });

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ProgressProvider>
        <AppTabs />
        <OnboardingGate />
      </ProgressProvider>
    </ThemeProvider>
  );
}
