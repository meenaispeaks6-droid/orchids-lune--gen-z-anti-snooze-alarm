import { spacing } from '@/src/theme';
import { View } from 'react-native';
import { AppText } from './AppText';
import { Button } from './Button';

type SectionHeaderProps = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SectionHeader({ title, eyebrow, subtitle, actionLabel, onActionPress }: SectionHeaderProps) {
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row', gap: spacing[3] }}>
      <View style={{ flex: 1, gap: spacing[1] }}>
        {eyebrow ? <AppText variant="label" tone="accent">{eyebrow}</AppText> : null}
        <AppText variant="titleSmall">{title}</AppText>
        {subtitle ? <AppText variant="bodySmall" tone="secondary">{subtitle}</AppText> : null}
      </View>
      {actionLabel ? <Button size="sm" variant="ghost" onPress={onActionPress}>{actionLabel}</Button> : null}
    </View>
  );
}
