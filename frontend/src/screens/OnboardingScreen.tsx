import { colors, radii, shadows, spacing, typography } from '@/src/theme';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Pressable, Text, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, Line, Path, RadialGradient, Stop, Text as SvgText } from 'react-native-svg';

function LuneWordmark() {
  return (
    <View style={{ alignItems: 'center', gap: spacing[3] }}>
      <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ color: '#B87535', fontFamily: typography.family.heading, fontSize: 54, fontWeight: '800', letterSpacing: 11, lineHeight: 66 }}>L</Text>
          <View style={{ height: 64, justifyContent: 'center', marginHorizontal: 5, width: 58 }}>
            <View style={{ backgroundColor: '#B87535', borderRadius: 999, height: 54, overflow: 'hidden', width: 54 }}>
              <View style={{ backgroundColor: colors.background, borderRadius: 999, height: 56, position: 'absolute', right: -16, top: -2, width: 56 }} />
            </View>
          </View>
          <Text style={{ color: '#B87535', fontFamily: typography.family.heading, fontSize: 54, fontWeight: '800', letterSpacing: 11, lineHeight: 66 }}>NE</Text>
        </View>
        <Text style={{ color: colors.textSoft, fontFamily: typography.family.body, fontSize: 22, fontWeight: '600', letterSpacing: -0.4 }}>Your mornings. Better.</Text>
    </View>
  );
}

function GoogleMark({ size = 30 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <Path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <Path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <Path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </Svg>
  );
}

function polarToCartesian(center: number, radius: number, degrees: number) {
  const radians = ((degrees - 90) * Math.PI) / 180;
  return {
    x: center + radius * Math.cos(radians),
    y: center + radius * Math.sin(radians),
  };
}

