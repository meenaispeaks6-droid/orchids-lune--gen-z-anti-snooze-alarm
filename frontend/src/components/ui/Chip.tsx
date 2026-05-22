import { colors, radii, spacing } from '@/src/theme';
import { Pressable, StyleSheet, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { AppText } from './AppText';

type ChipProps = PressableProps & {
  label: string;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Chip({ label, selected = false, style, ...props }: ChipProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.base,
        selected ? styles.selected : styles.unselected,
        pressed ? styles.pressed : null,
        style,
      ]}>
      <AppText variant="caption" tone={selected ? 'inverse' : 'secondary'}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.full,
    borderWidth: 1,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  selected: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  unselected: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.82,
  },
});
