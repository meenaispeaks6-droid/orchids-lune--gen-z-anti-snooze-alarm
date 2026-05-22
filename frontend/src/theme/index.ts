import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';
import { colors } from './colors';
import { layout, spacing } from './spacing';
import { typography } from './typography';
import { radii } from './radii';
import { shadows } from './shadows';

export { colors } from './colors';
export { spacing, layout } from './spacing';
export { typography } from './typography';
export { radii } from './radii';
export { shadows } from './shadows';

export const theme = {
  colors,
  spacing,
  layout,
  typography,
  radii,
  shadows,
} as const;

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: colors.background,
      border: colors.border,
      card: colors.surface,
      notification: colors.coral,
      primary: colors.primary,
      text: colors.text,
    },
  },
  dark: {
    ...DarkTheme,
    dark: false,
    colors: {
      background: colors.background,
      border: colors.border,
      card: colors.surface,
      notification: colors.coral,
      primary: colors.primary,
      text: colors.text,
    },
  },
};

export type AppTheme = typeof theme;
