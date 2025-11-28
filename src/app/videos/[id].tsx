import SlidingScreen from "@/src/components/sliding-screen";
import { ThemedText } from "@/src/components/themed-text";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VideoDetails() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView>
      {/* Video element */}
      <View style={styles.container}>
        <ThemedText fontWeight="semibold" numberOfLines={1} style={styles.title}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </ThemedText>
        <View style={styles.channelRow}>
          <Image source={{}} style={styles.channelImage} />
          <ThemedText fontWeight="bold" style={styles.channelName}>
            Channel Name
          </ThemedText>
        </View>
        <SlidingScreen tabs={["Details", "Notes"]} containerStyle={styles.slidingScreen}>
          {/* Details Section */}
          <View style={styles.detailsContainer}>
            <View>
              <ThemedText fontWeight="semibold" style={styles.sectionTitle}>
                Description
              </ThemedText>
              <ThemedText style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis semper purus a accumsan.
                Donec accumsan pulvinar metus, euismod lacinia libero congue non. Vivamus ut massa finibus, consequat
                dui commodo, semper magna. Donec nec justo consectetur lacus facilisis tristique eget quis nulla. Cras
                sodales lacinia nisi, in dictum elit commodo in.
              </ThemedText>
            </View>
            <View>
              <ThemedText fontWeight="semibold" style={styles.sectionTitle}>
                Statistics
              </ThemedText>
              <View style={styles.statsRow}>
                <View style={styles.statsBox}>
                  <Image source={require("@/assets/icons/views-icon.svg")} style={styles.statsIcon} />
                  <ThemedText fontWeight="semibold" style={styles.statsText}>
                    25268952 views
                  </ThemedText>
                </View>

                <View style={styles.statsBox}>
                  <Image source={require("@/assets/icons/likes-icon.svg")} style={styles.statsIcon} />
                  <ThemedText fontWeight="semibold" style={styles.statsText}>
                    12345 likes
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
  channelImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
