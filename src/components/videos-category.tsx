import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { formatDate } from "../utils/format-date";
import { ThemedText } from "./themed-text";

const videos = [
  {
    id: "1",
    title:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sit amet consectetur adipiscing elit",
    datetime: "2024-08-12T00:00:00Z",
  },
  {
    id: "2",
    title: "Video 2",
    datetime: "2024-06-02T00:00:00Z",
  },
  { id: "3", title: "Video 3", datetime: "2024-06-03T00:00:00Z" },
  { id: "4", title: "Video 4", datetime: "2024-06-04T00:00:00Z" },
  { id: "5", title: "Video 5", datetime: "2024-06-05T00:00:00Z" },
];

export default function VideosCategory({ title }: { title: string }) {
  return (
    <View>
      <View style={styles.headerContainer}>
        <ThemedText fontWeight="semibold" style={styles.headerTitle}>
          {title}
        </ThemedText>
        <Link href="/(tabs)/search">
          <ThemedText style={styles.showMoreText}>Show More</ThemedText>
        </Link>
      </View>
      <FlashList
        style={styles.list}
        horizontal
        data={videos}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Link href={`/videos/${item.id}`}>
            <View style={styles.itemContainer}>
              <Image source={{ uri: "https://placehold.co/180x112" }} style={styles.itemImage} />
              <ThemedText fontWeight="medium" numberOfLines={2} style={styles.itemTitle}>
                {item.title}
              </ThemedText>
              <ThemedText style={styles.itemDate}>{formatDate(item.datetime)}</ThemedText>
            </View>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginHorizontal: 24,
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  showMoreText: {
    fontSize: 12,
    lineHeight: 24,
    textDecorationLine: "underline",
  },
  list: {
    marginLeft: 24,
  },
  itemSeparator: {
    width: 19,
  },
  itemContainer: {
    width: 180,
  },
  itemImage: {
    height: 112,
    borderRadius: 16,
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: 12,
    lineHeight: 12,
  },
  itemDate: {
    fontSize: 10,
    lineHeight: 24,
    marginLeft: "auto",
  },
});
