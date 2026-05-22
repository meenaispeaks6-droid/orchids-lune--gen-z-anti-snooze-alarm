import { colors, layout, radius, spacing, typography } from '@/lib/theme';
import * as React from 'react';
import {
  TextInput,
  View,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { AppText } from './AppText';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
};

const inputStyle: TextStyle = {
  minHeight: layout.controlHeight,
  borderRadius: radius.lg,
  borderWidth: 1,
  borderColor: colors.line,
  backgroundColor: colors.surfaceElevated,
  color: colors.brown,
  paddingHorizontal: spacing.lg,
  fontSize: typography.size.body,
  lineHeight: typography.lineHeight.body,
  fontWeight: typography.weight.medium,
  fontFamily: typography.fontFamily.medium,
};

export function Input({ label, error, containerStyle, style, placeholderTextColor, ...props }: InputProps) {
  return (
    <View style={[{ gap: spacing.sm }, containerStyle]}>
      {label ? <AppText variant="label">{label}</AppText> : null}
      <TextInput
        {...props}
        placeholderTextColor={placeholderTextColor ?? colors.taupe}
        style={[inputStyle, error ? { borderColor: colors.danger } : undefined, style]}
      />
      {error ? (
        <AppText variant="caption" tone="danger">
          {error}
        </AppText>
      ) : null}
    </View>
  );
}
