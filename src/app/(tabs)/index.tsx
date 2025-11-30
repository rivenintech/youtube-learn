import { SearchBar } from "@/src/components/search-bar";
import VideosCategory from "@/src/components/videos-category";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Categories = [
  {
    title: "React Native",
  },
  {
    title: "React",
  },
  {
    title: "Typescript",
  },
  {
    title: "Javascript",
  },
];

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Link href="/search" style={styles.searchLink}>
          <SearchBar disabled />
        </Link>
        <Link href="/settings">
          <Image source={require("@/assets/icons/settings-icon.svg")} style={styles.settingsIcon} />
        </Link>
      </View>
      <FlashList
        data={Categories}
        renderItem={({ item }) => <VideosCategory title={item.title} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginVertical: 30,
  },
  searchLink: {
    flex: 1,
  },
  settingsIcon: {
    width: 32,
    height: 32,
  },
  separator: {
    borderTopWidth: 2,
    borderTopColor: "#2B2D42",
    marginBottom: 8,
    marginTop: 24,
  },
});
