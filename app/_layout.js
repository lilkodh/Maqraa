import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="index"
        options={{ title: "Library" }}
      />
      <Stack.Screen
        name="book/[id]"
        options={{ title: "Book Detail" }}
      />
      <Stack.Screen
        name="stats"
        options={{ title: "Statistics" }}
      />
    </Stack>
  );
}