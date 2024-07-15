import { deleteBook } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteBookMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,
    onSuccess(_, isbn) {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["books", isbn] });
    }
  });
}