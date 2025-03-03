import { useAuth } from "@/hooks/useAuth";
import { getUsers } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

/**
 * Get the list of users
 */
export const useUsers = () => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    enabled: !!user,
  });
};
