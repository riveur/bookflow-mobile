import { FontAwesome } from "@expo/vector-icons";
import { Button } from "tamagui";

import { logout } from "@/lib/client";
import { useSessionStore } from "@/stores/useSessionStore";

const LogoutButton = () => {
  const { clear } = useSessionStore();

  const onPress = async () => {
    await logout();
    clear();
  };
  return (
    <Button
      transparent
      borderRadius={9999}
      aspectRatio={1}
      p="$0"
      icon={<FontAwesome name="sign-out" size={16} />}
      onPress={onPress}
    />
  );
};

export { LogoutButton };
