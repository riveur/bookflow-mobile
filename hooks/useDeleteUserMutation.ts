import { deleteUser } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Delete a user
 */
export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess(_, userId) {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", userId] });
    },
  });
}
