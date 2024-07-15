import { Form, FormContent, FormControl, FormField, FormItem, FormLabel, FormMessage, FormTrigger } from "@/components/ui/Form";
import { Text } from "@/components/ui/Text";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { Spinner } from "tamagui";
import { Button, Input, YStack } from "tamagui";

export default function RegisterScreen() {
  const form = useForm<{ email: string, username: string, password: string }>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  const onSubmit = form.handleSubmit(async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.replace("/");
  });
  return (
    <YStack flex={1} padding={45} gap="$8" justifyContent="center">
      <Text fontSize={40} fontWeight="bold" textAlign="center">
        Runder
      </Text>
      <YStack gap="$4">
        <Text fontSize={25} fontWeight="bold">S'inscrire</Text>
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
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d'utilisateur</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john"
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
              <Button theme="green" icon={form.formState.isSubmitting ? <Spinner /> : undefined}>Rejoindre</Button>
            </FormTrigger>
          </FormContent>
        </Form>
        <Text textAlign="center">
          Déjà un compte ?{" "}
          <Link replace href="auth/login" style={{ fontWeight: "bold" }}>Se connecter</Link>
        </Text>
      </YStack>
    </YStack>
  );
}