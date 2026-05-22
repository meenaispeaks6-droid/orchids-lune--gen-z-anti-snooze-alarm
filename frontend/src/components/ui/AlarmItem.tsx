import type { Alarm } from '@/src/types/app';
import { formatRepeatDays, sortRepeatDays } from '@/src/utils/formatDate';
import { colors, radii, shadows, spacing } from '@/src/theme';
import { Edit3, Trash2 } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { formatAlarmClock, getMsUntilAlarm, formatCountdown } from '@/src/state/alarmStore';
import { AppText } from './AppText';
import { Card } from './Card';
import { Toggle } from './Toggle';

const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type AlarmItemProps = {
  alarm: Alarm;
  onToggle?: (id: string, enabled: boolean) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function AlarmItem({ alarm, onToggle, onEdit, onDelete }: AlarmItemProps) {
  const countdown = formatCountdown(getMsUntilAlarm(alarm));
  const sortedRepeatDays = sortRepeatDays(alarm.repeatDays);
  return (
    <Card
      elevated={alarm.enabled}
      style={{
        gap: spacing[4],
        opacity: alarm.enabled ? 1 : 0.54,
        borderColor: alarm.enabled ? 'rgba(154, 119, 255, 0.32)' : colors.border,
        backgroundColor: alarm.enabled ? 'rgba(255,255,255,0.9)' : colors.surfaceSoft,
        ...(alarm.enabled ? shadows.glow : {}),
      }}>
      <View style={{ alignItems: 'flex-start', flexDirection: 'row', gap: spacing[3] }}>
        <View style={{ flex: 1, gap: spacing[1] }}>
          <AppText variant="display">{formatAlarmClock(alarm).replace(` ${alarm.period}`, '')}</AppText>
          <AppText variant="label" tone="accent">{alarm.period} • in {countdown}</AppText>
        </View>
        <Toggle value={alarm.enabled} onValueChange={(next) => onToggle?.(alarm.id, next)} />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] }}>
        <Badge label={formatRepeatDays(sortedRepeatDays)} />
        <Badge label={alarm.wakeMode} />
        <Badge label={`${alarm.challengeType} challenge`} active={alarm.challengeType !== 'None'} />
        <Badge label={alarm.sound} />
      </View>

      <View style={{ alignItems: 'center', flexDirection: 'row', gap: spacing[3] }}>
        <View style={{ flex: 1 }}>
          <AppText variant="bodySmall" tone="secondary">{alarm.label}</AppText>
          <View style={{ flexDirection: 'row', gap: spacing[1], marginTop: spacing[2] }}>
            {dayOrder.map((day) => {
              const active = sortedRepeatDays.includes(day);
              return (
                <View key={day} style={{ alignItems: 'center', backgroundColor: active ? colors.primary : colors.surfaceMuted, borderRadius: radii.full, height: 22, justifyContent: 'center', width: 22 }}>
                  <AppText variant="caption" tone={active ? 'inverse' : 'muted'}>{day.slice(0, 1)}</AppText>
                </View>
              );
            })}
          </View>
        </View>
        <Pressable onPress={() => onEdit?.(alarm.id)} style={iconButton}><Edit3 color={colors.primaryDeep} size={18} /></Pressable>
        <Pressable onPress={() => onDelete?.(alarm.id)} style={[iconButton, { backgroundColor: colors.surfacePeach }]}><Trash2 color={colors.coral} size={18} /></Pressable>
      </View>
    </Card>
  );
}

function Badge({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <View style={{ backgroundColor: active ? colors.surfaceLavender : colors.surfaceSoft, borderRadius: radii.full, paddingHorizontal: spacing[3], paddingVertical: spacing[2] }}>
      <AppText variant="caption" tone={active ? 'accent' : 'secondary'}>{label}</AppText>
    </View>
  );
}

const iconButton = {
  alignItems: 'center' as const,
  backgroundColor: colors.surfaceLavender,
  borderRadius: radii.full,
  height: 40,
  justifyContent: 'center' as const,
  width: 40,
};
