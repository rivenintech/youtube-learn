import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Video, { VideoRef } from "react-native-video";
import { VideoControls } from "./video-controls";

export default function VideoPlayer({ video, style }: { video: any; style?: ViewStyle }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<VideoRef>(null);
  const { back } = useRouter();

  return (
    <View style={style}>
      <Video
        ref={videoRef}
        paused
        shutterColor="transparent"
        source={{ uri: video }}
        style={styles.video}
        onProgress={({ currentTime, seekableDuration }) => {
          setCurrentTime(currentTime);

          setDuration((prev) => {
            if (prev === seekableDuration) return prev;
            return seekableDuration;
          });
        }}
      />
      <VideoControls videoRef={videoRef} currentTime={currentTime} duration={duration} onBackPress={back} />
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    backgroundColor: "#000000",
    flex: 1,
  },
});
