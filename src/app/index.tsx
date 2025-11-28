import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../components/themed-text";

export default function Index() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Image source={require("@/assets/images/logo.svg")} contentFit="contain" style={styles.logo} />
        <Image source={require("@/assets/images/app-icon.svg")} contentFit="contain" style={styles.appIcon} />
        <View>
          <ThemedText fontWeight="semibold" style={styles.welcomeText}>
            Welcome to the best YouTube-based learning application.
          </ThemedText>
          <Link replace href="/(tabs)" style={styles.loginButton}>
            <ThemedText fontWeight="semibold" style={styles.loginButtonText}>
              Log in as guest
            </ThemedText>
          </Link>
          <ThemedText style={styles.agreementText}>
            By continuing you agree with{" "}
            <Link href="https://rivenintech.com" style={styles.link}>
              <ThemedText>Terms and Conditions</ThemedText>
            </Link>{" "}
            and{" "}
            <Link href="https://rivenintech.com" style={styles.link}>
              <ThemedText>Privacy Policy</ThemedText>
            </Link>
          </ThemedText>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8D99AE",
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 32,
    marginBottom: 55,
    marginTop: 80,
  },
  logo: {
    width: 292,
    height: 116,
  },
  appIcon: {
    width: 128,
    height: 128,
  },
  welcomeText: {
    fontSize: 22,
    lineHeight: 24,
    color: "#FFFFFF",
  },
  loginButton: {
    backgroundColor: "#2B2D42",
    borderRadius: 12,
    padding: 12,
    marginTop: 32,
    marginBottom: 24,
  },
  loginButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
  },
  agreementText: {
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "center",
    color: "#FFFFFF",
  },
  link: {
    letterSpacing: 0,
    textDecorationLine: "underline",
  },
});
