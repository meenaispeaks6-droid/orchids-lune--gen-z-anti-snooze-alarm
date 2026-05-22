import { Button, Card, AppText } from '@/components/ui';
import { colors, layout, spacing } from '@/lib/theme';
import { Link, Stack } from 'expo-router';
import { SafeAreaView, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View
          style={{
            alignSelf: 'center',
            flex: 1,
            justifyContent: 'center',
            maxWidth: layout.maxContentWidth,
            padding: layout.screenPadding,
            width: '100%',
          }}>
          <Card padding="lg" elevated>
            <View style={{ gap: spacing.lg }}>
              <View style={{ gap: spacing.sm }}>
                <AppText variant="label" tone="accent">
                  LUNE
                </AppText>
                <AppText variant="title">Screen not found</AppText>
                <AppText variant="body" tone="secondary">
                  This page is not available.
                </AppText>
              </View>
              <Link href="/" asChild>
                <Button fullWidth>Go home</Button>
              </Link>
            </View>
          </Card>
        </View>
      </SafeAreaView>
    </>
  );
}