function ClockFaceSvg() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { hourRotation, minuteRotation, secondRotation, timeLabel } = useMemo(() => {
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;

    return {
      hourRotation: hours * 30 + minutes * 0.5,
      minuteRotation: minutes * 6 + seconds * 0.1,
      secondRotation: seconds * 6,
      timeLabel: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }, [now]);

  const ticks = Array.from({ length: 60 }, (_, index) => {
    const major = index % 5 === 0;
    const start = polarToCartesian(120, major ? 89 : 94, index * 6);
    const end = polarToCartesian(120, 100, index * 6);
    return { end, index, major, start };
  });

  const numbers = [
    { label: '12', x: 120, y: 42 },
    { label: '3', x: 198, y: 127 },
    { label: '6', x: 120, y: 207 },
    { label: '9', x: 42, y: 127 },
  ];

  return (
    <Svg height={240} width={240} viewBox="0 0 240 240">
      <Defs>
        <RadialGradient id="faceGlow" cx="34%" cy="26%" r="74%">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="58%" stopColor="#FFF7E9" />
          <Stop offset="100%" stopColor="#E8D5BD" />
        </RadialGradient>
        <RadialGradient id="rimGlow" cx="32%" cy="20%" r="78%">
          <Stop offset="0%" stopColor="#756054" />
          <Stop offset="54%" stopColor="#2E2722" />
          <Stop offset="100%" stopColor="#17110E" />
        </RadialGradient>
      </Defs>

      <Circle cx="120" cy="120" r="116" fill="url(#rimGlow)" />
      <Circle cx="120" cy="120" r="103" fill="#C9873E" opacity="0.9" />
      <Circle cx="120" cy="120" r="96" fill="url(#faceGlow)" />
      <Circle cx="120" cy="120" r="83" fill="none" stroke="#E7CFB3" strokeWidth="1.2" />

      {ticks.map(({ end, index, major, start }) => (
        <Line
          key={index}
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke={major ? '#2F261F' : '#9C8066'}
          strokeLinecap="round"
          strokeWidth={major ? 3.2 : 1.2}
          opacity={major ? 0.95 : 0.62}
        />
      ))}

      {numbers.map((number) => (
        <SvgText key={number.label} x={number.x} y={number.y} textAnchor="middle" fill="#2F261F" fontSize="19" fontWeight="800">
          {number.label}
        </SvgText>
      ))}

      <SvgText x="120" y="82" textAnchor="middle" fill="#A66B36" fontSize="12" fontWeight="800" letterSpacing="1.6">
        LUNE
      </SvgText>
      <SvgText x="120" y="153" textAnchor="middle" fill="#9B8879" fontSize="11" fontWeight="700">
        {timeLabel}
      </SvgText>

      <Line x1="120" y1="120" x2="120" y2="70" stroke="#2F261F" strokeWidth="8" strokeLinecap="round" transform={`rotate(${hourRotation} 120 120)`} />
      <Line x1="120" y1="120" x2="120" y2="47" stroke="#2F261F" strokeWidth="5" strokeLinecap="round" transform={`rotate(${minuteRotation} 120 120)`} />
      <Line x1="120" y1="132" x2="120" y2="34" stroke="#D84234" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${secondRotation} 120 120)`} />
      <Circle cx="120" cy="120" r="13" fill="#D49248" stroke="#2F261F" strokeWidth="4" />
      <Circle cx="120" cy="120" r="4" fill="#FFF4DD" />
      <Path d="M59 42 C78 20 113 18 140 29" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="10" opacity="0.16" />
    </Svg>
  );
}

function AlarmRay({ style, rotate }: { style?: ViewStyle; rotate: string }) {
  return <View style={[{ backgroundColor: '#D49248', borderRadius: 999, height: 4, opacity: 0.6, position: 'absolute', transform: [{ rotate }], width: 34 }, style]} />;
}

function RealAlarmClock() {
  const alarm = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const alarmLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(alarm, { duration: 72, easing: Easing.linear, toValue: 1, useNativeDriver: true }),
        Animated.timing(alarm, { duration: 72, easing: Easing.linear, toValue: -1, useNativeDriver: true }),
        Animated.timing(alarm, { duration: 72, easing: Easing.linear, toValue: 0.8, useNativeDriver: true }),
        Animated.timing(alarm, { duration: 72, easing: Easing.linear, toValue: -0.6, useNativeDriver: true }),
        Animated.timing(alarm, { duration: 72, easing: Easing.linear, toValue: 0, useNativeDriver: true }),
        Animated.delay(320),
      ]),
    );
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { duration: 760, easing: Easing.out(Easing.quad), toValue: 1, useNativeDriver: true }),
        Animated.timing(pulse, { duration: 760, easing: Easing.in(Easing.quad), toValue: 0, useNativeDriver: true }),
      ]),
    );

    alarmLoop.start();
    pulseLoop.start();

    return () => {
      alarmLoop.stop();
      pulseLoop.stop();
    };
  }, [alarm, pulse]);

  const shake = alarm.interpolate({ inputRange: [-1, 0, 1], outputRange: ['-3.2deg', '0deg', '3.2deg'] });
  const translateX = alarm.interpolate({ inputRange: [-1, 0, 1], outputRange: [-3, 0, 3] });
  const bellLeft = alarm.interpolate({ inputRange: [-1, 0, 1], outputRange: ['-21deg', '-10deg', '5deg'] });
  const bellRight = alarm.interpolate({ inputRange: [-1, 0, 1], outputRange: ['-5deg', '10deg', '21deg'] });
  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.22, 0] });

  return (
    <View style={{ alignItems: 'center', height: 330, justifyContent: 'center', width: '100%' }}>
      <AlarmRay rotate="-30deg" style={{ left: 56, top: 88 }} />
      <AlarmRay rotate="30deg" style={{ right: 56, top: 88 }} />
      <AlarmRay rotate="-8deg" style={{ left: 42, top: 128, width: 28 }} />
      <AlarmRay rotate="8deg" style={{ right: 42, top: 128, width: 28 }} />

      <Animated.View
        style={{
          backgroundColor: '#D99A4D',
          borderRadius: 999,
          height: 270,
          opacity: pulseOpacity,
          position: 'absolute',
          transform: [{ scale: pulseScale }],
          width: 270,
        }}
      />

      <Animated.View style={{ alignItems: 'center', justifyContent: 'center', transform: [{ translateX }, { rotate: shake }] }}>
        <Animated.View
          style={{
            backgroundColor: '#C8863E',
            borderColor: '#7F5129',
            borderRadius: 58,
            borderWidth: 4,
            height: 74,
            left: 18,
            position: 'absolute',
            top: -41,
            transform: [{ rotate: bellLeft }],
            width: 112,
            ...shadows.card,
          }}
        />
        <Animated.View
          style={{
            backgroundColor: '#C8863E',
            borderColor: '#7F5129',
            borderRadius: 58,
            borderWidth: 4,
            height: 74,
            position: 'absolute',
            right: 18,
            top: -41,
            transform: [{ rotate: bellRight }],
            width: 112,
            ...shadows.card,
          }}
        />
        <View style={{ backgroundColor: '#6F492C', borderRadius: 999, height: 17, position: 'absolute', top: -17, width: 72 }} />

        <View style={{ alignItems: 'center', height: 254, justifyContent: 'center', width: 254 }}>
          <ClockFaceSvg />
        </View>

        <View style={{ backgroundColor: '#5A3B24', borderRadius: 999, bottom: -14, height: 54, left: 42, position: 'absolute', transform: [{ rotate: '22deg' }], width: 14 }} />
        <View style={{ backgroundColor: '#5A3B24', borderRadius: 999, bottom: -14, height: 54, position: 'absolute', right: 42, transform: [{ rotate: '-22deg' }], width: 14 }} />
      </Animated.View>
    </View>
  );
}

export default function OnboardingScreen() {
  const handleGooglePress = () => {
    router.replace('/home');
  };

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ alignSelf: 'center', flex: 1, justifyContent: 'space-between', maxWidth: 460, paddingHorizontal: spacing[6], paddingVertical: spacing[7], width: '100%' }}>
          <View style={{ alignItems: 'center', gap: spacing[6], paddingTop: spacing[10] }}>
            <LuneWordmark />
            <RealAlarmClock />
          </View>

          <View style={{ gap: spacing[5], paddingBottom: spacing[5] }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              onPress={handleGooglePress}
              style={({ pressed }) => [
                {
                  alignItems: 'center',
                  backgroundColor: colors.white,
                  borderColor: 'rgba(45, 32, 24, 0.12)',
                  borderRadius: radii.full,
                  borderWidth: 1,
                  flexDirection: 'row',
                  gap: spacing[4],
                  height: 64,
                  justifyContent: 'center',
                  opacity: pressed ? 0.82 : 1,
                  transform: [{ scale: pressed ? 0.985 : 1 }],
                  width: '100%',
                  ...shadows.card,
                },
              ]}>
              <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E8E1DA', borderRadius: 999, borderWidth: 1, height: 40, justifyContent: 'center', width: 40 }}>
                <GoogleMark />
              </View>
              <Text style={{ color: colors.text, fontFamily: typography.family.heading, fontSize: 19, fontWeight: '800', letterSpacing: -0.2 }}>Continue with Google</Text>
            </Pressable>

            <View style={{ gap: spacing[2] }}>
              <Text style={{ color: colors.textSoft, fontFamily: typography.family.body, fontSize: 14, fontWeight: '500', lineHeight: 21, textAlign: 'center' }}>By continuing, you agree to our</Text>
              <Text style={{ color: colors.textSoft, fontFamily: typography.family.body, fontSize: 14, fontWeight: '500', lineHeight: 21, textAlign: 'center' }}>
                <Text style={{ color: colors.primaryDeep, fontFamily: typography.family.heading, fontWeight: '800' }}>Terms of Service</Text> and <Text style={{ color: colors.primaryDeep, fontFamily: typography.family.heading, fontWeight: '800' }}>Privacy Policy.</Text>
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
