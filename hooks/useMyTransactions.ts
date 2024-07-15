import { useAuth } from "@/hooks/useAuth";
import { getMyTransactions } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const useMyTransactions = () => {
  const { data: user } = useAuth();

  return useQuery({
    queryKey: ["my-transactions"],
    queryFn: getMyTransactions,
    enabled: !!user,
  });
};
