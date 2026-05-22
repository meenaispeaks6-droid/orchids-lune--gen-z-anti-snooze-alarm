import '@/global.css';

import { WakeUpOverlay } from '@/src/components/alarm/WakeUpOverlay';
import { AlarmProvider } from '@/src/state/alarmStore';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { ErrorBoundary } from './error-boundary';

const angeloneRegular = 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/3cfbc36d-3084-45b1-b151-d2eb2e14720d/Angelone-2vXp8-1779443705482.ttf';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    Angelone: angeloneRegular,
  });

  if (!fontsLoaded && !fontError) return null;

  return (
    <ErrorBoundary>
      <AlarmProvider>
        <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Stack screenOptions={{ headerShown: false }} />
          <WakeUpOverlay />
        </ThemeProvider>
      </AlarmProvider>
    </ErrorBoundary>
  );
}
