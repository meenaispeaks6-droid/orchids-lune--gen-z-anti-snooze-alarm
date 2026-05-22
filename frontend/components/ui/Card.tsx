import { colors, radius, shadows, spacing } from '@/lib/theme';
import * as React from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';

type CardVariant = 'default' | 'muted' | 'outlined' | 'accent';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

type CardProps = ViewProps & {
  variant?: CardVariant;
  padding?: CardPadding;
  elevated?: boolean;
  children: React.ReactNode;
};

const variantStyles: Record<CardVariant, ViewStyle> = {
  default: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
  },
  muted: {
    backgroundColor: colors.beigeSoft,
    borderColor: colors.line,
  },
  outlined: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.line,
  },
  accent: {
    backgroundColor: colors.amber,
    borderColor: colors.amber,
  },
};

const paddingStyles: Record<CardPadding, ViewStyle> = {
  none: { padding: spacing.none },
  sm: { padding: spacing.md },
  md: { padding: spacing.lg },
  lg: { padding: spacing['2xl'] },
};

export function Card({
  variant = 'default',
  padding = 'md',
  elevated = false,
  style,
  children,
  ...props
}: CardProps) {
  return (
    <View
      {...props}
      style={[
        {
          borderRadius: radius.lg,
          borderWidth: 1,
        },
        variantStyles[variant],
        paddingStyles[padding],
        elevated && shadows.card,
        style,
      ]}>
      {children}
    </View>
  );
}
