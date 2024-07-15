import { useSession } from '@/components/SessionProvider';
import { Text } from '@/components/ui/Text';
import { StyleSheet } from 'react-native';
import { Button, YStack } from 'tamagui';

export default function HomeScreen() {
  const { session, signOut } = useSession();
  return (
    <YStack padding="$4" gap="$2">
      <Text style={styles.title}>Gaming App</Text>
      {session && (
        <>
          <Text>Welcome, {session}</Text>
          <Button theme="red" onPress={() => signOut()}>Logout</Button>
        </>
      )}
    </YStack>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
