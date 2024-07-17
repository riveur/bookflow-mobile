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
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
