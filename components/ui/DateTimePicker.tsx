import { FontAwesome } from "@expo/vector-icons";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable } from "react-native";
import { Input, XStack } from "tamagui";

import { Text } from "@/components/ui/Text";
import format from "@/lib/date";

interface DateTimePickerProps {
  value?: Date;
  type: "date" | "time";
  onChange?: (date: Date) => void;
}

const DateTimePicker = (props: DateTimePickerProps) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(props.value);

  const handleChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    if (Platform.OS === "android") {
      setShow(false);
    }

    if (event.type === "neutralButtonPressed") {
      setDate(new Date(0));
    } else {
      setDate(selectedDate);
    }
  };

  const type = props.type || "date";

  return (
    <>
      <Pressable onPress={() => setShow(true)}>
        <XStack ai="center" jc="flex-end">
          <Input pointerEvents="none" editable={false} flexGrow={1}>
            {type === "date" && date && format(date, "PPP")}
            {type === "time" && date && format(date)}
          </Input>
          <Text pr="$4" pos="absolute">
            {type === "date" && <FontAwesome name="calendar" />}
            {type === "time" && <FontAwesome name="clock-o" />}
          </Text>
        </XStack>
      </Pressable>
      {show && (
        <RNDateTimePicker
          minimumDate={new Date()}
          mode={type}
          value={date ?? new Date()}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export { DateTimePicker };
