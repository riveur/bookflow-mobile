import { readNotification } from "@/lib/client";
import { Notification } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Mark a notification as read
 * @param notification The notification to mark as read
 */
export const useReadNotificationMutation = (notification: Notification) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => readNotification(notification.user_id, notification.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", notification.id],
      });
    },
  });
};
