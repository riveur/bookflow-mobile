import { useAuth } from "@/hooks/useAuth";
import { getBook } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const useBook = (isbn: string) => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: ["books", isbn],
    queryFn: () => getBook(isbn),
    enabled: !!user,
  });
}