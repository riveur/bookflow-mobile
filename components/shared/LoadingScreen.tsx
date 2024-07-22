import { Spinner, YStack } from "tamagui";

import { Text } from "@/components/ui/Text";

const LoadingScreen = () => {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" gap="$2">
      <Spinner size="large" color="$gray10" />
      <Text>Chargement...</Text>
    </YStack>
  );
};

export { LoadingScreen };
