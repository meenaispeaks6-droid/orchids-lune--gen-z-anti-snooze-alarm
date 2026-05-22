import { layout, spacing } from '@/src/theme';
import { Slot } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WaveBackground } from './WaveBackground';

type ScreenShellProps = {
  children?: React.ReactNode;
  footer?: React.ReactNode;
  scroll?: boolean;
  bottomInset?: number;
};

const contentStyle = {
  alignSelf: 'center' as const,
  gap: layout.sectionGap,
  maxWidth: layout.maxWidth,
  paddingHorizontal: layout.screenPadding,
  paddingTop: spacing[5],
  width: '100%' as const,
};

export function ScreenShell({ children, footer, scroll = true, bottomInset = spacing[20] }: ScreenShellProps) {
  const contentBottomPadding = footer ? bottomInset : spacing[8];

  return (
    <WaveBackground>
      <SafeAreaView style={{ flex: 1 }}>
        {scroll ? (
          <ScrollView contentContainerStyle={[contentStyle, { paddingBottom: contentBottomPadding }]} showsVerticalScrollIndicator={false}>
            {children ?? <Slot />}
          </ScrollView>
        ) : (
          <View style={[contentStyle, { flex: 1, paddingBottom: contentBottomPadding }]}>{children ?? <Slot />}</View>
        )}
        {footer ? <View style={{ alignSelf: 'center', maxWidth: layout.maxWidth, width: '100%' }}>{footer}</View> : null}
      </SafeAreaView>
    </WaveBackground>
  );
}
