import { colors, typography } from '@/src/theme';
import { Text, type TextProps, type TextStyle } from 'react-native';

type AppTextVariant = 'hero' | 'display' | 'title' | 'titleSmall' | 'bodyLarge' | 'body' | 'bodySmall' | 'caption' | 'label' | 'eyebrow';
type AppTextTone = 'default' | 'secondary' | 'muted' | 'inverse' | 'accent' | 'danger';

type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  tone?: AppTextTone;
  align?: TextStyle['textAlign'];
};

const variantStyles: Record<AppTextVariant, TextStyle> = {
  hero: {
    fontSize: typography.size.hero,
    lineHeight: typography.lineHeight.hero,
    fontWeight: typography.weight.bold,
    letterSpacing: typography.letterSpacing.tight,
    fontFamily: typography.family.heading,
  },
  display: {
    fontSize: typography.size.display,
    lineHeight: typography.lineHeight.display,
    fontWeight: typography.weight.bold,
    letterSpacing: typography.letterSpacing.tight,
    fontFamily: typography.family.heading,
  },
  title: {
    fontSize: typography.size.title,
    lineHeight: typography.lineHeight.title,
    fontWeight: typography.weight.bold,
    letterSpacing: typography.letterSpacing.tight,
    fontFamily: typography.family.heading,
  },
  titleSmall: {
    fontSize: typography.size.titleSmall,
    lineHeight: typography.lineHeight.titleSmall,
    fontWeight: typography.weight.semibold,
    fontFamily: typography.family.heading,
  },
    bodyLarge: {
      fontSize: typography.size.bodyLarge,
      lineHeight: typography.lineHeight.bodyLarge,
      fontWeight: typography.weight.medium,
      fontFamily: typography.family.body,
    },
    body: {
      fontSize: typography.size.body,
      lineHeight: typography.lineHeight.body,
      fontWeight: typography.weight.regular,
      fontFamily: typography.family.body,
    },
    bodySmall: {
      fontSize: typography.size.small,
      lineHeight: typography.lineHeight.small,
      fontWeight: typography.weight.regular,
      fontFamily: typography.family.body,
    },
    caption: {
      fontSize: typography.size.caption,
      lineHeight: typography.lineHeight.caption,
      fontWeight: typography.weight.medium,
      fontFamily: typography.family.body,
    },
    label: {
      fontSize: typography.size.eyebrow,
      lineHeight: typography.lineHeight.eyebrow,
      fontWeight: typography.weight.bold,
      letterSpacing: typography.letterSpacing.caps,
      textTransform: 'uppercase',
      fontFamily: typography.family.heading,
    },
    eyebrow: {
      fontSize: typography.size.eyebrow,
      lineHeight: typography.lineHeight.eyebrow,
      fontWeight: typography.weight.bold,
      letterSpacing: typography.letterSpacing.caps,
      textTransform: 'uppercase',
      fontFamily: typography.family.heading,
    },
};

const toneMap: Record<AppTextTone, string> = {
  default: colors.text,
  secondary: colors.textSoft,
  muted: colors.textMuted,
  inverse: colors.white,
  accent: colors.primaryDeep,
  danger: colors.coral,
};

export function AppText({ variant = 'body', tone = 'default', align, style, ...props }: AppTextProps) {
  return <Text {...props} style={[variantStyles[variant], { color: toneMap[tone], textAlign: align }, style]} />;
}
