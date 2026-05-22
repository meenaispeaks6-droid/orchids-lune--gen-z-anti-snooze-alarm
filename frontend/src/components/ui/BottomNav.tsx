import { colors, radii, shadows, spacing } from '@/src/theme';
import { BarChart3, Bell, Home, UserRound } from 'lucide-react-native';
import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Pressable, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { AppText } from './AppText';

export type TabKey = 'Home' | 'Alarms' | 'Stats' | 'Profile';

type BottomNavProps = {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
  onAddPress?: () => void;
};

const tabs = [
  { key: 'Home' as const, label: 'Home', icon: Home },
  { key: 'Alarms' as const, label: 'Alarm', icon: Bell },
  { key: 'Stats' as const, label: 'Stats', icon: BarChart3 },
  { key: 'Profile' as const, label: 'Profile', icon: UserRound },
];

const activeIndexByTab: Record<TabKey, number> = {
  Home: 0,
  Alarms: 1,
  Stats: 2,
  Profile: 3,
};

function GlassSparkles() {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer]);

  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.9] });
  const translateX = shimmer.interpolate({ inputRange: [0, 1], outputRange: [-8, 8] });

  return (
    <Animated.View pointerEvents="none" style={{ ...StyleSheetAbsoluteFill, opacity, transform: [{ translateX }] }}>
      <View style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: radii.full, height: 4, left: 54, position: 'absolute', top: 16, width: 4 }} />
      <View style={{ backgroundColor: 'rgba(255,221,167,0.9)', borderRadius: radii.full, height: 5, position: 'absolute', right: 76, top: 11, width: 5 }} />
      <View style={{ backgroundColor: 'rgba(218,196,255,0.95)', borderRadius: radii.full, bottom: 18, height: 3, position: 'absolute', right: 34, width: 3 }} />
    </Animated.View>
  );
}

function LiquidGlow({ progress }: { progress: Animated.Value }) {
  const translateX = progress.interpolate({ inputRange: [0, 1, 2, 3], outputRange: ['0%', '100%', '200%', '300%'] });

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        bottom: spacing[2],
        left: spacing[2],
        position: 'absolute',
        top: spacing[2],
        transform: [{ translateX }],
        width: '25%',
      }}>
      <View
        style={{
          backgroundColor: 'rgba(174, 139, 219, 0.2)',
          borderRadius: radii.full,
          bottom: -6,
          left: -4,
          position: 'absolute',
          right: -4,
          top: -6,
          ...shadows.glow,
        }}
      />
      <Svg height="100%" viewBox="0 0 82 58" width="100%">
        <Defs>
          <LinearGradient id="activeGlass" x1="0" x2="1" y1="0" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.88" />
            <Stop offset="0.44" stopColor="#E8D7FF" stopOpacity="0.82" />
            <Stop offset="1" stopColor="#C9A8F4" stopOpacity="0.72" />
          </LinearGradient>
          <LinearGradient id="activeShine" x1="0" x2="1" y1="0" y2="0">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <Stop offset="0.48" stopColor="#FFFFFF" stopOpacity="0.7" />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Path d="M22 4 H60 C72 4 80 14 78 27 C76 42 66 54 48 54 H25 C12 54 4 45 5 31 C6 16 12 4 22 4 Z" fill="url(#activeGlass)" />
        <Path d="M24 9 H58 C67 9 73 14 73 21" fill="none" stroke="rgba(255,255,255,0.86)" strokeLinecap="round" strokeWidth="3" />
        <Circle cx="65" cy="42" fill="rgba(255,255,255,0.62)" r="3" />
        <Path d="M12 18 C26 8 43 9 58 15" fill="none" stroke="url(#activeShine)" strokeLinecap="round" strokeWidth="5" />
      </Svg>
    </Animated.View>
  );
}

