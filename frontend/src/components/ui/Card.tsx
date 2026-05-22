import { colors, radii, shadows, spacing } from '@/src/theme';
import { View, type ViewProps } from 'react-native';

type CardProps = ViewProps & {
  elevated?: boolean;
  tonal?: 'default' | 'muted' | 'accent' | 'sage' | 'lavender';
};

const tonalMap = {
  default: colors.surface,
  muted: colors.surfaceSoft,
  accent: colors.surfacePeach,
  sage: colors.surfaceSage,
  lavender: colors.surfaceLavender,
} as const;

export function Card({ elevated = false, tonal = 'default', style, children, ...props }: CardProps) {
  return (
    <View
      {...props}
      style={[
        {
          borderRadius: radii.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: tonalMap[tonal],
          padding: spacing[4],
        },
        elevated ? shadows.card : shadows.soft,
        style,
      ]}>
      {children}
    </View>
  );
}
