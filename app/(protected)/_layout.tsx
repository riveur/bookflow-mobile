import { useSessionStore } from '@/stores/useSessionStore';
import { Redirect, Stack } from 'expo-router';

export default function Layout() {
  const { token } = useSessionStore();

  if (!token) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}
