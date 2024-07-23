import * as React from "react";
import { Card, XStack, YStack } from "tamagui";

import { TransactionState } from "@/components/shared/TransactionStatus";
import { Text } from "@/components/ui/Text";
import { Transaction } from "@/lib/validation";

type TransactionListProps = {
  transactions: Transaction[];
};

export const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <YStack gap="$2">
      {transactions.length !== 0 &&
        transactions.map((transaction) => (
          <Card bordered key={transaction.id} p="$4">
            <YStack gap="$2">
              <XStack jc="space-between">
                <TransactionState state={transaction.status} />
                <Text fontWeight="bold">{transaction.date}</Text>
              </XStack>
              <Text>{transaction.example.book.title}</Text>
              {transaction.status === "EMPRUNTE" && (
                <Text>
                  &Agrave; rendre le {transaction.expected_return_date}
                </Text>
              )}
              {transaction.status === "RENDU" && (
                <Text>Rendu le {transaction.real_return_date}</Text>
              )}
              <Text col="$color10" fontSize={10}>
                Exemplaire ID: {transaction.example_id}
              </Text>
            </YStack>
          </Card>
        ))}
      {transactions.length === 0 && (
        <Card bordered p="$2">
          <Text ta="center">Aucune transaction</Text>
        </Card>
      )}
    </YStack>
  );
};
