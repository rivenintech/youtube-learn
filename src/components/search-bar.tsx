import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

export function SearchBarPlaceholder() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/icons/search-icon.svg")} style={styles.icon} />
      <ThemedText style={styles.text}>Search videos</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#2B2D42",
    padding: 10,
    flex: 1,
    width: "100%",
    gap: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.6,
  },
});
