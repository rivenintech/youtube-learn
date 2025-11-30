import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function Toggle({ value, onValueChange }: { value: boolean; onValueChange: (val: boolean) => void }) {
  const translateX = useSharedValue(value ? 28 : 0);

  useEffect(() => {
    translateX.value = withTiming(value ? 28 : 0, { duration: 200 });
  }, [value, translateX]);

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      style={[styles.container, { backgroundColor: value ? "#2B2D42" : "#C8C8C8" }]}
    >
      <Animated.View style={[styles.knob, knobStyle]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 66,
    height: 36,
    borderRadius: 16,
    justifyContent: "center",
    padding: 4,
  },
  knob: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff",
    elevation: 2,
  },
});
