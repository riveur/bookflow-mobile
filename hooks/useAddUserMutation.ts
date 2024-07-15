import { addUser } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });
}