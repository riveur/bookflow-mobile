import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ToastConfig, ToastConfigParams } from "react-native-toast-message";
import { Card, useTheme, XStack, YStack } from "tamagui";

import { Text } from "@/components/ui/Text";

const toastConfig = {
  success(props) {
    return <SuccessToast {...props} />;
  },
  error(props) {
    return <ErrorToast {...props} />;
  },
} satisfies ToastConfig;

export { toastConfig };

const SuccessToast = ({ onPress, text1, text2 }: ToastConfigParams<any>) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        width: 340,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        elevation: 2,
      }}
    >
      <Card bordered flex={1} px="$4" py="$2" theme="green">
        <XStack gap="$4" ai="center">
          <FontAwesome name="check-circle" size={20} color={theme.color.val} />
          <YStack>
            {(text1?.length ?? 0) > 0 && (
              <Text ellipsizeMode="tail" fontWeight="bold">
                {text1}
              </Text>
            )}
            {(text2?.length ?? 0) > 0 && (
              <Text ellipsizeMode="tail">{text2}</Text>
            )}
          </YStack>
        </XStack>
      </Card>
    </TouchableOpacity>
  );
};

const ErrorToast = ({ onPress, text1, text2 }: ToastConfigParams<any>) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        width: 340,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        elevation: 2,
      }}
    >
      <Card bordered flex={1} px="$4" py="$2" theme="red">
        <XStack gap="$4" ai="center">
          <FontAwesome name="check-circle" size={20} color={theme.color.val} />
          <YStack>
            {(text1?.length ?? 0) > 0 && (
              <Text ellipsizeMode="tail" fontWeight="bold">
                {text1}
              </Text>
            )}
            {(text2?.length ?? 0) > 0 && (
              <Text ellipsizeMode="tail">{text2}</Text>
            )}
          </YStack>
        </XStack>
      </Card>
    </TouchableOpacity>
  );
};
