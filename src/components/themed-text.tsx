import { StyleSheet, Text, TextInput, TextInputProps, type TextProps } from "react-native";
import { Fonts } from "../constants/theme";

type fontWeight = { fontWeight?: "regular" | "medium" | "semibold" | "bold" };

export function ThemedText({ fontWeight, style, ...rest }: TextProps & fontWeight) {
  return <Text style={[styles.text, { fontFamily: Fonts[fontWeight || "regular"] }, style]} {...rest} />;
}

export function ThemedTextInput({ fontWeight, style, ...rest }: TextInputProps & fontWeight) {
  return <TextInput style={[styles.textInput, { fontFamily: Fonts[fontWeight || "regular"] }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  text: {
    color: "#2B2D42",
    letterSpacing: 0.01,
  },
  textInput: {
    color: "#2B2D42",
    letterSpacing: 0.01,
    padding: 0,
    marginBottom: -6,
  },
});
