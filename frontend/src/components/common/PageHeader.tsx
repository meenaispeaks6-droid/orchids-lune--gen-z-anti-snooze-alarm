import { colors, spacing } from '@/src/theme';
import { Bell } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { AppText } from '../ui/AppText';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  showNotification?: boolean;
};

export function PageHeader({ eyebrow = 'LUNE', title, subtitle, showNotification = false }: PageHeaderProps) {
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row', gap: spacing[4] }}>
      <View style={{ flex: 1, gap: spacing[1] }}>
        <AppText variant="label" tone="accent">{eyebrow}</AppText>
        <AppText variant="titleSmall">{title}</AppText>
        {subtitle ? <AppText variant="bodySmall" tone="secondary">{subtitle}</AppText> : null}
      </View>
      {showNotification ? (
        <Pressable style={{ alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 999, borderWidth: 1, height: 44, justifyContent: 'center', width: 44 }}>
          <Bell color={colors.text} size={20} />
        </Pressable>
      ) : null}
    </View>
  );
}
