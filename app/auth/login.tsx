import { useSession } from "@/components/SessionProvider";
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
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { Button, Input, Spinner, YStack } from "tamagui";

export default function LoginScreen() {
  const form = useForm<{ email: string, password: string }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signIn } = useSession();
  const onSubmit = form.handleSubmit(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    signIn(data.email, data.password);
    router.replace("/");
  });
  return (
    <YStack flex={1} padding="$8" gap="$8" justifyContent="center">
      <Text fontSize={40} fontWeight="bold" textAlign="center">
        Runder
      </Text>
      <YStack gap="$4">
        <Text fontSize={25} fontWeight="bold">Se connecter</Text>
        <Form {...form}>
          <FormContent gap="$4" onSubmit={onSubmit}>
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
                theme="green"
                disabled={form.formState.isSubmitting}
                icon={form.formState.isSubmitting ? <Spinner /> : undefined}
              >
                Rejoindre
              </Button>
            </FormTrigger>
          </FormContent>
        </Form>
        <Text textAlign="center">
          Pas de compte ?{" "}
          <Link replace href="auth/register" style={{ fontWeight: "bold" }}>S'inscrire</Link>
        </Text>
      </YStack>
    </YStack>
  );
}