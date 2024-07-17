import { User } from "@/lib/validation";

export const roles: { label: string; value: User["role"] }[] = [
  { label: "Libraire", value: "LIBRARIAN" },
  { label: "Utilisateur", value: "USER" },
] as const;
