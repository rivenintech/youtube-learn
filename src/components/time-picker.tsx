import DateTimePicker from "@react-native-community/datetimepicker";
import { Image } from "expo-image";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

type Time = { hour: number; minute: number };

export default function TimePicker({ time, onTimeChange }: { time: Time; onTimeChange: (time: Time) => void }) {
  const [show, setShow] = useState(false);
  const date = useMemo(() => {
    return new Date(2025, 0, 1, time.hour, time.minute, 0);
  }, [time]);

  const onChange = (event: any, date?: Date) => {
    setShow(false);

    if (date) {
      onTimeChange({
        hour: date.getHours(),
        minute: date.getMinutes(),
      });
    }
  };

  return (
    <View>
      <Pressable onPress={() => setShow(true)} style={styles.pressable}>
        <Image source={require("@/assets/icons/clock-icon.svg")} style={styles.icon} />
        <ThemedText style={styles.text}>
          {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </ThemedText>
      </Pressable>
      {show && <DateTimePicker mode="time" is24Hour={true} value={date} onChange={onChange} />}
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 12,
    lineHeight: 24,
  },
});
