import SlidingScreen from "@/src/components/sliding-screen";
import { ThemedText } from "@/src/components/themed-text";
import { YTVideoStatisticsAPI } from "@/src/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "react-native-video";

export default function VideoDetails() {
  const { id } = useLocalSearchParams();
  const video = require("@/assets/video/broadchurch.mp4");

  const { data: apiData } = useQuery({
    queryKey: ["videoDetails", id],
    queryFn: () => YTVideoStatisticsAPI(id as string),
  });

  return (
    <SafeAreaView>
      {/* Video element */}
      <Video source={video} controls style={styles.videoPlayer} />
      <View style={styles.container}>
        <ThemedText fontWeight="semibold" numberOfLines={1} style={styles.title}>
          {apiData?.items[0].snippet.title}
        </ThemedText>
        <View style={styles.channelRow}>
          <View style={styles.channelImageBg}>
            <Image source={require("@/assets/icons/person-icon.svg")} style={styles.channelImage} />
          </View>
          <ThemedText fontWeight="bold" style={styles.channelName}>
            {apiData?.items[0].snippet.channelTitle}
          </ThemedText>
        </View>
        <SlidingScreen tabs={["Details", "Notes"]} containerStyle={styles.slidingScreen}>
          {/* Details Section */}
          <View style={styles.detailsContainer}>
            <View>
              <ThemedText fontWeight="semibold" style={styles.sectionTitle}>
                Description
              </ThemedText>
              <ThemedText style={styles.description}>{apiData?.items[0].snippet.description}</ThemedText>
            </View>
            <View>
              <ThemedText fontWeight="semibold" style={styles.sectionTitle}>
                Statistics
              </ThemedText>
              <View style={styles.statsRow}>
                <View style={styles.statsBox}>
                  <Image source={require("@/assets/icons/views-icon.svg")} style={styles.statsIcon} />
                  <ThemedText fontWeight="semibold" style={styles.statsText}>
                    {apiData?.items[0].statistics.viewCount} views
                  </ThemedText>
                </View>

                <View style={styles.statsBox}>
                  <Image source={require("@/assets/icons/likes-icon.svg")} style={styles.statsIcon} />
                  <ThemedText fontWeight="semibold" style={styles.statsText}>
                    {apiData?.items[0].statistics.likeCount} likes
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>
          {/* Notes Section */}
          <View></View>
        </SlidingScreen>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  videoPlayer: {
    width: "100%",
    height: 280,
    backgroundColor: "#000000",
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
  },
  channelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  channelImageBg: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: "#2B2D42",
  },
  channelImage: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF",
  },
  channelName: {
    fontSize: 14,
    lineHeight: 12,
  },
  slidingScreen: {
    height: 400,
    marginTop: 20,
  },
  detailsContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 10,
    lineHeight: 12,
    marginBottom: 10,
  },
  description: {
    fontSize: 12,
    lineHeight: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsBox: {
    backgroundColor: "#2B2D42",
    borderRadius: 8,
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    width: "40%",
  },
  statsIcon: {
    width: 20,
    height: 20,
    borderRadius: 16,
    tintColor: "#FFFFFF",
  },
  statsText: {
    fontSize: 10,
    lineHeight: 12,
    color: "#FFFFFF",
    marginHorizontal: "auto",
  },
});
