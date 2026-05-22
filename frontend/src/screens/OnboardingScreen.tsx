import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

const ONBOARDING_SEEN_KEY = 'lune:onboarding-seen';
const onboardingImageUrl = 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3cfbc36d-3084-45b1-b151-d2eb2e14720d/image-1779454137284.png?width=8000&height=8000&resize=contain';

function LoginScreen() {
  const handleGooglePress = () => {
    router.replace('/home');
  };

  return (
    <View style={{ alignItems: 'center', backgroundColor: '#F8F0E7', flex: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 64 }}>
      <View style={{ alignItems: 'center', gap: 10, paddingTop: 64 }}>
        <Text style={{ color: '#B87535', fontSize: 54, fontWeight: '800', letterSpacing: 11, lineHeight: 66 }}>LUNE</Text>
        <Text style={{ color: '#826F62', fontSize: 22, fontWeight: '600', letterSpacing: -0.4 }}>Your mornings. Better.</Text>
      </View>

      <View style={{ gap: 18, maxWidth: 460, width: '100%' }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Continue with Google"
          onPress={handleGooglePress}
          style={({ pressed }) => [
            {
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderColor: 'rgba(45, 32, 24, 0.12)',
              borderRadius: 999,
              borderWidth: 1,
              flexDirection: 'row',
              gap: 14,
              height: 64,
              justifyContent: 'center',
              opacity: pressed ? 0.82 : 1,
              shadowColor: '#2D2018',
              shadowOffset: { height: 12, width: 0 },
              shadowOpacity: 0.12,
              shadowRadius: 22,
              transform: [{ scale: pressed ? 0.985 : 1 }],
              width: '100%',
            },
          ]}>
          <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E8E1DA', borderRadius: 999, borderWidth: 1, height: 40, justifyContent: 'center', width: 40 }}>
            <Text style={{ color: '#4285F4', fontSize: 25, fontWeight: '900' }}>G</Text>
          </View>
          <Text style={{ color: '#2D2018', fontSize: 19, fontWeight: '800', letterSpacing: -0.2 }}>Continue with Google</Text>
        </Pressable>

        <View style={{ gap: 6 }}>
          <Text style={{ color: '#826F62', fontSize: 14, fontWeight: '500', lineHeight: 21, textAlign: 'center' }}>By continuing, you agree to our</Text>
          <Text style={{ color: '#826F62', fontSize: 14, fontWeight: '500', lineHeight: 21, textAlign: 'center' }}>
            <Text style={{ color: '#8C5629', fontWeight: '800' }}>Terms of Service</Text> and <Text style={{ color: '#8C5629', fontWeight: '800' }}>Privacy Policy.</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function OnboardingScreen() {
  const [checking, setChecking] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    let mounted = true;

    AsyncStorage.getItem(ONBOARDING_SEEN_KEY)
      .then((seen) => {
        if (!mounted) return;
        setShowLogin(seen === 'true');
      })
      .finally(() => {
        if (mounted) setChecking(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleContinue = () => {
    AsyncStorage.setItem(ONBOARDING_SEEN_KEY, 'true').catch(() => undefined);
    setShowLogin(true);
  };

  if (checking) return <View style={{ backgroundColor: '#050607', flex: 1 }} />;
  if (showLogin) return <LoginScreen />;

  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Continue to login" onPress={handleContinue} style={{ backgroundColor: '#050607', flex: 1 }}>
      <Image source={{ uri: onboardingImageUrl }} resizeMode="cover" style={{ height: '100%', width: '100%' }} />
    </Pressable>
  );
}
