import { useAuth } from "@/hooks/useAuth";
import { getBookExamples } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

/**
 * Get the list of examples for a book
 * @param isbn The ISBN of the book
 * @param enabled Whether the query is enabled
 */
export const useBookExamples = (isbn: string, enabled: boolean) => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: ["books", isbn, "examples"],
    queryFn: () => getBookExamples(isbn),
    enabled: !!user && enabled,
  });
};
