import { formatTime } from "@/src/utils/format-time";
import { Image } from "expo-image";
import { RefObject, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { VideoRef } from "react-native-video";
import { ThemedText } from "../themed-text";

export function VideoControls({
  videoRef,
  onBackPress,
  currentTime,
  duration,
}: {
  videoRef: RefObject<VideoRef | null>;
  onBackPress: () => void;
  currentTime: number;
  duration: number;
}) {
  const [isPaused, setIsPaused] = useState(true);
  const [muted, setMuted] = useState(false);

  // Reanimated seek bar progress
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(duration === 0 ? 0 : currentTime / duration, { duration: 300 });
  }, [currentTime, duration, progress]);

  const seekBarProgressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  useEffect(() => {
    if (isPaused) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.resume();
    }
  }, [isPaused, videoRef]);

  useEffect(() => {
    videoRef.current?.setVolume(muted ? 0 : 1);
  }, [muted, videoRef]);

  return (
    <>
      <View style={styles.topBar}>
        <Pressable onPress={onBackPress} style={styles.iconButton}>
          <Image source={require("@/assets/icons/leftarrow-icon.svg")} style={styles.icon} />
        </Pressable>
        <View style={styles.iconRow}>
          <Pressable onPress={() => setMuted(!muted)} style={styles.iconButton}>
            <Image source={require("@/assets/icons/volume-icon.svg")} style={styles.icon} />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Image source={require("@/assets/icons/airplay-icon.svg")} style={styles.icon} />
          </Pressable>
        </View>
      </View>
      <View style={styles.controlsBar}>
        <Pressable onPress={() => videoRef.current?.seek(currentTime - 5)} style={styles.iconButton}>
          <Image source={require("@/assets/icons/backward-icon.svg")} style={styles.backwardForwardIcon} />
        </Pressable>
        <Pressable onPress={() => setIsPaused(!isPaused)} style={styles.playPauseButton}>
          {isPaused ? (
            <Image source={require("@/assets/icons/play-icon.svg")} style={styles.playPauseIcon} />
          ) : (
            <Image source={require("@/assets/icons/pause-icon.svg")} style={styles.playPauseIcon} />
          )}
        </Pressable>
        <Pressable onPress={() => videoRef.current?.seek(currentTime + 5)} style={styles.iconButton}>
          <Image source={require("@/assets/icons/forward-icon.svg")} style={styles.backwardForwardIcon} />
        </Pressable>
      </View>
      <ThemedText fontWeight="semibold" style={styles.timeText}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </ThemedText>
      <Pressable onPress={() => videoRef.current?.presentFullscreenPlayer()}>
        <Image source={require("@/assets/icons/fullscreen-icon.svg")} style={styles.fullscreenIcon} />
      </Pressable>
      <View style={styles.seekBar}>
        <Animated.View style={[styles.seekBarProgress, seekBarProgressStyle]}>
          <View style={styles.seekBarDot} />
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    marginTop: 18,
    paddingHorizontal: 16,
    width: "100%",
  },
  iconButton: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF",
  },
  iconRow: {
    flexDirection: "row",
    gap: 8,
  },
  controlsBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    top: "45%",
    width: "100%",
  },
  backwardForwardIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  },
  playPauseButton: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  playPauseIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  },
  timeText: {
    color: "#FFFFFF",
    fontSize: 10,
    lineHeight: 18,
    position: "absolute",
    bottom: 11,
    left: 8,
  },
  fullscreenIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
    position: "absolute",
    bottom: 16,
    right: 9,
  },
  seekBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#C8C8C8",
  },
  seekBarProgress: {
    height: "100%",
    backgroundColor: "#C71F1F",
    position: "relative",
    justifyContent: "center",
  },
  seekBarDot: {
    position: "absolute",
    right: -6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#C71F1F",
  },
});
