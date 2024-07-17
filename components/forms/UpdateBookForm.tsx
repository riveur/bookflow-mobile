import { FontAwesome } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Adapt, Button, Input, Select, Sheet, Spinner, YStack } from "tamagui";

import { AlertDeleteBook } from "@/components/shared/AlertDeleteBook";
import {
  Form,
  FormContent,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormTrigger,
} from "@/components/ui/Form";
import { useAuthors } from "@/hooks/useAuthors";
import { useCategories } from "@/hooks/useCategories";
import { useDeleteBookMutation } from "@/hooks/useDeleteBookMutation";
import { useUpdateBookMutation } from "@/hooks/useUpdateBookMutation";
import { Book, CreateBookInput, CreateBookSchema } from "@/lib/validation";

export function UpdateBookForm({ book }: { book: Book }) {
  const { data: authors } = useAuthors();
  const { data: categories } = useCategories();
  const { mutate: updateBook } = useUpdateBookMutation(book.isbn);
  const { mutate: deleteBook } = useDeleteBookMutation();
  const form = useForm<CreateBookInput>({
    resolver: zodResolver(CreateBookSchema),
    defaultValues: { ...book, category: "", author: "" },
  });

  const onSubmit: SubmitHandler<CreateBookInput> = (data) => {
    updateBook(data, {
      onSuccess(data) {
        form.reset(data);
        // toast("Les modifications ont bien été enregistrées");
      },
    });
  };

  const onDeleteBook = () => {
    deleteBook(book.isbn, {
      onSuccess() {
        // toast("Le livre a bien été supprimé");
        router.navigate("/");
      },
    });
  };

  return (
    <Form {...form}>
      <FormContent onSubmit={form.handleSubmit(onSubmit)}>
        <YStack
          bw="$1"
          bc="$borderColor"
          br="$4"
          shadowRadius="$2"
          p="$4"
          gap="$2"
        >
          <YStack gap="$4">
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Isbn</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000-000-000-000"
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="La belle et la bête"
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cover_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lien de la couverture</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://google.com/images/la-belle-et-la-bete.png"
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auteur</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <Adapt when="sm" platform="touch">
                      <Sheet
                        modal
                        dismissOnSnapToBottom
                        animationConfig={{
                          type: "spring",
                          damping: 20,
                          mass: 1.2,
                          stiffness: 250,
                        }}
                      >
                        <Sheet.Frame>
                          <Sheet.ScrollView>
                            <Adapt.Contents />
                          </Sheet.ScrollView>
                        </Sheet.Frame>
                        <Sheet.Overlay
                          animation="lazy"
                          enterStyle={{ opacity: 0 }}
                          exitStyle={{ opacity: 0 }}
                        />
                      </Sheet>
                    </Adapt>

                    <FormControl asChild>
                      <Select.Trigger
                        iconAfter={<FontAwesome size={8} name="chevron-down" />}
                      >
                        <Select.Value placeholder="Choissisez un auteur" />
                      </Select.Trigger>
                    </FormControl>
                    <Select.Content zIndex={200000}>
                      <Select.Viewport minWidth={200}>
                        {(authors || []).map((author, index) => (
                          <Select.Item
                            key={author.id}
                            value={author.id}
                            index={index}
                          >
                            <Select.ItemText>{author.name}</Select.ItemText>
                            <Select.ItemIndicator marginLeft="auto">
                              <FontAwesome size={16} name="check" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <Adapt when="sm" platform="touch">
                      <Sheet
                        modal
                        dismissOnSnapToBottom
                        animationConfig={{
                          type: "spring",
                          damping: 20,
                          mass: 1.2,
                          stiffness: 250,
                        }}
                      >
                        <Sheet.Frame>
                          <Sheet.ScrollView>
                            <Adapt.Contents />
                          </Sheet.ScrollView>
                        </Sheet.Frame>
                        <Sheet.Overlay
                          animation="lazy"
                          enterStyle={{ opacity: 0 }}
                          exitStyle={{ opacity: 0 }}
                        />
                      </Sheet>
                    </Adapt>

                    <FormControl asChild>
                      <Select.Trigger
                        iconAfter={<FontAwesome size={8} name="chevron-down" />}
                      >
                        <Select.Value placeholder="Choissisez un auteur" />
                      </Select.Trigger>
                    </FormControl>
                    <Select.Content zIndex={200000}>
                      <Select.Viewport minWidth={200}>
                        {(categories || []).map((category, index) => (
                          <Select.Item
                            key={category.id}
                            value={category.id}
                            index={index}
                          >
                            <Select.ItemText>{category.name}</Select.ItemText>
                            <Select.ItemIndicator marginLeft="auto">
                              <FontAwesome size={16} name="check" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </YStack>
          <YStack gap="$2">
            <FormTrigger asChild>
              <Button
                theme={form.formState.isDirty ? "green" : undefined}
                disabled={!form.formState.isDirty}
                opacity={!form.formState.isDirty ? 0.8 : undefined}
                icon={form.formState.isSubmitting ? <Spinner /> : undefined}
              >
                Enregistrer
              </Button>
            </FormTrigger>
            <AlertDeleteBook handleAction={onDeleteBook}>
              <Button theme="red">Supprimer</Button>
            </AlertDeleteBook>
          </YStack>
        </YStack>
      </FormContent>
    </Form>
  );
}
