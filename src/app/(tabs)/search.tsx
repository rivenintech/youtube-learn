import { SearchBar } from "@/src/components/search-bar";
import SortByModal from "@/src/components/sort-by-modal";
import { ThemedText } from "@/src/components/themed-text";
import { YTSearchAPI } from "@/src/utils/api";
import { formatDate } from "@/src/utils/format-date";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDebounce } from "use-debounce";

const sortOptions = [
  { label: "Upload date: latest", value: "date" },
  { label: "Upload date: oldest", value: "relevance" }, // YouTube API doesn't support direct oldest sorting; using relevance as a placeholder
  { label: "Most popular", value: "viewCount" },
];

export default function Search() {
  const { query } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("viewCount");
  // Avoid excessive API calls (on every keystroke) by debouncing the search query
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (typeof query === "string") {
      setSearchQuery(query);
    }
  }, [query]);

  const { fetchNextPage, isFetching, data } = useInfiniteQuery({
    queryKey: ["search", debouncedSearchQuery, sort],
    queryFn: ({ pageParam }) => YTSearchAPI(debouncedSearchQuery, sort, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    initialPageParam: "",
    enabled: debouncedSearchQuery.trim() !== "", // Only run query if it's not empty
  });

  const videos = data?.pages.flatMap((page) => page.items);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.searchBarContainer}>
        <SearchBar defaultValue={searchQuery} onChange={setSearchQuery} />

        {videos ? (
          <ThemedText style={{ fontSize: 10, lineHeight: 24, marginTop: 10 }}>
            {data?.pages[0].pageInfo.totalResults} results found for: &quot;
            {<ThemedText fontWeight="semibold">{debouncedSearchQuery}</ThemedText>}&quot;
          </ThemedText>
        ) : (
          <ThemedText style={{ fontSize: 10, lineHeight: 24, marginTop: 10 }}>
            Enter a search term to find videos.
          </ThemedText>
        )}
      </View>
      <SortByModal options={sortOptions} defaultOption="viewCount" onConfirm={(option) => setSort(option)} />
      <FlashList
        data={videos}
        showsVerticalScrollIndicator={false}
        keyExtractor={(video) => video.id.videoId}
        onEndReached={() => !isFetching && fetchNextPage()}
        renderItem={({ item }) => (
          <Link href={`/videos/${item.id.videoId}`}>
            <Image
              recyclingKey={item.id.videoId}
              contentFit="cover"
              source={{ uri: item.snippet.thumbnails.high.url }}
              style={styles.image}
            />
            <View style={styles.content}>
              <ThemedText fontWeight="bold" style={styles.channelName}>
                {item.snippet.channelTitle}
              </ThemedText>
              <ThemedText numberOfLines={2} style={styles.description}>
                {item.snippet.title}
              </ThemedText>
              <ThemedText numberOfLines={2} style={styles.date}>
                {formatDate(item.snippet.publishedAt)}
              </ThemedText>
            </View>
          </Link>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginHorizontal: 24,
  },
  searchBarContainer: {
    marginTop: 30,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },
  content: {
    marginHorizontal: 8,
  },
  channelName: {
    fontSize: 12,
    lineHeight: 12,
    marginTop: 16,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 12,
    marginBottom: 12,
  },
  date: {
    fontSize: 10,
    lineHeight: 24,
    marginLeft: "auto",
  },
  separator: {
    height: 24,
  },
});
