import { colors, layout, radius, spacing, typography } from '@/lib/theme';
import * as React from 'react';
import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { AppText } from './AppText';

// ... existing code omitted for brevity?

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = PressableProps & {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
};

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.amber,
    borderColor: colors.amber,
  },
  secondary: {
    backgroundColor: colors.beigeSoft,
    borderColor: colors.line,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
};

const labelStyles: Record<ButtonVariant, TextStyle> = {
  primary: { color: colors.white },
  secondary: { color: colors.brown },
  ghost: { color: colors.amberDeep },
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: {
    minHeight: 42,
    paddingHorizontal: spacing.lg,
  },
  md: {
    minHeight: layout.controlHeight,
    paddingHorizontal: spacing.xl,
  },
  lg: {
    minHeight: 62,
    paddingHorizontal: spacing['2xl'],
  },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <Pressable
      {...props}
      disabled={isDisabled}
      accessibilityRole="button"
        style={(state) => [
          {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: radius.full,
            borderWidth: 1,
            opacity: isDisabled ? 0.58 : state.pressed ? 0.84 : 1,
            width: fullWidth ? '100%' : undefined,
          },
          variantStyles[variant],
          sizeStyles[size],
          typeof style === 'function' ? style(state) : style,
        ]}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.white : colors.amberDeep} />
      ) : (
        <AppText
          variant="bodySmall"
          style={[{ fontWeight: typography.weight.bold }, labelStyles[variant]]}>
          {children}
        </AppText>
      )}
    </Pressable>
  );
}
