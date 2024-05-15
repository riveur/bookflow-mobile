import { Text } from "@/components/ui/Text";

export function InterText(props: React.ComponentProps<typeof Text>) {
  return <Text {...props} style={[props.style, { fontFamily: 'Inter' }]} />;
}
