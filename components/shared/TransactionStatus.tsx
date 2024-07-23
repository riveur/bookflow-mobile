import React from "react";

import { Text } from "@/components/ui/Text";
import { Transaction } from "@/lib/validation";

interface TransactionStateProps {
  state: Transaction["status"];
}

export const TransactionState: React.FC<TransactionStateProps> = ({
  state,
}) => {
  switch (state) {
    case "EMPRUNTE":
      return (
        <Text bw="$0.5" px="$2" py="$1" br="$2" bc="$blue10" bg="$blue2">
          Emprunté
        </Text>
      );
    case "ATTENTE_RETOUR":
      return (
        <Text bw="$0.5" px="$2" py="$1" br="$2" bc="$yellow10" bg="$yellow2">
          En attente de retour
        </Text>
      );
    case "RENDU":
      return (
        <Text bw="$0.5" px="$2" py="$1" br="$2" bc="$green10" bg="green2">
          Rendu
        </Text>
      );
  }
};
