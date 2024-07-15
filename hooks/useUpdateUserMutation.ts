import { updateUser } from "@/lib/client";
import { CreateUserInput } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUserMutation(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserInput) => updateUser(userId, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", userId] });
    }
  });
}