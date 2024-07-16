import { FontAwesome } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useTheme } from "tamagui";

import { useSessionStore } from "@/stores/useSessionStore";

export default function Layout() {
  const { token, isLoading } = useSessionStore();
  const theme = useTheme();

  if (isLoading) {
    return null;
  }

  if (!token) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerTitle: "Bookflow",
        tabBarActiveBackgroundColor: theme.background.val,
        tabBarActiveTintColor: theme.green8.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
