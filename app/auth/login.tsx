import { router } from "expo-router";
import { HTTPError } from "ky";
import { useForm } from "react-hook-form";
import { Button, Input, Spinner, YStack } from "tamagui";

import {
  Form,
  FormContent,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormTrigger
} from "@/components/ui/Form";
import { Text } from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { login } from "@/lib/client";
import { LoginSchema } from "@/lib/validation";
import { useSessionStore } from "@/stores/useSessionStore";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginScreen() {
  const sessionStore = useSessionStore();
  const form = useForm<{ email: string, password: string }>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const result = await login(data.email, data.password);
      sessionStore.init({ token: result.token });
      router.replace("/");
    } catch (error: unknown) {
      if (error instanceof HTTPError) {
        const data = await error.response.json();
        if (data.message) {
          form.setError('root', { message: data.message });
        }
      }

      form.setError('root', { message: 'Une erreur est survenue' });
    }
  });
  return (
    <YStack backgroundColor="$background" flex={1} padding="$8" gap="$8" justifyContent="center">
      <Text fontSize={40} fontWeight="bold" textAlign="center">
        Bookflow
      </Text>
      <YStack gap="$4">
        <Text fontSize={25} fontWeight="bold">Se connecter</Text>
        {form.formState.errors.root && (
          <View padding="$2.5" borderColor="$red10" borderWidth="$0.25" borderRadius="$4">
            <Text color="red" textAlign="center">
              {form.formState.errors.root.message}
            </Text>
          </View>
        )}
        <Form {...form}>
          <FormContent gap="$2" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.doe@example.com"
                      inputMode="email"
                      autoCapitalize="none"
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <YStack>
            </YStack>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      autoCapitalize="none"
                      secureTextEntry
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormTrigger asChild>
              <Button
                disabled={form.formState.isSubmitting}
                icon={form.formState.isSubmitting ? <Spinner /> : undefined}
              >
                Confirmer
              </Button>
            </FormTrigger>
          </FormContent>
        </Form>
      </YStack>
    </YStack>
  );
}