import { ScrollView, YStack } from "tamagui";

import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { TransactionList } from "@/components/shared/TransactionList";
import { Text } from "@/components/ui/Text";
import { useMyTransactions } from "@/hooks/useMyTransactions";

export default function BorrowsPage() {
  const {
    data: transactions,
    isSuccess: isSuccessTransactions,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
  } = useMyTransactions();

  return (
    <>
      <YStack
        backgroundColor="$background"
        flex={1}
        padding="$4"
        paddingBottom="$0"
        gap="$4"
      >
        <Text fontSize="$6">Liste de mes emprunts</Text>
        {isLoadingTransactions && <LoadingScreen />}
        {isErrorTransactions && (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="font-bold">Une erreur est survenue</p>
            </div>
          </div>
        )}
        {isSuccessTransactions && (
          <ScrollView>
            <TransactionList transactions={transactions} />
          </ScrollView>
        )}
      </YStack>
    </>
  );
}
