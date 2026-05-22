import { colors, radius, spacing } from '@/lib/theme';
import * as React from 'react';
import { Pressable, View, type PressableProps } from 'react-native';
import { AppText } from './AppText';

type ToggleProps = Omit<PressableProps, 'children'> & {
  value: boolean;
  onValueChange?: (nextValue: boolean) => void;
  label?: string;
};

export function Toggle({ value, onValueChange, label, disabled, style, ...props }: ToggleProps) {
  return (
    <Pressable
      {...props}
      disabled={disabled ?? false}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled: disabled ?? false }}
      onPress={(event) => {
        props.onPress?.(event);
        onValueChange?.(!value);
      }}
        style={(state) => [
          {
            alignItems: 'center',
            flexDirection: 'row',
            gap: spacing.md,
            opacity: disabled ? 0.5 : state.pressed ? 0.86 : 1,
          },
          typeof style === 'function' ? style(state) : style,
        ]}>
      {label ? <AppText variant="bodySmall">{label}</AppText> : null}
      <View
        style={{
          backgroundColor: value ? colors.amber : colors.beige,
          borderRadius: radius.full,
          height: 32,
          justifyContent: 'center',
          padding: 3,
          width: 56,
        }}>
        <View
          style={{
            alignSelf: value ? 'flex-end' : 'flex-start',
            backgroundColor: colors.white,
            borderRadius: radius.full,
            height: 26,
            width: 26,
          }}
        />
      </View>
    </Pressable>
  );
}
