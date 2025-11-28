import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { YTSearchAPI } from "../utils/api";
import { formatDate } from "../utils/format-date";
import { ThemedText } from "./themed-text";

export default function VideosCategory({ title }: { title: string }) {
  const { fetchNextPage, isFetching, data } = useInfiniteQuery({
    queryKey: ["search", title],
    queryFn: ({ pageParam }) => YTSearchAPI(title, "relevance", pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    initialPageParam: "",
  });

  const videos = data?.pages.flatMap((page) => page.items);

  return (
    <View>
      <View style={styles.headerContainer}>
        <ThemedText fontWeight="semibold" style={styles.headerTitle}>
          {title}
        </ThemedText>
        <Link href={{ pathname: "/(tabs)/search", params: { query: title } }}>
          <ThemedText style={styles.showMoreText}>Show More</ThemedText>
        </Link>
      </View>
      <FlashList
        style={styles.list}
        horizontal
        data={videos}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        keyExtractor={(video) => video.id.videoId}
        onEndReached={() => !isFetching && fetchNextPage()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Link href={`/videos/${item.id.videoId}`}>
            <View style={styles.itemContainer}>
              <Image
                recyclingKey={item.id.videoId}
                source={{ uri: item.snippet.thumbnails.high.url }}
                style={styles.itemImage}
              />
              <ThemedText fontWeight="medium" numberOfLines={2} style={styles.itemTitle}>
                {item.snippet.title}
              </ThemedText>
              <ThemedText style={styles.itemDate}>{formatDate(item.snippet.publishedAt)}</ThemedText>
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
