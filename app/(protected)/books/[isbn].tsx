import { Stack, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Separator, Spinner, YStack } from "tamagui";

import { UpdateBookForm } from "@/components/forms/UpdateBookForm";
import { ExampleList } from "@/components/shared/ExampleList";
import { Text } from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useAuth } from "@/hooks/useAuth";
import { useBook } from "@/hooks/useBook";
import { useBookExamples } from "@/hooks/useBookExamples";

export default function BookShowPage() {
  const params = useLocalSearchParams<{ isbn: string }>();
  const { roleIs } = useAuth();
  const {
    data: book,
    isLoading: isLoadingBook,
    isError: isErrorBook,
    isSuccess: isSuccessBook,
  } = useBook(params.isbn!);

  const { data: examples, isSuccess: isSuccessExamples } = useBookExamples(
    params.isbn!,
    !!book,
  );
  if (isLoadingBook) {
    return (
      <>
        <Stack.Screen options={{ headerTitle: "Chargement..." }} />
        <View flex={1} jc="center" ai="center">
          <View jc="center" ai="center">
            <Spinner size="large" />
          </View>
        </View>
      </>
    );
  }

  if (isErrorBook || !isSuccessBook) {
    return (
      <>
        <Stack.Screen options={{ headerTitle: "Erreur" }} />
        <View flex={1} jc="center" ai="center">
          <View jc="center" ai="center">
            <Text fontWeight="bold">Une erreur est survenue</Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerTitle: book.title }} />
      <ScrollView bg="$background">
        <YStack flex={1} p="$4" gap="$4">
          <Image
            source={{ uri: book.cover_url, height: 400 }}
            br="$6"
            w="100%"
            alt={book.title}
          />
          <View>
            {roleIs("LIBRARIAN") ? (
              <UpdateBookForm book={book} />
            ) : (
              <>
                <Text fontWeight="bold" fs={20}>
                  {book.title}
                </Text>
                <Text>Ecrit par - {book.author.name}</Text>
                <Text>Catégorie - {book.category.name}</Text>
                <Text>Ajouté le - {book.created_at}</Text>
                <Text>Dernière modification - {book.updated_at}</Text>
              </>
            )}
            <Separator my="$4" />
            <Text>
              Exaplaires disponibles -{" "}
              <Text fontWeight="bold">{book.available_examples}</Text>
            </Text>
            <Text>
              Exaplaires indisponibles -{" "}
              <Text fontWeight="bold">{book.unavailable_examples}</Text>
            </Text>
            <Separator my="$4" />
            <Text fontWeight="bold" fontSize={20} ta="center" pb="$4">
              Exemplaires
            </Text>
            <ExampleList
              isbn={book.isbn}
              showAddForm={roleIs("LIBRARIAN")}
              examples={isSuccessExamples ? examples : []}
            />
          </View>
        </YStack>
      </ScrollView>
    </>
  );
}
