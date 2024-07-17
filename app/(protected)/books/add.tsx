import { CreateBookForm } from "@/components/forms/CreateBookForm";
import { Stack } from "expo-router";
import { ScrollView, YStack } from "tamagui";

export default function BookAddPage() {
  return (
    <>
      <Stack.Screen options={{ headerTitle: "Ajouter un livre" }} />
      <ScrollView bg="$background">
        <YStack p="$4">
          <CreateBookForm />
        </YStack>
      </ScrollView>
    </>
  );
}
