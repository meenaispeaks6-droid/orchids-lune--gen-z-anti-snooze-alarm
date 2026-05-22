import { PageHeader, ScreenShell } from '@/src/components/common';
import { AlarmItem, AppText, BottomNav, Button, Card, SectionHeader } from '@/src/components/ui';
import { formatAlarmClock, formatCountdown, getMsUntilAlarm, useAlarmStore } from '@/src/state/alarmStore';
import { colors, radii, spacing, shadows } from '@/src/theme';
import { router } from 'expo-router';
import { BellPlus, Quote, Sparkles, Zap } from 'lucide-react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Image, Pressable, View } from 'react-native';
import Svg, { Circle, Ellipse, Line, Path } from 'react-native-svg';

const leaderboard = [
  { name: 'Mia', score: 1280, badge: '01' },
  { name: 'You', score: 1210, badge: '02', current: true },
  { name: 'Noah', score: 1150, badge: '03' },
];

const weekdayProgress = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function DecorativeOrbit() {
  return (
    <View pointerEvents="none" style={{ position: 'absolute', right: -10, top: -6 }}>
      <View style={{ backgroundColor: colors.surfaceLavender, borderRadius: radii.full, height: 96, opacity: 0.8, width: 96 }} />
      <View style={{ backgroundColor: colors.surfaceGold, borderRadius: radii.full, height: 28, left: 18, opacity: 0.9, position: 'absolute', top: 18, width: 28 }} />
      <Sparkles color={colors.primaryDeep} size={18} style={{ position: 'absolute', right: 4, top: 10 }} />
    </View>
  );
}

function AlarmIllustration() {
  const floatY = useRef(new Animated.Value(0)).current;
  const shake = useRef(new Animated.Value(0)).current;
  const ring = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -4, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    const shakeLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 90, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 90, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 120, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.delay(1150),
      ]),
    );
    const ringLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(ring, { toValue: 1, duration: 900, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(ring, { toValue: 0, duration: 900, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      ]),
    );

    floatLoop.start();
    shakeLoop.start();
    ringLoop.start();

    return () => {
      floatLoop.stop();
      shakeLoop.stop();
      ringLoop.stop();
    };
  }, [floatY, shake, ring]);

  const rotate = shake.interpolate({ inputRange: [-1, 1], outputRange: ['-4deg', '4deg'] });
  const translateX = shake.interpolate({ inputRange: [-1, 1], outputRange: [-1.5, 1.5] });
  const ringOpacity = ring.interpolate({ inputRange: [0, 1], outputRange: [0.28, 0] });
  const ringScale = ring.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1.18] });

  return (
    <Animated.View style={{ alignItems: 'center', justifyContent: 'center', transform: [{ translateY: floatY }] }}>
      <Animated.View
        pointerEvents="none"
        style={{
          borderColor: 'rgba(33, 27, 29, 0.14)',
          borderRadius: radii.full,
          borderWidth: 2,
          height: 96,
          opacity: ringOpacity,
          position: 'absolute',
          top: 13,
          transform: [{ scale: ringScale }],
          width: 96,
        }}
      />
      <Animated.View style={{ transform: [{ translateX }, { rotate }] }}>
        <Svg height={128} viewBox="0 0 140 140" width={128}>
          <Ellipse cx="70" cy="126" fill="rgba(80,55,62,0.12)" rx="42" ry="8" />
          <Path d="M37 27 C27 12 35 4 55 12" fill="none" stroke="#211b1d" strokeLinecap="round" strokeWidth="3" />
          <Path d="M80 11 C101 3 112 10 106 28" fill="none" stroke="#211b1d" strokeLinecap="round" strokeWidth="3" />
          <Path d="M36 28 C27 20 14 22 8 35 C15 41 27 39 37 30 Z" fill="#f0a6af" stroke="#211b1d" strokeLinejoin="round" strokeWidth="3" />
          <Path d="M104 28 C114 20 127 23 132 36 C124 42 112 39 103 30 Z" fill="#f0a6af" stroke="#211b1d" strokeLinejoin="round" strokeWidth="3" />
          <Path d="M36 42 C50 30 88 30 104 45 C119 61 118 96 102 112 C86 129 51 128 34 112 C17 96 18 58 36 42 Z" fill="#f2a5ad" stroke="#211b1d" strokeLinejoin="round" strokeWidth="3" />
          <Path d="M43 48 C57 38 87 38 99 50 C112 64 110 93 97 106 C83 120 56 120 42 107 C27 93 29 61 43 48 Z" fill="#fff8ef" stroke="#211b1d" strokeLinejoin="round" strokeWidth="2.6" />
          <Circle cx="70" cy="78" fill="#211b1d" r="3.4" />
          <Path d="M70 78 L70 50" stroke="#211b1d" strokeLinecap="round" strokeWidth="3" />
          <Path d="M70 78 L91 55" stroke="#211b1d" strokeLinecap="round" strokeWidth="3" />
          <Line x1="70" x2="70" y1="45" y2="49" stroke="#211b1d" strokeLinecap="round" strokeWidth="2.5" />
          <Line x1="39" x2="43" y1="78" y2="78" stroke="#211b1d" strokeLinecap="round" strokeWidth="2.5" />
          <Line x1="98" x2="102" y1="78" y2="78" stroke="#211b1d" strokeLinecap="round" strokeWidth="2.5" />
          <Path d="M42 113 L35 133" stroke="#211b1d" strokeLinecap="round" strokeWidth="3" />
          <Path d="M96 113 L105 132" stroke="#211b1d" strokeLinecap="round" strokeWidth="3" />
        </Svg>
      </Animated.View>
    </Animated.View>
  );
}

