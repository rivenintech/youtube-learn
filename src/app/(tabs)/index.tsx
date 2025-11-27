import VideosCategory from "@/src/components/videos-category";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";

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
    <FlashList
      data={Categories}
      renderItem={({ item }) => <VideosCategory title={item.title} />}
      ItemSeparatorComponent={() => (
        <View style={{ borderTopWidth: 2, borderTopColor: "#2B2D42", marginBottom: 8, marginTop: 24 }} />
      )}
    />
  );
}
