import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../components/themed-text";
import TimePicker from "../components/time-picker";
import Toggle from "../components/toggle";
import { cancelReminder, getScheduledReminder, scheduleReminder } from "../utils/notifications";

export default function SettingsPage() {
  const isMounted = useRef(false);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState({ hour: 12, minute: 0 });
  const { back } = useRouter();

  // Load existing notification settings on mount
  useEffect(() => {
    const fetchNotification = async () => {
      const notification = await getScheduledReminder("daily-learning-reminder");

      if (notification) {
        setReminderEnabled(true);
        const trigger = notification.trigger as { hour: number; minute: number };
        setReminderTime({ hour: trigger.hour, minute: trigger.minute });
      }
    };

    fetchNotification();
  }, []);

  useEffect(() => {
    // Skip the first render
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const updateNotification = async () => {
      if (!reminderEnabled) {
        cancelReminder("daily-learning-reminder");
      } else {
        // Add or update the scheduled notification
        try {
          await scheduleReminder("daily-learning-reminder", reminderTime);
        } catch (error) {
          // Permission error handling
          if (error instanceof Error && error.cause === "permissions") {
            setReminderEnabled(false);
            Alert.alert(
              "⚠️ Permission Denied",
              "Notification permissions are not granted. Please enable them in your device settings to receive reminders."
            );
          }
        }
      }
    };

    updateNotification();
  }, [reminderEnabled, reminderTime]);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Pressable onPress={back}>
          <Image source={require("@/assets/icons/leftarrow-icon.svg")} style={styles.backIcon} />
        </Pressable>
        <ThemedText fontWeight="bold" style={styles.headerText}>
          Settings
        </ThemedText>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileIconContainer}>
          <Image source={require("@/assets/icons/person-icon.svg")} style={styles.profileIcon} />
        </View>
        <ThemedText fontWeight="bold" style={styles.profileName}>
          John Doe
        </ThemedText>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionInner}>
          <View style={styles.reminderRow}>
            <Image source={require("@/assets/icons/notification-icon.svg")} style={styles.notificationIcon} />
            <ThemedText style={styles.reminderText}>Learning reminders</ThemedText>
          </View>
          <View style={styles.reminderSettingsRow}>
            <ThemedText style={styles.repeatText}>Repeat everyday at:</ThemedText>
            <TimePicker time={reminderTime} onTimeChange={setReminderTime} />
            <Toggle value={reminderEnabled} onValueChange={setReminderEnabled} />
          </View>
          <ThemedText fontWeight="semibold" style={styles.reminderDescription}>
            You will receive friendly reminder to remember to study
          </ThemedText>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginHorizontal: 24,
    marginVertical: 12,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  headerText: {
    fontSize: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: "auto",
  },
  profileIconContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: "#2B2D42",
    marginVertical: 40,
  },
  profileIcon: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF",
  },
  profileName: {
    fontSize: 14,
    lineHeight: 12,
  },
  section: {
    borderColor: "#2B2D42",
    borderTopWidth: 2,
    paddingTop: 8,
  },
  sectionInner: {
    marginHorizontal: 24,
  },
  reminderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  notificationIcon: {
    width: 36,
    height: 36,
  },
  reminderText: {
    fontSize: 14,
    lineHeight: 24,
  },
  reminderSettingsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginVertical: 12,
  },
  repeatText: {
    fontSize: 12,
    lineHeight: 24,
  },
  timeText: {
    fontSize: 12,
    lineHeight: 24,
  },
  reminderDescription: {
    fontSize: 10,
    lineHeight: 24,
    color: "#000000",
  },
});
