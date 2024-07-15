import { addTransaction } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBorrowBookMutation = (isbn: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTransaction,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["books", isbn, "examples"] });
    }
  })
}