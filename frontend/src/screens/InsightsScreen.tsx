import { PageHeader, ScreenShell } from '@/src/components/common';
import { AppText, BottomNav, Card, SectionHeader, StatCard } from '@/src/components/ui';
import { consistencyPoints, insightMetrics, sleepTrendPoints } from '@/src/data/mockInsights';
import { colors, radii, spacing } from '@/src/theme';
import { router } from 'expo-router';
import { View } from 'react-native';

const navigateTab = (tab: 'Home' | 'Alarms' | 'Stats' | 'Settings') => {
  router.push(tab === 'Home' ? '/home' : tab === 'Alarms' ? '/alarms' : tab === 'Stats' ? '/stats' : '/profile');
};

export default function InsightsScreen() {
  return (
    <ScreenShell
      footer={
        <BottomNav
          activeTab="Stats"
          onTabPress={navigateTab}
        />
      }>
      <PageHeader title="Sleep insights" subtitle="A quiet view into what improves your mornings." />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3] }}>
        {insightMetrics.map((metric, index) => (
          <StatCard key={metric.label} {...metric} accent={index === 0 ? 'peach' : index === 1 ? 'sage' : index === 2 ? 'lavender' : 'gold'} />
        ))}
      </View>

      <Card style={{ gap: spacing[4] }}>
        <SectionHeader eyebrow="Weekly" title="Consistency trend" />
        <View style={{ alignItems: 'flex-end', flexDirection: 'row', gap: spacing[2], height: 120 }}>
          {consistencyPoints.map((point, index) => (
            <View key={`${point.label}-${index}`} style={{ alignItems: 'center', flex: 1, gap: spacing[2], justifyContent: 'flex-end' }}>
              <View style={{ backgroundColor: colors.surfaceMuted, borderRadius: radii.full, height: 104, justifyContent: 'flex-end', overflow: 'hidden', width: '100%' }}>
                <View style={{ backgroundColor: colors.secondary, borderRadius: radii.full, height: `${Math.min(100, Math.max(8, point.value))}%`, width: '100%' }} />
              </View>
              <AppText variant="caption" tone="muted">{point.label}</AppText>
            </View>
          ))}
        </View>
      </Card>

      <Card tonal="sage" style={{ gap: spacing[3] }}>
        <SectionHeader eyebrow="Last night" title="Sleep window" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3] }}>
          {sleepTrendPoints.map((point, index) => (
            <View key={`${point.label}-${index}`} style={{ alignItems: 'center', gap: spacing[2], minWidth: 64 }}>
              <View style={{ alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.full, borderWidth: 1, height: 46, justifyContent: 'center', width: 46 }}>
                <AppText variant="caption">{point.value}</AppText>
              </View>
              <AppText variant="caption" tone="secondary">{point.label}</AppText>
            </View>
          ))}
        </View>
      </Card>
    </ScreenShell>
  );
}
