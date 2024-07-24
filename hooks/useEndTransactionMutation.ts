import { endTransaction } from "@/lib/client";
import { Transaction } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * End a transaction
 * @param transaction The transaction to end
 */
export const useEndTransactionMutation = (transaction: Transaction) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => endTransaction(transaction.user_id, transaction.id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["my-transactions"] });
    },
  });
};
