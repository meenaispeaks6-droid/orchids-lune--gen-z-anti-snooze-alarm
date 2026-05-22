import { PageHeader, ScreenShell } from '@/src/components/common';
import { AppText, BottomNav, Button, Card, Chip, SectionHeader, Toggle } from '@/src/components/ui';
import { mockProfile } from '@/src/data/mockProfile';
import { colors, radii, spacing } from '@/src/theme';
import { router } from 'expo-router';
import { Bell, Moon, ShieldCheck } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

function ProfileCharacterAvatar() {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 132,
        width: 132,
        borderRadius: 66,
        backgroundColor: '#FDE9F0',
        borderWidth: 3,
        borderColor: '#F7B6C7',
        shadowColor: '#F08AAE',
        shadowOpacity: 0.24,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 10 },
        elevation: 5,
      }}>
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 18,
          height: 18,
          width: 18,
          borderRadius: 9,
          backgroundColor: '#FFE66A',
          borderWidth: 2,
          borderColor: '#3A2A4D',
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 18,
          right: 16,
          height: 12,
          width: 12,
          borderRadius: 6,
          backgroundColor: '#7ED7C1',
        }}
      />
      <View
        style={{
          height: 82,
          width: 82,
          borderRadius: 41,
          backgroundColor: '#FFF4E8',
          borderWidth: 3,
          borderColor: '#3A2A4D',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <View
          style={{
            position: 'absolute',
            top: -3,
            left: 9,
            right: 9,
            height: 34,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            backgroundColor: '#6C4BF4',
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            height: 16,
            width: 22,
            borderRadius: 11,
            backgroundColor: '#3A2A4D',
            transform: [{ rotate: '-12deg' }],
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            height: 16,
            width: 22,
            borderRadius: 11,
            backgroundColor: '#3A2A4D',
            transform: [{ rotate: '12deg' }],
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 30,
            left: 17,
            height: 8,
            width: 8,
            borderRadius: 4,
            backgroundColor: '#3A2A4D',
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 30,
            right: 17,
            height: 8,
            width: 8,
            borderRadius: 4,
            backgroundColor: '#3A2A4D',
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 42,
            height: 12,
            width: 20,
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderWidth: 3,
            borderTopWidth: 0,
            borderColor: '#3A2A4D',
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 18,
          left: 26,
          height: 18,
          width: 18,
          borderRadius: 9,
          backgroundColor: '#8EE3D8',
          borderWidth: 2,
          borderColor: '#3A2A4D',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 26,
          height: 14,
          width: 14,
          borderRadius: 7,
          backgroundColor: '#FFD166',
        }}
      />
    </View>
  );
}

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [sleepTrackingEnabled, setSleepTrackingEnabled] = useState(true);
  const [strictDismissEnabled, setStrictDismissEnabled] = useState(true);

  return (
    <ScreenShell
      footer={
        <BottomNav
          activeTab="Profile"
          onTabPress={(tab) => router.push(tab === 'Home' ? '/home' : tab === 'Alarms' ? '/alarms' : tab === 'Stats' ? '/stats' : '/profile')}
        />
      }>
      <PageHeader title="Profile" subtitle="Your rhythm settings and wake preferences." />

      <Card elevated style={{ alignItems: 'center', gap: spacing[4], padding: spacing[6] }}>
        <ProfileCharacterAvatar />
        <View style={{ alignItems: 'center', gap: spacing[1] }}>
          <AppText variant="titleSmall">{mockProfile.name}</AppText>
          <AppText variant="bodySmall" tone="secondary">{mockProfile.email}</AppText>
          <Chip label={`${mockProfile.streak} day streak`} selected />
        </View>
      </Card>

      <View style={{ gap: spacing[3] }}>
        <SectionHeader eyebrow="Preferences" title="Wake settings" />
        {[
          { label: 'Notifications', helper: 'Morning reminders and alarm alerts', icon: Bell, value: notificationsEnabled, onChange: setNotificationsEnabled },
          { label: 'Sleep tracking', helper: `Goal: ${mockProfile.sleepGoal}`, icon: Moon, value: sleepTrackingEnabled, onChange: setSleepTrackingEnabled },
          { label: 'Strict dismiss', helper: 'Require mission before stopping alarms', icon: ShieldCheck, value: strictDismissEnabled, onChange: setStrictDismissEnabled },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} style={{ alignItems: 'center', flexDirection: 'row', gap: spacing[3] }}>
              <View style={{ alignItems: 'center', backgroundColor: colors.surfaceSoft, borderRadius: radii.full, height: 44, justifyContent: 'center', width: 44 }}>
                <Icon color={colors.primaryDeep} size={21} />
              </View>
              <View style={{ flex: 1, gap: spacing[1] }}>
                <AppText variant="bodyLarge">{item.label}</AppText>
                <AppText variant="caption" tone="secondary">{item.helper}</AppText>
              </View>
              <Toggle value={item.value} onValueChange={item.onChange} />
            </Card>
          );
        })}
      </View>

      <View style={{ gap: spacing[3] }}>
        <SectionHeader eyebrow="Wins" title="Achievements" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] }}>
          {mockProfile.achievements.map((achievement) => <Chip key={achievement} label={achievement} selected />)}
        </View>
      </View>

      <Button variant="secondary" fullWidth>Edit profile</Button>
    </ScreenShell>
  );
}

