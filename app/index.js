import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function LibraryScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Library Screen</Text>

      <Pressable onPress={() => router.push("/stats")}>
        <Text>Go To Stats</Text>
      </Pressable>
    </View>
  );
}