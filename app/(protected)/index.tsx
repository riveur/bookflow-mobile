import { Button, YStack } from 'tamagui';

import { Text } from '@/components/ui/Text';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/lib/client';
import { useSessionStore } from '@/stores/useSessionStore';

export default function HomeScreen() {
  const { data: user } = useAuth();
  const { clear } = useSessionStore();
  return (
    <YStack padding="$4" gap="$2">
      {user && (
        <>
          <Text>Bienvenue, {user.fullname}</Text>
          <Button theme="red" onPress={() => logout().then(() => clear())}>Logout</Button>
        </>
      )}
    </YStack>
  );
}
