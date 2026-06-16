import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Book ID: {id}</Text>
    </View>
  );
}