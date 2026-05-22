import { colors, layout, spacing } from '@/lib/theme';
import * as React from 'react';
import { View, type ViewProps } from 'react-native';
import { AppText } from './AppText';

type HeaderProps = ViewProps & {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

export function Header({ title, subtitle, action, style, ...props }: HeaderProps) {
  return (
    <View
      {...props}
      style={[
        {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          minHeight: layout.headerHeight,
          gap: spacing.lg,
        },
        style,
      ]}>
      <View style={{ flex: 1, gap: spacing.xs }}>
        <AppText variant="label" tone="accent">
          LUNE
        </AppText>
        <AppText variant="titleSmall" style={{ color: colors.brown }}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="bodySmall" tone="secondary">
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {action ? <View>{action}</View> : null}
    </View>
  );
}
