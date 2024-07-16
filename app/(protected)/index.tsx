import { FontAwesome } from "@expo/vector-icons";
import { Button, ScrollView, Spinner, XStack, YStack } from "tamagui";

import { BookCard } from "@/components/shared/BookCard";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/hooks/useAuth";
import { useBooks } from "@/hooks/useBooks";

export default function HomeScreen() {
  const {
    data: books,
    isLoading: isLoadingBooks,
    isSuccess: isSuccessBooks,
  } = useBooks();
  const { roleIs } = useAuth();

  return (
    <YStack
      backgroundColor="$background"
      flex={1}
      padding="$4"
      paddingBottom="$0"
      gap="$4"
    >
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize="$6">Liste des livres</Text>
        {roleIs("LIBRARIAN") && (
          <Button
            aspectRatio={1}
            icon={<FontAwesome name="plus" size={16} />}
            padding="$0"
          />
        )}
      </XStack>
      {isLoadingBooks && (
        <YStack flex={1} justifyContent="center" alignItems="center" gap="$2">
          <Spinner size="large" color="$gray10" />
          <Text>Chargement...</Text>
        </YStack>
      )}
      {isSuccessBooks && books.length !== 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap="$4" paddingBottom="$4">
            {books.map((book) => (
              <BookCard key={book.isbn} book={book} />
            ))}
          </YStack>
        </ScrollView>
      )}
      {isSuccessBooks && books.length === 0 && (
        <YStack flex={1} justifyContent="center" alignItems="center" gap="$2">
          <FontAwesome name="times-circle" size={64} color="white" />
          <Text className="text-center">Pas de livres.</Text>
        </YStack>
      )}
    </YStack>
  );
}
