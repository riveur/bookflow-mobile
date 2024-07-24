import { addTransaction } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Borrow a book
 * @param isbn The ISBN of the book
 */
export const useBorrowBookMutation = (isbn: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTransaction,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
