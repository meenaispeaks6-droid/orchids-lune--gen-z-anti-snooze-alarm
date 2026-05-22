import { colors, radii, shadows, spacing } from '@/src/theme';
import { View } from 'react-native';
import { AppText } from '../ui/AppText';

type AppLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
};

const sizes = {
  sm: 42,
  md: 64,
  lg: 94,
};

export function AppLogo({ size = 'md', showWordmark = true }: AppLogoProps) {
  const dimension = sizes[size];

  return (
    <View style={{ alignItems: 'center', gap: spacing[3] }}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.surfacePeach,
          borderColor: colors.border,
          borderRadius: radii.full,
          borderWidth: 1,
          height: dimension,
          justifyContent: 'center',
          width: dimension,
          ...shadows.glow,
        }}>
        <View style={{ backgroundColor: colors.primary, borderRadius: radii.full, height: dimension * 0.5, width: dimension * 0.5 }} />
        <View style={{ backgroundColor: colors.surfacePeach, borderRadius: radii.full, height: dimension * 0.38, position: 'absolute', right: dimension * 0.23, top: dimension * 0.16, width: dimension * 0.38 }} />
      </View>
      {showWordmark ? <AppText variant="title" align="center">LUNE</AppText> : null}
    </View>
  );
}
