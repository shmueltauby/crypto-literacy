import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'danger' | 'outline';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const DEPTH = 4;

/** A raised button that sinks when pressed. */
export function ChunkyButton({ label, onPress, variant = 'primary', disabled, style }: Props) {
  const theme = useTheme();

  const colors = disabled
    ? { face: theme.backgroundSelected, edge: theme.backgroundSelected, text: theme.textSecondary }
    : variant === 'danger'
      ? { face: theme.danger, edge: theme.dangerShade, text: '#ffffff' }
      : variant === 'outline'
        ? { face: theme.background, edge: theme.border, text: theme.accent }
        : { face: theme.primary, edge: theme.primaryShade, text: '#ffffff' };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.face, borderColor: colors.edge },
        variant === 'outline' && !disabled && styles.outline,
        pressed && styles.pressed,
        style,
      ]}>
      <ThemedText type="smallBold" style={[styles.label, { color: colors.text }]}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.three - 2,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    borderBottomWidth: DEPTH,
  },
  outline: {
    borderWidth: 2,
    borderBottomWidth: DEPTH,
  },
  pressed: {
    borderBottomWidth: 1,
    marginTop: DEPTH - 1,
  },
  label: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
