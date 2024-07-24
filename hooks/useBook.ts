import { useAuth } from "@/hooks/useAuth";
import { getBook } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

/**
 * Get a book by its ISBN
 * @param isbn The ISBN of the book
 */
export const useBook = (isbn: string) => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: ["books", isbn],
    queryFn: () => getBook(isbn),
    enabled: !!user,
  });
};
