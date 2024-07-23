import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTheme } from "tamagui";

import { LogoutButton } from "@/components/shared/LogoutButton";

export default function Layout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerTitle: "Bookflow",
        tabBarActiveBackgroundColor: theme.background.val,
        tabBarActiveTintColor: theme.green8.val,
        headerRight: LogoutButton,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="borrows"
        options={{
          title: "Emprunts",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="book" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
