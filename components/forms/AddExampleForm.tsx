import { FontAwesome } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Adapt, Button, Select, Sheet, Spinner, XStack } from "tamagui";

import {
  Form,
  FormContent,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormTrigger,
} from "@/components/ui/Form";
import { exampleAvailability, exampleStates } from "@/contents/example";
import { useAddBookExampleMutation } from "@/hooks/useAddBookExampleMutation";
import { CreateExampleInput, CreateExampleSchema } from "@/lib/validation";

interface AddExampleFormProps {
  isbn: string;
}

export const AddExampleForm: React.FC<AddExampleFormProps> = ({ isbn }) => {
  const { mutate: addExample } = useAddBookExampleMutation(isbn);

  const form = useForm<CreateExampleInput>({
    resolver: zodResolver(CreateExampleSchema),
    defaultValues: {
      available: true,
      state: "NEUF",
    },
  });

  const onSubmit: SubmitHandler<CreateExampleInput> = (data) => {
    addExample(data, {
      onSuccess() {
        form.reset();
        // toast("Exemplaire ajouté !");
      },
    });
  };

  return (
    <Form {...form}>
      <FormContent onSubmit={form.handleSubmit(onSubmit)}>
        <XStack gap="$1">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
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
                      {exampleStates.map((state, index) => (
                        <Select.Item
                          key={state.value.toString()}
                          value={state.value.toString()}
                          index={index}
                        >
                          <Select.ItemText>{state.label}</Select.ItemText>
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
            name="available"
            render={({ field }) => (
              <FormItem fg={1}>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
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
                      {exampleAvailability.map((availability, index) => (
                        <Select.Item
                          key={availability.value.toString()}
                          value={availability.value.toString()}
                          index={index}
                        >
                          <Select.ItemText>
                            {availability.label}
                          </Select.ItemText>
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
          <FormTrigger asChild>
            <Button
              w="$4"
              p="$0"
              aspectRatio={1}
              disabled={form.formState.isSubmitting}
              icon={
                form.formState.isSubmitting ? (
                  <Spinner />
                ) : (
                  <FontAwesome name="plus" />
                )
              }
            />
          </FormTrigger>
        </XStack>
      </FormContent>
    </Form>
  );
};
