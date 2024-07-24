import { useAuth } from "@/hooks/useAuth";
import { getUserNotifications } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

/**
 * Get the list of notifications for the current user
 */
export const useMyNotifications = () => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: () => getUserNotifications(user!.id),
    enabled: !!user,
  });
};
