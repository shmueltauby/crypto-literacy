import { type ReactNode } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function Screen({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const padding = Platform.select({
    web: { paddingTop: Spacing.six + Spacing.four, paddingBottom: Spacing.five },
    default: {
      paddingTop: insets.top + Spacing.three,
      paddingBottom: insets.bottom + BottomTabInset + Spacing.three,
    },
  });

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={[styles.content, padding]}>
      <View style={styles.container}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
});
