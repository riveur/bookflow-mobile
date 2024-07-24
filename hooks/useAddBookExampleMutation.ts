import { addBookExample } from "@/lib/client";
import { CreateExampleInput } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Add a new example to a book
 * @param isbn The ISBN of the book
 */
export const useAddBookExampleMutation = (isbn: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExampleInput) => addBookExample(isbn, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["books", isbn] });
    },
  });
};
