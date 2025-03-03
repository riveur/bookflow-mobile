import { useAuth } from "@/hooks/useAuth";
import { getBookExample } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

interface UseBookExampleParams {
  params: {
    isbn: string;
    exampleId: string;
  };
  enabled: boolean;
}

/**
 * Get a book example by its ISBN and example ID
 * @param options The options to fetch the book example
 */
export const useBookExample = ({ params, enabled }: UseBookExampleParams) => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: ["books", params.isbn, "examples", params.exampleId],
    queryFn: () => getBookExample(params.isbn, params.exampleId),
    enabled: !!user && enabled,
  });
};
