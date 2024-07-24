import { useAuth } from "@/hooks/useAuth";
import { getMyTransactions } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

/**
 * Get the list of transactions for the current user
 */
export const useMyTransactions = () => {
  const { data: user } = useAuth();

  return useQuery({
    queryKey: ["my-transactions"],
    queryFn: getMyTransactions,
    enabled: !!user,
  });
};
