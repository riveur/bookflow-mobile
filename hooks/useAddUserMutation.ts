import { addUser } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Add a new user
 */
export const useAddUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
