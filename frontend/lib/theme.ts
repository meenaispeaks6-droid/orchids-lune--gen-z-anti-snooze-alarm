import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

export const colors = {
  background: '#FFF8EE',
  surface: '#FFFDF8',
  surfaceElevated: '#FFFFFF',
  surfaceMuted: '#F6EBDC',
  cream: '#FFF8EE',
  ivory: '#FFFDF8',
  beige: '#EEDFCB',
  beigeSoft: '#F8EFE3',
  sand: '#E6D2B4',
  amber: '#D8953D',
  amberDeep: '#A96722',
  brown: '#2A190D',
  brownSoft: '#66584A',
  taupe: '#908273',
  line: '#E9D9C3',
  white: '#FFFFFF',
  danger: '#D86B4F',
  success: '#6E8F64',
} as const;

export const typography = {
    fontFamily: {
      regular: 'Angelone',
      medium: 'Angelone',
      semibold: 'Angelone',
      bold: 'Angelone',
    },
  size: {
    caption: 12,
    bodySmall: 14,
    body: 16,
    bodyLarge: 18,
    titleSmall: 22,
    title: 30,
    display: 42,
  },
  lineHeight: {
    caption: 16,
    bodySmall: 20,
    body: 24,
    bodyLarge: 28,
    titleSmall: 30,
    title: 38,
    display: 50,
  },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
  },
  letterSpacing: {
    tight: -1,
    normal: 0,
    wide: 0.4,
    caps: 1.2,
  },
} as const;

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

export const radius = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 32,
  full: 999,
} as const;

export const shadows = {
  card: {
    shadowColor: colors.amberDeep,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  premium: {
    shadowColor: colors.amberDeep,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.14,
    shadowRadius: 34,
    elevation: 8,
  },
} as const;

export const layout = {
  screenPadding: spacing.xl,
  maxContentWidth: 460,
  controlHeight: 54,
  headerHeight: 64,
} as const;

export const designSystem = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  layout,
} as const;

export const THEME = {
  light: {
    background: colors.background,
    foreground: colors.brown,
    card: colors.surface,
    cardForeground: colors.brown,
    popover: colors.surfaceElevated,
    popoverForeground: colors.brown,
    primary: colors.amber,
    primaryForeground: colors.white,
    secondary: colors.beigeSoft,
    secondaryForeground: colors.brown,
    muted: colors.surfaceMuted,
    mutedForeground: colors.brownSoft,
    accent: colors.sand,
    accentForeground: colors.amberDeep,
    destructive: colors.danger,
    border: colors.line,
    input: colors.surfaceElevated,
    ring: colors.amber,
    radius: `${radius.md}px`,
  },
  dark: {
    background: colors.brown,
    foreground: colors.cream,
    card: '#3A2818',
    cardForeground: colors.cream,
    popover: '#3A2818',
    popoverForeground: colors.cream,
    primary: colors.amber,
    primaryForeground: colors.white,
    secondary: '#4A3522',
    secondaryForeground: colors.cream,
    muted: '#4A3522',
    mutedForeground: colors.sand,
    accent: colors.amberDeep,
    accentForeground: colors.cream,
    destructive: colors.danger,
    border: '#5C432D',
    input: '#4A3522',
    ring: colors.amber,
    radius: `${radius.md}px`,
  },
};

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};

export type AppTheme = typeof designSystem;