function TrophyBadge() {
  return (
    <View style={{ alignItems: 'center', height: 136, justifyContent: 'center', width: 136 }}>
      <View style={{ alignItems: 'center', backgroundColor: '#35c27b', borderRadius: 28, height: 126, justifyContent: 'center', transform: [{ rotate: '-7deg' }], width: 126 }}>
        <View style={{ backgroundColor: '#2cb56f', borderRadius: 30, bottom: 9, height: 122, position: 'absolute', right: 8, width: 122 }} />
        <Svg height={120} viewBox="0 0 120 120" width={120}>
          <Path d="M35 28 H85 V42 C85 62 76 79 60 85 C44 79 35 62 35 42 Z" fill="#f6c238" />
          <Path d="M45 28 H75 V35 H45 Z" fill="#ffe06a" />
          <Path d="M60 84 L60 100" stroke="#f6c238" strokeLinecap="round" strokeWidth="12" />
          <Path d="M45 100 H75" stroke="#d79b13" strokeLinecap="round" strokeWidth="10" />
          <Path d="M35 38 C22 38 16 47 16 58 C16 68 23 74 31 74 H37" fill="none" stroke="#ffe06a" strokeLinecap="round" strokeWidth="8" />
          <Path d="M85 38 C98 38 104 47 104 58 C104 68 97 74 89 74 H83" fill="none" stroke="#ffe06a" strokeLinecap="round" strokeWidth="8" />
          <Path d="M31 32 C32 26 38 22 44 22" fill="none" stroke="#d79b13" strokeLinecap="round" strokeWidth="4" />
          <Path d="M89 32 C88 26 82 22 76 22" fill="none" stroke="#d79b13" strokeLinecap="round" strokeWidth="4" />
          <Path d="M61 40 V76" stroke="#ffd95b" strokeLinecap="round" strokeWidth="3" />
        </Svg>
      </View>
    </View>
  );
}

