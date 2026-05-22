import { PageHeader, ScreenShell } from '@/src/components/common';
import { AlarmItem, AppText, BottomNav, Button, Card, Chip, SectionHeader } from '@/src/components/ui';
import { challengeTypes, wakeModes } from '@/src/data/options';
import { formatAlarmClock, formatCountdown, getMsUntilAlarm, useAlarmStore } from '@/src/state/alarmStore';
import { colors, radii, shadows, spacing } from '@/src/theme';
import { formatRepeatDays } from '@/src/utils/formatDate';
import { router } from 'expo-router';
import { BellPlus, CalendarDays, Clock3, Moon, Music2, ShieldCheck, Sparkles, Target, TimerReset, Vibrate } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import type { ReactNode } from 'react';

function MiniStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <View style={styles.miniStat}>
      <View style={styles.miniStatIcon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <AppText variant="caption" tone="secondary">{label}</AppText>
        <AppText variant="bodySmall" style={styles.miniStatValue}>{value}</AppText>
      </View>
    </View>
  );
}

function FeatureTile({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle: string }) {
  return (
    <Card tonal="muted" style={styles.featureTile}>
      <View style={styles.featureIcon}>{icon}</View>
      <AppText variant="bodySmall" style={styles.featureTitle}>{title}</AppText>
      <AppText variant="caption" tone="secondary" style={styles.featureSubtitle}>{subtitle}</AppText>
    </Card>
  );
}

export default function AlarmsScreen() {
  const { sortedAlarms, nextAlarm, toggleAlarm, deleteAlarm, previewChallenge } = useAlarmStore();
  const activeAlarms = sortedAlarms.filter((alarm) => alarm.enabled);
  const nextCountdown = nextAlarm ? formatCountdown(getMsUntilAlarm(nextAlarm)) : 'No active alarm';
  const nextRepeat = nextAlarm ? formatRepeatDays(nextAlarm.repeatDays) : 'Create one to start';

  return (
    <ScreenShell
      footer={
        <BottomNav
          activeTab="Alarms"
          onTabPress={(tab) => router.push(tab === 'Home' ? '/home' : tab === 'Alarms' ? '/alarms' : tab === 'Stats' ? '/stats' : '/profile')}
        />
      }>
      <PageHeader title="Your alarms" subtitle="Create, edit, disable, delete, and preview every wake-up mission." />

      <Card tonal="accent" style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroIconWrap}>
              <ShieldCheck color={colors.primaryDeep} size={24} />
            </View>
            <View style={{ flex: 1, gap: spacing[1] }}>
              <AppText variant="titleSmall">Strict wake protection</AppText>
              <AppText variant="bodySmall" tone="secondary">Alarms open full-screen and challenge dismissals are validated instantly.</AppText>
            </View>
          </View>
          <View style={styles.heroStatsRow}>
            <MiniStat icon={<Clock3 color={colors.primaryDeep} size={16} />} label="Next alarm" value={nextAlarm ? formatAlarmClock(nextAlarm) : '--:--'} />
            <MiniStat icon={<TimerReset color={colors.primaryDeep} size={16} />} label="Countdown" value={nextCountdown} />
          </View>
          <Button fullWidth onPress={() => router.push('/alarm/new')}><BellPlus color={colors.white} size={18} /> Add alarm</Button>
        </Card>

        <Card style={styles.scheduleCard}>
          <View style={styles.scheduleHeader}>
            <View>
              <AppText variant="label" tone="accent">Next wake-up</AppText>
              <AppText variant="title">{nextAlarm ? formatAlarmClock(nextAlarm) : 'No active alarm'}</AppText>
            </View>
            <View style={styles.scheduleBadge}>
              <CalendarDays color={colors.primaryDeep} size={18} />
            </View>
          </View>
          <AppText variant="bodySmall" tone="secondary">{nextRepeat}</AppText>
          <View style={styles.progressRail}>
            <View style={[styles.progressFill, { width: nextAlarm ? '72%' : '18%' }]} />
          </View>
          <View style={styles.scheduleMetaRow}>
            <View style={styles.metaPill}><Moon color={colors.primaryDeep} size={14} /><AppText variant="caption" tone="accent">{activeAlarms.length} active</AppText></View>
            <View style={styles.metaPill}><Vibrate color={colors.primaryDeep} size={14} /><AppText variant="caption" tone="accent">{nextAlarm?.vibration ? 'Vibrate on' : 'Vibrate off'}</AppText></View>
            <View style={styles.metaPill}><Music2 color={colors.primaryDeep} size={14} /><AppText variant="caption" tone="accent">{nextAlarm?.sound ?? 'Warm chime'}</AppText></View>
          </View>
        </Card>

        <View style={{ gap: spacing[3] }}>
          <SectionHeader eyebrow="Quick setup" title="Alarm controls" />
          <View style={styles.controlGrid}>
            <FeatureTile icon={<Clock3 color={colors.primaryDeep} size={18} />} title="Time" subtitle="Wheel picker" />
            <FeatureTile icon={<CalendarDays color={colors.primaryDeep} size={18} />} title="Repeat" subtitle="Daily schedule" />
            <FeatureTile icon={<Target color={colors.primaryDeep} size={18} />} title="Challenge" subtitle="Math / meme" />
            <FeatureTile icon={<Music2 color={colors.primaryDeep} size={18} />} title="Sound" subtitle="Alarm tone" />
          </View>
        </View>

        <View style={{ gap: spacing[3] }}>
          <SectionHeader eyebrow="Modes" title="Wake modes" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] }}>
          {wakeModes.map((mode, index) => <Chip key={mode} label={mode} selected={index === 1} onPress={() => router.push('/alarm/new')} />)}
        </View>
      </View>

      <View style={{ gap: spacing[3] }}>
        <SectionHeader eyebrow="Dismiss" title="Challenge library" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] }}>
          {challengeTypes.map((mission, index) => <Chip key={mission} label={mission} selected={index < 2} onPress={() => sortedAlarms[0] ? previewChallenge({ ...sortedAlarms[0], challengeType: mission }) : router.push('/alarm/new')} />)}
        </View>
      </View>

      <View style={{ gap: spacing[3] }}>
        <SectionHeader eyebrow="Schedule" title="Saved alarms" actionLabel="Create" onActionPress={() => router.push('/alarm/new')} />
        {sortedAlarms.length ? sortedAlarms.map((alarm) => (
          <AlarmItem
            key={alarm.id}
            alarm={alarm}
            onToggle={toggleAlarm}
            onDelete={deleteAlarm}
            onEdit={(id) => router.push({ pathname: '/alarm/[id]', params: { id } })}
          />
        )) : (
          <Card style={{ alignItems: 'center', gap: spacing[3], padding: spacing[8] }}>
            <Sparkles color={colors.primaryDeep} size={32} />
            <AppText variant="titleSmall">No alarms yet</AppText>
            <AppText variant="bodySmall" tone="secondary" style={{ textAlign: 'center' }}>Create your first premium alarm with a wheel picker and a challenge.</AppText>
            <Button onPress={() => router.push('/alarm/new')}>Create Alarm</Button>
          </Card>
        )}
      </View>
      </ScreenShell>
    );
  }

