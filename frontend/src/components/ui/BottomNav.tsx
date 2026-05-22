import { colors, radii, shadows, spacing } from '@/src/theme';
import { BarChart3, Bell, Home, UserRound } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { AppText } from './AppText';

export type TabKey = 'Home' | 'Alarms' | 'Stats' | 'Profile';

type BottomNavProps = {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
  onAddPress?: () => void;
};

const tabs = [
  { key: 'Home' as const, icon: Home },
  { key: 'Alarms' as const, icon: Bell },
  { key: 'Stats' as const, icon: BarChart3 },
  { key: 'Profile' as const, icon: UserRound },
];

export function BottomNav({ activeTab, onTabPress }: BottomNavProps) {
  return (
    <View style={{ paddingHorizontal: spacing[5], paddingTop: spacing[2], paddingBottom: spacing[3] }}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'rgba(255,253,248,0.92)',
          borderColor: colors.border,
          borderRadius: radii.full,
          borderWidth: 1,
          flexDirection: 'row',
          gap: spacing[1],
          justifyContent: 'space-between',
          minHeight: 76,
          paddingHorizontal: spacing[2],
          paddingVertical: spacing[2],
          ...shadows.card,
        }}>
        {tabs.map(({ key, icon: Icon }) => {
          const active = key === activeTab;
          return (
            <Pressable
              key={key}
              onPress={() => onTabPress(key)}
              style={{
                alignItems: 'center',
                backgroundColor: active ? colors.surfaceLavender : 'transparent',
                borderRadius: radii.full,
                flex: 1,
                gap: 3,
                paddingHorizontal: spacing[1],
                paddingVertical: spacing[2],
              }}>
              <Icon color={active ? colors.primaryDeep : colors.textMuted} size={20} strokeWidth={active ? 2.5 : 2} />
              <AppText variant="caption" tone={active ? 'accent' : 'muted'}>{key}</AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
