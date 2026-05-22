import { colors, radii, spacing } from '@/src/theme';
import { Pressable, StyleSheet, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { AppText } from './AppText';

type ToggleProps = Omit<PressableProps, 'children'> & {
  value: boolean;
  label?: string;
  onValueChange?: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export function Toggle({ value, label, onValueChange, disabled, style, ...props }: ToggleProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onValueChange?.(!value)}
      style={({ pressed }) => [
        styles.base,
        disabled ? styles.disabled : null,
        pressed && !disabled ? styles.pressed : null,
        style,
      ]}>
      {label ? <AppText variant="bodySmall">{label}</AppText> : null}
      <View style={[styles.track, value ? styles.trackActive : styles.trackInactive]}>
        <View style={[styles.thumb, value ? styles.thumbActive : styles.thumbInactive]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[3],
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.86,
  },
  track: {
    borderRadius: radii.full,
    height: 32,
    justifyContent: 'center',
    padding: 3,
    width: 58,
  },
  trackActive: {
    backgroundColor: colors.primary,
  },
  trackInactive: {
    backgroundColor: colors.surfaceMuted,
  },
  thumb: {
    backgroundColor: colors.white,
    borderRadius: radii.full,
    height: 26,
    width: 26,
  },
  thumbActive: {
    alignSelf: 'flex-end',
  },
  thumbInactive: {
    alignSelf: 'flex-start',
  },
});
