import { useAuth } from "@/hooks/useAuth";
import { getBookExamples } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const useBookExamples = (isbn: string, enabled: boolean) => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: ["books", isbn, "examples"],
    queryFn: () => getBookExamples(isbn),
    enabled: !!user && enabled,
  });
};
