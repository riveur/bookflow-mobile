import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Separator, YStack } from "tamagui";

import { ExampleList } from "@/components/shared/ExampleList";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { Text } from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useBook } from "@/hooks/useBook";
import { useBookExamples } from "@/hooks/useBookExamples";

export default function BookBorrowPage() {
  const params = useLocalSearchParams<{ isbn: string }>();

  const { data: book, isLoading: isLoadingBook } = useBook(params.isbn!);
  const {
    data: examples,
    isSuccess: isSuccessExamples,
    isLoading: isLoadingExamples,
  } = useBookExamples(params.isbn!, !!book);

  if (isLoadingBook || isLoadingExamples) {
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

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Emprunter" }} />
      <ScrollView>
        <YStack flex={1} p="$4" gap="$2">
          <Text ta="center" fontWeight="bold" fontSize="$6">
            {book.title} ({book.author.name})
          </Text>
          <Separator my="$2" />
          <Text col="$placeholderColor">
            Choissisez un exemplaire à emprunter.
          </Text>
          <ExampleList
            isbn={book.isbn}
            examples={isSuccessExamples ? examples : []}
          />
        </YStack>
      </ScrollView>
    </>
  );
}
