import { Link } from "expo-router";
import * as React from "react";
import { Button, Card, XStack, YStack } from "tamagui";

import { AddExampleForm } from "@/components/forms/AddExampleForm";
import { Text } from "@/components/ui/Text";
import { Example } from "@/lib/validation";
import { ExampleState } from "./ExampleStatus";

type ExampleListProps = {
  examples: Example[];
  isbn: string;
  showAddForm?: boolean;
};

export const ExampleList = ({
  examples,
  isbn,
  showAddForm = false,
}: ExampleListProps) => {
  return (
    <YStack gap="$2">
      {examples.length !== 0 &&
        examples.map((example) => (
          <Card bordered key={example.id} p="$4">
            <YStack gap="$2">
              <XStack jc="space-between">
                <ExampleState state={example.state} />
                <Text fontWeight="bold">{example.created_at}</Text>
              </XStack>
              <Text col="$color10" fontSize={10}>
                ID: {example.id}
              </Text>
              <Link
                asChild
                href={`/books/${example.book_isbn}/borrow/${example.id}`}
                disabled={!example.available}
              >
                <Button opacity={!example.available ? 0.5 : undefined}>
                  <Text>
                    {example.available ? "Emprunter" : "Indisponible"}
                  </Text>
                </Button>
              </Link>
            </YStack>
          </Card>
        ))}
      {examples.length === 0 && (
        <Card bordered p="$2">
          <Text ta="center">Aucun exemplaire</Text>
        </Card>
      )}
      {showAddForm && (
        <>
          <Text>Ajouter un examplaire</Text>
          <AddExampleForm isbn={isbn} />
        </>
      )}
    </YStack>
  );
};
