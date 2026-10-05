/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#22262E',
    background: '#ffffff',
    backgroundElement: '#F3F4F7',
    backgroundSelected: '#E4E6EC',
    textSecondary: '#666E7C',
    border: '#E4E6EC',
    primary: '#4F46E5',
    success: '#1F9D55',
    successSoft: '#DDF7E3',
    danger: '#DC4A47',
    dangerSoft: '#FFE3E1',
  },
  dark: {
    text: '#F2F4F8',
    background: '#13151B',
    backgroundElement: '#1F222B',
    backgroundSelected: '#2D313D',
    textSecondary: '#A5ACBA',
    border: '#353A47',
    primary: '#6D66F2',
    success: '#4CD27A',
    successSoft: '#173524',
    danger: '#F0625F',
    dangerSoft: '#3D1F1F',
  },
} as const;

/** Each topic has its own colour: a soft background and a strong accent. */
export const LessonColors = {
  amber: {
    light: { soft: '#FFF0D1', strong: '#C98600' },
    dark: { soft: '#3A2D10', strong: '#F2B632' },
  },
  blue: {
    light: { soft: '#DCEBFF', strong: '#2A72D8' },
    dark: { soft: '#14273F', strong: '#5BA0F5' },
  },
  purple: {
    light: { soft: '#EAE3FF', strong: '#7250DB' },
    dark: { soft: '#251D45', strong: '#A48BF7' },
  },
  green: {
    light: { soft: '#DBF4E2', strong: '#1F9650' },
    dark: { soft: '#14311F', strong: '#4CCB7C' },
  },
  teal: {
    light: { soft: '#D6F2F0', strong: '#0F8F86' },
    dark: { soft: '#103230', strong: '#3CC7BC' },
  },
  red: {
    light: { soft: '#FFE1DE', strong: '#D34A44' },
    dark: { soft: '#3D1C1B', strong: '#F47B75' },
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
