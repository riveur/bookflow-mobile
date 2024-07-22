import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Separator, XStack, YStack } from "tamagui";

import { BorrowBookForm } from "@/components/forms/BorrowBookForm";
import { ExampleState } from "@/components/shared/ExampleStatus";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { Text } from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useBook } from "@/hooks/useBook";
import { useBookExample } from "@/hooks/useBookExample";

export default function BookBorrowExamplePage() {
  const params = useLocalSearchParams<{ isbn: string; exampleId: string }>();
  const { data: book, isLoading: isLoadingBook } = useBook(params.isbn!);
  const { data: example, isLoading: isLoadingExample } = useBookExample({
    params: {
      isbn: params.isbn!,
      exampleId: params.exampleId!,
    },
    enabled: params.exampleId !== undefined,
  });

  if (isLoadingBook || isLoadingExample) {
    return (
      <>
        <Stack.Screen options={{ headerTitle: "Chargement..." }} />
        <LoadingScreen />
      </>
    );
  }

  if (!book) {
    return (
      <>
        <Stack.Screen options={{ headerTitle: "Erreur" }} />
        <View flex={1} jc="center" ai="center">
          <Text fontSize="$6">Livre introuvable</Text>
        </View>
      </>
    );
  }

  if (!example) {
    return (
      <>
        <Stack.Screen options={{ headerTitle: "Erreur" }} />
        <View flex={1} jc="center" ai="center">
          <Text fontSize="$6">Exemplaire introuvable</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Emprunter" }} />
      <ScrollView>
        <YStack flex={1} p="$4" gap="$2">
          <Text ta="center" fontWeight="bold" fontSize="$6">
            {book.title} ({book.author.name})
          </Text>
          <Separator my="$2" />
          <YStack>
            <Text>Vous avez choisi l'exemplaire:</Text>
            <Text fontWeight="bold">{example.id}</Text>
          </YStack>
          <XStack ai="center" gap="$2">
            <Text>Etat:</Text>
            <ExampleState state={example.state} />
          </XStack>
          <Text>
            Disponibilité: {example.available ? "Disponible" : "Indisponible"}
          </Text>
          <BorrowBookForm example={example} />
        </YStack>
      </ScrollView>
    </>
  );
}
