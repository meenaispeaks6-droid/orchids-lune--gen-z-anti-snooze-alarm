import { colors, layout, spacing } from '@/src/theme';
import { View } from 'react-native';
import { AppText } from './AppText';
import { Button } from './Button';

type HeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function Header({ title, subtitle, actionLabel, onActionPress }: HeaderProps) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        gap: spacing[4],
        minHeight: layout.controlHeight,
      }}>
      <View style={{ flex: 1, gap: spacing[1] }}>
        <AppText variant="label" tone="accent">
          LUNE
        </AppText>
        <AppText variant="titleSmall" style={{ color: colors.text }}>
          {title}
        </AppText>
        {subtitle ? <AppText variant="bodySmall" tone="secondary">{subtitle}</AppText> : null}
      </View>
      {actionLabel ? (
        <Button variant="secondary" size="sm" onPress={onActionPress}>
          {actionLabel}
        </Button>
      ) : null}
    </View>
  );
}
