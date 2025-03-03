import * as React from "react";
import { AlertDialog, Button, XStack, YStack } from "tamagui";

type AlertDialogDeleteBookProps = React.ComponentProps<typeof AlertDialog> & {
  children: React.ReactNode;
  handleAction: () => void;
};

export function AlertDeleteBook({
  children,
  handleAction,
  ...props
}: AlertDialogDeleteBookProps) {
  return (
    <AlertDialog native {...props}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack gap="$2">
            <AlertDialog.Title>
              Êtes-vous sûr de vouloir supprimer ce livre ?
            </AlertDialog.Title>
            <AlertDialog.Description>
              Cette action ne peut pas être annulée. Cela supprimera
              définitivement le livre.
            </AlertDialog.Description>
            <XStack gap="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button>Annuler</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action onPress={handleAction} asChild>
                <Button theme="active">Supprimer</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
