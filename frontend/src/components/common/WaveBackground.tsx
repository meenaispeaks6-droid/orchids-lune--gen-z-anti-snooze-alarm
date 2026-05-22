import { colors } from '@/src/theme';
import { View, type ViewProps } from 'react-native';

export function WaveBackground({ style, children, ...props }: ViewProps) {
  return (
    <View {...props} style={[{ flex: 1, backgroundColor: colors.background, overflow: 'hidden' }, style]}>
      <View style={{ backgroundColor: colors.surfaceGold, borderRadius: 999, height: 220, left: -90, opacity: 0.18, position: 'absolute', top: 80, width: 220 }} />
      <View style={{ backgroundColor: colors.surfaceLavender, borderRadius: 999, bottom: 120, height: 180, opacity: 0.2, position: 'absolute', right: -70, width: 180 }} />
      {children}
    </View>
  );
}
