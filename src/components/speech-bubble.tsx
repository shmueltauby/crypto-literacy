import { type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  children: ReactNode;
  /** Which side the mascot is on, so the tail points at him. */
  tail?: 'left' | 'bottom';
  style?: StyleProp<ViewStyle>;
};

export function SpeechBubble({ children, tail = 'left', style }: Props) {
  const theme = useTheme();
  const colors = { backgroundColor: theme.background, borderColor: theme.border };

  return (
    <View style={[styles.bubble, colors, style]}>
      <View style={[styles.tail, colors, tail === 'left' ? styles.tailLeft : styles.tailBottom]} />
      {children}
    </View>
  );
}

const TAIL = 14;

const styles = StyleSheet.create({
  bubble: {
    borderWidth: 2,
    borderRadius: Spacing.three,
    paddingVertical: Spacing.two + Spacing.one,
    paddingHorizontal: Spacing.three,
    gap: Spacing.one,
  },
  tail: {
    position: 'absolute',
    width: TAIL,
    height: TAIL,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
  },
  tailLeft: {
    left: -TAIL / 2 - 1,
    top: Spacing.four,
    transform: [{ rotate: '45deg' }],
  },
  tailBottom: {
    bottom: -TAIL / 2 - 1,
    alignSelf: 'center',
    transform: [{ rotate: '-45deg' }],
  },
});
