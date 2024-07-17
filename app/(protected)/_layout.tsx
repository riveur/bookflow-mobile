import {} from "@expo/vector-icons";
import { Redirect, Stack } from "expo-router";

import { useSessionStore } from "@/stores/useSessionStore";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function Layout() {
  const { token, isLoading } = useSessionStore();

  if (isLoading) {
    return null;
  }

  if (!token) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
