import { Text, type TextProps } from "react-native";
import { Fonts } from "../constants/theme";

export function ThemedText({
  fontWeight,
  style,
  ...rest
}: TextProps & { fontWeight?: "regular" | "medium" | "semibold" | "bold" }) {
  return (
    <Text
      style={[{ color: "#2B2D42", letterSpacing: 1, fontFamily: Fonts[fontWeight || "regular"] }, style]}
      {...rest}
    />
  );
}