function StreakImageBadge() {
  return (
    <View style={{ height: 92, overflow: 'hidden', width: 118 }}>
      <Image
        accessibilityLabel="streak badge"
        resizeMode="contain"
        source={{ uri: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3cfbc36d-3084-45b1-b151-d2eb2e14720d/image-1779448403897.png?width=8000&height=8000&resize=contain' }}
        style={{ height: 118, transform: [{ translateY: -4 }], width: 118 }}
      />
    </View>
  );
}

function StatPill({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'lavender' | 'gold' }) {
  const backgroundColor = tone === 'lavender' ? colors.surfaceLavender : tone === 'gold' ? colors.surfaceGold : colors.surfaceSoft;
  return (
    <View style={{ alignItems: 'center', backgroundColor, borderRadius: radii.full, gap: 2, paddingHorizontal: spacing[3], paddingVertical: spacing[2] }}>
      <AppText variant="caption" tone="secondary">{label}</AppText>
      <AppText variant="bodyLarge">{value}</AppText>
    </View>
  );
}

export default function HomeScreen() {
  const { sortedAlarms, nextAlarm, toggleAlarm, deleteAlarm, previewChallenge } = useAlarmStore();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const remaining = useMemo(() => (nextAlarm ? formatCountdown(getMsUntilAlarm(nextAlarm, new Date(now))) : 'No active alarm'), [nextAlarm, now]);
  const navigate = (tab: 'Home' | 'Alarms' | 'Stats' | 'Profile') => {
    if (tab === 'Home') return router.push('/home');
    if (tab === 'Alarms') return router.push('/alarms');
    if (tab === 'Stats') return router.push('/stats');
    return router.push('/profile');
  };

  return (
    <ScreenShell footer={<BottomNav activeTab="Home" onAddPress={() => router.push('/alarm/new')} onTabPress={navigate} />} bottomInset={spacing[10]}>
      <PageHeader eyebrow="LUNE" title="Good morning, Amina" subtitle="Your premium wake-up dashboard is glowing today." showNotification />

      <Card elevated tonal="lavender" style={{ overflow: 'hidden', padding: spacing[5] }}>
        <DecorativeOrbit />
        <View style={{ flexDirection: 'row', gap: spacing[4] }}>
          <View style={{ flex: 1, gap: spacing[4] }}>
            <View style={{ gap: spacing[1] }}>
              <AppText variant="label" tone="accent">Next Alarm</AppText>
              <AppText variant="display">{nextAlarm ? formatAlarmClock(nextAlarm) : '--:--'}</AppText>
              <AppText variant="bodySmall" tone="secondary">{nextAlarm ? `${nextAlarm.wakeMode} • ${nextAlarm.challengeType} • ${remaining}` : 'Create your first premium wake-up flow.'}</AppText>
            </View>
            {nextAlarm ? (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] }}>
                {nextAlarm.repeatDays.length ? nextAlarm.repeatDays.map((day) => (
                  <View key={day} style={{ backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.full, borderWidth: 1, paddingHorizontal: spacing[3], paddingVertical: spacing[1] }}>
                    <AppText variant="caption" tone="accent">{day}</AppText>
                  </View>
                )) : <StatPill label="Repeat" value="Once" />}
              </View>
            ) : null}
            <View style={{ alignItems: 'center', flexDirection: 'row', gap: spacing[2], justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.55)', borderRadius: radii.full, flexDirection: 'row', gap: spacing[2], paddingHorizontal: spacing[3], paddingVertical: spacing[2] }}>
                <View style={{ backgroundColor: nextAlarm?.enabled ? colors.primary : colors.surfaceMuted, borderRadius: radii.full, height: 14, width: 26 }} />
                <AppText variant="caption" tone="accent">Countdown {remaining}</AppText>
              </View>
              <Pressable onPress={() => nextAlarm ? router.push({ pathname: '/alarm/[id]', params: { id: nextAlarm.id } }) : router.push('/alarm/new')} style={{ alignItems: 'center', backgroundColor: colors.surface, borderRadius: radii.full, paddingHorizontal: spacing[3], paddingVertical: spacing[2] }}>
                <AppText variant="caption" tone="accent">{nextAlarm ? 'Edit alarm' : 'Create'}</AppText>
              </Pressable>
            </View>
          </View>
          <AlarmIllustration />
        </View>
      </Card>


        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3] }}>
          <Card elevated tonal="accent" style={{ flex: 1, minWidth: 160 }}>
            <View style={{ alignItems: 'center', gap: spacing[2] }}>
              <StreakImageBadge />
              <AppText variant="label" tone="accent">Streak</AppText>
            </View>
            <AppText variant="bodySmall" tone="secondary" style={{ textAlign: 'center' }}>Keep it up! You’re on fire!</AppText>
            <View style={{ flexDirection: 'row', gap: spacing[1], justifyContent: 'center', marginTop: spacing[2] }}>
              {weekdayProgress.map((day, index) => (
                <View key={`${day}-${index}`} style={{ alignItems: 'center', backgroundColor: index < 5 ? colors.primary : colors.surfaceMuted, borderRadius: radii.full, height: 24, justifyContent: 'center', width: 24 }}>
                  <AppText variant="caption" tone={index < 5 ? 'inverse' : 'muted'}>{day}</AppText>
                </View>
              ))}
            </View>
          </Card>

        <Card elevated tonal="sage" style={{ flex: 1, minWidth: 160, overflow: 'hidden' }}>
          <View style={{ alignItems: 'center', gap: spacing[2] }}>
            <TrophyBadge />
            <AppText variant="label" tone="accent">Leaderboard</AppText>
            <AppText variant="bodySmall" tone="secondary" style={{ textAlign: 'center' }}>Climb the wake-up league</AppText>
          </View>
          <View style={{ gap: spacing[2], marginTop: spacing[3] }}>
            {leaderboard.map((user) => (
              <View key={user.name} style={{ alignItems: 'center', backgroundColor: user.current ? 'rgba(255,255,255,0.9)' : colors.surface, borderColor: user.current ? colors.primary : colors.border, borderRadius: radii.lg, borderWidth: user.current ? 1.5 : 1, flexDirection: 'row', gap: spacing[3], padding: spacing[3], ...(user.current ? shadows.glow : shadows.soft) }}>
                <View style={{ alignItems: 'center', backgroundColor: user.current ? '#35c27b' : colors.surfaceMuted, borderRadius: radii.full, height: 34, justifyContent: 'center', width: 34 }}>
                  <AppText variant="caption" tone={user.current ? 'inverse' : 'accent'}>{user.badge}</AppText>
                </View>
                <View style={{ flex: 1 }}>
                  <AppText variant="bodyLarge">{user.name}</AppText>
                  <AppText variant="caption" tone="secondary">{user.score} pts</AppText>
                </View>
              </View>
            ))}
          </View>
        </Card>
      </View>

      <View style={{ gap: spacing[3] }}>
        <SectionHeader eyebrow="Schedule" title="Your upcoming alarms" actionLabel="View all" onActionPress={() => router.push('/alarms')} />
        {sortedAlarms.slice(0, 3).map((alarm) => (
          <AlarmItem key={alarm.id} alarm={alarm} onToggle={toggleAlarm} onDelete={deleteAlarm} onEdit={(id) => router.push({ pathname: '/alarm/[id]', params: { id } })} />
        ))}
      </View>

      <Card elevated style={{ gap: spacing[4] }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ gap: 4, flex: 1 }}>
            <AppText variant="label" tone="accent">Motivation Quote</AppText>
            <AppText variant="titleSmall">A calm mind makes a powerful morning.</AppText>
          </View>
          <Quote color={colors.primaryDeep} size={24} />
        </View>
        <AppText variant="bodyLarge" tone="secondary">"Small rituals become big results when you repeat them with care."</AppText>
      </Card>

      <View style={{ flexDirection: 'row', gap: spacing[2], flexWrap: 'wrap' }}>
        <StatPill label="Focus" value="94%" tone="lavender" />
        <StatPill label="Sleep" value="7h 42m" tone="gold" />
        <StatPill label="Energy" value="High" />
      </View>

      <Button fullWidth onPress={() => router.push('/alarm/new')}><BellPlus color={colors.white} size={18} /> Set a new alarm</Button>
      {nextAlarm ? <Button fullWidth variant="secondary" onPress={() => previewChallenge(nextAlarm)}><Zap color={colors.primaryDeep} size={18} /> Start Challenge Preview</Button> : null}
    </ScreenShell>
  );
}
