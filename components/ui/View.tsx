import {
  View as DefaultView,
  ViewProps,
  useTheme
} from 'tamagui';


export function View(props: ViewProps) {
  const theme = useTheme();

  return <DefaultView backgroundColor={theme.background.val} {...props} />;
}
