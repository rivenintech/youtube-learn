import { ThemedText } from "@/src/components/themed-text";
import { formatDate } from "@/src/utils/format-date";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const videos = [
    {
      id: "1",
      title: "Introduction to React Native",
      datetime: "2023-10-01T12:00:00Z",
    },
    {
      id: "2",
      title: "Getting Started with Expo",
      datetime: "2023-10-02T12:00:00Z",
    },
    {
      id: "3",
      title: "Getting Started with Expo",
      datetime: "2023-10-02T12:00:00Z",
    },
    {
      id: "4",
      title: "Getting Started with Expo",
      datetime: "2023-10-02T12:00:00Z",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <FlashList
        data={videos}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Image contentFit="cover" source={{ uri: "https://placehold.co/345x256/png" }} style={styles.image} />
            <View style={styles.content}>
              <ThemedText fontWeight="bold" style={styles.channelName}>
                Channel Name
              </ThemedText>
              <ThemedText numberOfLines={2} style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam cursus lectus eu ligula tincidunt, a
                tincidunt libero tincidunt.
              </ThemedText>
              <ThemedText numberOfLines={2} style={styles.date}>
                {formatDate(item.datetime)}
              </ThemedText>
            </View>
          </View>
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
