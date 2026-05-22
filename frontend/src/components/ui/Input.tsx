import { colors, layout, radii, spacing, typography } from '@/src/theme';
import { TextInput, View, type TextInputProps, type ViewStyle } from 'react-native';
import { AppText } from './AppText';

type InputProps = TextInputProps & {
  label?: string;
  helper?: string;
  error?: string;
  containerStyle?: ViewStyle;
};

export function Input({ label, helper, error, containerStyle, style, placeholderTextColor, ...props }: InputProps) {
  return (
    <View style={[{ gap: spacing[2] }, containerStyle]}>
      {label ? <AppText variant="label">{label}</AppText> : null}
      <TextInput
        {...props}
        placeholderTextColor={placeholderTextColor ?? colors.textMuted}
        style={[
          {
            minHeight: layout.controlHeight,
            borderRadius: radii.lg,
            borderWidth: 1,
            borderColor: error ? colors.coral : colors.border,
            backgroundColor: colors.surface,
            color: colors.text,
            paddingHorizontal: spacing[4],
              fontSize: typography.size.body,
              lineHeight: typography.lineHeight.body,
              fontFamily: typography.family.body,
            },
          style,
        ]}
      />
      {helper ? <AppText variant="caption" tone="muted">{helper}</AppText> : null}
      {error ? <AppText variant="caption" tone="danger">{error}</AppText> : null}
    </View>
  );
}
