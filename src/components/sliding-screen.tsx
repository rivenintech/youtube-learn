import { ReactNode, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import PagerView from "react-native-pager-view";
import { ThemedText } from "./themed-text";

type SlidingScreenProps = {
  children: ReactNode[];
  tabs: string[];
  containerStyle?: ViewStyle;
};

export default function SlidingScreen({
  children,
  tabs,
  containerStyle = { flex: 1, width: "100%" },
}: SlidingScreenProps) {
  const pagerRef = useRef<PagerView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);

  // Indicator width and position
  const indicatorWidth = width / tabs.length || 0;
  const indicatorTranslateX = Animated.multiply(scrollX, indicatorWidth);

  return (
    <View style={containerStyle}>
      <View style={styles.tabContainer}>
        <View style={styles.tabRow} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
          {tabs.map((title, i) => (
            <Pressable key={i} style={styles.tabItem} onPress={() => pagerRef.current?.setPage(i)}>
              <ThemedText fontWeight="semibold" style={styles.tabText}>
                {title}
              </ThemedText>
            </Pressable>
          ))}
        </View>
        {width > 0 && (
          <>
            <View style={styles.indicatorUnderlay} />
            <Animated.View
              style={[
                styles.indicator,
                {
                  width: indicatorWidth,
                  transform: [{ translateX: indicatorTranslateX }],
                },
              ]}
            />
          </>
        )}
      </View>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        pageMargin={40}
        onPageScroll={({ nativeEvent }) => scrollX.setValue(nativeEvent.position + nativeEvent.offset)}
      >
        {children}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: { marginVertical: 10 },
  tabRow: { flexDirection: "row", width: "100%" },
  tabItem: { flex: 1, alignItems: "center" },
  tabText: { color: "#2B2D42", fontSize: 12, lineHeight: 12 },
  indicatorUnderlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#C8C8C8",
  },
  indicator: { height: 2, marginTop: 5, backgroundColor: "#2B2D42" },
  pager: { flex: 1 },
});
