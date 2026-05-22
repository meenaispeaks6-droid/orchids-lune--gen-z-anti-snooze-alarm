import { colors, typography } from '@/lib/theme';
import * as React from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';

type TextVariant = 'display' | 'title' | 'titleSmall' | 'bodyLarge' | 'body' | 'bodySmall' | 'caption' | 'label';
type TextTone = 'primary' | 'secondary' | 'muted' | 'inverse' | 'accent' | 'danger';

type AppTextProps = TextProps & {
  variant?: TextVariant;
  tone?: TextTone;
  align?: TextStyle['textAlign'];
  children: React.ReactNode;
};

const variantStyles: Record<TextVariant, TextStyle> = {
    display: {
      fontSize: typography.size.display,
      lineHeight: typography.lineHeight.display,
      fontWeight: typography.weight.heavy,
      letterSpacing: typography.letterSpacing.tight,
      fontFamily: typography.fontFamily.bold,
    },
    title: {
      fontSize: typography.size.title,
      lineHeight: typography.lineHeight.title,
      fontWeight: typography.weight.bold,
      letterSpacing: typography.letterSpacing.tight,
      fontFamily: typography.fontFamily.bold,
    },
    titleSmall: {
      fontSize: typography.size.titleSmall,
      lineHeight: typography.lineHeight.titleSmall,
      fontWeight: typography.weight.semibold,
      fontFamily: typography.fontFamily.semibold,
    },
    bodyLarge: {
      fontSize: typography.size.bodyLarge,
      lineHeight: typography.lineHeight.bodyLarge,
      fontWeight: typography.weight.medium,
      fontFamily: typography.fontFamily.medium,
    },
    body: {
      fontSize: typography.size.body,
      lineHeight: typography.lineHeight.body,
      fontWeight: typography.weight.regular,
      fontFamily: typography.fontFamily.regular,
    },
    bodySmall: {
      fontSize: typography.size.bodySmall,
      lineHeight: typography.lineHeight.bodySmall,
      fontWeight: typography.weight.regular,
      fontFamily: typography.fontFamily.regular,
    },
    caption: {
      fontSize: typography.size.caption,
      lineHeight: typography.lineHeight.caption,
      fontWeight: typography.weight.medium,
      fontFamily: typography.fontFamily.medium,
    },
    label: {
      fontSize: typography.size.caption,
      lineHeight: typography.lineHeight.caption,
      fontWeight: typography.weight.bold,
      letterSpacing: typography.letterSpacing.caps,
      textTransform: 'uppercase',
      fontFamily: typography.fontFamily.bold,
    },
};

const toneColors: Record<TextTone, string> = {
  primary: colors.brown,
  secondary: colors.brownSoft,
  muted: colors.taupe,
  inverse: colors.white,
  accent: colors.amberDeep,
  danger: colors.danger,
};

export function AppText({
  variant = 'body',
  tone = 'primary',
  align,
  style,
  children,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[variantStyles[variant], { color: toneColors[tone], textAlign: align }, style]}>
      {children}
    </Text>
  );
}
