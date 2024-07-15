import { Redirect, Stack } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { useSession } from '@/components/SessionProvider';
import { getTokens } from 'tamagui';

export default function Layout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}
