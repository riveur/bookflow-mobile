import { useAuth } from "@/hooks/useAuth";
import { getBooks } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const useBooks = () => {
  const { data: user } = useAuth();

  const query = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    enabled: !!user,
  });

  return query;
}