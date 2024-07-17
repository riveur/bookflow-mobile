import { Example } from "@/lib/validation";

export const exampleStates: { label: string; value: Example["state"] }[] = [
  { label: "Neuf", value: "NEUF" },
  { label: "Bon", value: "BON" },
  { label: "Moyen", value: "MOYEN" },
  { label: "Mauvais", value: "MAUVAIS" },
] as const;

export const exampleAvailability: {
  label: string;
  value: Example["available"] | string;
}[] = [
  { label: "Disponible", value: true },
  { label: "Indisponible", value: false },
] as const;