const styles = StyleSheet.create({
  heroCard: {
    gap: spacing[4],
    overflow: 'hidden',
  },
  heroTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[3],
  },
  heroIconWrap: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.full,
    height: 48,
    justifyContent: 'center',
    width: 48,
    ...shadows.soft,
  },
  heroStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  miniStat: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 253, 248, 0.66)',
    borderColor: 'rgba(255,255,255,0.8)',
    borderRadius: radii.lg,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: spacing[2],
    minWidth: 150,
    padding: spacing[3],
  },
  miniStatIcon: {
    alignItems: 'center',
    backgroundColor: colors.surfaceGold,
    borderRadius: radii.full,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  miniStatValue: {
    fontWeight: '800',
  },
  scheduleCard: {
    gap: spacing[3],
    backgroundColor: colors.surface,
    borderColor: 'rgba(160, 139, 184, 0.3)',
  },
  scheduleHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleBadge: {
    alignItems: 'center',
    backgroundColor: colors.surfaceLavender,
    borderRadius: radii.full,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  progressRail: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.full,
    height: 10,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: colors.primary,
    borderRadius: radii.full,
    height: '100%',
  },
  scheduleMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  metaPill: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    borderRadius: radii.full,
    flexDirection: 'row',
    gap: spacing[1],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  controlGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  featureTile: {
    alignItems: 'center',
    flexBasis: '48%',
    flexGrow: 1,
    gap: spacing[1],
    minWidth: 135,
    padding: spacing[3],
  },
  featureIcon: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.full,
    height: 38,
    justifyContent: 'center',
    marginBottom: spacing[1],
    width: 38,
  },
  featureTitle: {
    fontWeight: '800',
    textAlign: 'center',
  },
  featureSubtitle: {
    textAlign: 'center',
  },
});
