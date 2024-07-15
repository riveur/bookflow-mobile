import { Text as DefaultText, TextProps, useTheme } from 'tamagui';

export function Text(props: TextProps) {
  const theme = useTheme();

  return <DefaultText color={theme.color.val} {...props} />;
}
