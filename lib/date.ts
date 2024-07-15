import { format as f } from "date-fns";
import { fr } from "date-fns/locale";

export default function format(date: string | Date, format: string = "PPpp") {
  return f(date, format, { locale: fr });
}
