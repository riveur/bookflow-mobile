import { useAuth } from "@/hooks/useAuth";
import { getCategories } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    enabled: !!user
  });
}