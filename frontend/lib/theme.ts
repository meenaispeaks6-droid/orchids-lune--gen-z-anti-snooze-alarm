import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

export const colors = {
  cream: '#FFF9EF',
  creamSoft: '#FFFDF8',
  ivory: '#FFFCF5',
  beige: '#F3E7D4',
  beigeSoft: '#F8EFE3',
  sand: '#EAD8BD',
  amber: '#D4943D',
  amberDeep: '#B87522',
  brown: '#2B1A0E',
  brownSoft: '#6F665C',
  taupe: '#8A8074',
  line: '#EADCCA',
  white: '#FFFFFF',
  danger: '#D86B4F',
} as const;

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    title: 36,
    hero: 44,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    title: 44,
    hero: 54,
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
    wide: 0.6,
  },
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

export const radius = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 32,
  pill: 999,
} as const;

export const shadows = {
  soft: {
    shadowColor: colors.amberDeep,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 5,
  },
  premium: {
    shadowColor: colors.amberDeep,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.16,
    shadowRadius: 36,
    elevation: 10,
  },
} as const;

export const designTokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
} as const;

export const THEME = {
  light: {
    background: colors.cream,
    foreground: colors.brown,
    card: colors.ivory,
    cardForeground: colors.brown,
    popover: colors.white,
    popoverForeground: colors.brown,
    primary: colors.amber,
    primaryForeground: colors.white,
    secondary: colors.beigeSoft,
    secondaryForeground: colors.brown,
    muted: colors.beige,
    mutedForeground: colors.brownSoft,
    accent: colors.sand,
    accentForeground: colors.amberDeep,
    destructive: colors.danger,
    border: colors.line,
    input: colors.beigeSoft,
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
