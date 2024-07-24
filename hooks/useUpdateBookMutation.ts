import { updateBook } from "@/lib/client";
import { CreateBookInput } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Update a book
 * @param isbn The ISBN of the book to update
 */
export function useUpdateBookMutation(isbn: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookInput) => updateBook(isbn, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["books", isbn] });
    },
  });
}
