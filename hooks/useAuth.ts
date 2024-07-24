import { getCurrentUserInformations } from "@/lib/client";
import { User } from "@/lib/validation";
import { useSessionStore } from "@/stores/useSessionStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

/**
 * Get the current user informations
 */
export const useAuth = () => {
  const { clear } = useSessionStore();

  const query = useQuery({
    queryKey: ["auth"],
    queryFn: getCurrentUserInformations,
    retry: 1,
  });

  useEffect(() => {
    if (query.error) {
      clear();
    }
  }, [query.error, clear]);

  const roleIs = (role: User["role"]) => {
    return query.data?.role === role;
  };

  return { ...query, roleIs };
};
