import { useAuth } from "@/hooks/useAuth";
import { getBooks } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

/**
 * Get the list of books
 */
export const useBooks = () => {
  const { data: user } = useAuth();

  const query = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    enabled: !!user,
  });

  return query;
};
