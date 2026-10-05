import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'quiet';
  style?: StyleProp<ViewStyle>;
};

export function Button({ label, onPress, variant = 'primary', style }: Props) {
  const theme = useTheme();
  const quiet = variant === 'quiet';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: quiet ? theme.backgroundElement : theme.primary },
        pressed && styles.pressed,
        style,
      ]}>
      <ThemedText type="smallBold" style={[styles.label, { color: quiet ? theme.text : '#ffffff' }]}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: 999,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  label: {
    fontSize: 17,
    lineHeight: 22,
  },
});
