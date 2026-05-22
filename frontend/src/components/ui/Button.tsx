import { colors, radii, spacing, typography } from '@/src/theme';
import { ActivityIndicator, Pressable, StyleSheet, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { AppText } from './AppText';

type ButtonProps = Omit<PressableProps, 'style'> & {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const variantStyles = {
  primary: { backgroundColor: colors.primary, borderColor: colors.primary },
  secondary: { backgroundColor: colors.surfaceSoft, borderColor: colors.border },
  ghost: { backgroundColor: 'transparent', borderColor: 'transparent' },
} as const;

const labelTone = {
  primary: 'inverse',
  secondary: 'accent',
  ghost: 'accent',
} as const;

const sizeStyles = {
  sm: { minHeight: 42, paddingHorizontal: spacing[4] },
  md: { minHeight: 54, paddingHorizontal: spacing[5] },
  lg: { minHeight: 62, paddingHorizontal: spacing[6] },
} as const;

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
  const resolvedStyle = StyleSheet.flatten(style);

  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        {
          alignItems: 'center',
          borderRadius: radii.full,
          borderWidth: 1,
          justifyContent: 'center',
          opacity: isDisabled ? 0.55 : pressed ? 0.84 : 1,
          width: fullWidth ? '100%' : undefined,
        },
        variantStyles[variant],
        sizeStyles[size],
        resolvedStyle,
      ]}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.white : colors.primary} />
      ) : (
        <AppText variant="bodySmall" tone={labelTone[variant]} style={styles.label}>
          {children}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: typography.weight.bold,
  },
});
