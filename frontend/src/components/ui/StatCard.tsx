import { colors, radii, spacing } from '@/src/theme';
import { View } from 'react-native';
import { AppText } from './AppText';
import { Card } from './Card';

type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
  accent?: 'peach' | 'sage' | 'lavender' | 'gold';
};

const accentColors = {
  peach: colors.surfacePeach,
  sage: colors.surfaceSage,
  lavender: colors.surfaceLavender,
  gold: colors.surfaceGold,
};

export function StatCard({ label, value, helper, accent = 'peach' }: StatCardProps) {
  return (
    <Card style={{ flex: 1, gap: spacing[2], minWidth: 140 }}>
      <View style={{ backgroundColor: accentColors[accent], borderRadius: radii.full, height: 8, width: 38 }} />
      <AppText variant="titleSmall">{value}</AppText>
      <AppText variant="caption" tone="secondary">{label}</AppText>
      {helper ? <AppText variant="caption" tone="muted">{helper}</AppText> : null}
    </Card>
  );
}
