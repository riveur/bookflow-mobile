import React from "react";

import { Text } from "@/components/ui/Text";
import { Example } from "@/lib/validation";

interface ExampleStateProps {
  state: Example["state"];
}

export const ExampleState: React.FC<ExampleStateProps> = ({ state }) => {
  switch (state) {
    case "NEUF":
      return (
        <Text bw="$0.5" px="$2" py="$1" br="$2" bc="$green10" bg="$green2">
          Neuf
        </Text>
      );
    case "BON":
      return (
        <Text bw="$0.5" px="$2" py="$1" br="$2" bc="$blue10" bg="$blue">
          Bon
        </Text>
      );
    case "MOYEN":
      return (
        <Text bw="$0.5" px="$2" py="$1" br="$2" bc="$yellow10" bg="$yellow2">
          Moyen
        </Text>
      );
    case "MAUVAIS":
      return (
        <Text bw="$0.5" px="$2" py="$1" br="$2" bc="$red10" bg="$red2">
          Mauvais
        </Text>
      );
  }
};
