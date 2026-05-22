import { PageHeader, ScreenShell } from '@/src/components/common';
import { AlarmItem, AppText, BottomNav, Button, Card, Chip, SectionHeader } from '@/src/components/ui';
import { challengeTypes, wakeModes } from '@/src/data/options';
import { useAlarmStore } from '@/src/state/alarmStore';
import { colors, radii, spacing } from '@/src/theme';
import { router } from 'expo-router';
import { BellPlus, ShieldCheck, Sparkles } from 'lucide-react-native';
import { View } from 'react-native';

export default function AlarmsScreen() {
  const { sortedAlarms, toggleAlarm, deleteAlarm, previewChallenge } = useAlarmStore();

  return (
    <ScreenShell
      footer={
        <BottomNav
          activeTab="Alarms"
          onAddPress={() => router.push('/alarm/new')}
          onTabPress={(tab) => router.push(tab === 'Home' ? '/home' : tab === 'Alarms' ? '/alarms' : tab === 'Stats' ? '/stats' : '/profile')}
        />
      }>
      <PageHeader title="Your alarms" subtitle="Create, edit, disable, delete, and preview every wake-up mission." />

      <Card tonal="accent" style={{ gap: spacing[4] }}>
        <View style={{ alignItems: 'center', flexDirection: 'row', gap: spacing[3] }}>
          <View style={{ alignItems: 'center', backgroundColor: colors.surface, borderRadius: radii.full, height: 48, justifyContent: 'center', width: 48 }}>
            <ShieldCheck color={colors.primaryDeep} size={24} />
          </View>
          <View style={{ flex: 1, gap: spacing[1] }}>
            <AppText variant="titleSmall">Strict wake protection</AppText>
            <AppText variant="bodySmall" tone="secondary">Alarms open full-screen and challenge dismissals are validated instantly.</AppText>
          </View>
        </View>
        <Button fullWidth onPress={() => router.push('/alarm/new')}><BellPlus color={colors.white} size={18} /> Add alarm</Button>
      </Card>

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
