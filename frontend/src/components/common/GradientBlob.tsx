import { colors, radii } from '@/src/theme';
import { View } from 'react-native';

type GradientBlobProps = {
  tone?: 'peach' | 'sage' | 'lavender' | 'gold';
  size?: number;
};

const toneColors = {
  peach: colors.surfacePeach,
  sage: colors.surfaceSage,
  lavender: colors.surfaceLavender,
  gold: colors.surfaceGold,
};

export function GradientBlob({ tone = 'peach', size = 160 }: GradientBlobProps) {
  return (
    <View
      pointerEvents="none"
      style={{
        backgroundColor: toneColors[tone],
        borderRadius: radii.full,
        height: size,
        opacity: 0.45,
        position: 'absolute',
        right: -size * 0.25,
        top: -size * 0.35,
        width: size,
      }}
    />
  );
}