function NavTab({ active, icon: Icon, label, onPress }: { active: boolean; icon: typeof Home; label: string; onPress: () => void }) {
  const scale = useRef(new Animated.Value(active ? 1 : 0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const ripple = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: active ? 1 : 0,
      damping: 14,
      mass: 0.8,
      stiffness: 180,
      useNativeDriver: true,
    }).start();
  }, [active, scale]);

  const handlePress = () => {
    ripple.setValue(0);
    Animated.parallel([
      Animated.sequence([
        Animated.spring(pressScale, { toValue: 0.9, damping: 12, stiffness: 260, useNativeDriver: true }),
        Animated.spring(pressScale, { toValue: 1, damping: 10, stiffness: 220, useNativeDriver: true }),
      ]),
      Animated.timing(ripple, { toValue: 1, duration: 520, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start();
    onPress();
  };

  const activeLift = scale.interpolate({ inputRange: [0, 1], outputRange: [0, -3] });
  const iconScale = scale.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });
  const labelOpacity = scale.interpolate({ inputRange: [0, 1], outputRange: [0.55, 1] });
  const rippleOpacity = ripple.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] });
  const rippleScale = ripple.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1.45] });

  return (
    <Pressable onPress={handlePress} style={{ flex: 1 }}>
      <Animated.View
        style={{
          alignItems: 'center',
          borderRadius: radii.full,
          gap: 2,
          height: 58,
          justifyContent: 'center',
          transform: [{ scale: pressScale }, { translateY: activeLift }],
        }}>
        <Animated.View
          pointerEvents="none"
          style={{
            backgroundColor: 'rgba(169, 124, 220, 0.28)',
            borderRadius: radii.full,
            height: 46,
            opacity: rippleOpacity,
            position: 'absolute',
            transform: [{ scale: rippleScale }],
            width: 46,
          }}
        />
        <Animated.View
          style={{
            alignItems: 'center',
            backgroundColor: active ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.12)',
            borderColor: active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.18)',
            borderRadius: radii.full,
            borderWidth: 1,
            height: 31,
            justifyContent: 'center',
            transform: [{ scale: iconScale }],
            width: 31,
          }}>
          <Icon color={active ? '#7A4CB0' : 'rgba(78, 61, 50, 0.5)'} fill={active ? 'rgba(255,255,255,0.32)' : 'transparent'} size={18} strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.6 : 2.15} />
        </Animated.View>
        <Animated.View style={{ opacity: labelOpacity }}>
          <AppText variant="caption" style={{ color: active ? '#6F46A3' : 'rgba(93,75,64,0.56)', fontSize: 11, fontWeight: active ? '800' : '700', letterSpacing: 0.15 }}>
            {label}
          </AppText>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const StyleSheetAbsoluteFill = {
  bottom: 0,
  left: 0,
  position: 'absolute' as const,
  right: 0,
  top: 0,
};

export function BottomNav({ activeTab, onTabPress }: BottomNavProps) {
  const progress = useRef(new Animated.Value(activeIndexByTab[activeTab])).current;

  useEffect(() => {
    Animated.spring(progress, {
      toValue: activeIndexByTab[activeTab],
      damping: 18,
      mass: 0.8,
      stiffness: 160,
      useNativeDriver: true,
    }).start();
  }, [activeTab, progress]);

  const navItems = useMemo(() => tabs, []);

  return (
    <View style={{ paddingBottom: spacing[3], paddingHorizontal: spacing[5], paddingTop: spacing[2] }}>
      <View
        style={{
          backgroundColor: 'rgba(142, 105, 170, 0.13)',
          borderRadius: radii.full,
          height: 86,
          left: spacing[7],
          opacity: 0.55,
          position: 'absolute',
          right: spacing[7],
          top: spacing[5],
          transform: [{ scaleX: 0.96 }],
          ...shadows.glow,
        }}
      />
      <View
        style={{
          backgroundColor: 'rgba(255, 252, 246, 0.66)',
          borderColor: 'rgba(255,255,255,0.68)',
          borderRadius: radii.full,
          borderWidth: 1,
          minHeight: 76,
          overflow: 'hidden',
          padding: spacing[2],
          ...shadows.card,
        }}>
        <View pointerEvents="none" style={{ ...StyleSheetAbsoluteFill, backgroundColor: 'rgba(255,255,255,0.18)' }} />
        <View pointerEvents="none" style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: radii.full, height: 1.5, left: 28, opacity: 0.72, position: 'absolute', right: 28, top: 8 }} />
        <View pointerEvents="none" style={{ backgroundColor: 'rgba(196,160,231,0.18)', borderRadius: radii.full, bottom: -28, height: 58, left: 42, position: 'absolute', right: 42 }} />
        <View pointerEvents="none" style={{ backgroundColor: 'rgba(255,203,151,0.22)', borderRadius: radii.full, height: 56, position: 'absolute', right: -10, top: -18, width: 100 }} />
        <GlassSparkles />
        <LiquidGlow progress={progress} />

        <View style={{ flexDirection: 'row', gap: spacing[1], justifyContent: 'space-between' }}>
          {navItems.map(({ key, icon, label }) => (
            <NavTab key={key} active={key === activeTab} icon={icon} label={label} onPress={() => onTabPress(key)} />
          ))}
        </View>
      </View>
    </View>
  );
}
