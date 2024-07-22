import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { Button, Card, YStack } from "tamagui";

import { DateTimePicker } from "@/components/ui/DateTimePicker";
import {
  Form,
  FormContent,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormTrigger,
} from "@/components/ui/Form";
import { Text } from "@/components/ui/Text";
import { useBorrowBookMutation } from "@/hooks/useBorrowBookMutation";
import format from "@/lib/date";
import { BorrowBookInput, BorrowBookSchema, Example } from "@/lib/validation";

type BorrowBookFormProps = {
  example: Example;
};

export const BorrowBookForm = ({ example }: BorrowBookFormProps) => {
  const { mutate: borrowBook } = useBorrowBookMutation(example.book_isbn);
  const form = useForm<BorrowBookInput>({
    resolver: zodResolver(BorrowBookSchema),
    defaultValues: {
      example_id: example.id,
      expected_return_date: new Date(),
    },
  });

  const onSubmit: SubmitHandler<BorrowBookInput> = (data) => {
    borrowBook(
      {
        example_id: data.example_id,
        expected_return_date: format(data.expected_return_date, "yyyy-MM-dd"),
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Livre emprunté avec succès",
          });
          router.navigate("/");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <FormContent onSubmit={form.handleSubmit(onSubmit)}>
        <Card bordered p="$4">
          <YStack ai="center" gap="$4" mb="$4">
            <YStack gap="$1.5">
              <FormField
                control={form.control}
                name="expected_return_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de retour</FormLabel>
                    <DateTimePicker
                      type="date"
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormDescription fontSize="$2" col="$placeholderColor">
                      Renseignez la date à laquelle vous comptez rendre
                      l'exemplaire.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </YStack>
          </YStack>
          <FormTrigger asChild>
            <Button disabled={!example.available}>
              <Text>{example.available ? "Emprunter" : "Indisponible"}</Text>
            </Button>
          </FormTrigger>
        </Card>
      </FormContent>
    </Form>
  );
};
