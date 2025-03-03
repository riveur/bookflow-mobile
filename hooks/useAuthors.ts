import { useAuth } from "@/hooks/useAuth";
import { getAuthors } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

/**
 * Get the list of authors
 */
export const useAuthors = () => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: ["authors"],
    queryFn: getAuthors,
    enabled: !!user,
  });
};
