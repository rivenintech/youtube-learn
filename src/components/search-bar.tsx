import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { ThemedTextInput } from "./themed-text";

export function SearchBar({ disabled, onChange }: { disabled?: boolean; onChange?: (text: string) => void }) {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/icons/search-icon.svg")} style={styles.icon} />
      <ThemedTextInput
        editable={!disabled}
        onChangeText={onChange}
        placeholderTextColor="rgba(43, 45, 66, 0.6)"
        style={styles.input}
        placeholder="Search videos"
      />
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
    width: "100%",
    gap: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
});
