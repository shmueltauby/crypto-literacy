/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#2B3238',
    background: '#ffffff',
    backgroundElement: '#F2F4F7',
    backgroundSelected: '#E3E7EC',
    textSecondary: '#6B7480',
    border: '#E3E7EC',
    primary: '#32B950',
    primaryShade: '#24903C',
    accent: '#1CA4F0',
    accentShade: '#1483C4',
    accentSoft: '#DDF2FF',
    gold: '#FFC83D',
    goldShade: '#E0A500',
    success: '#1F9D55',
    successSoft: '#DDF7E3',
    danger: '#E5484D',
    dangerShade: '#B93338',
    dangerSoft: '#FFE3E3',
  },
  dark: {
    text: '#F1F5F8',
    background: '#12181C',
    backgroundElement: '#1E262C',
    backgroundSelected: '#2B363D',
    textSecondary: '#A3AEB8',
    border: '#34414A',
    primary: '#3CCB5C',
    primaryShade: '#2A9D45',
    accent: '#3DB4F5',
    accentShade: '#1E8FD0',
    accentSoft: '#15303F',
    gold: '#FFC83D',
    goldShade: '#E0A500',
    success: '#4CD27A',
    successSoft: '#173524',
    danger: '#F0625F',
    dangerShade: '#B93338',
    dangerSoft: '#3D1F1F',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const FontFamily = {
  regular: 'Nunito_600SemiBold',
  bold: 'Nunito_800ExtraBold',
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
