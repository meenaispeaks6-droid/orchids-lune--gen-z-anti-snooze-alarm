import { AppText, Button, Card, Chip, Input, SectionHeader, Toggle } from '@/src/components/ui';
import { alarmSounds, challengeTypes, repeatDays, wakeModes } from '@/src/data/options';
import { useAlarmStore, type AlarmDraft } from '@/src/state/alarmStore';
import { sortRepeatDays } from '@/src/utils/formatDate';
import { colors, radii, spacing, shadows } from '@/src/theme';
import type { Alarm, AlarmChallengeType, AlarmSound, WakeMode } from '@/src/types/app';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, BellRing, Check, Music2, Sparkles } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

const itemHeight = 42;
const wheelPadding = itemHeight;
const hours = Array.from({ length: 12 }, (_, index) => index + 1);
const minutes = Array.from({ length: 60 }, (_, index) => index);
const periods = ['AM', 'PM'] as const;

type WheelPickerProps<T extends string | number> = {
  label: string;
  values: readonly T[];
  value: T;
  format?: (value: T) => string;
  onChange: (value: T) => void;
};

function WheelPicker<T extends string | number>({ label, values, value, format = String, onChange }: WheelPickerProps<T>) {
  const selectedIndex = Math.max(0, values.findIndex((item) => item === value));
  const scrollOffset = selectedIndex * itemHeight;

  const selectIndex = (index: number) => {
    const nextIndex = Math.min(values.length - 1, Math.max(0, index));
    const nextValue = values[nextIndex];
    onChange(nextValue);
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    selectIndex(Math.round(event.nativeEvent.contentOffset.y / itemHeight));
  };

  return (
    <View style={styles.wheelColumn}>
      <AppText variant="caption" tone="muted" style={styles.wheelLabel}>{label}</AppText>
      <View style={styles.wheelFrame}>
        <View pointerEvents="none" style={styles.wheelHighlight} />
        <View pointerEvents="none" style={styles.wheelFadeTop} />
        <View pointerEvents="none" style={styles.wheelFadeBottom} />
        <ScrollView
          bounces={false}
          decelerationRate="fast"
          nestedScrollEnabled
          onMomentumScrollEnd={handleScrollEnd}
          onScrollEndDrag={handleScrollEnd}
          overScrollMode="never"
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          snapToAlignment="start"
          snapToInterval={itemHeight}
          contentOffset={{ y: scrollOffset, x: 0 }}
          contentContainerStyle={{ paddingVertical: wheelPadding }}>
          {values.map((item, index) => {
            const distance = Math.abs(index - selectedIndex);
            const active = distance === 0;
            return (
              <Pressable key={String(item)} onPress={() => selectIndex(index)} style={styles.wheelItem}>
                <AppText
                  variant="titleSmall"
                  tone={active ? 'default' : distance === 1 ? 'secondary' : 'muted'}
                  style={[styles.wheelNumber, active ? styles.wheelNumberActive : distance === 1 ? styles.wheelNumberNear : styles.wheelNumberFar]}>
                  {format(item)}
                </AppText>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

function OptionGrid<T extends string>({ items, selected, onSelect }: { items: readonly T[]; selected: T; onSelect: (value: T) => void }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] }}>
      {items.map((item) => <Chip key={item} label={item} selected={item === selected} onPress={() => onSelect(item)} />)}
    </View>
  );
}

function RepeatSelector({ selected, onToggle }: { selected: string[]; onToggle: (day: string) => void }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] }}>
      {repeatDays.map((day) => {
        const active = selected.includes(day);
        return (
          <Pressable
            key={day}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onToggle(day)}
            style={({ pressed }) => [styles.dayButton, active ? styles.dayButtonActive : null, pressed ? { transform: [{ scale: 0.95 }] } : null]}>
            <AppText variant="caption" tone={active ? 'inverse' : 'secondary'}>{day.slice(0, 3)}</AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

function draftFromAlarm(alarm?: Alarm): AlarmDraft {
  return {
    id: alarm?.id,
    hour: alarm?.hour ?? 7,
    minute: alarm?.minute ?? 30,
    period: alarm?.period ?? 'AM',
    label: alarm?.label ?? 'Morning reset',
    enabled: alarm?.enabled ?? true,
    repeatDays: sortRepeatDays(alarm?.repeatDays ?? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']),
    wakeMode: alarm?.wakeMode ?? 'Focus',
    challengeType: alarm?.challengeType ?? 'Math',
    sound: alarm?.sound ?? 'Warm chime',
    vibration: alarm?.vibration ?? true,
    snooze: alarm?.snooze ?? true,
  };
}

export default function NewAlarmScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const { getAlarm, saveAlarm, deleteAlarm, previewChallenge } = useAlarmStore();
  const existing = params.id ? getAlarm(params.id) : undefined;
  const [draft, setDraft] = useState<AlarmDraft>(() => draftFromAlarm(existing));
  const isEditing = Boolean(existing);

  useEffect(() => {
    setDraft(draftFromAlarm(existing));
  }, [existing]);

  const timePreview = useMemo(() => `${String(draft.hour).padStart(2, '0')}:${String(draft.minute).padStart(2, '0')} ${draft.period}`, [draft.hour, draft.minute, draft.period]);
  const setField = <K extends keyof AlarmDraft>(key: K, value: AlarmDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));

  const toggleRepeatDay = (day: string) => {
    setDraft((current) => {
      const repeatDays = current.repeatDays.includes(day)
        ? current.repeatDays.filter((item) => item !== day)
        : [...current.repeatDays, day];
      return { ...current, repeatDays: sortRepeatDays(repeatDays) };
    });
  };

  const handleSave = () => {
    saveAlarm(draft);
    router.push('/alarms');
  };

  const handleDelete = () => {
    if (!draft.id) return;
    deleteAlarm(draft.id);
    router.push('/alarms');
  };

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.roundIcon}><ArrowLeft color={colors.text} size={20} /></Pressable>
          <View style={{ flex: 1 }}>
            <AppText variant="label" tone="accent">{isEditing ? 'Edit Alarm' : 'Create Alarm'}</AppText>
            <AppText variant="title">Premium wake setup</AppText>
          </View>
          <View style={styles.roundIcon}><BellRing color={colors.primaryDeep} size={20} /></View>
        </View>

          <Card elevated tonal="lavender" style={styles.timeCard}>
            <View pointerEvents="none" style={styles.glowBlob} />
            <View style={styles.timeHeaderRow}>
              <View>
                <AppText variant="label" tone="accent">Set time</AppText>
                <AppText variant="display" style={styles.timePreview}>{timePreview}</AppText>
              </View>
              <View style={styles.miniAlarmBadge}>
                <BellRing color={colors.primaryDeep} size={18} />
              </View>
            </View>
            <View style={styles.pickerShell}>
              <View style={styles.wheelRow}>
                <WheelPicker label="Hour" values={hours} value={draft.hour} format={(item) => String(item).padStart(2, '0')} onChange={(value) => setField('hour', value)} />
                <AppText variant="title" tone="muted" style={styles.timeColon}>:</AppText>
                <WheelPicker label="Min" values={minutes} value={draft.minute} format={(item) => String(item).padStart(2, '0')} onChange={(value) => setField('minute', value)} />
                <WheelPicker label="" values={periods} value={draft.period} onChange={(value) => setField('period', value)} />
              </View>
            </View>
            <AppText variant="caption" tone="secondary" align="center">Swipe up/down on numbers to set alarm time</AppText>
          </Card>

        <Input label="Custom alarm label" value={draft.label} onChangeText={(value) => setField('label', value)} placeholder="Name this alarm" />

        <View style={{ gap: spacing[3] }}>
          <SectionHeader eyebrow="Repeat" title="Repeat days" />
          <RepeatSelector selected={draft.repeatDays} onToggle={toggleRepeatDay} />
        </View>

        <View style={{ gap: spacing[3] }}>
          <SectionHeader eyebrow="Vibe" title="Wake-up vibe" />
          <OptionGrid items={wakeModes} selected={draft.wakeMode} onSelect={(value: WakeMode) => setField('wakeMode', value)} />
        </View>

        <View style={{ gap: spacing[3] }}>
          <SectionHeader eyebrow="Dismiss" title="Challenge type" />
          <OptionGrid items={challengeTypes} selected={draft.challengeType} onSelect={(value: AlarmChallengeType) => setField('challengeType', value)} />
          <Button variant="secondary" fullWidth onPress={() => previewChallenge(draft)}>Start Challenge Preview</Button>
        </View>

        <View style={{ gap: spacing[3] }}>
          <SectionHeader eyebrow="Sound" title="Alarm sound/vibe" />
          <OptionGrid items={alarmSounds} selected={draft.sound} onSelect={(value: AlarmSound) => setField('sound', value)} />
        </View>

        <Card style={{ gap: spacing[4] }}>
          <View style={styles.settingRow}>
            <View style={styles.settingIcon}><Sparkles color={colors.primaryDeep} size={20} /></View>
            <View style={{ flex: 1 }}>
              <AppText variant="bodyLarge">Vibration</AppText>
              <AppText variant="caption" tone="secondary">Adds a tactile wake-up pulse.</AppText>
            </View>
            <Toggle value={draft.vibration} onValueChange={(value) => setField('vibration', value)} />
          </View>
          <View style={styles.settingRow}>
            <View style={styles.settingIcon}><Music2 color={colors.primaryDeep} size={20} /></View>
            <View style={{ flex: 1 }}>
              <AppText variant="bodyLarge">Snooze</AppText>
              <AppText variant="caption" tone="secondary">Allow one 5-minute snooze after challenge.</AppText>
            </View>
            <Toggle value={draft.snooze} onValueChange={(value) => setField('snooze', value)} />
          </View>
        </Card>

        <View style={{ gap: spacing[3] }}>
          <Button fullWidth size="lg" onPress={handleSave}><Check color={colors.white} size={18} /> Save Alarm</Button>
          {isEditing ? <Button fullWidth variant="secondary" onPress={handleDelete}>Delete Alarm</Button> : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    gap: spacing[5],
    maxWidth: 460,
    padding: spacing[5],
    paddingBottom: spacing[12],
    width: '100%',
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[3],
    paddingTop: spacing[4],
  },
  roundIcon: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.full,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
    ...shadows.soft,
  },
    glowBlob: {
      backgroundColor: 'rgba(166, 126, 255, 0.2)',
      borderRadius: radii.full,
      height: 170,
      position: 'absolute',
      right: -40,
      top: -40,
      width: 170,
    },
    timeCard: {
      gap: spacing[3],
      overflow: 'hidden',
      padding: spacing[4],
    },
    timeHeaderRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    timePreview: {
      fontSize: 38,
      lineHeight: 44,
    },
    miniAlarmBadge: {
      alignItems: 'center',
      backgroundColor: 'rgba(255, 253, 248, 0.78)',
      borderColor: colors.border,
      borderRadius: radii.full,
      borderWidth: 1,
      height: 42,
      justifyContent: 'center',
      width: 42,
      ...shadows.soft,
    },
    pickerShell: {
      backgroundColor: 'rgba(255, 253, 248, 0.7)',
      borderColor: 'rgba(255, 255, 255, 0.82)',
      borderRadius: radii.xxl,
      borderWidth: 1,
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[2],
    },
    wheelRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing[1],
    },
    timeColon: {
      marginTop: spacing[3],
      opacity: 0.42,
    },
    wheelColumn: {
      flex: 1,
      gap: spacing[1],
    },
    wheelLabel: {
      minHeight: 16,
      textAlign: 'center',
    },
    wheelFrame: {
      backgroundColor: 'rgba(255,255,255,0.5)',
      borderColor: 'rgba(234, 216, 194, 0.72)',
      borderRadius: radii.xl,
      borderWidth: 1,
      height: itemHeight * 3,
      overflow: 'hidden',
    },
    wheelHighlight: {
      backgroundColor: colors.white,
      borderColor: 'rgba(217, 143, 95, 0.54)',
      borderRadius: radii.lg,
      borderWidth: 1,
      height: itemHeight,
      left: 5,
      position: 'absolute',
      right: 5,
      top: itemHeight,
      ...shadows.soft,
    },
    wheelFadeTop: {
      backgroundColor: 'rgba(255, 248, 238, 0.58)',
      height: itemHeight,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
    },
    wheelFadeBottom: {
      backgroundColor: 'rgba(255, 248, 238, 0.58)',
      bottom: 0,
      height: itemHeight,
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: 1,
    },
    wheelItem: {
      alignItems: 'center',
      height: itemHeight,
      justifyContent: 'center',
    },
    wheelNumber: {
      fontSize: 22,
      lineHeight: 28,
      textAlign: 'center',
    },
    wheelNumberActive: {
      opacity: 1,
      transform: [{ scale: 1.08 }],
    },
  wheelNumberNear: {
    opacity: 0.48,
    transform: [{ scale: 0.92 }],
  },
  wheelNumberFar: {
    opacity: 0.22,
    transform: [{ scale: 0.84 }],
  },
  dayButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
    borderRadius: radii.full,
    borderWidth: 1,
    flex: 1,
    height: 42,
    justifyContent: 'center',
    minWidth: 52,
  },
  dayButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    ...shadows.glow,
  },
  settingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[3],
  },
  settingIcon: {
    alignItems: 'center',
    backgroundColor: colors.surfaceLavender,
    borderRadius: radii.full,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
});
