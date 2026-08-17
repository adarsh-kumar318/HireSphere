import api from "./api";

// Get logged-in user's notifications
export const getMyNotifications = async () => {
  const { data } = await api.get("/notifications");
  return data;
};

// Mark one notification as read
export const markNotificationAsRead = async (notificationId) => {
  const { data } = await api.put(
    `/notifications/${notificationId}/read`
  );

  return data;
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async () => {
  const { data } = await api.put(
    "/notifications/read-all"
  );

  return data;
};

// Delete notification
export const deleteNotification = async (notificationId) => {
  const { data } = await api.delete(
    `/notifications/${notificationId}`
  );

  return data;
};