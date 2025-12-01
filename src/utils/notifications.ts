import * as Notifications from "expo-notifications";

export const configureNotificationsAsync = async () => {
  const { granted } = await Notifications.requestPermissionsAsync();

  if (!granted) {
    throw new Error("Notification Permissions not granted", { cause: "permissions" });
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
};

export const scheduleReminder = async (id: string, { hour, minute }: { hour: number; minute: number }) => {
  await configureNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time to study!",
      body: "It's time for your daily learning session. Let's get started!",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: hour,
      minute: minute,
    },
    identifier: id,
  });
};

export const cancelReminder = async (id: string) => {
  await Notifications.cancelScheduledNotificationAsync(id);
};

export const getScheduledReminder = async (id: string) => {
  const notifications = await Notifications.getAllScheduledNotificationsAsync();
  return notifications.find((notification) => notification.identifier === id);
};
