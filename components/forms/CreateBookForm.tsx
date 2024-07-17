import { FontAwesome } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Adapt,
  Button,
  Input,
  Label,
  Select,
  Sheet,
  Spinner,
  Switch,
  XStack,
  YStack,
} from "tamagui";

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
import { View } from "@/components/ui/View";
import { useAddBookMutation } from "@/hooks/useAddBookMutation";
import { useAuthors } from "@/hooks/useAuthors";
import { useCategories } from "@/hooks/useCategories";
import { CreateBookInput, CreateBookSchema } from "@/lib/validation";

export function CreateBookForm() {
  const { data: authors } = useAuthors();
  const { data: categories } = useCategories();
  const { mutate: addBook } = useAddBookMutation();
  const form = useForm<CreateBookInput>({
    resolver: zodResolver(CreateBookSchema),
    defaultValues: {
      isbn: "",
      title: "",
      cover_url: "",
      author: "",
      category: "",
    },
  });

  const [isNewAuthor, setIsNewAuthor] = useState(false);
  const [isNewCategory, setIsNewCategory] = useState(false);

  const handleChangeNewAuthor = (value: boolean) => {
    form.resetField(value ? "author_id" : "author");
    setIsNewAuthor(value);
  };

  const handleChangeNewCategory = (value: boolean) => {
    form.resetField(value ? "category_id" : "category");
    setIsNewCategory(value);
  };

  const onSubmit: SubmitHandler<CreateBookInput> = (data) => {
    console.log(data);
    addBook(data, {
      onSuccess(data) {
        router.navigate(`/books/${data.isbn}`);
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
            <XStack ai="center" gap="$2">
              <Switch
                id="new-author-mode"
                checked={isNewAuthor}
                onCheckedChange={handleChangeNewAuthor}
                size="$2"
              >
                <Switch.Thumb animation="quicker" />
              </Switch>
              <Label>Nouvel auteur ?</Label>
            </XStack>
            {isNewAuthor ? (
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Auteur</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jean Dupont"
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
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
                          iconAfter={
                            <FontAwesome size={8} name="chevron-down" />
                          }
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
            )}
            <XStack ai="center" gap="$2">
              <Switch
                id="new-category-mode"
                checked={isNewCategory}
                onCheckedChange={handleChangeNewCategory}
                size="$2"
              >
                <Switch.Thumb animation="quicker" />
              </Switch>
              <Label htmlFor="new-category-mode">Nouvelle catégorie ?</Label>
            </XStack>
            {isNewCategory ? (
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Roman"
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
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
                          iconAfter={
                            <FontAwesome size={8} name="chevron-down" />
                          }
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
            )}
          </YStack>
          <View>
            <FormTrigger asChild>
              <Button
                variant="outlined"
                disabled={form.formState.isSubmitting}
                icon={form.formState.isSubmitting ? <Spinner /> : undefined}
              >
                Ajouter
              </Button>
            </FormTrigger>
          </View>
        </YStack>
      </FormContent>
    </Form>
  );
}
