import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2B2D42",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Image source={require("@/assets/icons/home-icon.svg")} style={[styles.icon, { tintColor: color }]} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Image source={require("@/assets/icons/search-icon.svg")} style={[styles.icon, { tintColor: color }]} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
  tabBarLabelStyle: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    fontFamily: "Poppins",
  },
  tabBarStyle: {
    backgroundColor: "#8D99AE",
  },
});
