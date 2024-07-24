import { useAuth } from "@/hooks/useAuth";
import { getUser } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

/**
 * Get the user by id
 */
export const useUser = (userId: string) => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
    enabled: !!user,
  });
};
